


function createEnemy(){

	var r=genRandom(0,1);
		
	var cfg = {
		img : "enemy",

		x : genRandom(100,500),
		y : 315,

		minX : 0,
		maxX : 500,
		minY : 0,
		maxY : 320,
		


		defaultAnimId : "move-right",	
			
		anims : {

            "move-left" : new Animation({
                    img : "enemy" ,
                    frames : [
                        {x : 0, y : 80, w : 100, h : 80, duration : 100 },
                        {x : 100, y : 80, w : 100, h : 80, duration : 100  },
                        {x : 200, y : 80, w : 100, h : 80, duration : 100  },
                        {x : 300, y : 80, w : 100, h : 80, duration : 100  }
                    ]
                }),
			
			"move-right" : new Animation({
					img : "enemy" ,
					frames : [
						{x : 0, y : 0, w : 100, h : 80, duration : 100 },
						{x : 100, y : 0, w : 100, h : 80, duration : 100  },
						{x : 200, y : 0, w : 100, h : 80, duration : 100  },
                        {x : 300, y : 0, w : 100, h : 80, duration : 100  }
					]
				})
		},
		
        handleInput : function(){
            var s=genRandom(-5,5);
            var moveSpeed=(500+s*75)/1000;      
            this.speedX=this.speedX||moveSpeed;
            if (this.x<=this.minX){
                this.x=this.minX;
                this.setAnim("move-right");
                this.speedX= moveSpeed;
            }else if (this.x>=this.maxX){
                this.x=this.maxX;
                this.setAnim("move-left");
                this.speedX=-moveSpeed;
            }
        }
			
	};
	return new Sprite(cfg) ;
}

