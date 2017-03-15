class GameLogic {
	private _gameStage: eui.Component;
	private _levelConfigData: any;
	private _presentLevelConfig: any;
	private _mainView: MainView;
	private _levelView: LevelView;
	private _successView: SuccessView;
	private _congradulationView: CongradulationView;
	private _propView: PropView;
	private _sound: egret.Sound;
	public constructor(gameStage: eui.Component) {
		this._gameStage = gameStage;
		this.init();
	}
	private init(){
		// 初始化数据
		GameData.initData(); 
		// 用户的信息
		GameData.initUserData();

		// 读取view信息
		let viewConfigData = RES.getRes('viewConfig_json');
		ViewConfigGameDataParse.parseViewConfigGameData(viewConfigData);
		// 读取关卡信息
		let levelConfigData = this._levelConfigData = RES.getRes("levelConfig_json");
		this._presentLevelConfig = this._levelConfigData.level_def[0];
		// this._presentLevelConfig = LevelLogic.getRandomLevel();
		LevelGameDataParse.parseLevelGameData(this._presentLevelConfig);

		// 等级的信息
		let rankingStandardConfig = RES.getRes('rankingStandardConfig_json');
		RankingStandardGameDataParse.parseRankingStandardGameData(rankingStandardConfig);

		let mainView = this._mainView = new MainView();
		this._gameStage.addChild(mainView);

		let levelView = this._levelView = new LevelView(1);
		GameData.setLevelNumObserver(levelView);
		this._gameStage.addChild(levelView);
		
		let successView = this._successView = new SuccessView();
		this._gameStage.addChild(successView);

		let propView = this._propView = new PropView();
		this._gameStage.addChild(propView);

		let congradulationView = this._congradulationView = new CongradulationView();
		this._gameStage.addChild(congradulationView);
		LinkLogic.link();

		// 如果该关卡已经购买了道具，则先使用道具
		this.useProp();

		this._sound = RES.getRes("win_mp3");

		this._mainView.mainViewDispatcher.addEventListener(MainViewEvent.SKIP_GUIDE, this.skip_guide, this);
		this._mainView.mainViewDispatcher.addEventListener(MainViewEvent.SUCCESS, this.success, this);
		this._mainView.mainViewDispatcher.addEventListener(MainViewEvent.TAP_SEL_LEVEL_BUTTON, this.tap_selLevelButton, this);
		this._mainView.mainViewDispatcher.addEventListener(MainViewEvent.TAP_REPLAY_BUTTON, this.tap_replayButton, this);
		this._mainView.mainViewDispatcher.addEventListener(MainViewEvent.TAP_PROP_BUTTON, this.tap_propButton, this);
		this._propView.propViewDispatcher.addEventListener(PropViewEvent.TAP_PART_LINE_BUTTON, this.tap_partLineButton,this);
		this._propView.propViewDispatcher.addEventListener(PropViewEvent.TAP_SHOW_LINE_BUTTON, this.tap_showLineButton,this);
		this._mainView.mainViewDispatcher.addEventListener(MainViewEvent.TAP_SOUND_BUTTON, this.tap_soundButton, this);
		
		this._levelView.dispatcher.addEventListener(LevelViewEvent.TAP_SEL_LEVEL_BUTTON, this.tap_selLevelButtonInLevelView, this);
		this._levelView.dispatcher.addEventListener(LevelViewEvent.TAP_ENDLESS_BUTTON, this.tap_endlessButton, this);
		
		this._successView.dispatcher.addEventListener(SuccessViewEvent.TAP_NEXT_LEVEL_BUTTON, this.tap_nextLevelBtn, this);
		
		this._congradulationView.dispatcher.addEventListener(CongradulationViewEvent.TAP_SURE_BUTTON, this.tap_sureBtn, this);
	}
	private skip_guide() {
		this._levelView.show();
	}
	private success(evt:MainViewEvent) {
		GameData.soundOn && this._sound.play(0,1);
		let starNum = Math.max(GameData.getStarLevelGrade(GameData.nowLevel), evt.starNum);
		GameData.setStarlevelGrade(GameData.nowLevel, starNum);
		GameData.levelNum = Math.max(GameData.nowLevel + 1, GameData.levelNum);
		this._successView.show(starNum);
	}
	private tap_selLevelButtonInLevelView(evt: LevelViewEvent) {
		GameData.nowLevel = evt.levelNum;
		this.playLevel();
	}
	private tap_nextLevelBtn() {
		GameData.nowLevel = GameData.nowLevel + 1;
		GameData.levelNum = Math.max(GameData.nowLevel, GameData.levelNum);
		if(GameData.nowLevel !== 25) {
			this.playLevel();
		} else {
			this._congradulationView.show();
		}
	}
	private playLevel() {
		let nowLevel = GameData.nowLevel;
		GameData.initData();
		if ( nowLevel <= 24) {
			this._presentLevelConfig = this._levelConfigData.level_def[nowLevel];
		} else {
			this._presentLevelConfig = LevelLogic.getRandomLevel(); // 无尽模式
		}
		
		LevelGameDataParse.parseLevelGameData(this._presentLevelConfig);
		this._mainView.newGridElementView();

		this.useProp();
	}
	private useProp() {
		if(GameData.getPropPartLine(GameData.nowLevel)) {
			PropLogic.usePartGridProp();
			this._mainView.usePartLineProp();
		}
		if(GameData.getPropShowLine(GameData.nowLevel)) {
			this._mainView.useShowLineProp();
		}
	}
	private tap_selLevelButton() {
		this._levelView.show();
	}
	private tap_replayButton() {
		// 重置数据
		GameData.initData();
		LevelGameDataParse.parseLevelGameData(this._presentLevelConfig);
		this._mainView.resetGridElementView();
		this.useProp();
	}
	private tap_propButton() {
		this._propView.show();
	}
	private tap_soundButton(evt: MainViewEvent) {
		// console.log(evt.soundOn);
		GameData.soundOn = evt.soundOn;
	}
	private tap_partLineButton() {
		if(!GameData.getPropPartLine(GameData.nowLevel)) {
			GameData.addPropPartLine(GameData.nowLevel);
			PropLogic.usePartGridProp();
			this._mainView.usePartLineProp();
		}
	}
	private tap_showLineButton() {
		if(!GameData.getPropShowLine(GameData.nowLevel)) {
			GameData.addPropShowLine(GameData.nowLevel);
		}
		this._mainView.useShowLineProp();
	}
	private tap_endlessButton() {
		GameData.nowLevel = 25;
		this.playLevel();
	}
	private tap_sureBtn() {
		this.playLevel();
	}
}