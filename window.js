let s;
let scal = 15;
var food;
var highScore = 0;

function setup()
{
	createCanvas(640,640);
	s = new Game();
  frameRate(10);
  foodLocation();
}

function draw()
{
	background(51);
	s.update();
	s.show();
  
  fill(0,255,150);
  rect(food.x,food.y,scal,scal);

  if(s.eat(food))
    {
      foodLocation(); //food location changes on snake touching the food
    }
}

function foodLocation()
{
  var columns = floor(width/scal);
  var rows = floor(height/scal);
  food = createVector(floor(random(columns)),floor(random(rows)));
  food.mult(scal);
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
  this.speedxdir = 1;
  this.speedydir = 0;
  this.total = 0;
  this.moveHistory = [];  //Location history of head

  this.directionFn = function(x, y)
  {
    this.speedxdir = x;
    this.speedydir = y;

  }

  this.eat = function(pos) //pos for position
  {
    var distance = dist(this.x, this.y, pos.x, pos.y);
    if(distance < 1)
    {
      this.total++;
      return true;
    }
    else
    {
      return false;
    }
  }

  this.update = function()
  {
    if(this.moveHistory.length === this.total){
      for (var i = 0; i < this.moveHistory.length-1; i++) 
      {
        this.moveHistory[i] = this.moveHistory[i+1];    //Shifting in the array. The last position remains same(No change)
      }
    }
    this.moveHistory[this.total-1] = createVector(this.x,this.y);


    this.x = this.x + this.speedxdir* scal;
    this.y = this.y + this.speedydir* scal;
    this.x = constrain(this.x, 0 , width - scal);
    this.y = constrain(this.y, 0 , height - scal);

  }

  this.show = function()
  {
    fill(255);
    for (var i = 0; i < this.moveHistory.length; i++)
    {
      rect(this.moveHistory[i].x, this.moveHistory[i].y, scal, scal);
    }
    rect(this.x,this.y,scal,scal);

    fill(155);
    if(this.moveHistory.length === 0)
    {
      fill(100, 255, 100);
    }
    else if(this.moveHistory.length%10 ===0 || highScore%10 ===0)
    {
      fill(100, 255, 100);
      fill(255, 0, 100);
    }

    text('SCORE: '+ this.moveHistory.length, 570, 15);
    if(highScore<this.moveHistory.length)
    {
      highScore = this.moveHistory.length
    }
    text('HIGH: '+ highScore, 10, 15);
  }
}