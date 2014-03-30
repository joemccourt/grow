"use strict";
var GRW = {};

GRW.initDefaultValues = function() {
	GRW.canvasID = "#canvas";
	GRW.dirtyCanvas = true;
	GRW.lastFrameTime = 0;
	GRW.mousePos = {'x':0.5,'y':0.5};
	GRW.mouseState = "up";

	GRW.particles = {};

	GRW.animationPhase = ""; // "starting", "won", "lost"
	GRW.animationTimeStart = 0;
	GRW.animationPhaseTimes = {
		"starting": 500,
		"won": 500,
		"lost": 3000
	};

	GRW.viewPage = "menu";

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

		if(GRW.viewPage == "game") {
			GRW.drawClear();
			GRW.drawGame();
		}else if(GRW.viewPage == "menu") {
			GRW.drawClear();
			GRW.drawMenu();
		}
	}

	requestAnimationFrame(GRW.gameLoop);

	GRW.frameRenderTime = time - GRW.lastFrameTime;
	
	if(GRW.frameRenderTime > 100) {
		GRW.frameRenderTime = 100;
	}

	if(GRW.viewPage == "game") {
		GRW.updateModel(GRW.frameRenderTime/1000);
	}
	
	GRW.lastFrameTime = time;
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

GRW.mousemove = function(x,y){
	var w = GRW.canvas.width;
	var h = GRW.canvas.height;

	GRW.mousePos = {'x':x,'y':y};
};

GRW.gameMousedown = function(x,y) {
	var w = GRW.canvas.width;
	var h = GRW.canvas.height;

	var cellX = x * GRW.gameState.w | 0;
	var cellY = y * GRW.gameState.h | 0;

	GRW.createCell("plant", cellX, cellY);
};

GRW.menuMousedown = function(x,y) {
	var w = GRW.canvas.width;
	var h = GRW.canvas.height;

	GRW.startNewGame();
};

GRW.mousedown = function(x,y) {
	GRW.mousePos = {'x':x,'y':y};
	GRW.mouseDownPos = {'x':x,'y':y};
	GRW.mouseState = "down";

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
};

GRW.resizeToFit = function() {
	var w = $(window).width();
	var h = $(window).height();

	GRW.canvas.width  = w;
	GRW.canvas.height = h;

	GRW.dirtyCanvas = true;
};

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
};

GRW.loadGameState = function(){
	if (!supports_html5_storage()) { return false; }

	var localTopScore = localStorage["GRW.topScore"];
	if(typeof localTopScore === "string") {
		GRW.topScore = JSON.parse(localTopScore);
	}
};

GRW.saveGameState = function() {
	if (!supports_html5_storage()) { return false; }
	localStorage["GRW.topScore"] = GRW.topScore;
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