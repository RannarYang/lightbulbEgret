class GridElement {
	public type: GridElementType;
	public kind: string = "unlight";
	public des_rot: number = 0;
	public xIndex: number = 0;
	public yIndex: number = 0;
	private _rot: number = 0;
	
	public depth: number;
	public exit = []; // 根据type 和 rot 计算

	public set rot(rot) {
		this._rot = rot;
		let time = 0;
		switch ("type" + this.type.typeNum) {
			case "type1":
				this.exit = [0, 0, 0, 0];
				time = this._rot / 90 % 4;
				this.exit[time] = true;
				break;
			case "type2":
				this.exit = [0, 0, 0, 0];
				time = this._rot / 90 % 2;
				if (time == 1) {
					this.exit = [0, true, 0, true];
				} else {
					this.exit = [true, 0, true, 0];
				}
				break;
			case "type3":
				this.exit = [true, true, true, true];
				time = this._rot / 90 % 4;
				this.exit[time] = false;
				break;
			case "type4":
				this.exit = [0, 0, 0, 0];
				time = this._rot / 90 % 4;
				this.exit[time] = true;
				this.exit[(time - 1 + 4) % 4] = true;
				break;
			case "type5":
				this.exit = [0, 0, 0, 0];
				break;
		}
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