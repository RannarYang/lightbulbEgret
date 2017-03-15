class SuccessViewEvent extends egret.Event {
	public static TAP_NEXT_LEVEL_BUTTON:string = "tap_next_level_button";

    public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false)
    {
        super(type,bubbles,cancelable);
    }
}