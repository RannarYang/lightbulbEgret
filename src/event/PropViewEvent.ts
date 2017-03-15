class PropViewEvent extends egret.Event {
	public static TAP_PART_LINE_BUTTON:string = "tap_part_line_button";
	public static TAP_SHOW_LINE_BUTTON:string = "tap_show_line_button";
    public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false)
    {
        super(type,bubbles,cancelable);
    }
}