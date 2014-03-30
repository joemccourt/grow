GRW.drawGame = function() {
	GRW.drawCells();
	// GRW.drawGrid();
	GRW.dirtyCells = {x:GRW.gameState.w+1,y:GRW.gameState.h+1,w:-1,h:-1};
};

GRW.invalidateView = function(x,y) {
	var d = GRW.dirtyCells;
	if(x < d.x) {
		d.x = x;
	}

	if(x > d.x+d.w) {
		d.w = x-d.x;
	}

	if(y < d.y) {
		d.y = y;
	}

	if(y > d.y+d.h) {
		d.h = y-d.y;
	}
};

GRW.drawCells = function() {
	var ctx = GRW.ctx;
	ctx.save();

	var w = GRW.canvas.width;
	var h = GRW.canvas.height;

	var numCol = GRW.gameState.w;
	var numRow = GRW.gameState.h;

	ctx.font = 0.012*(w+h)/2 + "px Lucida Console";

	var d = GRW.dirtyCells;
	for(var y = d.y; y <= d.y+d.h; y++) {
		for(var x = d.x; x <= d.x+d.w; x++) {
			var cell = GRW.gameState.cells[numCol*y+x];

			if(cell) {
				var x1 = (w*x/numCol|0)+0.5;
				var x2 = (w*(x+1)/numCol|0)+0.5;
				var y1 = (h*y/numRow|0)+0.5;
				var y2 = (h*(y+1)/numRow|0)+0.5;

				var cW = x2-x1;
				var cH = y2-y1;
				ctx.fillStyle = cell.fillStyle;
				ctx.fillRect(x1,y1,cW,cH);

				ctx.fillStyle = 'black';
				var r0 = cell.resources[0];
				var r1 = cell.resources[1];
				// ctx.fillText((r0|0)+","+(r1|0), x1, y1+cH/2);
			}
		}
	}

	ctx.fill();
	ctx.restore();
};

GRW.drawGrid = function() {
	var ctx = GRW.ctx;
	ctx.save();

	var w = GRW.canvas.width;
	var h = GRW.canvas.height;

	var numCol = GRW.gameState.w;
	var numRow = GRW.gameState.h;

	ctx.strokeStyle = 'black';
	for(var y = 0; y <= numRow; y++) {
		var lineY = (h*y/numRow|0)+0.5;
		ctx.moveTo(0,lineY);
		ctx.lineTo(w,lineY);
	}
	for(var x = 0; x <= numCol; x++) {
		var lineX = (w*x/numCol|0)+0.5;
		ctx.moveTo(lineX,0);
		ctx.lineTo(lineX,h);
	}

	ctx.stroke();
	ctx.restore();
};

GRW.drawClear = function() {
	var ctx = GRW.ctx;
	ctx.save();

	var w = GRW.canvas.width;
	var h = GRW.canvas.height;


	var d = GRW.dirtyCells;
	var rowW = w/GRW.gameState.w;
	var rowH = h/GRW.gameState.h;
	ctx.clearRect(d.x*rowW,d.y*rowH,d.w*rowW,d.h*rowH);

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

GRW.cellColors = [
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