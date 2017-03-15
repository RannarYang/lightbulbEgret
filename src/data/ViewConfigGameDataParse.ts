class ViewConfigGameDataParse {
	public static parseViewConfigGameData(val: any) {
		GameData.frameColor = parseInt(val.frameColor ,16);
		GameData.squareFillColor = parseInt(val.squareFillColor ,16);
		GameData.squareUnableFillColor = parseInt(val.squareUnableFillColor ,16);
		GameData.squareStroColor = parseInt(val.squareStroColor, 16);
		GameData.roadLinkColor = parseInt(val.roadLinkColor, 16);
		GameData.roadUnlinkColor = parseInt(val.roadUnlinkColor, 16);
		GameData.tipColor = parseInt(val.tipColor, 16);
		GameData.unlockFillColor = parseInt(val.unlockFillColor, 16),
		GameData.roadPercent = val.roadPercent;
		GameData.leftPercent = val.leftPercent;
		GameData.leftRoadPercent = val.leftRoadPercent;

	}
}