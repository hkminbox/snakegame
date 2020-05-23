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