class GridElementViewManage extends egret.EventDispatcher{
	private _layer: egret.Sprite;
	private _elementViews : GridElementView[][] = [];
	public constructor(layer: egret.Sprite) {
		super();
		this._layer = layer;
		this.init();
	}
	public getElementViews(xIndex, yIndex) {
		return this._elementViews[xIndex][yIndex];
	}
	public usePartLineProp() {
		for(let i = 0; i < GameData.sureGridArr.length; i++) {
			let sureGrid = GameData.sureGridArr[i];
			let xIndex = sureGrid.line;
			let yIndex = sureGrid.col;
			let elementView = this._elementViews[xIndex][yIndex];
			
		}
		let sureGridArr = JSON.parse(JSON.stringify(GameData.sureGridArr));
		this.rotateElementToDes(sureGridArr);
	}
	public useShowLineProp() {
		let elementView = this._elementViews;
		for(let i = 0; i < elementView.length; i++) {
			for(let j = 0; j < elementView[i].length; j++) {
				elementView[i][j].addTipsLine();
			}
		}
	}
	private rotateElementToDes(sureGridArr) {
		let sureGrid = sureGridArr.pop();
		if(sureGrid) {
			let xIndex = sureGrid.line;
			let yIndex = sureGrid.col;
			let elementView = this._elementViews[xIndex][yIndex];
			elementView.rotateToDes(() => {
				this.rotateElementToDes(sureGridArr);
			});
		}
	}
	
	private init() {
		let line = GameData.line;
		let col = GameData.col;

		this._elementViews = [];
		for (let i = 0; i < line; i++) {
			this._elementViews[i] = [];
			for (let j = 0; j < col; j++) {
				this.addElementView(i, j);
			}
		}

		var frameShape = new egret.Shape();
        frameShape.graphics.lineStyle(4, GameData.frameColor);
        frameShape.graphics.drawRect(1, 0, GameData.col * GameData.brickwidth - 2, GameData.line * GameData.brickwidth);
		frameShape.graphics.endFill();
        this._layer.addChild(frameShape);
		this.lightBulb();

	}
	public reset() {
		for (let i = 0; i < GameData.line; i++) {
			for (let j = 0; j < GameData.col; j++) {
				this._elementViews[i][j].reset();
			}
		}
	}
	public lightBulb() {
		for(let i = 0; i < GameData.nowLight.length; i++) {
			let lightElement = GameData.nowLight[i];
			let elementView = this.getElementViews(lightElement.xIndex, lightElement.yIndex);
			elementView.setLight();
		}
	}
	public unlightBulb() {
		for(let i = 0; i < GameData.nowLight.length; i++) {
			let lightElement = GameData.nowLight[i];
			let elementView = this.getElementViews(lightElement.xIndex, lightElement.yIndex);
			elementView.setUnlight();
		}
	}
	private addElementView(i, j) {
		let elementView = new GridElementView(i, j);
		this._elementViews[i][j] = elementView;
		elementView.x = j * GameData.brickwidth;
		elementView.y = i * GameData.brickwidth;
		elementView.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch_tap, this);
		this._layer.addChild(elementView);
	}
	private touch_tap(evt) {
		let elementView = evt.currentTarget;

		let evmt:GridElementViewManageEvent = new GridElementViewManageEvent(GridElementViewManageEvent.TAP__GRIDELEMENT);
		evmt.xIndex = elementView.element.xIndex;
		evmt.yIndex = elementView.element.yIndex;

		this.dispatchEvent(evmt);

		elementView.rotate();
	}
	
}