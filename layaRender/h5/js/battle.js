var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var zt;
(function (zt) {
    var battle;
    (function (battle_1) {
        var Loader = Laya.Loader;
        var Rectangle = Laya.Rectangle;
        var UIPackage = fairygui.UIPackage;
        var getUIURL = zt.utils.getUIURL;
        var battle = (function (_super) {
            __extends(battle, _super);
            function battle() {
                return _super.call(this, app.AppLevel.LEVEL_0) || this;
            }
            battle.prototype.init = function () {
                UIPackage.addPackage(getUIURL('battle'));
                this._ui = UIPackage.createObject('battle', 'main');
                this.addChild(this._ui.displayObject);
                this._view = this.superRegisterView(new battle_1.View(this._ui));
                this.superRegisterModel(new battle_1.Model(this._params));
                this.superRegisterController(new battle_1.Controller(this));
                this._adaptionType = AdaptationType.ADAPT_FULL_SCREEN;
            };
            battle.prototype.getAppBounds = function () {
                return new Rectangle(0, 0, Laya.stage.width, Laya.stage.height);
            };
            Object.defineProperty(battle.prototype, "res", {
                get: function () {
                    return [
                        { url: getUIURL('battle@atlas0.png'), type: Loader.IMAGE },
                        { url: getUIURL('battle.fui'), type: Loader.BUFFER },
                        { url: zt.utils.getResourceURL('fight/attack/0.json'), type: Loader.ATLAS },
                        { url: zt.utils.getResourceURL('fight/attack/1.json'), type: Loader.ATLAS },
                        { url: zt.utils.getResourceURL('fight/attack/2.json'), type: Loader.ATLAS },
                        { url: zt.utils.getResourceURL('fight/attack/skill.json'), type: Loader.ATLAS },
                        { url: zt.utils.getResourceURL('fight/icon/battleBuff.json'), type: Loader.ATLAS },
                        { url: zt.utils.getResourceURL('fight/icon/battleBuffText.json'), type: Loader.ATLAS },
                        { url: zt.utils.getResourceURL('fight/icon/skill80.json'), type: Loader.ATLAS },
                        { url: zt.utils.getResourceURL('fight/damage/damageNum.json'), type: Loader.ATLAS }
                    ];
                },
                enumerable: true,
                configurable: true
            });
            battle.prototype.resize = function () {
                _super.prototype.resize.call(this);
                this._view.resize();
            };
            battle.prototype.dispose = function () {
                _super.prototype.dispose.call(this);
                this._ui = null;
            };
            return battle;
        }(app.AppBase));
        battle_1.battle = battle;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var DamageNumsType;
        (function (DamageNumsType) {
            DamageNumsType[DamageNumsType["SHIELD"] = 0] = "SHIELD";
            DamageNumsType[DamageNumsType["DAMAGE"] = 1] = "DAMAGE";
            DamageNumsType[DamageNumsType["CRIT"] = 2] = "CRIT";
        })(DamageNumsType = battle.DamageNumsType || (battle.DamageNumsType = {}));
        var ObjectType;
        (function (ObjectType) {
            ObjectType["Role"] = "Role";
            ObjectType["Fleet"] = "Fleet";
            ObjectType["Ship"] = "Ship";
            ObjectType["Lair"] = "Lair";
            ObjectType["MobFleet"] = "MobFleet";
            ObjectType["Mob"] = "Mob";
        })(ObjectType = battle.ObjectType || (battle.ObjectType = {}));
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var ActController = (function () {
            function ActController(view, model) {
                this._view = view;
                this._model = model;
            }
            ActController.prototype.dispose = function () {
                battle.ActTurn.dispose();
            };
            ActController.prototype.update = function (data) {
                var act;
                if (data.Act == 'Turn') {
                    act = battle.ActTurn.ins;
                }
                else {
                    var cls = getDefinition("zt.battle.Act" + data.Act);
                    if (!cls) {
                        console.log("zt.battle.Act" + data.Act + "\u672A\u5B9A\u4E49");
                        return;
                    }
                    act = new cls();
                }
                act.model = this._model;
                act.mainView = this._view.ui.displayObject;
                act.container = this._view.container;
                act.attackerView = this._view.attacker;
                act.defenderView = this._view.defender;
                act.attacker = this._view.attacker.army;
                act.defender = this._view.defender.army;
                act.ActVar = data.ActVar;
                act.Crit = data['Crit'] || 0;
                act.to = data.To;
                if (data.Act == "Attack" || data.Act == "Skill") {
                    if (battle.ActTurn.ins && act.ActVar > 0) {
                        battle.ActTurn.ins.to = data.From;
                        battle.ActTurn.ins.play(data.Act);
                    }
                    var self_1 = this;
                    Laya.timer.once(600, this, function () {
                        self_1._view.attacker.shakeShip(data.To, data.Act, data.FactionID);
                    });
                }
                if (data.From) {
                    var fromView = data.From.Type == 1 ? this._view.attacker : this._view.defender;
                    act.fromView = fromView;
                    act.fromSide = fromView.army.side;
                    act.fromArmy = fromView.army;
                    act.fromPos = data.From.Pos;
                    act.fromPoint = battle.getPos(fromView.army.side, data.From.Pos);
                }
                if (data.To) {
                    var toView = data.To[0].Type == 1 ? this._view.attacker : this._view.defender;
                    act.toView = toView;
                    act.toArmy = toView.army;
                    act.toSide = toView.army.side;
                }
                act.play("attack", data.FactionID);
            };
            return ActController;
        }());
        battle.ActController = ActController;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var MainControllerBase = (function () {
            function MainControllerBase(model, view) {
                this._model = model;
                this._view = view;
            }
            MainControllerBase.prototype.init = function () {
            };
            MainControllerBase.prototype.onBattleReady = function (data) {
                var result = this._model.updateArmy(data);
                if (this._model.isReJoin || 1)
                    this.checkEnterFleet(result, true);
            };
            MainControllerBase.prototype.onEnterFleet = function (data) {
                this.checkEnterFleet(this._model.updateArmy(data));
            };
            MainControllerBase.prototype.checkEnterFleet = function (result, isReJoin) {
                if (isReJoin === void 0) { isReJoin = false; }
                if (result.Attacker) {
                    this._view.attacker.setData(this._model.Attacker);
                    this._view.attacker.checkEnterFleet(isReJoin);
                }
                if (result.Defender) {
                    this._view.defender.setData(this._model.Defender);
                    this._view.defender.checkEnterFleet(isReJoin);
                }
                this._model.checkEnterFleet();
            };
            MainControllerBase.prototype.start = function () {
            };
            MainControllerBase.prototype.dispose = function () {
            };
            return MainControllerBase;
        }());
        battle.MainControllerBase = MainControllerBase;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var BattleTestController = (function (_super) {
            __extends(BattleTestController, _super);
            function BattleTestController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            BattleTestController.prototype.start = function () {
                this._data = this._model.replayData;
                this._time = this._data['Battle.ready']['_time'];
                this.onEnterFleet(this._data['Battle.ready']);
                this._updateList = this._data['updateDatas'].concat();
                this.playUpdateDatas();
            };
            BattleTestController.prototype.playUpdateDatas = function () {
                if (this._updateList.length == 0) {
                    this.playFinish(this._data['Battle.finish']);
                    return;
                }
                var data = this._updateList.shift();
                this.playUpdateData(data);
            };
            BattleTestController.prototype.playUpdateData = function (data) {
                var _this = this;
                var delay = data.Time - this._time;
                Laya.timer.once(delay, this, function () {
                    _this.playUpdateDatas();
                    _this.onBattleUpdate.runWith(data);
                });
            };
            BattleTestController.prototype.playFinish = function (data) {
            };
            BattleTestController.prototype.dispose = function () {
                _super.prototype.dispose.call(this);
            };
            return BattleTestController;
        }(battle.MainControllerBase));
        battle.BattleTestController = BattleTestController;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var UIController = zt.app.UIController;
        var Controller = (function (_super) {
            __extends(Controller, _super);
            function Controller(app) {
                return _super.call(this, app) || this;
            }
            Controller.prototype.init = function () {
                this._registerBattle = {};
                this._registerBattle[BattleMode.NORMAL] = battle.MainController;
                this._registerBattle[BattleMode.REPLAY] = battle.ReplayMainController;
                this._registerBattle[BattleMode.TEST] = battle.BattleTestController;
            };
            Controller.prototype.start = function () {
                this._view = getViewByModuleName(AppEnum.battle);
                var model = this.model;
                this._loading = new battle.LoadingController();
                this._actController = new battle.ActController(this._view, model);
                this._mainController = new this._registerBattle[model.mode](model, this._view);
                this._mainController.onBattleFinish = Laya.Handler.create(this, this.onBattleFinish);
                this._mainController.onBattleUpdate = Laya.Handler.create(this, this.onBattleUpdate, null, false);
                this._mainController.init();
                battle.FloatTool.init();
                this.startLoading();
                this.disposeLoading();
                this._mainController.start();
            };
            Controller.prototype.onCloseClick = function () {
                var model = this.model;
                if (model.mode == BattleMode.NORMAL) {
                    battle.leaveBattle(model.getParams());
                }
                if (model.getParams().Type == 'DailyInstance') {
                    App.load('dailyInstance');
                }
                if (model.getParams().Type == 'NormalInstance') {
                    App.load('normalInstance');
                }
                this.close();
            };
            Controller.prototype.dispose = function () {
                battle.FloatTool.dispose();
                this._mainController.dispose();
                this._actController.dispose();
            };
            Controller.prototype.onBattleFinish = function (data) {
                App.updateMask('#040f15', 0.95);
                App.load('battleResult', { onClose: Laya.Handler.create(this, this.onBattleResultClose), Content: data });
            };
            Controller.prototype.onBattleUpdate = function (data) {
                var _this = this;
                if (Array.isArray(data.Content.List))
                    data.Content.List.forEach(function (act) {
                        _this._actController.update(act);
                    });
            };
            Controller.prototype.onBattleResultClose = function () {
                this.close();
                App.resetMaskColor();
            };
            Controller.prototype.startLoading = function () {
                this._loading.start();
            };
            Controller.prototype.disposeLoading = function () {
                this._view.disposeLoading();
            };
            return Controller;
        }(UIController));
        battle.Controller = Controller;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var LoadingController = (function () {
            function LoadingController() {
            }
            LoadingController.prototype.start = function () {
            };
            LoadingController.prototype.loadShip = function () {
            };
            return LoadingController;
        }());
        battle.LoadingController = LoadingController;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var MainController = (function (_super) {
            __extends(MainController, _super);
            function MainController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MainController.prototype.start = function () {
                var _this = this;
                battle.battleReady(this._model.getParams(), Laya.Handler.create(this, function (data) { return _this.onBattleReady(data); }));
            };
            MainController.prototype.dispose = function () {
                _super.prototype.dispose.call(this);
                this.removeNetOn();
            };
            MainController.prototype.init = function () {
                this.initNetOn();
            };
            MainController.prototype.initNetOn = function () {
                net.on('Battle.enterFleet', this, this.onNetEnterFleet);
                net.on('Battle.update', this, this.onNetUpdate);
                net.on('Battle.error', this, this.onNetError);
                net.on('Battle.finish', this, this.onNetFinish);
            };
            MainController.prototype.removeNetOn = function () {
                net.off('Battle.enterFleet', this, this.onNetEnterFleet);
                net.off('Battle.update', this, this.onNetUpdate);
                net.off('Battle.error', this, this.onNetError);
                net.off('Battle.finish', this, this.onNetFinish);
            };
            MainController.prototype.onNetUpdate = function (data) {
                this.onBattleUpdate.runWith(data);
            };
            MainController.prototype.onNetError = function (data) {
            };
            MainController.prototype.onNetFinish = function (data) {
                this.onBattleFinish.runWith(data.Content);
            };
            MainController.prototype.onNetEnterFleet = function (data) {
                this.onEnterFleet(data.Content.List);
            };
            return MainController;
        }(battle.MainControllerBase));
        battle.MainController = MainController;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var ReplayMainController = (function (_super) {
            __extends(ReplayMainController, _super);
            function ReplayMainController() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ReplayMainController.prototype.start = function () {
                this._datas = this._model.replayData.split('\n');
                var tmp = [];
                for (var _i = 0, _a = this._datas; _i < _a.length; _i++) {
                    var e = _a[_i];
                    if (e !== '') {
                        tmp.push(JSON.parse(e));
                    }
                }
                this._datas = tmp;
                this.playUpdateDatas();
            };
            ReplayMainController.prototype.playUpdateDatas = function () {
                for (var _i = 0, _a = this._datas; _i < _a.length; _i++) {
                    var ele = _a[_i];
                    this.playUpdateData(ele);
                }
            };
            ReplayMainController.prototype.playUpdateData = function (data) {
                var _this = this;
                Laya.timer.once(data.Content.Time, this, function () {
                    console.log("[" + data.Content.Time + "]", JSON.stringify(data));
                    if (data.Cmd == 'Battle.enterFleet') {
                        _this.onEnterFleet(data.Content.List);
                    }
                    else if (data.Cmd == 'Battle.update') {
                        _this.onBattleUpdate.runWith(data);
                    }
                    else if (data.Cmd == 'Battle.finish') {
                        _this.onBattleFinish.runWith(data.Content);
                    }
                });
            };
            ReplayMainController.prototype.dispose = function () {
                _super.prototype.dispose.call(this);
                Laya.timer.clearAll(this);
            };
            return ReplayMainController;
        }(battle.MainControllerBase));
        battle.ReplayMainController = ReplayMainController;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var Army = (function (_super) {
            __extends(Army, _super);
            function Army(data, side) {
                var _this = _super.call(this) || this;
                _this._enterFlag = false;
                _this._side = side;
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        _this["_" + key] = data[key];
                    }
                }
                _this._ShipList = [];
                _this._PosHash = {};
                for (var _i = 0, _a = data.ShipList; _i < _a.length; _i++) {
                    var ship = _a[_i];
                    var shipData = new battle.Ship(ship, _this._side, _this._FactionID);
                    _this._ShipList.push(shipData);
                    _this._PosHash[shipData.Pos] = shipData;
                }
                return _this;
            }
            Army.prototype.updateShipHp = function (pos, hpVar) {
                if (this._PosHash[pos])
                    this._PosHash[pos].updateHp(hpVar);
            };
            Army.prototype.updateShipEn = function (pos, enVar) {
                if (this._PosHash[pos])
                    this._PosHash[pos].updateEn(enVar);
            };
            Army.prototype.updateShipShield = function (pos, attrVar) {
                if (this._PosHash[pos])
                    this._PosHash[pos].updateShield(attrVar);
            };
            Army.prototype.shipDead = function (pos) {
                this._PosHash[pos] = null;
                this.event(battle.BattleShipEvent.DEAD, pos);
            };
            Army.prototype.addBuff = function (pos, attrVar) {
                this._PosHash[pos].addBuff(attrVar);
            };
            Army.prototype.removeBuff = function (pos, attrVar) {
                if (this._PosHash[pos])
                    this._PosHash[pos].removeBuff(attrVar);
            };
            Army.prototype.getShip = function (pos) { return this._PosHash[pos]; };
            Object.defineProperty(Army.prototype, "side", {
                get: function () { return this._side; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Army.prototype, "enterFlag", {
                set: function (val) { this._enterFlag = val; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Army.prototype, "ShipList", {
                get: function () { return this._ShipList; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Army.prototype, "ID", {
                get: function () { return this._ID; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Army.prototype, "Name", {
                get: function () { return this._Name; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Army.prototype, "Level", {
                get: function () { return this._Level; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Army.prototype, "FactionID", {
                get: function () { return this._FactionID; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Army.prototype, "AvatarID", {
                get: function () { return this._AvatarID; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Army.prototype, "Count", {
                get: function () { return this._Count; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Army.prototype, "TotalCount", {
                get: function () { return this._TotalCount; },
                enumerable: true,
                configurable: true
            });
            ;
            return Army;
        }(Laya.EventDispatcher));
        battle.Army = Army;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var Buff = (function () {
            function Buff(buffID) {
                this._buffID = buffID;
            }
            Object.defineProperty(Buff.prototype, "buffID", {
                get: function () {
                    return this._buffID;
                },
                enumerable: true,
                configurable: true
            });
            return Buff;
        }());
        battle.Buff = Buff;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var UIModel = zt.app.UIModel;
        var Model = (function (_super) {
            __extends(Model, _super);
            function Model(params) {
                var _this = _super.call(this, params) || this;
                _this._params = params;
                return _this;
            }
            Model.prototype.updateArmy = function (data) {
                var result = {};
                this._round = data.Round;
                this._maxRound = data.MaxRound;
                if (data.Attacker) {
                    this._Attacker = new battle.Army(data.Attacker, battle.getAttackerSide(this.type));
                    this._Attacker.enterFlag = false;
                    result['Attacker'] = this._Attacker;
                }
                if (data.Defender) {
                    this._Defender = new battle.Army(data.Defender, battle.getDefenderSide(this.type));
                    this._Defender.enterFlag = false;
                    result['Defender'] = this._Defender;
                }
                zt.ctrl.GameCtrl.intance.event(EnumEventName.ARMY_UPDATE);
                return result;
            };
            Model.prototype.updateRound = function (round) {
                this._round = round;
                zt.ctrl.GameCtrl.intance.event(EnumEventName.ARMY_UPDATE);
            };
            Model.prototype.checkEnterFleet = function () {
                if (this._Attacker)
                    this._Attacker.enterFlag = true;
                if (this._Defender)
                    this._Defender.enterFlag = true;
            };
            Model.prototype.getParams = function () {
                return {
                    Type: this.type,
                    ActivityID: getActivityID(this.type),
                    BattleID: this.battleID
                };
            };
            Model.prototype.init = function () {
            };
            Model.prototype.dispose = function () {
            };
            Object.defineProperty(Model.prototype, "round", {
                get: function () { return this._round; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Model.prototype, "Attacker", {
                get: function () { return this._Attacker; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Model.prototype, "Defender", {
                get: function () { return this._Defender; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Model.prototype, "type", {
                get: function () { return this._params.battle.type; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Model.prototype, "battleID", {
                get: function () { return this._params.battle.battleID; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Model.prototype, "mode", {
                get: function () { return this._params.mode; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Model.prototype, "isReJoin", {
                get: function () { return this._params.isReJoin; },
                enumerable: true,
                configurable: true
            });
            ;
            Object.defineProperty(Model.prototype, "replayData", {
                get: function () { return this._params.replay; },
                enumerable: true,
                configurable: true
            });
            ;
            return Model;
        }(UIModel));
        battle.Model = Model;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var Ship = (function (_super) {
            __extends(Ship, _super);
            function Ship(data, side, fid) {
                var _this = _super.call(this) || this;
                _this.side = side;
                _this.fid = fid;
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        _this[key] = data[key];
                    }
                }
                _this.SkillList = [];
                _this.BuffList = [];
                _this._buffIDList = [];
                if (data.SkillList)
                    for (var _i = 0, _a = data.SkillList; _i < _a.length; _i++) {
                        var skill = _a[_i];
                        _this.SkillList.push(new battle.Skill(skill));
                    }
                if (data.BuffList)
                    for (var _b = 0, _c = data.BuffList; _b < _c.length; _b++) {
                        var buff = _c[_b];
                        _this.BuffList.push(new battle.Buff(buff));
                    }
                return _this;
            }
            Ship.prototype.addBuff = function (id) {
                var index = this._buffIDList.indexOf(id);
                if (index == -1) {
                    this._buffIDList.push(id);
                    this.BuffList.push(new battle.Buff(id));
                    this.event(battle.BattleShipEvent.BUFF_ADD);
                }
            };
            Ship.prototype.removeBuff = function (id) {
                var index = this._buffIDList.indexOf(id);
                if (index != -1) {
                    this.BuffList.splice(index, 1);
                    this._buffIDList.splice(index, 1);
                }
                this.event(battle.BattleShipEvent.BUFF_REMOVE);
            };
            Ship.prototype.getUrl = function () {
                var sidePrefix = this.side == 'left' ? 'r' : 'l';
                var type = 'f';
                if (this.ObjectType == battle.ObjectType.Ship || this.ObjectType == battle.ObjectType.Mob) {
                    type = 's';
                }
                this._shipName = "" + type + this.SysID + "_" + sidePrefix;
                return "fight/ship/" + type + this.SysID + "-" + sidePrefix + ".json";
            };
            Ship.prototype.updateHp = function (hp) {
                this.Hp += hp;
                this.event(battle.BattleShipEvent.HP_UPDATE);
            };
            Ship.prototype.updateEn = function (en) {
                this.En += en;
                this.event(battle.BattleShipEvent.EN_UPDATE);
            };
            Object.defineProperty(Ship.prototype, "shipName", {
                get: function () {
                    return this._shipName;
                },
                enumerable: true,
                configurable: true
            });
            Ship.prototype.updateShield = function (shield) {
                this.Shield += shield;
                this.event(battle.BattleShipEvent.SHIELD_UPDATE);
            };
            return Ship;
        }(Laya.EventDispatcher));
        battle.Ship = Ship;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var Skill = (function () {
            function Skill(data) {
            }
            return Skill;
        }());
        battle.Skill = Skill;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var BattleEvent;
        (function (BattleEvent) {
            BattleEvent["ARMY_UPDATE"] = "UPDATE";
        })(BattleEvent = battle.BattleEvent || (battle.BattleEvent = {}));
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var BattleShipEvent;
        (function (BattleShipEvent) {
            BattleShipEvent["HP_UPDATE"] = "HP_UPDATE";
            BattleShipEvent["SHIELD_UPDATE"] = "SHIELD_UPDATE";
            BattleShipEvent["EN_UPDATE"] = "EN_UPDATE";
            BattleShipEvent["DEAD"] = "DEAD";
            BattleShipEvent["BUFF_ADD"] = "BUFF_ADD";
            BattleShipEvent["BUFF_REMOVE"] = "BUFF_REMOVE";
        })(BattleShipEvent = battle.BattleShipEvent || (battle.BattleShipEvent = {}));
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var FloatTool = (function () {
            function FloatTool() {
                this._ships = [];
                this._offsets = new Laya.Dictionary();
            }
            FloatTool.add = function (ship) {
                FloatTool.instance._ships.push(ship);
                FloatTool.instance._offsets.set(ship, [FloatTool.SPEED * (Math.random() > 0.5 ? 1 : -1), 0]);
            };
            FloatTool.remove = function (ship) {
                utils.ArrayUtil.remove(ship, FloatTool.instance._ships);
            };
            FloatTool.dispose = function () {
                Laya.timer.clear(FloatTool.instance, FloatTool.instance.onframe);
            };
            FloatTool.prototype.onframe = function () {
                for (var _i = 0, _a = FloatTool.instance._ships; _i < _a.length; _i++) {
                    var ship = _a[_i];
                    this.onframeItem(ship);
                }
            };
            FloatTool.prototype.onframeItem = function (ship) {
                var offset = this._offsets.get(ship);
                if (offset[1] >= FloatTool.RANGE) {
                    offset[0] = -FloatTool.SPEED;
                }
                else if (offset[1] <= -FloatTool.RANGE) {
                    offset[0] = FloatTool.SPEED;
                }
                offset[1] += offset[0];
                ship.y += offset[0];
                this._offsets.set(ship, offset);
            };
            FloatTool.init = function () {
                FloatTool.instance = new FloatTool();
                Laya.timer.frameLoop(1, FloatTool.instance, FloatTool.instance.onframe);
            };
            FloatTool.SPEED = 0.2;
            FloatTool.RANGE = 7;
            return FloatTool;
        }());
        battle.FloatTool = FloatTool;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        battle.getAttackerSide = function (type) {
            if (type == BattleType.ExploringPoint
                || type == BattleType.DailyInstance
                || type == BattleType.NormalInstance
                || type == BattleType.Story
                || type == BattleType.Colony
                || type == BattleType.SnatchPublic
                || type == BattleType.SnatchPrivate
                || type == BattleType.LootPublic
                || type == BattleType.LootPrivate
                || type == BattleType.Mine)
                return 'left';
            return 'right';
        };
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        battle.getDefenderSide = function (type) {
            if (battle.getAttackerSide(type) == 'left')
                return 'right';
            return 'left';
        };
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        battle.getFrame = function (FactionID) {
            switch (FactionID) {
                case 1:
                    return 0;
                case 2:
                    return 1;
            }
            return 2;
        };
        battle.getPosFrame = function (objectType, grade) {
            if (objectType == battle.ObjectType.Fleet || objectType == battle.ObjectType.MobFleet) {
                return 7 + grade;
            }
            if (objectType == battle.ObjectType.Ship || objectType == battle.ObjectType.Mob) {
                return grade;
            }
            return 0;
        };
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        battle.getMask = function (side) {
            var d1 = 484;
            var d2 = 1438;
            var d3 = 950;
            var d4 = 1920;
            var mask = new Sprite();
            if (side == 'left') {
                mask.graphics.drawPoly(0, 0, [0, 0, d1, 0, d2, d3, 0, d3], '#00ff00');
            }
            else {
                mask.graphics.drawPoly(d1, 0, [0, 0, d4 - d1, 0, d4 - d1, d3, d4 - d1 - d1, d3], '#ff0000');
            }
            return mask;
        };
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        battle.getPos = function (side, pos) {
            if (side == 'left') {
                var list_1 = [
                    { x: 556, y: 266 },
                    { x: 709, y: 437 },
                    { x: 875, y: 602 },
                    { x: 324, y: 260 },
                    { x: 471, y: 433 },
                    { x: 648, y: 600 },
                    { x: 246, y: 436 },
                    { x: 412, y: 608 },
                    { x: 566, y: 766 }
                ];
                var position_1 = pos - 1;
                position_1 = position_1 == -1 ? 0 : position_1;
                return list_1[position_1];
            }
            var list = [
                { x: 1040, y: 337 },
                { x: 1199, y: 503 },
                { x: 1390, y: 666 },
                { x: 1137, y: 163 },
                { x: 1276, y: 328 },
                { x: 1449, y: 497 },
                { x: 1364, y: 164 },
                { x: 1500, y: 336 },
                { x: 1662, y: 500 }
            ];
            var position = pos - 1;
            position = position == -1 ? 0 : position;
            return list[position];
        };
        battle.getFromPos = function (side, pos) {
            var offset = { x: 860, y: 470 };
            var posConfig = battle.getPos(side, pos);
            var random = Math.random() * 500;
            if (side == 'left') {
                return { x: posConfig.x - (offset.x + random), y: posConfig.y + (offset.y + random) };
            }
            return { x: posConfig.x + (offset.x + random), y: posConfig.y - (offset.y + random) };
        };
        battle.getshipFirepoint = function (side) {
            return side == 'left' ? { x: -185, y: -145 } : { x: -126, y: -175 };
        };
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var ArmyView = (function (_super) {
            __extends(ArmyView, _super);
            function ArmyView(type) {
                var _this = _super.call(this) || this;
                _this._type = type;
                _this._underShipLayer = new Sprite();
                _this._shipLayer = new Sprite();
                _this._overShipLayer = new Sprite();
                _this.addChildren(_this._underShipLayer, _this._shipLayer, _this._overShipLayer);
                _this.name = 'army';
                return _this;
            }
            ArmyView.prototype.setData = function (army) {
                this.removeShips();
                this.removeBgs();
                this._army = army;
                this._army.on(battle.BattleShipEvent.DEAD, this, this.onShipDead);
                this.createShips();
                this.addBgs();
                this.setMask();
            };
            ArmyView.prototype.removeBgs = function () {
                if (!this._bgs)
                    return;
                this._bgs.forEach(function (element) {
                    element.dispose();
                });
                this._bgs = null;
            };
            ArmyView.prototype.addBgs = function () {
                this._bgs = [];
                for (var index = 1; index <= 9; index++) {
                    var ship = this._army.getShip(index);
                    var pos = battle.getPos(this._army.side, index);
                    var bg = fairygui.UIPackage.createObject('battle', 'shipBg_' + this._army.side);
                    this._bgs.push(bg);
                    bg.displayObject.pos(-99 + pos.x, -10 + pos.y);
                    bg.getController('c1').selectedIndex = 0;
                    if (ship) {
                        bg.getController('c1').selectedIndex = battle.getPosFrame(ship.ObjectType, ship.Grade);
                    }
                    if (this._type == 'defender') {
                        bg.displayObject.pos(-50 + pos.x, -38 + pos.y);
                    }
                    this._underShipLayer.addChild(bg.displayObject);
                }
            };
            ArmyView.prototype.shakeShip = function ($to, $act, $factionID) {
                if ($factionID === void 0) { $factionID = -1; }
                for (var _i = 0, $to_1 = $to; _i < $to_1.length; _i++) {
                    var obj = $to_1[_i];
                    var ship = this._shipList[obj.Pos];
                    if (ship) {
                        ship.shake($act, $factionID);
                    }
                }
            };
            ArmyView.prototype.onShipDead = function (pos) {
                this.removeShip(pos);
            };
            ArmyView.prototype.checkEnterFleet = function (isReJoin) {
                if (this._army.enterFlag)
                    return;
                for (var key in this._shipList) {
                    this.shipEnter(this._shipList[key], isReJoin);
                }
            };
            ArmyView.prototype.setMask = function () {
                if (this._underShipLayer.mask)
                    return;
                this._underShipLayer.mask = battle.getMask(this._army.side);
                this._overShipLayer.mask = battle.getMask(this._army.side);
            };
            ArmyView.prototype.removeShips = function () {
                if (!this._shipList)
                    return;
                for (var pos in this._shipList) {
                    this.removeShip(pos);
                }
            };
            ArmyView.prototype.removeShip = function (pos) {
                this._shipList[pos].dispose();
                delete this._shipList[pos];
            };
            ArmyView.prototype.getShip = function (pos) {
                return this._shipList[pos];
            };
            ArmyView.prototype.shipEnter = function (ship, isReJoin) {
                var pos = battle.getPos(this._army.side, ship.data.Pos);
                if (isReJoin)
                    ship.pos(pos.x, pos.y);
                else
                    Laya.Tween.to(ship, { x: pos.x, y: pos.y }, 1000);
            };
            ArmyView.prototype.createShips = function () {
                this._shipList = {};
                for (var _i = 0, _a = this._army.ShipList; _i < _a.length; _i++) {
                    var ship = _a[_i];
                    if (ship.Hp > 0) {
                        var shipView = new battle.ShipView(ship);
                        this._shipList[ship.Pos] = shipView;
                        this._shipLayer.addChild(shipView);
                        var pos = battle.getFromPos(this._army.side, ship.Pos);
                        shipView.pos(pos.x, pos.y);
                    }
                }
            };
            ArmyView.prototype.dispose = function () {
            };
            Object.defineProperty(ArmyView.prototype, "army", {
                get: function () { return this._army; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ArmyView.prototype, "underShipLayer", {
                get: function () { return this._underShipLayer; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ArmyView.prototype, "overShipLayer", {
                get: function () { return this._overShipLayer; },
                enumerable: true,
                configurable: true
            });
            return ArmyView;
        }(Sprite));
        battle.ArmyView = ArmyView;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var Sprite = Laya.Sprite;
        var Handler = Laya.Handler;
        var ShipView = (function (_super) {
            __extends(ShipView, _super);
            function ShipView(data) {
                var _this = _super.call(this) || this;
                _this._data = data;
                _this.initView();
                _this.initEvent();
                return _this;
            }
            ShipView.prototype.initView = function () {
                var model = getModelByModuleName(AppEnum.battle);
                this._ui = fairygui.UIPackage.createObject('battle', 'ship');
                this._ui.displayObject.pos(-95, -35);
                this.addChild(this._ui.displayObject);
                this.bufflist = this._ui.getChild('bufflist').asList;
                this.hpBar = this._ui.getChild('hp').asProgress;
                this.shieldBar = this._ui.getChild('shield').asProgress;
                this.energyBar = this._ui.getChild('energy').asProgress;
                this.angerBar = this._ui.getChild('anger').asProgress;
                this.hpBarController = this.hpBar.getController('c1');
                if (this._data.side == 'right') {
                    this._ui.displayObject.pos(-35, -68);
                }
                this.bufflist.visible = false;
                this.angerBar.visible = false;
                var url = utils.getResourceURL(this._data.getUrl());
                if (!this._ship) {
                    this._ship = zt.effects.createEffect(url, AppEnum.battle, false);
                }
                this.bufflist.itemRenderer = Handler.create(this, this.renderBuff, null, false);
                this._ship.scaleX = this.scaleY = 0.7;
                var firePoint = battle.getshipFirepoint(this._data.side);
                this._ship.playEffect(this, firePoint.x, firePoint.y, true);
                this._startX = firePoint.x;
                battle.FloatTool.add(this._ship);
                this.onHpUpdate();
                this.onShieldUpdate();
                this.onEnUpdate();
                this.onBuffUpdate();
            };
            ShipView.prototype.renderBuff = function (index, obj) {
                var buffIcon = obj;
                var buff = this._data.BuffList[index];
                var url = zt.utils.getResourceURL("fight/icon/battleBuff/" + buff.buffID + ".png");
                var icon = Laya.loader.getRes(url);
                buffIcon.displayObject.graphics.drawTexture(icon);
            };
            ShipView.prototype.initEvent = function () {
                this._data.on(battle.BattleShipEvent.HP_UPDATE, this, this.onHpUpdate);
                this._data.on(battle.BattleShipEvent.SHIELD_UPDATE, this, this.onShieldUpdate);
                this._data.on(battle.BattleShipEvent.EN_UPDATE, this, this.onEnUpdate);
                this._data.on(battle.BattleShipEvent.BUFF_ADD, this, this.onBuffUpdate);
                this._data.on(battle.BattleShipEvent.BUFF_REMOVE, this, this.onBuffUpdate);
            };
            ShipView.prototype.onHpUpdate = function () {
                this.hpBar.update(Math.ceil(this._data.Hp / this._data.MaxHp * 100));
            };
            ShipView.prototype.onShieldUpdate = function () {
                this.shieldBar.update(Math.ceil(this._data.Shield / this._data.MaxShield * 100));
            };
            ShipView.prototype.onBuffUpdate = function () {
                this.bufflist.visible = this._data.BuffList.length > 0;
                this.bufflist.numItems = this._data.BuffList.length;
            };
            ShipView.prototype.onEnUpdate = function () {
                var percent = Math.ceil(this._data.En / this._data.MaxEn * 100);
                this.energyBar.update(percent);
            };
            ShipView.prototype.dispose = function () {
                this.removeSelf();
                if (this._ship)
                    zt.effects.resyleEffectGroup(this._ship);
            };
            ShipView.prototype.shake = function ($attackType, $faction) {
                if ($faction === void 0) { $faction = -1; }
                var isleft = this._data.side == 'left';
                var offsetX = isleft ? -10 : 10;
                var toX = this._startX + offsetX;
                this._tween = Laya.Tween.to(this._ship, { x: toX }, 100, Laya.Ease.sineIn, Laya.Handler.create(this, this.backTo));
            };
            ShipView.prototype.backTo = function () {
                var toX = this._startX;
                this._tween.clear();
                this._tween = Laya.Tween.to(this._ship, { x: toX }, 200, Laya.Ease.sineIn, Laya.Handler.create(this, this.clear));
            };
            Object.defineProperty(ShipView.prototype, "shipX", {
                get: function () {
                    return this._ship ? this._ship.x + this.x : 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ShipView.prototype, "shipY", {
                get: function () {
                    return this._ship ? this._ship.y + this.y : 0;
                },
                enumerable: true,
                configurable: true
            });
            ShipView.prototype.clear = function () {
                this._tween.clear();
            };
            Object.defineProperty(ShipView.prototype, "data", {
                get: function () { return this._data; },
                enumerable: true,
                configurable: true
            });
            return ShipView;
        }(Sprite));
        battle.ShipView = ShipView;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var UIView = zt.app.UIView;
        var View = (function (_super) {
            __extends(View, _super);
            function View(ui) {
                return _super.call(this, ui) || this;
            }
            View.prototype.init = function () {
                this._list = [];
                this.bgCon = this._ui.getChild('bg').asCom;
                this._bg = this.bgCon.displayObject;
                this.close = this._ui.getChild('close');
                this._attackerView = new battle.ArmyView('attacker');
                this._defenderView = new battle.ArmyView('defender');
                this._container = new Sprite();
                this.divisionLine = this._ui.getChild('divisionLine').asCom;
                this.destinationOut = this._ui.getChild('destinationOut').asImage;
                this.lController = this.divisionLine.getController('down');
                this.rController = this.divisionLine.getController('up');
            };
            View.prototype.addEvent = function () {
                var model = getModelByModuleName(AppEnum.battle);
                this.close.onClick(this, this.closeApp);
                zt.ctrl.GameCtrl.intance.on(EnumEventName.ARMY_UPDATE, this, this.onArmyUpdate);
            };
            View.prototype.removeEvent = function () {
                this.close.offClick(this, this.closeApp);
                zt.ctrl.GameCtrl.intance.off(EnumEventName.ARMY_UPDATE, this, this.onArmyUpdate);
            };
            View.prototype.start = function () {
                this._main = new Sprite();
                this._main.name = 'main';
                this._main.addChild(this._bg);
                this._ui.displayObject.addChild(this._main);
                for (var i = 0; i < this._ui.numChildren; i++) {
                    var name_1 = this._ui.getChildAt(i).name;
                    if (name_1 === 'bg')
                        continue;
                    var add = this.add(this._ui.getChildAt(i));
                    this._ui.getChildAt(i).displayObject.pos(0, 0);
                    this._main.addChild(this._ui.getChildAt(i).displayObject);
                }
                this._main.addChildren(this._attackerView, this._defenderView, this._container);
                this._container.addChild(this.destinationOut.displayObject);
                this.destinationOut.x = 565;
                this.destinationOut.y = 61;
                this._container.addChild(this.divisionLine.displayObject);
                this._attackerView.pos(0, 0);
                this._defenderView.pos(0, 0);
                this._container.pos(0, 0);
                this.loadBg();
                this.resize();
            };
            View.prototype.loadBg = function () {
                var model = getModelByModuleName(AppEnum.battle);
                this.bgCon.displayObject.loadImage(utils.getResourceURL("fight/bg/" + model.type + ".jpg"));
            };
            View.prototype.add = function (viewItem) {
                var name = zt.utils.stringUtil.replaceFirstUper(viewItem.name);
                var cls = getDefinition("zt.battle." + name + "View");
                if (cls === null)
                    return;
                var model = this.model;
                var controller = this.controller;
                var view = new cls(viewItem, controller, model);
                this._list.push(view);
                return view;
            };
            View.prototype.resize = function () {
                var stageW = Laya.stage.width;
                if (stageW >= View.BG_WIDTH) {
                    var toX = -(View.BG_WIDTH - Laya.stage.width) / 2;
                    var toY = -(View.BG_HEIGHT - Laya.stage.height) / 2;
                    this._main.x = toX;
                    this._main.y = toY;
                    for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                        var i = _a[_i];
                        i.resize();
                    }
                }
                else {
                    var scale = Laya.stage.width >= View.LIMIT_WIDTH ? 1 : View.SCALE;
                    this._main.scale(scale, scale);
                    for (var _b = 0, _c = this._list; _b < _c.length; _b++) {
                        var i = _c[_b];
                        i.resize();
                    }
                    this._bound = this._main.getBounds();
                    var boundW = this._bound.width >= 1920 ? 1920 : this._bound.width;
                    var boundH = this._bound.height >= 1080 ? 1080 : this._bound.height;
                    var toX = (Laya.stage.width - this._bound.width) / 2;
                    var toY = (Laya.stage.height - this._bound.height) / 2 + 50;
                    this._main.x = toX;
                    this._main.y = toY;
                }
            };
            View.prototype.onArmyUpdate = function () {
                var datal;
                var datar;
                var mdoel = this.model;
                if (battle.getAttackerSide(mdoel.type) == 'left') {
                    datal = mdoel.Attacker;
                    datar = mdoel.Defender;
                }
                else {
                    datar = mdoel.Attacker;
                    datal = mdoel.Defender;
                }
                if (datal)
                    this.lController.selectedIndex = battle.getFrame(datal.FactionID);
                if (datar)
                    this.rController.selectedIndex = battle.getFrame(datar.FactionID);
            };
            View.prototype.disposeLoading = function () {
            };
            View.prototype.dispose = function () {
                this.removeEvent();
                for (var _i = 0, _a = this._list; _i < _a.length; _i++) {
                    var i = _a[_i];
                    i.dispose();
                }
            };
            Object.defineProperty(View.prototype, "attacker", {
                get: function () { return this._attackerView; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "defender", {
                get: function () { return this._defenderView; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "container", {
                get: function () { return this._container; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(View.prototype, "main", {
                get: function () { return this._main; },
                enumerable: true,
                configurable: true
            });
            View.BG_WIDTH = 1920;
            View.BG_HEIGHT = 950;
            View.LIMIT_WIDTH = 1600;
            View.SCALE = 0.6;
            return View;
        }(UIView));
        battle.View = View;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var DamageNum = zt.effects.DamageNum;
        var ActBase = (function () {
            function ActBase() {
            }
            Object.defineProperty(ActBase.prototype, "fromView", {
                set: function (val) { this._fromView = val; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActBase.prototype, "toView", {
                set: function (val) { this._toView = val; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActBase.prototype, "mainView", {
                set: function (val) { this._mainView = val; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActBase.prototype, "fromPos", {
                set: function (val) { this._fromPos = val; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActBase.prototype, "to", {
                set: function (val) { this._to = val; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActBase.prototype, "fromSide", {
                set: function (val) { this._fromSide = val; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActBase.prototype, "toSide", {
                set: function (val) {
                    this._toSide = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActBase.prototype, "fromPoint", {
                set: function (val) {
                    this._fromPoint = val;
                },
                enumerable: true,
                configurable: true
            });
            ActBase.prototype.getToPoint = function (pos) {
                return battle.getPos(this._toSide, pos);
            };
            ActBase.prototype.getToArmyData = function (type) {
                return type == 1 ? this.attacker : this.defender;
            };
            Object.defineProperty(ActBase.prototype, "name", {
                get: function () {
                    return 'type';
                },
                enumerable: true,
                configurable: true
            });
            ActBase.prototype.play = function ($type, $faction) {
            };
            ;
            ActBase.prototype.playDamage = function ($damageType, $isAdd) {
                if ($isAdd === void 0) { $isAdd = false; }
                var toPoint = this.getToPoint(this._to[0].Pos);
                var damage = DamageNum.getDamageNum(this.ActVar, $damageType, $isAdd);
                damage.pos(toPoint.x, toPoint.y - 40);
                this._toView.addChild(damage);
                damage.play($damageType);
            };
            return ActBase;
        }());
        battle.ActBase = ActBase;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var ActAddBuff = (function (_super) {
            __extends(ActAddBuff, _super);
            function ActAddBuff() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ActAddBuff.prototype.play = function () {
                var _this = this;
                this._to.forEach(function (ele) {
                    var toArmy = _this.getToArmyData(ele.Type);
                    toArmy.addBuff(ele.Pos, _this.ActVar);
                    _this.playBuff(ele.Pos);
                });
            };
            ActAddBuff.prototype.playOnce = function () {
            };
            ActAddBuff.prototype.playBuff = function (pos) {
                var actname = "Buff_" + this.ActVar;
                var battleEffect = Battle.SysBattleEffectP.getDataByAction(actname);
                var url = utils.getResourceURL(this.buffUrl);
                var toAni = zt.effects.createEffect(url, AppEnum.battle);
                var container = this.container;
                var formView = this._toSide == 'left' ? this.attackerView : this.defenderView;
                var attack = formView.getShip(pos);
                var point = { "x": 0, "y": 0 };
                if (attack) {
                    var shipName = attack.data.shipName;
                    point.x = attack.shipX;
                    point.y = attack.shipY;
                }
                var effextX = this._fromSide == 'left' ? battleEffect.Lx : battleEffect.Rx;
                var effextY = this._fromSide == 'left' ? battleEffect.Ly : battleEffect.Ry;
                point.x = point.x + effextX[0];
                point.y = point.y + effextY[0];
                var raisePoint = { 'x': point.x, 'y': point.y - 60 };
                var points = { 'x': point.x, 'y': point.y + 20 };
                var raiseParam = getRaiseParam(points, raisePoint, false);
                var buffTxt = zt.utils.getResourceURL(this.buffTxtUrl);
                Tips.showRaisingImages(buffTxt, raiseParam);
                toAni.playEffect(container, point.x, point.y);
            };
            Object.defineProperty(ActAddBuff.prototype, "buffUrl", {
                get: function () {
                    return "fight/buff/1.json";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActAddBuff.prototype, "buffTxtUrl", {
                get: function () {
                    return "fight/icon/battleBuffText/" + this.ActVar + ".png";
                },
                enumerable: true,
                configurable: true
            });
            return ActAddBuff;
        }(battle.ActBase));
        battle.ActAddBuff = ActAddBuff;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var Effect = zt.effects.Effect;
var Handler = Laya.Handler;
var Rectangle = Laya.Rectangle;
var SysbattleEffectVo = zt.data.SysBattleEffectVo;
var SysBattlePerformeVo = zt.data.SysBattlePerformeVo;
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var ActAttack = (function (_super) {
            __extends(ActAttack, _super);
            function ActAttack() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ActAttack.prototype.play = function () {
                var _this = this;
                var attackX = 0;
                var attackY = 0;
                var actname = "Attack_" + this.fromArmy.FactionID;
                var battleEffect = Battle.SysBattleEffectP.getDataByAction(actname);
                var formView = this._fromSide == 'left' ? this.attackerView : this.defenderView;
                var toView = this._fromSide == 'left' ? this.defenderView : this.attackerView;
                var attack = formView.getShip(this._fromPos);
                var pos = { "x": 0, "y": 0 };
                if (attack) {
                    var shipName = attack.data.shipName;
                    var attackShip = Battle.SysBattlePerformeP.getDataByShip(shipName);
                    attackX = attackShip.AttackX;
                    attackY = attackShip.AttackY;
                    pos.x = attack.shipX >> 0;
                    pos.y = attack.shipY >> 0;
                }
                var url = utils.getResourceURL(this.url);
                var effextX = this._fromSide == 'left' ? battleEffect.Lx : battleEffect.Rx;
                var effextY = this._fromSide == 'left' ? battleEffect.Ly : battleEffect.Ry;
                var aniX = effextX[0] + pos.x + attackX;
                var aniY = effextY[0] + pos.y + attackY + 50;
                var isContray = this._fromSide == 'left' ? false : true;
                var container = this.container;
                var recoup = this._fromSide == 'left' ? 105 : 2;
                var length = (utils.getTargetToCenter(aniX, aniY) >> 0) + recoup;
                var formAni = zt.effects.createSkillEffect(url, aniX, aniY, isContray, length, container, true);
                formAni.playEffect(60);
                formAni.addFrame(battleEffect.Frame, Handler.create(this, function () {
                    var angle = isContray ? 154 : -26;
                    pos.x = 0;
                    pos.y = 0;
                    for (var _i = 0, _a = _this._to; _i < _a.length; _i++) {
                        var target = _a[_i];
                        recoup = _this._fromSide == 'left' ? 50 : 200;
                        var defend = toView.getShip(target.Pos);
                        if (defend) {
                            var shipName = defend.data.shipName;
                            var attackShip = Battle.SysBattlePerformeP.getDataByShip(shipName);
                            attackX = attackShip.HitX;
                            attackY = attackShip.HitY;
                            pos.x = defend.shipX;
                            pos.y = defend.shipY;
                        }
                        aniX = (pos.x + attackX) >> 0;
                        aniY = (pos.y + attackY + 50) >> 0;
                        length = (utils.getTargetToCenter(aniX, aniY) >> 0) + recoup;
                        angle = 0;
                        if (isContray) {
                            aniX = aniX + Math.cos(angle / 180 * Math.PI) * (length - recoup) + 100;
                            aniY = aniY - Math.sin(angle / 180 * Math.PI) * (length - recoup) - 29;
                        }
                        else {
                            aniX = aniX - Math.cos(angle / 180 * Math.PI) * (length - recoup) + 10;
                            aniY = aniY + Math.sin(angle / 180 * Math.PI) * (length - recoup) - 5;
                        }
                        var toAni = zt.effects.createSkillEffect(url, aniX, aniY, isContray, length, container, false);
                        toAni.playEffect(60);
                    }
                }));
            };
            Object.defineProperty(ActAttack.prototype, "url", {
                get: function () {
                    return "fight/attack/skill.json";
                },
                enumerable: true,
                configurable: true
            });
            return ActAttack;
        }(battle.ActBase));
        battle.ActAttack = ActAttack;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var ActDead = (function (_super) {
            __extends(ActDead, _super);
            function ActDead() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ActDead.prototype.play = function () {
                var toArmy = this.getToArmyData(this._to[0].Type);
                toArmy.shipDead(this._to[0].Pos);
                this.playEffect();
            };
            ActDead.prototype.playEffect = function () {
                var url = utils.getResourceURL(this.url);
                var container = this.attackerView.parent;
                for (var _i = 0, _a = this._to; _i < _a.length; _i++) {
                    var target = _a[_i];
                    var point = this.getToPoint(target.Pos);
                    var toAni = zt.effects.createEffect(url, AppEnum.battle, true);
                    toAni.playEffect(container, point.x - 150, point.y - 150, false, Laya.BlendMode.ADD, null, 30);
                }
            };
            Object.defineProperty(ActDead.prototype, "url", {
                get: function () {
                    return 'fight/dead/dead.json';
                },
                enumerable: true,
                configurable: true
            });
            return ActDead;
        }(battle.ActBase));
        battle.ActDead = ActDead;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var ActDecEn = (function (_super) {
            __extends(ActDecEn, _super);
            function ActDecEn() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ActDecEn.prototype.play = function () {
                var toArmy = this.getToArmyData(this._to[0].Type);
                toArmy.updateShipEn(this._to[0].Pos, this.ActVar);
            };
            return ActDecEn;
        }(battle.ActBase));
        battle.ActDecEn = ActDecEn;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var ActDecHp = (function (_super) {
            __extends(ActDecHp, _super);
            function ActDecHp() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ActDecHp.prototype.play = function () {
                var toArmy = this.getToArmyData(this._to[0].Type);
                toArmy.updateShipHp(this._to[0].Pos, this.ActVar);
                var type = this.Crit == 1 ? battle.DamageNumsType.CRIT : battle.DamageNumsType.DAMAGE;
                this.playDamage(type);
            };
            return ActDecHp;
        }(battle.ActBase));
        battle.ActDecHp = ActDecHp;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var ActDecShield = (function (_super) {
            __extends(ActDecShield, _super);
            function ActDecShield() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ActDecShield.prototype.play = function () {
                var toArmy = this.getToArmyData(this._to[0].Type);
                toArmy.updateShipShield(this._to[0].Pos, this.ActVar);
                var toPoint = this.getToPoint(this._to[0].Pos);
                var type = this.Crit == 1 ? battle.DamageNumsType.CRIT : battle.DamageNumsType.DAMAGE;
                this.playDamage(type);
            };
            return ActDecShield;
        }(battle.ActBase));
        battle.ActDecShield = ActDecShield;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var ActIncEn = (function (_super) {
            __extends(ActIncEn, _super);
            function ActIncEn() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ActIncEn.prototype.play = function () {
                var toArmy = this.getToArmyData(this._to[0].Type);
                toArmy.updateShipEn(this._to[0].Pos, this.ActVar);
            };
            return ActIncEn;
        }(battle.ActBase));
        battle.ActIncEn = ActIncEn;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var ActIncShield = (function (_super) {
            __extends(ActIncShield, _super);
            function ActIncShield() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ActIncShield.prototype.play = function () {
                var toArmy = this.getToArmyData(this._to[0].Type);
                toArmy.updateShipShield(this._to[0].Pos, this.ActVar);
                this.playDamage(battle.DamageNumsType.DAMAGE);
            };
            return ActIncShield;
        }(battle.ActBase));
        battle.ActIncShield = ActIncShield;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var ActMiss = (function (_super) {
            __extends(ActMiss, _super);
            function ActMiss() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ActMiss.prototype.play = function () {
                this.playDamage(battle.DamageNumsType.DAMAGE);
            };
            return ActMiss;
        }(battle.ActBase));
        battle.ActMiss = ActMiss;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var ActRemoveBuff = (function (_super) {
            __extends(ActRemoveBuff, _super);
            function ActRemoveBuff() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ActRemoveBuff.prototype.play = function () {
                var _this = this;
                this._to.forEach(function (ele) {
                    var toArmy = _this.getToArmyData(ele.Type);
                    toArmy.removeBuff(ele.Pos, _this.ActVar);
                });
            };
            return ActRemoveBuff;
        }(battle.ActBase));
        battle.ActRemoveBuff = ActRemoveBuff;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var ActRound = (function (_super) {
            __extends(ActRound, _super);
            function ActRound() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ActRound.prototype.play = function () {
                this.model.updateRound(this.ActVar);
            };
            return ActRound;
        }(battle.ActBase));
        battle.ActRound = ActRound;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var ActSkill = (function (_super) {
            __extends(ActSkill, _super);
            function ActSkill() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            ActSkill.prototype.play = function () {
                if (this.ActVar == 4 || this.ActVar == 1) {
                }
                else if (this.ActVar == 3 || this.ActVar == 2) {
                    this.playSkill();
                }
            };
            ActSkill.prototype.playSkill = function () {
                var _this = this;
                var attackX = 0;
                var attackY = 0;
                var actname = "Skill_" + this.fromArmy.FactionID + "_" + this.ActVar;
                var battleEffect = Battle.SysBattleEffectP.getDataByAction(actname);
                var formView = this._fromSide == 'left' ? this.attackerView : this.defenderView;
                var toView = this._fromSide == 'left' ? this.defenderView : this.attackerView;
                var attack = formView.getShip(this._fromPos);
                var pos = { "x": 0, "y": 0 };
                if (attack) {
                    var shipName = attack.data.shipName;
                    var attackShip = Battle.SysBattlePerformeP.getDataByShip(shipName);
                    attackX = attackShip.AttackX;
                    attackY = attackShip.AttackY;
                    pos.x = attack.shipX;
                    pos.y = attack.shipY;
                    var raisePoint = { 'x': pos.x + attackShip.HitX, 'y': pos.y - 60 };
                    var formPoint = { 'x': pos.x + attackShip.HitY, 'y': pos.y };
                    var raiseParam = getRaiseParam(formPoint, raisePoint, false, 400);
                    var skillIcon = zt.utils.getResourceURL(this.skillIconUrl);
                    Tips.showRaisingImages(skillIcon, raiseParam);
                }
                var url = utils.getResourceURL(this.url);
                var effextX = this._fromSide == 'left' ? battleEffect.Lx : battleEffect.Rx;
                var effextY = this._fromSide == 'left' ? battleEffect.Ly : battleEffect.Ry;
                var aniX = effextX[0] + pos.x + attackX;
                var aniY = effextY[0] + pos.y + attackY;
                var rotation = this._fromSide == 'left' ? 0 : 180;
                var container = this.container;
                var isContray = this._fromSide == 'left' ? false : true;
                var formAni = zt.effects.createSkillEffect(url, aniX, aniY, isContray, length, container, true);
                formAni.playEffect(60);
                formAni.addFrame(battleEffect.Frame, Handler.create(this, function () {
                    pos.x = 0;
                    pos.y = 0;
                    for (var _i = 0, _a = _this._to; _i < _a.length; _i++) {
                        var target = _a[_i];
                        var defend = toView.getShip(target.Pos);
                        if (defend) {
                            var shipName = defend.data.shipName;
                            var attackShip = Battle.SysBattlePerformeP.getDataByShip(shipName);
                            pos.x = defend.shipX + attackShip.HitX;
                            pos.y = defend.shipY + attackShip.HitY;
                        }
                        aniX = effextX[1] + pos.x + attackX;
                        aniY = effextY[1] + pos.y + attackY;
                        var toAni = zt.effects.createSkillEffect(url, aniX, aniY, isContray, length, container, false);
                        toAni.playEffect(60);
                    }
                }));
            };
            Object.defineProperty(ActSkill.prototype, "aniDirection", {
                get: function () {
                    return this._fromSide == 'left' ? 1 : 2;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActSkill.prototype, "url", {
                get: function () {
                    return "fight/skill/" + this.ActVar + ".json";
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActSkill.prototype, "skillIconUrl", {
                get: function () {
                    return "fight/icon/skill80/" + this.ActVar + ".png";
                },
                enumerable: true,
                configurable: true
            });
            return ActSkill;
        }(battle.ActBase));
        battle.ActSkill = ActSkill;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var ActTurn = (function (_super) {
            __extends(ActTurn, _super);
            function ActTurn() {
                var _this = _super.call(this) || this;
                _this._faction = 0;
                return _this;
            }
            ActTurn.prototype.play = function (type, $faction) {
                if (type === void 0) { type = 'attack'; }
                if ($faction === void 0) { $faction = -1; }
                if (this._to && !!this._to[0] == false || this._type == type &&
                    this._pos == this._to[0].Pos &&
                    this.curr && this.curr.isPlaying) {
                    return;
                }
                type = type.toLocaleLowerCase();
                this._type = type;
                this._pos = this._to[0].Pos;
                this._faction = $faction == -1 ? this._faction : $faction;
                var url = utils.getResourceURL("fight/turn/" + type + "/" + this._faction + ".json");
                zt.effects.resyleEffectGroup(this.curr);
                this.curr = zt.effects.createEffect(url, AppEnum.battle, true);
                var toPoint = this.getToPoint(this._pos);
                var x = this._toSide == 'left' ? toPoint.x - 206 : toPoint.x - 142;
                var y = this._toSide == 'left' ? toPoint.y - 87 : toPoint.y - 96;
                this.curr.playEffect(this._toView.underShipLayer, x, y, false, null, null, 80);
            };
            Object.defineProperty(ActTurn.prototype, "name", {
                get: function () {
                    return 'ActTurn';
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(ActTurn, "ins", {
                get: function () {
                    if (!ActTurn._ins) {
                        ActTurn._ins = new ActTurn();
                    }
                    return ActTurn._ins;
                },
                enumerable: true,
                configurable: true
            });
            ActTurn.dispose = function () {
                if (ActTurn._ins) {
                    zt.effects.resyleEffectGroup(ActTurn._ins.curr);
                }
            };
            return ActTurn;
        }(battle.ActBase));
        battle.ActTurn = ActTurn;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        battle.battleReady = function (params, cb) { return net.callRole('Battle.ready', params, cb); };
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        battle.leaveBattle = function (params) { return net.callRole('Battle.leave', params); };
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        battle.skipBattle = function (params) { return net.callRole('Battle.skip', params); };
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var DamageNums = (function (_super) {
            __extends(DamageNums, _super);
            function DamageNums(type) {
                var _this = _super.call(this) || this;
                _this._type = type;
                _this.init();
                return _this;
            }
            DamageNums.prototype.init = function () {
                this._txt = new fairygui.GBasicTextField();
                this._txt.font = this.font;
                this._txt.color = '#ffffff';
                this.addChild(this._txt.displayObject);
            };
            Object.defineProperty(DamageNums.prototype, "data", {
                set: function (num) {
                    this._txt.text = num.toString();
                    this._txt.displayObject.pivot(this._txt.width / 2, this._txt.height / 2);
                },
                enumerable: true,
                configurable: true
            });
            DamageNums.prototype.play = function () {
                var toY = this.y - 70;
                Laya.Tween.to(this, {
                    y: toY
                }, 300, null, Laya.Handler.create(this, this.onAnicomplete));
            };
            DamageNums.prototype.onAnicomplete = function () {
                var _this = this;
                Laya.Tween.to(this, { alpha: 0, y: this.y - 10 }, 300, null, Laya.Handler.create(this, function () {
                    _this.removeSelf();
                    _this.oncomplete();
                }), 200);
            };
            DamageNums.prototype.oncomplete = function () {
                this.event(Laya.Event.COMPLETE);
            };
            Object.defineProperty(DamageNums.prototype, "font", {
                get: function () {
                    switch (this._type) {
                        case battle.DamageNumsType.DAMAGE:
                        case battle.DamageNumsType.SHIELD:
                            return 'ui://orii4jisilkm3x';
                        case battle.DamageNumsType.CRIT:
                            return 'ui://orii4jisilkm3v';
                    }
                },
                enumerable: true,
                configurable: true
            });
            return DamageNums;
        }(Laya.Sprite));
        battle.DamageNums = DamageNums;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var FightViewBase = (function () {
            function FightViewBase(ui, controller, model) {
                this._ui = ui;
                this._controller = controller;
                this._model = model;
                this.init();
                this.draw();
            }
            FightViewBase.prototype.dispose = function () {
                if (this._ui) {
                    this._ui.dispose();
                    this._ui.displayObject.removeSelf();
                    this._ui = null;
                }
            };
            FightViewBase.prototype.draw = function () {
                this._ui.displayObject.visible = false;
            };
            FightViewBase.prototype.init = function () {
            };
            Object.defineProperty(FightViewBase.prototype, "layout", {
                get: function () {
                    return Layout.NONE;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FightViewBase.prototype, "width", {
                get: function () {
                    return this._ui.width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FightViewBase.prototype, "height", {
                get: function () {
                    return this._ui.height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(FightViewBase.prototype, "offset", {
                get: function () {
                    return [0, 0, 0, 0];
                },
                enumerable: true,
                configurable: true
            });
            FightViewBase.prototype.resize = function () {
                Layers.getLayer('app').addChild(this._ui.displayObject);
                var _a = this.offset, offsetTop = _a[0], offsetRight = _a[1], offsetBottom = _a[2], offsetLeft = _a[3];
                var left = (this.layout & Layout.LEFT) > 0;
                var top = (this.layout & Layout.TOP) > 0;
                var right = (this.layout & Layout.RIGHT) > 0;
                var bottom = (this.layout & Layout.BOTTOM) > 0;
                var center = (this.layout & Layout.CENTER) > 0;
                var centerV = (this.layout & Layout.CENTER_V) > 0;
                left && (this._ui.displayObject.x = 0);
                top && (this._ui.displayObject.y = 0);
                right && (this._ui.displayObject.x = Laya.stage.width - this.width);
                bottom && (this._ui.displayObject.y = Laya.stage.height - this.height);
                center && (this._ui.displayObject.x = (Laya.stage.width - this.width) / 2);
                centerV && (this._ui.displayObject.y = (Laya.stage.height - this.height) / 2);
                this._ui.displayObject.y += offsetTop;
                this._ui.displayObject.x -= offsetRight;
                this._ui.displayObject.y -= offsetBottom;
                this._ui.displayObject.x += offsetLeft;
            };
            FightViewBase.GAP = 0;
            return FightViewBase;
        }());
        battle.FightViewBase = FightViewBase;
        var Layout;
        (function (Layout) {
            Layout[Layout["NONE"] = 1] = "NONE";
            Layout[Layout["TOP"] = 2] = "TOP";
            Layout[Layout["LEFT"] = 4] = "LEFT";
            Layout[Layout["BOTTOM"] = 8] = "BOTTOM";
            Layout[Layout["RIGHT"] = 16] = "RIGHT";
            Layout[Layout["CENTER"] = 32] = "CENTER";
            Layout[Layout["CENTER_V"] = 64] = "CENTER_V";
        })(Layout = battle.Layout || (battle.Layout = {}));
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var CloseView = (function (_super) {
            __extends(CloseView, _super);
            function CloseView() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            CloseView.prototype.init = function () {
            };
            CloseView.prototype.draw = function () {
            };
            Object.defineProperty(CloseView.prototype, "layout", {
                get: function () {
                    return battle.Layout.RIGHT + battle.Layout.TOP;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CloseView.prototype, "offset", {
                get: function () {
                    return [battle.FightViewBase.GAP, battle.FightViewBase.GAP, 0, 0];
                },
                enumerable: true,
                configurable: true
            });
            return CloseView;
        }(battle.FightViewBase));
        battle.CloseView = CloseView;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var CtrlView = (function (_super) {
            __extends(CtrlView, _super);
            function CtrlView() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            CtrlView.prototype.init = function () {
                zt.ctrl.GameCtrl.intance.on(battle.BattleEvent.ARMY_UPDATE, this, this.onArmyUpdate);
            };
            CtrlView.prototype.onArmyUpdate = function () {
                this.updateRound();
            };
            CtrlView.prototype.updateRound = function () {
                this.round.text = "ROUND" + this._model.round;
            };
            CtrlView.prototype.draw = function () {
            };
            Object.defineProperty(CtrlView.prototype, "layout", {
                get: function () {
                    return battle.Layout.CENTER + battle.Layout.TOP;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CtrlView.prototype, "offset", {
                get: function () {
                    return [battle.FightViewBase.GAP, battle.FightViewBase.GAP, 0, 0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(CtrlView.prototype, "round", {
                get: function () { return this._ui.getChild('round').asTextField; },
                enumerable: true,
                configurable: true
            });
            return CtrlView;
        }(battle.FightViewBase));
        battle.CtrlView = CtrlView;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var LoadingView = (function (_super) {
            __extends(LoadingView, _super);
            function LoadingView() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            LoadingView.prototype.updateProgress = function (val) {
                this.progressbar.update(val);
            };
            LoadingView.prototype.init = function () {
            };
            LoadingView.prototype.draw = function () {
            };
            Object.defineProperty(LoadingView.prototype, "layout", {
                get: function () {
                    return battle.Layout.CENTER + battle.Layout.CENTER_V;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoadingView.prototype, "offset", {
                get: function () {
                    return [battle.FightViewBase.GAP, battle.FightViewBase.GAP, 0, 0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(LoadingView.prototype, "progressbar", {
                get: function () { return this._ui.getChild('bar'); },
                enumerable: true,
                configurable: true
            });
            return LoadingView;
        }(battle.FightViewBase));
        battle.LoadingView = LoadingView;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var NameLeftView = (function (_super) {
            __extends(NameLeftView, _super);
            function NameLeftView() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            NameLeftView.prototype.init = function () {
                this.addEvent();
            };
            NameLeftView.prototype.addEvent = function () {
                zt.ctrl.GameCtrl.intance.on(battle.BattleEvent.ARMY_UPDATE, this, this.onArmyUpdate);
            };
            NameLeftView.prototype.removeEvent = function () {
                zt.ctrl.GameCtrl.intance.off(battle.BattleEvent.ARMY_UPDATE, this, this.onArmyUpdate);
            };
            NameLeftView.prototype.draw = function () {
            };
            NameLeftView.prototype.onArmyUpdate = function () {
                var data;
                if (battle.getAttackerSide(this._model.type) == 'left') {
                    data = this._model.Attacker;
                }
                else {
                    data = this._model.Defender;
                }
                this.name.text = data.Name;
                this.ctrl.selectedIndex = this.getFrame(data.FactionID);
                this.loader.url = utils.getResourceURL('roleavatar/' + data.AvatarID + '.png');
            };
            Object.defineProperty(NameLeftView.prototype, "layout", {
                get: function () {
                    return battle.Layout.LEFT + battle.Layout.TOP;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NameLeftView.prototype, "offset", {
                get: function () {
                    return [battle.FightViewBase.GAP, battle.FightViewBase.GAP, 0, 0];
                },
                enumerable: true,
                configurable: true
            });
            NameLeftView.prototype.getFrame = function (FactionID) {
                switch (FactionID) {
                    case 1:
                        return 0;
                    case 2:
                        return 1;
                }
                return 2;
            };
            Object.defineProperty(NameLeftView.prototype, "fleetName", {
                get: function () { return this._ui.getChild('fleetName').asTextField; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NameLeftView.prototype, "name", {
                get: function () { return this._ui.getChild('name').asTextField; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NameLeftView.prototype, "loader", {
                get: function () { return this._ui.getChild('loader').asLoader; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NameLeftView.prototype, "ctrl", {
                get: function () { return this._ui.getController('c1'); },
                enumerable: true,
                configurable: true
            });
            return NameLeftView;
        }(battle.FightViewBase));
        battle.NameLeftView = NameLeftView;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var NameRightView = (function (_super) {
            __extends(NameRightView, _super);
            function NameRightView() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            NameRightView.prototype.init = function () {
                zt.ctrl.GameCtrl.intance.on(battle.BattleEvent.ARMY_UPDATE, this, this.onArmyUpdate);
            };
            NameRightView.prototype.draw = function () {
            };
            NameRightView.prototype.onArmyUpdate = function () {
                var data;
                if (battle.getAttackerSide(this._model.type) == 'right') {
                    data = this._model.Attacker;
                }
                else {
                    data = this._model.Defender;
                }
                if (!data)
                    return;
                this.name.text = data.Name;
                this.ctrl.selectedIndex = this.getFrame(data.FactionID);
                if (data.FactionID == 0) {
                    this.loader.url = utils.getResourceURL('mobavatar/1.png');
                }
                else {
                    this.loader.url = utils.getResourceURL('roleavatar/' + data.AvatarID + '.png');
                }
            };
            Object.defineProperty(NameRightView.prototype, "loader", {
                get: function () { return this._ui.getChild('loader').asLoader; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NameRightView.prototype, "layout", {
                get: function () {
                    return battle.Layout.RIGHT + battle.Layout.BOTTOM;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NameRightView.prototype, "offset", {
                get: function () {
                    return [battle.FightViewBase.GAP, battle.FightViewBase.GAP, 0, 0];
                },
                enumerable: true,
                configurable: true
            });
            NameRightView.prototype.getFrame = function (FactionID) {
                switch (FactionID) {
                    case 1:
                        return 0;
                    case 2:
                        return 1;
                }
                return 2;
            };
            Object.defineProperty(NameRightView.prototype, "fleetName", {
                get: function () { return this._ui.getChild('fleetName').asTextField; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NameRightView.prototype, "name", {
                get: function () { return this._ui.getChild('name').asTextField; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(NameRightView.prototype, "ctrl", {
                get: function () { return this._ui.getController('c1'); },
                enumerable: true,
                configurable: true
            });
            return NameRightView;
        }(battle.FightViewBase));
        battle.NameRightView = NameRightView;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var SkipView = (function (_super) {
            __extends(SkipView, _super);
            function SkipView() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SkipView.prototype.init = function () {
                this._ui.visible = this._model.mode == BattleMode.NORMAL;
                this._ui.onClick(this, this.onclick);
            };
            SkipView.prototype.onclick = function () {
                battle.skipBattle(this._model.getParams());
            };
            SkipView.prototype.draw = function () {
            };
            Object.defineProperty(SkipView.prototype, "layout", {
                get: function () {
                    return battle.Layout.RIGHT + battle.Layout.TOP;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SkipView.prototype, "offset", {
                get: function () {
                    return [battle.FightViewBase.GAP - 3, battle.FightViewBase.GAP + 40, 0, 0];
                },
                enumerable: true,
                configurable: true
            });
            return SkipView;
        }(battle.FightViewBase));
        battle.SkipView = SkipView;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var battle;
    (function (battle) {
        var WaveView = (function (_super) {
            __extends(WaveView, _super);
            function WaveView() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            WaveView.prototype.updateWave = function () {
                if (!this._model.Defender)
                    return;
                var curr = this._model.Defender.TotalCount - this._model.Defender.Count + 1;
                this.txt.text = "WAVE " + curr + "/" + this._model.Defender.TotalCount;
            };
            WaveView.prototype.init = function () {
                zt.ctrl.GameCtrl.intance.on(battle.BattleEvent.ARMY_UPDATE, this, this.onArmyUpdate);
            };
            WaveView.prototype.onArmyUpdate = function () {
                this.updateWave();
            };
            WaveView.prototype.draw = function () {
            };
            Object.defineProperty(WaveView.prototype, "layout", {
                get: function () {
                    return battle.Layout.RIGHT + battle.Layout.TOP;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WaveView.prototype, "offset", {
                get: function () {
                    return [battle.FightViewBase.GAP + 70, battle.FightViewBase.GAP, 0, 0];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(WaveView.prototype, "txt", {
                get: function () { return this._ui.getChild('txt').asTextField; },
                enumerable: true,
                configurable: true
            });
            return WaveView;
        }(battle.FightViewBase));
        battle.WaveView = WaveView;
    })(battle = zt.battle || (zt.battle = {}));
})(zt || (zt = {}));

//# sourceMappingURL=battle.js.map
