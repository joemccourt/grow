GRW.infoBox = {x:0.7,y:0.05,w:0.25,h:0.5};
GRW.gameBox = {x:20,y:20,w:50,h:50};

GRW.drawGame = function() {
	GRW.drawCells();

	GRW.drawInfoBox();

	// GRW.drawGrid();
	// GRW.dirtyCells = {x:GRW.gameState.w+1,y:GRW.gameState.h+1,w:-1,h:-1};
	GRW.dirtyCells = {x:0,y:0,w:GRW.gameState.w,h:GRW.gameState.h};
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

GRW.drawInfoBox = function() {
	var ctx = GRW.ctx;
	ctx.save();

	var b = GRW.infoBox;

	var w = GRW.canvas.width;
	var h = GRW.canvas.height;

	ctx.font = 0.023*(w+h)/2 + "px Lucida Console";
	ctx.textAlign = "right";
	ctx.textBaseline = "top";

	ctx.fillStyle = 'rgba(255,255,255,0.8)';
	ctx.fillRect(b.x*w,b.y*h,b.w*w,b.h*h);

	var cellType = GRW.cellTypes[GRW.cellTypeAdd];
	ctx.fillStyle = GRW.colorToStr(GRW.colors[GRW.cellTypeAdd]);
	ctx.fillText(GRW.cellTypeAdd, 0.92*w, 0.15*h);

	ctx.fillStyle = GRW.colorToStr(GRW.colors[GRW.cellTypeAdd]);
	ctx.fillText("Capacity: " + cellType.capacity.toString(), 0.935*w, 0.25*h);
	ctx.fillText("Consumption: " + cellType.consumption.toString(), 0.935*w, 0.32*h);
	ctx.fillText("Transportation: " + cellType.transportation.toString(), 0.935*w, 0.4*h);
	ctx.fillText("Conversion: " + cellType.conversion.toString(), 0.935*w, 0.48*h);


	ctx.fill();
	ctx.restore();
};


GRW.drawCells = function() {
	var ctx = GRW.ctx;
	ctx.save();

	var w = GRW.canvas.width;
	var h = GRW.canvas.height;

	var numCol = GRW.gameState.w;
	var numRow = GRW.gameState.h;

	var b = GRW.gameBox;
	var cellW = w/b.w;
	var cellH = h/b.h;

	ctx.font = 0.012*(w+h)/2 + "px Lucida Console";

	var xEnd = Math.min(numCol-1, b.x+b.w);
	var yEnd = Math.min(numRow-1, b.y+b.h);
	for(var y = b.y; y <= yEnd; y++) {
		for(var x = b.x; x <= xEnd; x++) {
			var cell = GRW.gameState.cells[numCol*y+x];

			if(cell) {
				var x1 = ((x-b.x)*cellW|0)+0.5;
				var x2 = ((x-b.x+1)*cellW|0)+0.5;
				var y1 = ((y-b.y)*cellH|0)+0.5;
				var y2 = ((y-b.y+1)*cellH|0)+0.5;

				var cW = x2-x1;
				var cH = y2-y1;
				var colorObj = GRW.colors[cell.name];

				var alpha = 1;
				if(cell.capacity[0] != 0) {
					alpha = cell.resources[0] / cell.capacity[0];
				}

				if(cell.capacity[1] != 0) {
					var alpha1 = cell.resources[1] / cell.capacity[1];
					if(alpha1 < alpha) {alpha = alpha1;}
				}

				colorObj = GRW.colorBlend(colorObj, GRW.colors.black, 1-alpha);

				ctx.fillStyle = GRW.colorToStr(colorObj);
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
