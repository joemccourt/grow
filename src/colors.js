GRW.colors = {
	"leaf": {r:50, g:255, b:50},
	"root": {r:100, g:70, b:10},
	"air": {r:50, g:50, b:250},
	"soil": {r:140, g:10, b:10},
	"stem": {r:140, g:70, b:10},
	"zylem": {r:70, g:70, b:200},
	"phloem": {r:200, g:70, b:200},
	"airGen": {r:50, g:50, b:250},
	"soilGen": {r:140, g:10, b:10},
	"empty": {r:255, g:255, b:255},
	'red': {r:255,g:  0,b:  0},
	'green': {r:  0,g:255,b:  0},
	'blue': {r:  0,g:  0,b:255},
	'yellow': {r:255,g:255,b:  0},
	'cyan': {r:  0,g:255,b:255},
	'purple': {r:255,g:  0,b:255},
	'white': {r:255,g:255,b:255},
	'black': {r:  0,g:  0,b:  0}
};

// Just normal blend mode for now
GRW.colorBlend = function(colorDst, colorSrc, alpha, mode) {
	var newColor = {};
	newColor.r = (1-alpha)*colorDst.r + alpha*colorSrc.r;
	newColor.g = (1-alpha)*colorDst.g + alpha*colorSrc.g;
	newColor.b = (1-alpha)*colorDst.b + alpha*colorSrc.b;
	return newColor;
};

GRW.blendSetWithColor = function(set, color, alpha) {
	var newSet = [];
	for(var i = 0; i < set.length; i++) {
		var newColor = GRW.colorBlend(set[i], color, alpha);
		newSet[i] = newColor;
	}
	return newSet;
};

GRW.colorToStr = function(color,alpha){
	if(typeof color !== 'object'){return 'red';}

	color.r = Math.round(color.r);
	color.g = Math.round(color.g);
	color.b = Math.round(color.b);
	color.r = color.r < 0 ? 0 : color.r > 255 ? 255 : color.r;
	color.g = color.g < 0 ? 0 : color.g > 255 ? 255 : color.g;
	color.b = color.b < 0 ? 0 : color.b > 255 ? 255 : color.b;

	if(typeof alpha === 'number'){
		return 'rgba('+color.r+','+color.g+','+color.b+','+alpha+')';
	}else{
		return 'rgb('+color.r+','+color.g+','+color.b+')';
	}
};

GRW.colorSets = {
	'pastels': 
	[
		{r:205,g:255,b:149},
		{r:255,g:171,b: 97},
		{r:157,g:237,b:243},
		{r:223,g:253,b:255},
		{r: 34,g:133,b:187}
	],

	'primaries':
	[
		GRW.colors['red'],
		GRW.colors['green'],
		GRW.colors['blue'],
		GRW.colors['yellow'],
		GRW.colors['cyan'],
		GRW.colors['purple'],
		GRW.colors['white'],
		GRW.colors['black'],
	],

	'oceanFive':
	[
		{r:  0,g:160,b:176},
		{r:106,g: 74,b: 60},
		{r:204,g: 51,b: 63},
		{r:235,g:104,b: 65},
		{r:237,g:201,b: 81}
	],

	'melonBallSurprise':
	[
		{r:209,g:242,b:165},
		{r:239,g:250,b:180},
		{r:255,g:196,b:140},
		{r:255,g:159,b:128},
		{r:245,g:105,b:145}
	],

	'gemtoneSeaShore':
	[
		{r: 22,g:147,b:165},
		{r:  2,g:170,b:176},
		{r:  0,g:205,b:172},
		{r:127,g:255,b: 36},
		{r:195,g:255,b:104}
	],

	'aKissToAwake':
	[
		{r:185,g:211,b:176},
		{r:129,g:189,b:164},
		{r:178,g:135,b:116},
		{r:248,g:143,b:121},
		{r:246,g:170,b:147}
	],

	'loveFlowers':
	[
		{r:125,g:158,b: 60},
		{r:115,g: 88,b: 29},
		{r:255,g:254,b:192},
		{r:255,g:226,b:166},
		{r:254,g:159,b:140}
	],

	'iridescentSunset':
	[
		{r: 51,g: 19,b: 39},
		{r:153,g: 23,b:102},
		{r:217,g: 15,b:90},
		{r:243,g: 71,b: 57},
		{r:255,g:110,b: 39}
	],

	'popIsEverything':
	[
		{r:170,g:255,b:  0},
		{r:255,g:170,b:  0},
		{r:255,g:  0,b:170},
		{r:170,g:  0,b:255},
		{r:  0,g:170,b:255}
	],

	'giantGoldfish':
	[
		{r:105,g:210,b:231},
		{r:167,g:219,b:216},
		{r:224,g:228,b:204},
		{r:243,g:134,b: 48},
		{r:250,g:105,b:  0}
	],

	'voyage':
	[
		{r: 74,g: 74,b: 68},
		{r:237,g: 70,b: 82},
		{r:149,g:191,b:172},
		{r:205,g:212,b:185},
		{r:227,g:223,b:197}
	],

	'xanthe':
	[
		{r:  8,g:174,b:166},
		{r:  9,g:208,b:152},
		{r:255,g:201,b: 76},
		{r:255,g:105,b: 65},
		{r:240,g: 53,b:106}
	],

	'snowyOwl':
	[
		{r:108,g:120,b:142},
		{r:166,g:174,b:193},
		{r:207,g:213,b:225},
		{r:237,g:237,b:242},
		{r:252,g:253,b:255}
	],

	'petit':
	[
		{r:248,g:191,b:211},
		{r:206,g:216,b:225},
		{r:165,g:241,b:239},
		{r:220,g:255,b:234},
		{r:254,g:255,b:230}
	]
};