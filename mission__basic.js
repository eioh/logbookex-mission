StringBuilder = Java.type("java.lang.StringBuilder");

load("script/utils.js");

function header() {
	return [ "遠征名" ];
}

function begin(fleetid) { }

function body(data) {
    var json = JSON.parse(data.getJsonString());
    var isMonthly = json.api_reset_type == 1;

    if (isMonthly) {
        var sb = new StringBuilder();
        var name = sb.append("【月】").append(data.name).toString();
        return toComparable([ name ]);
    } else {
        return toComparable([ data.name ]);
    }

}

function end() { }
