class GameData {
	// userConfig 
	public static propPartLine: number[] = [];
	public static propShowLine: number[] = [];
	// level config
	public static line: number = 0;
	public static col: number = 0;
	public static elements: GridElement[][];

	public static brickwidth: number;
	public static roadwidth: number;
	public static leftwidth: number;

	public static lightNum:number;
	public static nowLightNum:number = 0;
	public static nowLight: GridElement[] = [];
	public static linkPoint = [];

	public static powerState = {x: 0, y: 0};

	public static stageW: number = 0;
	public static stageH: number = 0;

	// view config
	public static frameColor : number;
    public static squareFillColor : number;
	public static squareUnableFillColor : number;
    public static squareStroColor : number;
    public static roadLinkColor : number;
    public static roadUnlinkColor : number;
    public static tipColor : number;
    public static unlockFillColor : number;
    public static roadPercent : number;
    public static leftPercent : number;
    public static leftRoadPercent : number;

	public static levelPageNum : number = 2;
	public static nowLevel: number = 0;
	public static starConfig: any;
	public static lightSize = {
		bitmapX: 0,
		bitmapY: 0,
		bitmapScale: 1
	}
	public static powerSize = {
		bitmapX: 0,
		bitmapY: 0,
		bitmapScale: 1
	}

	// 道具
	public static sureGridArr = [];
	public static initData() {
		this.elements = [];
		this.lightNum = 0;
		this.nowLightNum = 0;
		this.nowLight = [];
		this.linkPoint = [];
		GameData.stageW = 640;
		GameData.stageH = 960;

	}
	private static _starlevelGrade: number[] = [];
	public static setStarlevelGrade(levelNum, starNum) {
		this._starlevelGrade[levelNum] = Math.max(this._starlevelGrade[levelNum] || 0, starNum);
		for(let i = 0; i < GameData.levelNumObserver.length; i++) {
			GameData.levelNumObserver[i].update()
		}
	}
	public static getStarLevelGrade(levelNum) {
		return this._starlevelGrade[levelNum] || 0;
	}
	private static _levelNum: number = 1; // 当前可玩关卡
	public static levelEndless: boolean = false;
	private static levelNumObserver = [];
	public static setLevelNumObserver(observer) {
		GameData.levelNumObserver.push(observer);
	}
	public static set levelNum(levelNum) {
		if(levelNum <= 24) {
			GameData._levelNum = levelNum;
		} else {
			// 开启无尽模式
			GameData.levelEndless = true;
		}
		for(let i = 0; i < GameData.levelNumObserver.length; i++) {
			GameData.levelNumObserver[i].update()
		}
		
	}
	public static get levelNum() {
		return this._levelNum;
	}
}