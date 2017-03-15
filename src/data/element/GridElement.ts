class GridElement {
	public type: GridElementType;
	public kind: string = "light";
	public des_rot: number = 0;
	public xIndex: number = 0;
	public yIndex: number = 0;
	private _rot: number = 0;
	
	public depth: number;
	public exit = []; // 根据type 和 rot 计算

	public set rot(rot) {
		this._rot = rot;
		this.exit = Util.getExitByTypeAndRot(this.type.typeNum, this.rot);
	}
	public get rot() {
		return this._rot;
	}
	public constructor(xIndex, yIndex, type, kind, init_rot, rot) {
		this.xIndex = xIndex;
		this.yIndex = yIndex;
		this.type = GridElementType.getInstance(type);
		this.kind = kind;
		this.rot = init_rot;
		this.des_rot = rot;
	}
}