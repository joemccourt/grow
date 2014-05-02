GRW.selectBox = {x:0.05,y:0.05,w:0.15,h:0.35};
GRW.infoBox = {x:0.7,y:0.05,w:0.29,h:0.35};
GRW.gameBox = {x:20,y:20,w:10,h:10};
GRW.saveBox = {x:0.05,y:0.30,w:0.9,h:0.65};

GRW.infoButtons = [
	{
		"name": "cellType",
		"displayName": "Cell Type: ",
		"box": {x:1/12, y:1/96, w:10/12, h:10/96}
	},
	{
		"name": "airMeter",
		"displayName": "Air: ",
		"box": {x:1/12, y:13/96, w:10/12, h:10/96}
	},
	{
		"name": "soilMeter",
		"displayName": "Soil: ",
		"box": {x:1/12, y:25/96, w:10/12, h:10/96}
	},
	{
		"name": "transportation",
		"displayName": "Transportation: ",
		"box": {x:1/12, y:37/96, w:10/12, h:10/96}
	},
	{
		"name": "consumption",
		"displayName": "Consumption: ",
		"box": {x:1/12, y:49/96, w:10/12, h:10/96}
	},
	{
		"name": "conversion",
		"displayName": "Conversion: ",
		"box": {x:1/12, y:61/96, w:10/12, h:10/96}
	},
	{
		"name": "production",
		"displayName": "Production: ",
		"box": {x:1/12, y:73/96, w:10/12, h:10/96}
	},
	{
		"name": "totalCells",
		"displayName": "Total Plant Cells: ",
		"box": {x:1/12, y:85/96, w:10/12, h:10/96}
	}
];

GRW.selectButtons = [
	{
		"name": "query",
		"displayName": "?",
		"box": {x:1/24, y:1/48, w:10/24, h:10/48}
	},
	{
		"name": "empty",
		"displayName": "kill",
		"box": {x:0.5+1/24, y:1/48, w:10/24, h:10/48}
	},
	{
		"name": "leaf",
		"displayName": "leaf",
		"box": {x:1/24, y:0.25+1/48, w:10/24, h:10/48}
	},
	{
		"name": "root",
		"displayName": "root",
		"box": {x:0.5+1/24, y:0.25+1/48, w:10/24, h:10/48}
	},
	{
		"name": "zylem",
		"displayName": "zylem",
		"box": {x:1/24, y:0.5+1/48, w:10/24, h:10/48}
	},
	{
		"name": "phloem",
		"displayName": "phloem",
		"box": {x:0.5+1/24, y:0.5+1/48, w:10/24, h:10/48}
	},
	// {
	// 	"name": "stem",
	// 	"displayName": "s",
	// 	"box": {x:1/24, y:0.75+1/48, w:10/24, h:10/48}
	// },
	{
		"name": "exit",
		"displayName": "save & exit",
		"box": {x:1/24, y:0.75+1/48, w:10/24+0.5, h:10/48}
	}
];

GRW.drawGame = function() {
	GRW.drawCells();

	GRW.drawInfoBox();
	GRW.drawSelectBox();

	// GRW.drawGrid();
	// GRW.dirtyCells = {x:GRW.gameState.w+1,y:GRW.gameState.h+1,w:-1,h:-1};
	GRW.dirtyCells = {x:0,y:0,w:GRW.gameState.w,h:GRW.gameState.h};
};

GRW.getSubBox = function(parentBox,childBox) {
	var subBox = {x:0,y:0,w:0,h:0};

	subBox.x = parentBox.x + childBox.x * parentBox.w;
	subBox.y = parentBox.y + childBox.y * parentBox.h;
	subBox.w = childBox.w * parentBox.w;
	subBox.h = childBox.h * parentBox.h;

	return subBox;
};

GRW.pointInBox = function(x, y, box) {
	return x > box.x && x < box.x+box.w && y > box.y && y < box.y+box.h;
};

