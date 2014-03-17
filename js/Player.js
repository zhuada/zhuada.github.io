
function createPlayer(){
	
	var cfg = {
		
		//初始坐标
		x : 50,
		y : 315,
		
		//移动速度.
		speedX : 0,
		speedY : 0,
		acceY : 0,
		
		//x/y坐标的最大值和最小值, 可用来限定移动范围.
		minX : 0,
		maxX : 550,
		minY : 0,
		maxY : 320,
	
		// 定义走路速度
		walkSpeed : 200/1000,
		
		//定义跳跃初速度和垂直加速度
		jumpSpeed : -700/1000,
		acceY : 1.0/1000,	
		
		defaultAnimId : "stand-right",	
		
		anims : {
			"stand-left" : new Animation({
					img : "player" ,
					frames : [
						{x : 350, y : 70, w : 50, h : 70, duration : 100}
					]
				} ),
				
			"stand-right" : new Animation({
					img : "player" ,
					frames : [
						{x : 350, y : 0, w : 50, h : 70, duration : 100}
					]
				} )	,
			"walk-left" : new Animation({
					img : "player" ,
					frames : [
						{x : 0, y : 70, w : 50, h : 70, duration : 100},
						{x : 50, y : 70, w : 50, h : 70, duration : 100},
						{x : 100, y : 70, w : 50, h : 70, duration : 100},
						{x : 150, y : 70, w : 50, h : 70, duration : 100},
						{x : 200, y : 70, w : 50, h : 70, duration : 100},
						{x : 250, y : 70, w : 50, h : 70, duration : 100},
						{x : 300, y : 70, w : 50, h : 70, duration : 100},
						{x : 350, y : 70, w : 50, h : 70, duration : 100},
					]
				} ),
				
			"walk-right" : new Animation({
					img : "player" ,
					frames : [
						{x : 0, y : 0, w : 50, h : 70, duration : 100},
						{x : 50, y : 0, w : 50, h : 70, duration : 100},
						{x : 100, y : 0, w : 50, h : 70, duration : 100},
						{x : 150, y : 0, w : 50, h : 70, duration : 100},
						{x : 200, y : 0, w : 50, h : 70, duration : 100},
						{x : 250, y : 0, w : 50, h : 70, duration : 100},
						{x : 300, y : 0, w : 50, h : 70, duration : 100},
						{x : 350, y : 0, w : 50, h : 70, duration : 100},
					]
				} ),	
            "jump-left" : new Animation({
                    img : "playerjump" ,
                    frames : [
                        {x : 0, y : 70, w : 50, h : 70, duration : 100},
                        {x : 50, y : 70, w : 50, h : 70, duration : 100},
                        {x : 100, y : 70, w : 50, h : 70, duration : 100},
                        {x : 150, y : 70, w : 50, h : 70, duration : 100},
                        {x : 200, y : 70, w : 50, h : 70, duration : 100},
                        {x : 250, y : 70, w : 50, h : 70, duration : 100},
                        {x : 300, y : 70, w : 50, h : 70, duration : 100},
                        {x : 350, y : 70, w : 50, h : 70, duration : 100},
                    ]
                } ),
                
            "jump-right" : new Animation({
                    img : "playerjump" ,
                    frames : [
                        {x : 0, y : 0, w : 50, h : 70, duration : 100},
                        {x : 50, y : 0, w : 50, h : 70, duration : 100},
                        {x : 100, y : 0, w : 50, h : 70, duration : 100},
                        {x : 150, y : 0, w : 50, h : 70, duration : 100},
                        {x : 200, y : 0, w : 50, h : 70, duration : 100},
                        {x : 250, y : 0, w : 50, h : 70, duration : 100},
                        {x : 300, y : 0, w : 50, h : 70, duration : 100},
                        {x : 350, y : 0, w : 50, h : 70, duration : 100},
                    ]
                } ) 
		},
		

	 	handleInput : function(){		
			var left= KeyState[Key.A];
			var right= KeyState[Key.D];
			var up= KeyState[Key.W];
			
			//取得人物当前面对的方向
			var dirX=this.currentAnim.id.split("-")[1];
	
	
			// 判断是否落地
			if (this.y==this.maxY){
				this.jumping=false;
				this.speedY=0;
			}
			
			//如果按了上, 且当前不是跳跃中,那么开始跳跃.跳跃和走路使用同一个Animation.
			if (up && !this.jumping){			
				this.jumping=true;
				this.speedY=this.jumpSpeed;
				this.setAnim("jump-"+dirX);
			}
	
					
			if (left && right || !left && !right){
				// 如果左右都没有按或者都按了, 那么水平方向速度为0,不移动.
				this.speedX=0;
				
				//如果不是在跳跃中,那么进入站立状态,	站立时面对的方向根据之前的速度来决定.			
				if (!this.jumping){
					this.setAnim("stand-"+dirX);
				}
				
			}else if(left && this.speedX!=-this.walkSpeed){
				//如果按下了左 且当前不是向左走,则设置为向左走
				this.setAnim("walk-left");
				this.speedX=-this.walkSpeed;
			}else if(right && this.speedX!=this.walkSpeed){
				//如果按下了右 且当前不是向右走,则设置为向右走
				this.setAnim("walk-right");
				this.speedX=this.walkSpeed;
			}else if(left && this.jumping==true){
			    this.setAnim("jump-left");
			    this.speedX=-this.walkSpeed;
			}else if(right && this.jumping==true){
			    this.setAnim("jump-right");
			    this.speedX=this.walkSpeed;
			}
	
		}
	
	};

	return new Sprite(cfg);
}
