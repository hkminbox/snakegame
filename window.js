let s;

function setup()
{
	createCanvas(640,640);
	s = new Game();
}

function draw()
{
	background(51);
	s.update();
	s.show();
}
function keyPressed()
{

  switch(keyCode)
  {
  	case UP_ARROW:
  		s.directionFn(0, -1);
  		break;
    case DOWN_ARROW:
    	s.directionFn(0, 1);
    	break;
  	case RIGHT_ARROW:
    	s.directionFn(1, 0);
    	break
  	case LEFT_ARROW:
	    s.directionFn(-1, 0);
	    break;
  }	
}



function Game()
{
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.directionFn = function(x, y)
  {
    this.xspeed = x;
    this.yspeed = y;

  }

  this.update = function()
  {
    this.x= this.x + this.xspeed;
    this.y= this.y + this.yspeed;
  }

  this.show = function()
  {
    fill(255);
    rect(this.x,this.y,10,10);
  }
}