GRW.clampGameBox = function() {
	var w = GRW.gameState.w;
	var h = GRW.gameState.h;
	if(GRW.gameBox.w > w) {GRW.gameBox.w = w;}
	if(GRW.gameBox.h > h) {GRW.gameBox.h = h;}
	if(GRW.gameBox.w < 5) {
		GRW.gameBox.x -= (5 - GRW.gameBox.w)/2;
		GRW.gameBox.w = 5;
	}
	if(GRW.gameBox.h < 5) {
		GRW.gameBox.y -= (5 - GRW.gameBox.h)/2;
		GRW.gameBox.h = 5;
	}
	if(GRW.gameBox.x < 0) {GRW.gameBox.x = 0;}
	if(GRW.gameBox.y < 0) {GRW.gameBox.y = 0;}
	if(GRW.gameBox.x + GRW.gameBox.w >= w) {GRW.gameBox.x = w - GRW.gameBox.w;}
	if(GRW.gameBox.y + GRW.gameBox.h >= h) {GRW.gameBox.y = h - GRW.gameBox.h;}
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

GRW.roundedRectPath = function(ctx, x1, y1, w, h, r) {
	var x2 = x1 + w;
	var y2 = y1 + h;

	r = r * Math.max(0,Math.min(y2 - y1, x2 - x1));

	ctx.beginPath();
	ctx.moveTo(x1+r,y1);
	ctx.lineTo(x2-r,y1);
	ctx.arc(x2-r,y1+r,r,-Math.PI/2,0,false);
	ctx.lineTo(x2,y2-r);
	ctx.arc(x2-r,y2-r,r,0,Math.PI/2,false);
	ctx.lineTo(x1+r,y2);
	ctx.arc(x1+r,y2-r,r,Math.PI/2,Math.PI,false);
	ctx.lineTo(x1,y1+r);
	ctx.arc(x1+r,y1+r,r,Math.PI,3*Math.PI/2,false);
	ctx.closePath();
};

GRW.drawInfoBox = function() {
	var ctx = GRW.ctx;
	ctx.save();

	var parentBox = GRW.infoBox;

	var w = GRW.canvas.width;
	var h = GRW.canvas.height;

	// ctx.font = 0.023*(w+h)/2 + "px Lucida Console";
	ctx.textAlign = "left";
	ctx.textBaseline = "middle";

	ctx.fillStyle = 'rgba(255,255,255,0.8)';
	// ctx.fillRect(parentBox.x*w,parentBox.y*h,parentBox.w*w,parentBox.h*h);

	if(GRW.dirtyInfoBG) {
		GRW.dirtyInfoBG = false;
		GRW.infoCanvas = document.createElement('canvas');
		GRW.infoCanvas.width  = parentBox.w*w;
		GRW.infoCanvas.height = parentBox.h*h;
		GRW.drawBackgroundBasedOnID(GRW.infoCanvas, "info");
	}

	ctx.drawImage(GRW.infoCanvas,parentBox.x*w,parentBox.y*h);

	if(GRW.selectedCell) {
		var cell = GRW.selectedCell;

		for(var i = 0; i < GRW.infoButtons.length; i++) {
			var button = GRW.infoButtons[i];

			var b = GRW.getSubBox(parentBox, button.box);
			var center = {x: b.x+b.w/2, y: b.y+b.h/2};
			
			var displayText = button.displayName;
			switch(button.name) {
				case "cellType":
					displayText += cell.name;
					break;
				case "transportation":
					displayText += cell.transportation.toString();
					break;
				case "consumption":
					displayText += cell.consumption.toString();
					break;
				case "conversion":
					displayText += cell.conversion.toString();
					break;
				case "production":
					displayText += cell.production.toString();
					break;
				case "totalCells":
					displayText += GRW.gameState.numPlant;
					break;
				default:
					break;
			}

			if(button.name == "airMeter" || button.name == "soilMeter") {
				var rI = 1;
				var typeName = "soil";
				if(button.name == "airMeter") {
					rI = 0;
					typeName = "air";
				}

				var r = cell.resources;
				var c = cell.capacity;

				var x = 1;
				if(c[rI] != 0) {
					x = r[rI]/c[rI];
				}

				var rightMax = 0.7 * b.w;

				// ctx.fillStyle = 'rgba(127,127,127,0.8)';
				// ctx.fillRect(b.x*w,b.y*h,rightMax*w,b.h*h);

				// ctx.fillStyle = GRW.colorToStr(GRW.colors[typeName]);
				ctx.fillStyle = GRW.getButtonGradient(ctx, GRW.colors[typeName], b.x*w, b.y*h, b.x*w, (b.y+b.h)*h);
				ctx.strokeStyle = 'black';
				
				// ctx.fillRect(b.x*w,b.y*h,x*rightMax*w,b.h*h);
				GRW.roundedRectPath(ctx,b.x*w,b.y*h,rightMax*w,b.h*h,0.25);
				ctx.stroke();

				GRW.roundedRectPath(ctx,b.x*w,b.y*h,x*rightMax*w,b.h*h,0.25);
				ctx.fill();

				ctx.beginPath();
				ctx.fillStyle = 'black';

				displayText = (Math.round(r[rI]))+"/"+(Math.round(c[rI]));
				GRW.setFillFont(ctx, displayText, 0.95*(b.w-rightMax)*w, 0.9*b.h*h, "Lucida Console");

				ctx.fillText(displayText, (b.x+rightMax+b.w*0.03)*w, center.y*h);
			} else {

				GRW.setFillFont(ctx, displayText, 0.9*b.w*w, 0.8*b.h*h, "Lucida Console");

				ctx.fillStyle = 'black';
				ctx.fillText(displayText, b.x*w, center.y*h);
			}
		}
	}

	ctx.fill();
	ctx.restore();
};

GRW.drawSelectBox = function() {
	var ctx = GRW.ctx;
	ctx.save();

	var parentBox = GRW.selectBox;

	var w = GRW.canvas.width;
	var h = GRW.canvas.height;

	ctx.font = 0.03*(w+h)/2 + "px Lucida Console";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";

	ctx.fillStyle = 'rgba(255,255,255,0.8)';
	// ctx.fillRect(parentBox.x*w,parentBox.y*h,parentBox.w*w,parentBox.h*h);

	if(GRW.dirtySelectBG) {
		GRW.dirtySelectBG = false;
		GRW.selectCanvas = document.createElement('canvas');
		GRW.selectCanvas.width  = parentBox.w*w;
		GRW.selectCanvas.height = parentBox.h*h;
		GRW.drawBackgroundBasedOnID(GRW.selectCanvas, "select");
	}

	ctx.drawImage(GRW.selectCanvas,parentBox.x*w,parentBox.y*h);

	for(var i = 0; i < GRW.selectButtons.length; i++) {
		var button = GRW.selectButtons[i];

		var b = GRW.getSubBox(parentBox, button.box);
		var center = {x: b.x+b.w/2, y: b.y+b.h/2};

		if(button.name.length > 0 && button.name == GRW.cellTypeAdd) {
			ctx.fillStyle = GRW.getButtonGradient(ctx, GRW.colors[button.name], b.x*w, (b.y+b.h)*h, b.x*w, b.y*h);
		} else {
			ctx.fillStyle = GRW.getButtonGradient(ctx, GRW.colors[button.name], b.x*w, b.y*h, b.x*w, (b.y+b.h)*h);
		}

		GRW.roundedRectPath(ctx,b.x*w,b.y*h,b.w*w,b.h*h, 0.2);
		ctx.fill();
		
		ctx.beginPath();
		ctx.fillStyle = 'black';
		GRW.setFillFont(ctx, button.displayName, 0.9*b.w*w, 0.5*b.h*h, "Lucida Console");
		ctx.fillText(button.displayName, center.x*w, center.y*h);
	}

	ctx.restore();
};

GRW.setFillFont = function(ctx, text, w, h, fontName) {
	ctx.font = h + "px " + fontName;
	var textWidth = ctx.measureText(text).width;

	if(textWidth > w){
		h *= w / textWidth;
		ctx.font = h + "px " + fontName;
	}
};

GRW.drawCellsBitmap = function() {
	var canvas = GRW.canvas;
	var gameState = GRW.gameState;
	var ctx = GRW.ctx;
	ctx.save();

	var w = canvas.width;
	var h = canvas.height;

	var numCol = gameState.w;
	var numRow = gameState.h;

	var dstObj = ctx.createImageData(w,h);
	var dst = dstObj.data;

	for(var y = 0; y < h; y++) {
		for(var x = 0; x < w; x++) {
			var index = 4*(y*w+x);
			dst[index] = 255;
			dst[index+3] = 255;
		}
	}

	ctx.putImageData(dstObj,0,0);
	ctx.restore();
};

GRW.drawCells = function(parentBox, worldID) {
	var ctx = GRW.ctx;
	ctx.save();

	var w = GRW.canvas.width;
	var h = GRW.canvas.height;

	GRW.clampGameBox();

	if(!worldID) {
		var state = GRW.gameState;
		var b = GRW.gameBox;

		b = GRW.fitGameBox(b,w,h);

	} else {

		var state = GRW.gameData[worldID];
		var b = GRW.gameData[worldID].gameBox;
		b = GRW.fitGameBox(b,w*parentBox.w,h*parentBox.h);
	}

	var numCol = state.w;
	var numRow = state.h;



	if(!parentBox) {
		parentBox = {x:0,y:0,w:1,h:1};
	}

	var xMin = parentBox.x * w;
	var yMin = parentBox.y * h;

	var xMax = (parentBox.x + parentBox.w) * w - 1;
	var yMax = (parentBox.y + parentBox.h) * h - 1;

	var cellW = parentBox.w*w/b.w;
	var cellH = parentBox.h*h/b.h;

	ctx.font = 0.012*(w+h)/2 + "px Lucida Console";

	var xEnd = Math.ceil(Math.max(0,Math.min(numCol-1, b.x+b.w-1)));
	var yEnd = Math.ceil(Math.max(0,Math.min(numRow-1, b.y+b.h-1)));
	var xStart = Math.floor(Math.max(0,Math.min(numCol-1, b.x)));
	var yStart = Math.floor(Math.max(0,Math.min(numRow-1, b.y)));
	for(var y = yStart; y <= yEnd; y++) {
		for(var x = xStart; x <= xEnd; x++) {
			var cell = state.cells[numCol*y+x];

			if(cell) {
				var x1 = parentBox.x*w + ((x-b.x)*cellW|0)+0.5;
				var x2 = parentBox.x*w + ((x-b.x+1)*cellW|0)+0.5;
				var y1 = parentBox.y*h + ((y-b.y)*cellH|0)+0.5;
				var y2 = parentBox.y*h + ((y-b.y+1)*cellH|0)+0.5;

				x1 = x1 < xMin ? xMin : x1 > xMax ? xMax : x1;
				x2 = x2 < xMin ? xMin : x2 > xMax ? xMax : x2;
				y1 = y1 < yMin ? yMin : y1 > yMax ? yMax : y1;
				y2 = y2 < yMin ? yMin : y2 > yMax ? yMax : y2;

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

				if(cell === GRW.selectedCell) {
					ctx.strokeRect(x1+1,y1+1,cW-2,cH-2);
				}
				// ctx.fillStyle = 'black';
				// var r0 = cell.resources[0];
				// var r1 = cell.resources[1];
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

	// var d = GRW.dirtyCells;
	// var rowW = w/GRW.gameState.w;
	// var rowH = h/GRW.gameState.h;
	ctx.clearRect(0,0,w,h);

	// ctx.fillStyle = 'gray';
	// ctx.fillRect(0,0,w,h);

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
	ctx.fillText("grow",w/2,h*0.12);


	// ctx.font = 0.04*(w+h)/2 + "px Lucida Console";
	// ctx.fillText("Top Score: " + GRW.topScore,w/2,h*0.4);

	ctx.font = 0.025*(w+h)/2 + "px Lucida Console";
	ctx.fillText("click a world To play",w/2,h*0.23);

	ctx.font = 0.02*(w+h)/2 + "px Lucida Console";
	ctx.fillText(GRW.getTotalPlant() + " cells so far",w/2,h*0.28)

	ctx.textAlign = "center";
	ctx.textBaseline = "bottom";
	ctx.font = 0.02*(w+h)/2 + "px Lucida Console";
	ctx.fillText("Created by Joe McCourt",w*0.5,h*0.98);

	var parentBox = GRW.saveBox;
	var numPlantLast = 0;

	for(var key in GRW.worlds) {
		var button = GRW.worlds[key];
		var unlocked = GRW.worlds[key].unlocked;
		var numPlant = GRW.gameData[key].numPlant;

		var b = GRW.getSubBox(parentBox, button.box);
		var center = {x: b.x+b.w/2, y: b.y+b.h/2};

		ctx.strokeStyle = 'black';
		ctx.fillStyle = 'gray';
		ctx.strokeRect(w*b.x,h*b.y,w*b.w,h*b.h);
		ctx.fillRect(w*b.x,h*b.y,w*b.w,h*b.h);
		GRW.drawCells(b, button.id);
		
		var displayText = button.displayName;
		if(unlocked) {
			if(numPlant < GRW.worlds[key].unlockNext && GRW.worlds[GRW.worlds[key].idNext]) {
				ctx.fillStyle = 'rgba(50,100,0,1)';
				displayText += " (" + numPlant + " / " + GRW.worlds[key].unlockNext + " cells)";
			} else {
				ctx.fillStyle = 'rgba(0,200,0,1)';
				displayText += " (" + numPlant + " cells)";
			}
		} else {
			ctx.fillStyle = 'rgba(200,200,200,1)';
			displayText += " (locked)";
		}

		ctx.fillText(displayText, center.x*w, b.y*h);
	}
	
	ctx.restore();
};
