GRW.keyControlDown = function(key) {

	// console.log(key);
	switch (key) {
		case 27:
			GRW.exitGame();
			break;
		case 80:
			GRW.cellTypeAdd = "phloem";
			break;
		case 90:
			GRW.cellTypeAdd = "zylem";
			break;
		case 76:
			GRW.cellTypeAdd = "leaf";
			break;
		case 82:
			GRW.cellTypeAdd = "root";
			break;
		case 83:
			GRW.cellTypeAdd = "stem";
			break;
		case 69:
			GRW.cellTypeAdd = "empty";
			break;
		case 81:
			GRW.cellTypeAdd = "query";
			break;
		case 39:
			GRW.moveRight();
			break;
		case 37:
			GRW.moveLeft();
			break;
		case 38:
			GRW.moveUp();
			break;
		case 40:
			GRW.moveDown();
			break;
		case 189:
			GRW.zoomOut();
			break;
		case 187:
			GRW.zoomIn();
			break;
	}
};