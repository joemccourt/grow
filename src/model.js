GRW.updateModel = function(dt) {
	GRW.cellsTransport(dt);
	GRW.cellsUpdate(dt);
};

GRW.cellsTransport = function(dt) {
	var w0 = GRW.gameState.w;
	var h0 = GRW.gameState.h;

	for(var k = 0; k <= 3; k++) {
		if(k % 2 == 0) {
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
				} else if (k == 1) {
					var cell0 = GRW.gameState.cells[(x-1)*w0+y];
					var cell1 = GRW.gameState.cells[x*w0+y];	
				} else if (k == 2) {
					var cell0 = GRW.gameState.cells[y*w0+w-x-1];
					var cell1 = GRW.gameState.cells[y*w0+w-x];	
				} else if (k == 3) {
					var cell0 = GRW.gameState.cells[(w-x-1)*w0+y];
					var cell1 = GRW.gameState.cells[(w-x)*w0+y];	
				}

				var p0 = cell0.plant;
				var p1 = cell1.plant;

				for(var rI = 0; rI <= 1; rI++) {
					var r0 = cell0.resources[rI] - lastdeltaR[rI];
					var r1 = cell1.resources[rI];
					var c0 = cell0.capacity[rI];
					var c1 = cell1.capacity[rI];

					var avgT = (cell0.transportation[rI] + cell1.transportation[rI])/2;
					if(p0 && p1 || (!p0 && !p1)) {

						var d0 = r0/c0;
						var d1 = r1/c1;
						if(c0 == 0) {d0 = 1;}
						if(c1 == 0) {d1 = 1;}
						if(r0 == 0) {d0 = 0;}
						if(r1 == 0) {d1 = 0;}

						var rAvg = (r0+r1)/2;
						var rDelta = avgT*dt*(d0 - d1)*c0;
						
						if(r1+rDelta > c1) {
							rDelta = c1 - r1;
						}
						if(r0+lastdeltaR[rI]-rDelta > c0) {
							rDelta = r0+lastdeltaR[rI] - c0;
						}
					} else if(p1) {
						var rDelta = cell1.conversion[rI]*dt*r0;
						if(r1 + rDelta > c1) {
							rDelta = c1 - r1;
						}
					} else {
						var rDelta = -cell0.conversion[rI]*dt*r1;
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

	var numPlant = 0;
	for(var y = 0; y < h; y++) {
		for(var x = 0; x < w; x++) {
			var cell = GRW.gameState.cells[y*w+x];

			if(cell.plant) {numPlant++;}

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

	GRW.gameState.numPlant = numPlant;
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

GRW.getPlantNeighbors = function(x,y) {

	var cells = GRW.gameState.cells;
	var w = GRW.gameState.w;
	var h = GRW.gameState.h;
	var plantCells = [];
	if(x > 0) {
		cell = cells[w*y+x-1];
		if(cell.plant) {plantCells.push(cell);}
	}
	if(y > 0) {
		cell = cells[w*(y-1)+x];
		if(cell.plant) {plantCells.push(cell);}
	}
	if(x < w-1) {
		cell = cells[w*y+x+1];
		if(cell.plant) {plantCells.push(cell);}
	}
	if(y < h-1) {
		cell = cells[w*(y+1)+x];
		if(cell.plant) {plantCells.push(cell);}
	}
	return plantCells;
};

GRW.createCell = function(type, x, y, init) {
	var w = GRW.gameState.w;
	var h = GRW.gameState.h;
	var cellType = GRW.cellTypes[type];
	var currentCell = GRW.gameState.cells[w*y+x];

	if(!cellType) {return;}

	if(cellType.plant && (x <= 0 || x >= w-1)) {return;}
	if(cellType.plant && (y <= 0 || y >= h-1)) {return;}

	if(type == "empty") {GRW.killCell(x,y); return;	}
	if(currentCell && type == currentCell.name) {return;}

	if(cellType.plant && !init) {
		var plantCells = GRW.getPlantNeighbors(x,y);
		if(plantCells.length == 0) {return;}

		//Just use max for now, could be improved
		var bestCell = plantCells[0];
		var maxR = plantCells[0].resources[0];
		for(var i = 1; i < plantCells.length; i++) {
			if(maxR < plantCells[i].resources[0]) {
				maxR = plantCells[i].resources[0];
				bestCell = plantCells[i];
			}
		}

		if(bestCell.resources[0] > cellType.resources[0] && bestCell.resources[1] > cellType.resources[1]) {
			bestCell.resources[0] -= cellType.resources[0];
			bestCell.resources[1] -= cellType.resources[1];
		} else {
			return;
		}
	}

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
	var w = 80;
	var h = w;// * GRW.canvas.height / GRW.canvas.width + 0.5 | 0;

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

	GRW.createCell("leaf", state.w/2|0, groundY-1, true);
	GRW.createCell("root", state.w/2|0, groundY, true);

	GRW.selectedCell = GRW.gameState.cells[w*(groundY-1)+state.w/2|0];

	GRW.gameBox.x = w/2 - GRW.gameBox.w/2|0;
	GRW.gameBox.y = groundY - GRW.gameBox.h/2|0;
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
		"transportation": [0,0],
		"conversion": [0, 0]
	};

	cellTypes["air"] = {
		"name": "air",
		"plant": false,
		"consumption": [0,0],
		"production": [0,0],
		"capacity": [100,0],
		"resources": [100,0],
		"transportation": [10,0],
		"conversion": [0, 0]
	};

	cellTypes["soil"] = {
		"name": "soil",
		"plant": false,
		"consumption": [0,0],
		"production": [0,0],
		"capacity": [0,100],
		"resources": [0,100],
		"transportation": [0,10],
		"conversion": [0, 0]
	};

	cellTypes["airGen"] = {
		"name": "airGen",
		"plant": false,
		"consumption": [0,0],
		"production": [1000,0],
		"capacity": [1000,0],
		"resources": [1000,0],
		"transportation": [10,0],
		"conversion": [0, 0]
	};

	cellTypes["soilGen"] = {
		"name": "soilGen",
		"plant": false,
		"consumption": [0,0],
		"production": [0,1000],
		"capacity": [0,1000],
		"resources": [0,1000],
		"transportation": [0,10],
		"conversion": [0, 0]
	};

	cellTypes["leaf"] = {
		"name": "leaf",
		"plant": true,
		"consumption": [0.8, 0.4],
		"production": [0, 0],
		"capacity": [20, 20],
		"resources": [10, 10],
		"transportation": [1, 1],
		"conversion": [5, 0]
	};
	
	cellTypes["root"] = {
		"name": "root",
		"plant": true,
		"consumption": [0.8, 0.4],
		"production": [0, 0],
		"capacity": [20, 20],
		"resources": [10, 10],
		"transportation": [1, 1],
		"conversion": [0, 5]
	};

	cellTypes["zylem"] = {
		"name": "zylem",
		"plant": true,
		"consumption": [0.4, 0.2],
		"production": [0, 0],
		"capacity": [20, 50],
		"resources": [10, 10],
		"transportation": [1, 7],
		"conversion": [0, 0]
	};

	cellTypes["phloem"] = {
		"name": "phloem",
		"plant": true,
		"consumption": [0.4, 0.2],
		"production": [0, 0],
		"capacity": [50, 20],
		"resources": [10, 10],
		"transportation": [7, 1],
		"conversion": [0, 0]
	};

	cellTypes["stem"] = {
		"name": "stem",
		"plant": true,
		"consumption": [0.15, 0.1],
		"production": [0, 0],
		"capacity": [50, 50],
		"resources": [10, 10],
		"transportation": [1, 1],
		"conversion": [0, 0]
	};

	GRW.cellTypes = cellTypes;
};