class PropView extends eui.Component{
	private closeButton: eui.Button;
	private partLineButton: eui.Button;
	private showLineButton: eui.Button;

	private _propViewDispatcher: egret.EventDispatcher;
	public constructor() {
		super();
		this.skinName = userSkins.PropViewSkin;
		this.init();
		this.hide();
	}
	public partAdded(partName: string,instance: any): void {
		if (instance === this.closeButton) {
			this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_closeButton,this);
		} else if (instance === this.partLineButton) {
			this.partLineButton.touchEnabled = true;
			this.partLineButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_partLineButton,this);
		} else if (instance === this.showLineButton) {
			this.showLineButton.touchEnabled = true;
			this.showLineButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_showLineButton,this);
		}
	}
	public show() {
		this.visible = true;
	}
	public get propViewDispatcher() {
		return this._propViewDispatcher;
	}
	private init() {
		this._propViewDispatcher = new egret.EventDispatcher();
	}
	private hide() {
		this.visible = false;
	}
	private tap_closeButton() {
		this.hide();
	}
	private tap_partLineButton() {
		// console.log('tap_partLineButton');
		this.hide();
		let mvt:PropViewEvent = new PropViewEvent(PropViewEvent.TAP_PART_LINE_BUTTON);
		this._propViewDispatcher.dispatchEvent(mvt)
	}
	private tap_showLineButton() {
		// console.log('tap_showLineButton');
		this.hide();
		let mvt:PropViewEvent = new PropViewEvent(PropViewEvent.TAP_SHOW_LINE_BUTTON);
		this._propViewDispatcher.dispatchEvent(mvt)
		
	}
}