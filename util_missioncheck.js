load("script/missionData.js");

var currentDockData = {};

function setFleet(fleetid) {
	//艦隊データ取得
	var ships = Packages.logbook.data.context.GlobalContext.getDock(fleetid).getShips();

	//艦隊データオブジェクト初期化
	currentDockData = {
		flgType: 0,
		shipCount: ships.length,
		flgShipLv: 0,
		sumShipLv: 0,
		drumShipCount: 0,
		drumCount: 0,
		DECount: 0,
		DDCount: 0,
		CLCount: 0,
		CLTCount: 0,
		CACount: 0,
		CVACount: 0,
		BBCount: 0,
		CVCount: 0,
		CVLCount: 0,
		SSCount: 0,
		CVSCount: 0,
		CVBCount: 0,
		TVCount: 0,
		AVCount: 0,
		ASCount: 0,
		LHACount: 0,
		ACVCount: 0,
		ARCount: 0,
		sumTaisen: 0,
		ECCount: 0,
		sumMinusTaisen: 0,
		sumTaiku: 0,
		sumSakuteki: 0,
		sumKaryoku: 0,
		flgShipEC: false
	};

	//艦隊データオブジェクト設定
	for(var i = 0; i < ships.length; i++){

		//ドラム缶
		var drumFlg = false;
		for(var j = 0; j < ships[i].slot.length; j++){
			if(ships[i].slot[j].match(/ドラム缶\(輸送用\)/)){
				if(!drumFlg){
					currentDockData.drumShipCount++;
					drumFlg = true;
				}
				currentDockData.drumCount++;
			}
		}

		//旗艦Lv, Type
		if(i == 0){
			currentDockData.flgShipLv = ships[i].lv;
			currentDockData.flgType = ships[i].stype;
		}
		//艦隊合計Lv
		currentDockData.sumShipLv += ships[i].lv;

		//艦隊合計対潜
		currentDockData.sumTaisen += ships[i].getTaisen();

		//対潜値対象外装備の合計
		// +1 : 九八式水上偵察機(夜偵),OS2U,二式大艇,Ro.44水上戦闘機,二式水戦改,Ro.44水上戦闘機bis,二式水戦改(熟練)

		// +2 : Late 298B,瑞雲(六三一空),Ro.43水偵,零式水上偵察機,紫雲,PBY-5A Catalina
		// +3 : 晴嵐(六三一空)
		// +4 : 瑞雲,零式水上観測機
		// +5 : 瑞雲(六三四空),瑞雲12型,Ar196改
		// +6 : 瑞雲12型(六三四空),瑞雲(六三四空/熟練),試製晴嵐
		// +7 : 零式水上偵察機11型乙
		for(var j = 0; j < ships[i].slot.length; j++){

			if((ships[i].slot[j].match(/^九八式水上偵察機\(夜偵\)$/)) || (ships[i].slot[j].match(/^OS2U$/)) || (ships[i].slot[j].match(/^二式大艇$/)) || (ships[i].slot[j].match(/^Ro.44水上戦闘機$/)) || (ships[i].slot[j].match(/^二式水戦改$/)) || (ships[i].slot[j].match(/^Ro.44水上戦闘機bis$/)) || (ships[i].slot[j].match(/^二式水戦改\(熟練\)$/))) {
				currentDockData.sumMinusTaisen = currentDockData.sumMinusTaisen + 1;
			} else if ((ships[i].slot[j].match(/^Lat/)) || (ships[i].slot[j].match(/^瑞雲\(六三一空\)$/)) || (ships[i].slot[j].match(/^Ro.43水偵$/)) || (ships[i].slot[j].match(/^零式水上偵察機$/)) || (ships[i].slot[j].match(/^紫雲$/)) || (ships[i].slot[j].match(/^PBY-5A Catalina$/))){
				currentDockData.sumMinusTaisen = currentDockData.sumMinusTaisen + 2;
			} else if (ships[i].slot[j].match(/^晴嵐\(六三一空\)$/)) {
				currentDockData.sumMinusTaisen = currentDockData.sumMinusTaisen + 3;
			} else if ((ships[i].slot[j].match(/^瑞雲$/)) || (ships[i].slot[j].match(/^零式水上観測機$/))) {
				currentDockData.sumMinusTaisen = currentDockData.sumMinusTaisen + 4;
			} else if ((ships[i].slot[j].match(/^瑞雲\(六三四空\)$/)) || (ships[i].slot[j].match(/^瑞雲12型$/)) || (ships[i].slot[j].match(/^Ar196改$/))) {
				currentDockData.sumMinusTaisen = currentDockData.sumMinusTaisen + 5;
			} else if ((ships[i].slot[j].match(/^瑞雲12型\(六三四空\)$/)) || (ships[i].slot[j].match(/^瑞雲\(六三四空\/熟練\)$/)) || (ships[i].slot[j].match(/^試製晴嵐$/))) {
				currentDockData.sumMinusTaisen = currentDockData.sumMinusTaisen + 6;
			} else if (ships[i].slot[j].match(/^零式水上偵察機11型乙$/)) {
				currentDockData.sumMinusTaisen = currentDockData.sumMinusTaisen + 7;
			} else {
			}

		}

		//艦隊合計対空
		currentDockData.sumTaiku += ships[i].getTaiku();

		//艦隊合計索敵
		currentDockData.sumSakuteki += ships[i].getSakuteki();

		//艦隊合計索敵
		currentDockData.sumKaryoku += ships[i].getKaryoku();

		//艦種カウント
		switch(ships[i].stype){
			case 1: currentDockData.DECount++; break;
			case 2: currentDockData.DDCount++; break;
			case 3: currentDockData.CLCount++; break;
			case 4: currentDockData.CLTCount++; break;
			case 5: currentDockData.CACount++; break;
			case 6: currentDockData.CVACount++; break;
			case 8: currentDockData.BBCount++; break;
			case 9: currentDockData.BBCount++; break;
			case 10: currentDockData.CVBCount++; break;
			case 11: currentDockData.CVCount++; break;
			case 12: currentDockData.BBCount++; break;
			case 13: currentDockData.SSCount++; break;
			case 14: currentDockData.CVSCount++; break;
			case 16: currentDockData.AVCount++; break;
			case 17: currentDockData.LHACount++; break;
			case 18: currentDockData.ACVCount++; break;
			case 19: currentDockData.ARCount++; break;
			case 20: currentDockData.ASCount++; break;
			case 21: currentDockData.TVCount++; break;
		}
		if ((ships[i].stype == 7) && (!(ships[i].name.match(/^大鷹/))))
		{
			currentDockData.CVLCount++;
		}
		else if ((ships[i].stype == 7) && (ships[i].name.match(/^大鷹/)))
		{
			currentDockData.ECCount++;
			if (i == 0) {
				flgShipEC = true;
			}
		}
		else
		{
		}
	}
}

