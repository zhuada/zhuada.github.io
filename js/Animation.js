
// Animation类.
function Animation(cfg){
	for (var attr in cfg ){
		this[attr]=cfg[attr];
	}
}

Animation.prototype={
	constructor :Animation ,

	frames : null,
	frameCount : -1 , 
	img : null,
	currentFrame : null ,
	currentFrameIndex : -1 ,
	currentFramePlayed : -1 ,
	
	init : function(){
		this.img = ImgCache[this.img]||this.img;
		
		this.frames=this.frames||[];
		this.frameCount = this.frames.length;
		
		this.setFrame(0);
	},
	
	//设置当前帧
	setFrame : function(index){
		this.currentFrameIndex=index;
		this.currentFrame=this.frames[index];
		this.currentFramePlayed=0;	
	},
	
	// 更新Animation状态. deltaTime表示时间的变化量.
	update : function(deltaTime){
		//判断当前Frame是否已经播放完成, 
		if (this.currentFramePlayed>=this.currentFrame.duration){
			
			if (this.currentFrameIndex >= this.frameCount-1){
				//当前是最后一帧,则播放第0帧
				this.currentFrameIndex=0;
			}else{
				//播放下一帧
				this.currentFrameIndex++;
			}
			this.setFrame(this.currentFrameIndex);
		
		}else{
			this.currentFramePlayed += deltaTime;
		}
	},
	
	//绘制Animation
	draw : function(gc,x,y){
		var f=this.currentFrame;
		gc.drawImage(this.img, f.x , f.y, f.w, f.h , x, y, f.w, f.h );
	}
};

