load("script/utils.js");

TableItem = Java.type("org.eclipse.swt.widgets.TableItem");
SWT = Java.type("org.eclipse.swt.SWT");
SWTResourceManager = Java.type("org.eclipse.wb.swt.SWTResourceManager");
RGB = Java.type("org.eclipse.swt.graphics.RGB");
ReportUtils = Java.type("logbook.util.ReportUtils");
AppConstants = Java.type("logbook.constants.AppConstants");

var mapareaIndex   = -1;

function begin(header) {
    for (var i = 1; i < header.length; ++i) {
        switch (header[i]) {
            case "海域名#遠征海域名":
                mapareaIndex = i;
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
            return new RGB(0xD3, 0xD3, 0xD3);
        case 2:
            return new RGB(0xCC, 0xCC, 0x9D);
        case 3:
            return new RGB(0x95, 0xCC, 0xCC);
        case 4:
            return new RGB(0x58, 0xCC, 0x9D);
        case 5:
            return new RGB(0x99, 0x99, 0xC9);
        case 7:
            return new RGB(0xd3, 0xD3, 0xD3);
        default:
            return new RGB(0xFF, 0x42, 0x13);
    }
}

function create(table, data, index) {
    var mission = data[0].get();
    var item = new TableItem(table, SWT.NONE);
    item.setData(mission);

    if ((index % 2) !== 0) {
        item.setBackground(SWTResourceManager.getColor(AppConstants.ROW_BACKGROUND));
    }

    item.setBackground(mapareaIndex, SWTResourceManager.getColor( mapareaColor(mission.mapareaId) ) );

    item.setText(ReportUtils.toStringArray(data));

    return item;
}

function end() {}
