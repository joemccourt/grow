GRW.keyControlDown = function(key) {

	console.log(key);
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
		// case 83:
		// 	GRW.cellTypeAdd = "stem";
		// 	break;
		case 75:
			GRW.cellTypeAdd = "empty";
			break;
		case 81:
			GRW.cellTypeAdd = "query";
			break;
		case 39:
		case 68:
			GRW.moveRight();
			break;
		case 37:
		case 65:
			GRW.moveLeft();
			break;
		case 38:
		case 87:
			GRW.moveUp();
			break;
		case 40:
		case 83:
			GRW.moveDown();
			break;
		case 189:
		case 173:
			GRW.zoomOut();
			break;
		case 187:
		case 61:
			GRW.zoomIn();
			break;
	}
};