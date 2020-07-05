let s;
let scal = 15;
var food;
var highScore = 0;
var CHECK_LOG = true;
var CHECK_LOG_KEYPRESS =true;
var directionString;
function setup()
{
  //1400 x 937          1200 x 900
	createCanvas(630,630); 
  /*canvas dimensions have to be multiples of the scale(scal here). Otherwise, the grids will not be alignes along the four edges, as the grids along the edges do not have enough space.
  For example, if the canvas dimesions are 640*640 and the scale(scal) = 15, the grids along the edges will have a size(length in horizontal direction, and height vertically) of only 
	10 (That is 640%15). Hence the sixe has to be 630,645 etc. Otherwise, after moving the snake along the edges, the grid for snake and food may become unaligned, thus making the
  game unplayable as the distance does not become less than zero.*/
  s = new Game();
  frameRate(10);
  foodLocation();
}

function draw()
{
	background(51);
	s.update();
  s.gameover();
	s.show();
  
  fill(0,255,150);
  rect(food.x,food.y,scal,scal);

  if(s.eat(food))
    {
      foodLocation(); //food location changes on snake touching the food
      if(CHECK_LOG)
      {
        console.log('Food taken. Position reset');
      }
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
      if(s.speedxdir !== 0 && s.speedydir !== 1)
      {
  		  s.directionFn(0, -1);
        directionString = "UP";
      }
      else if(CHECK_LOG && s.speedxdir === 0 && s.speedydir === 1)
      {
        console.log('Upward movement blocked while moving down');
      }
  		break;
    case DOWN_ARROW:
      if(s.speedxdir !== 0 && s.speedydir !== -1)
      {
      	s.directionFn(0, 1);
        directionString = "DOWN";
      }
      else if(CHECK_LOG && s.speedxdir === 0 && s.speedydir === -1)
      {
        console.log('Downward movement blocked while moving up');
      }
    	break;
  	case RIGHT_ARROW:
      if(s.speedxdir !== -1 && s.speedydir !== 0)
      {
      	s.directionFn(1, 0);
        directionString = "RIGHT";
      }
      else if(CHECK_LOG && s.speedxdir === -1 && s.speedydir === 0)
      {
        console.log('Rightward movement blocked while moving left');
      }
    	break
  	case LEFT_ARROW:
    if(s.speedxdir !== 1 && s.speedydir !== 0)
      {
  	    s.directionFn(-1, 0);
        directionString = "LEFT";
      }
      else if(CHECK_LOG && s.speedxdir === 1 && s.speedydir === 0)
      {
        console.log('Leftward movement blocked while moving right');
      }
	    break;
  }	
  if(CHECK_LOG_KEYPRESS)
  {
    console.log('Key pressed: ' + directionString);
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
  if(CHECK_LOG)
  {
    this.moveHistorysave = -1;
  }

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

  this.gameover = function()
  {
    for(var i = 0; i< this.moveHistory.length; i++)
    {
      var loc = this.moveHistory[i];
      var distance = dist(this.x,this.y,loc.x,loc.y);
      if(distance < 1)
      {
        this.total = 0;
        this.moveHistory  = [];
        console.log('Collision : Game Over');
      }
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
    if(CHECK_LOG && (this.moveHistorysave != this.moveHistory.length))
    {
      this.moveHistorysave = this.moveHistory.length;
      console.log(this.moveHistory);
      // console.log(this.moveHistorysave);
      // console.log(this.moveHistory.length);
    }


  }

  this.show = function()
  {
    fill(255);
    for (var i = this.moveHistory.length-1;i >= 0; i--)
    {
      rect(this.moveHistory[i].x, this.moveHistory[i].y, scal, scal);
    }
    rect(this.x,this.y,scal,scal);

    fill(155);
    if(this.moveHistory.length === 0)
    {
      fill(100, 255, 100);
    }
    else if(this.moveHistory.length%10 ===0 || (highScore%10 ===0 && this.moveHistory.length === highScore))
    {
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