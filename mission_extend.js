StringBuilder = Java.type("java.lang.StringBuilder");

load("script/utils.js");
load("script/missionData.js");
load("script/ScriptData.js");

data_prefix = "missioncheck_";

function header() {
	return [
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

	var shipNum = (mdata !== undefined && mdata.shipNum !== undefined) ? mdata.shipNum : 0;
	var flagShipLv = (mdata !== undefined && mdata.flagShipLv !== undefined) ? mdata.flagShipLv : 0;
	var shipLvSum = (mdata !== undefined && mdata.shipLvSum !== undefined) ? mdata.shipLvSum : 0;
	var shipTypeText = (mdata !== undefined && mdata.shipTypeText !== undefined) ? mdata.shipTypeText : "不明";
	var exp = (mdata !== undefined && mdata.exp !== undefined) ? mdata.exp : 0;
	var resource = mdata !== undefined ? mdata.resource : undefined;
	var fuel = (resource !== undefined && resource.fuel !== undefined) ? resource.fuel : 0;
	var ammo = (resource !== undefined && resource.ammo !== undefined) ? resource.ammo : 0;
	var steel = (resource !== undefined && resource.steel !== undefined) ? resource.steel : 0;
	var bauxite = (resource !== undefined && resource.bauxite !== undefined) ? resource.bauxite : 0;

	var karyoku = (mdata !== undefined && mdata.karyoku !== undefined) ? mdata.karyoku : 0;
	var taiku = (mdata !== undefined && mdata.taiku !== undefined) ? mdata.taiku : 0;
	var taisen = (mdata !== undefined && mdata.taisen !== undefined) ? mdata.taisen : 0;
	var sakuteki = (mdata !== undefined && mdata.sakuteki !== undefined) ? mdata.sakuteki : 0;

	var drumNum = (mdata !== undefined && mdata.drumNum !== undefined) ? mdata.drumNum : 0;
	var drumShipNum = (mdata !== undefined && mdata.drumShipNum !== undefined) ? mdata.drumShipNum : 0;
	var drumText = drumTextFormat(drumNum, drumShipNum);

	var ret = [
		shipNum,
		flagShipLv,
		shipLvSum,
		shipTypeText,
		drumText,
		karyoku,
		taiku,
		taisen,
		sakuteki,
		timeFormat(json.api_time),
		exp,
		fuel,
		ammo,
		steel,
		bauxite,
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

function drumTextFormat(drumNum, drumShipNum) {
	var sb = new StringBuilder();
	if (drumNum != 0) {
		sb.append(drumNum).append("個");
		if (drumShipNum != 0) {
			sb.append("/").append(drumShipNum).append("隻");
		}
	} else {
		if (drumShipNum != 0) {
			sb.append(drumShipNum).append("隻");
		} else {
			sb.append("-");
		}
	}

	return sb.toString();
}