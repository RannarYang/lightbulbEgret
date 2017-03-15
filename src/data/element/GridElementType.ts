// 多例模式
class GridElementType {
	private static _values: GridElementType[] = []
	public typeNum: number = 0;
	public shapetype: string;
	public x: number = 0;
	public y: number = 0;
	public w: number = 0;
	public h: number = 0;
	public line = [];
	public shapepath = [];

	private constructor(typeNum) {
		let typeConfig = this.getTypeConfig(typeNum);
		this.shapetype = typeConfig.shapetype;
		this.typeNum = typeNum;
		this.x = typeConfig.x;
		this.y = typeConfig.y;
		this.w = typeConfig.w;
		this.h = typeConfig.h;
		this.line = typeConfig.line;
		this.shapepath = typeConfig.shapepath;
	}
	public static getInstance(typeNum) {
		if (!this._values[typeNum - 1]){
			this._values[typeNum - 1] = new GridElementType(typeNum);
		}
		return this._values[typeNum - 1];
	}
	private getTypeConfig(typeNum): any{
		switch (typeNum) {
			case 1:
				return {
					shapenum: 1,
					shapetype: "rect",
					x: 0,
					y: GameData.leftPercent,
					w: 0.5,
					h: GameData.roadPercent,
					line:[{
						front:[0,0.5],
						to:[0.5,0.5]
					}]
				}
			case 2: 
				return {
					shapenum: 1,
					shapetype: "rect",
					x: 0,
					y: GameData.leftPercent,
					w: 1,
					h: GameData.roadPercent,
					line:[{
						front: [0,0.5],
						to:[1,0.5]
					}]
				}
			case 3:
				return {
					shapenum: 1,
					shapetype: "line",
					shapepath: [
						[GameData.leftPercent, 0],
						[GameData.leftPercent, 1],
						[GameData.leftRoadPercent, 1],
						[GameData.leftRoadPercent, GameData.leftRoadPercent],
						[1, GameData.leftRoadPercent],
						[1, GameData.leftPercent],
						[GameData.leftRoadPercent, GameData.leftPercent],
						[GameData.leftRoadPercent, 0]
					],
					line:[{
						front:[0.5,0],
						to:[0.5,1]
					},{
						front:[0.5,0.5],
						to:[1,0.5]
					}]
				}
			case 4:
				return {
					shapenum: 1,
					shapetype: "line",
					shapepath: [
						[0, GameData.leftPercent],
						[GameData.leftRoadPercent, GameData.leftPercent],
						[GameData.leftRoadPercent, 1],
						[GameData.leftPercent, 1],
						[GameData.leftPercent, GameData.leftRoadPercent],
						[0, GameData.leftRoadPercent]
					],
					line:[{
						front:[0,0.5],
						to:[0.5,0.5]
					},{
						front:[0.5,0.5],
						to:[0.5,1]
					}]
				}
			case 5:
				return {
					shapenum: 1,
					shapetype: "rect",
					shapepath: [
						[0, 0],
						[1, 0],
						[1, 1],
						[0, 1]
					],
					line:[]
				}
		}
	}
}