
GRW.drawBackgroundBasedOnID = function(canvas, id){
	
	if(id == "select") {
		var alpha = 0.65;

		var ctx = canvas.getContext('2d');
		ctx.save();
		ctx.fillStyle = 'rgba(255,255,255,'+alpha+')';
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.restore();

		var colorSet = GRW.blendSetWithColor(GRW.colorSets['pastels'], GRW.colors.white, 0.8);
		// GRW.bgCircles(canvas,colorSet,5,0.8,10);
		GRW.bgSquareGrid(canvas,colorSet,10,alpha,10);

		// GRW.bgTriGrid(canvas,colorSet,3,1,401,"halfstripes");
		// GRW.bgTriGrid(canvas,GRW.colorSets['pastels'],5,0.8,40);
	} else if(id == "info") {
		var alpha = 0.65;

		var ctx = canvas.getContext('2d');
		ctx.save();
		ctx.fillStyle = 'rgba(255,255,255,'+alpha+')';
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.restore();

		var colorSet = GRW.blendSetWithColor(GRW.colorSets['pastels'], GRW.colors.white, 0.5);
		// GRW.bgSquareGrid(canvas,colorSet,10,0.8,10);
		// GRW.bgTriGrid(canvas,colorSet,30,0.8,10,"diamonds");;

		GRW.bgTriGrid(canvas,colorSet,13,alpha,40);
	} else if(id == "gamebg") {
		var alpha = 0.65;

		var ctx = canvas.getContext('2d');
		ctx.save();
		ctx.fillStyle = 'rgba(255,255,255,'+alpha+')';
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.restore();

		var colorSet = GRW.blendSetWithColor(GRW.colorSets['xanthe'], GRW.colors.white, 0.5);
		
		GRW.bgTriGrid(canvas,colorSet,13,alpha,40);
	}

	if(id == 0){
		GRW.bgTriGrid(canvas,GRW.colorSets['xanthe'].slice(1,4),20,0.6,10,"hex");
	}else if(id == 1){
		GRW.bgTriGrid(canvas,GRW.colorSets['popIsEverything'],7,0.4,90,"halfstripes");
	}else if(id == 2){
		GRW.bgTriGrid(canvas,GRW.colorSets['pastels'],30,0.3,40);
	}else if(id == 3){
		GRW.bgTriGrid(canvas,GRW.colorSets['melonBallSurprise'],50,1,40);
	}else if(id == 4){
		GRW.bgTriGrid(canvas,GRW.colorSets['pastels'],10,0.5,10,"diamonds");
	}else if(id == 5){
		GRW.bgCircles(canvas,GRW.colorSets['petit'],50,1,14133);
	}else if(id == 6){
		GRW.bgTriGrid(canvas,GRW.colorSets['pastels'].slice(1,4),30,0.45,10,"hex");
	}else if(id == 7){
		GRW.bgTriGrid(canvas,GRW.colorSets['pastels'],15,0.6,10,"stripes");
	}else if(id == 8){
		GRW.bgTriGrid(canvas,GRW.colorSets['voyage'],10,0.5,10,"halfstripes");
	}else if(id == 9){
		GRW.bgSquareGrid(canvas,GRW.colorSets['pastels'],30,0.5,10);
	}else if(id == 10){
		GRW.bgSquareGrid(canvas,GRW.colorSets['primaries'],60,0.3,10);
	}else if(id == 11){
		GRW.bgSquareGrid(canvas,GRW.colorSets['pastels'],5,0.2,10);
	}else if(id == 12){
		GRW.bgCircles(canvas,GRW.colorSets['aKissToAwake'],5,0.3,10);
		GRW.bgCircles(canvas,GRW.colorSets['oceanFive'],5,0.3,10);
	}else if(id == 13){
		GRW.bgTriGrid(canvas,GRW.colorSets['melonBallSurprise'].slice(0,3),30,0.6,10,"hex");
	}else if(id == 14){
		GRW.bgTriGrid(canvas,GRW.colorSets['loveFlowers'],30,0.35,10,"diamonds");
	}else if(id == 15){
		GRW.bgSquareGrid(canvas,GRW.colorSets['popIsEverything'],75,0.2,10);
	}else if(id == 16){
		GRW.bgTriGrid(canvas,GRW.colorSets['oceanFive'],50,0.3,10,"halfstripes");
	}else if(id == 17){		
		GRW.bgTriGrid(canvas,GRW.colorSets['pastels'],20,0.7,0);
	}else if(id == 18){
		GRW.bgTriGrid(canvas,GRW.colorSets['oceanFive'],15,0.6,10,"hex");
	}else if(id == 19){
		GRW.bgTriGrid(canvas,GRW.colorSets['iridescentSunset'],3,1,401,"halfstripes");
	}else if(id == 20){
		GRW.bgTriGrid(canvas,GRW.colorSets['aKissToAwake'],80,1,41);
	}else if(id == 21){
		GRW.bgTriGrid(canvas,GRW.colorSets['melonBallSurprise'],5,1,41,"stripes");
	}else if(id == 22){
		GRW.bgTriGrid(canvas,GRW.colorSets['popIsEverything'],5,0.4,41,"hex");
	}else if(id == 23){
		GRW.bgCircles(canvas,GRW.colorSets['loveFlowers'],5,0.3,141);
	}else if(id == 24){
		GRW.bgSquareGrid(canvas,GRW.colorSets['loveFlowers'],75,0.2,10);
	}else if(id == 25){
		GRW.bgSquareGrid(canvas,[GRW.colors['black'],GRW.colors['white']],50,0.2,13);
	}else if(id == 26){
		GRW.bgTriGrid(canvas,GRW.colorSets['snowyOwl'],7,1,90);
	}else if(id == 27){
		GRW.bgTriGrid(canvas,[GRW.colors['black'],GRW.colors['white']],31,0.5,10,"split");
	}else if(id == 28){
		GRW.bgTriGrid(canvas,GRW.colorSets['pastels'],15,0.6,10,"3d");
	}else if(id == 29){
		GRW.bgTriGrid(canvas,GRW.colorSets['oceanFive'],5,0.6,41,"stripes");
		GRW.bgCircles(canvas,GRW.colorSets['snowyOwl'],50,1,71413);
	}else if(id == 30){
		GRW.bgTriGrid(canvas,GRW.colorSets['popIsEverything'],25,0.4,41,"hex");
	}else if(id == 31){
		GRW.bgSquareGrid(canvas,GRW.colorSets['voyage'],75,0.6,10);
	}else if(id == 32){
		GRW.bgTriGrid(canvas,GRW.colorSets['giantGoldfish'],65,0.6,51,"hex");
	}else if(id == 33){
		GRW.bgTriGrid(canvas,GRW.colorSets['snowyOwl'],70,0.6,41);
		GRW.bgCircles(canvas,GRW.colorSets['pastels'],50,0.3,71413);
	}else if(id == 34){
		GRW.bgTriGrid(canvas,GRW.colorSets['oceanFive'],50,0.5,10,"diamonds");
	}else if(id == 35){
		GRW.bgTriGrid(canvas,GRW.colorSets['iridescentSunset'],30,0.3,41);
	}else if(id == 36){
		GRW.bgSquareGrid(canvas,GRW.colorSets['voyage'],70,1,41);
		GRW.bgCircles(canvas,GRW.colorSets['voyage'],50,1,71413);
	}else if(id == 37){
		GRW.bgTriGrid(canvas,GRW.colorSets['oceanFive'],5,1,4191,"stripes");
	}else if(id == 38){
		GRW.bgCircles(canvas,GRW.colorSets['pastels'],50,0.3,741413);
		GRW.bgTriGrid(canvas,GRW.colorSets['popIsEverything'],5,0.15,4191,"stripes");
		GRW.bgCircles(canvas,GRW.colorSets['pastels'],50,0.3,71413);
	}else if(id == 39){
		GRW.bgTriGrid(canvas,GRW.colorSets['loveFlowers'],75,0.4,10);
	}else if(id == 40){
		GRW.bgTriGrid(canvas,GRW.colorSets['giantGoldfish'],19,0.4,51);
	}else if(id == 41){
		GRW.bgTriGrid(canvas,GRW.colorSets['popIsEverything'],25,0.2,411);
	}else if(id == 42){
		GRW.bgCircles(canvas,[GRW.colors['particleBlue'],GRW.negateColor(GRW.colors['particleBlue'])],50,0.4,1413);
		GRW.bgSquareGrid(canvas,[GRW.colors['black'],GRW.colors['white']],50,0.2,43);
		GRW.bgCircles(canvas,[GRW.colors['black'],GRW.colors['white']],50,0.4,113);
	}else if(id == 43){
		GRW.bgTriGrid(canvas,GRW.colorSets['oceanFive'],15,0.4,10,"3d");
		GRW.bgSquareGrid(canvas,[GRW.colors['black'],GRW.colors['white']],50,0.2,43);
	}else if(id == 44){
		GRW.bgTriGrid(canvas,GRW.colorSets['oceanFive'],15,0.6,106);
		GRW.bgTriGrid(canvas,GRW.colorSets['oceanFive'],50,0.2,1230);
	}else if(id == 45){
		GRW.bgTriGrid(canvas,[GRW.colors['black'],GRW.colors['white']],50,0.1,1230);
		GRW.bgCircles(canvas,[GRW.colors['black'],GRW.colors['white']],50,0.2,113);
	}else if(id == 46){
		GRW.bgTriGrid(canvas,GRW.colorSets['pastels'],9,0.4,710,"diamonds");
		GRW.bgTriGrid(canvas,GRW.colorSets['pastels'],80,0.2,10,"diamonds");
	}else if(id == 47){
		GRW.bgTriGrid(canvas,GRW.colorSets['petit'],5,1,41,"stripes");
	}else if(id == 48){
		GRW.bgTriGrid(canvas,GRW.colorSets['oceanFive'],55,0.4,4191,"stripes");
	}else if(id == 49){
		GRW.bgSquareGrid(canvas,GRW.colorSets['xanthe'],50,0.3,433);
	}else if(id == 50){
		GRW.bgCircles(canvas,GRW.colorSets['snowyOwl'],80,0.5,7134);
		GRW.bgSquareGrid(canvas,GRW.colorSets['snowyOwl'],80,0.5,433);
		GRW.bgCircles(canvas,GRW.colorSets['snowyOwl'],80,0.5,4334);
	}
};

