class LevelGameDataParse {
	/**
	 * 针对当前关卡JSON数据，进行解析
	 */
	public static parseLevelGameData(val:any){

		GameData.line  = val.line;
		GameData.col = val.col;

		// elements
		let square = val.square;
		GameData.elements = [];
		for(let i = 0; i < GameData.line; i++) {
			GameData.elements[i] = [];
			for(let j = 0; j < GameData.col; j++) {
				let elementData = square[i][j];
				let trueRot = val.trueRot && val.trueRot.length ? val.trueRot[i * GameData.col + j] : elementData.trueRot;
				GameData.elements[i][j] = new GridElement(i, j, elementData.type, elementData.kind, elementData.init_rot, trueRot);
				if(elementData.kind === 'light') {
					GameData.lightNum++;
				} else if(elementData.kind === 'power') {
					GameData.powerState.x = i;
					GameData.powerState.y = j;
				}
			}
		}

		GameData.brickwidth = Math.floor(GameData.stageW / (GameData.col + 0.5));
		GameData.roadwidth = 0.2 * GameData.brickwidth;
		GameData.leftwidth = GameData.leftPercent * GameData.brickwidth;

		//灯泡图片尺寸
        GameData.lightSize = {
            bitmapX : 0.17 * GameData.brickwidth,
            bitmapY : 0.02 * GameData.brickwidth,
			bitmapScale : parseFloat((0.64 * GameData.brickwidth / 150).toFixed(2))
        };
        GameData.powerSize = {
            bitmapX : 0.15 * GameData.brickwidth,
            bitmapY : 0.22 * GameData.brickwidth,
			bitmapScale : parseFloat((0.7 * GameData.brickwidth / 160).toFixed(2))
        };

	}
}