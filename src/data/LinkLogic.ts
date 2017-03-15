class LinkLogic {
	public static link() {
		GameData.nowLight = [];
		GameData.linkPoint = [];
		GameData.nowLightNum = 0;
        let x = GameData.powerState.x;
        let y = GameData.powerState.y;
		var elements = GameData.elements;
        var line = GameData.line;
        var col = GameData.col;
        for (var i = 0; i < line; i++) {
            for (var j = 0; j < col; j++) {
                elements[i][j].depth = undefined;
            }
        }
		elements[x][y].depth = 0;
        GameData.nowLight.push(GameData.elements[x][y]);
		LinkLogic.setLink(x, y, 0);
		
	}
	public static isGameOver() {
		if(GameData.nowLightNum === GameData.lightNum) {
			return true;
		} else {
			return false;
		}
	}
	private static setLink(x, y, depth) {
		var col = GameData.col;
        var line = GameData.line;

        var elements = GameData.elements;
        var powerSquare = elements[x][y];

        var powerExit = elements[x][y].exit;
        if ((powerSquare.depth && powerSquare.depth >= depth) || powerSquare.depth) {
            return;
        }
        powerSquare.depth = depth;
        for (var power_i = 0, powerExit_len = powerExit.length; power_i < powerExit_len; power_i++) {
            if (powerExit[power_i] == true) {
                switch (power_i) {
                    case 0:
                        if (y >= 1 && y <= col - 1) {
                            //连通
                            var square_left = elements[x][y - 1];
                            if (square_left.exit[2] == true) {
                                LinkLogic.setLink(x, y - 1, depth - 1); //点(x-1,y)处于连通状态
                                if (GameData.linkPoint.indexOf(x + "" + (y - 1)) === -1) {
                                    GameData.linkPoint.push(x + "" + (y - 1))
									GameData.nowLight.push(square_left);
									if(square_left.kind === 'light' || square_left.kind === 'unlight') {
										GameData.nowLightNum++;
									}
                                }

                            }

                        }

                        break;
                    case 1:

                        if (x >= 1 && x <= line - 1) {
                            var square_top = elements[x - 1][y];
                            if (square_top.exit[3] == true) {
                                LinkLogic.setLink(x - 1, y, depth - 1); //点(x-1,y)处于连通状态

                                if (GameData.linkPoint.indexOf((x - 1) + "" + y) === -1) {
                                    GameData.linkPoint.push((x - 1) + "" + y);
									GameData.nowLight.push(square_top);
									if(square_top.kind === 'light' || square_top.kind === 'unlight') {
										GameData.nowLightNum++;
									}
                                }
                            }
                        }

                        break;
                    case 2:

                        if (y + 1 <= col - 1 && y >= 0) {

                            var square_right = elements[x][y + 1];

                            if (square_right.exit[0] == true) {
                                LinkLogic.setLink(x, y + 1, depth - 1);
                                if (GameData.linkPoint.indexOf(x + "" + (y + 1)) === -1) {
                                    GameData.linkPoint.push(x + "" + (y + 1))
									GameData.nowLight.push(square_right);
									if(square_right.kind === 'light' || square_right.kind === 'unlight') {
										GameData.nowLightNum++;
									}
                                }
                            }
                        }

                        break;
                    case 3:

                        if (x + 1 <= line - 1 && x >= 0) {

                            var square_bottom = elements[x + 1][y];
                            if (square_bottom.exit[1] == true) {
                                LinkLogic.setLink(x + 1, y, depth - 1);
                                if (GameData.linkPoint.indexOf((x + 1) + "" + y) === -1) {
                                    GameData.linkPoint.push((x + 1) + "" + y);
									GameData.nowLight.push(square_bottom);
									if(square_bottom.kind === 'light' || square_bottom.kind === 'unlight') {
										GameData.nowLightNum++;
									}
                                }
                            }
                        }

                        break;
                }
            }
        }

	}
}