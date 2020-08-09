var defaultMissionData = {
    shipNum: 0,             // 隻数
    flgShipLv: 0,           // 機関のレベル
    shipLvSum: 0,           // 艦隊の合計レベル
    flgShipType: 0,         // 旗艦の艦種ID
    exp: 0,                 // 獲得経験値
    drumNum: 0,             // 要求ドラム缶数
    drumNum2: 0,            // 要求ドラム缶数(大成功用)
    drumShipNum: 0,         // 要求ドラム缶搭載隻数
    karyoku: 0,             // 艦隊の火力の合計値
    taiku: 0,               // 艦隊の対空の合計値
    taisen: 0,              // 艦隊の対潜の合計値
    sakuteki: 0,            // 艦隊の索敵の合計値
    disableTaisen: false,   // 艦隊の対潜の合計値計算時に一部装備の値を除外するか
    fuel: 0,                // 獲得燃料
    ammo: 0,                // 獲得弾薬
    steel: 0,               // 獲得鋼材
    bauxite: 0,             // 獲得ボーキサイト
    greatSuccess: 'nomal',  // 大成功条件のタイプ 'nomal'|'flagshipLv'|'drum'
    shipTypeText: "不明",   // 艦種条件(テキスト)
    shipType: function (data) { // 艦種条件を満たしているか判定
        return false;
    },
    greatSuccess: null      // 通常の条件以外の大成功条件
};

