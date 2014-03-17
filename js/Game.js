
function Game(cfg){
	for (var attr in cfg){
		this[attr]=cfg[attr];
	}
}

Game.prototype={
	constructor : Game ,
	
	width : 600,
	height : 400,
	
	canvas : null,
	gc : null,

	FPS : 40 ,
	sleep : 0,	

	sprites : null,

	init : function(){
	
		this.canvas=document.createElement("canvas");
		this.canvas.width=this.width;
		this.canvas.height=this.height;
		document.body.appendChild(this.canvas);
	
		this.gc=this.canvas.getContext("2d");
		
		this.initEvent();
		
		if (this.FPS){
			this.sleep=Math.floor(1000/this.FPS);
		}
		
		this.sprites=this.sprites||[];
		for (var i=0,len=this.sprites.length;i<len;i++){
			this.sprites[i].init();
		}

	},

	initEvent : function(){
		//监听整个document的keydown,keyup事件
		
		document.addEventListener("keydown",function(evt){
			KeyState[evt.keyCode]=true;
		},true);
		document.addEventListener("keyup",function(evt){
			KeyState[evt.keyCode]=false;
		},true);	
	},


	
	start : function(){

		var Me=this;
		
		// 记录游戏开始时间
		Me.startTime=Date.now();
		
		//主循环
		this.mainLoop=setInterval(function(){	
			var deltaTime=Me.sleep;
			Me.run(deltaTime);
		},Me.sleep);
		
	
	},
	
	//主循环中要执行的操作
	run : function(deltaTime){
	
		//显示游戏时间
		var playedTime = (Date.now()-this.startTime)/100;

		document.getElementById("timeCount").innerHTML=playedTime;
		
		//碰撞检测
		var coll=this.checkCollide();
		if (coll){
			clearInterval(this.mainLoop);
			alert("游戏结束\n你的分数是 : "+playedTime);
			return;
		}
			
		this.update(deltaTime);
		this.clear(deltaTime);
		this.draw(deltaTime);

		this.handleInput();

	},

	checkCollide : function(){
			var player=this.sprites[0];
			for (var i=1,len=this.sprites.length;i<len;i++){
				var sprite=this.sprites[i];
				var coll=sprite.collideWidthOther(player);
				if (coll){
					return coll;
				}
			}
			return false;
	},
	
	update : function(deltaTime){
		for (var i=0,len=this.sprites.length;i<len;i++){
			var sprite=this.sprites[i];
			sprite.update(deltaTime);
		}
	},

	clear : function(deltaTime){
		this.gc.drawImage(ImgCache["bg"],0,0);
	},
	
	draw : function(deltaTime){
		for (var i=0,len=this.sprites.length;i<len;i++){
			var sprite=this.sprites[i];
			sprite.draw(this.gc);
		}
	},
	handleInput : function(){
		for (var i=0,len=this.sprites.length;i<len;i++){
			var sprite=this.sprites[i];
			if (sprite.handleInput){
				sprite.handleInput();
			}
		}
	}
	
};