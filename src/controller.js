"use strict";
var GRW = {};

GRW.initDefaultValues = function() {
	GRW.canvasID = "#canvas";
	GRW.dirtyCanvas = true;
	GRW.lastFrameTime = 0;
	GRW.mousePos = {'x':0.5,'y':0.5};
	GRW.mouseDownPos = {x:-1,y:-1};
	GRW.mouseState = "up";

	GRW.moveElement = "";
	GRW.worldID = "";

	GRW.mouseMoved = false;
	GRW.particles = {};

	GRW.animationPhase = ""; // "starting", "won", "lost"
	GRW.animationTimeStart = 0;
	GRW.animationPhaseTimes = {
		"starting": 500,
		"won": 500,
		"lost": 3000
	};

	GRW.viewPage = "menu";

	GRW.cellTypeAdd = "query";

	GRW.gameState = {};

	GRW.level = 0;
	GRW.time = 0;

	GRW.dirtyCells = {x:0,y:0,w:-1,h:-1};
};

GRW.main = function() {
	GRW.initDefaultValues();
	GRW.startSession();

	requestAnimationFrame(GRW.gameLoop);
};

window.onload = GRW.main;

GRW.startSession = function() {
	GRW.canvas = $(GRW.canvasID)[0];
	GRW.ctx = GRW.canvas.getContext("2d");

	// GRW.setLevelRenderBox();
	GRW.loadGameState();

	GRW.resizeToFit();

	GRW.dirtyCanvas = true;
	GRW.initEvents();
};

GRW.gameLoop = function(time) {
	var ctx = GRW.ctx;
	GRW.time = time;
	if(GRW.animationPhase !== "") {
		var dTime = GRW.animationPhaseTimes[GRW.animationPhase];
		if(dTime < time - GRW.animationTimeStart) {
			if(GRW.animationPhase == "lost") {
				GRW.viewPage = "menu";
			}

			GRW.animationPhase = "";
		}
	}

	if(GRW.dirtyCanvas){

		// GRW.dirtyCanvas = false;
		// Note can't use dirtyCanvas optimization right now
		// Because cells can change without user input

		if(GRW.viewPage == "game") {
			GRW.drawClear();
			GRW.drawGame();
		}else if(GRW.viewPage == "menu") {
			GRW.drawClear();
			GRW.drawMenu();
		}
	}

	GRW.frameRenderTime = time - GRW.lastFrameTime;
	
	if(GRW.frameRenderTime > 50) {
		GRW.frameRenderTime = 50;

		if(GRW.viewPage == "game") {
			GRW.updateModel(GRW.frameRenderTime/1000);
		}
		
		GRW.lastFrameTime = time;
	}

	requestAnimationFrame(GRW.gameLoop);
};

GRW.startNewGame = function() {
	GRW.viewPage = "game";
	GRW.initNewGameState();
};

GRW.lose = function() {
	GRW.animationTimeStart = GRW.time;
	GRW.animationPhase = "lost";
};

GRW.saveStats = function() {
	if(GRW.score > GRW.topScore) {
		GRW.topScore = GRW.score;
		GRW.saveGameState();
	}
};

GRW.copyBox = function(box) {
	return {
		x: box.x,
		y: box.y,
		w: box.w,
		h: box.h
	};
}

GRW.selectCell = function(x,y) {
	var w = GRW.gameState.w;
	var h = GRW.gameState.h;

	GRW.selectedCell = GRW.gameState.cells[w*y+x];

	GRW.createCell(GRW.cellTypeAdd, x, y);
};

GRW.moveLeft = function() {
	GRW.gameBox.x -= 1;
};

GRW.moveRight = function() {
	GRW.gameBox.x += 1;
};

GRW.moveUp = function() {
	GRW.gameBox.y -= 1;
};

GRW.moveDown = function() {
	GRW.gameBox.y += 1;
};

GRW.scaleGameBox = function(scale) {
	GRW.gameBox.x += (1-scale)/2*GRW.gameBox.w;
	GRW.gameBox.y += (1-scale)/2*GRW.gameBox.h;
	
	GRW.gameBox.w *= scale;
	GRW.gameBox.h *= scale;
};

GRW.zoomOut = function() {
	GRW.scaleGameBox(1.1);
};

GRW.zoomIn = function() {
	GRW.scaleGameBox(1/1.1);
};

GRW.mousemove = function(x,y){
	var w = GRW.canvas.width;
	var h = GRW.canvas.height;

	GRW.mousePos = {'x':x,'y':y};
	
	if(GRW.mouseState == "down") {

		var distance2 = Math.pow(GRW.mouseDownPos.x - x, 2) + Math.pow(GRW.mouseDownPos.y - y, 2);
		if(distance2 > 0.04*0.04) {
			GRW.mouseMoved = true;
		}

		if(GRW.mouseMoved) {
			if(GRW.moveElement == "game") {
				GRW.gameBox.x = GRW.gameBox0.x + (GRW.mouseDownPos.x - x)*GRW.gameBox0.w;
				GRW.gameBox.y = GRW.gameBox0.y + (GRW.mouseDownPos.y - y)*GRW.gameBox0.h;
			} else if(GRW.moveElement == "selectBox") {
				GRW.selectBox.x = GRW.selectBox0.x - (GRW.mouseDownPos.x - x);
				GRW.selectBox.y = GRW.selectBox0.y - (GRW.mouseDownPos.y - y);
			} else if(GRW.moveElement == "infoBox") {
				GRW.infoBox.x = GRW.infoBox0.x - (GRW.mouseDownPos.x - x);
				GRW.infoBox.y = GRW.infoBox0.y - (GRW.mouseDownPos.y - y);
			}
		}
	}
};