var _missionData = {
    /* 鎮守府海域 */
    id_1: {
        shipNum: 2,
        flgShipLv: 1,
        exp: 10,
        ammo: 30,
        shipTypeText: "自由2",
        shipType: function(data) {
            if (data.shipCount >= 2) return true;   // 自由枠の判定
            return false;
        }
    },
    id_2: {
        shipNum: 4,
        flgShipLv: 2,
        exp: 20,
        ammo: 100,
        steel: 30,
        shipTypeText: "自由4",
        shipType: function (data) {
            if (data.shipCount >= 4) return true;
            return false;
        }
    },
    id_3: {
        shipNum: 3,
        flgShipLv: 3,
        exp: 30,
        fuel: 30,
        ammo: 30,
        steel: 40,
        shipTypeText: "自由3",
        shipType: function (data) {
            if (data.shipCount >= 3) return true;
            return false;
        }
    },
    id_4: {
        shipNum: 3,
        flgShipLv: 3,
        exp: 30,
        ammo: 70,
        shipTypeText: "軽1 (駆+海)2 等",
        shipType: function (data) {
            if (data.CLCount >= 1 && (data.DDCount + data.DECount) >= 2) return true;
            if (data.DDCount >= 1 && data.DECount >= 3) return true;
            if (data.ECCount >= 1 && data.DDCount >= 2) return true;
            if (data.ECCount >= 1 && data.DECount >= 2) return true;
            if (data.TVCount >= 1 && data.DECount >= 2) return true;
            return false;
        }
    },
    id_5: {
        shipNum: 4,
        flgShipLv: 3,
        exp: 40,
        fuel: 200,
        ammo: 200,
        steel: 20,
        bauxite: 20,
        shipTypeText: "軽1 (駆+海)2 他1 等",
        shipType: function (data) {
            if (data.shipCount >= 4) {
                if (data.CLCount >= 1 && (data.DDCount + data.DECount) >= 2) return true;
                if (data.DDCount >= 1 && data.DECount >= 3) return true;
                if (data.ECCount >= 1 && data.DDCount >= 2) return true;
                if (data.ECCount >= 1 && data.DECount >= 2) return true;
                if (data.TVCount >= 1 && data.DECount >= 2) return true;
            }
            return false;
        }
    },
    id_6: {
        shipNum: 4,
        flgShipLv: 4,
        exp: 30,
        bauxite: 80,
        shipTypeText: "自由4",
        shipType: function (data) {
            if (data.shipCount >= 4) return true;
            return false;
        }
    },
    id_7: {
        shipNum: 6,
        flgShipLv: 5,
        exp: 60,
        steel: 50,
        bauxite: 30,
        shipTypeText: "自由6",
        shipType: function (data) {
            if (data.shipCount >= 6) return true;
            return false;
        }
    },
    id_8: {
        shipNum: 6,
        flgShipLv: 6,
        exp: 120,
        fuel: 50,
        ammo: 100,
        steel: 50,
        bauxite: 50,
        shipTypeText: "自由6",
        shipType: function (data) {
            if (data.shipCount >= 6) return true;
            return false;
        }
    },
    id_100: {
        shipNum: 4,
        flgShipLv: 15,
        exp: 15,
        fuel: 45,
        ammo: 45,
        shipTypeText: "(駆+海)3 他1",
        shipType: function (data) {
            if (data.shipCount >= 4) {
                if (data.DDCount + data.DECount >= 3) return true;
            }
            return false;
        }
    },
    id_101: {
        shipNum: 4,
        flgShipLv: 20,
        shipLvSum: 144,
        taiku: 70,
        taisen: 180,
        disableTaisen: true,    // 一部装備の対潜値を無効にする
        sakuteki: 73,
        exp: 40,
        fuel: 70,
        ammo: 40,
        bauxite: 10,
        greatSuccess: 'flagshipLv',
        shipTypeText: "(駆+海)4",
        shipType: function (data) {
            if (data.DDCount + data.DECount >= 4) return true;
            return false;
        }
    },
    id_102: {
        shipNum: 5,
        flgShipLv: 35,
        shipLvSum: 185,
        taiku: 162,
        taisen: 280,
        disableTaisen: true,
        sakuteki: 60,
        exp: 55,
        fuel: 120,
        steel: 60,
        bauxite: 60,
        greatSuccess: 'flagshipLv',
        shipTypeText: "軽1 (駆+海)3 他1 等",
        shipType: function (data) {
            if (data.shipCount >= 5) {
                if (data.CLCount >= 1 && (data.DDCount + data.DECount) >= 3) return true;
                if (data.DDCount >= 1 && data.DECount >= 3) return true;
                if (data.ECCount >= 1 && data.DDCount >= 2) return true;
                if (data.ECCount >= 1 && data.DECount >= 2) return true;
                if (data.TVCount >= 1 && data.DECount >= 2) return true;
            }
            return false;
        }
    },
    id_103: {
        shipNum: 5,
        flgShipLv: 40,
        shipLvSum: 200,
        taisen: 200,
        karyoku: 300,
        exp: 45,
        fuel: 80,
        ammo: 120,
        bauxite: 100,
        greatSuccess: 'flagshipLv',
        shipTypeText: "軽1 (駆+海)4 等",
        shipType: function (data) {
            if (data.shipCount >= 5) {
                if (data.CLCount >= 1 && (data.DDCount + data.DECount) >= 4) return true;
                if (data.DDCount >= 1 && data.DECount >= 3) return true;
                if (data.ECCount >= 1 && data.DDCount >= 2) return true;
                if (data.ECCount >= 1 && data.DECount >= 2) return true;
                if (data.TVCount >= 1 && data.DECount >= 2) return true;
            }
            return false;
        }
    },
    id_104: {
        shipNum: 5,
        flgShipLv: 45,
        shipLvSum: 260, //?
        exp: 55,
        karyoku: 280,
        taiku: 274,     //?
        taisen: 240,
        sakuteki: 150,
        ammo: 300,
        bauxite: 100,
        greatSuccess: 'flagshipLv',
        shipTypeText: "軽1 駆3 他1? 等",   //?
        shipType: function (data) {
            if (data.shipCount >= 5) {
                if (data.CLCount >= 1 && data.DDCount >= 3) return true;
                if (data.DDCount >= 1 && data.DECount >= 3) return true;
                if (data.ECCount >= 1 && data.DDCount >= 2) return true;
                if (data.CLCount >= 1 && data.DECount >= 2) return true;
            }
            return false;
        }
    },
    id_105: {
        shipNum: 6,
        flgShipLv: 55,
        shipLvSum: 353,   //?
        exp: 90,
        karyoku: 330,
        taiku: 314,     //?
        taisen: 270,
        sakuteki: 180,  //?
        fuel: 100,
        ammo: 500,
        steel: 100,
        greatSuccess: 'flagshipLv',
        shipTypeText: "軽1 駆3 他2? 等",   //?
        shipType: function (data) {
            if (data.shipCount >= 6) {
                if (data.CLCount >= 1 && data.DDCount >= 3) return true;
                if (data.DDCount >= 1 && data.DECount >= 3) return true;
                if (data.ECCount >= 1 && data.DDCount >= 2) return true;
                if (data.TVCount >= 1 && data.DECount >= 2) return true;
                if (data.CLCount >= 1 && data.DECount >= 2) return true;
            }
            return false;
        }
    },
    /* 南西諸島海域 */
    id_9: {
        shipNum :4,
        flgShipLv: 3,
        exp: 60,
        fuel: 350,
        shipTypeText: "軽1 (駆+海)2 他1 等",
        shipType: function (data) {
            if (data.shipCount >= 4) {
                if (data.CLCount >= 1 && (data.DDCount + data.DECount) >= 2) return true;
                if (data.DDCount >= 1 && data.DECount >= 3) return true;
                if (data.ECCount >= 1 && data.DDCount >= 2) return true;
                if (data.ECCount >= 1 && data.DECount >= 2) return true;
                if (data.TVCount >= 1 && data.DECount >= 2) return true;
            }
            return false;
        }
    },
    id_10: {
        shipNum: 3,
        flgShipLv: 3,
        exp: 40,
        ammo: 50,
        bauxite: 40,
        shipTypeText: "軽2 他1",
        shipType: function (data) {
            if (data.shipCount >= 3) {
                if (data.CLCount >= 2) return true;
            }
            return false;
        }
    },
    id_11: {
        shipNum: 4,
        flgShipLv: 6,
        exp: 40,
        bauxite: 250,
        shipTypeText: "(駆+海)2 他2",
        shipType: function (data) {
            if (data.shipCount >= 4) {
                if ((data.DDCount + data.DECount) >= 2) return true;
            }
            return false;
        }
    },
    id_12: {
        shipNum: 4,
        flgShipLv: 4,
        exp: 60,
        fuel: 50,
        ammo: 250,
        steel: 200,
        bauxite: 50,
        shipTypeText: "(駆+海)2 他2",
        shipType: function (data) {
            if (data.shipCount >= 4) {
                if ((data.DDCount + data.DECount) >= 2) return true;
            }
            return false;
        }
    },
    id_13: {
        shipNum: 6,
        flgShipLv: 5,
        exp: 70,
        fuel: 240,
        ammo: 300,
        shipTypeText: "軽1 駆4 他1",
        shipType: function (data) {
            if (data.shipCount >= 6) {
                if (data.CLCount >= 1 && data.DDCount >= 4) return true;
            }
            return false;
        }
    },
    id_14: {
        shipNum: 6,
        flgShipLv: 6,
        exp: 90,
        ammo: 280,
        steel: 200,
        bauxite: 30,
        shipTypeText: "軽1 駆3 他2",
        shipType: function (data) {
            if (data.shipCount >= 6) {
                if (data.CLCount >= 1 && data.DDCount >= 3) return true;
            }
            return false;
        }
    },
    id_15: {
        shipNum: 6,
        flgShipLv: 8,
        exp: 100,
        steel: 300,
        bauxite: 400,
        shipTypeText: "空母(水母,護母可)2 駆2 他2",
        shipType: function (data) {
            if (data.shipCount >= 6) {
                if ((data.CVCount + data.CVLCount + data.ECCount + data.AVCount + data.ACVCount) >= 2 && data.DDCount >= 2) return true;
            }
            return false;
        }
    },
    id_16: {
        shipNum: 6,
        flgShipLv: 10,
        exp: 120,
        fuel: 500,
        ammo: 500,
        steel: 200,
        bauxite: 200,
        shipTypeText: "軽1 駆2 他3",
        shipType: function (data) {
            if (data.shipCount >= 6) {
                if (data.CLCount >= 1 && data.DDCount >= 2) return true;
            }
            return false;
        }
    },
    id_110: {
        shipNum: 6,
        flgShipLv: 40,
        shipLvSum: 150,
        taisen: 200,
        disableTaisen: true,
        taiku: 200,
        sakuteki: 140,
        exp: 35,
        steel: 20,
        bauxite: 30,
        shipTypeText: "水母1 軽1 (駆+海)2 他2",
        shipType: function (data) {
            if (data.shipCount >= 6) {
                if (data.AVCount >= 1 && data.CLCount >= 1 && (data.DDCount + data.DECount) >= 2) return true;
            }
            return false;
        }
    },
    id_111: {
        shipNum: 6,
        flagShipLv: 45,
        shipLvSum: 220,
        karyoku: 360,
        exp: 70,
        fuel: 300,
        ammo: 200,
        steel: 100,
        shipTypeText: "重1 軽1 駆3 他1",
        shipType: function (data) {
            if (data.shipCount >= 6) {
                if (data.CACount >= 1 && data.CLCount >= 1 && data.DDCount >= 3) return true;
            }
            return false;
        }
    },
    id_112: {
        shipNum: 6,
        flagShipLv: 50,
        shipLvSum: 260,
        karyoku: 400,
        exp: 50,
        ammo: 100,
        steel: 100,
        bauxite: 180,
        greatSuccess: 'flagshipLv',
        shipTypeText: "水母1 軽1 (駆+海)4",
        shipType: function (data) {
            if (data.AVCount >= 1 && data.CLCount >= 1 && (data.DDCount + data.DECount) >= 4) return true;
            return false;
        }
    },
    id_113: {
        shipNum: 6,
        flagShipLv: 55,
        shipLvSum: 300,
        karyoku: 500,
        taisen: 280,
        exp: 60,
        steel: 1200,
        bauxite: 650,
        greatSuccess: 'flagshipLv',
        shipTypeText: "重2 軽1 駆2 潜1",
        shipType: function (data) {
            if (data.CACount >= 2 && data.CLCount >= 1 && data.DDCount >= 2 && (data.SSCount + data.CVSCount) >= 1) return true;
            return false;
        }
    },
    id_114: {
        shipNum: 6,
        flagShipLv: 60,
        shipLvSum: 346, //?
        exp: 100,
        karyoku: 510,
        taiku: 400,
        taisen: 285,
        sakuteki: 385,
        fuel: 600,
        ammo: 600,
        steel:1200,
        bauxite: 900,
        greatSuccess: 'flagshipLv',
        shipTypeText: "水母1 軽1 駆2 他2?",  //?
        shipType: function (data) {
            if (data.shipCount == 6) {
                if (data.AVCount >= 1 && data.CLCount >= 1 && data.DDCount >= 2) return true;
            }
            return false;
        }
    },
    /* 北方海域 */
    id_17: {
        shipNum: 6,
        flgShipLv: 20,
        exp: 30,
        fuel: 70,
        ammo: 70,
        steel: 50,
        shipTypeText: "軽1 駆3 他2",
        shipType: function (data) {
            if (data.shipCount == 6) {
                if (data.CLCount >= 1 && data.DDCount >= 3) return true;
            }
            return false;
        }
    },
    id_18: {
        shipNum: 6,
        flgShipLv: 15,
        exp: 60,
        steel: 300,
        bauxite: 150,
        shipTypeText: "空母(水母,護母可)3 駆2 他1",
        shipType: function (data) {
            if (data.shipCount == 6) {
                if ((data.CVCount + data.CVLCount + data.ECCount + data.AVCount + data.ACVCount) >= 3 && data.DDCount >= 2) return true;
            }
            return false;
        }
    },
    id_19: {
        shipNum: 6,
        flgShipLv: 20,
        exp: 60,
        fuel: 400,
        steel: 50,
        bauxite: 30,
        shipTypeText: "航戦2 駆2 他2",
        shipType: function (data) {
            if (data.shipCount == 6) {
                if (data.CVBCount >= 2 && data.DDCount >= 2) return true;
            }
            return false;
        }
    },
    id_20: {
        shipNum: 2,
        flgShipLv: 1,
        exp: 40,
        steel: 150,
        shipTypeText: "潜1 軽1",
        shipType: function (data) {
            if ((data.SSCount + data.CVSCount) >= 1 && data.CLCount >= 1) return true;
            return false;
        }
    },
    id_21: {
        shipNum: 5,
        flgShipLv: 15,
        shipLvSum: 30,
        drumNum: 3,
        drumNum2: 4,
        drumShipNum: 3,
        exp: 45,
        fuel: 320,
        ammo: 270,
        greatSuccess: 'drum',
        shipTypeText: "軽1 駆4",
        shipType: function (data) {
            if (data.CLCount >= 1 && data.DDCount >= 4) return true;
            return false;
        },
    },
    id_22: {
        shipNum: 6,
        flgShipLv: 30,
        shipLvSum: 45,
        exp: 45,
        ammo: 10,
        shipTypeText: "重1 軽1 駆2 他2",
        shipType: function (data) {
            if (data.shipCount == 6) {
                if (data.CACount >= 1 && data.CLCount >= 1 && data.DDCount >= 2) return true;
            }
            return false;
        }
    },
    id_23: {
        shipNum: 6,
        flgShipLv: 50,
        shipLvSum: 200,
        exp: 70,
        ammo: 50,
        bauxite: 130,
        shipTypeText: "航戦2 駆2 他2",
        shipType: function (data) {
            if (data.shipCount == 6) {
                if (data.CVBCount >= 2 && data.DDCount >= 2) return true;
            }
            return false;
        }
    },
    id_24: {
        shipNum: 6,
        flgShipLv: 50,
        shipLvSum: 200,
        exp: 65,
        fuel: 500,
        bauxite: 150,
        flgShipType: 3,
        drumNum2: 4,
        greatSuccess: 'drum',
        shipTypeText: "★軽1 (駆+海)4 他1",
        shipType: function (data) {
            if (data.shipCount == 6) {
                if (data.CLCount >= 1 && (data.DDCount + data.DECount) >= 4) return true;
            }
            return false;
        },
    },
    /* 西方海域 */
    id_25: {
        shipNum: 4,
        flgShipLv: 25,
        exp: 80,
        fuel: 900,
        steel: 500,
        shipTypeText: "重2 駆2",
        shipType: function (data) {
            if (data.CACount >= 2 && data.DDCount >= 2) return true;
            return false;
        }
    },
    id_26: {
        shipNum: 4,
        flgShipLv: 30,
        exp: 150,
        bauxite: 900,
        shipTypeText: "空母(水母,護母可)1 軽1 駆2",
        shipType: function (data) {
            if ((data.CVCount + data.CVLCount + data.ECCount + data.AVCount + data.ACVCount) >= 1 && data.CLCount >= 1 && data.DDCount >= 2) return true;
            return false;
        }
    },
    id_27: {
        shipNum: 2,
        flgShipLv: 1,
        exp: 80,
        steel: 800,
        shipTypeText: "潜2",
        shipType: function (data) {
            if ((data.SSCount + data.CVSCount) >= 2) return true;
            return false;
        }
    },
    id_28: {
        shipNum: 3,
        flgShipLv: 30,
        exp: 100,
        steel: 900,
        bauxite: 350,
        shipTypeText: "潜3",
        shipType: function (data) {
            if ((data.SSCount + data.CVSCount) >= 3) return true;
            return false;
        }
    },
    id_29: {
        shipNum: 3,
        flgShipLv: 50,
        exp: 100,
        bauxite: 100,
        shipTypeText: "潜3",
        shipType: function (data) {
            if ((data.SSCount + data.CVSCount) >= 3) return true;
            return false;
        }
    },
    id_30: {
        shipNum: 4,
        flgShipLv: 55,
        exp: 100,
        ammo: 50,
        bauxite: 100,
        shipTypeText: "潜4",
        shipType: function (data) {
            if ((data.SSCount + data.CVSCount) >= 4) return true;
            return false;
        }
    },
    id_31: {
        shipNum: 4,
        flgShipLv: 60,
        shipLvSum: 200,
        exp: 50,
        ammo: 30,
        shipTypeText: "潜4",
        shipType: function (data) {
            if ((data.SSCount + data.CVSCount) >= 4) return true;
            return false;
        }
    },
    id_32: {
        shipNum: 3,
        flgShipLv: 5,
        exp: 300,
        fuel:50,
        ammo: 50,
        steel: 50,
        bauxite: 50,
        flgShipType: 21,
        greatSuccess: 'flagshipLv', //?
        shipTypeText: "★練巡1 駆2",
        shipType: function (data) {
            if (data.TVCount >= 1 && data.DDCount >= 2) return true;
            return false;
        }
    },
    id_131: {
        shipNum: 5,
        flgShipLv: 50,
        shipLvSum: 200,
        exp: 35,
        taiku: 240,
        taisen: 240,
        sakuteki: 300,
        ammo: 20,
        steel: 20,
        bauxite: 100,
        flgShipType: 16,
        greatSuccess: 'flagshipLv',
        shipTypeText: "★水母1 (駆+海)3 他1",
        shipType: function (data) {
            if (data.shipCount >= 5 && data.AVCount >= 1 && (data.DDCount + data.DECount) >= 3) return true;
            return false;
        }
    },
    id_132: {
        shipNum: 5,
        flgShipLv: 55,
        shipLvSum: 270,
        exp: 70,
        taisen: 50,
        taiku: 80,
        karyoku: 60,
        steel: 400,
        bauxite: 800,
        flgShipType: 20,
        greatSuccess: 'flagshipLv',
        shipTypeText: "★潜母1 潜3 (軽+駆+海)1",
        shipType: function (data) {
            if (data.ASCount >= 1 && (data.SSCount + data.CVSCount) >= 3 && (data.CLCount + data.DDCount + data.DECount) >= 1) return true;
            return false;
        }
    },
    /* 南方海域 */
    id_33: {
        shipNum: 2,
        shipTypeText: "駆2",
        shipType: function (data) {
            if (data.DDCount >= 2) return true;
            return false;
        }
    },
    id_34: {
        shipNum: 2,
        shipTypeText: "駆2",
        shipType: function (data) {
            if (data.DDCount >= 2) return true;
            return false;
        }
    },
    id_35: {
        shipNum: 6,
        flgShipLv: 40,
        exp: 100,
        steel: 240,
        bauxite: 280,
        shipTypeText: "空母(水母,護母可)2 重1 駆1 他2",
        shipType: function (data) {
            if (data.shipCount == 6) {
                if ((data.CVCount + data.CVLCount + data.ECCount + data.AVCount + data.ACVCount) >= 2
                    && data.CACount >= 1 && data.DDCount >= 1) return true;
            }
            return false;
        }
    },
    id_36: {
        shipNum: 6,
        flgShipLv: 30,
        exp: 100,
        fuel: 480,
        steel: 200,
        bauxite: 200,
        shipTypeText: "水母2 軽1 駆1 他2",
        shipType: function (data) {
            if (data.shipCount == 6) {
                if (data.AVCount >= 2 && data.CLCount >= 1 && data.DDCount >= 1) return true;
            }
            return false;
        }
    },
    id_37: {
        shipNum: 6,
        flgShipLv: 50,
        shipLvSum: 200,
        drumShipNum: 3,
        drumNum: 4,
        drumNum2: 5,
        exp: 50,
        ammo: 380,
        steel: 270,
        greatSuccess: 'drum',
        shipTypeText: "軽1 駆5",
        shipType: function (data) {
            if (data.CLCount >= 1 && data.DDCount >= 5) return true;
            return false;
        },
    },
    id_38: {
        shipNum: 6,
        flgShipLv: 65,
        shipLvSum: 240,
        drumShipNum: 4,
        drumNum: 8,
        drumNum2: 10,
        exp: 50,
        fuel:420,
        steel: 200,
        greatSuccess: 'drum',
        shipTypeText: "駆5 他1",
        shipType: function (data) {
            if (data.shipCount == 6) {
                if (data.DDCount >= 5) return true;
            }
            return false;
        },
    },
    id_39: {
        shipNum: 5,
        flgShipLv: 3,
        shipLvSum: 180,
        exp: 130,
        steel: 300,
        shipTypeText: "潜母1 潜4",
        shipType: function (data) {
            if (data.ASCount >= 1 && (data.SSCount + data.CVSCount) >= 4) return true;
            return false;
        }
    },
    id_40: {
        shipNum: 6,
        flgShipLv: 25,
        shipLvSum: 150,
        exp: 60,
        fuel:300,
        ammo: 300,
        bauxite: 100,
        flgShipType: 3,
        drumNum2: 4,
        greatSuccess: 'drum',
        shipTypeText: "★軽1 水母2 駆2 他1",
        shipType: function (data) {
            if (data.shipCount == 6) {
                if (data.CLCount >= 1 && data.AVCount >= 1 && data.DDCount >= 2) return true;
            }
            return false;
        },
    },
    id_141: {
        shipNum: 6,
        flgShipLv: 55,
        shipLvSum: 299,   //?
        exp: 100,
        karyoku: 450,
        taiku: 350,
        taisen: 330,
        sakuteki: 250,
        ammo: 600,
        steel: 600,
        bauxite: 1000,
        flgShipType: 5,
        greatSuccess: 'flagshipLv',
        shipTypeText: "★重1 軽1 駆3 他1",
        shipType: function (data) {
            if (data.shipCount == 6) {
                if (data.CACount >= 1 && data.CLCount >= 1 && data.DDCount >= 3) return true;
            }
            return false;
        },
    },
    /* 南西海域 */
    id_41: {
        shipNum: 3,
        flgShipLv: 30,
        shipLvSum: 100,
        exp: 30,
        karyoku: 60,
        taiku:80,
        taisen: 210,
        fuel:100,
        bauxite: 20,
        greatSuccess: 'flagshipLv',
        shipTypeText: "(駆+海)3",
        shipType: function (data) {
            if ((data.DDCount + data.DECount) >= 3) return true;
            return false;
        }
    },
    id_42: {
        shipNum: 4,
        flgShipLv: 45,
        shipLvSum: 200,
        exp: 60,
        fuel: 800,
        bauxite: 200,
        shipTypeText: "軽1 駆2 他1",
        shipType: function (data) {
            if (data.shipCount >= 4) {
                if (data.CLCount >= 1 && data.DDCount >= 2) return true;
            }
            return false;
        }
    },
    id_43: {
        shipNum: 6,
        flgShipLv: 55,
        shipLvSum: 300,
        exp: 75,
        karyoku: 500,
        taisen: 280,
        fuel: 2000,
        bauxite: 400,
        greatSuccess: 'flagshipLv',
        flgShipType: 7, //軽空
        shipTypeText: "★護母1 (駆+海)2 他3 / ★軽空1 軽1 駆4",
        shipType: function (data) {
            if (data.flgShipEC) {
                if (data.shipCount == 6) {
                    if (data.ECCount >= 1 && (data.DDCount + data.DECount) >= 2) return true;
                }
            }
            if (data.CVLCount == 1 && data.CLCount == 1 && data.DDCount == 4) return true;
            return false;
        }
    },
    id_44: {
        shipNum: 6,
        flgShipLv: 35,
        shipLvSum: 210,
        exp: 45,
        drumShipNum: 3,
        drumNum: 6,
        drumNum2: 8,
        taisen: 200,
        ammo: 200,
        bauxite: 800,
        greatSuccess: 'drum',
        shipTypeText: "空母2 水母1 軽1 駆2",
        shipType: function (data) {
            if ((data.CVCount + data.CVLCount + data.ECCount + data.ACVCount) == 2
                && data.AVCount == 1 && data.CLCount == 1 && data.DDCount == 2) return true;
            return false;
        }
    },
    id_45: {
        shipNum: 5,
        flgShipLv: 50,
        shipLvSum: 240,
        exp: 35,
        taiku: 240,
        taisen: 300,
        sakuteki: 180,
        fuel: 40,
        bauxite: 220,
        greatSuccess: 'flagshipLv',
        shipTypeText: "★軽空1 (駆+海)4",
        shipType: function (data) {
            if (data.CVLCount >= 1 && (data.DDCount + data.DECount) >= 4) return true;
            return false;
        }
    }
};


var missionData = (function(missions, defaultData) {
    var missionKeys = Object.keys(missions);
    var params = Object.keys(defaultData)
    return missionKeys.reduce(function(prev, key) {
        prev[key] = {}

        params.forEach(function(param) {
            if (missions[key][param] === undefined) {
                prev[key][param] = defaultData[param]
            } else {
                prev[key][param] = missions[key][param]
            }
        })

        return prev;
    }, {})
})(_missionData, defaultMissionData)
