GRW.updateModel = function(dt) {
	GRW.cellsTransport(dt);
	GRW.cellsUpdate(dt);
};

GRW.cellsTransport = function(dt) {
	var w0 = GRW.gameState.w;
	var h0 = GRW.gameState.h;

	for(var k = 0; k <= 1; k++) {
		if(k == 0) {
			var w = w0;
			var h = h0;
		} else {
			var h = w0;
			var w = h0;
		}
		for(var y = 0; y < h; y++) {
			var lastdeltaR = [0,0];
			for(var x = 1; x < w; x++) {

				if(k == 0) {		
					var cell0 = GRW.gameState.cells[y*w0+x-1];
					var cell1 = GRW.gameState.cells[y*w0+x];
				} else {
					var cell0 = GRW.gameState.cells[(x-1)*w0+y];
					var cell1 = GRW.gameState.cells[x*w0+y];	
				}

				var p0 = cell0.plant;
				var p1 = cell1.plant;

				for(var rI = 0; rI <= 1; rI++) {
					var r0 = cell0.resources[rI] - lastdeltaR[rI];
					var r1 = cell1.resources[rI];
					var c0 = cell0.capacity[rI];
					var c1 = cell1.capacity[rI];

					var avgT = (cell0.transport[rI] + cell1.transport[rI])/2;
					if(p0 && p1 || (!p0 && !p1)) {
						var rAvg = (r0+r1)/2;
						var rDelta = avgT*dt*(rAvg - r1);
						
						if(r1+rDelta > c1) {
							rDelta = c1 - r1;
						}
						if(r0+lastdeltaR[rI]-rDelta > c0) {
							rDelta = r0+lastdeltaR[rI] - c0;
						}
					} else if(p1) {
						var rDelta = dt*r0;
						if(r1 + rDelta > c1) {
							rDelta = c1 - r1;
						}
					} else {
						var rDelta = -dt*r1;
						if(r0+lastdeltaR[rI] - rDelta > c0) {
							rDelta = r0+lastdeltaR[rI] - c0;
						}
					}

					cell0.resources[rI] -= rDelta;
					cell1.resources[rI] += rDelta;
					lastdeltaR[rI] = rDelta;
				}
			}
		}
	}
};

GRW.cellsUpdate = function(dt) {
	var w = GRW.gameState.w;
	var h = GRW.gameState.h;

	for(var y = 0; y < h; y++) {
		for(var x = 0; x < w; x++) {
			var cell = GRW.gameState.cells[y*w+x];

			var r0 = cell.resources[0];
			r0 += dt*(cell.production[0] - cell.consumption[0]);

			if(r0 > cell.capacity[0]) {
				r0 = cell.capacity[0];
			}

			if(r0 < 0 && cell.plant) {
				GRW.killCell(x,y);
			}

			var r1 = cell.resources[1];
			r1 += dt*(cell.production[1] - cell.consumption[1]);

			if(r1 > cell.capacity[1]) {
				r1 = cell.capacity[1];
			}

			if(r1 < 0 && cell.plant) {
				GRW.killCell(x,y);
			}

			cell.resources = [r0,r1];
		}
	}
};

GRW.killCell = function(x, y) {
	var cell = GRW.gameState.cells[GRW.gameState.w*y+x];
	if(!cell || !cell.plant) {return;}
	// console.log("kill",cell);

	if(y < GRW.gameState.groundY) {
		GRW.createCell("air", x, y);
	} else {
		GRW.createCell("soil", x, y);
	}
};

GRW.createCell = function(type, x, y) {
	var w = GRW.gameState.w;
	var h = GRW.gameState.h;
	var cellType = GRW.cellTypes[type];

	if(cellType.plant && (x <= 0 || x >= w-1)) {return;}
	if(cellType.plant && (y <= 0 || y >= h-1)) {return;}

	if(type == "empty") {GRW.killCell(x,y); return;}

	var cells = GRW.gameState.cells;

	var newCell = {};

	for(var key in cellType) {
		if(typeof cellType[key] === "object") {
			newCell[key] = cellType[key].slice(0);
		} else {
			newCell[key] = cellType[key];
		}
	}

	cells[w*y+x] = newCell;
	GRW.invalidateView(x,y);
};