GRW.drawTriAtCoord = function(ctx, x, y, scale){
	var r3_2 = Math.sqrt(3)/2;
	var offsetX = 0;
	var offsetY = -1;
	var gridColor = [0,0,0];

	var startX = (x+offsetX) * scale * r3_2;
	var startY = 0.5 * scale * (y+offsetY);

	var v1x = startX;
	var v1y = startY;

	var v2x = startX+scale*r3_2;
	var v2y = startY+scale*0.5;

	var v3x = startX;
	var v3y = startY+scale;

	//If triangle pointing left flip x coords
	if((x+y)%2==1){
		v2x -= scale * r3_2;
		v1x += scale * r3_2;
		v3x += scale * r3_2;
	}

	ctx.moveTo(v1x,v1y);
	ctx.lineTo(v2x,v2y);
	ctx.lineTo(v3x,v3y);
	ctx.lineTo(v1x,v1y);
};
	
GRW.rng = {
	state: 0,
	setSeed:  function(seed){this.state = seed;},
	nextInt:  function(){this.state = (22695477*this.state+1) % 4294967296;},
	getFloat: function(){this.nextInt();return this.state / 4294967296;}
};

GRW.bgTriGrid = function(canvas,colors,nWidth,alpha,seed,type){
	var ctx = canvas.getContext('2d');
	ctx.save();

	var r3_2 = Math.sqrt(3)/2;
	var scale = canvas.width/nWidth/2/r3_2;
	var w = nWidth*2;
	var h = Math.ceil(Math.sqrt(3)*w*canvas.height/canvas.width)+1;

	var rng = GRW.rng;
	rng.setSeed(seed);

	var map = [];
	// var colors = GRW.colorSets['pastels'];//[[205,255,149],[255,171,97],[157,237,243],[223,253,255],[34,133,187]];
	for(var y = 0; y < h; y++){
		for(var x = 0; x < w; x++){
			map[w*y+x] = rng.getFloat()*colors.length|0;
			if(type == "diamonds"){
				if((x+y)%2==0&&x!=0){
					map[w*y+x] = map[w*y+x-1]
				}
			
			}else if(type == "split"){
				if(x >= w/2){
					map[w*y+x] = Math.floor(x/2+y/2+1)%2;
				}else{
					map[w*y+x] = (Math.floor(x/2+h-y/2)+h%2)%2;
				}
			}else if(type == "halfstripes"){
				map[w*y+x] = (x+y)%colors.length;
			}else if(type == "stripes"){
				map[w*y+x] = Math.floor((x+y+1)/2)%colors.length;
			}else if(type == "spiky"){
				map[w*y+x] = Math.floor((x+y)/4)%colors.length;
			}else if(type == "3d"){
				map[w*y+x] = Math.floor((x+y)/4+y)%2;
			}else if(type == "hex"){
				var yOff = Math.floor(y/3);
				map[w*y+x] = Math.floor((x+yOff+1)/2+yOff)%colors.length;
			}
		}
	}
	
	for(var k = 0; k < colors.length; k++){
		ctx.beginPath();
		ctx.fillStyle = GRW.colorToStr(colors[k],alpha);
		for(var y = 0; y < h; y++){
				for(var x = 0; x < w; x++){
				if(map[w*y+x] == k){
					GRW.drawTriAtCoord(ctx,x,y,scale);
				}
			}
		}
		ctx.fill();
	}

	ctx.restore();
};


