class GameData {
	/* ====== userData 需要存数据库的数据 begin ========= */
	// propPartLine
	private static _propPartLine: number[] = [];
	public static getPropPartLine(nowLevel):boolean {
		return GameData._propPartLine.indexOf(nowLevel) !== -1;
	}
	public static addPropPartLine(nowLevel) {
		if(this._propPartLine.indexOf(nowLevel) === -1) {
			this._propPartLine.push(nowLevel);
			GameData.storage();
		}
	}

	// propShowLine
	private static _propShowLine: number[] = [];
	public static getPropShowLine(nowLevel): boolean{
		return GameData._propShowLine.indexOf(nowLevel) !== -1;
	}
	public static addPropShowLine(nowLevel) {
		if(this._propShowLine.indexOf(nowLevel) === -1) {			
			this._propShowLine.push(nowLevel);
			GameData.storage();
		}
	}

	// starlevelGrade
	private static _starlevelGrade: number[] = [];
	public static setStarlevelGrade(levelNum, starNum) {
		this._starlevelGrade[levelNum] = Math.max(this._starlevelGrade[levelNum] || 0, starNum);
		for(let i = 0; i < GameData.levelNumObserver.length; i++) {
			GameData.levelNumObserver[i].update()
		}
		GameData.storage();
	}
	public static getStarLevelGrade(levelNum) {
		return this._starlevelGrade[levelNum] || 0;
	}
	// levelNum
	private static _levelNum: number = 1; // 当前可玩关卡
	public static set levelNum(levelNum) {
		if(levelNum <= 24) {
			GameData._levelNum = levelNum;
		} else {
			// 开启无尽模式
			GameData._levelEndless = true;
		}
		for(let i = 0; i < GameData.levelNumObserver.length; i++) {
			GameData.levelNumObserver[i].update()
		}
		GameData.storage();
		
	}
	public static get levelNum() {
		return this._levelNum;
	}
	// levelEndless
	private static _levelEndless: boolean = false;
	public static get levelEndless():boolean {
		return this._levelEndless;
	}
	/* ====== userData 需要存数据库的数据 end ========= */
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
	// sound
	public static soundOn = true;
	
	private static levelNumObserver = [];
	public static setLevelNumObserver(observer) {
		GameData.levelNumObserver.push(observer);
	}

	public static initData() {
		this.elements = [];
		this.lightNum = 0;
		this.nowLightNum = 0;
		this.nowLight = [];
		this.linkPoint = [];
		GameData.stageW = 640;
		GameData.stageH = 960;
	}
	// 把数据存储到本地：
	public static storage() {
		localStorage.setItem('propPartLine', JSON.stringify(GameData._propPartLine));
		localStorage.setItem('propShowLine', JSON.stringify(GameData._propShowLine));
		localStorage.setItem('levelNum', JSON.stringify(GameData._levelNum));
		localStorage.setItem('levelEndless', JSON.stringify(GameData._levelEndless));
		localStorage.setItem('starlevelGrade', JSON.stringify(GameData._starlevelGrade));
	}
	public static initUserData() {
		GameData._propPartLine = JSON.parse(localStorage.getItem('propPartLine'));
		GameData._propPartLine = GameData._propPartLine.filter((val)=>{
			return val <= 24;
		})
		GameData._propShowLine = JSON.parse(localStorage.getItem('propShowLine'));
		GameData._propShowLine = GameData._propShowLine.filter((val) => {
			return val <= 24;
		})
		GameData._levelNum = JSON.parse(localStorage.getItem('levelNum'));
		GameData._levelEndless = JSON.parse(localStorage.getItem('levelEndless'));
		GameData._starlevelGrade = JSON.parse(localStorage.getItem('starlevelGrade'));
	}
}