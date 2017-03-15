class PropLogic {
	public static usePartGridProp() {
		//随机选择4个
        let sureGridArr = [];
        let totalGrid = GameData.col * GameData.line;
        let fixedNum = Math.ceil(totalGrid/3);
        let surenum_arr = LevelLogic.getDifferentNum(1,totalGrid,fixedNum);
        for(let i=0;i< surenum_arr.length;i++){
			let gridPos = LevelLogic.num2pos(surenum_arr[i],{line:GameData.line,col:GameData.col});
            sureGridArr.push(gridPos);
			let element = GameData.elements[gridPos.line][gridPos.col];
			element.rot = element.des_rot;
		}

		GameData.sureGridArr = sureGridArr;
	}

}