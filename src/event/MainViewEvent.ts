class MainViewEvent extends egret.Event{
	public static SUCCESS:string = "success";
	public static TAP_SEL_LEVEL_BUTTON: string = "tap_sel_level_button";
	public static TAP_REPLAY_BUTTON: string = "tap_replay_button";
    public static TAP_PROP_BUTTON: string = "tap_prop_button";
    public static TAP_SOUND_BUTTON: string = "tap_sound_button";

    public static SKIP_GUIDE: string = "skip_guide";

    public starNum : number;
    public soundOn : boolean;
    public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false)
    {
        super(type,bubbles,cancelable);
    }
}