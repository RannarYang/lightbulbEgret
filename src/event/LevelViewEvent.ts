class LevelViewEvent extends egret.Event{
	public static TAP_SEL_LEVEL_BUTTON:string = "tap_sel_level_button";
    public static TAP_ENDLESS_BUTTON: string = "tap_endless_button";

    public levelNum:number=0; 
    public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false)
    {
        super(type,bubbles,cancelable);
    }
}