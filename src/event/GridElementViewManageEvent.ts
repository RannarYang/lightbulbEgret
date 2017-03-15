class GridElementViewManageEvent extends egret.Event{
	public static TAP__GRIDELEMENT:string = "tap_gridelement";

    public xIndex:number=0; //第一个点击的元素
    public yIndex:number=0; //第二个点击的元素
    public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false)
    {
        super(type,bubbles,cancelable);
    }
}