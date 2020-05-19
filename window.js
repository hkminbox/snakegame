function setup()
{
	createCanvas(640,640);
}

function draw()
{
	background(51);
}

function Game()
{
	this.x = 0;
	this.y = 0;
	this.speedxdir = 1;
	this.speedydir = 0;

	this.update = function()
	{
		this.x= this.x + this.speedxdir;
		this.y= this.y + this.speedydir;
	}

	this.show = function()
	{
		fill(255);
		rect(this.x,this.y,10,10);
	}
}