GRW.gameMousedownSelect = function(x,y) {
	var parentBox = GRW.selectBox;
	var buttons = GRW.selectButtons;
	for(var i = 0; i < buttons.length; i++) {
		var button = buttons[i];

		var b = GRW.getSubBox(parentBox, button.box);
		if(GRW.pointInBox(x,y,b)) {
			GRW.cellTypeAdd = button.name;
		}
	}

};

GRW.gameMousedown = function(x,y) {
	if(GRW.pointInBox(x,y,GRW.selectBox)) {
		GRW.moveElement = "selectBox";
		GRW.gameMousedownSelect(x,y);
		GRW.selectBox0 = GRW.copyBox(GRW.selectBox);
	} else if(GRW.pointInBox(x,y,GRW.infoBox)) {
		GRW.moveElement = "infoBox";
		GRW.infoBox0 = GRW.copyBox(GRW.infoBox);
	} else {
		GRW.moveElement = "game";
		GRW.gameBox0 = GRW.copyBox(GRW.gameBox);
	}
};

GRW.menuMousedown = function(x,y) {
	var w = GRW.canvas.width;
	var h = GRW.canvas.height;

	var parentBox = GRW.saveBox;
	var buttons = GRW.saveButtons;
	for(var i = 0; i < buttons.length; i++) {
		var button = buttons[i];

		var b = GRW.getSubBox(parentBox, button.box);
		if(GRW.pointInBox(x,y,b)) {
			GRW.worldID = button.name;
			GRW.startNewGame();
			break;
		}
	}
};

GRW.mousedown = function(x,y) {
	GRW.mousePos = {'x':x,'y':y};
	GRW.mouseDownPos = {'x':x,'y':y};
	GRW.mouseState = "down";
	GRW.mouseMoved = false;

	if(GRW.viewPage == "game" && GRW.animationPhase !== "lost") {
		GRW.gameMousedown(x,y);
	}else if(GRW.viewPage == "menu") {
		GRW.menuMousedown(x,y);
	}
};

GRW.mouseup = function(x,y) {
	var w = GRW.canvas.width;
	var h = GRW.canvas.height;

	GRW.mousePos = {'x':x,'y':y};
	GRW.mouseState = "up";

	if(!GRW.mouseMoved && GRW.viewPage == "game") {
		var w = GRW.canvas.width;
		var h = GRW.canvas.height;

		var cellX = Math.floor(x * GRW.gameBox.w + GRW.gameBox.x);
		var cellY = Math.floor(y * GRW.gameBox.h + GRW.gameBox.y);

		GRW.selectCell(cellX, cellY);
	}
};

GRW.resizeToFit = function() {
	var w = $(window).width();
	var h = $(window).height();

	GRW.canvas.width  = w;
	GRW.canvas.height = h;

	GRW.gameBox.h = h / w * GRW.gameBox.w | 0;

	GRW.dirtyCanvas = true;
};

GRW.keydown = function(e) {
	GRW.keyControlDown(e.which);
}

// *** Event binding *** //
GRW.initEvents = function(){
	$(window).resize(function(){
		GRW.resizeToFit();
	});

	$(window).mousemove(function (e) {
		var offset = $(GRW.canvasID).offset();
		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;

		var w = GRW.canvas.width;
		var h = GRW.canvas.height;

		GRW.mousemove(x/w,y/h);
	});

	$(window).mousedown(function (e) {
		var offset = $(GRW.canvasID).offset();
		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;

		var w = GRW.canvas.width;
		var h = GRW.canvas.height;

		GRW.mousedown(x/w,y/h);
	});

	$(window).mouseup(function (e) {
		var offset = $(GRW.canvasID).offset();
		var x = e.pageX - offset.left;
		var y = e.pageY - offset.top;

		var w = GRW.canvas.width;
		var h = GRW.canvas.height;
		GRW.mouseup(x/w,y/h);
	});

	$(document).keydown(function (e) {
		GRW.keydown(e);
	});
};

GRW.loadGameState = function(){
	if (!supports_html5_storage()) { return false; }
	
	var gameData = localStorage["GRW.gameData"];
	if(typeof gameData === "string") {
		GRW.gameData = JSON.parse(gameData);
	}
};

GRW.saveGameState = function() {
	if (!supports_html5_storage()) { return false; }
	localStorage["GRW.gameData"] = GRW.gameData;
};

// *** LocalStorage Check ***
function supports_html5_storage() {
	try{
		return 'localStorage' in window && window['localStorage'] !== null;
	}catch (e){
		return false;
	}
}

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
 
// MIT license
 
(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());