//遠征成功判定
function getCanMission(missionID){
	var mdata = missionData["id_" + missionID];

	// 遠征のデータがない場合
	if (mdata == undefined) return "?";

	var _shipNum = getValue(mdata.shipNum, 0);
	var _flgShipLv = getValue(mdata.flgShipLv, 0);
	var _shipLvSum = getValue(mdata.shipLvSum, 0);
	var _flgShipType = getValue(mdata.flgShipType, 0);
	var _drumShipNum = getValue(mdata.drumShipNum, 0);
	var _drumNum = getValue(mdata.drumNum, 0);
	var _taisen = getValue(mdata.taisen, 0);
	var _taiku = getValue(mdata.taiku, 0);
	var _sakuteki = getValue(mdata.sakuteki, 0);
	var _karyoku = getValue(mdata.karyoku, 0);

	if (currentDockData.shipCount >= _shipNum
		&& currentDockData.flgShipLv >= _flgShipLv
		&& currentDockData.sumShipLv >= _shipLvSum
		&& (_flgShipType == 0 || currentDockData.flgType == _flgShipType)
		&& currentDockData.drumShipCount >= _drumShipNum
		&& currentDockData.drumCount >= _drumNum
		&& (currentDockData.sumTaisen - currentDockData.sumMinusTaisen) >= _taisen
		&& currentDockData.sumTaiku >= _taiku
		&& currentDockData.sumSakuteki >= _sakuteki
		&& currentDockData.sumKaryoku >= _karyoku
		&& mdata.shipType(currentDockData)
	) {
		return "○";
	} else {
		return "×";
	}
}

/**
 * valueがundefinedのときにdefaultValueを返す
 * @param {*} value
 * @param {*} defaultValue
 */
function getValue(value, defaultValue) {
	return value == undefined ? defaultValue : value;
}

//艦種記号
//	DE	海防
//	DD	駆逐
//	CL	軽巡
//	CLT	雷巡
//	CA	重巡
//	CVA	航空巡洋艦
//	BB	戦艦
//	CV	正規空母
//	CVL	軽空母
//	EC	護衛空母
//	SS	潜水艦
//	CVS	潜水空母
//	CVB	航空戦艦
//	TV	練習巡洋艦
//	AV	水上機母艦
//	AS	潜水艦母艦
//	LHA	強襲揚陸艦
//	ACV 装甲空母
//	AR	工作艦