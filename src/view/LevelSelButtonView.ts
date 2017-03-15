class LevelSelButtonView extends eui.Button {
	private _levelNum : number = 0;
	private numGroup: eui.Group;
	private num0: eui.Image;
	private num1: eui.Image;
	private starImage: eui.Image;
	public constructor(levelNum) {
		super();
		this._levelNum = levelNum;
		this.skinName = userSkins.LevelSelButtonSkin;
	}
	public partAdded(partName: string,instance: any): void { 
		if(instance === this.numGroup){
			this.setLevelText();
		}
	}
	private setLevelText() {
		let leveltext = this._levelNum < 10 ? '0' + this._levelNum : '' + this.levelNum;
		this.num0.texture = RES.getRes('num' + leveltext[0] + '_png');
		this.num1.texture = RES.getRes('num' + leveltext[1] + '_png');
	}
	public get levelNum() {
		return this._levelNum;
	}
	public setStar(starNum) {

		this.starImage.texture = RES.getRes('star' + starNum + '_s_png');
	}
}