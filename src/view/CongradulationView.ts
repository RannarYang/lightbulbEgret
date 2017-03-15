class CongradulationView extends eui.Component{
	private _dispatcher: egret.EventDispatcher;
	private sure_btn: eui.Button;
	public constructor() {
		super();
		this.skinName = userSkins.CongradulationViewSkin;
		this.hide();
		this._dispatcher = new egret.EventDispatcher();
	}
	public partAdded(partName: string,instance: any): void { 
		if(instance === this.sure_btn) {
			this.sure_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_sureBtn, this);
		}
	}
	public get dispatcher() {
		return this._dispatcher;
	}
	private hide() {
		this.visible = false;
	}
	private tap_sureBtn() {
		this.hide();
		let sve:CongradulationViewEvent = new CongradulationViewEvent(CongradulationViewEvent.TAP_SURE_BUTTON);
		this._dispatcher.dispatchEvent(sve);
	}
	public show(){
		this.visible = true;
	}
}