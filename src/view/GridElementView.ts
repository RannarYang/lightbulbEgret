class GridElementView extends egret.Sprite{
	private xIndex: number;
	private yIndex: number;
	private _squareShape: egret.Shape;
	private _roadShape: egret.Shape;
	private _tipsLineShape: egret.Shape;
	private _elementImg: egret.Bitmap;

	public constructor(xIndex, yIndex){
		super();
		this.xIndex = xIndex;
		this.yIndex = yIndex;
		this.init();
	}
	private init() {
		this.touchEnabled = true;
		let element = this.element;
		// add square
		let squareShape: egret.Shape = this._squareShape = new egret.Shape();
        squareShape.x = squareShape.y = 0;
		this.addChild(squareShape);
		this.changeSquareShape(true);

		// add roadShape
		let roadShape: egret.Shape = this._roadShape = new egret.Shape();
		roadShape.x = roadShape.y = roadShape.anchorOffsetX = roadShape.anchorOffsetY = GameData.brickwidth * 0.5;
		this.addChild(roadShape);
		this.changeRoadShape(false);
		roadShape.rotation = element.rot;

		let tipsLineShape = this._tipsLineShape = new egret.Shape();
		tipsLineShape.x = tipsLineShape.y = tipsLineShape.anchorOffsetX = tipsLineShape.anchorOffsetY = GameData.brickwidth * 0.5;
		this.addChild(tipsLineShape);

		// add Image
		this._elementImg = new egret.Bitmap();
		if(element.kind !== 'wine') {
			let key = element.kind + 'Size';
			this._elementImg.touchEnabled = false;
			this._elementImg.texture = element.kind === 'light' ? RES.getRes('un' + element.kind + '_png') : RES.getRes(element.kind + '_png');
			this._elementImg.x = GameData[key].bitmapX;
			this._elementImg.y = GameData[key].bitmapY;
			this._elementImg.scaleX = GameData[key].bitmapScale;
			this._elementImg.scaleY = GameData[key].bitmapScale;
			this.addChild(this._elementImg);
		}
		
	}
	public setLight() {
		if(this.element.kind === 'light') {
			this._elementImg.texture = RES.getRes('light_png');
		}
		// add roadShape
		this.changeRoadShape(true);
	}
	public setUnlight() {
		if(this.element.kind === 'light') {
			this._elementImg.texture = RES.getRes('unlight_png');
		}
		this.changeRoadShape(false);
	}
	public get element() :GridElement {
		return GameData.elements[this.xIndex][this.yIndex]
	}
	
	public addTipsLine() {
		let tipsLineShape = this._tipsLineShape;
		tipsLineShape.graphics.clear();
		let element = this.element;
		tipsLineShape.graphics.lineStyle(2, GameData.tipColor);
		let shapeinfo_line = element.type.line;
		for (var i = 0; i < shapeinfo_line.length; i++) {
            tipsLineShape.graphics.lineTo(shapeinfo_line[i].front[0] * GameData.brickwidth, shapeinfo_line[i].front[1] * GameData.brickwidth);
            tipsLineShape.graphics.lineTo(shapeinfo_line[i].to[0] * GameData.brickwidth, shapeinfo_line[i].to[1] * GameData.brickwidth);
        }
		tipsLineShape.rotation = this.element.des_rot;
	}
	public rotate(callback = () => {}) {
		this.touchEnabled = false;
		let rotation = this.element.rot;
		if (rotation === 270) {
			rotation = -90;
			this._roadShape.rotation = -180;
		}
		var tw:egret.Tween = egret.Tween.get(this._roadShape);
		tw.to({rotation: rotation}, 150).call(()=>{
			egret.Tween.removeTweens(this._roadShape);
			callback();
			this.touchEnabled = true;
		});
		
		
	}
	public rotateToDes(callback = () => {}) {
		// 背景变灰表示不可点击
		this.touchEnabled = false;
		this.changeSquareShape(false);
		var tw:egret.Tween = egret.Tween.get(this._roadShape);
		tw.to({rotation: this.element.des_rot}, 200).call(callback);
	}
	public reset() {
		this.touchEnabled = true;
		this.changeSquareShape(true);
		this._roadShape.rotation = this.element.rot;
		this.setUnlight();
	}
	private changeRoadShape(isLight) {
		let element = this.element;
		let roadShape = this._roadShape;
		let fillColor = isLight ? GameData.roadLinkColor: GameData.roadUnlinkColor;

		roadShape.graphics.clear();
		roadShape.graphics.beginFill(fillColor);
		let elementShapeType = element.type.shapetype;
		switch (elementShapeType) {
            case "line":
				let shapePaths = element.type.shapepath;
				for (var j = 0, shapepath_len = shapePaths.length; j < shapepath_len; j++) {
                    var shapePath = shapePaths[j];
                    roadShape.graphics.lineTo(shapePath[0] * GameData.brickwidth, shapePath[1] * GameData.brickwidth);
                }
				roadShape.graphics.endFill();
                
                break;
            case "rect":
                roadShape.graphics.drawRect(element.type.x * GameData.brickwidth, element.type.y * GameData.brickwidth, element.type.w * GameData.brickwidth, element.type.h * GameData.brickwidth);
                roadShape.graphics.endFill();
                break;
        }
		
	}
	private changeSquareShape(canClick:boolean) {
		let squareShape = this._squareShape;
		let fillColor = canClick ? GameData.squareFillColor: 0xbac7da;
		squareShape.graphics.clear();
		squareShape.graphics.beginFill(fillColor, 1);
		squareShape.graphics.lineStyle(4, GameData.squareStroColor, 1);
		squareShape.graphics.drawRect(0, 0, GameData.brickwidth, GameData.brickwidth);
		squareShape.graphics.endFill();
	}
}