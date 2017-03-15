class CongradulationViewEvent extends egret.Event{
	public static TAP_SURE_BUTTON:string = "tap_sure_button";

    public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false)
    {
        super(type,bubbles,cancelable);
    }
}