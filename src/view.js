GRW.selectBox = {x:0.05,y:0.05,w:0.15,h:0.3};
GRW.infoBox = {x:0.7,y:0.05,w:0.25,h:0.5};
GRW.gameBox = {x:20,y:20,w:50,h:50};

GRW.infoButtons = [
	{
		"name": "cellType",
		"displayName": "Cell Type: ",
		"box": {x:1/12, y:1/96, w:10/12, h:10/96}
	},
	{
		"name": "airMeter",
		"displayName": "Air: ",
		"box": {x:1/12, y:11/96, w:10/12, h:10/96}
	},
	{
		"name": "soilMeter",
		"displayName": "Soil: ",
		"box": {x:1/12, y:21/96, w:10/12, h:10/96}
	},
	{
		"name": "transportation",
		"displayName": "Transportation: ",
		"box": {x:1/12, y:31/96, w:10/12, h:10/96}
	},
	{
		"name": "consumption",
		"displayName": "Consumption: ",
		"box": {x:1/12, y:41/96, w:10/12, h:10/96}
	},
	{
		"name": "conversion",
		"displayName": "Conversion: ",
		"box": {x:1/12, y:51/96, w:10/12, h:10/96}
	},
	{
		"name": "production",
		"displayName": "Production: ",
		"box": {x:1/12, y:61/96, w:10/12, h:10/96}
	}
];

GRW.selectButtons = [
	{
		"name": "query",
		"displayName": "q",
		"box": {x:1/24, y:1/48, w:10/24, h:10/48}
	},
	{
		"name": "empty",
		"displayName": "e",
		"box": {x:0.5+1/24, y:1/48, w:10/24, h:10/48}
	},
	{
		"name": "leaf",
		"displayName": "l",
		"box": {x:1/24, y:0.25+1/48, w:10/24, h:10/48}
	},
	{
		"name": "root",
		"displayName": "r",
		"box": {x:0.5+1/24, y:0.25+1/48, w:10/24, h:10/48}
	},
	{
		"name": "zylem",
		"displayName": "z",
		"box": {x:1/24, y:0.5+1/48, w:10/24, h:10/48}
	},
	{
		"name": "phloem",
		"displayName": "p",
		"box": {x:0.5+1/24, y:0.5+1/48, w:10/24, h:10/48}
	},
	{
		"name": "stem",
		"displayName": "s",
		"box": {x:1/24, y:0.75+1/48, w:10/24, h:10/48}
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

GRW.clampGameBox = function() {
	var w = GRW.gameState.w;
	var h = GRW.gameState.h;
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

GRW.drawInfoBox = function() {
	var ctx = GRW.ctx;
	ctx.save();

	var parentBox = GRW.infoBox;

	var w = GRW.canvas.width;
	var h = GRW.canvas.height;

	ctx.font = 0.023*(w+h)/2 + "px Lucida Console";
	ctx.textAlign = "left";
	ctx.textBaseline = "middle";

	ctx.fillStyle = 'rgba(255,255,255,0.8)';
	ctx.fillRect(parentBox.x*w,parentBox.y*h,parentBox.w*w,parentBox.h*h);


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

				ctx.fillStyle = 'rgba(127,127,127,0.8)';
				ctx.fillRect(b.x*w,b.y*h,rightMax*w,b.h*h);

				ctx.fillStyle = GRW.colorToStr(GRW.colors[typeName]);
				ctx.fillRect(b.x*w,b.y*h,x*rightMax*w,b.h*h);
				
				ctx.fillStyle = 'black';
				ctx.fillText("("+(r[rI]|0)+"/"+(c[rI]|0)+")", (b.x+rightMax)*w, center.y*h);
			} else {
				ctx.fillStyle = 'black';
				ctx.fillText(displayText, b.x*w, center.y*h);
			}
		}

		// ctx.fillStyle = GRW.colorToStr(GRW.colors[cell.name]);
		// ctx.fillText(cell.name, 0.935*w, 0.16*h);
			
		// ctx.fillStyle = 'black';
		// ctx.fillText("Capacity: " + cell.capacity.toString(), 0.935*w, 0.24*h);
		// ctx.fillText("Consumption: " + cell.consumption.toString(), 0.935*w, 0.32*h);
		// ctx.fillText("Transportation: " + cell.transportation.toString(), 0.935*w, 0.4*h);
		// ctx.fillText("Conversion: " + cell.conversion.toString(), 0.935*w, 0.48*h);
		// ctx.fillText("Total Plant Cells: " + GRW.gameState.numPlant, 0.935*w, 0.56*h);

		// var r = cell.resources;
		// var c = cell.capacity;

		// var x0 = 1;
		// var x1 = 1;

		// if(c[0] != 0) {
		// 	x0 = r[0]/c[0];
		// }
		
		// if(c[1] != 0) {
		// 	x1 = r[1]/c[1];
		// }


		// ctx.fillStyle = GRW.colorToStr(GRW.colors["air"]);
		// ctx.fillRect(b.x*w,0.64*h,x0*b.w*w,0.04*h);
		// ctx.fillStyle = GRW.colorToStr(GRW.colors["soil"]);
		// ctx.fillRect(b.x*w,0.72*h,x1*b.w*w,0.04*h);

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
	ctx.fillRect(parentBox.x*w,parentBox.y*h,parentBox.w*w,parentBox.h*h);

	for(var i = 0; i < GRW.selectButtons.length; i++) {
		var button = GRW.selectButtons[i];

		var b = GRW.getSubBox(parentBox, button.box);
		var center = {x: b.x+b.w/2, y: b.y+b.h/2};
		ctx.fillStyle = 'rgba(127,127,127,0.8)';
		ctx.fillRect(b.x*w,b.y*h,b.w*w,b.h*h);
			
		ctx.fillStyle = 'black';
		ctx.fillText(button.displayName, center.x*w, center.y*h);
	}

	ctx.restore();
};


GRW.drawCells = function() {
	var ctx = GRW.ctx;
	ctx.save();

	var w = GRW.canvas.width;
	var h = GRW.canvas.height;

	var numCol = GRW.gameState.w;
	var numRow = GRW.gameState.h;

	GRW.clampGameBox();

	var b = GRW.gameBox;
	var cellW = w/b.w;
	var cellH = h/b.h;

	ctx.font = 0.012*(w+h)/2 + "px Lucida Console";

	var xEnd = Math.max(0,Math.min(numCol-1, b.x+b.w));
	var yEnd = Math.max(0,Math.min(numRow-1, b.y+b.h));
	var xStart = Math.max(0,Math.min(numCol-1, b.x));
	var yStart = Math.max(0,Math.min(numRow-1, b.y));
	for(var y = yStart; y <= yEnd; y++) {
		for(var x = xStart; x <= xEnd; x++) {
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
