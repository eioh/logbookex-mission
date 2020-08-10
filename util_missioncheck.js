load("script/missionData.js");
load("script/ScriptData.js");

data_prefix = "missioncheck_";

var currentDockData = {};

var GREAT_SUCCESS_RATE_BORDER = 95;

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
		ECCount: 0,
		sumTaisen: 0,
		sumTaisenAfterException: 0,
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
		currentDockData.sumTaisen += sumParam(ships[i], 'tais', []);
		currentDockData.sumTaisenAfterException += sumParam(ships[i], 'tais', [10, 11, 41]);

		//艦隊合計対空
		currentDockData.sumTaiku += sumParam(ships[i], 'tyku', []);

		//艦隊合計索敵
		currentDockData.sumSakuteki += sumParam(ships[i], 'saku', []);

		//艦隊合計火力
		currentDockData.sumKaryoku += sumParam(ships[i], 'houg', []);

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
function getCanMission(missionID, missionName){
	var _mdata = missionData["id_" + missionID];
	var mdata;
	var unknownMission = false;
	if (_mdata == undefined) {
		// イベント遠征用
		if (missionName == "前衛支援任務") {
			mdata = missionData.id_33;
		} else if (missionName == "艦隊決戦支援任務") {
			mdata = missionData.id_34;
		} else {// デフォルト
			unknownMission = true;
			mdata = defaultMissionData;
		}
	} else {
		mdata = _mdata;
	}

	/*
	var curDockTaisen = mdata.disableTaisen
		? currentDockData.sumTaisenAfterException
		: currentDockData.sumTaisen;
	*/
	// 航空機系の対潜値は除外（暫定）
	var curDockTaisen = currentDockData.sumTaisenAfterException;

	var result = {
		shipNum: currentDockData.shipCount >= mdata.shipNum,
		flgShipLv: currentDockData.flgShipLv >= mdata.flgShipLv,
		sumShipLv: currentDockData.sumShipLv >= mdata.shipLvSum,
		karyoku: currentDockData.sumKaryoku >= mdata.karyoku,
		taiku: currentDockData.sumTaiku >= mdata.taiku,
		sakuteki: currentDockData.sumSakuteki >= mdata.sakuteki,
		taisen: curDockTaisen >= mdata.taisen,
		drum: currentDockData.drumCount >= mdata.drumNum && currentDockData.drumShipCount >= mdata.drumShipNum,
		fleet: mdata.shipType(currentDockData) && (mdata.flgShipType == 0 || currentDockData.flgType == mdata.flgShipType)
	};

	setTmpData("missionID_" + missionID, JSON.stringify(result));
	var result2 = Object.keys(result).filter(function(v) {return result[v] === false});

	if (unknownMission) return "?";
	if (result2.length == 0) {
		// ドラム缶型
		if (mdata.greatSuccess === 'drum') {
			var drumBonus = 0;
			if (mdata.drumNum2 > 0) {
				if (mdata.drumNum2 > currentDockData.drumCount) {
					drumBonus = -15;
				} else {
					drumBonus = 20;
				}
			}
			var greatSuccessRate = 20 + currentDockData.kiraShipNum * 15 + drumBonus + 1;
			if (greatSuccessRate >= GREAT_SUCCESS_RATE_BORDER) return "◎";
		}
		// 旗艦レベル型
		if (mdata.greatSuccess === 'flagshipLv') {
			var greatSuccessRate = 20 + currentDockData.kiraShipNum * 15
				- 5 + parseInt(Math.sqrt(currentDockData.flgShipLv) + currentDockData.flgShipLv / 10) + 1
			if (greatSuccessRate >= GREAT_SUCCESS_RATE_BORDER) return "◎";
		}
		// 通常型
		if (currentDockData.shipCount == currentDockData.kiraShipNum) {
			var greatSuccessRate = 20 + currentDockData.kiraShipNum * 15 + 1;
			if (greatSuccessRate >= GREAT_SUCCESS_RATE_BORDER) return "◎";
		} else {
			return "○";
		}
	} else {
		return "×";
	}
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

function sumParam(ship, kind, exceptionList) {
	var items = getAllItems(ship);
	var param = ship.param[kind];
	var exceptionSum = items.filter(function(item){
		return exceptionList.indexOf(item.type2) != -1;
	}).map(function(item) {
		return item.param[kind];
	}).reduce(reduceSum, 0);
	var improvementBonus = items.map(function(item) {
		var lv = item.level;
		var sqrt = Math.sqrt;
		if (kind == 'houg') {
			switch(item.type3) {
				/** 小口径 */
				case 1: return 0.5 * sqrt(lv);	// ?
				/** 中口径 */
				case 2: return sqrt(lv);
				/** 大口径 */
				case 3: return 0.97 * sqrt(lv);	// ?
				/** 副砲 */
				case 4: return 0.15 * lv;
				/** 対艦強化弾 */
				case 13: return 0.5 * sqrt(lv);
				/** 対空機銃 */
				case 15: return 0.5 * sqrt(lv);
				default: return 0;
			}
		}
		if (kind == 'tyku') {
			switch(item.type3) {
				/** 対空機銃 */
				case 15: return sqrt(lv);
				/** 高角砲 */
				case 16: return 0.3 * lv;
				default: return 0;
			}
		}
		if (kind == 'tais') {
			switch(item.type3) {
				/** 爆雷投射機, 爆雷 */
				case 17: return sqrt(lv);
				/** ソナー */
				case 18: return sqrt(lv);
				default: return 0;
			}
		}
		if (kind == 'saku') {
			switch(item.type2) {
				/** 水上偵察機 */
				case 10: return 0.95 * sqrt(lv);	// ?
				/** 小型電探 */
				case 12: return sqrt(lv);
				/** 大型電探 */
				case 13: return 0.95 * sqrt(lv);	// ?
				/** 大型電探(II) */
				case 93: return 0.95 * sqrt(lv);	// ?
				default: return 0;
			}
		}
	}).reduce(reduceSum, 0);

	return param - exceptionSum + improvementBonus;
}

function getAllItems(ship) {
	var items = Java.from(ship.item2);
	items.push(ship.slotExItem);
	return items.filter(function(item) {
		return item;
	});
}

function reduceSum(prev, cur) {
	return prev + cur;
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