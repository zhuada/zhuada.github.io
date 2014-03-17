

function Sprite(cfg){
	for (var attr in cfg){
		this[attr]=cfg[attr];
	}
}

Sprite.prototype={
	constructor :Sprite ,
	
	//对象的坐标
	x : 0,
	y : 0,
	//对象的速度
	speedX : 0,
	speedY : 0,
	
	acceY : 0 ,

	//对象的坐标区间
	minX : 0,
	maxX : 9999,
	minY : 0,
	maxY : 9999,
	

	anims : null,
	defaultAnimId : null,
	
	currentAnim : null,	
	
	//初始化方法
	init : function(){
		for (var animId in this.anims){
			var anim=this.anims[animId];
			anim.id=animId;
			anim.init();
		}
		this.setAnim(this.defaultAnimId);
	},
	

	setAnim : function(animId){
		this.currentAnim=this.anims[animId];
		this.currentAnim.setFrame(0);
	},
	
	// 更新精灵当前状态.
	update : function(deltaTime){
		this.x=this.x+this.speedX*deltaTime; 

		var newSpeedY=this.speedY + this.acceY * deltaTime;		
		this.y= Math.round(  this.y + (this.speedY + newSpeedY)/2 * deltaTime );
		this.speedY=newSpeedY;

		
		//限定移动范围
		this.x=Math.max(this.minX,Math.min(this.x,this.maxX));
		this.y=Math.max(this.minY,Math.min(this.y,this.maxY));
		
		if (this.currentAnim){
			this.currentAnim.update(deltaTime);
		}
		
	},

	//绘制对象
	draw : function(gc){
		if (this.currentAnim){
			this.currentAnim.draw(gc, this.x, this.y);
		}
	},

	
	//取得对象的碰撞区域
	getCollideRect : function(){
		if (this.currentAnim){
			var f=this.currentAnim.currentFrame;
			return {
				x1 : this.x+20,
				y1 : this.y+20,
				x2 : this.x+f.w-20,
				y2 : this.y+f.h-20
			}
		}

	},

	//判断是否和另外一个精灵碰撞
	collideWidthOther : function(sprite2){
		var rect1=this.getCollideRect();
		var rect2=sprite2.getCollideRect();
		
		return rect1 && rect2 && !(rect1.x1>rect2.x2 || rect1.y1>rect2.y2 || rect1.x2<rect2.x1 ||  rect1.y2<rect2.y1);	
	}
	
};

