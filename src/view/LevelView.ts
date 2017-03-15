class LevelView extends eui.Component{
	private levelBtnGroup1: eui.Group;
	private levelBtnGroup2: eui.Group;
	private prevButton: eui.Button;
	private nextButton: eui.Button;
	private endlessButton: eui.Button;
	private _pageNum: number;
	private slideLeft: egret.tween.TweenGroup;
	private slideRight: egret.tween.TweenGroup;
	private _dispatcher: egret.EventDispatcher;
	private _allSelButton: LevelSelButtonView[] = [];
	public get dispatcher() {
		return this._dispatcher;
	}
	public constructor(pageNum) {
		super();
		this._pageNum = pageNum;
		this.skinName = userSkins.LevelScreenSkin;
		this.init();
	}
	public childrenCreated() {
		super.childrenCreated();
    }
	public update() {
		this.setAllLevelSelButtonStatus();
	}
	private init() {
		this._dispatcher = new egret.EventDispatcher();
		this.hide();
	}
	public partAdded(partName: string,instance: any): void { 
		if(instance == this.levelBtnGroup1){
			this.addLevelSelBtns(1,3, 4);
		} else if (instance == this.levelBtnGroup2) {
			this.addLevelSelBtns(2, 3, 4);
		}else if (instance === this.prevButton) {
			if(this._pageNum !== 1) {
				this.prevButton.enabled = true;
			} else {
				this.prevButton.enabled = false;
			}
			this.prevButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_prevButton, this);
		} else if(instance === this.nextButton) {
			if(this._pageNum === GameData.levelPageNum) {
				this.nextButton.enabled = false;
			} else {
				this.nextButton.enabled = true;
			}
			this.nextButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_nextButton, this);
		} else if(instance === this.endlessButton) {
			this.endlessButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_endlessButton, this);
			if(GameData.levelEndless) {
				this.endlessButton.enabled = true;
			}
		}
	}
	private addLevelSelBtns(groupNum:number, row, col) {
		for(let i = 0; i < row; i++) {
			for(let j = 0; j < col; j++) {
				let levelNum = (groupNum - 1) * 12 + (i * 4 + j + 1); 
				var btn:LevelSelButtonView = new LevelSelButtonView(levelNum);
				btn.enabled = levelNum <= GameData.levelNum ? true: false;
				btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_selLevelBtn, this);
				this['levelBtnGroup'+ groupNum].addChild(btn);
				this._allSelButton[levelNum-1] = btn;
			}
		}
	}
	private setAllLevelSelButtonStatus() {
		let levelLen = this._allSelButton.length;
		for(let i = 0; i < GameData.levelNum; i++) {
			this._allSelButton[i].enabled = true;
			this._allSelButton[i].setStar(GameData.getStarLevelGrade(i+1));
		}
		if(GameData.levelEndless === true) {
			this.endlessButton.enabled = true;
		}
	}
	public show() {
		this.visible = true;
	}
	public hide() {
		this.visible = false;
	}
	private tap_selLevelBtn(evt) {
		this.hide();
		let levelSelBtn = evt.currentTarget;
		let levelNum = levelSelBtn.levelNum;
		let lve:LevelViewEvent = new LevelViewEvent(LevelViewEvent.TAP_SEL_LEVEL_BUTTON);
		lve.levelNum = levelNum;
		this._dispatcher.dispatchEvent(lve)
	}
	
	private tap_prevButton(){
		this._pageNum--;
		if(this._pageNum !== 1) {
			this.prevButton.enabled = true;
		} else {
			this.prevButton.enabled = false;
		}
		this.nextButton.enabled = true;
		this.slideRight.play(1);
	}
	private tap_nextButton() {
		this._pageNum ++;
		if(this._pageNum === GameData.levelPageNum) {
			this.nextButton.enabled = false;
		} else {
			this.nextButton.enabled = true;
		}
		this.prevButton.enabled = true;
		this.slideLeft.play(1);
	}
	private tap_endlessButton(){
		this.hide();
		let lve:LevelViewEvent = new LevelViewEvent(LevelViewEvent.TAP_ENDLESS_BUTTON);
		this._dispatcher.dispatchEvent(lve)
	}
} 