GRW.initNewGameState = function() {
	GRW.initModel();

	var state = {};
	var w = 50;
	var h = w * GRW.canvas.height / GRW.canvas.width + 0.5 | 0;

	state.w = w;
	state.h = h;

	state.viewCenter = [w/2,h/2];
	state.viewSize = [w/4,h/4];

	var cells = {};
	state.cells = cells;

	GRW.gameState = state;

	//Create initial cells
	var groundY = state.h * 0.8 | 0;
	state.groundY = groundY;

	for(var y = 0; y < h; y++) {
		for(var x = 0; x < w; x++) {
			var createType = "empty";
			if(y < groundY) {
				createType = "air";
				if(y == 0 || x == 0 || x == w-1) {
					createType = "airGen";
				}
			} else {
				createType = "soil";
				if(y == h-1 || x == 0 || x == w-1) {
					createType = "soilGen";
				}
			}
			GRW.createCell(createType, x, y);
		}
	}

	GRW.createCell("leaf", state.w/2|0, groundY-1);
	GRW.createCell("root", state.w/2|0, groundY);
};

GRW.initModel = function() {
	var cellTypes = {};
	
	cellTypes["empty"] = {
		"name": "empty",
		"plant": false,
		"consumption": [0,0],
		"production": [0,0],
		"capacity": [0,0],
		"resources": [0,0],
		"transport": [0,0]
	};

	cellTypes["air"] = {
		"name": "air",
		"plant": false,
		"consumption": [0,0],
		"production": [0,0],
		"capacity": [100,0],
		"resources": [100,0],
		"transport": [10,0]
	};

	cellTypes["soil"] = {
		"name": "soil",
		"plant": false,
		"consumption": [0,0],
		"production": [0,0],
		"capacity": [0,100],
		"resources": [0,100],
		"transport": [0,10]
	};

	cellTypes["airGen"] = {
		"name": "airGen",
		"plant": false,
		"consumption": [0,0],
		"production": [1000,0],
		"capacity": [1000,0],
		"resources": [1000,0],
		"transport": [10,0]
	};

	cellTypes["soilGen"] = {
		"name": "soilGen",
		"plant": false,
		"consumption": [0,0],
		"production": [0,1000],
		"capacity": [0,1000],
		"resources": [0,1000],
		"transport": [0,10]
	};

	cellTypes["leaf"] = {
		"name": "leaf",
		"plant": true,
		"consumption": [0.8, 0.4],
		"production": [0, 0],
		"capacity": [20, 20],
		"resources": [1, 1],
		"transport": [1, 1]
	};
	
	cellTypes["root"] = {
		"name": "root",
		"plant": true,
		"consumption": [0.8, 0.4],
		"production": [0, 0],
		"capacity": [20, 20],
		"resources": [1, 1],
		"transport": [1, 1]
	};

	cellTypes["zylem"] = {
		"name": "zylem",
		"plant": true,
		"consumption": [0.2, 0.1],
		"production": [0, 0],
		"capacity": [20, 20],
		"resources": [1, 1],
		"transport": [1, 5]
	};

	cellTypes["phloem"] = {
		"name": "phloem",
		"plant": true,
		"consumption": [0.4, 0.2],
		"production": [0, 0],
		"capacity": [20, 20],
		"resources": [1, 1],
		"transport": [5, 1]
	};

	cellTypes["stem"] = {
		"name": "stem",
		"plant": true,
		"consumption": [0.2, 0.1],
		"production": [0, 0],
		"capacity": [20, 20],
		"resources": [1, 1],
		"transport": [1, 1]
	};

	GRW.cellTypes = cellTypes;
};