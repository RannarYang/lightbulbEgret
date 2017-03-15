class LinkLogic {
    private static _linkPoint;
    private static _nowLightNum;
	public static link():boolean {
		GameData.nowLight = [];
		this._linkPoint = [];
		this._nowLightNum = 0;
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
		if(this._nowLightNum === GameData.lightNum) {
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
                                LinkLogic.setLinkData(x, y-1);
                            }
                        }
                        break;
                    case 1:

                        if (x >= 1 && x <= line - 1) {
                            var square_top = elements[x - 1][y];
                            if (square_top.exit[3] == true) {
                                LinkLogic.setLink(x - 1, y, depth - 1); //点(x-1,y)处于连通状态
                                LinkLogic.setLinkData(x - 1, y);
                            }
                        }
                        break;
                    case 2:
                        if (y + 1 <= col - 1 && y >= 0) {
                            var square_right = elements[x][y + 1];
                            if (square_right.exit[0] == true) {
                                LinkLogic.setLink(x, y + 1, depth - 1);
                                LinkLogic.setLinkData(x, y + 1);
                            }
                        }

                        break;
                    case 3:
                        if (x + 1 <= line - 1 && x >= 0) {
                            var square_bottom = elements[x + 1][y];
                            if (square_bottom.exit[1] == true) {
                                LinkLogic.setLink(x + 1, y, depth - 1);
                                LinkLogic.setLinkData(x + 1, y);
                            }
                        }
                        break;
                }
            }
        }

	}

    private static setLinkData(x, y) {
        let square = GameData.elements[x][y];
        if (this._linkPoint.indexOf(x + "" + y) === -1) {
            this._linkPoint.push(x + "" + y);
            GameData.nowLight.push(square);
            if(square.kind === 'light') {
                this._nowLightNum++;
            }
        }
    }
}