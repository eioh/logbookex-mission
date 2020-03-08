/**
id_<num>: {
    shipNum:    {Number}    // 隻数
    flgShipLv:  {Number}    // 旗艦レベル
    shipLvSum:  {Number}    // 艦隊合計レベル
    flgShipType {String}    // 旗艦艦種
    drumShipNum {Number}    // ドラム缶搭載艦数
    drumNum     {Number}    // ドラム缶数
    taisen      {Number}    // 対潜値合計
    taiku       {Number}    // 対空値合計
    sakuteki    {Number}    // 索敵値合計
    karyoku     {Number}    // 火力値合計
    exp: // 提督経験値
    resource: [
        fuel    // 燃料
        ammo    // 弾薬
        steel   // 鋼材
        bauxite // ボーキ
    ]

}
 */

/**
"海防艦"
"駆逐艦"
"軽巡洋艦"
"重雷装巡洋艦"
"重巡洋艦"
"航空巡洋艦"
"軽空母"
"戦艦"
"航空戦艦"
"正規空母"
"潜水艦"
"潜水空母"
"水上機母艦"
"揚陸艦"
"装甲空母"
"工作艦"
"潜水母艦"
"練習巡洋艦"
"補給艦"
 */

var missionData = {
    /* 鎮守府海域 */
    id_1: {
        shipNum: 2,
        flgShipLv: 1,
        exp: 10,
        resource: {
            ammo: 30
        },
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
        resource: {
			ammo: 100,
            steel: 30,
            bucket: [0, 1]
		},
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
        resource: {
			fuel: 30,
			ammo: 30,
			steel: 40,
		},
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
        resource: {
			ammo: 70,
            bucket: [0, 1],
            fBoxS: [0, 1]
		},
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
        resource: {
			fuel: 200,
			ammo: 200,
			steel: 20,
			bauxite: 20
		},
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
        resource: {
            bauxite: 80,
            fBoxS: [0, 1]
        },
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
        resource: {
            steel: 50,
            bauxite: 30,
            burner: [0, 1]
        },
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
        resource: {
            fuel: 50,
            ammo: 100,
            steel: 50,
            bauxite: 50,
            burner: [0, 2],
            dev: [0, 1]
        },
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
        resource: {
			fuel: 45,
			ammo: 45,
		},
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
        resource: {
			fuel: 70,
			ammo: 40,
            bauxite: 10,
            dev: [0, 1],
            bucket: [0, 1]
		},
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
        resource: {
			fuel: 120,
			steel: 60,
            bauxite: 60,
            bucket: [0, 1],
            dev: [0, 2]
		},
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
        resource: {
            fuel: 80,
            ammo: 120,
            bauxite: 100,
            bucket: [0, 2],
            burner: [0, 2]
        },
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
    /* 南西諸島海域 */
    id_9: {
        shipNum :4,
        flgShipLv: 3,
        exp: 60,
        resource: {
            fuel: 350,
            fBoxS: [0, 1],
            bucket: [0, 2]
		},
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
        resource: {
			ammo: 50,
            bauxite: 40,
            bucket: [0, 1],
            burner: [0, 1]
		},
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
        resource: {
            bauxite: 250,
            fBoxS: [0, 1],
            bucket: [0, 1]
		},
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
        resource: {
			fuel: 50,
			ammo: 250,
			steel: 200,
            bauxite: 50,
            fBoxM: [0, 1],
            dev: [0, 1]
		},
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
        resource: {
			fuel: 240,
            ammo: 300,
            bucket: [0, 2],
             fBoxS: [0, 1]
		},
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
        resource: {
			ammo: 280,
			steel: 200,
            bauxite: 30,
            bucket: [0, 1],
            dev: [0, 1]
		},
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
        resource: {
			steel: 300,
            bauxite: 400,
            fBoxL: [0, 1],
            dev: [0, 1]
		},
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
        resource: {
			fuel: 500,
			ammo: 500,
			steel: 200,
            bauxite: 200,
            burner: [0, 2],
            dev: [0, 2]
		},
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
        resource: {
			steel: 20,
            bauxite: 30,
            fBoxS: [0, 1],
            bucket: [0, 1]
		},
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
        resource: {
			fuel: 300,
			ammo: 200,
            steel: 100,
            dev: [0, 2],
            bucket: [0, 2]
		},
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
        resource: {
            ammo: 100,
            steel: 100,
            bauxite: 180,
            fBoxL: [0, 1],
            bucket: [0, 2]
        },
        shipTypeText: "水母1 軽1 (駆+海)4",
        shipType: function (data) {
            if (data.AVCount >= 1 && data.CLCount >= 1 && (data.DDCount + data.DECount) >= 4) return true;
            return false;
        }
    },
    id_113: {
        shipNum: 6,
        flagShipLv: 55,
        shipLvSum: 410, //?
        karyoku: 500,
        taisen: 280,
        exp: 60,
        resource: {
            steel: 1200,
            bauxite: 650,
            dev: [0, 4],
            screw: [0, 1]
        },
        shipTypeText: "重2 軽1 駆2 潜1",
        shipType: function (data) {
            if (data.CACount >= 2 && data.CLCount >= 1 && data.DDCount >= 2 && (data.SSCount + data.CVSCount) >= 1) return true;
            return false;
        }
    },
    /* 北方海域 */
    id_17: {
        shipNum: 6,
        flgShipLv: 20,
        exp: 30,
        resource: {
			fuel: 70,
			ammo: 70,
			steel: 50,
		},
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
        resource: {
			steel: 300,
            bauxite: 150,
            bucket: [0, 1]
		},
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
        resource: {
			fuel: 400,
			steel: 50,
            bauxite: 30,
            fBoxS: [0, 1],
            dev: [0, 1]
		},
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
        resource: {
            steel: 150,
            dev: [0, 1],
            fBoxM: [0, 1]
		},
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
        drumShipNum: 3,
        exp: 45,
        resource: {
			fuel: 320,
            ammo: 270,
            fBoxS: [0, 1]
		},
        shipTypeText: "軽1 駆4",
        shipType: function (data) {
            if (data.CLCount >= 1 && data.DDCount >= 4) return true;
            return false;
        },
        greatSuccess: function(data) {  //大成功条件
            if (data.kiraShipNum >= 4 && data.drumCount >= 4) return true;
            return false;
        }
    },
    id_22: {
        shipNum: 6,
        flgShipLv: 30,
        shipLvSum: 45,
        exp: 45,
        resource: {
			ammo: 10,
		},
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
        resource: {
			ammo: 50,
			bauxite: 130
		},
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
        resource: {
			fuel: 500,
            bauxite: 150,
            dev: [0, 2],
            burner: [0, 1]
		},
        flgShipType: 3,
        shipTypeText: "★軽1 (駆+海)4 他1",
        shipType: function (data) {
            if (data.shipCount == 6) {
                if (data.CLCount >= 1 && (data.DDCount + data.DECount) >= 4) return true;
            }
            return false;
        },
        greatSuccess: function (data) {
            if (data.kiraShipNum >= 4 && data.drumCount >= 4) return true;
            return false;
        }
    },
    /* 西方海域 */
    id_25: {
        shipNum: 4,
        flgShipLv: 25,
        exp: 80,
        resource: {
			fuel: 900,
            steel: 500,
            fBoxM: [0, 1]
		},
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
        resource: {
            bauxite: 900,
            bucket: [0, 3],
            fBoxL: [0, 1]
		},
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
        resource: {
            steel: 800,
            dev: [0, 2],
            fBoxS: [0, 2]
		},
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
        resource: {
			steel: 900,
            bauxite: 350,
            dev: [0, 3],
            fBoxM: [0, 2]
		},
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
        resource: {
            bauxite: 100,
            dev: [0, 1],
            fBoxS: [0, 1]
		},
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
        resource: {
			ammo: 50,
            bauxite: 100,
            dev: [0, 3],
            fBoxL: [0, 1]
		},
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
        resource: {
            ammo: 30,
            fBoxS: [0, 1]
		},
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
        resource: {
			fuel:50,
			ammo: 50,
			steel: 50,
            bauxite: 50,
            fBoxL: [0, 1],
            dev: [0, 3]
		},
        flgShipType: 21,
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
        resource: {
            ammo: 20,
            steel: 20,
            bauxite: 100,
            bucket: [0, 1]
        },
        shipTypeText: "★水母1 (駆+海)3 他1",
        shipType: function (data) {
            if (data.shipCount >= 5 && data.AVCount >= 1 && (data.DDCount + data.DECount) >= 3) return true;
            return false;
        }
    },
    id_132: {
        shipNum: 5,
        flgShipLv: 55,
        // shipLvSum: 0,   //?
        exp: 70,
        taisen: 53, //?
        resource: {
            steel: 400,
            bauxite: 800,
            fBoxL: [0, 1],
            irako: [0, 1]
        },
        shipTypeText: "★潜母1 潜3 (軽+駆+海)1",
        shipType: function (data) {
            if (data.ASCount >= 1 && (data.SSCount + data.CVSCount) >= 3 && (data.CLCount + data.DDCount + data.DECount) >= 1) return true;
            return false;
        }
    },
    /* 南方海域 */
    id_33: {
        shipNum: 2,
        resource: {},
        shipTypeText: "駆2",
        shipType: function (data) {
            if (data.DDCount >= 2) return true;
            return false;
        }
    },
    id_34: {
        shipNum: 2,
        resource: {},
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
        resource: {
			steel: 240,
            bauxite: 280,
            fBoxS: [0, 2],
            dev: [0, 1]
		},
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
        resource: {
			fuel:480,
			steel: 200,
            bauxite: 200,
            fBoxM: [0, 2],
            bucket: [0, 1]
		},
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
        exp: 50,
        resource: {
			ammo: 380,
            steel: 270,
            fBoxS: [0, 1]
		},
        shipTypeText: "軽1 駆5",
        shipType: function (data) {
            if (data.CLCount >= 1 && data.DDCount >= 5) return true;
            return false;
        },
        greatSuccess: function (data) {
            if (data.kiraShipNum >= 4 && data.drumCount >= 5) return true;
            return false;
        }
    },
    id_38: {
        shipNum: 6,
        flgShipLv: 65,
        shipLvSum: 240,
        drumShipNum: 4,
        drumNum: 8,
        exp: 50,
        resource: {
			fuel:420,
            steel: 200,
            fBoxS: [0, 1]
		},
        shipTypeText: "駆5 他1",
        shipType: function (data) {
            if (data.shipCount == 6) {
                if (data.DDCount >= 5) return true;
            }
            return false;
        },
        greatSuccess: function (data) {
            if (data.kiraShipNum >= 4 && data.drumCount >= 10) return true;
            return false;
        }
    },
    id_39: {
        shipNum: 5,
        flgShipLv: 3,
        shipLvSum: 180,
        exp: 130,
        resource: {
            steel: 300,
            bucket: [0, 2],
            fBoxM: [0, 1]
		},
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
        resource: {
			fuel:300,
			ammo: 300,
            bauxite: 100,
            fBoxS: [0, 3],
            bucket: [0, 1]
		},
        flgShipType: 3,
        shipTypeText: "★軽1 水母2 駆2 他1",
        shipType: function (data) {
            if (data.shipCount == 6) {
                if (data.CLCount >= 1 && data.AVCount >= 1 && data.DDCount >= 2) return true;
            }
            return false;
        },
        greatSuccess: function (data) {
            if (data.kiraShipNum >= 4 && data.drumCount >= 4) return true;
            return false;
        }
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
        resource: {
			fuel:100,
            bauxite: 20,
            dev: [0, 1],
            bucket: [0, 1]
		},
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
        resource: {
            fuel: 800,
            bauxite: 200,
            fBoxL: [0, 1],
            burner: [0, 3]
        },
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
        shipLvSum: 301, //?
        exp: 75,
        karyoku: 500,
        taisen: 280,
        resource: {
            fuel: 2000,
            bauxite: 400,
            dev: [0, 4],
            screw: [0, 1]
        },
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
        taisen: 200,
        resource: {
            ammo: 200,
            bauxite: 800,
            dev: [0, 4],
            fBoxL: [0, 2]
        },
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
        resource: {
            fuel: 40,
            bauxite: 220,
            fBoxM: [0, 1]
        },
        shipTypeText: "★軽空1 (駆+海)4",
        shipType: function (data) {
            if (data.CVLCount >= 1 && (data.DDCount + data.DECount) >= 4) return true;
            return false;
        }
    }
};


