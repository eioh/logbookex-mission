StringBuilder = Java.type("java.lang.StringBuilder");

load("script/utils.js");
load("script/missionData.js");
load("script/ScriptData.js");

data_prefix = "missioncheck_";

function header() {
	return [
		"ID2#ソート用遠征ID",
		"ID3#ゲーム中の表示ID",
		"海域名#遠征海域名",
		"艦数#遠征要求隻数",
		"旗艦Lv#遠征要求旗艦Lv",
		"合計Lv#遠征要求合計Lv",
		"必須艦#遠征要求艦",
		"ドラム#必要ドラム缶数/搭載隻数",
		"火力#必要火力",
		"対空#必要対空",
		"対潜#必要対潜",
		"索敵#必要索敵",
		"時間#遠征時間",
		"経験値#遠征経験値",
		"燃料#遠征獲得燃料",
		"弾薬#遠征獲得弾薬",
		"鋼材#遠征獲得鋼材",
		"ボーキ#遠征獲得ボーキ",
		"修復#遠征獲得バケツ",
		"建造#遠征獲得バーナー",
		"開発資材#遠征獲得開発資材",
		"家具箱#遠征獲得家具箱",
		"ネジ#遠征獲得改修資材",
		"伊良子#遠征獲得伊良子"
	];
}

function begin(fleetid) { }

function body(data) {
	var json = JSON.parse(data.getJsonString());
	return toComparable(mission_data(data.id, json));
}

function end() { }

//隻数 旗艦Lv 合計Lv 必要艦 時間 経験値 燃料 弾薬 鋼材 ボーキ バケツ バーナー 開発資材 家具箱 改修資材
/**
 * @param {number} missionID 遠征ID
 * @return {Array} 遠征データ
 */
function mission_data(missionID, json){
	var mdata = missionData["id_" + missionID];
	var winItem1 = json.api_win_item1;
	var winItem2 = json.api_win_item2;

	var bucket = getWinItemNum(winItem1, winItem2, 1);
	var burner = getWinItemNum(winItem1, winItem2, 2);
	var dev = getWinItemNum(winItem1, winItem2, 3);
	var fBox = (function() {
		var sb = new StringBuilder();
		var l = getWinItemNum(winItem1, winItem2, 12);
		var m = getWinItemNum(winItem1, winItem2, 11);
		var s = getWinItemNum(winItem1, winItem2, 10);
		if (l > 0) return sb.append("大").append(l).toString();
		if (m > 0) return sb.append("中").append(m).toString();
		if (s > 0) return sb.append("小").append(s).toString();
		return "0";
	})();
	var screw = getWinItemNum(winItem1, winItem2, 4);
	var irako = getWinItemNum(winItem1, winItem2, 59);

	if (mdata == undefined) {
		// イベント遠征用
		if (json.api_name == "前衛支援任務") {
			mdata = missionData.id_33;
		} else if (json.api_name == "艦隊決戦支援任務") {
			mdata = missionData.id_34;
		} else {// デフォルト
			mdata = defaultMissionData;
		}
	}

	var drumText = drumTextFormat(mdata.drumNum, mdata.drumNum2, mdata.drumShipNum);

	var ret = [
		getIdForSort(json.api_maparea_id, json.api_id),
		json.api_disp_no,
		getMapareaName(json.api_maparea_id),
		mdata.shipNum,
		mdata.flgShipLv,
		mdata.shipLvSum,
		mdata.shipTypeText,
		drumText,
		mdata.karyoku,
		mdata.taiku,
		mdata.taisen,
		mdata.sakuteki,
		timeFormat(json.api_time),
		mdata.exp,
		mdata.fuel,
		mdata.ammo,
		mdata.steel,
		mdata.bauxite,
		bucket,
		burner,
		dev,
		fBox,
		screw,
		irako
	];

	return ret;
}

function timeFormat(minutes) {
	var h = parseInt(minutes / 60);
	var m = parseInt(minutes % 60);

	var sbh = new StringBuilder();
	var hhs = sbh.append("00").append(h | 0).toString();
	var hh = hhs.substring(hhs.length() - 2);

	var sbm = new StringBuilder();
	var mms = sbm.append("00").append(m | 0).toString();
	var mm = mms.substring(mms.length() - 2);

	var sb = new StringBuilder();
	sb.append(hh).append(":").append(mm);

	return sb.toString();
}

function getWinItemNum(winItem1, winItem2, itemId) {
	if (winItem1[0] == itemId) return winItem1[1];
	if (winItem2[0] == itemId) return winItem2[1];
	return 0;
}

function drumTextFormat(drumNum, drumNum2, drumShipNum) {
	var drumNumSb = new StringBuilder();
	var drumShipNumSb = new StringBuilder();
	var retSb = new StringBuilder();
	if (drumNum != 0) drumNumSb.append(drumNum).append("個");
	if (drumNum2 != 0) drumNumSb.append("(大:").append(drumNum2).append("個)");
	if (drumShipNum != 0) drumShipNumSb.append(drumShipNum).append("隻");
	if (drumNumSb.length() != 0 && drumShipNumSb.length() != 0) {
		retSb.append(drumNumSb).append("/").append(drumShipNumSb);
	} else {
		retSb.append(drumNumSb).append(drumShipNumSb);
		if (retSb.length() == 0) ret = retSb.append("-");
	}

	return retSb.toString();
}

/**
 * ソート用IDを取得
 * @param {number} mapId 海域ID
 * @param {number} id 遠征ID
 * @return {number} ID
 */
function getIdForSort(mapId, id) {
	var mapIndex = (function (x) {
		switch (x) {
			case 1: return 1;
			case 2: return 2;
			case 3: return 3;
			case 4: return 5;
			case 5: return 6;
			case 6: return 7;
			case 7: return 4;
			default: return x;
		}
	})(mapId);

	return (mapIndex * 1000 + id) | 0;
}

/**
 * 海域名を取得
 * @param {number} mapId 海域ID
 * @return {string} 海域名
 */
function getMapareaName(mapId) {
	switch (mapId) {
		case 1: return "鎮守府海域";
		case 2: return "南西海域";
		case 3: return "北方海域";
		case 4: return "西方海域";
		case 5: return "南方海域";
		case 6: return "中部海域";
		case 7: return "南西海域";
		default: return "期間限定海域";
	}
}