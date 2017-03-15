class MainView extends eui.Component{
	private _dispatcher: egret.EventDispatcher;

	private gameViewGroup: eui.Group;
	private _gameViewContainer: egret.Sprite;
	private gameButtonGroup: eui.Group;
	private selLevelButton: eui.Button;
	private replayButton: eui.Button;
	private propButton: eui.Button;
	private soundButton: eui.Button;
	private levelNumGroup: eui.Group;
	private level_num1_Image: eui.Image;
	private level_num2_Image: eui.Image;

	private _gevm: GridElementViewManage;
	private guideElement: eui.Component;

	private _startTime: Date;
	public constructor() {
		super();
		this.skinName = userSkins.MainViewSkin;
		this.currentState = 'guide';
		this.initGuide();
	}
	public partAdded(partName: string,instance: any): void { 
		if(instance == this.gameViewGroup){
			this.init();
		} else if (instance === this.selLevelButton) {
			this.selLevelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_selLevelButton, this);
		} else if (instance === this.replayButton) {
			this.replayButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_replayButton, this);
		} else if (instance === this.propButton) {
			this.propButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_propButton, this);
		}  else if (instance === this.soundButton) {
			this.soundButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_soundButton, this);
		} else if (instance === this.levelNumGroup) {
			this.setLevelNumImage();
		} else if (instance === this.gameButtonGroup) {
			this.gameButtonGroup.touchEnabled = false;
			this.gameButtonGroup.y =  GameData.brickwidth * GameData.line + 170;
		}
	}
	public get dispatcher() {
		return this._dispatcher;
	}
	public usePartLineProp() {
		this._gevm.usePartLineProp();
		this.reLink();
	}
	public useShowLineProp() {
		this._gevm.useShowLineProp();
	}
	public resetGridElementView() {
		this._startTime = new Date();
		this._gevm.reset();
		this.reLink();
	}
	public newGridElementView() {
		this._startTime = new Date();
		this.setLevelNumImage();
		this.initGameViewGroup();
		this.gameButtonGroup.y =  GameData.brickwidth * GameData.line + 170;
		this.reLink();
	}
	private initGuide() {
		let guideElement = this.guideElement = new eui.Component();
		let shape = new egret.Shape();
		shape.graphics.lineStyle(12, GameData.roadLinkColor);
		shape.graphics.drawRect(0, 0, GameData.brickwidth, GameData.brickwidth);
		shape.graphics.endFill();
		shape.x = 63;
		shape.y = 215;
		guideElement.addChild(shape);
		var handAniJson = RES.getRes("hand_ani_json");
        var handAniImg = RES.getRes("hand_ani_png");
        var mcFactory = new egret.MovieClipDataFactory(handAniJson,handAniImg);
        var handAniMC = new egret.MovieClip(mcFactory.generateMovieClipData('hand_ani'));
		handAniMC.x = 80;
		handAniMC.y = 250;
		handAniMC.scaleX = 1.6;
		handAniMC.scaleY = 1.6;
        guideElement.addChild(handAniMC);
		handAniMC.play(-1);
		guideElement.touchEnabled = false;
		this.addChild(guideElement);
	}
	private init() {
		this._dispatcher = new egret.EventDispatcher();	
		this.initGameViewGroup();
	}
	private initGameViewGroup() {
		let line = GameData.line;
		let col = GameData.col;
		this._gameViewContainer && this.gameViewGroup.removeChild(this._gameViewContainer);
		let gameViewContainer = this._gameViewContainer = new egret.Sprite();
		this._gevm = new GridElementViewManage(gameViewContainer);
		gameViewContainer.x = (GameData.stageW - GameData.brickwidth * col) / 2; // 游戏区域居中
		this.gameViewGroup.addChild(gameViewContainer);
		this._gevm.addEventListener(GridElementViewManageEvent.TAP_GRIDELEMENT, this.tap_gridelement, this);
		this._gevm.addEventListener(GridElementViewManageEvent.ROTATE_END, this.rotate_end, this);
	}
	private tap_selLevelButton() {
		let mvt:MainViewEvent = new MainViewEvent(MainViewEvent.TAP_SEL_LEVEL_BUTTON);
		this._dispatcher.dispatchEvent(mvt);
	}
	private tap_replayButton() {
		let mvt:MainViewEvent = new MainViewEvent(MainViewEvent.TAP_REPLAY_BUTTON);
		this._dispatcher.dispatchEvent(mvt);
	}
	private tap_propButton() {
		let mvt:MainViewEvent = new MainViewEvent(MainViewEvent.TAP_PROP_BUTTON);
		this._dispatcher.dispatchEvent(mvt);
	}
	private tap_soundButton(evt:egret.TouchEvent) {
		let mvt:MainViewEvent = new MainViewEvent(MainViewEvent.TAP_SOUND_BUTTON);
		mvt.soundOn = !evt.target.selected;
		this._dispatcher.dispatchEvent(mvt);
	}
	private tap_gridelement(evt) {
		let xIndex = evt.xIndex;
		let yIndex = evt.yIndex;
		let now_rot = GameData.elements[xIndex][yIndex].rot + 90;
		now_rot = (now_rot % 360) === 0 ? 0 : now_rot;
		GameData.elements[xIndex][yIndex].rot = now_rot;
		// unlind bulb 
	}
	private rotate_end() {
		this.reLink();
	}
	private setLevelNumImage() {
		let leveltext = (GameData.nowLevel < 10) ? '0' + GameData.nowLevel : '' + GameData.nowLevel;
		this.level_num1_Image.texture = RES.getRes(leveltext[0] + '_png');
		this.level_num2_Image.texture = RES.getRes(leveltext[1] + '_png');
	}
	private reLink() {
		this._gevm.unlightBulb();
		let isSuccess = LinkLogic.link();
		this._gevm.lightBulb();
		if (isSuccess){
			if(this.currentState === 'guide') {
				this.enabled = false;
				let mvt:MainViewEvent = new MainViewEvent(MainViewEvent.SKIP_GUIDE);
				this._dispatcher.dispatchEvent(mvt)
				this.removeChild(this.guideElement);
			} else {
				let endTime = new Date();
				let passTime = (endTime.getTime() - this._startTime.getTime())/1000%60;
				var levelGrade = GameData.starConfig["l" + GameData.line + "c" + GameData.col];
				for (var gradei = 0, levelGrade_len = levelGrade.length; gradei < levelGrade_len; gradei++) {
					var getGrade = 2;
					if (passTime <= levelGrade[gradei]) {
						getGrade = gradei;
						break;
					}
				}

				// 禁止点击
				this.enabled = false;

				let isUsePartLineProp = GameData.getPropPartLine(GameData.nowLevel);
				let isUseShowLineProp = GameData.getPropShowLine(GameData.nowLevel);
				var star_num = ( isUsePartLineProp || isUseShowLineProp ) ? 3:3 - getGrade;
				let mvt:MainViewEvent = new MainViewEvent(MainViewEvent.SUCCESS);
				mvt.starNum = star_num;
				this._dispatcher.dispatchEvent(mvt)
			}
			
		}
	}

}