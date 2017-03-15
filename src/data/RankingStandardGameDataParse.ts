class RankingStandardGameDataParse {
	/**
	 * 针对当前关卡JSON数据，进行解析
	 */
	public static parseRankingStandardGameData(val:any){
		GameData.starConfig = val.starConfig;
	}
}