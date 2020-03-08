load("script/utils.js");
load("script/missionData.js");
load("script/ScriptData.js");

data_prefix = "missioncheck_";


Integer = Java.type("java.lang.Integer");
TableItem = Java.type("org.eclipse.swt.widgets.TableItem");
SWT = Java.type("org.eclipse.swt.SWT");
SWTResourceManager = Java.type("org.eclipse.wb.swt.SWTResourceManager");
RGB = Java.type("org.eclipse.swt.graphics.RGB");
ReportUtils = Java.type("logbook.util.ReportUtils");
AppConstants = Java.type("logbook.constants.AppConstants");

var mapareaIndex   = -1;
var shipNumIndex   = -1;
var flgShipLvIndex = -1;
var sumShipLvIndex = -1;
var karyokuIndex = -1;
var taikuIndex = -1;
var sakutekiIndex = -1;
var taisenIndex = -1;
var fleetIndex = -1;
var drumIndex = -1;

function begin(header) {
    for (var i = 1; i < header.length; ++i) {
        switch (header[i]) {
            case "海域名#遠征海域名":
                mapareaIndex = i;
                break;
            case "艦数#遠征要求隻数":
                shipNumIndex = i;
                break;
            case "旗艦Lv#遠征要求旗艦Lv":
                flgShipLvIndex = i;
                break;
            case "合計Lv#遠征要求合計Lv":
                sumShipLvIndex = i;
                break;
            case "火力#必要火力":
                karyokuIndex = i;
                break;
            case "対空#必要対空":
                taikuIndex = i;
                break;
            case "索敵#必要索敵":
                sakutekiIndex = i;
                break;
            case "対潜#必要対潜":
                taisenIndex = i;
                break;
            case "必須艦#遠征要求艦":
                fleetIndex = i;
                break;
            case "ドラム#必要ドラム缶数/搭載隻数":
                drumIndex = i;
                break;
            default : break;
        }
    }


}

function getMapareaName(mapareaId) {
    switch (mapareaId) {
        case 1: return "鎮守府海域";
        case 2: return "南西海域";
        case 3: return "北方海域";
        case 4: return "西方海域";
        case 5: return "南方海域";
        case 5: return "中部海域";
        case 5: return "南西海域";
        default: return "???";
    }
}

function mapareaColor(mapName) {
    switch (mapName) {
        case 1:
            return new RGB(0xA5, 0xD6, 0xA7);
        case 2:
            return new RGB(0x81, 0xD4, 0xFA);
        case 3:
            return new RGB(0xB0, 0xBE, 0xC5);
        case 4:
            return new RGB(0xFF, 0xAB, 0x91);
        case 5:
            return new RGB(0xCE, 0x93, 0xD8);
        case 7:
            return new RGB(0xFF, 0xE0, 0x82);
        default:
            return new RGB(0xF4, 0x43, 0x36);
    }
}

function WarinigColor() {
    return new RGB(0xEF, 0x9A, 0x9A);
}

function create(table, data, index) {
    var mission = data[0].get();
    var item = new TableItem(table, SWT.NONE);
    item.setData(mission);

    var id = mission.id;

    // 偶数行に背景色を付ける
    if ((index % 2) !== 0) {
        item.setBackground(SWTResourceManager.getColor(AppConstants.ROW_BACKGROUND));
    }

    // 海域名に背景色をつける
    item.setBackground(mapareaIndex, SWTResourceManager.getColor( mapareaColor(mission.mapareaId) ) );

    var result = JSON.parse(getData("missionID_" + mission.id));
    if (!result || !result.shipNum) {
        item.setBackground(shipNumIndex, SWTResourceManager.getColor( WarinigColor() ) );
    }
    if (!result || !result.flgShipLv) {
        item.setBackground(flgShipLvIndex, SWTResourceManager.getColor( WarinigColor() ) );
    }
    if (!result || !result.sumShipLv) {
        item.setBackground(sumShipLvIndex, SWTResourceManager.getColor( WarinigColor() ) );
    }
    if (!result || !result.karyoku) {
        item.setBackground(karyokuIndex, SWTResourceManager.getColor( WarinigColor() ) );
    }
    if (!result || !result.taiku) {
        item.setBackground(taikuIndex, SWTResourceManager.getColor( WarinigColor() ) );
    }
    if (!result || !result.sakuteki) {
        item.setBackground(sakutekiIndex, SWTResourceManager.getColor( WarinigColor() ) );
    }
    if (!result || !result.taisen) {
        item.setBackground(taisenIndex, SWTResourceManager.getColor( WarinigColor() ) );
    }
    if (!result || !result.fleet) {
        item.setBackground(fleetIndex, SWTResourceManager.getColor( WarinigColor() ) );
    }
    if (!result || !result.drum) {
        item.setBackground(drumIndex, SWTResourceManager.getColor( WarinigColor() ) );
    }

    item.setText(ReportUtils.toStringArray(data));

    return item;
}

function end() {}
