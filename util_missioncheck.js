load("script/missionData.js");
load("script/ScriptData.js");

data_prefix = "missioncheck_";

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
		flgShipEC: false,
		kiraShipNum: 0
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
		var item2 = Java.from(ships[i].getItem2());
		currentDockData.sumMinusTaisen += getMinusTaisen(item2);


		//艦隊合計対空
		currentDockData.sumTaiku += ships[i].getTaiku();

		//艦隊合計索敵
		currentDockData.sumSakuteki += ships[i].getSakuteki();

		//艦隊合計索敵
		currentDockData.sumKaryoku += ships[i].getKaryoku();

		//キラ艦の数
		if (ships[i].cond > 49) currentDockData.kiraShipNum++;

		//艦種カウント
		switch(ships[i].stype){
			case 1: currentDockData.DECount++; break;
			case 2: currentDockData.DDCount++; break;
			case 3: currentDockData.CLCount++; break;
			case 4: currentDockData.CLTCount++; break;
			case 5: currentDockData.CACount++; break;
			case 6: currentDockData.CVACount++; break;
			case 7:
				// 護衛空母
				if (isEC(ships[i].name)) {
					currentDockData.ECCount++;
					if (i == 0) {
						currentDockData.flgShipEC = true;
					}
				// 軽空母
				} else {
					currentDockData.CVLCount++;
				}
				break;
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

	var curDockTaisen = mdata.disableTaisen
		? (currentDockData.sumTaisen - currentDockData.sumMinusTaisen)
		: currentDockData.sumTaisen;

	var result = {
		shipNum: currentDockData.shipCount >= _shipNum,
		flgShipLv: currentDockData.flgShipLv >= _flgShipLv,
		sumShipLv: currentDockData.sumShipLv >= _shipLvSum,
		karyoku: currentDockData.sumKaryoku >= _karyoku,
		taiku: currentDockData.sumTaiku >= _taiku,
		sakuteki: currentDockData.sumSakuteki >= _sakuteki,
		taisen: curDockTaisen >= _taisen,
		drum: currentDockData.drumCount >= _drumNum && currentDockData.drumShipCount >= _drumShipNum,
		fleet: mdata.shipType(currentDockData) && (_flgShipType == 0 || currentDockData.flgType == _flgShipType)
	};

	setTmpData("missionID_" + missionID, JSON.stringify(result));
	var result2 = Object.keys(result).filter(function(v) {return result[v] === false});

	if (result2.length == 0) {
		// 特別な大成功条件
		if (mdata.greatSuccess != undefined && mdata.greatSuccess(currentDockData)) {
			return "◎";
		// 全キラ
		} else if (currentDockData.shipCount == currentDockData.kiraShipNum) {
			return "◎";
		} else {
			return "○";
		}
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

/**
 * 護衛空母か
 * @param {string} shipName 艦名
 * @return {boolean}
 */
function isEC(shipName) {
	if (shipName.match(/^大鷹/)
		|| shipName.match(/^神鷹/)
		|| shipName.match(/^Gambier Bay/)
		|| shipName.match(/^瑞鳳改二乙$/)
	) {
		return true;
	}

	return false;
}

/**
 * 無効な装備対潜値の合計
 * @param {Array.<logbook.dto.ItemDto>} items 装備
 */
function getMinusTaisen(items) {
	var ret = items.filter(function(item) {
		// 装備なし
		if (item == null) return false;
		return item.type2 == 10		// 水上偵察機
			|| item.type2 == 11		// 水上爆撃機
			|| item.type2 == 41;	// 大型飛行艇
	}).reduce(function (sum, item) {
		return sum + item.param.tais;
	}, 0);

	return ret;
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