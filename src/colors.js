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
	"black": {r:0, g:0, b:0},
	"red": {r:255, g:0, b:0},
	"green": {r:0, g:255, b:0},
	"blue": {r:0, g:0, b:255},
	"white": {r:255, g:255, b:255}
};

// Just normal blend mode for now
GRW.colorBlend = function(colorDst, colorSrc, alpha, mode) {
	var newColor = {};
	newColor.r = (1-alpha)*colorDst.r + alpha*colorSrc.r;
	newColor.g = (1-alpha)*colorDst.g + alpha*colorSrc.g;
	newColor.b = (1-alpha)*colorDst.b + alpha*colorSrc.b;
	return newColor;
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
