GRW.drawGame = function() {

};

GRW.drawClear = function() {
	var ctx = GRW.ctx;
	ctx.save();

	var w = GRW.canvas.width;
	var h = GRW.canvas.height;

	ctx.clearRect(0,0,w,h);

	ctx.restore();
};

GRW.drawMenu = function() {
	var ctx = GRW.ctx;
	ctx.save();

	var w = GRW.canvas.width;
	var h = GRW.canvas.height;

	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	ctx.fillStyle = 'green';
	ctx.font = 0.08*(w+h)/2 + "px Lucida Console";
	ctx.fillText("grow",w/2,h*0.25);

	ctx.font = 0.04*(w+h)/2 + "px Lucida Console";
	ctx.fillText("Top Score: " + GRW.topScore,w/2,h*0.4);

	ctx.font = 0.04*(w+h)/2 + "px Lucida Console";
	ctx.fillText("(Click To Play)",w/2,h*0.8);

	ctx.textAlign = "right";
	ctx.font = 0.02*(w+h)/2 + "px Lucida Console";
	ctx.fillText("Created by Joe McCourt",w*0.95,h*0.95);
	
	ctx.restore();
};

GRW.scoreColors = [
	"rgb(128,140,255)",
	"rgb(193,128,255)",
	"rgb(235,128,255)",
	"rgb(255,128,215)",
	"rgb(255,128,155)",
	"rgb(255,169,128)",
	"rgb(255,181,128)",
	"rgb(255,223,128)",
	"rgb(233,255,128)",
	"rgb(167,255,128)",
	"rgb(128,255,160)",
	"rgb(128,255,232)",
	"rgb(128,224,255)"
];