//TODO: use space filling tree
GRW.bgCircles = function(canvas,colors,nWidth,alpha,seed,type){
	var ctx = canvas.getContext('2d');
	ctx.save();

	var w = canvas.width;
	var h = canvas.height;

	var rng = GRW.rng;
	rng.setSeed(seed);

	var circles = [];

	var r0 = w/20;
	for(var i = 0; i < 1000; i++){
		var k = rng.getFloat()*colors.length|0;
		var r = 0;//rng.getFloat()*w/5;\

		var x,y;

		var p = 0;
		while(r <= 0){
			x = w*rng.getFloat();
			y = h*rng.getFloat();
			
			var minR = r0;

			//Box boundries
			if(x < minR){minR = x;}
			if(w-x < minR){minR = w-x;}
			if(x < w/2 && w/2-x < minR){minR = w/2-x;}
			if(x > w/2 && x-w/2 < minR){minR = x-w/2;}
			if(y < minR){minR = y;}
			if(h-y < minR){minR = h-y;}

			//Other circle boundries
			for(var j = 0; j < circles.length && minR > 0; j++){
				var circle = circles[j];
				var dist = Math.pow(x-circle.x,2)+Math.pow(y-circle.y,2) - Math.pow(circle.r+minR,2);
				if(dist < 0){
					dist = Math.sqrt(Math.pow(x-circle.x,2)+Math.pow(y-circle.y,2)) - circle.r;
					minR = dist;
				}
			}
			r = minR;
			p++;
		}

		circles.push({x:x,y:y,r:r});

		ctx.fillStyle = GRW.colorToStr(colors[k],alpha);
		ctx.beginPath();
		ctx.arc(x,y,r, 0, 2 * Math.PI, false);
		ctx.closePath();
		ctx.fill();
	}

	ctx.restore();
};

GRW.bgSquareGrid = function(canvas,colors,nWidth,alpha,seed,type){
	var ctx = canvas.getContext('2d');
	ctx.save();

	var scale = canvas.width/nWidth/2;
	var w = nWidth*2;
	var h = Math.ceil(w*canvas.height/canvas.width);

	var rng = GRW.rng;
	rng.setSeed(seed);

	var map = [];

	for(var y = 0; y < h; y++){
		for(var x = 0; x < w; x++){
			map[w*y+x] = rng.getFloat()*colors.length|0;
		}
	}
	
	for(var k = 0; k < colors.length; k++){
		ctx.beginPath();
		ctx.fillStyle = GRW.colorToStr(colors[k],alpha);
		for(var y = 0; y < h; y++){
			for(var x = 0; x < w; x++){
				if(map[w*y+x] == k){
					ctx.moveTo(scale*x,scale*y);
					ctx.lineTo(scale*(x+1),scale*y);
					ctx.lineTo(scale*(x+1),scale*(y+1));
					ctx.lineTo(scale*x,scale*(y+1));
					ctx.lineTo(scale*x,scale*y);
				}
			}
		}
		ctx.fill();
	}

	ctx.restore();
};