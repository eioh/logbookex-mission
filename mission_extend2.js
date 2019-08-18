load("script/utils.js");

function header() {
	return [
		"ID2#ソート用遠征ID",
		"海域名#遠征海域名"
	]
}

function begin(fleetid) { }

function body(data) {
	return toComparable([
		getIdForSort(data.mapareaId, data.id),
		getMapareaName(data.mapareaId)
	]);
}

function end() { }

/**
 * ソート用IDを取得
 * @param {number} mapId 海域ID
 * @param {number} id 遠征ID
 * @return {number} ID
 */
function getIdForSort(mapId, id) {
	var mapIndex = (function(x) {
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