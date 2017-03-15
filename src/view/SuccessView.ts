class SuccessView extends eui.Component{
	private starImage: eui.Image;
	private nextlevel_btn: eui.Button;
	private moregame_btn: eui.Button;
	private share_btn: eui.Button;
	private showIt: egret.tween.TweenGroup;
	private hideIt: egret.tween.TweenGroup;

	private _dispatcher: egret.EventDispatcher;
	public constructor() {
		super();
		this.skinName = userSkins.SuccessViewSkin;
		this.hide();
		this._dispatcher = new egret.EventDispatcher();
	}
	public partAdded(partName: string,instance: any): void { 
		if(instance === this.nextlevel_btn) {
			this.nextlevel_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_nextLevelBtn, this);
		} else if(instance === this.moregame_btn) {
			this.moregame_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_moregameBtn, this);
		} else if(instance === this.share_btn) {
			this.share_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_shareBtn, this);
		}
	}
	public show(starGrade:number) {
		this.starImage.texture = RES.getRes('star' + starGrade + '_s_png');
		this.visible = true;
		this.showIt.play(1);
	}
	public hide() {
		this.visible = false;
	}
	public get dispatcher() {
		return this._dispatcher;
	}
	private tap_nextLevelBtn() {
		let sve:SuccessViewEvent = new SuccessViewEvent(SuccessViewEvent.TAP_NEXT_LEVEL_BUTTON);
		this._dispatcher.dispatchEvent(sve);
		this.hide();
	}
	private tap_moregameBtn() {

	}
	private tap_shareBtn() {

	}
}