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