var zt;
(function (zt) {
    zt.onEvents = function (eventDispatcher, events, caller, listener) {
        if (typeof events === 'string')
            events = [events];
        for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
            var event_1 = events_1[_i];
            eventDispatcher.on(event_1, caller, listener);
        }
    };
})(zt || (zt = {}));
var zt;
(function (zt) {
    var framework = (function () {
        function framework() {
        }
        return framework;
    }());
    zt.framework = framework;
})(zt || (zt = {}));
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
    var Sprite = Laya.Sprite;
    var Layers = (function () {
        function Layers() {
        }
        Layers.init = function (layers) {
            var root = Layers.createLayer(Laya.stage, 0);
            root.name = 'root';
            Laya.stage.addChild(root);
            Layers._layers = {};
            var layerName, layer;
            for (var i = 0; i < layers.length; i++) {
                layerName = layers[i];
                layer = Layers.createLayer(root, i);
                layer.name = 'layer:' + layerName;
                this._layers[layerName] = layer;
                root.layerList.push(layer);
                root.addChild(layer);
            }
        };
        Layers.createLayer = function ($root, $index) {
            return new LayerNode($root, $index);
        };
        Layers.getLayer = function (layerName) {
            return Layers._layers[layerName];
        };
        return Layers;
    }());
    zt.Layers = Layers;
    var LayerNode = (function (_super) {
        __extends(LayerNode, _super);
        function LayerNode($root, index) {
            var _this = _super.call(this) || this;
            _this._layerList = [];
            _this._root = $root;
            return _this;
        }
        LayerNode.prototype.show = function () {
            this._root.repainted();
        };
        Object.defineProperty(LayerNode.prototype, "index", {
            get: function () {
                return this._index;
            },
            enumerable: true,
            configurable: true
        });
        LayerNode.prototype.hide = function () {
            this._root.removeChild(this);
        };
        LayerNode.prototype.repainted = function () {
            var layer;
            var layerListCopy = this._layerList.sort(this.sortFun);
            for (var i = 0; i < this.numChildren; i++) {
                layer = layerListCopy[i];
                this.addChild(layer);
            }
        };
        LayerNode.prototype.sortFun = function (a, b) {
            if (a.index > b.index) {
                return 1;
            }
            if (a.index < b.index) {
                return -1;
            }
        };
        Object.defineProperty(LayerNode.prototype, "layerList", {
            get: function () {
                return this._layerList;
            },
            enumerable: true,
            configurable: true
        });
        return LayerNode;
    }(Sprite));
    zt.LayerNode = LayerNode;
})(zt || (zt = {}));
var zt;
(function (zt) {
    var Loader = (function () {
        function Loader() {
        }
        Loader.loadModule = function (moduleName, onComplete, fileName) {
            if (onComplete === void 0) { onComplete = null; }
            if (fileName === void 0) { fileName = ''; }
            new zt.loader.ModuleItem().load(moduleName, fileName, onComplete);
        };
        return Loader;
    }());
    zt.Loader = Loader;
})(zt || (zt = {}));
var zt;
(function (zt) {
    var Scene = (function () {
        function Scene() {
        }
        Scene.enter = function (name, params) {
            if (params === void 0) { params = null; }
            if (Scene._switchSceneing)
                return;
            if (Scene._current)
                Scene._prevParams = Scene._current.params;
            if (Scene._current) {
                if (Scene._current.name == name) {
                    Scene.update(params);
                }
                else {
                    Scene._current.scene.dispose();
                    Scene._switchSceneing = true;
                    Scene.change(name, params);
                }
            }
            else {
                Scene.load(name, params);
            }
        };
        Scene.move = function (pos, layerName, params) {
            if (pos.x > 0 || pos.y > 0)
                throw new Error('x or y must be minus');
            Scene._current.scene.move(pos, layerName, params || {});
        };
        Scene.change = function (name, params) {
            Scene.load(name, params);
        };
        Scene.update = function (params) {
            Scene._current.update(params);
            Scene._current.scene.once('complete', this, function () {
                Scene.onBuildComplete();
            });
        };
        Scene.load = function (name, params) {
            var onAppDefinitionLoad = function (name, scene) {
                scene.params = params;
                Scene._enterScene = new zt.scene.SceneItem(name, scene, params);
                Scene.onload();
            };
            if (zt.utils.ModuleUtils.hasDefinition(name)) {
                var scene_1 = zt.utils.ModuleUtils.getInstance(name);
                scene_1.params = params;
                var sceneItem = new zt.scene.SceneItem(name, scene_1, params);
                Scene._enterScene = sceneItem;
                Scene.onload();
            }
            else
                zt.Loader.loadModule(name, Laya.Handler.create(null, onAppDefinitionLoad, [name]));
        };
        Scene.switchToPreScene = function () {
            Scene.enter(Scene.prevParams.sceneName, Scene.prevParams);
        };
        Scene.onload = function () {
            Scene._enterScene.once(zt.scene.SceneEvent.PRELOAD_COMPLETE, null, Scene.onPreloadComplete);
            Scene._enterScene.preload();
        };
        Scene.onPreloadComplete = function () {
            Scene._current && Scene._current.dispose();
            Scene._current = Scene._enterScene;
            Scene._enterScene = null;
            Scene._current.scene.once('complete', this, function () {
                Scene.onBuildComplete();
            });
            Scene._current.scene.build();
            Scene._switchSceneing = false;
        };
        Scene.onBuildComplete = function () {
            zt.ctrl.GameCtrl.intance.event(Scene.CHANGESCENE);
        };
        Object.defineProperty(Scene, "current", {
            get: function () { return Scene._current; },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(Scene, "prevParams", {
            get: function () { return Scene._prevParams; },
            enumerable: true,
            configurable: true
        });
        ;
        Scene._switchSceneing = false;
        Scene.CHANGESCENE = 'ChangeScene';
        return Scene;
    }());
    zt.Scene = Scene;
})(zt || (zt = {}));
var zt;
(function (zt) {
    var WebParams = (function () {
        function WebParams() {
        }
        WebParams.init = function () {
            if (!WebParams._isLoad) {
                WebParams._domain = decodeURIComponent(Laya.Browser.window.init().domain);
                WebParams._key = Laya.Browser.window.init().key;
                WebParams._userId = Laya.Browser.window.init().userid;
                WebParams._server = decodeURIComponent(Laya.Browser.window.init().loginServer);
                WebParams._isLoad = true;
            }
        };
        Object.defineProperty(WebParams, "domain", {
            get: function () { WebParams.init(); return WebParams._domain; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebParams, "key", {
            get: function () {
                WebParams.init();
                return WebParams._key;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebParams, "userId", {
            get: function () {
                WebParams.init();
                return WebParams._userId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebParams, "server", {
            get: function () {
                WebParams.init();
                return WebParams._server;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(WebParams, "lan", {
            get: function () {
                WebParams.init();
                return WebParams._lan;
            },
            enumerable: true,
            configurable: true
        });
        WebParams._isLoad = false;
        WebParams._lan = 'En';
        return WebParams;
    }());
    zt.WebParams = WebParams;
})(zt || (zt = {}));
var zt;
(function (zt) {
    var app;
    (function (app) {
        var Sprite = Laya.Sprite;
        var Mouse = Laya.Mouse;
        var Handler = Laya.Handler;
        var AppBase = (function (_super) {
            __extends(AppBase, _super);
            function AppBase($level) {
                if ($level === void 0) { $level = app.AppLevel.LEVEL_1; }
                var _this = _super.call(this) || this;
                _this._adaptionType = zt.AdaptationType.ADAPT_CENTER;
                _this.moduleName = '';
                _this.setLevel($level);
                _this.initEvent();
                return _this;
            }
            AppBase.prototype.init = function () {
                throw new Error('method "init" must be overrided');
            };
            AppBase.prototype.start = function () {
                zt.Facade.getIns().startModule(this.moduleName);
                if (this.level == app.AppLevel.LEVEL_0) {
                    zt.Layers.getLayer('gui').hide();
                    zt.Layers.getLayer('scene').hide();
                }
            };
            AppBase.prototype.initEvent = function () {
            };
            AppBase.prototype.superRegisterView = function ($iView, $prefix) {
                if ($prefix === void 0) { $prefix = ''; }
                $iView.setModuleName(this.moduleName, $prefix);
                zt.Facade.getIns().registerUIView($iView);
                return $iView;
            };
            AppBase.prototype.superRegisterModel = function ($iModel, $prefix) {
                if ($prefix === void 0) { $prefix = ''; }
                var imodel = $iModel.setModuleName(this.moduleName, $prefix);
                zt.Facade.getIns().registerModel($iModel);
                return $iModel;
            };
            AppBase.prototype.superRegisterController = function ($icontroller, $prefix) {
                if ($prefix === void 0) { $prefix = ''; }
                $icontroller.setModuleName(this.moduleName, $prefix);
                zt.Facade.getIns().registerController($icontroller);
                return $icontroller;
            };
            AppBase.prototype.getAppBounds = function () {
                return this.getBounds();
            };
            AppBase.prototype.adaptation = function () {
                var handler = this._adaptionType == zt.AdaptationType.ADAPT_FULL_SCREEN ? Handler.create(this, this.resize, null, false) : null;
                zt.Adaptation.register(this, this._adaptionType, handler);
            };
            AppBase.prototype.resize = function () {
                zt.ctrl.GameCtrl.intance.event('REQUEST_GUIDE');
            };
            AppBase.prototype.showSideBar = function (name, param) {
                if (!this.isShowSidebar(name)) {
                    this._sidebar.mc.removeSelf();
                    this._sidebar.showSideBar(name, param);
                    var stageW = Laya.stage.width;
                    var mainW = this.getAppBounds().width;
                    var sidebarW = this._sidebar.mc.getBounds().width;
                    this._sidebar.mc.x = mainW;
                    this.addChild(this._sidebar.mc);
                    this.xpos = stageW / 2 - (mainW + sidebarW) / 2;
                    Laya.Tween.to(this, {
                        x: this.xpos
                    }, 100);
                }
                else {
                    this._sidebar.showSideBar(name, param);
                }
            };
            AppBase.prototype.closeSidebar = function () {
                this._sidebar.clear();
            };
            AppBase.prototype.isShowSidebar = function (name) {
                return this._sidebar.currName == name;
            };
            AppBase.prototype.getSidebarView = function (name) {
                return this._sidebar.getView(name);
            };
            AppBase.prototype.createSidebar = function (arr) {
                if (this._sidebar == null) {
                    this._sidebar = new app.AppSidebar(arr);
                    this.addChild(this._sidebar.mc);
                }
            };
            AppBase.prototype.setSidebarRenderer = function (name, renderer) {
                this._sidebar.setSidebarRenderer(name, renderer);
            };
            Object.defineProperty(AppBase.prototype, "sidebarList", {
                get: function () {
                    return [];
                },
                enumerable: true,
                configurable: true
            });
            AppBase.prototype.onMouseDown = function (e) {
                e.stopPropagation();
                if (e.target != this.dragRect)
                    return;
                this.startDrag();
                Mouse.cursor = 'pointer';
            };
            AppBase.prototype.onMouseUp = function (e) {
                e.stopPropagation();
                this.stopDrag();
                Mouse.cursor = 'default';
            };
            AppBase.prototype.load = function () {
                throw new Error('load method must be overrided');
            };
            Object.defineProperty(AppBase.prototype, "res", {
                get: function () {
                    throw new Error('res method must be overrided');
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AppBase.prototype, "cmds", {
                get: function () { return []; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AppBase.prototype, "dragRect", {
                get: function () {
                    return null;
                },
                enumerable: true,
                configurable: true
            });
            AppBase.prototype.startDispose = function () {
                this.event(app.AppEvent.START_DISPOSE);
            };
            Object.defineProperty(AppBase.prototype, "params", {
                set: function (val) {
                    this._params = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AppBase.prototype, "level", {
                get: function () {
                    return this._level;
                },
                enumerable: true,
                configurable: true
            });
            AppBase.prototype.setLevel = function ($level) {
                this._level = $level;
            };
            AppBase.prototype.dispose = function () {
                if (this._sidebar != null) {
                    this._sidebar.dispose();
                }
                if (this._params && this._params.onClose) {
                    this._params.onClose.run();
                }
                zt.Adaptation.unregister(this, this._adaptionType);
                zt.effects.disposeModule(this.moduleName);
                this._sidebar = null;
                this.removeSelf();
                this.disposeTexture();
                zt.Facade.getIns().removeModule(this.moduleName);
                zt.ctrl.GameCtrl.intance.event('AppClose', this.moduleName);
                if (this.level == app.AppLevel.LEVEL_0) {
                    zt.Layers.getLayer('gui').show();
                    zt.Layers.getLayer('scene').show();
                }
            };
            Object.defineProperty(AppBase.prototype, "adaptionType", {
                get: function () {
                    return this._adaptionType;
                },
                enumerable: true,
                configurable: true
            });
            AppBase.prototype.disposeTexture = function () {
                var res = this.res;
                var url = '';
                for (var _i = 0, res_1 = res; _i < res_1.length; _i++) {
                    var urlObj = res_1[_i];
                    url = urlObj.url;
                    Laya.loader.clearRes(url, true);
                }
            };
            return AppBase;
        }(Sprite));
        app.AppBase = AppBase;
    })(app = zt.app || (zt.app = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var app;
    (function (app_1) {
        var AppCaches = (function () {
            function AppCaches() {
                this._apps = {};
                this._levelApps = {};
                this.resetMask();
            }
            AppCaches.prototype.add = function (name, app) {
                var appItem = new app_1.AppItem(name, app);
                if (this.getItem(appItem.name) == null) {
                    this._apps[appItem.name] = appItem;
                }
                if (this._levelApps[appItem.level] == null) {
                    this._levelApps[appItem.level] = [];
                }
                if (this._levelApps[appItem.level].indexOf(name) < 0) {
                    this._levelApps[appItem.level].push(name);
                }
                appItem.once(app_1.AppEvent.DISPOSE, this, this.onAppDispose, [appItem]);
                appItem.once(app_1.AppEvent.PRELOAD_COMPLETE, this, this.onAppPreloadComplete, [appItem]);
                return appItem;
            };
            AppCaches.prototype.closeLevelApps = function (level) {
                if (this._levelApps[level] == null) {
                    return;
                }
                for (var _i = 0, _a = this._levelApps[level]; _i < _a.length; _i++) {
                    var name_1 = _a[_i];
                    var appItem = this.getItem(name_1);
                    appItem.onStartDispose();
                }
            };
            AppCaches.prototype.closeAllApp = function () {
                for (var name_2 in this._apps) {
                    var appItem = this._apps[name_2];
                    appItem.onStartDispose();
                }
            };
            Object.defineProperty(AppCaches.prototype, "isMultiLevel", {
                get: function () {
                    var num = 0;
                    for (var lv in this._levelApps) {
                        if (this._levelApps[lv] != null && this._levelApps[lv].length > 0) {
                            num++;
                        }
                    }
                    return num > 1 ? true : false;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AppCaches.prototype, "currLevelApp", {
                get: function () {
                    var currItem;
                    var level = 0;
                    for (var lv in this._levelApps) {
                        var tempLv = parseInt(lv);
                        if (this._levelApps[lv] != null && this._levelApps[lv].length > 0 && tempLv >= level) {
                            level = tempLv;
                            currItem = this.getItem(this._levelApps[lv][0]);
                        }
                    }
                    return currItem;
                },
                enumerable: true,
                configurable: true
            });
            AppCaches.prototype.onAppDispose = function (appItem) {
                delete this._apps[appItem.name];
                if (this._levelApps[appItem.level] != null) {
                    var index = this._levelApps[appItem.level].indexOf(appItem.name);
                    if (index >= 0) {
                        this._levelApps[appItem.level].splice(index, 1);
                    }
                }
                zt.ctrl.GameCtrl.intance.event(app_1.AppEvent.APP_DISPOSE, appItem.name);
                this.updateLevelMask();
            };
            AppCaches.prototype.onAppPreloadComplete = function (appItem) {
                this.updateLevelMask();
            };
            AppCaches.prototype.getItem = function (name) {
                return this._apps[name];
            };
            AppCaches.prototype.appCloseCheck = function (applevel) {
                if (applevel == app.AppLevel.LEVEL_0) {
                    this.closeAllApp();
                }
                else {
                    this.closeLevelApps(applevel);
                }
            };
            AppCaches.prototype.updateLevelMask = function () {
                if (this.isMultiLevel) {
                    this.showMask();
                }
                else {
                    this.hideMask();
                }
            };
            AppCaches.prototype.showMask = function () {
                var _this = this;
                if (this._mask == null) {
                    this._mask = new Sprite();
                    this._mask.alpha = this._alpha;
                    this._mask.mouseThrough = true;
                    this._mask.on(Laya.Event.MOUSE_DOWN, this, function (e) {
                        e.stopPropagation();
                    });
                    zt.Adaptation.registerFunc('app_mask', function () {
                        _this._mask.graphics.clear();
                        _this._mask.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, _this._color);
                    });
                    this._mask.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, this._color);
                }
                this._mask.visible = true;
                zt.Layers.getLayer('app').addChild(this._mask);
                var currItem = this.currLevelApp;
                var index = zt.Layers.getLayer('app').getChildIndex(currItem.app);
                if (index >= 0) {
                    currItem.topup();
                }
            };
            AppCaches.prototype.hideMask = function () {
                if (this._mask != null) {
                    this._mask.visible = false;
                }
            };
            AppCaches.prototype.updateMask = function (color, alpha) {
                this._color = color;
                this._alpha = alpha;
                if (this._mask) {
                    this._mask.alpha = alpha;
                    this._mask.graphics.clear();
                    this._mask.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, this._color);
                }
            };
            AppCaches.prototype.resetMask = function () {
                this._color = AppCaches.DEFAULT_COLOR;
                this._alpha = zt.DEFAULT_MASK_ALPHA;
                if (this._mask) {
                    this._mask.alpha = this._alpha;
                    this._mask.graphics.clear();
                    this._mask.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, this._color);
                }
            };
            AppCaches.DEFAULT_COLOR = '#000000';
            return AppCaches;
        }());
        app_1.AppCaches = AppCaches;
    })(app = zt.app || (zt.app = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var app;
    (function (app) {
        var AppEvent = (function () {
            function AppEvent() {
            }
            AppEvent.RES_LOAD = 'resload';
            AppEvent.START_DISPOSE = 'start_dispose';
            AppEvent.DISPOSE = 'dispose';
            AppEvent.APP_DISPOSE = 'app_dispose';
            AppEvent.PRELOAD_COMPLETE = 'preloadComplete';
            return AppEvent;
        }());
        app.AppEvent = AppEvent;
    })(app = zt.app || (zt.app = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var app;
    (function (app_2) {
        var Handler = Laya.Handler;
        var Tween = Laya.Tween;
        var EventDispatcher = Laya.EventDispatcher;
        var Layers = zt.Layers;
        var AppItem = (function (_super) {
            __extends(AppItem, _super);
            function AppItem(name, app) {
                var _this = _super.call(this) || this;
                _this._resLoaded = false;
                _this._dataLoaded = false;
                _this._name = name;
                _this._app = app;
                _this._app.on(app_2.AppEvent.START_DISPOSE, _this, _this.onStartDispose);
                return _this;
            }
            AppItem.prototype.start = function (noLoading) {
                !noLoading && zt.showAppLoading();
                this.loadRes();
                this.loadData();
            };
            AppItem.prototype.topup = function () { Layers.getLayer('app').addChild(this._app); };
            AppItem.prototype.loadRes = function () {
                Laya.loader.load(this._app.res, Handler.create(this, this.onResLoad), Handler.create(this, this.onResProgress, null, false));
            };
            AppItem.prototype.loadData = function () {
                var _this = this;
                var calls = new zt.Calls();
                calls.addCmds(this._app.cmds);
                calls.once(Laya.Event.COMPLETE, this, function () {
                    _this._dataLoaded = true;
                    _this.checkComplete();
                });
                calls.start();
            };
            AppItem.prototype.onResLoad = function () {
                this.event(app_2.AppEvent.RES_LOAD);
                this._resLoaded = true;
                this._app.init();
                this._app.createSidebar(this._app.sidebarList);
                this.checkComplete();
            };
            AppItem.prototype.onResProgress = function (val) {
                zt.updateAppLoading(val);
            };
            AppItem.prototype.checkComplete = function () {
                if (this._resLoaded && this._dataLoaded) {
                    zt.hideAppLoading();
                    this.event(app_2.AppEvent.PRELOAD_COMPLETE);
                    Laya.timer.frameOnce(2, this, this.onRenderComplete);
                }
            };
            AppItem.prototype.onStartDispose = function () {
                this._app.off(app_2.AppEvent.START_DISPOSE, this, this.onStartDispose);
                Tween.to(this._app, {
                    x: this._openX,
                    y: this._openY,
                    scaleX: 0,
                    scaleY: 0
                }, AppItem.ANIMATION_MS, null, Handler.create(this, this.onDisposeAnimationComplete));
            };
            AppItem.prototype.onDisposeAnimationComplete = function () {
                this._app.dispose();
                this.event(app_2.AppEvent.DISPOSE);
            };
            AppItem.prototype.onRenderComplete = function () {
                this.topup();
                var w1 = Laya.stage.width;
                var h1 = Laya.stage.height;
                var w2 = this._app.getAppBounds().width;
                var h2 = this._app.getAppBounds().height;
                this._openX = Laya.stage.mouseX;
                this._openY = Laya.stage.mouseY;
                this._app.pos(this._openX, this._openY);
                this._app.scale(0, 0);
                if (this.app.adaptionType == zt.AdaptationType.ADAPT_OPEN_POS) {
                    this._app.xpos = this._openX;
                    this._app.ypos = this._openY;
                }
                else {
                    this._app.xpos = w1 / 2 - w2 / 2;
                    this._app.ypos = h1 / 2 - h2 / 2;
                }
                this._app.start();
                this._app.adaptation();
                Tween.to(this._app, {
                    x: this._app.xpos,
                    y: this._app.ypos,
                    scaleX: 1,
                    scaleY: 1
                }, AppItem.ANIMATION_MS, null, Handler.create(this.app, this.app.resize, null));
            };
            AppItem.prototype.dispose = function () {
                Tween.to(this._app, {
                    x: this._openX,
                    y: this._openY,
                    scaleX: 0,
                    scaleY: 0
                }, AppItem.ANIMATION_MS);
            };
            Object.defineProperty(AppItem.prototype, "name", {
                get: function () { return this._name; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AppItem.prototype, "level", {
                get: function () { return this._app.level; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AppItem.prototype, "app", {
                get: function () { return this._app; },
                enumerable: true,
                configurable: true
            });
            AppItem.ANIMATION_MS = 180;
            return AppItem;
        }(EventDispatcher));
        app_2.AppItem = AppItem;
    })(app = zt.app || (zt.app = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var AppCaches = zt.app.AppCaches;
    var App = (function () {
        function App() {
        }
        App.load = function (name, params, cb, noLoading) {
            if (noLoading === void 0) { noLoading = false; }
            var current = App.appCaches.getItem(name);
            if (current) {
                App.topup(current);
                return;
            }
            App._currAppName = name;
            var onAppDefinitionLoad = function (name, app) {
                App.appCaches.appCloseCheck(app.level);
                app.moduleName = name;
                var appItem = App.appCaches.add(name, app);
                app.params = params;
                appItem.start(noLoading);
                cb && cb.runWith(appItem);
            };
            if (zt.utils.ModuleUtils.hasDefinition(name)) {
                var app_3 = zt.utils.ModuleUtils.getInstance(name);
                onAppDefinitionLoad(name, app_3);
            }
            else
                zt.Loader.loadModule(name, Laya.Handler.create(null, onAppDefinitionLoad, [name]));
        };
        App.updateMask = function (color, alpha) {
            App.appCaches.updateMask(color, alpha);
        };
        App.resetMaskColor = function () {
            App.appCaches.resetMask();
        };
        App.topup = function (app) { app.topup(); };
        Object.defineProperty(App, "appCaches", {
            get: function () {
                return this._appCaches || (this._appCaches = new AppCaches());
            },
            enumerable: true,
            configurable: true
        });
        return App;
    }());
    zt.App = App;
})(zt || (zt = {}));
var zt;
(function (zt) {
    var app;
    (function (app) {
        var AppLevel = (function () {
            function AppLevel() {
            }
            AppLevel.LEVEL_0 = 0;
            AppLevel.LEVEL_1 = 1;
            AppLevel.LEVEL_2 = 2;
            return AppLevel;
        }());
        app.AppLevel = AppLevel;
    })(app = zt.app || (zt.app = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var Sprite = Laya.Sprite;
    var AppLoading = (function (_super) {
        __extends(AppLoading, _super);
        function AppLoading() {
            var _this = _super.call(this) || this;
            _this.initEvent();
            return _this;
        }
        AppLoading.prototype.initEvent = function () {
        };
        AppLoading.prototype.draw = function () {
            this._mask = new Sprite();
            this.addChild(this._mask);
            this._mask.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, '#000000');
            this.size(Laya.stage.width, Laya.stage.height);
            this._mask.alpha = 0.5;
            this._mask.mouseEnabled = true;
            this._ui = fairygui.UIPackage.createObject('lib', 'apploading');
            this._ui.update(20);
            this._ui.displayObject.pivot(this._ui.displayObject.width / 2, this._ui.displayObject.height / 2);
            this.addChild(this._ui.displayObject);
            this._ui.displayObject.x = Laya.stage.width / 2;
            this._ui.displayObject.y = Laya.stage.height / 2;
        };
        Object.defineProperty(AppLoading.prototype, "free", {
            set: function (val) {
                this._free = val;
            },
            enumerable: true,
            configurable: true
        });
        AppLoading.prototype.dispose = function () {
            this.free = true;
        };
        AppLoading.prototype.show = function () {
            this.draw();
            Laya.stage.addChild(this);
        };
        AppLoading.prototype.hide = function () {
            this.removeChildren();
            this.removeSelf();
            this._mask = null;
            this._ui = null;
        };
        AppLoading.prototype.update = function (val) {
            this._ui && this._ui.update(val * 100 * 0.8 + 20);
        };
        Object.defineProperty(AppLoading, "instance", {
            get: function () {
                return AppLoading._instance || (AppLoading._instance = new AppLoading());
            },
            enumerable: true,
            configurable: true
        });
        return AppLoading;
    }(Laya.Sprite));
    zt.AppLoading = AppLoading;
    zt.showAppLoading = function () {
        AppLoading.instance.show();
    };
    zt.hideAppLoading = function () {
        AppLoading.instance.hide();
    };
    zt.updateAppLoading = function (val) {
        AppLoading.instance.update(val);
    };
})(zt || (zt = {}));
var zt;
(function (zt) {
    var app;
    (function (app) {
        var AppSidebar = (function () {
            function AppSidebar(sidebarList) {
                this._mc = new Laya.Sprite();
                this._sidebarList = sidebarList;
                this._currName = '';
                this._viewList = {};
                this._uiList = {};
                this._rendererList = {};
            }
            AppSidebar.prototype.setSidebarRenderer = function (name, renderer) {
                if (this.indexOfSidebar(name) < 0) {
                    return;
                }
                this._rendererList[name] = renderer;
            };
            AppSidebar.prototype.showSideBar = function (name, param) {
                var index = this.indexOfSidebar(name);
                if (index < 0) {
                    return;
                }
                if (!this._viewList.hasOwnProperty(name)) {
                    var ui = this._sidebarList[index][name];
                    var cls = this._sidebarList[index]['type'];
                    var paramList = [ui];
                    if (this._sidebarList[index]['params'] != null) {
                        paramList = paramList.concat(this._sidebarList[index]['params']);
                    }
                    paramList.push(param);
                    cls.apply(cls, paramList);
                    this._viewList[name] = cls.prototype;
                    this._uiList[name] = ui;
                }
                if (this._currName != '' && this._currName != name) {
                    var currUi = this._uiList[this._currName];
                    this._mc.removeChild(currUi.displayObject);
                }
                this._mc.addChild(this._uiList[name].displayObject);
                this._currName = name;
                if (this._rendererList[name] != null) {
                    var renderer = this._rendererList[name];
                    renderer.runWith([this._viewList[name], param]);
                }
            };
            AppSidebar.prototype.getView = function (name) {
                return this._viewList[name];
            };
            Object.defineProperty(AppSidebar.prototype, "mc", {
                get: function () {
                    return this._mc;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AppSidebar.prototype, "currName", {
                get: function () {
                    return this._currName;
                },
                enumerable: true,
                configurable: true
            });
            AppSidebar.prototype.indexOfSidebar = function (name) {
                for (var i = 0; i < this._sidebarList.length; i++) {
                    if (this._sidebarList[i].hasOwnProperty(name)) {
                        return i;
                    }
                }
                return -1;
            };
            AppSidebar.prototype.clear = function () {
                this._mc.removeSelf();
                this._currName = '';
            };
            AppSidebar.prototype.dispose = function () {
                if (this._viewList != null) {
                    for (var key in this._viewList) {
                        this._viewList[key].dispose();
                    }
                }
                this._viewList = null;
                if (this._uiList != null) {
                    for (var key in this._uiList) {
                        this._uiList[key].dispose();
                    }
                }
                this._uiList = null;
                if (this._mc != null) {
                    this._mc.destroy(true);
                }
                this._mc = null;
            };
            return AppSidebar;
        }());
        app.AppSidebar = AppSidebar;
    })(app = zt.app || (zt.app = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var ctrl;
    (function (ctrl) {
        var EventDispatcher = Laya.EventDispatcher;
        var GameCtrl = (function (_super) {
            __extends(GameCtrl, _super);
            function GameCtrl() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            Object.defineProperty(GameCtrl, "intance", {
                get: function () {
                    if (GameCtrl.mInstance)
                        return GameCtrl.mInstance;
                    GameCtrl.mInstance = new GameCtrl();
                    return GameCtrl.mInstance;
                },
                enumerable: true,
                configurable: true
            });
            return GameCtrl;
        }(EventDispatcher));
        ctrl.GameCtrl = GameCtrl;
    })(ctrl = zt.ctrl || (zt.ctrl = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var data;
    (function (data_1) {
        var BaseDataHash = (function () {
            function BaseDataHash(name, data, mainKeys, itemCls) {
                if (data === void 0) { data = null; }
                if (mainKeys === void 0) { mainKeys = null; }
                if (itemCls === void 0) { itemCls = null; }
                this._values = [];
                this._keys = [];
                this._dic = {};
                this._name = name;
                this._itemCls = itemCls ? itemCls : this.defaultItemCls;
                this._mainKeys = mainKeys instanceof Array ? mainKeys : [mainKeys];
                var list;
                data = data ? data : [];
                list = typeof data == 'string' ? JSON.parse(data) : data;
                for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                    var listItem = list_1[_i];
                    var item = new this._itemCls(listItem);
                    this._values.indexOf(item) == -1 && this._values.push(item);
                    var key = this.getItemKey(this._mainKeys, item);
                    this._keys.indexOf(key) == -1 && this._keys.push(key);
                    this._dic[key] = item;
                }
                list = null;
            }
            BaseDataHash.prototype.getlength = function () {
                return this._keys.length;
            };
            BaseDataHash.prototype.getList = function () {
                return this._dic;
            };
            BaseDataHash.prototype.getItemByMainKey = function (keyId) {
                if (keyId instanceof Array) {
                    keyId = keyId.join(BaseDataHash.KEY_SPACE);
                }
                return this._dic[keyId];
            };
            BaseDataHash.prototype.searhItems = function (keyName, keyValue) {
                return keyName instanceof Array ?
                    this.searchItemsByKeys(keyName, keyValue) :
                    this.searchItemsByKey(keyName, keyValue);
            };
            BaseDataHash.prototype.searchItemsByKey = function (key, keyId) {
                if ([key] == this._mainKeys)
                    return [this.getItemByMainKey(keyId)];
                var result = [];
                for (var _i = 0, _a = this._values; _i < _a.length; _i++) {
                    var valueItem = _a[_i];
                    var itemKey = valueItem[key];
                    if (itemKey == keyId) {
                        result.push(valueItem);
                    }
                }
                return result;
            };
            BaseDataHash.prototype.searchItemsByKeys = function (keys, keyIds) {
                var key = keys.join(BaseDataHash.KEY_SPACE);
                var keyValue = keyIds.join(BaseDataHash.KEY_SPACE);
                if (this._mainKeys instanceof Array && key == this._mainKeys.join(BaseDataHash.KEY_SPACE))
                    return [this.getItemByMainKey(keyValue)];
                var result = [];
                for (var _i = 0, _a = this._values; _i < _a.length; _i++) {
                    var valueItem = _a[_i];
                    var itemKey = this.getItemKey(keys, valueItem);
                    if (itemKey == keyValue) {
                        result.push(valueItem);
                    }
                }
                return result;
            };
            BaseDataHash.prototype.checkMainKey = function (item) {
                var mainKey = this._mainKeys instanceof Array ? this._mainKeys : [this._mainKeys];
                for (var _i = 0, mainKey_1 = mainKey; _i < mainKey_1.length; _i++) {
                    var key = mainKey_1[_i];
                    var tmp = item[key];
                    if (!tmp)
                        return null;
                }
                return true;
            };
            BaseDataHash.prototype.getItemKey = function (keys, data) {
                return keys.length == 1 ?
                    data[keys[0]] :
                    keys.reduce(function (p, n) {
                        var t = p[0].toLowerCase() + p.substring(1, p.length);
                        n = n[0].toLowerCase() + n.substring(1, n.length);
                        if (data.hasOwnProperty(t)) {
                            return data[t] + BaseDataHash.KEY_SPACE + data[n];
                        }
                        else {
                            return p + BaseDataHash.KEY_SPACE + data[n];
                        }
                    });
            };
            Object.defineProperty(BaseDataHash.prototype, "defaultItemCls", {
                get: function () { return data_1.BaseDataItem; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseDataHash.prototype, "length", {
                get: function () { return this._values.length; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseDataHash.prototype, "name", {
                get: function () { return this._name; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseDataHash.prototype, "values", {
                get: function () { return this._values.concat(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseDataHash.prototype, "keys", {
                get: function () { return this._keys.concat(); },
                enumerable: true,
                configurable: true
            });
            BaseDataHash.KEY_SPACE = '_';
            return BaseDataHash;
        }());
        data_1.BaseDataHash = BaseDataHash;
    })(data = zt.data || (zt.data = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var data;
    (function (data) {
        var BaseDataItem = (function (_super) {
            __extends(BaseDataItem, _super);
            function BaseDataItem(d) {
                var _this = _super.call(this) || this;
                for (var key in d) {
                    _this.setPropRead(key, d);
                }
                return _this;
            }
            BaseDataItem.prototype.setPropRead = function (key, d) {
                Object.defineProperty(this, '_' + key, { value: d[key], writable: true, enumerable: false, configurable: true });
                var key1 = key[0].toLowerCase() + key.substring(1, key.length);
                Object.defineProperty(this, key1, { get: function () { return this['_' + key]; }, enumerable: false, configurable: true });
            };
            return BaseDataItem;
        }(Laya.EventDispatcher));
        data.BaseDataItem = BaseDataItem;
    })(data = zt.data || (zt.data = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var data;
    (function (data_2) {
        var DataHash = (function (_super) {
            __extends(DataHash, _super);
            function DataHash(name, data, mainKey, itemCls) {
                if (data === void 0) { data = ''; }
                if (mainKey === void 0) { mainKey = 'ID'; }
                if (itemCls === void 0) { itemCls = null; }
                return _super.call(this, name, data, mainKey, itemCls) || this;
            }
            Object.defineProperty(DataHash.prototype, "defaultItemCls", {
                get: function () { return data_2.DataItem; },
                enumerable: true,
                configurable: true
            });
            DataHash.prototype.removeItem = function (item) {
                if (!this.checkMainKey(item))
                    return null;
                var key = this.getItemKey(this._mainKeys, item);
                var preItem = this.getItemByMainKey(key);
                delete this._dic[key];
                var index = this._keys.indexOf(key);
                index != -1 && this._keys.splice(index, 1);
                index = this._values.indexOf(preItem);
                index != -1 && this._values.splice(index, 1);
                zt.ctrl.GameCtrl.intance.event(DataHash.D_DEL + this.name, preItem);
                return item;
            };
            DataHash.prototype.clearAll = function () {
                for (var _i = 0, _a = this._keys; _i < _a.length; _i++) {
                    var key = _a[_i];
                    this._dic[key] = null;
                    delete this._dic[key];
                }
                this._keys = [];
                this._values = [];
            };
            DataHash.prototype.updateItem = function (item) {
                if (!this.checkMainKey(item))
                    return null;
                var key = this.getItemKey(this._mainKeys, item);
                var preItem = this.getItemByMainKey(key);
                if (preItem == null) {
                    preItem = this.addItem(item);
                }
                else {
                    if (preItem.hasOwnProperty('hasUpdate')) {
                        preItem.update(item);
                    }
                    else {
                        var index = this._values.indexOf(item);
                        index == -1 ? this._values.push(item) : this._values[index] = item;
                        this._dic[key] = item;
                        preItem = item;
                    }
                    zt.ctrl.GameCtrl.intance.event(DataHash.D_UP + this.name, preItem);
                }
                return preItem;
            };
            DataHash.prototype.addItem = function (item) {
                if (!this.checkMainKey(item))
                    return null;
                var key = this.getItemKey(this._mainKeys, item);
                var preItem = this.getItemByMainKey(key);
                if (!preItem) {
                    this._itemCls != null && (item = new this._itemCls(item));
                    this._dic[key] = item;
                    this._values.indexOf(item) == -1 && this._values.push(item);
                    this._keys.indexOf(key) == -1 && this._keys.push(key);
                    zt.ctrl.GameCtrl.intance.event(DataHash.D_ADD + this.name, item);
                    return item;
                }
                return preItem;
            };
            DataHash.D_UP = 'D_UP_';
            DataHash.D_DEL = 'D_DEL_';
            DataHash.D_ADD = 'D_ADD_';
            return DataHash;
        }(data_2.BaseDataHash));
        data_2.DataHash = DataHash;
    })(data = zt.data || (zt.data = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var data;
    (function (data) {
        var DataItem = (function (_super) {
            __extends(DataItem, _super);
            function DataItem(d) {
                var _this = _super.call(this, d) || this;
                _this.hasUpdate = 1;
                return _this;
            }
            DataItem.prototype.update = function (d) {
                if (!d)
                    return;
                for (var key in d) {
                    if ('_' + key in this)
                        this['_' + key] = d[key];
                    else
                        this.setPropRead(key, d);
                }
            };
            DataItem.prototype.updataByMode = function (d, p) {
                if (p === void 0) { p = []; }
                if (!d)
                    return;
                for (var key in d) {
                    if (p.length == 0 || p.indexOf(key) == -1)
                        continue;
                    switch (d['Mode']) {
                        case 'Sub':
                            if ('_' + key in this)
                                this['_' + key] -= d[key];
                            break;
                        case 'Add':
                            if ('_' + key in this)
                                this['_' + key] += d[key];
                            break;
                    }
                }
            };
            return DataItem;
        }(data.BaseDataItem));
        data.DataItem = DataItem;
    })(data = zt.data || (zt.data = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var manager;
    (function (manager) {
        var DataHash = zt.data.DataHash;
        var BaseDataHash = zt.data.BaseDataHash;
        var DataManager = (function () {
            function DataManager() {
                this._cache = {};
                this._waitPool = {};
            }
            Object.defineProperty(DataManager, "inst", {
                get: function () {
                    return this._instance || (this._instance = new DataManager());
                },
                enumerable: true,
                configurable: true
            });
            DataManager.prototype.registSysDataHash = function (name, data, mainKeys, itemCls, hashCls, buildNow) {
                if (mainKeys === void 0) { mainKeys = null; }
                if (itemCls === void 0) { itemCls = null; }
                if (hashCls === void 0) { hashCls = null; }
                if (buildNow === void 0) { buildNow = false; }
                hashCls = hashCls ? hashCls : BaseDataHash;
                if (!this._cache[name] && buildNow) {
                    this._cache[name] = new hashCls(name, data, mainKeys, itemCls);
                }
                else {
                    this._waitPool[name] = [name, data, itemCls, hashCls, mainKeys];
                }
                return this._cache[name];
            };
            DataManager.prototype.getSysDataHash = function (name) {
                if (this._waitPool[name]) {
                    var arr = this._waitPool[name];
                    var hashCls = (arr[3] ? arr[3] : BaseDataHash);
                    var data_3 = arr[1];
                    var itemCls = arr[2];
                    var mainKey = arr[4];
                    var dataHash = new hashCls(name, data_3, mainKey, itemCls);
                    delete this._waitPool[name];
                    this._cache[name] = dataHash;
                }
                return this._cache[name];
            };
            DataManager.prototype.getDataHash = function (name) {
                if (this._waitPool[name]) {
                    var arr = this._waitPool[name];
                    var hashCls = (arr[3] ? arr[3] : BaseDataHash);
                    var data_4 = arr[1];
                    var itemCls = arr[2];
                    var mainKey = arr[4];
                    var dataHash = new hashCls(name, data_4, mainKey, itemCls);
                    delete this._waitPool[name];
                    this._cache[name] = dataHash;
                }
                return this._cache[name];
            };
            DataManager.prototype.registDataHash = function (name, data, mainKey, itemCls, hashCls, buildNow) {
                if (itemCls === void 0) { itemCls = null; }
                if (hashCls === void 0) { hashCls = null; }
                if (buildNow === void 0) { buildNow = false; }
                hashCls = hashCls ? hashCls : DataHash;
                if (!this._cache[name] && buildNow) {
                    this._cache[name] = new hashCls(name, data, mainKey, itemCls);
                }
                else {
                    this._waitPool[name] = [name, data, itemCls, hashCls, mainKey];
                }
                return this._cache[name];
            };
            return DataManager;
        }());
        manager.DataManager = DataManager;
    })(manager = zt.manager || (zt.manager = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    zt.reload = function () { return window.location.reload(); };
})(zt || (zt = {}));
var zt;
(function (zt) {
    var effects;
    (function (effects) {
        var Event = Laya.Event;
        var AniFactory = (function () {
            function AniFactory() {
                this._effectCache = {};
                this._moduleCache = {};
            }
            AniFactory.getInstance = function () {
                if (!this._ins) {
                    this._ins = new AniFactory();
                }
                return this._ins;
            };
            AniFactory.prototype.createEffect = function ($url, $module, $endToRemove, $once, $callBack) {
                if ($endToRemove === void 0) { $endToRemove = true; }
                if ($once === void 0) { $once = false; }
                if ($callBack === void 0) { $callBack = null; }
                var moduleEffect = this._effectCache[$module];
                if (moduleEffect == null) {
                    moduleEffect = {};
                    this._effectCache[$module] = moduleEffect;
                }
                var effectList = this._effectCache[$module][$url];
                var effect;
                if (!effectList || effectList.length == 0) {
                    effect = new effects.Effect($url, $once, $endToRemove, $callBack);
                    effect.index = 0;
                    effect.module = $module;
                    effect.isSingle = false;
                    effect.on('play_complete', this, this.effectComplete);
                    if (!effectList)
                        effectList = [];
                    this._effectCache[$module][$url] = effectList;
                }
                else {
                    effect = effectList.pop();
                    effect.index = 0;
                    effect.callBack = $callBack;
                }
                return effect;
            };
            AniFactory.prototype.createSingleEffect = function ($url, $module, $endToRemove, $once, $callBack) {
                if ($endToRemove === void 0) { $endToRemove = true; }
                if ($once === void 0) { $once = false; }
                if ($callBack === void 0) { $callBack = null; }
                var effect = this._effectCache[$url];
                if (!effect) {
                    effect = new effects.Effect($url, $once, $endToRemove, $callBack);
                    effect.module = $module;
                    effect.isSingle = true;
                    effect.on('play_complete', this, this.effectComplete);
                    var moudleList = void 0;
                    if ($module != '' && $module != undefined) {
                        moudleList = this._moduleCache[$module];
                        if (moudleList == null) {
                            moudleList = [];
                            this._moduleCache[$module] = moudleList;
                        }
                        if (moudleList.indexOf($url) == -1) {
                            moudleList.push($url);
                        }
                    }
                    this._effectCache[$url] = effect;
                }
                return effect;
            };
            AniFactory.prototype.effectComplete = function ($target, force) {
                if (force === void 0) { force = false; }
                var target = $target;
                if (target.callBack) {
                    target.callBack();
                }
                if (target.isOnce) {
                    delete this._effectCache[$target.module];
                    target.off('play_complete', this, this.effectComplete);
                    target.destroy(true);
                    Laya.loader.clearRes(target.url, true);
                }
                if (target.loop && target.endToRemove) {
                    alert('循环播放特效不需要结束时移除');
                    return;
                }
                if (target.endToRemove || force) {
                    target.removeSelf();
                    if (target.isSingle == false) {
                        this.resyleEffectGroup(target);
                    }
                }
            };
            AniFactory.prototype.clearSingleEffect = function ($url) {
                var effect = this._effectCache[$url];
                if (effect == null)
                    return;
                var effectList;
                var index = 0;
                effect.removeSelf();
            };
            AniFactory.prototype.resyleEffectGroup = function ($effect) {
                $effect.x = 0;
                $effect.y = 0;
                $effect.index = 0;
                $effect.isCenter = false;
                var module = $effect.module;
                var url = $effect.url;
                var effectObj = this._effectCache[module];
                if (!effectObj || effectObj && !effectObj[url]) {
                    this.disposeEffect($effect);
                }
                else {
                    var effectList = effectObj[url];
                    effectList.push($effect);
                    $effect.removeSelf();
                }
            };
            AniFactory.prototype.disposeByUrl = function ($url) {
                var effect = this._effectCache[$url];
                if (effect == null)
                    return;
                delete this._effectCache[$url];
                this.disposeEffect(effect);
            };
            AniFactory.prototype.disposeEffect = function (effect) {
                if (effect.hasListener(Event.COMPLETE)) {
                    effect.off('play_complete', this, this.effectComplete);
                }
                effect.destroy(true);
            };
            AniFactory.prototype.disposeModule = function ($module) {
                var effectList = this._moduleCache[$module];
                var effect;
                var url = "";
                if (effectList) {
                    for (var _i = 0, effectList_1 = effectList; _i < effectList_1.length; _i++) {
                        var url_1 = effectList_1[_i];
                        this.disposeByUrl(url_1);
                        Laya.loader.clearRes(url_1, true);
                    }
                }
                var effectObj = this._effectCache[$module];
                if (!effectObj)
                    return;
                for (var key in effectObj) {
                    var effectList_2 = effectObj[key];
                    for (var _a = 0, effectList_3 = effectList_2; _a < effectList_3.length; _a++) {
                        var ani = effectList_3[_a];
                        this.disposeEffect(ani);
                        Laya.loader.clearRes(ani.url, true);
                    }
                }
                delete this._effectCache[$module];
            };
            AniFactory.prototype.createFightEffect = function ($url, $x, $y, $isContray, $length, $parent, $isAttack) {
                var skillEffect = new effects.SkillEffect($url, $x, $y, $isContray, $length, $parent, $isAttack);
                skillEffect.module = 'battle';
                return skillEffect;
            };
            AniFactory.prototype.dispose = function () {
                for (var key in this._moduleCache) {
                    this.disposeModule(key);
                }
            };
            return AniFactory;
        }());
        effects.AniFactory = AniFactory;
        effects.createEffect = function ($url, $module, $endToRemove, $once, $callBack) {
            if ($endToRemove === void 0) { $endToRemove = true; }
            if ($once === void 0) { $once = false; }
            if ($callBack === void 0) { $callBack = null; }
            var effect = AniFactory.getInstance().createEffect($url, $module, $endToRemove, $once, $callBack);
            return effect;
        };
        effects.createSingleEffect = function ($url, $module, $endToRemove, $once, $callBack) {
            if ($endToRemove === void 0) { $endToRemove = true; }
            if ($once === void 0) { $once = false; }
            if ($callBack === void 0) { $callBack = null; }
            var effect = AniFactory.getInstance().createSingleEffect($url, $module, $endToRemove, $once, $callBack);
            return effect;
        };
        effects.disposeModule = function (module) {
            zt.effects.AniFactory.getInstance().disposeModule(module);
        };
        effects.resyleEffectGroup = function (effect) {
            if (!!effect == false)
                return;
            zt.effects.AniFactory.getInstance().effectComplete(effect, true);
        };
        effects.playCenterQueueEffect = function ($url, $module, $width, $height, $x, $y) {
            if ($x === void 0) { $x = 0; }
            if ($y === void 0) { $y = 0; }
            effects.EffectQueue.ins.addToCenterQunue($url, $module, $width, $height, $x, $y);
        };
        effects.playAutoQueueEffect = function ($url, $module, $width, $height, $x, $y) {
            if ($x === void 0) { $x = 0; }
            if ($y === void 0) { $y = 0; }
            effects.EffectQueue.ins.addToAutoQunue($url, $module, $width, $height, $x, $y);
        };
        effects.createSkillEffect = function ($url, $x, $y, $isContray, $length, $parent, $isAttack) {
            var skillEffect = zt.effects.AniFactory.getInstance().createFightEffect($url, $x, $y, $isContray, $length, $parent, $isAttack);
            return skillEffect;
        };
    })(effects = zt.effects || (zt.effects = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var effects;
    (function (effects) {
        var DamageFactory = (function () {
            function DamageFactory() {
                this.DAMAGE = 'd';
                this.HEAL = 'h';
                this.CRITICAL = 'c';
                this._damageType = { 0: 'd', 1: 'd', 2: 'c', 3: 'h' };
            }
            Object.defineProperty(DamageFactory, "instance", {
                get: function () {
                    if (!this._instance) {
                        this._instance = new DamageFactory();
                    }
                    return this._instance;
                },
                enumerable: true,
                configurable: true
            });
            DamageFactory.prototype.getDamageView = function ($num, $hurtNum, $type, $isAdd, $gap) {
                if ($isAdd === void 0) { $isAdd = false; }
                if ($gap === void 0) { $gap = 6; }
                var len = $hurtNum.length, i = 0;
                var type = this._damageType[$type];
                var url;
                var t;
                var pos = 0;
                var urlTemp;
                for (var i_1 = 0; i_1 < len; i_1++) {
                    var num = $hurtNum.charAt(i_1);
                    urlTemp = "fight/damage/damageNum/" + type + num + ".png";
                    url = zt.utils.getResourceURL(urlTemp);
                    t = Laya.loader.getRes(url);
                    if (!t) {
                        console.log('test');
                        continue;
                    }
                    $num.graphics.drawTexture(t, pos);
                    pos += (t.width + $gap);
                }
            };
            DamageFactory.prototype.init = function () {
            };
            return DamageFactory;
        }());
        effects.DamageFactory = DamageFactory;
    })(effects = zt.effects || (zt.effects = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var effects;
    (function (effects) {
        var Tween = Laya.Tween;
        var Ease = Laya.Ease;
        var Handler = Laya.Handler;
        var Sprite = Laya.Sprite;
        var DamageNum = (function (_super) {
            __extends(DamageNum, _super);
            function DamageNum() {
                var _this = _super.call(this) || this;
                _this._dispose = false;
                _this.type = 0;
                _this.isAdd = false;
                return _this;
            }
            DamageNum.getDamageNum = function ($hurtNum, $type, $isAdd) {
                var damageNum = this._damagePool.pop();
                if (!damageNum) {
                    damageNum = new DamageNum();
                }
                var hurtTxt = $hurtNum / 1000 > 10000 ? $hurtNum % 1000 + 'k' : $hurtNum + '';
                damageNum.type = $type;
                $isAdd = damageNum.isAdd = $hurtNum > 0 ? true : false;
                effects.DamageFactory.instance.getDamageView(damageNum, $hurtNum.toString(), $type, $isAdd);
                return damageNum;
            };
            DamageNum.prototype.setNum = function ($hurtNum) {
                effects.DamageFactory.instance.getDamageView(this, $hurtNum.toString(), this.type, this.isAdd);
            };
            DamageNum.prototype.setScale = function (scale) {
                this.scaleX = this.scaleY = scale;
            };
            DamageNum.prototype.dispose = function () {
                if (this.parent) {
                    this.parent.removeChild(this);
                }
                this.graphics.clear();
                this.alpha = this.scaleY = this.scaleX = 1;
                this.x = this.y = 0;
                this._dispose = true;
                DamageNum._damagePool.push(this);
            };
            DamageNum.prototype.play = function ($type) {
                switch ($type) {
                    case 0:
                    case 1:
                        this.playLoseBlood();
                        break;
                    case 2:
                        this.playCrticle();
                        break;
                }
            };
            DamageNum.prototype.playLoseBlood = function () {
                var radian = 100;
                var posX = this.x + 100 * Math.cos(radian);
                var posY = this.y + 100 * Math.sin(radian);
                this.setScale(1.5);
                Tween.to(this, { 'alpha': 1, 'scaleX': 1, 'scaleY': 1, 'x': posX, 'y': posY }, 1000, Ease.elasticOut, Handler.create(this, this.onPlayComplete));
            };
            DamageNum.prototype.playCrticle = function () {
                var radian = 100;
                var posX = this.x + 100 * Math.cos(radian);
                var posY = this.y + 100 * Math.sin(radian);
                this.setScale(1.5);
                Tween.to(this, { 'alpha': .5, 'scaleX': 1, 'scaleY': 1, 'x': posX, 'y': posY }, 1000, Ease.elasticOut, Handler.create(this, this.onPlayComplete));
            };
            DamageNum.prototype.onPlayComplete = function () {
                this.graphics.clear();
                this.parent.removeChild(this);
                this.alpha = 1;
                DamageNum._damagePool.push(this);
            };
            DamageNum._damagePool = [];
            return DamageNum;
        }(Sprite));
        effects.DamageNum = DamageNum;
    })(effects = zt.effects || (zt.effects = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var effects;
    (function (effects) {
        var BlendMode = Laya.BlendMode;
        var Handler = Laya.Handler;
        var Effect = (function (_super) {
            __extends(Effect, _super);
            function Effect($url, $once, $endToRemove, $callBack) {
                if ($callBack === void 0) { $callBack = null; }
                var _this = _super.call(this) || this;
                _this.isOnce = false;
                _this.url = '';
                _this._isSingle = false;
                _this._isCenter = false;
                _this._count = 2147483648;
                _this.url = $url;
                _this.loadAtlas($url, Handler.create(_this, _this.loadComplete));
                _this.isOnce = $once;
                _this.endToRemove = $endToRemove;
                _this._callBack = $callBack;
                _this.on(Laya.Event.COMPLETE, _this, _this.onPlayComplete);
                return _this;
            }
            Effect.prototype.loadComplete = function () {
                if (this._loadCompleteList) {
                    for (var _i = 0, _a = this._loadCompleteList; _i < _a.length; _i++) {
                        var call = _a[_i];
                        call.run();
                    }
                }
                if (this.isCenter) {
                    var bounds = this.getGraphicBounds();
                    this.x = this._container['width'] / 2 - bounds.width * this._scale / 2;
                    this.y = this._container['height'] / 2 - bounds.height * this._scale / 2;
                }
            };
            Effect.prototype.onPlayComplete = function () {
                if (this.frames && this.frames.length > 0)
                    this.event('play_complete', this);
            };
            Effect.prototype.playEffect = function ($parent, $x, $y, $isLoop, $blendMode, $callBack, speed) {
                if ($isLoop === void 0) { $isLoop = false; }
                if ($blendMode === void 0) { $blendMode = BlendMode.NORMAL; }
                if ($callBack === void 0) { $callBack = null; }
                if (speed === void 0) { speed = 30; }
                if ($callBack)
                    this.callBack = $callBack;
                this.x = $x;
                this.y = $y;
                this.blendMode = $blendMode || Laya.BlendMode.NORMAL;
                $parent.addChild(this);
                this.interval = speed;
                this.play(1, $isLoop);
            };
            Effect.prototype.playEffectAtCenter = function ($parent, $isLoop, $blendMode, speed, scale) {
                if ($isLoop === void 0) { $isLoop = false; }
                if ($blendMode === void 0) { $blendMode = BlendMode.NORMAL; }
                if (speed === void 0) { speed = 60; }
                if (scale === void 0) { scale = 1; }
                this._isCenter = true;
                this.blendMode = $blendMode;
                this._container = $parent;
                this._scale = scale;
                $parent.addChild(this);
                this.play(1, $isLoop);
                this.interval = speed;
                if (this.isCenter) {
                    var bounds = this.getGraphicBounds();
                    this.x = this._container['width'] / 2 - bounds.width * scale / 2;
                    this.y = this._container['height'] / 2 - bounds.height * scale / 2;
                }
            };
            Effect.prototype._frameLoop = function () {
                if (this._cacheFrame) {
                    if (this._cacheFrame[this._index]) {
                        this._cacheFrame[this._index].run();
                        delete this._cacheFrame[this._index];
                    }
                }
                _super.prototype._frameLoop.call(this);
            };
            Effect.prototype.addFrame = function ($frame, $handle) {
                if (this._cacheFrame == null) {
                    this._cacheFrame = {};
                }
                this._cacheFrame[$frame] = $handle;
            };
            Effect.prototype.registerLoadComplete = function ($func) {
                if (!this._loadCompleteList) {
                    this._loadCompleteList = [];
                }
                if (this._loadCompleteList.indexOf($func) == -1) {
                    this._loadCompleteList.push($func);
                }
            };
            Effect.prototype.stopEffect = function () {
                this.stop();
                return this;
            };
            Effect.prototype.changeSpeed = function ($inteval) {
                this.interval = $inteval;
            };
            Effect.prototype.destroy = function (destroyChild) {
                this.off(Laya.Event.COMPLETE, this, this.onPlayComplete);
                if (this._cacheFrame)
                    this._cacheFrame = null;
                _super.prototype.destroy.call(this, true);
            };
            Object.defineProperty(Effect.prototype, "module", {
                get: function () {
                    return this._module;
                },
                set: function (value) {
                    this._module = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Effect.prototype, "isSingle", {
                get: function () {
                    return this._isSingle;
                },
                set: function (value) {
                    this._isSingle = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Effect.prototype, "callBack", {
                get: function () {
                    return this._callBack;
                },
                set: function (value) {
                    this._callBack = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Effect.prototype, "isCenter", {
                get: function () {
                    return this._isCenter;
                },
                set: function (value) {
                    this._isCenter = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Effect.prototype, "name", {
                get: function () {
                    return this.url;
                },
                enumerable: true,
                configurable: true
            });
            return Effect;
        }(Laya.Animation));
        effects.Effect = Effect;
    })(effects = zt.effects || (zt.effects = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var effects;
    (function (effects) {
        var EffectQueue = (function () {
            function EffectQueue() {
                this._isCenterPlaying = false;
                this._isAutoPlaying = false;
                this._effectQueue = {};
            }
            Object.defineProperty(EffectQueue, "ins", {
                get: function () {
                    if (EffectQueue._ins == null) {
                        EffectQueue._ins = new EffectQueue();
                    }
                    return EffectQueue._ins;
                },
                enumerable: true,
                configurable: true
            });
            EffectQueue.prototype.addToCenterQunue = function ($url, $module, $width, $height, $x, $y) {
                var effectData = this.getEffectData($url, $module, $width, $height, $x, $y, EffectQueue.CENTER);
                if (!!this._effectQueue[EffectQueue.CENTER] == false) {
                    this._effectQueue[EffectQueue.CENTER] = [];
                }
                this._effectQueue[EffectQueue.CENTER].push(effectData);
                this.playEffect(EffectQueue.CENTER);
            };
            EffectQueue.prototype.addToAutoQunue = function ($url, $module, $width, $height, $x, $y) {
                var effectData = this.getEffectData($url, $module, $width, $height, $x, $y, EffectQueue.CENTER);
                if (!!this._effectQueue[EffectQueue.CENTER] == false) {
                    this._effectQueue[EffectQueue.CENTER] = [];
                }
                this._effectQueue[EffectQueue.CENTER].push(effectData);
                this.playEffect(EffectQueue.CENTER);
            };
            EffectQueue.prototype.playEffect = function ($type) {
                var effectList = this._effectQueue[$type];
                if (this._isCenterPlaying)
                    return;
                if (!effectList || effectList.length == 0) {
                    this._isCenterPlaying = false;
                    return;
                }
                var effectData = effectList.shift();
                var effect = zt.effects.createEffect(effectData.url, effectData.module, true);
                var container = zt.Layers.getLayer('top');
                var w = Laya.stage.width;
                var h = Laya.stage.height;
                var offsetX = effectData.x;
                var offsetY = effectData.y;
                if ($type == EffectQueue.CENTER) {
                    offsetX = (w - effectData.width) / 2;
                    offsetY = (h - effectData.height) / 2;
                }
                effect.playEffect(container, offsetX, offsetY, false, Laya.BlendMode.NORMAL, null, effectData.speed);
                this._isCenterPlaying = true;
                effect.on('play_complete', this, this.playEffectComplete, [EffectQueue.CENTER]);
                effectData = null;
            };
            EffectQueue.prototype.playEffectComplete = function ($type) {
                this._isCenterPlaying = false;
                this.playEffect($type);
            };
            EffectQueue.prototype.getEffectData = function ($url, $module, $width, $height, $x, $y, $type) {
                var effectData = new EffectData();
                effectData.url = $url;
                effectData.module = $module;
                effectData.width = $width;
                effectData.height = $height;
                effectData.x = $x;
                effectData.y = $y;
                effectData.type = $type;
                return effectData;
            };
            EffectQueue.CENTER = 'center';
            EffectQueue.AUTO = 'auto';
            return EffectQueue;
        }());
        effects.EffectQueue = EffectQueue;
        var EffectData = (function () {
            function EffectData() {
                this.speed = 60;
            }
            return EffectData;
        }());
        effects.EffectData = EffectData;
    })(effects = zt.effects || (zt.effects = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var effects;
    (function (effects) {
        var Sprite = Laya.Sprite;
        var BlendMode = Laya.BlendMode;
        var Handler = Laya.Handler;
        var Loader = Laya.Loader;
        var Texture = Laya.Texture;
        var SkillEffect = (function (_super) {
            __extends(SkillEffect, _super);
            function SkillEffect($url, $x, $y, $isContray, $length, $parent, $isAttack) {
                var _this = _super.call(this) || this;
                _this.url = '';
                _this._isPlaying = false;
                _this._isStart = false;
                _this._isLoop = false;
                _this.url = $url;
                _this.x = $x;
                _this.y = $y;
                _this._isAttack = $isAttack;
                _this._isContray = $isContray;
                _this._length = $length;
                $parent.addChildAt(_this, 0);
                _this.rotation = _this._isContray ? 154 : -26;
                Laya.loader.load($url, Handler.create(_this, _this.loadComplete), null, Laya.Loader.ATLAS);
                return _this;
            }
            SkillEffect.prototype.loadComplete = function () {
                this.parseAni();
                if (this._loadCompleteList) {
                    for (var _i = 0, _a = this._loadCompleteList; _i < _a.length; _i++) {
                        var call = _a[_i];
                        call.run();
                    }
                }
                if (this._isStart && this._isPlaying == false) {
                    this.play(this._startFrame);
                }
            };
            SkillEffect.prototype.parseAni = function () {
                var atlas = Loader.getAtlas(this.url);
                if (!atlas)
                    return;
                this._currentFrame = 0;
                this.frames = atlas;
                this._totalFrame = atlas.length;
                this._isLoadComplete = true;
            };
            SkillEffect.prototype.checkPlayComplete = function () {
                if (this._currentFrame >= this._totalFrame) {
                    if (this._isLoop) {
                        this._currentFrame = 0;
                        return false;
                    }
                    this.event('play_complete', this);
                    this.dispose();
                    return true;
                }
                return false;
            };
            SkillEffect.prototype.dispose = function () {
                this._loadCompleteList = [];
                this.graphics.clear();
                this.removeSelf();
            };
            SkillEffect.prototype.playEffect = function (speed, isLoop, $blendMode, frame) {
                if (speed === void 0) { speed = 30; }
                if (isLoop === void 0) { isLoop = false; }
                if ($blendMode === void 0) { $blendMode = BlendMode.NORMAL; }
                if (frame === void 0) { frame = 0; }
                this.blendMode = $blendMode || Laya.BlendMode.NORMAL;
                this.interval = speed;
                this._isStart = true;
                this._startFrame = frame;
                this._isLoop = isLoop;
                this.play(frame);
            };
            SkillEffect.prototype.play = function (frame) {
                if (frame === void 0) { frame = -1; }
                if (!this._isLoadComplete)
                    return;
                this._currentFrame = frame == -1 ? frame : this._startFrame;
                this._isPlaying = true;
                Laya.timer.loop(this.interval, this, this.loop);
            };
            Object.defineProperty(SkillEffect.prototype, "isPlaying", {
                get: function () {
                    return this._isPlaying;
                },
                enumerable: true,
                configurable: true
            });
            SkillEffect.prototype.loop = function () {
                var playComplete = this.checkPlayComplete();
                var frame = this._currentFrame;
                if (playComplete) {
                    Laya.timer.clear(this, this.loop);
                    return;
                }
                ;
                this._isPlaying = true;
                var isAttack = this._isAttack;
                var length = this._length;
                var aniUrl = this.frames[frame];
                var t = Laya.loader.getRes(aniUrl);
                var tw = t.sourceWidth;
                var x = isAttack ? 0 : tw - length;
                var w = length;
                var source = Texture.createFromTexture2(t, x + t.offsetX, t.offsetY, w, t.height, t.sourceWidth, t.sourceHeight);
                source.offsetX = t.offsetX;
                source.offsetY = t.offsetY;
                this.graphics.cleanByTexture(source, 0, 0);
                if (this._cacheFrame) {
                    if (this._cacheFrame[frame]) {
                        this._cacheFrame[frame].run();
                        delete this._cacheFrame[frame];
                    }
                }
                this._currentFrame++;
            };
            SkillEffect.prototype.addFrame = function ($frame, $handle) {
                if (this._cacheFrame == null) {
                    this._cacheFrame = {};
                }
                this._cacheFrame[$frame] = $handle;
            };
            SkillEffect.prototype.registerLoadComplete = function ($func) {
                if (!this._loadCompleteList) {
                    this._loadCompleteList = [];
                }
                if (this._loadCompleteList.indexOf($func) == -1) {
                    this._loadCompleteList.push($func);
                }
            };
            SkillEffect.prototype.stopEffect = function () {
                Laya.timer.clear(this, this.loop);
                this._isPlaying = false;
                return this;
            };
            SkillEffect.prototype.changeSpeed = function ($inteval) {
                this.interval = $inteval;
                Laya.timer.clear(this, this.loop);
                Laya.timer.loop(this.interval, this, this.loop);
            };
            SkillEffect.prototype.destroy = function (destroyChild) {
                if (this._cacheFrame)
                    this._cacheFrame = null;
                this.graphics.clear();
                _super.prototype.destroy.call(this, true);
            };
            Object.defineProperty(SkillEffect.prototype, "module", {
                get: function () {
                    return this._module;
                },
                set: function (value) {
                    this._module = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SkillEffect.prototype, "name", {
                get: function () {
                    return this.url;
                },
                enumerable: true,
                configurable: true
            });
            return SkillEffect;
        }(Sprite));
        effects.SkillEffect = SkillEffect;
    })(effects = zt.effects || (zt.effects = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var loader;
    (function (loader) {
        var ModuleItem = (function () {
            function ModuleItem() {
            }
            ModuleItem.prototype.load = function (moduleName, fileName, onComplete) {
                this._name = moduleName;
                this._onComplete = onComplete;
                this._url = zt.utils.getJSURL(fileName ? fileName : this._name);
                Laya.loader.load(this._url, Laya.Handler.create(this, this.onload), null, Laya.Loader.TEXT);
            };
            ModuleItem.prototype.onload = function (data) {
                data += ' \n//# sourceURL=' + this._url;
                Laya.Browser.window.
                    eval(data);
                Laya.Loader.clearRes(this._url);
                var obj = zt.utils.ModuleUtils.getInstance(this._name);
                if (this._onComplete)
                    this._onComplete.runWith(obj);
            };
            return ModuleItem;
        }());
        loader.ModuleItem = ModuleItem;
    })(loader = zt.loader || (zt.loader = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var net;
    (function (net) {
        var Handler = Laya.Handler;
        var Byte = Laya.Byte;
        net.call = function (cmd, params, callback, errorHandler, noMask) {
            if (callback === void 0) { callback = null; }
            if (errorHandler === void 0) { errorHandler = null; }
            if (noMask === void 0) { noMask = false; }
            !noMask && zt.showMask();
            var msgHead = new net.MessageHeadOut(net.MessageType.ENTITY, net.ComponentType.CLIENT, zt.WebParams.userId, net.ComponentType.GATEWAYAPP, net.GetwayAppMgr.list[0].id);
            net.GameSocket.instance.send(msgHead, { Cmd: cmd, Content: params }, Handler.create(null, function (data) {
                !noMask && zt.hideMask();
                callback && callback.runWith(data);
            }), Handler.create(null, function (data) {
                !noMask && zt.hideMask();
                errorHandler && errorHandler.runWith(data);
            }));
        };
        net.on = function (cmd, caller, method) {
            net.GameSocket.instance.on(cmd, caller, method);
        };
        net.off = function (cmd, caller, method) {
            net.GameSocket.instance.off(cmd, caller, method);
        };
        net.onSeq = function (cmd, cb, onerror) {
            var onevent = function (data) {
                if (data.Code > 0 && onerror)
                    onerror.runWith(data.Code);
                if (data.Code <= 0 && cb)
                    cb.runWith(data.Content);
            };
            var eventname = EventUtils.getSeqEventName(cmd);
            net.GameSocket.instance.on(eventname, null, onevent);
            return onevent;
        };
        net.onSeqOff = function (cmd, onevent) {
            var eventname = EventUtils.getSeqEventName(cmd);
            net.GameSocket.instance.off(eventname, null, onevent);
        };
        net.callCompMsg = function (toCompType, toCompID, toCompCMD, data, callback, errorHandler) {
            var msgHead = new net.MessageHeadOut(net.MessageType.COMPONENT, net.ComponentType.CLIENT, zt.WebParams.userId, toCompType, toCompID);
            net.GameSocket.instance.sendComponentMsg(msgHead, toCompCMD, data, callback, errorHandler);
        };
        net.getByteObj = function (data) {
            if (data === void 0) { data = null; }
            var result = new Byte(data);
            result.endian = Byte.BIG_ENDIAN;
            return result;
        };
        var EventUtils = (function () {
            function EventUtils() {
            }
            EventUtils.getSeqEventName = function (cmd) {
                return "_SEQ_" + cmd;
            };
            EventUtils.getSeqEventNames = function (cmds) {
                var result = [];
                for (var _i = 0, cmds_1 = cmds; _i < cmds_1.length; _i++) {
                    var i = cmds_1[_i];
                    result.push(EventUtils.getSeqEventName(i));
                }
                return result;
            };
            return EventUtils;
        }());
        net.EventUtils = EventUtils;
    })(net = zt.net || (zt.net = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var Handler = Laya.Handler;
    var call = zt.net.call;
    var Calls = (function (_super) {
        __extends(Calls, _super);
        function Calls() {
            var _this = _super.call(this) || this;
            _this._counter = 0;
            _this._list = [];
            return _this;
        }
        Calls.prototype.add = function (cmd, params) {
            this._list.push({ cmd: cmd, params: params });
        };
        Calls.prototype.addCmds = function (list) {
            this._list = this._list.concat(list);
        };
        Calls.prototype.start = function () {
            var _this = this;
            if (!this._list || this._list.length === 0) {
                this.event(Laya.Event.COMPLETE);
                return;
            }
            this._list.forEach(function (i) {
                call(i.cmd, i.params, Handler.create(_this, function (data) {
                    _this.check();
                    i.data = data;
                }), Handler.create(_this, function () {
                    _this.check();
                }));
            });
        };
        Calls.prototype.check = function () {
            this._counter++;
            if (this._counter == this._list.length) {
                this.event(Laya.Event.COMPLETE);
            }
        };
        Object.defineProperty(Calls.prototype, "list", {
            get: function () { return this._list; },
            enumerable: true,
            configurable: true
        });
        return Calls;
    }(Laya.EventDispatcher));
    zt.Calls = Calls;
})(zt || (zt = {}));
var zt;
(function (zt) {
    var net;
    (function (net) {
        var EventDispatcher = Laya.EventDispatcher;
        var Handler = Laya.Handler;
        var Event = Laya.Event;
        var Byte = Laya.Byte;
        var GameSocket = (function (_super) {
            __extends(GameSocket, _super);
            function GameSocket() {
                return _super.call(this) || this;
            }
            Object.defineProperty(GameSocket, "instance", {
                get: function () {
                    return GameSocket._instance || (GameSocket._instance = new GameSocket());
                },
                enumerable: true,
                configurable: true
            });
            GameSocket.prototype.init = function (socket) {
                if (this._inited)
                    return;
                this._inited = true;
                this._socket = socket;
                this._counter = 0;
                this._callbacks = {};
                this._errorHandlers = {};
                this.initEvent();
            };
            GameSocket.prototype.connect = function (url, onConnected) {
                this._url = url.indexOf('ws://') == -1 ? 'ws://' + url : url;
                this._onConnected = onConnected;
                this._socket.connectByUrl(this._url);
            };
            GameSocket.prototype.setProtocol = function (protocol) {
                this._socket.protocols.push(protocol);
                return this;
            };
            GameSocket.prototype.sendHeart = function () {
                var msgHead = new net.MessageHeadOut(net.MessageType.NULL);
                var out = new net.PackageOut();
                out.writeData(msgHead);
                this._socket.send(out.buffer);
                console.log("[" + this.getTime() + "][sending heart]", 'head', msgHead.toString());
            };
            GameSocket.prototype.sendComponentMsg = function (msgHead, componentCMD, data, callback, errorHandler) {
                this._componentMsgCb = callback;
                this._componentErrorCb = errorHandler;
                var out = new net.PackageOut();
                out.writeData(msgHead, componentCMD, data);
                this._socket.send(out.buffer);
                var compression = out.flag == net.FlagType.COMPRESS ? 'compressed' : 'uncompressed';
                var compresslen = out.flag == net.FlagType.COMPRESS ? ',compresslen=' + out.msgBodyLen : '';
                zt.__getDebugEnabled('bufferlen') && console.log("[buffer len =  " + out.buffer.byteLength + "]");
                console.log("[" + this.getTime() + "][sending component message][" + compression + ',msglen=' + out.msgbody.length + '' + compresslen + ']', msgHead.toString(), 'component cmd:', componentCMD, 'data:', data);
            };
            GameSocket.prototype.send = function (msgHead, data, callback, errorHandler) {
                if (!zt.__getEnabled('net'))
                    return;
                if (!this._callbacks)
                    throw new Error('game socket没有初始化.');
                this._counter++;
                this._callbacks[this._counter] = callback;
                this._errorHandlers[this._counter] = errorHandler;
                data['Seq'] = this._counter;
                data = JSON.stringify(data);
                var out = new net.PackageOut();
                out.writeData(msgHead, 0, data);
                this._socket.send(out.buffer);
                zt.__getDebugEnabled('bufferlen') && console.log("[buffer len =  " + out.buffer.byteLength + "]");
                console.log("[" + this.getTime() + "][sending][Seq=" + this._counter + "]", data);
            };
            GameSocket.prototype.initEvent = function () {
                this._socket.onSocketOpen = Handler.create(this, this.onSocketOpen, null, false);
                this._socket.onMessageReceived = Handler.create(this, this.onMessageReceived, null, false);
                this._socket.on(Event.CLOSE, this, this.onSocketClose, null);
                this._socket.on(Event.ERROR, this, this.onConnectError, null);
            };
            GameSocket.prototype.removeEvents = function () {
                this._socket.on(Event.OPEN, this, this.onSocketOpen, null);
                this._socket.on(Event.CLOSE, this, this.onSocketClose, null);
                this._socket.on(Event.MESSAGE, this, this.onMessageReceived, null);
                this._socket.on(Event.ERROR, this, this.onConnectError, null);
            };
            GameSocket.prototype.onSocketOpen = function (e) {
                console.log("[" + this.getTime() + "][socket]", this._url + ' connected.');
                this._onConnected && this._onConnected.run();
                this._onConnected = null;
            };
            GameSocket.prototype.onSocketClose = function (e) {
                console.log("[" + this.getTime() + "][socket]", e.target.url + ' socket closed.');
                this._socket && this._socket.close();
                this._callbacks = this._errorHandlers = null;
                this.offAll();
            };
            GameSocket.prototype.onMessageReceived = function (buffer) {
                var inpkg = new net.PackageIn(buffer);
                inpkg.endian = Byte.BIG_ENDIAN;
                inpkg.parse();
                var data;
                if (inpkg.msgHead.type == net.MessageType.COMPONENT) {
                    data = inpkg.content;
                    console.log("[" + this.getTime() + "][component message received]", inpkg.msgHead.toString());
                    this.handleComponentMsgBack(inpkg.content);
                }
                else if (inpkg.msgHead.type == net.MessageType.ENTITY) {
                    if (inpkg.content === '') {
                        console.log("[" + this.getTime() + "][ENTITY message received]", inpkg.msgHead.toString());
                        throw new Error('entity content cannot be empty string');
                    }
                    data = JSON.parse(inpkg.content);
                    var Seq = data.Seq;
                    if (Seq != 0) {
                        console.log("[" + this.getTime() + "][received][Seq=" + Seq + "] " + inpkg.content);
                        zt.__getEnabled('json') && console.log(data.Content);
                        zt.__getEnabled('json') && console.log('');
                        this.event(net.EventUtils.getSeqEventName('*'), data);
                        var callBack = this._callbacks[Seq];
                        var errorHandler = this._errorHandlers[Seq];
                        delete this._callbacks[Seq];
                        delete this._errorHandlers[Seq];
                        data.Code > 0 && errorHandler && errorHandler.runWith(data);
                        data.Code === 0 && callBack && callBack.runWith(data.Content);
                        data.Code === 0 && this.event(net.EventUtils.getSeqEventName(data.Cmd), data.Content);
                    }
                    else {
                        console.log("[" + this.getTime() + "][Notify] " + inpkg.content);
                        this.event(data.Cmd, { Content: data.Content });
                        this.event('*', { Content: data.Content });
                    }
                }
            };
            GameSocket.prototype.handleComponentMsgBack = function (data) {
                this._componentMsgCb && this._componentMsgCb.runWith(data);
            };
            GameSocket.prototype.onConnectError = function (e) {
                console.log('error', e);
            };
            GameSocket.prototype.getTime = function () {
                var date = new Date();
                return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ":" + date.getMilliseconds();
            };
            GameSocket.prototype.close = function () {
                this._socket && this._socket.close();
            };
            return GameSocket;
        }(EventDispatcher));
        net.GameSocket = GameSocket;
    })(net = zt.net || (zt.net = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var net;
    (function (net) {
        var GetwayAppMgr = (function () {
            function GetwayAppMgr() {
            }
            GetwayAppMgr.list = [];
            return GetwayAppMgr;
        }());
        net.GetwayAppMgr = GetwayAppMgr;
    })(net = zt.net || (zt.net = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var net;
    (function (net) {
        var SocketProxy = (function () {
            function SocketProxy() {
                this._socket = new Laya.Socket();
                this._socket.on(Laya.Event.OPEN, this, this.$onSocketOpen);
                this._socket.on(Laya.Event.MESSAGE, this, this.$onMessageReceived);
            }
            SocketProxy.prototype.$onSocketOpen = function (e) {
                this._onSocketOpen.runWith(e);
            };
            SocketProxy.prototype.$onMessageReceived = function (e) {
                this._onMessageReceived.runWith(e);
            };
            Object.defineProperty(SocketProxy.prototype, "onMessageReceived", {
                set: function (val) {
                    this._onMessageReceived = val;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SocketProxy.prototype, "onSocketOpen", {
                set: function (val) {
                    this._onSocketOpen = val;
                },
                enumerable: true,
                configurable: true
            });
            SocketProxy.prototype.connectByUrl = function (url) {
                this._socket.connectByUrl(url);
            };
            SocketProxy.prototype.on = function (type, caller, listener, args) {
                if (args === void 0) { args = null; }
                return this._socket.on(type, caller, listener, args);
            };
            SocketProxy.prototype.close = function () {
                this._socket.close();
            };
            Object.defineProperty(SocketProxy.prototype, "protocols", {
                get: function () {
                    return this._socket.protocols;
                },
                enumerable: true,
                configurable: true
            });
            SocketProxy.prototype.send = function (data) {
                this._socket.send(data);
            };
            return SocketProxy;
        }());
        net.SocketProxy = SocketProxy;
    })(net = zt.net || (zt.net = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var net;
    (function (net) {
        var CELLAPPType;
        (function (CELLAPPType) {
        })(CELLAPPType = net.CELLAPPType || (net.CELLAPPType = {}));
        ;
        var ComponentCMDType;
        (function (ComponentCMDType) {
            ComponentCMDType[ComponentCMDType["REQUEST_GATEWAYAPP"] = 1] = "REQUEST_GATEWAYAPP";
            ComponentCMDType[ComponentCMDType["LOGIN"] = 2] = "LOGIN";
            ComponentCMDType[ComponentCMDType["LOGOUT"] = 3] = "LOGOUT";
            ComponentCMDType[ComponentCMDType["INTERRUPT"] = 4] = "INTERRUPT";
            ComponentCMDType[ComponentCMDType["ERROR"] = 5] = "ERROR";
        })(ComponentCMDType = net.ComponentCMDType || (net.ComponentCMDType = {}));
        ;
        var ComponentIDType;
        (function (ComponentIDType) {
            ComponentIDType[ComponentIDType["GATEWAYAPPMGR"] = 1] = "GATEWAYAPPMGR";
        })(ComponentIDType = net.ComponentIDType || (net.ComponentIDType = {}));
        ;
        var ComponentType;
        (function (ComponentType) {
            ComponentType[ComponentType["CLIENT"] = 1] = "CLIENT";
            ComponentType[ComponentType["GATEWAYAPPMGR"] = 2] = "GATEWAYAPPMGR";
            ComponentType[ComponentType["GATEWAYAPP"] = 3] = "GATEWAYAPP";
            ComponentType[ComponentType["CELLAPP"] = 4] = "CELLAPP";
        })(ComponentType = net.ComponentType || (net.ComponentType = {}));
        ;
        var FlagType;
        (function (FlagType) {
            FlagType[FlagType["UNCOMPRESS"] = 0] = "UNCOMPRESS";
            FlagType[FlagType["COMPRESS"] = 1] = "COMPRESS";
        })(FlagType = net.FlagType || (net.FlagType = {}));
        ;
        var MessageType;
        (function (MessageType) {
            MessageType[MessageType["NULL"] = 0] = "NULL";
            MessageType[MessageType["COMPONENT"] = 1] = "COMPONENT";
            MessageType[MessageType["ENTITY"] = 2] = "ENTITY";
        })(MessageType = net.MessageType || (net.MessageType = {}));
        ;
    })(net = zt.net || (zt.net = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var scene;
    (function (scene) {
        var Sprite = Laya.Sprite;
        var SceneBase = (function (_super) {
            __extends(SceneBase, _super);
            function SceneBase() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            SceneBase.prototype.move = function (pos, layerName, params) {
                var x = pos.x;
                var y = pos.y;
                var offsetX = pos.offsetX;
                var offsetY = pos.offsetY;
                var layer = this.layer;
                var bgX = x;
                var bgY = y;
                var bgToX = Math.min(0, bgX + offsetX);
                var bgToY = Math.min(0, bgY + offsetY);
                bgToX = Math.max(bgToX, -layer['width'] + Laya.stage.width);
                bgToY = Math.max(bgToY, -layer['height'] + Laya.stage.height);
                this._moveTween = Laya.Tween.to(layer, {
                    x: bgToX,
                    y: bgToY
                }, params.duration || SceneBase.DURATION, null, Laya.Handler.create(this, this.moveComplete));
            };
            SceneBase.prototype.find = function (layerName) {
                return this.layers.filter(function (layer) {
                    return layer.name === layerName;
                })[0];
            };
            SceneBase.prototype.update = function (val) {
                this.params = val;
                this.reBuild();
            };
            SceneBase.prototype.preproccess = function () {
                throw Error('must be overrided');
            };
            SceneBase.prototype.build = function () {
                throw Error('must be overrided');
            };
            SceneBase.prototype.dispose = function () {
                if (this._moveTween) {
                    this._moveTween.clear();
                    this._moveTween = null;
                }
                this.disposeTexture();
            };
            SceneBase.prototype.disposeTexture = function () {
                var res = this.res;
                var url = '';
                for (var _i = 0, res_2 = res; _i < res_2.length; _i++) {
                    var urlObj = res_2[_i];
                    if (!!urlObj.ignore)
                        continue;
                    url = urlObj.url;
                    Laya.loader.clearRes(url, true);
                }
            };
            SceneBase.prototype.moveComplete = function () { throw Error('must be overrided'); };
            Object.defineProperty(SceneBase.prototype, "cmds", {
                get: function () { return []; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SceneBase.prototype, "res", {
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SceneBase.prototype, "params", {
                get: function () { return this._params; },
                set: function (val) { this._params = val; },
                enumerable: true,
                configurable: true
            });
            SceneBase.prototype.reBuild = function () { throw Error('must be overrided'); };
            Object.defineProperty(SceneBase.prototype, "layer", {
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SceneBase.prototype, "layers", {
                get: function () { return null; },
                enumerable: true,
                configurable: true
            });
            SceneBase.DURATION = 400;
            return SceneBase;
        }(Sprite));
        scene.SceneBase = SceneBase;
    })(scene = zt.scene || (zt.scene = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var scene;
    (function (scene) {
        var SceneData = (function () {
            function SceneData(obj) {
                this._name = obj['name'];
                this._gui = obj['gui'];
                this._backgroundID = obj['backgroundID'];
            }
            Object.defineProperty(SceneData.prototype, "background", {
                get: function () {
                    return this._backgroundID;
                },
                set: function (value) {
                    this._backgroundID = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SceneData.prototype, "gui", {
                get: function () {
                    return this._gui;
                },
                set: function (value) {
                    this._gui = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SceneData.prototype, "name", {
                get: function () {
                    return this._name;
                },
                set: function (value) {
                    this._name = value;
                },
                enumerable: true,
                configurable: true
            });
            return SceneData;
        }());
        scene.SceneData = SceneData;
    })(scene = zt.scene || (zt.scene = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var scene;
    (function (scene) {
        var SceneEvent = (function () {
            function SceneEvent() {
            }
            SceneEvent.RES_LOAD = 'resload';
            SceneEvent.PRELOAD_COMPLETE = 'PRELOAD_COMPLETE';
            SceneEvent.START_DISPOSE = 'start_dispose';
            SceneEvent.DISPOSE = 'dispose';
            return SceneEvent;
        }());
        scene.SceneEvent = SceneEvent;
    })(scene = zt.scene || (zt.scene = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var scene;
    (function (scene_2) {
        var Handler = Laya.Handler;
        var SceneItem = (function (_super) {
            __extends(SceneItem, _super);
            function SceneItem(name, scene, params) {
                var _this = _super.call(this) || this;
                _this._resLoaded = false;
                _this._dataLoaded = false;
                _this._isReBuild = false;
                _this._scene = scene;
                _this._name = name;
                _this._params = params;
                if (_this._params) {
                    _this._params.sceneName = name;
                }
                else {
                    _this._params = { sceneName: name };
                }
                zt.ctrl.GameCtrl.intance.event(zt.Scene.CHANGESCENE);
                return _this;
            }
            SceneItem.prototype.preload = function () {
                zt.showAppLoading();
                this.loadRes();
                this.loadData();
            };
            SceneItem.prototype.update = function (params) {
                this._isReBuild = true;
                this._params = params;
                this.scene.update(params);
                this.loadData();
            };
            SceneItem.prototype.loadRes = function () {
                if (this._scene.res.length === 0) {
                    this.onResLoad();
                    return;
                }
                Laya.loader.load(this._scene.res, Handler.create(this, this.onResLoad), Handler.create(this, this.onResProgress, null, false));
            };
            SceneItem.prototype.onResProgress = function (val) {
                zt.updateAppLoading(val);
            };
            SceneItem.prototype.loadData = function () {
                var _this = this;
                var calls = new zt.Calls();
                calls.addCmds(this._scene.cmds);
                calls.once(Laya.Event.COMPLETE, this, function () {
                    _this._dataLoaded = true;
                    _this.checkComplete();
                });
                calls.start();
            };
            SceneItem.prototype.onResLoad = function () {
                this.event(zt.app.AppEvent.RES_LOAD);
                this._resLoaded = true;
                this.checkComplete();
            };
            SceneItem.prototype.checkComplete = function () {
                if (this._resLoaded && this._dataLoaded) {
                    zt.hideAppLoading();
                    this.event(scene.SceneEvent.PRELOAD_COMPLETE);
                }
            };
            Object.defineProperty(SceneItem.prototype, "scene", {
                get: function () {
                    return this._scene;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SceneItem.prototype, "name", {
                get: function () {
                    return this._name;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SceneItem.prototype, "params", {
                get: function () {
                    return this._params;
                },
                enumerable: true,
                configurable: true
            });
            SceneItem.prototype.dispose = function () {
                this._scene.dispose();
            };
            return SceneItem;
        }(Laya.EventDispatcher));
        scene_2.SceneItem = SceneItem;
    })(scene = zt.scene || (zt.scene = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    zt.getTimer = function () {
        return Date.now() - window['zt']['__sysStartTime'];
    };
    zt.getServerTime = function () {
        var now = Date.now();
        return Math.ceil(zt.System._systemTime + (now - zt.System._systemTimeTag) / 1000);
    };
    zt.formatTime = function (time, type, dibit, suffixs) {
        if (type === void 0) { type = CountDownType.HMS; }
        if (dibit === void 0) { dibit = false; }
        if (suffixs === void 0) { suffixs = ['h', 'm', 's']; }
        var countdown = zt.getCountDown(time, type, dibit);
        countdown = countdown.map(function (val, index) { return "" + val + suffixs[index]; });
        return countdown.join('');
    };
    zt.formatTimeHMS = function (time) {
        var date = new Date(time * 1000);
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        var str = (hours < 10 ? "0" + hours.toString() : hours.toString());
        str += ":";
        str = str + (minutes < 10 ? "0" + minutes.toString() : minutes.toString());
        str += ":";
        str = str + (seconds < 10 ? "0" + seconds.toString() : seconds.toString());
        return str;
    };
    zt.getCountDown = function (time, type, dibit) {
        if (type === void 0) { type = CountDownType.HMS; }
        if (dibit === void 0) { dibit = false; }
        var result = [];
        if (type.indexOf('s') !== -1) {
            result.push(time % 60);
        }
        if (type.indexOf('m') !== -1) {
            result.unshift(Math.floor((time % 3600) / 60));
        }
        if (type.indexOf('h') >= 0) {
            if (type == CountDownType.HMS) {
                result.unshift(Math.floor(time / 3600));
            }
            else {
                result.unshift(Math.floor((time % 86400) / 3600));
            }
        }
        if (type.indexOf('d') >= 0) {
            result.unshift(Math.floor(time / 86400));
        }
        if (dibit)
            result = result.map(function (ele) {
                return ele < 10 ? "0" + ele : ele;
            });
        return result;
    };
    zt.getSysTimeByTime = function (hourTime) {
        var currDate = zt.getDateByTime(zt.getServerTime());
        var hour = parseInt(hourTime.substr(0, 2));
        var minute = parseInt(hourTime.substr(2, 2));
        return currDate.setHours(hour, minute, 0) / 1000;
    };
    zt.offsetTime = function (time, offset) {
        var date = zt.getDateByTime(time);
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        if (offset.d != null) {
            date.setDate(date.getDate() + offset.d);
        }
        if (offset.h != null) {
            h += offset.h;
        }
        if (offset.m != null) {
            m += offset.m;
        }
        if (offset.s != null) {
            s += offset.s;
        }
        return date.setHours(h, m, s) / 1000;
    };
    zt.getDateByTime = function (time) {
        return new Date(time * 1000);
    };
    var CountDownType = (function () {
        function CountDownType() {
        }
        CountDownType.HMS = 'hms';
        CountDownType.DHMS = 'dhms';
        return CountDownType;
    }());
    zt.CountDownType = CountDownType;
})(zt || (zt = {}));
var zt;
(function (zt) {
    var tips;
    (function (tips) {
        tips.getTipBg = function () {
            return fairygui.UIPackage.createObject('lib', 'tips').displayObject;
        };
    })(tips = zt.tips || (zt.tips = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var tips;
    (function (tips) {
        var Sprite = Laya.Sprite;
        var Tween = Laya.Tween;
        var Handler = Laya.Handler;
        var RaisingImageManager = (function () {
            function RaisingImageManager() {
            }
            RaisingImageManager.prototype.add = function (url, raiseParam) {
                if (raiseParam.isQuene) {
                    this._waitsQuene = this._waitsQuene || [];
                    this._waitParamsQuene = this._waitParamsQuene || [];
                    this._waitsQuene.push(url);
                    this._waitParamsQuene.push(raiseParam);
                    this.checkNext();
                }
                else {
                    this.playRaise(url, raiseParam);
                }
            };
            RaisingImageManager.prototype.checkNext = function () {
                this._waitsQuene.length > 0 && this.next();
            };
            RaisingImageManager.prototype.next = function () {
                this._busy = true;
                var url = this._waitsQuene.shift();
                var param = this._waitParamsQuene.shift();
                Laya.timer.once(param.detalTime, this, this.checkNext);
                this.playRaise(url, param);
            };
            RaisingImageManager.prototype.playRaise = function (url, param) {
                var raiseItem = this.getRaiseItem(url, param.isQuene);
                raiseItem.x = param.start.x;
                raiseItem.y = param.start.y;
                this._layer.addChild(raiseItem);
                var toX = param.end.x;
                var toY = param.end.y;
                var duration = param.duration;
                raiseItem.alpha = 1;
                Tween.to(raiseItem, { x: toX, y: toY, alpha: 0.6 }, duration, null, Handler.create(this, this.oncomplete, [raiseItem]));
            };
            RaisingImageManager.prototype.getRaiseItem = function (url, isQuene) {
                if (isQuene === void 0) { isQuene = true; }
                var raiseItem = Laya.Pool.getItemByClass('raiseItem', RaiseItem);
                raiseItem.url = url;
                raiseItem.isQuene = isQuene;
                return raiseItem;
            };
            RaisingImageManager.prototype.oncomplete = function (raiseItem) {
                raiseItem.clear();
                Laya.Pool.recover('raiseItem', raiseItem);
                console.log(raiseItem.url + " on completed.");
            };
            Object.defineProperty(RaisingImageManager, "instance", {
                get: function () {
                    return RaisingImageManager._instance || (RaisingImageManager._instance = new RaisingImageManager());
                },
                enumerable: true,
                configurable: true
            });
            RaisingImageManager.prototype.init = function (layer) {
                this._layer = layer;
            };
            return RaisingImageManager;
        }());
        tips.RaisingImageManager = RaisingImageManager;
        var RaiseItem = (function (_super) {
            __extends(RaiseItem, _super);
            function RaiseItem($url) {
                var _this = _super.call(this) || this;
                _this._isQuene = false;
                return _this;
            }
            Object.defineProperty(RaiseItem.prototype, "url", {
                get: function () {
                    return this._url;
                },
                set: function (value) {
                    this._url = value;
                    var t = Laya.loader.getRes(value);
                    if (t) {
                        this.graphics.drawTexture(t);
                    }
                    else {
                        Laya.loader.load(this._url, Handler.create(this, this.loadComplete));
                    }
                },
                enumerable: true,
                configurable: true
            });
            RaiseItem.prototype.loadComplete = function () {
                var t = Laya.loader.getRes(this.url);
                if (t) {
                    this.graphics.drawTexture(t);
                }
            };
            Object.defineProperty(RaiseItem.prototype, "isQuene", {
                get: function () {
                    return this._isQuene;
                },
                set: function (value) {
                    this._isQuene = value;
                },
                enumerable: true,
                configurable: true
            });
            RaiseItem.prototype.clear = function () {
                this.graphics.clear();
                this.removeSelf();
            };
            return RaiseItem;
        }(Sprite));
        tips.RaiseItem = RaiseItem;
    })(tips = zt.tips || (zt.tips = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var tips;
    (function (tips) {
        var Tween = Laya.Tween;
        var Handler = Laya.Handler;
        var RaisingItemManager = (function () {
            function RaisingItemManager() {
                this._registerDic = {};
                this._isFlying = false;
                this._displayItems = [];
                this._waitsQuene = [];
                this._flyItems = [];
            }
            RaisingItemManager.prototype.add = function (item) {
                this._waitsQuene.push(item);
            };
            RaisingItemManager.prototype.play = function () {
                if (this._busy) {
                    return;
                }
                this.playRaiseItem();
            };
            RaisingItemManager.prototype.arrange = function () {
                var len = this._displayItems.length;
                var raiseWidth = 88 * (len + 1) + 50 * len;
                var width = Laya.stage.width;
                var height = Laya.stage.height;
                var startX = width / 2 - raiseWidth / 2;
                var startY = height / 2 - 200;
                var raiseItem;
                for (var i = 0; i < len; i++) {
                    raiseItem = this._displayItems[i];
                    raiseItem.x = startX + i * 138;
                    raiseItem.y = startY;
                }
                this.playSingle();
            };
            RaisingItemManager.prototype.playSingle = function () {
                var _this = this;
                if (this._displayItems.length > 0) {
                    var raiseItem_1 = this._displayItems.shift();
                    raiseItem_1.playEffect(Handler.create(this, function () {
                        var toPoint = raiseItem_1.dragItem.raisePoint;
                        _this._flyItems.push(raiseItem_1);
                        _this.playSingle();
                    }));
                }
                else {
                    if (this._isFlying == false) {
                        this.flyItem();
                    }
                }
            };
            RaisingItemManager.prototype.flyItem = function () {
                if (this._flyItems.length > 0) {
                    this._isFlying = true;
                    var raiseItem = this._flyItems.shift();
                    var toPoint = raiseItem.dragItem.raisePoint;
                    Tween.to(raiseItem, { x: toPoint.x, y: toPoint.y }, 300, null, Handler.create(this, this.oncomplete, [raiseItem]));
                }
                else {
                    this._busy = false;
                    this.playRaiseItem();
                }
            };
            RaisingItemManager.prototype.addToStage = function () {
                var len = Math.min(this._waitsQuene.length, 5);
                if (len <= 0)
                    return;
                var raiseData;
                var raiseItem;
                var url;
                var index = 0;
                for (var i = 0; i < len; i++) {
                    raiseData = this._waitsQuene.pop();
                    url = this._registerDic[raiseData.key];
                    raiseItem = zt.Pool.ins.getComFormPool(url);
                    this._layer.addChild(raiseItem.displayObject);
                    raiseItem.setData(raiseData);
                    this._displayItems.push(raiseItem);
                }
                this._busy = true;
                this.arrange();
            };
            RaisingItemManager.prototype.registerRaiseItem = function ($key, url) {
                this._registerDic[$key] = url;
            };
            RaisingItemManager.prototype.playRaiseItem = function () {
                this.addToStage();
            };
            RaisingItemManager.prototype.getRaiseItem = function (url, isQuene) {
                if (isQuene === void 0) { isQuene = true; }
                var raiseItem = Laya.Pool.getItemByClass('raiseItem', tips.RaiseItem);
                raiseItem.url = url;
                raiseItem.isQuene = isQuene;
                return raiseItem;
            };
            RaisingItemManager.prototype.oncomplete = function (raiseItem) {
                this._isFlying = false;
                var url = this._registerDic[raiseItem.dragItem.key];
                if (raiseItem.displayObject.parent && raiseItem) {
                    raiseItem.displayObject.parent.removeChild(raiseItem.displayObject);
                }
                zt.Pool.ins.returnToPool(raiseItem, url);
                var point = raiseItem.dragItem.raisePoint;
                var effectUrl = zt.utils.getResourceURL('effects/itemDrop/explode.json');
                var effect = zt.effects.createEffect(effectUrl, 'gui', true);
                effect.playEffect(this._layer, point.x - 35, point.y - 35, false, Laya.BlendMode.ADD);
                this.flyItem();
            };
            Object.defineProperty(RaisingItemManager, "instance", {
                get: function () {
                    return RaisingItemManager._instance || (RaisingItemManager._instance = new RaisingItemManager());
                },
                enumerable: true,
                configurable: true
            });
            RaisingItemManager.prototype.init = function (layer) {
                this._layer = layer;
            };
            return RaisingItemManager;
        }());
        tips.RaisingItemManager = RaisingItemManager;
    })(tips = zt.tips || (zt.tips = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var tips;
    (function (tips_1) {
        var Tween = Laya.Tween;
        var Handler = Laya.Handler;
        var Text = Laya.Text;
        var RaisingTipManager = (function () {
            function RaisingTipManager() {
                this._last = 0;
            }
            RaisingTipManager.prototype.add = function (tips, param) {
                if (Date.now() - this._last < RaisingTipManager.DURATION)
                    return;
                this._last = Date.now();
                this._waits = this._waits || [];
                this._waitParams = this._waitParams || [];
                this._waits.push(tips);
                this._waitParams.push(param);
                this.checkNext();
            };
            RaisingTipManager.prototype.checkNext = function () {
                this._waits.length > 0 && !this._busy && this.next();
            };
            RaisingTipManager.prototype.next = function () {
                this._busy = true;
                var tips = this._waits.shift();
                var param = this._waitParams.shift();
                var text = this.getText(tips, param);
                this._layer.addChild(text);
                var toY = text.y - RaisingTipManager.RAISING_Y;
                Tween.to(text, { y: toY }, RaisingTipManager.DURATION, null, Handler.create(this, this.oncomplete, [text]));
            };
            RaisingTipManager.prototype.getText = function (tips, param) {
                var text = new Text();
                text.color = param.color != null ? param.color : '#E8B723';
                text.text = tips;
                text.fontSize = param.fontSize != null ? param.fontSize : 14;
                text.bold = param.bold != null ? param.bold : true;
                text.stroke = param.stroke != null ? param.stroke : 1;
                this.showToStage(text);
                return text;
            };
            RaisingTipManager.prototype.showToStage = function (tip) {
                tip.x = Laya.stage.mouseX - tip.textWidth / 2;
                tip.y = Laya.stage.mouseY - tip.textHeight + RaisingTipManager.OFFSET_Y;
                if (tip.x + tip.textWidth > Laya.stage.width) {
                    tip.x = Laya.stage.width - tip.textWidth - RaisingTipManager.OFFSET_X;
                }
                else if (tip.x - tip.textWidth < 0) {
                    tip.x = tip.textWidth + RaisingTipManager.OFFSET_X;
                }
            };
            RaisingTipManager.prototype.oncomplete = function (text) {
                text.removeSelf();
                console.log(text.text + " on completed.");
                this._busy = false;
                this.checkNext();
            };
            Object.defineProperty(RaisingTipManager, "instance", {
                get: function () {
                    return RaisingTipManager._instance || (RaisingTipManager._instance = new RaisingTipManager());
                },
                enumerable: true,
                configurable: true
            });
            RaisingTipManager.prototype.init = function (layer) {
                this._layer = layer;
            };
            RaisingTipManager.DURATION = 1000;
            RaisingTipManager.RAISING_Y = 50;
            RaisingTipManager.OFFSET_X = -10;
            RaisingTipManager.OFFSET_Y = -5;
            return RaisingTipManager;
        }());
        tips_1.RaisingTipManager = RaisingTipManager;
    })(tips = zt.tips || (zt.tips = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var tips;
    (function (tips) {
        var TipCaches = (function () {
            function TipCaches() {
                this._hash = {};
            }
            TipCaches.getInstance = function () {
                return this._instance || (this._instance = new TipCaches);
            };
            TipCaches.register = function (type, cls) {
                TipCaches._cls[type] = cls;
            };
            TipCaches.prototype.getTip = function (type) {
                Laya.timer.clear(this, this.clear);
                if (this._hash[type] == null) {
                    this._hash[type] = this.getTipByType(type);
                }
                return this._hash[type];
            };
            TipCaches.prototype.getTipByType = function (type) {
                if (TipCaches._cls[type] == null)
                    throw new Error("tip class[" + type + "] not found.");
                return new TipCaches._cls[type];
            };
            TipCaches.prototype.clearCache = function () {
                this.clear();
            };
            TipCaches.prototype.clear = function () {
                this._hash = {};
            };
            TipCaches._cls = {};
            TipCaches.DELAY = 5000;
            return TipCaches;
        }());
        tips.TipCaches = TipCaches;
    })(tips = zt.tips || (zt.tips = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var tips;
    (function (tips) {
        var TipManager = (function () {
            function TipManager() {
            }
            TipManager.prototype.show = function (type, data) {
                Laya.timer.once(TipManager.DELAY, this, this.showTip, [type, data], true);
            };
            TipManager.prototype.showTip = function (type, data) {
                var tip = tips.TipCaches.getInstance().getTip(type);
                tip.setData(data);
                tip.draw();
                this._currentTip = tip;
                this._layer.addChild(tip.ui);
                this.showToStage(tip);
                Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onStageMouseMove);
                this.onStageMouseMove(null);
            };
            TipManager.prototype.onStageMouseMove = function (param0) {
                this.showToStage(this._currentTip, TipManager.OFFSETX, TipManager.OFFSETY);
            };
            TipManager.prototype.showToStage = function (tip, offX, offY) {
                if (offX === void 0) { offX = 0; }
                if (offY === void 0) { offY = 0; }
                tip.ui.x = Laya.stage.mouseX + offX;
                tip.ui.y = Laya.stage.mouseY + offY;
                var num = 30;
                if (tip.ui.x + tip.bgWidth + offX > Laya.stage.width) {
                    tip.ui.x = Laya.stage.width - tip.bgWidth - num;
                }
                else if (tip.ui.x + offX < 0) {
                    tip.ui.x = 0;
                }
                if (tip.ui.y + tip.bgHeight + offY > Laya.stage.height) {
                    tip.ui.y = Laya.stage.height - tip.bgHeight - num;
                }
                else if (tip.ui.y + offY < 0) {
                    tip.ui.y = 0;
                }
            };
            TipManager.prototype.dispose = function () {
                TipManager._instance = null;
            };
            Object.defineProperty(TipManager, "instance", {
                get: function () {
                    return TipManager._instance || (TipManager._instance = new TipManager());
                },
                enumerable: true,
                configurable: true
            });
            TipManager.prototype.hide = function () {
                Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onStageMouseMove);
                Laya.timer.clear(this, this.showTip);
                this._currentTip && this._currentTip.dispose();
                this._currentTip = null;
            };
            TipManager.prototype.init = function (layer) {
                this._layer = layer;
            };
            TipManager.OFFSETX = 10;
            TipManager.OFFSETY = 15;
            TipManager.DELAY = 200;
            return TipManager;
        }());
        tips.TipManager = TipManager;
    })(tips = zt.tips || (zt.tips = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var tips;
    (function (tips) {
        var BaseTip = (function () {
            function BaseTip() {
            }
            BaseTip.prototype.setData = function (data) {
                this._data = data;
            };
            Object.defineProperty(BaseTip.prototype, "bgWidth", {
                get: function () { return this._bgWidth; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(BaseTip.prototype, "bgHeight", {
                get: function () { return this._bgHeight; },
                enumerable: true,
                configurable: true
            });
            BaseTip.prototype.draw = function () { throw Error('must be overrided'); };
            BaseTip.prototype.dispose = function () {
                this._ui.removeSelf();
            };
            Object.defineProperty(BaseTip.prototype, "ui", {
                get: function () { return this._ui; },
                enumerable: true,
                configurable: true
            });
            return BaseTip;
        }());
        tips.BaseTip = BaseTip;
    })(tips = zt.tips || (zt.tips = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var tips;
    (function (tips) {
        var CommonTip = (function (_super) {
            __extends(CommonTip, _super);
            function CommonTip() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            CommonTip.prototype.draw = function () {
                var ui = this._data.ui;
                this._bgWidth = ui.getChild('bg').displayObject.width;
                this._bgHeight = ui.getChild('bg').displayObject.height;
                this._ui = ui.displayObject;
            };
            CommonTip.prototype.dispose = function () {
                _super.prototype.dispose.call(this);
                this._data.dispose();
            };
            return CommonTip;
        }(tips.BaseTip));
        tips.CommonTip = CommonTip;
    })(tips = zt.tips || (zt.tips = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var tips;
    (function (tips) {
        var Sprite = Laya.Sprite;
        var NormalTip = (function (_super) {
            __extends(NormalTip, _super);
            function NormalTip() {
                var _this = _super.call(this) || this;
                _this._list = [];
                _this._ui = new Sprite;
                return _this;
            }
            NormalTip.prototype.draw = function () {
                if (this._bg)
                    this._bg.removeSelf();
                this._bg = tips.getTipBg();
                this._ui.addChildren(this._bg);
                this._list = [];
                this._bgWidth = 0;
                this._h = 0;
                this._h += NormalTip.GAP;
                for (var _i = 0, _a = this._data; _i < _a.length; _i++) {
                    var item = _a[_i];
                    this._list.push(this.createText(item));
                }
                this._bgHeight = (this._h + NormalTip.GAP - NormalTip.LINE_GAP);
                this._bg.width = this._bgWidth;
                this._bg.height = this._bgHeight;
            };
            NormalTip.prototype.createText = function (text) {
                var item = new Laya.Text();
                item.wordWrap = true;
                item.text = text;
                item.color = '#FFFFFF';
                item.overflow = Laya.Text.VISIBLE;
                item.fontSize = 14;
                item.width = NormalTip.MAX_TEXT_WIDTH;
                item.x = NormalTip.GAP;
                item.y = this._h;
                var bgWidth = NormalTip.MAX_TEXT_WIDTH + NormalTip.GAP * 2;
                if (item.textWidth < NormalTip.MAX_TEXT_WIDTH)
                    bgWidth = item.textWidth + NormalTip.GAP * 2;
                if (bgWidth > this._bgWidth)
                    this._bgWidth = bgWidth;
                this._h += item.textHeight + NormalTip.LINE_GAP;
                this._ui.addChildren(item);
                return item;
            };
            NormalTip.prototype.dispose = function () {
                _super.prototype.dispose.call(this);
                this._list.forEach(function (i) { return i.removeSelf(); });
            };
            NormalTip.MAX_TEXT_WIDTH = 300;
            NormalTip.GAP = 10;
            NormalTip.LINE_GAP = 5;
            return NormalTip;
        }(tips.BaseTip));
        tips.NormalTip = NormalTip;
    })(tips = zt.tips || (zt.tips = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var tips;
    (function (tips) {
        var SimpleTip = (function (_super) {
            __extends(SimpleTip, _super);
            function SimpleTip() {
                var _this = _super.call(this) || this;
                _this._ui = new Sprite;
                return _this;
            }
            SimpleTip.prototype.draw = function () {
                if (this._bg)
                    this._bg.removeSelf();
                this._bg = tips.getTipBg();
                this._text = new Laya.Text();
                this._text.wordWrap = true;
                this._text.text = this._data;
                this._text.color = '#FFFFFF';
                this._text.overflow = Laya.Text.VISIBLE;
                this._text.fontSize = 14;
                this._text.width = SimpleTip.MAX_TEXT_WIDTH;
                this._text.x = SimpleTip.GAP;
                this._text.y = SimpleTip.GAP;
                this._bgWidth = SimpleTip.MAX_TEXT_WIDTH + SimpleTip.GAP * 2;
                if (this._text.textWidth < SimpleTip.MAX_TEXT_WIDTH)
                    this._bgWidth = this._text.textWidth + SimpleTip.GAP * 2;
                this._bgHeight = this._text.height + SimpleTip.GAP * 2;
                this._bg.width = this._bgWidth;
                this._bg.height = this._bgHeight;
                this._ui.addChildren(this._bg, this._text);
            };
            SimpleTip.MAX_TEXT_WIDTH = 300;
            SimpleTip.GAP = 10;
            return SimpleTip;
        }(tips.BaseTip));
        tips.SimpleTip = SimpleTip;
    })(tips = zt.tips || (zt.tips = {}));
})(zt || (zt = {}));
var Sprite = Laya.Sprite;
var TipManager = zt.tips.TipManager;
var RaisingTipManager = zt.tips.RaisingTipManager;
var RaisingImageManager = zt.tips.RaisingImageManager;
var RaisingItemManager = zt.tips.RaisingItemManager;
var TipCaches = zt.tips.TipCaches;
var CommonTip = zt.tips.CommonTip;
var NormalTip = zt.tips.NormalTip;
var SimpleTip = zt.tips.SimpleTip;
var zt;
(function (zt) {
    var Tips = (function () {
        function Tips() {
        }
        Tips.show = function (tip) {
            if (typeof tip === 'string') {
                Tips.showSimpleTip(tip);
            }
            else if (Array.isArray(tip)) {
                Tips.showTipNormal(tip);
            }
            else {
                Tips.showCommonTip(tip);
            }
        };
        Tips.isJSON = function (str) {
            if (str.indexOf('{') === -1 && str.indexOf('[') === -1)
                return false;
            try {
                JSON.parse(str);
                return true;
            }
            catch (e) {
                return false;
            }
        };
        Tips.showRaisingTips = function (tips, type, param) {
            if (type === void 0) { type = 0; }
            switch (type) {
                case 0:
                    param = {};
                    break;
                case 1:
                    param = { 'color': '#5cff92' };
                    break;
                case 2:
                    param = { 'color': '#e03645' };
                    break;
                case 3:
                    param = param || {};
                    break;
            }
            RaisingTipManager.instance.add(tips, param);
        };
        Tips.showRaiseItem = function (data) {
            RaisingItemManager.instance.add(data);
        };
        Tips.registerRaiseItem = function (key, url) {
            RaisingItemManager.instance.registerRaiseItem(key, url);
        };
        Tips.playRaiseItem = function () {
            RaisingItemManager.instance.play();
        };
        Tips.showRaisingImages = function (url, param) {
            RaisingImageManager.instance.add(url, param);
        };
        Tips.showTipNormal = function (tip) {
            Tips.showTipByType(TipType.NORMAL, tip);
        };
        Tips.showSimpleTip = function (tip) {
            Tips.showTipByType(TipType.SIMPLE, tip);
        };
        Tips.showCommonTip = function (ui) {
            Tips.showTipByType(TipType.COMMON, ui);
        };
        Tips.hide = function () {
            TipCaches.getInstance().clearCache();
            TipManager.instance.hide();
        };
        Tips.showTipByType = function (type, data) {
            TipManager.instance.show(type, data);
        };
        Tips.register = function (type, cls) {
            TipCaches.register(type, cls);
        };
        Tips.init = function () {
            TipManager.instance.init(Tips.tipLayer);
            RaisingTipManager.instance.init(Tips.tipLayer);
            RaisingImageManager.instance.init(Tips.tipLayer);
            RaisingItemManager.instance.init(Tips.tipLayer);
            Tips.register(TipType.SIMPLE, SimpleTip);
            Tips.register(TipType.NORMAL, NormalTip);
            Tips.register(TipType.COMMON, CommonTip);
        };
        Object.defineProperty(Tips, "tipLayer", {
            get: function () {
                return zt.Layers.getLayer('tip');
            },
            enumerable: true,
            configurable: true
        });
        return Tips;
    }());
    zt.Tips = Tips;
    zt.getRaiseParam = function ($start, $end, $isQuene, $duration, $delta) {
        if ($isQuene === void 0) { $isQuene = false; }
        if ($duration === void 0) { $duration = 800; }
        if ($delta === void 0) { $delta = 30; }
        var param = { "start": $start, "end": $end, "duration": $duration, 'isQuene': $isQuene, detalTime: $delta };
        return param;
    };
})(zt || (zt = {}));
var TipType = (function () {
    function TipType() {
    }
    TipType.SIMPLE = 'simple';
    TipType.NORMAL = 'normal';
    TipType.COMMON = 'comomn';
    return TipType;
}());
var zt;
(function (zt) {
    var GComponent = fairygui.GComponent;
    var Event = Laya.Event;
    var Handler = Laya.Handler;
    var Adaptation = (function () {
        function Adaptation() {
        }
        Adaptation.init = function () {
            Adaptation._centerTarget = {};
            Adaptation._fullTarget = {};
            Adaptation._borderTarget = {};
            Adaptation._posTarget = {};
            Adaptation._funcTarget = {};
            Adaptation._handleParam = {};
            Adaptation._allTarget = { 1: Adaptation._centerTarget, 4: Adaptation._fullTarget, 8: Adaptation._borderTarget, 16: Adaptation._posTarget };
            Adaptation.addEvent();
        };
        Adaptation.addEvent = function () {
            Laya.stage.on(Event.RESIZE, this, this.resizeView);
        };
        Adaptation.resizeView = function () {
            var centerTarget = Adaptation._centerTarget;
            var fullTarget = Adaptation._fullTarget;
            var borderTarget = Adaptation._borderTarget;
            var funcTarget = Adaptation._funcTarget;
            var ui;
            for (var key in centerTarget) {
                ui = centerTarget[key];
                Adaptation.centerUIAdaptaion(ui);
            }
            for (var key in fullTarget) {
                ui = fullTarget[key];
                Adaptation.fullUIAdaptaion(ui);
            }
            for (var key in borderTarget) {
                ui = fullTarget[key];
                Adaptation.fullUIAdaptaion(ui);
            }
            for (var key in funcTarget) {
                var apply = funcTarget[key];
                apply instanceof Handler ? apply.run() : apply();
            }
        };
        Adaptation.fullUIAdaptaion = function ($ui) {
            var minW = Adaptation.MIN_SCEEN_W;
            var minH = Adaptation.MIN_SCEEN_H;
            var maxH = Adaptation.MAX_SCREEN_H;
            var maxW = Adaptation.MAX_SCREEN_W;
            $ui.scaleX = $ui.scaleY = 1;
            var uiW = $ui.width;
            var uiH = $ui.height;
            var stageW = Laya.stage.width;
            var stageH = Laya.stage.height;
            if (uiW < stageW) {
                $ui.width = stageW;
            }
            if (uiH > stageH) {
                $ui.height = stageH;
            }
            if (uiW > stageW) {
                $ui.width = minW;
            }
            if (uiH > stageH) {
                $ui.height = minH;
            }
            $ui.x = 0;
            $ui.y = 0;
            var funcParam = Adaptation._handleParam;
            var key = $ui instanceof GComponent ? $ui.resourceURL : $ui.moduleName;
            funcParam[key].run();
        };
        Adaptation.centerUIAdaptaion = function ($ui) {
            var minW = Adaptation.MIN_SCEEN_W;
            var minH = Adaptation.MIN_SCEEN_H;
            var maxH = Adaptation.MAX_SCREEN_H;
            var maxW = Adaptation.MAX_SCREEN_W;
            $ui.scaleX = $ui.scaleY = 1;
            var rect = $ui.getAppBounds();
            var uiW = rect.width;
            var uiH = rect.height;
            var stageW = Laya.stage.width;
            var stageH = Laya.stage.height;
            $ui.x = stageW - uiW >> 1;
            $ui.y = stageH - uiH >> 1;
            var scaleX = stageW > maxW ? stageW / maxW : 1;
            var scaleY = stageH > maxH ? stageH / maxH : 1;
            if (uiW > stageW && uiH > stageH) {
                $ui.width = stageW;
                $ui.height = stageH;
            }
        };
        Adaptation.removeEvent = function () {
            Laya.stage.on(Event.RESIZE, this, this.resizeView);
        };
        Adaptation.register = function ($ui, $adaptType, handler) {
            if ($adaptType === void 0) { $adaptType = AdaptationType.ADAPT_CENTER; }
            var target = Adaptation._allTarget[$adaptType];
            var key = $ui instanceof GComponent ? $ui.resourceURL : $ui.moduleName;
            target[key] = $ui;
            if (handler)
                Adaptation._handleParam[key] = handler;
        };
        Adaptation.registerFunc = function ($key, target) {
            Adaptation._funcTarget[$key] = target;
        };
        Adaptation.unregisterFunc = function ($key) {
            var funcTarget = Adaptation._funcTarget;
            var apply = funcTarget[$key];
            apply instanceof Handler ? apply.recover() : console.log('adaptation');
            delete Adaptation._funcTarget[$key];
        };
        Adaptation.unregister = function ($target, $adaptType) {
            if ($adaptType === void 0) { $adaptType = AdaptationType.ADAPT_CENTER; }
            var target = Adaptation._allTarget[$adaptType];
            if (!!target == false) {
                zt.Tips.showRaisingTips('正在注销未注册的自适应策略！');
                return;
            }
            var key = $target instanceof GComponent ? $target.resourceURL : $target.moduleName;
            delete target[key];
        };
        Adaptation.MAX_SCREEN_W = 1920;
        Adaptation.MAX_SCREEN_H = 1080;
        Adaptation.MIN_SCEEN_W = 1280;
        Adaptation.MIN_SCEEN_H = 768;
        return Adaptation;
    }());
    zt.Adaptation = Adaptation;
    var AdaptationType = (function () {
        function AdaptationType() {
        }
        AdaptationType.ADAPT_CENTER = 1;
        AdaptationType.ADAPT_FULL_SCREEN = 4;
        AdaptationType.ADAPT_CLOSE_BORDER = 8;
        AdaptationType.ADAPT_OPEN_POS = 16;
        return AdaptationType;
    }());
    zt.AdaptationType = AdaptationType;
})(zt || (zt = {}));
var zt;
(function (zt) {
    var utils;
    (function (utils) {
        var ArrayUtil = (function () {
            function ArrayUtil() {
            }
            ArrayUtil.contains = function (item, list) {
                return list.indexOf(item) != -1;
            };
            ArrayUtil.remove = function (item, list) {
                var index = list.indexOf(item);
                if (index != -1)
                    return list.splice(index, 1)[0];
                return null;
            };
            ArrayUtil.keys = function (object) {
                var keys = [];
                for (var property in object)
                    keys.push(property);
                return keys;
            };
            ArrayUtil.sortOnArr = function (arr, keyArr, order) {
                if (keyArr == undefined || order == undefined) {
                    return;
                }
                if (keyArr.length != order.length || keyArr.length == 0) {
                    return;
                }
                arr.sort(function (a, b) {
                    if (a[keyArr[0]] > b[keyArr[0]])
                        return order[0] == ArrayUtil.NUMERIC ? 1 : -1;
                    if (a[keyArr[0]] < b[keyArr[0]])
                        return order[0] == ArrayUtil.NUMERIC ? -1 : 1;
                    if (keyArr.length > 1) {
                        if (a[keyArr[1]] > b[keyArr[1]])
                            return order[1] == ArrayUtil.NUMERIC ? 1 : -1;
                        if (a[keyArr[1]] < b[keyArr[1]])
                            return order[1] == ArrayUtil.NUMERIC ? -1 : 1;
                        if (keyArr.length > 2) {
                            if (a[keyArr[2]] > b[keyArr[2]])
                                return order[2] == ArrayUtil.NUMERIC ? 1 : -1;
                            if (a[keyArr[2]] < b[keyArr[2]])
                                return order[2] == ArrayUtil.NUMERIC ? -1 : 1;
                        }
                    }
                    return 0;
                });
            };
            ArrayUtil.NUMERIC = 16;
            ArrayUtil.DESCENDING = 2;
            return ArrayUtil;
        }());
        utils.ArrayUtil = ArrayUtil;
    })(utils = zt.utils || (zt.utils = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var LocalStorage = laya.net.LocalStorage;
    zt.__app = function (data) {
        LocalStorage.setItem('default_app', data);
        zt.reload();
    };
    zt.__getapp = function () { return LocalStorage.getItem('default_app'); };
    zt.__scene = function (name) {
        LocalStorage.setItem('default_scene', name);
        zt.reload();
    };
    zt.__getscene = function () { return LocalStorage.getItem('default_scene'); };
    zt.__disable = function (names) {
        if (typeof names === 'string')
            names = [names];
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name_3 = names_1[_i];
            LocalStorage.setItem(name_3, '0');
        }
        zt.reload();
    };
    zt.__enable = function (key) {
        LocalStorage.setItem(key, '1');
        zt.reload();
    };
    zt.__enablePlayGround = function (key) {
        zt.__enable('playground');
    };
    zt.__enableDebugPanel = function () {
        LocalStorage.setItem('debugLibs', 'laya.ani,laya.ui,laya.debugtool');
        zt.__enable('debugPanel');
    };
    zt.__disableDebugPanel = function () {
        LocalStorage.setItem('debugLibs', '');
        zt.__disable('debugPanel');
    };
    zt.__getDebugEnabled = function (key) {
        return LocalStorage.getItem(key) === '1';
    };
    zt.__getEnabled = function (key) {
        return LocalStorage.getItem(key) === '1' || LocalStorage.getItem(key) === null;
    };
    zt.__clear = function () {
        LocalStorage.clear();
        zt.reload();
    };
    zt.__clearAndDisable = function (names) {
        names = names || ['amf', 'gm'];
        LocalStorage.clear();
        zt.__disable(names);
        zt.reload();
    };
    zt.__cb = function (cmd, params) {
        __cbEntity(cmd, params);
    };
    var __cbEntity = function (cmd, params) {
        var eventname = zt.net.EventUtils.getSeqEventName(cmd);
        zt.net.GameSocket.instance.event(eventname, params);
    };
    zt.__notify = function (cmd, params) {
        __notifyEntity(cmd, params);
        console.log("[DEBUG Notify] " + zt.data);
    };
    var __notifyEntity = function (cmd, params) {
        zt.net.GameSocket.instance.event(cmd, params);
    };
})(zt || (zt = {}));
var zt;
(function (zt) {
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
            zt.utils.ArrayUtil.remove(ship, FloatTool.instance._ships);
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
            if (offset == null)
                return;
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
        Object.defineProperty(FloatTool, "instance", {
            get: function () {
                if (!FloatTool._instance)
                    FloatTool.init();
                return FloatTool._instance;
            },
            set: function (f) { FloatTool._instance = f; },
            enumerable: true,
            configurable: true
        });
        FloatTool.init = function () {
            FloatTool.instance = new FloatTool();
            Laya.timer.frameLoop(1, FloatTool.instance, FloatTool.instance.onframe);
        };
        FloatTool.SPEED = 0.1;
        FloatTool.RANGE = 5;
        return FloatTool;
    }());
    zt.FloatTool = FloatTool;
})(zt || (zt = {}));
var zt;
(function (zt) {
    zt.getDefinition = function (classpath) {
        var paths = classpath.split('.');
        var definition = window;
        for (var _i = 0, paths_1 = paths; _i < paths_1.length; _i++) {
            var path = paths_1[_i];
            definition = definition[path];
            if (!definition) {
                return null;
            }
        }
        return definition;
    };
})(zt || (zt = {}));
var zt;
(function (zt) {
    var utils;
    (function (utils) {
        var Point = Laya.Point;
        utils.getAngle = function (form, to) {
            var lx = to.x - form.x;
            var ly = to.y - form.y;
            return Math.atan2(ly, lx) * 180 / Math.PI;
        };
        utils.getDistance = function (form, to) {
            var p1 = new Laya.Point(form.x, form.y);
            return p1.distance(to.x, to.y);
        };
        utils.fix = function (value, fixnum) {
            if (fixnum === void 0) { fixnum = 0; }
            var fixNum = fixnum + 1;
            var power = Math.pow(10, fixNum);
            var num = Math.round(value * power) / power;
            return num;
        };
        utils.sum = function (nums) {
            if (nums.length == 0)
                return 0;
            if (nums.length == 1)
                return Number(nums[0]);
            return Number(nums.reduce(function (a, b) { return a + b; }));
        };
        utils.getTargetToCenter = function (x, y, p1, p2) {
            var A = 950;
            var B = -962;
            var C = -388720;
            var length = Math.abs(A * x + B * y + C) / Math.sqrt(A * A + B * B);
            return length;
        };
        utils.getLineVerticalPoint = function (x, y, p1, p2) {
            p1 = new Point(475, 65);
            p2 = new Point(1437, 1015);
            var A = (p1.y - p2.y) / (p1.x - p2.x);
            var B = p1.y - A * p1.x;
            var m = x + A * y;
            var px = (m - A * B) / (A * A + 1);
            var py = px + B;
            return new Point(px, py);
        };
    })(utils = zt.utils || (zt.utils = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var utils;
    (function (utils) {
        var ModuleUtils = (function () {
            function ModuleUtils() {
            }
            ModuleUtils.getModulePath = function (name) {
                return 'zt.' + name + '.' + name;
            };
            ModuleUtils.hasDefinition = function (name) {
                return !!ModuleUtils.getModuleDefinition(name);
            };
            ModuleUtils.getModuleDefinition = function (name) {
                var classpath = ModuleUtils.getModulePath(name);
                return zt.getDefinition(classpath);
            };
            ModuleUtils.getInstance = function (name) {
                var cls = ModuleUtils.getModuleDefinition(name);
                return new cls();
            };
            return ModuleUtils;
        }());
        utils.ModuleUtils = ModuleUtils;
    })(utils = zt.utils || (zt.utils = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var MyArray = (function () {
        function MyArray() {
        }
        MyArray.sortOn = function (arr, fieldName, options) {
            if (options === void 0) { options = null; }
            if (fieldName instanceof Array) {
                if (options == null) {
                    options = [];
                }
                this.listSortFunc(arr, fieldName, options);
            }
            else {
                if (options == null) {
                    options = 0;
                }
                this.oneSortFunc(arr, fieldName, options);
            }
        };
        MyArray.oneSortFunc = function (arr, fieldName, options) {
            var _this = this;
            arr.sort(function (a, b) {
                return _this.sortFunc(a[fieldName], b[fieldName], options);
            });
        };
        MyArray.listSortFunc = function (arr, fieldNameList, optionsList) {
            var _this = this;
            arr.sort(function (a, b) {
                for (var i = 0; i < fieldNameList.length; i++) {
                    var fieldName = fieldNameList[i];
                    var options = optionsList[i] != null ? optionsList[i] : 0;
                    var sortValue = _this.sortFunc(a[fieldName], b[fieldName], options);
                    if (sortValue != 0) {
                        return sortValue;
                    }
                }
                return 0;
            });
        };
        MyArray.sortFunc = function (a, b, options) {
            if (this.isNumeric(options)) {
                var tempA = a instanceof String ? parseFloat(a) : a;
                var tempB = b instanceof String ? parseFloat(b) : b;
                return this.numberCompare(tempA, tempB, options);
            }
            return this.stringCompare(a, b, options);
        };
        MyArray.numberCompare = function (a, b, options) {
            if (this.isDescending(options)) {
                return b - a;
            }
            return a - b;
        };
        MyArray.stringCompare = function (a, b, options) {
            if (a > b) {
                return this.isDescending(options) ? -1 : 1;
            }
            else if (a < b) {
                return this.isDescending(options) ? 1 : -1;
            }
            else {
                return 0;
            }
        };
        MyArray.isDescending = function (options) {
            return (options & MyArray.DESCENDING) != 0;
        };
        MyArray.isNumeric = function (options) {
            return (options & MyArray.NUMERIC) != 0;
        };
        MyArray.DESCENDING = 2;
        MyArray.NUMERIC = 16;
        return MyArray;
    }());
    zt.MyArray = MyArray;
})(zt || (zt = {}));
var zt;
(function (zt) {
    var ObjectUtils = (function () {
        function ObjectUtils() {
        }
        ObjectUtils.hasKey = function (obj) {
            if (!obj)
                return false;
            var bol = false;
            if (obj == null || typeof obj.constructor == 'string')
                return bol;
            for (var key in obj) {
                bol = true;
                break;
            }
            return bol;
        };
        return ObjectUtils;
    }());
    zt.ObjectUtils = ObjectUtils;
    zt.getKey = function (object) { return Object.keys(object)[0]; };
    zt.getValue = function (object) { return object[zt.getKey(object)]; };
})(zt || (zt = {}));
var zt;
(function (zt) {
    var GObjectPool = fairygui.GObjectPool;
    var Pool = (function () {
        function Pool() {
            if (!!Pool._gobjectPool == false) {
                Pool._gobjectPool = {};
            }
        }
        Object.defineProperty(Pool, "ins", {
            get: function () {
                if (!!Pool._pool == false) {
                    Pool._pool = new Pool();
                }
                return Pool._pool;
            },
            enumerable: true,
            configurable: true
        });
        Pool.prototype.getComFormPool = function ($url) {
            var comPool = Pool._gobjectPool[$url];
            if (!comPool) {
                comPool = new GObjectPool();
                Pool._gobjectPool[$url] = comPool;
            }
            var obj = comPool.getObject($url);
            obj.visible = true;
            return obj;
        };
        Pool.prototype.returnToPool = function (obj, $url) {
            var comPool = Pool._gobjectPool[$url];
            if (comPool) {
                comPool.returnObject(obj);
            }
        };
        Pool.prototype.clear = function ($url) {
            var comPool = Pool._gobjectPool[$url];
            if (comPool) {
                comPool.clear();
                comPool = null;
                delete Pool._gobjectPool[$url];
            }
        };
        return Pool;
    }());
    zt.Pool = Pool;
})(zt || (zt = {}));
var zt;
(function (zt) {
    var utils;
    (function (utils) {
        var stringUtil = (function () {
            function stringUtil() {
            }
            stringUtil.paramFormat = function (str) {
                var paramList = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    paramList[_i - 1] = arguments[_i];
                }
                if (!!str == false)
                    return '文本错误';
                if (typeof str === 'string')
                    return stringUtil.paramFormatItem(str, paramList);
                return str.map(function (i) {
                    return stringUtil.paramFormatItem(i, paramList);
                });
            };
            stringUtil.paramFormatItem = function (str, paramList) {
                var g;
                for (var i = 0; i < paramList.length; i++) {
                    g = new RegExp('\\{' + i + '\\}', 'g');
                    str = str.replace(g, paramList[i]);
                }
                return str;
            };
            stringUtil.isNumeric = function (p_string) {
                if (p_string == null) {
                    return false;
                }
                var regx = /^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?$/;
                return regx.test(p_string);
            };
            stringUtil.trim = function (p_string) {
                if (p_string == null) {
                    return '';
                }
                return p_string.replace(/^\s+|\s+$/g, '');
            };
            stringUtil.replaceFirstUper = function (str) {
                var reg = /\b(\w)|\s(\w)/g;
                return str.replace(reg, function (m) { return m.toUpperCase(); });
            };
            stringUtil.replaceFirstLower = function (str) {
                var reg = /\b(\w)|\s(\w)/g;
                return str.replace(reg, function (m) { return m.toLowerCase(); });
            };
            return stringUtil;
        }());
        utils.stringUtil = stringUtil;
    })(utils = zt.utils || (zt.utils = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var System = (function () {
        function System() {
        }
        System.setSystemTime = function (val) {
            System._systemTime = val;
            System._systemTimeTag = Date.now();
        };
        return System;
    }());
    zt.System = System;
})(zt || (zt = {}));
var zt;
(function (zt) {
    var utils;
    (function (utils) {
        utils.getDataURL = function (path) { return utils.getURL('data/' + path); };
        utils.getJSURL = function (name) { return utils.getURL('js/' + name + '.js'); };
        utils.getResourceURL = function (path) { return utils.getURL('res/' + path); };
        utils.getUIURL = function (path) { return utils.getURL('ui/' + path); };
        utils.getURL = function (path) {
            return "http://h5.wcy.cc:8080/" + '/' + path;
        };
    })(utils = zt.utils || (zt.utils = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var Sprite = Laya.Sprite;
    var Handler = Laya.Handler;
    var Point = Laya.Point;
    var Loader = Laya.Loader;
    var Rectangle = Laya.Rectangle;
    var GuideLine = (function (_super) {
        __extends(GuideLine, _super);
        function GuideLine() {
            var _this = _super.call(this) || this;
            _this.pathLength = 87;
            _this._mapRect = null;
            _this._offsetX = 0;
            _this._offsetY = 0;
            _this._isLoad = false;
            _this._frame = 0;
            _this.lightUrl0 = zt.utils.getResourceURL('universe/line/0.png');
            _this.lightUrl1 = zt.utils.getResourceURL('universe/line/1.png');
            _this.lightUrl2 = zt.utils.getResourceURL('universe/line/2.png');
            _this.blendMode = Laya.BlendMode.ADD;
            return _this;
        }
        GuideLine.prototype.init = function () {
            Laya.timer.clear(this, this.reRender);
            Laya.timer.loop(200, this, this.reRender);
        };
        GuideLine.prototype.clear = function () {
            Laya.timer.clear(this, this.reRender);
        };
        Object.defineProperty(GuideLine.prototype, "data", {
            get: function () {
                return this._data;
            },
            set: function (value) {
                this._data = value;
            },
            enumerable: true,
            configurable: true
        });
        GuideLine.prototype.reRender = function () {
            this._frame++;
            this.graphics.clear();
            var x, y;
            var frame = this._frame % 3;
            var urlConst = this['lightUrl' + frame];
            var t = Laya.loader.getRes(urlConst);
            var w = t.width;
            var h = t.height;
            var matrix = new Laya.Matrix();
            matrix.rotate(this._angle);
            for (var _i = 0, _a = this._pathList; _i < _a.length; _i++) {
                var pathData = _a[_i];
                x = pathData.x;
                y = pathData.y;
                this.graphics.drawTexture(t, x, y);
            }
        };
        GuideLine.prototype.loadTex = function () {
            this._mapRect = new Rectangle();
            this._mapRect.x = this._offsetX - 100;
            this._mapRect.y = this._offsetY - 100;
            this._mapRect.width = Laya.stage.width + 100;
            this._mapRect.height = Laya.stage.height + 100;
            var url = this.url;
            Laya.loader.load(url, Handler.create(this, this.clipViewPort), null, Loader.ATLAS);
        };
        Object.defineProperty(GuideLine.prototype, "url", {
            get: function () {
                if (this._url == undefined || this._url == null) {
                    this._url = zt.utils.getResourceURL('universe/line.json');
                }
                return this._url;
            },
            enumerable: true,
            configurable: true
        });
        GuideLine.prototype.clipViewPort = function () {
            this._isLoad = true;
            this._pathList = [];
            var distance = this.getDistance(this._start, this._end);
            var len = Math.ceil(distance / this.pathLength);
            var pathTotal = new Point();
            var pathData;
            var t;
            for (var i = 0; i < len; i++) {
                pathTotal.x = this.pathLength * i;
                pathData = new PathData(pathTotal.x, 0);
                this._pathList.push(pathData);
            }
            if (this._pathList.length > 0) {
                this.init();
            }
            else {
                this.clear();
            }
            this.pivotX = 0.5;
            this.pivotY = 0.5;
            this.x = this._start.x;
            this.y = this._start.y;
            this.rotation = this._angle;
        };
        GuideLine.prototype.getDistance = function ($start, $end) {
            var distance = 0;
            distance = $start.distance($end.x, $end.y);
            var lx = $end.x - $start.x;
            var ly = $end.y - $start.y;
            this._angle = Math.atan2(ly, lx) * 180 / Math.PI;
            return distance;
        };
        GuideLine.prototype.updatePath = function ($start, $end) {
            this._start = $start;
            this._end = $end;
            if (this._isLoad) {
                this.clipViewPort();
            }
            else {
                this.loadTex();
            }
        };
        GuideLine.prototype.update = function (offsetx, offsety) {
            if (offsetx === void 0) { offsetx = 0; }
            if (offsety === void 0) { offsety = 0; }
            this._offsetX = -offsetx;
            this._offsetY = -offsety;
            this._mapRect.x = this._offsetX - 100;
            this._mapRect.y = this._offsetY - 100;
            this._mapRect.width = Laya.stage.width + 100;
            this._mapRect.height = Laya.stage.height + 100;
            this.clipViewPort();
        };
        GuideLine.prototype.dispose = function () {
            this.clear();
            PathData.clear();
            this.graphics.clear();
        };
        return GuideLine;
    }(Sprite));
    zt.GuideLine = GuideLine;
    var GuideLineData = (function () {
        function GuideLineData() {
        }
        return GuideLineData;
    }());
    zt.GuideLineData = GuideLineData;
    var PathData = (function () {
        function PathData(x, y) {
            this._x = x;
            this._y = y;
        }
        PathData.getPath = function (x, y) {
            var pathData = PathData.pathDatas[zt.HexData.index];
            if (pathData == null) {
                pathData = new PathData(x, y);
                PathData.pathDatas[zt.HexData.index] = pathData;
            }
            else {
                pathData.x = x;
                pathData.x = y;
            }
            PathData.index++;
            return pathData;
        };
        Object.defineProperty(PathData.prototype, "x", {
            get: function () {
                return this._x;
            },
            set: function (value) {
                this._x = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PathData.prototype, "y", {
            get: function () {
                return this._y;
            },
            set: function (value) {
                this._y = value;
            },
            enumerable: true,
            configurable: true
        });
        PathData.reset = function () {
            PathData.index = 0;
        };
        PathData.clear = function () {
            PathData.pathDatas = null;
        };
        PathData.pathDatas = [];
        PathData.index = 0;
        return PathData;
    }());
    zt.PathData = PathData;
})(zt || (zt = {}));
var zt;
(function (zt) {
    var Sprite = Laya.Sprite;
    var Handler = Laya.Handler;
    var Point = Laya.Point;
    var Loader = Laya.Loader;
    var Rectangle = Laya.Rectangle;
    var Hexagonal = (function (_super) {
        __extends(Hexagonal, _super);
        function Hexagonal() {
            var _this = _super.call(this) || this;
            _this.edgeRange = 10;
            _this._mapRect = null;
            _this._offsetX = 0;
            _this._offsetY = 0;
            _this._isLoad = false;
            _this.blendMode = Laya.BlendMode.ADD;
            _this._mapRect = new Rectangle();
            return _this;
        }
        Hexagonal.prototype.init = function ($list) {
            this.dispose();
            this.initilization();
            this._hexRangeList = $list;
            if (this._isLoad == false) {
                this.loadTex();
            }
            else {
                this.clipViewPort();
            }
        };
        Hexagonal.prototype.getPointByIndex = function (u, v) {
            var point = new Laya.Point();
            point.x = 71.75 * u + 18.75 * v;
            point.y = 11.75 * u + 41.5 * v;
            return point;
        };
        Hexagonal.prototype.loadTex = function () {
            this.resizeMapRect();
            var url = zt.utils.getResourceURL('grid.json');
            Laya.loader.load(url, Handler.create(this, this.clipViewPort), null, Loader.ATLAS);
        };
        Hexagonal.prototype.resizeMapRect = function () {
            this._mapRect.x = (this._offsetX - 100);
            this._mapRect.y = (this._offsetY - 100);
            this._mapRect.width = (Laya.stage.width + 100) / this.scaleY;
            this._mapRect.height = (Laya.stage.height + 100) / this.scaleY;
        };
        Hexagonal.prototype.getIndexByPoint = function (p) {
            var point = new Point();
            var u;
            var v;
            u = (p.x * 41.5 - p.y * 18.75) / (71.75 * 41.50 - 11.75 * 18.75);
            v = (p.y * 71.75 - p.x * 11.75) / (71.75 * 41.50 - 11.75 * 18.75);
            u = Math.floor(u);
            v = Math.floor(v);
            point.setTo(u, v);
            return point;
        };
        Hexagonal.prototype.update = function (offsetx, offsety) {
            if (offsetx === void 0) { offsetx = 0; }
            if (offsety === void 0) { offsety = 0; }
            var ox = -offsetx;
            var oy = -offsety;
            this._offsetX = ox == undefined ? 0 : ox;
            this._offsetY = oy == undefined ? 0 : oy;
            this.resizeMapRect();
            this.dispose();
            this.initilization();
            this.clipViewPort();
        };
        Hexagonal.prototype.showHoldRange = function ($data) {
            if ($data === void 0) { $data = null; }
            var center;
            var uvPoint;
            var hexData;
            var range = 0;
            if (!this._hexRangeList)
                return;
            for (var _i = 0, _a = this._hexRangeList; _i < _a.length; _i++) {
                var hexRange = _a[_i];
                center = new Point(hexRange['X'], hexRange['Y']);
                uvPoint = this.getIndexByPoint(center);
                hexData = HexData.getHex(uvPoint.x, uvPoint.y);
                range = hexRange['Range'];
                this.generateByRange(hexData, range);
                this.viewPorts.push(hexData);
                if (this.cacheGrid[hexData.u] == null) {
                    this.cacheGrid[hexData.u] = new Object();
                }
                this.cacheGrid[uvPoint.x][uvPoint.y] = hexData;
                this.calcHexEdge(hexData, range);
            }
        };
        Hexagonal.prototype.generateByRange = function (hexData, range) {
            var uvPos = new Point();
            var u;
            var v;
            var tempHexData;
            var maxOrigin = hexData.u + hexData.v + range;
            var minOrigin = hexData.u + hexData.v - range;
            for (var i = -range; i <= range; i++) {
                for (var j = -range; j <= range; j++) {
                    u = hexData.u + i;
                    v = hexData.v + j;
                    if (i == j || u + v > maxOrigin || u + v < minOrigin)
                        continue;
                    uvPos = this.getPointByIndex(u, v);
                    if (this._mapRect.contains(uvPos.x, uvPos.y)) {
                        if (this.cacheGrid[u] == null) {
                            this.cacheGrid[u] = new Object();
                        }
                        if (this.cacheGrid[u][v] == null) {
                            tempHexData = HexData.getHex(u, v);
                            tempHexData.x = uvPos.x;
                            tempHexData.y = uvPos.y;
                            this.cacheGrid[u][v] = tempHexData;
                            this.viewPorts.push(tempHexData);
                        }
                    }
                }
            }
        };
        Hexagonal.prototype.clipViewPort = function () {
            this._isLoad = true;
            HexData.reset();
            this.showHoldRange();
            var url;
            var hexData;
            var grids = this.viewPorts;
            var len = grids.length;
            this.graphics.clear();
            var urlConst = zt.utils.getResourceURL('grid/0.png');
            var t = Laya.loader.getRes(urlConst);
            var gt;
            for (var i = 0; i < len; i++) {
                hexData = grids[i];
                this.graphics.drawTexture(t, hexData.x, hexData.y);
                if (hexData.isEdge == true) {
                    url = this.getEdgeSide(hexData);
                    gt = Laya.loader.getRes(url);
                    this.graphics.drawTexture(gt, hexData.x, hexData.y);
                }
            }
        };
        Hexagonal.prototype.getEdgeSide = function (hexData) {
            var urlNum = this.edgeTotalScore(hexData);
            var url = zt.utils.getResourceURL('grid/' + urlNum + '.png');
            return url;
        };
        Hexagonal.prototype.edgeTotalScore = function (hexData) {
            var result = 0;
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    result += this.sideScore(i, j, hexData);
                }
            }
            result += hexData.needAdd;
            return result;
        };
        Hexagonal.prototype.sideScore = function (u, v, hexData) {
            var result = 0;
            if (this.cacheGrid[hexData.u + u] == null ||
                this.cacheGrid[hexData.u + u][hexData.v + v] == null ||
                this.cacheGrid[hexData.u + u][hexData.v + v].isEdge == false) {
                return 0;
            }
            if (u == 1 && v == -1) {
                return 2;
            }
            if (u == 1 && v == 0) {
                return 4;
            }
            if (u == 0 && v == 1) {
                return 8;
            }
            if (u == -1 && v == 1) {
                return 16;
            }
            if (u == -1 && v == 0) {
                return 32;
            }
            if (u == 0 && v == -1) {
                return 64;
            }
            return 0;
        };
        Hexagonal.prototype.dispose = function () {
            this.graphics.clear();
            this.cacheGrid = null;
            this.viewPorts = null;
            this.hasGenerate = null;
        };
        Hexagonal.prototype.initilization = function () {
            this.cacheGrid = new Object();
            this.viewPorts = [];
            this.hasGenerate = new Object();
        };
        Hexagonal.prototype.calcHexEdge = function (hexData, depth) {
            var u = 0;
            var v = 0;
            var uvPos;
            for (var i = 0; i < depth; i++) {
                u = hexData.u - depth + i;
                v = hexData.v - i;
                this.edge(u, v, 1);
                u = hexData.u - depth;
                v = hexData.v + i;
                this.edge(u, v, 1);
                u = hexData.u - depth + i;
                v = hexData.v + depth;
                this.edge(u, v, 1);
                u = hexData.u + i;
                v = hexData.v + depth - i;
                this.edge(u, v, i == 0 ? 1 : 0);
                u = hexData.u + depth;
                v = hexData.v - i;
                this.edge(u, v, i == 0 ? 1 : 0);
                u = hexData.u + depth - i;
                v = hexData.v - depth;
                this.edge(u, v, i == 0 ? 1 : 0);
                u = hexData.u - i;
                v = hexData.v - depth + i;
                this.edge(u, v, 1);
            }
        };
        Hexagonal.prototype.edge = function (u, v, add) {
            if (add === void 0) { add = 0; }
            if (this.cacheGrid[u] == null) {
                this.cacheGrid[u] = new Object();
            }
            var uvPos = this.getPointByIndex(u, v);
            if (this._mapRect.contains(uvPos.x, uvPos.y)) {
                if (this.cacheGrid[u][v] == null) {
                    var hexData = HexData.getHex(u, v);
                    hexData.x = uvPos.x;
                    hexData.y = uvPos.y;
                    this.cacheGrid[u][v] = hexData;
                    this.viewPorts.push(hexData);
                }
                if (this.cacheGrid[u][v].isEdge == true)
                    return;
                this.cacheGrid[u][v].isEdge = true;
                this.cacheGrid[u][v].needAdd = add;
            }
        };
        return Hexagonal;
    }(Sprite));
    zt.Hexagonal = Hexagonal;
    var HexData = (function () {
        function HexData(ou, ov) {
            this.needAdd = 0;
            this.u = ou;
            this.v = ov;
        }
        Object.defineProperty(HexData.prototype, "key", {
            get: function () { return this.u.toString() + this.v.toString(); },
            enumerable: true,
            configurable: true
        });
        HexData.getHex = function (u, v) {
            var hexData = HexData.hexDatas[HexData.index];
            if (hexData == null) {
                hexData = new HexData(u, v);
                HexData.hexDatas[HexData.index] = hexData;
            }
            else {
                hexData.u = u;
                hexData.v = v;
            }
            hexData.isEdge = false;
            HexData.index++;
            return hexData;
        };
        HexData.reset = function () {
            HexData.index = 0;
        };
        HexData.clear = function () {
            HexData.hexDatas = null;
        };
        HexData.hexDatas = [];
        HexData.index = 0;
        return HexData;
    }());
    zt.HexData = HexData;
})(zt || (zt = {}));
var zt;
(function (zt) {
    var Mask = (function (_super) {
        __extends(Mask, _super);
        function Mask() {
            var _this = _super.call(this) || this;
            _this.mouseThrough = true;
            _this.initEvent();
            return _this;
        }
        Mask.prototype.initEvent = function () {
            this.on(Laya.Event.MOUSE_DOWN, this, function (e) {
                e.stopPropagation();
            });
        };
        Mask.prototype.draw = function (alpha) {
            this.graphics.clear();
            this.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, '#000000');
            this.size(Laya.stage.width, Laya.stage.height);
            this.alpha = alpha;
        };
        Object.defineProperty(Mask.prototype, "free", {
            set: function (val) {
                this._free = val;
            },
            enumerable: true,
            configurable: true
        });
        Mask.prototype.dispose = function () {
            this.free = true;
        };
        Mask.prototype.show = function (alpha) {
            this.draw(alpha);
            zt.Layers.getLayer('top').addChild(this);
        };
        Mask.prototype.hide = function () {
            this.removeSelf();
        };
        Object.defineProperty(Mask, "instance", {
            get: function () {
                return Mask._instance || (Mask._instance = new Mask());
            },
            enumerable: true,
            configurable: true
        });
        return Mask;
    }(Laya.Sprite));
    zt.Mask = Mask;
    zt.DEFAULT_MASK_ALPHA = 0.4;
    zt.showMask = function (alpha) {
        if (alpha === void 0) { alpha = 0; }
        Mask.instance.show(alpha);
    };
    zt.hideMask = function () {
        Mask.instance.hide();
    };
})(zt || (zt = {}));
var zt;
(function (zt) {
    var Sprite = Laya.Sprite;
    var PathLine = (function (_super) {
        __extends(PathLine, _super);
        function PathLine() {
            var _this = _super.call(this) || this;
            _this.pathLength = 10;
            _this._isLoad = false;
            _this.pathUrl = zt.utils.getResourceURL('universe/line/path.png');
            _this.blendMode = Laya.BlendMode.ADD;
            return _this;
        }
        Object.defineProperty(PathLine.prototype, "url", {
            get: function () {
                if (this._url == undefined || this._url == null) {
                    this._url = zt.utils.getResourceURL('universe/line.json');
                }
                return this._url;
            },
            enumerable: true,
            configurable: true
        });
        PathLine.prototype.clipViewPort = function () {
            this._isLoad = true;
            var urlConst = this.pathUrl;
            var t = Laya.loader.getRes(urlConst);
            var x, y;
            this.graphics.clear();
            var distance = this.getDistance(this._start, this._end);
            var len = Math.ceil(distance / this.pathLength);
            for (var i = 2; i < len; i++) {
                x = this.pathLength * i;
                this.graphics.drawTexture(t, x, 0);
            }
            this.pivotX = 0.5;
            this.pivotY = 0.5;
            this.x = this._start.x;
            this.y = this._start.y;
            this.rotation = this._angle;
        };
        PathLine.prototype.getDistance = function ($start, $end) {
            var distance = 0;
            distance = $start.distance($end.x, $end.y);
            var lx = $end.x - $start.x;
            var ly = $end.y - $start.y;
            this._angle = Math.atan2(ly, lx) * 180 / Math.PI;
            return distance;
        };
        PathLine.prototype.updatePath = function ($start, $end) {
            this._start = $start;
            this._end = $end;
            this.clipViewPort();
        };
        PathLine.prototype.clear = function () {
            this.graphics.clear();
        };
        PathLine.prototype.dispose = function () {
            this.removeSelf();
            this.clear();
            this.destroy();
        };
        return PathLine;
    }(Sprite));
    zt.PathLine = PathLine;
})(zt || (zt = {}));
var zt;
(function (zt) {
    var Sprite = Laya.Sprite;
    var PathTarget = (function (_super) {
        __extends(PathTarget, _super);
        function PathTarget() {
            var _this = _super.call(this) || this;
            _this.pathPointUrl = zt.utils.getResourceURL('universe/line/point.png');
            _this.loadTex();
            return _this;
        }
        PathTarget.prototype.loadTex = function () {
            var pt = Laya.loader.getRes(this.pathPointUrl);
            this.graphics.drawTexture(pt, -32, -24);
        };
        PathTarget.prototype.show = function () {
            this.visible = true;
        };
        PathTarget.prototype.hide = function () {
            this.visible = false;
        };
        PathTarget.prototype.dispose = function () {
            this.graphics.clear();
        };
        return PathTarget;
    }(Sprite));
    zt.PathTarget = PathTarget;
})(zt || (zt = {}));
var zt;
(function (zt) {
    var app;
    (function (app) {
        var BaseSilder = (function () {
            function BaseSilder($ui) {
                this._ui = $ui;
            }
            BaseSilder.prototype.init = function () {
            };
            BaseSilder.prototype.addEvent = function () {
            };
            BaseSilder.prototype.removeEvent = function () {
            };
            Object.defineProperty(BaseSilder.prototype, "width", {
                get: function () {
                    return this._ui.getChild('bg').width;
                },
                enumerable: true,
                configurable: true
            });
            BaseSilder.prototype.showSilder = function ($handler) {
                this._callBack = $handler;
            };
            BaseSilder.prototype.hideSilder = function () {
                this._closeHandler.run();
            };
            BaseSilder.prototype.dispose = function () {
                throw new Error('this function must be override!~');
            };
            return BaseSilder;
        }());
        app.BaseSilder = BaseSilder;
    })(app = zt.app || (zt.app = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var UIBase = (function () {
        function UIBase(ui) {
            this._ui = ui;
        }
        Object.defineProperty(UIBase.prototype, "visible", {
            set: function (val) {
                this._ui.displayObject.visible = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIBase.prototype, "ui", {
            get: function () { return this._ui; },
            enumerable: true,
            configurable: true
        });
        UIBase.prototype.start = function () {
            throw Error('must be overrided');
        };
        UIBase.prototype.update = function () {
        };
        UIBase.prototype.dispose = function () {
            throw Error('must be overrided');
        };
        return UIBase;
    }());
    zt.UIBase = UIBase;
})(zt || (zt = {}));
var zt;
(function (zt) {
    var app;
    (function (app_4) {
        var UIController = (function () {
            function UIController(app) {
                this._controllerName = 'moduleName';
                this._app = app;
            }
            UIController.prototype.init = function () {
            };
            UIController.prototype.setModuleName = function (moduleName, $prefix) {
                this._moduleName = moduleName;
                this._prefix = $prefix ? $prefix : '';
                this._controllerName = zt.getNameByModuleAndprefix(this._moduleName, 'controller', this._prefix);
            };
            UIController.prototype.start = function () {
            };
            UIController.prototype.close = function () { this._app.startDispose(); };
            UIController.prototype.dispose = function () {
                throw new Error('dispose function must be override!');
            };
            Object.defineProperty(UIController.prototype, "model", {
                get: function () {
                    if (!this._uiModel) {
                        var moduleName = zt.getNameByModuleAndprefix(this._moduleName, 'model');
                        this._uiModel = zt.Facade.getIns().retrieveModel(moduleName);
                    }
                    return this._uiModel;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIController.prototype, "prefix", {
                get: function () {
                    return this._prefix;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIController.prototype, "moduleName", {
                get: function () {
                    return this._moduleName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIController.prototype, "controllerlName", {
                get: function () {
                    return this._controllerName;
                },
                enumerable: true,
                configurable: true
            });
            UIController.prototype.showSilder = function (silderName, handler) {
                this._app.showSideBar(silderName, handler);
            };
            UIController.prototype.hideSilder = function (silderName) {
                this._app.closeSidebar();
            };
            return UIController;
        }());
        app_4.UIController = UIController;
    })(app = zt.app || (zt.app = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var app;
    (function (app) {
        var UIModel = (function () {
            function UIModel($param) {
                this._modelName = 'UIView';
                this._params = $param;
            }
            UIModel.prototype.init = function () {
            };
            UIModel.prototype.dispose = function () {
                throw new Error('dispose function must be override!');
            };
            UIModel.prototype.getData = function () {
                throw new Error('getData function must be override!');
            };
            UIModel.prototype.start = function () {
            };
            UIModel.prototype.setModuleName = function (moduleName, $prefix) {
                this._prefix = $prefix ? $prefix : '';
                this._moduleName = moduleName;
                this._modelName = zt.getNameByModuleAndprefix(moduleName, 'model', this._prefix);
            };
            Object.defineProperty(UIModel.prototype, "moduleName", {
                get: function () {
                    return this._moduleName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIModel.prototype, "modelName", {
                get: function () {
                    return this._modelName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIModel.prototype, "prefix", {
                get: function () {
                    return this._prefix;
                },
                enumerable: true,
                configurable: true
            });
            return UIModel;
        }());
        app.UIModel = UIModel;
    })(app = zt.app || (zt.app = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var app;
    (function (app) {
        var UIView = (function () {
            function UIView($root) {
                this._uiViewName = 'UIView';
                this._ui = $root;
            }
            UIView.prototype.getUI = function ($d, $isGuide) {
                throw new Error('this function must be override!');
            };
            UIView.prototype.startGuild = function ($d) {
            };
            UIView.prototype.start = function () {
                throw new Error('this function must be override!');
            };
            UIView.prototype.setModuleName = function (moduleName, $prefix) {
                this._moduleName = moduleName;
                this._prefix = $prefix ? $prefix : '';
                this._uiViewName = zt.getNameByModuleAndprefix(this._moduleName, 'view', this._prefix);
            };
            UIView.prototype.init = function () {
                throw new Error('this function must be override!');
            };
            UIView.prototype.addEvent = function () {
                throw new Error('this function must be override!');
            };
            UIView.prototype.removeEvent = function () {
                throw new Error('this function must be override!');
            };
            UIView.prototype.closeApp = function (event) {
                if (event === void 0) { event = null; }
                this.controller.close();
            };
            Object.defineProperty(UIView.prototype, "model", {
                get: function () {
                    if (!this._model) {
                        this._model = zt.getModelByModuleName(this._moduleName);
                    }
                    return this._model;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIView.prototype, "controller", {
                get: function () {
                    if (this._controller == null) {
                        this._controller = zt.getControllerByModuleName(this._moduleName);
                    }
                    return this._controller;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIView.prototype, "prefix", {
                get: function () {
                    return this._prefix;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIView.prototype, "moduleName", {
                get: function () {
                    return this._moduleName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIView.prototype, "uIName", {
                get: function () {
                    return this._uiViewName;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UIView.prototype, "ui", {
                get: function () {
                    return this._ui;
                },
                enumerable: true,
                configurable: true
            });
            UIView.prototype.dispose = function () {
                this.removeEvent();
                throw new Error('this function must be override!');
            };
            return UIView;
        }());
        app.UIView = UIView;
    })(app = zt.app || (zt.app = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var net;
    (function (net) {
        var MessageHeadIn = (function () {
            function MessageHeadIn(source) {
                this._type = source.getUint8();
                this._from_component_type = source.getUint8();
                this._from_component_id = source.getUint32();
                this._to_component_type = source.getUint8();
                this._to_component_id = source.getUint32();
            }
            Object.defineProperty(MessageHeadIn.prototype, "from_component_id", {
                get: function () {
                    return this._from_component_id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MessageHeadIn.prototype, "to_component_id", {
                get: function () {
                    return this._to_component_id;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MessageHeadIn.prototype, "to_component_type", {
                get: function () {
                    return this._to_component_type;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MessageHeadIn.prototype, "from_component_type", {
                get: function () {
                    return this._from_component_type;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MessageHeadIn.prototype, "type", {
                get: function () {
                    return this._type;
                },
                enumerable: true,
                configurable: true
            });
            MessageHeadIn.prototype.toString = function () {
                var result = '';
                result += 'type:' + this._type + ',';
                result += 'from_type:' + this._from_component_type + ',';
                result += 'from_id:' + this._from_component_id + ',';
                result += 'to_type:' + this._to_component_type + ',';
                result += 'to_id:' + this._to_component_id + ',';
                return result;
            };
            return MessageHeadIn;
        }());
        net.MessageHeadIn = MessageHeadIn;
    })(net = zt.net || (zt.net = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var net;
    (function (net) {
        var MessageHeadOut = (function () {
            function MessageHeadOut(type, from_component_type, from_component_id, to_component_type, to_component_id) {
                if (from_component_type === void 0) { from_component_type = -1; }
                if (from_component_id === void 0) { from_component_id = -1; }
                if (to_component_type === void 0) { to_component_type = -1; }
                if (to_component_id === void 0) { to_component_id = -1; }
                this._to_component_id = to_component_id;
                this._to_component_type = to_component_type;
                this._from_component_id = from_component_id;
                this._from_component_type = from_component_type;
                this._type = type;
            }
            MessageHeadOut.prototype.write = function (byte) {
                byte.writeUint8(this.type);
                this._from_component_type != -1 && byte.writeUint8(this._from_component_type);
                this._from_component_type != -1 && byte.writeUint32(this._from_component_id);
                this._from_component_type != -1 && byte.writeUint8(this._to_component_type);
                this._from_component_type != -1 && byte.writeUint32(this._to_component_id);
            };
            MessageHeadOut.prototype.toString = function () {
                var result = '';
                result += 'type:' + this._type + ',';
                result += 'from_type:' + this._from_component_type + ',';
                result += 'from_id:' + this._from_component_id + ',';
                result += 'to_type:' + this._to_component_type + ',';
                result += 'to_id:' + this._to_component_id + ',';
                return result;
            };
            Object.defineProperty(MessageHeadOut.prototype, "type", {
                get: function () {
                    return this._type;
                },
                enumerable: true,
                configurable: true
            });
            return MessageHeadOut;
        }());
        net.MessageHeadOut = MessageHeadOut;
    })(net = zt.net || (zt.net = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var net;
    (function (net) {
        var PackageIn = (function (_super) {
            __extends(PackageIn, _super);
            function PackageIn(source) {
                return _super.call(this, source) || this;
            }
            Object.defineProperty(PackageIn.prototype, "msgHead", {
                get: function () {
                    return this._msgHead;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PackageIn.prototype, "content", {
                get: function () {
                    return this._content;
                },
                enumerable: true,
                configurable: true
            });
            PackageIn.prototype.parse = function () {
                this._msgsize = this.getUint32();
                this._flag = this.getUint8();
                this._sourcesize = this.getUint32();
                var msgbodyByte = this;
                if (this._flag == 1) {
                    var uncompressData = void 0;
                    var input = msgbodyByte.getUint8Array(msgbodyByte.pos, msgbodyByte.bytesAvailable);
                    var opt = { level: 9 };
                    uncompressData = Laya.Browser.window.pako.inflate(input, opt);
                    msgbodyByte = net.getByteObj(uncompressData.buffer);
                }
                this._msgHead = new net.MessageHeadIn(msgbodyByte);
                if (this._msgHead.type == net.MessageType.COMPONENT) {
                    this._componentCMD = msgbodyByte.getUint16();
                }
                if (this._msgHead.type == net.MessageType.COMPONENT) {
                    this._content = msgbodyByte.getUint8Array(msgbodyByte.pos, msgbodyByte.bytesAvailable).buffer;
                }
                else {
                    msgbodyByte.getUint16();
                    this._content = msgbodyByte.readUTFBytes();
                }
            };
            Object.defineProperty(PackageIn.prototype, "componentCMD", {
                get: function () {
                    return this._componentCMD;
                },
                enumerable: true,
                configurable: true
            });
            return PackageIn;
        }(Laya.Byte));
        net.PackageIn = PackageIn;
    })(net = zt.net || (zt.net = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var net;
    (function (net) {
        var PackageOut = (function (_super) {
            __extends(PackageOut, _super);
            function PackageOut() {
                var _this = _super.call(this) || this;
                _this.endian = Laya.Byte.BIG_ENDIAN;
                return _this;
            }
            PackageOut.prototype.writeData = function (messageHead, componentCMD, msg) {
                if (componentCMD === void 0) { componentCMD = 0; }
                if (msg === void 0) { msg = ''; }
                this._componentCMD = componentCMD;
                var msgSourceByte = net.getByteObj();
                var msgUTF = new Laya.Byte();
                msgUTF.writeUTFBytes(msg);
                msgSourceByte.writeUint16(msgUTF.length);
                msgSourceByte.writeUTFBytes(msg);
                this._msgbody = net.getByteObj();
                messageHead.write(this._msgbody);
                if (messageHead.type == net.MessageType.COMPONENT)
                    this._msgbody.writeUint16(this._componentCMD);
                this._msgbody.writeArrayBuffer(msgSourceByte.buffer);
                this._msgbodyBuffer = this._msgbody.buffer;
                this._flag = this.getFlag(this._msgbody);
                if (this._flag == net.FlagType.COMPRESS) {
                    this._msgbodyBuffer = this.compress(this._msgbody);
                }
                this.writeUint32(this.getmsgsize(this._msgbodyBuffer));
                this.writeUint8(this._flag);
                this.writeUint32(this._msgbody.length);
                this.writeArrayBuffer(this._msgbodyBuffer);
            };
            PackageOut.prototype.getmsgsize = function (msgbodyBuffer) {
                return 1 + PackageOut.BODY_BYTES + msgbodyBuffer.byteLength;
            };
            PackageOut.prototype.compress = function (msgSourceByte) {
                var compressData;
                var opt = { level: 9 };
                compressData = Laya.Browser.window.pako.deflate(new Uint8Array(msgSourceByte.buffer), opt).buffer;
                return compressData;
            };
            PackageOut.prototype.getFlag = function (msgbody) {
                var flag = net.FlagType.COMPRESS;
                msgbody.length <= PackageOut.COMPRESS_BYTES_MIN && (flag = net.FlagType.UNCOMPRESS);
                return flag;
            };
            Object.defineProperty(PackageOut.prototype, "flag", {
                get: function () {
                    return this._flag;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PackageOut.prototype, "msgBodyLen", {
                get: function () {
                    return this._msgbodyBuffer.byteLength;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(PackageOut.prototype, "msgbody", {
                get: function () {
                    return this._msgbody;
                },
                enumerable: true,
                configurable: true
            });
            PackageOut.COMPRESS_BYTES_MIN = 255;
            PackageOut.BODY_BYTES = 4;
            return PackageOut;
        }(Laya.Byte));
        net.PackageOut = PackageOut;
    })(net = zt.net || (zt.net = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var universe;
    (function (universe) {
        var BaseVo = (function () {
            function BaseVo() {
                this.rIndex = 0;
                this.cIndex = 0;
            }
            Object.defineProperty(BaseVo.prototype, "key", {
                get: function () {
                    return this.rIndex + "," + this.cIndex;
                },
                enumerable: true,
                configurable: true
            });
            return BaseVo;
        }());
        universe.BaseVo = BaseVo;
    })(universe = zt.universe || (zt.universe = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var universe;
    (function (universe) {
        var GridVo = (function () {
            function GridVo() {
                this._rIndex = 0;
                this._cIndex = 0;
                this._w = 0;
                this._h = 0;
                this._x = 0;
                this._y = 0;
                this._url = "";
                this._key = "";
                this._isOnShow = false;
                this._elementKeyList = [];
            }
            Object.defineProperty(GridVo.prototype, "rIndex", {
                get: function () { return this._rIndex; },
                set: function (val) { this._rIndex = val; this.updateKey(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GridVo.prototype, "cIndex", {
                get: function () { return this._cIndex; },
                set: function (val) { this._cIndex = val; this.updateKey(); },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GridVo.prototype, "width", {
                get: function () { return this._w; },
                set: function (val) { this._w = val; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GridVo.prototype, "height", {
                get: function () { return this._h; },
                set: function (val) { this._h = val; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GridVo.prototype, "x", {
                get: function () { return this._cIndex * this.width; },
                set: function (val) { this._x = val; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GridVo.prototype, "y", {
                get: function () { return this._rIndex * this.height; },
                set: function (val) { this._y = val; },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GridVo.prototype, "key", {
                get: function () { return this._key; },
                enumerable: true,
                configurable: true
            });
            GridVo.prototype.updateKey = function () {
                this._key = this._rIndex + "," + this._cIndex;
            };
            GridVo.prototype.registerKey = function (iGrid) {
                this._elementKeyList.push(iGrid);
            };
            GridVo.prototype.deleteKey = function (iGrid) {
                if (this._elementKeyList.indexOf(iGrid) != -1) {
                    this._elementKeyList.splice(this._elementKeyList.indexOf(iGrid), 1);
                }
            };
            Object.defineProperty(GridVo.prototype, "elementKeyList", {
                get: function () {
                    return this._elementKeyList.concat();
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(GridVo.prototype, "isOnShow", {
                get: function () {
                    return this._isOnShow;
                },
                set: function (value) {
                    this._isOnShow = value;
                },
                enumerable: true,
                configurable: true
            });
            GridVo.prototype.clear = function () {
                this._elementKeyList.length = 0;
                this._elementKeyList = null;
            };
            return GridVo;
        }());
        universe.GridVo = GridVo;
    })(universe = zt.universe || (zt.universe = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var universe;
    (function (universe) {
        var Rect = (function () {
            function Rect(x, y, width, height) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                this.x = 0;
                this.y = 0;
                this.width = 0;
                this.height = 0;
                this._right = 0;
                this._left = 0;
                this._bottom = 0;
                this._top = 0;
                this.x = x;
                this.y = y;
                this.height = height;
                this.width = width;
            }
            Rect.prototype.setTo = function (x, y, width, height) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (width === void 0) { width = 0; }
                if (height === void 0) { height = 0; }
                this.x = x;
                this.y = y;
                this.height = height;
                this.width = width;
                this._left = this.x;
                this._right = this.x + this.width;
                this._top = this.y;
                this._bottom = this.y + this.height;
            };
            Object.defineProperty(Rect.prototype, "bottom", {
                get: function () {
                    return this._bottom;
                },
                set: function (value) {
                    this._bottom = value;
                    this.height = this.bottom - this.top;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "top", {
                get: function () {
                    return this.y;
                },
                set: function (value) {
                    this._top = value;
                    this.y = value;
                    this.height = this.bottom - this.top;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "left", {
                get: function () {
                    return this.x;
                },
                set: function (value) {
                    this._left = value;
                    this.x = value;
                    this.width = this.right - this.left;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Rect.prototype, "right", {
                get: function () {
                    return this._right;
                },
                set: function (value) {
                    this._right = value;
                    this.width = this.right - this.left;
                },
                enumerable: true,
                configurable: true
            });
            Rect.prototype.equal = function (rect) {
                if (this.left == rect.left && this.right == rect.right
                    && this.top == rect.top && this.bottom == rect.bottom) {
                    return true;
                }
                return false;
            };
            Rect.prototype.cloneTo = function (target) {
                target.setTo(this.x, this.y, this.width, this.height);
            };
            Rect.prototype.scaleRatio = function ($ratio) {
                if ($ratio === void 0) { $ratio = 1; }
                var rect = new Rect();
                var x = Math.floor(this.x * $ratio);
                var y = Math.floor(this.y * $ratio);
                var width = Math.floor(this.width);
                var height = Math.floor(this.height);
                rect.setTo(x, y, width, height);
                return rect;
            };
            Rect.prototype.toString = function () {
                return this.x + ',' + this.y + ',' + this.width + ',' + this.height;
            };
            return Rect;
        }());
        universe.Rect = Rect;
    })(universe = zt.universe || (zt.universe = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var universe;
    (function (universe) {
        var UniverseData = (function () {
            function UniverseData() {
                this.W_SIZE = 400;
                this.H_SIZE = 400;
                this._bgRatio = .5;
                this._moveRatio = 0;
            }
            UniverseData.prototype.initUniverse = function (sceneData, $elementList) {
                this.clear();
                this._sceneID = sceneData.SceneID;
                this._universeWidth = sceneData.Xsize;
                this._universeHeight = sceneData.Ysize;
                this._mapWidth = sceneData.mapW;
                this._mapHeight = sceneData.mapH;
                this._bgRatio = this._mapWidth / this.universeWidth;
                this.initGrid();
                this.initBase();
                this.initElementList($elementList);
            };
            UniverseData.prototype.initGrid = function () {
                var swidth = this._universeWidth;
                var sheight = this._universeHeight;
                var width = this.W_SIZE;
                var height = this.H_SIZE;
                var rNum = Math.ceil(swidth / height);
                var cNum = Math.ceil(swidth / width);
                var gridVo;
                var rec;
                for (var i = 0; i < rNum; i++) {
                    for (var j = 0; j < cNum; j++) {
                        gridVo = new universe.GridVo();
                        rec = this.getGridRec(i, j);
                        gridVo.rIndex = i;
                        gridVo.cIndex = j;
                        gridVo.width = rec.width;
                        gridVo.height = rec.height;
                        gridVo.x = rec.x;
                        gridVo.y = rec.y;
                        this._gridHash[gridVo.key] = gridVo;
                    }
                }
                this._viewRec.width = Laya.stage.width;
                this._viewRec.height = Laya.stage.height;
            };
            UniverseData.prototype.initElementList = function (elementList) {
                for (var _i = 0, elementList_1 = elementList; _i < elementList_1.length; _i++) {
                    var elementVo = elementList_1[_i];
                    this.registerData(elementVo);
                }
                this.onResize();
            };
            UniverseData.prototype.initBase = function () {
                var gridW = this.W_SIZE;
                var gridH = this.H_SIZE;
                var rNum = Math.ceil(this._mapWidth / gridW);
                var cNum = Math.ceil(this._mapHeight / gridH);
                var index = 0;
                var baseVo;
                var index_r = 0;
                for (var j = 0; j < cNum; j++) {
                    for (var i = 0; i < rNum; i++) {
                        baseVo = new universe.BaseVo();
                        index_r = j * rNum + i;
                        baseVo.rIndex = i;
                        baseVo.cIndex = j;
                        baseVo.X = i * gridW;
                        baseVo.Y = j * gridH;
                        baseVo.index = index;
                        this._baseHash[index] = baseVo;
                        this._baseHash[baseVo.key] = baseVo;
                        index++;
                    }
                }
            };
            UniverseData.prototype.getGridRec = function (r, c) {
                var swidth = this._universeWidth;
                var sheight = this._universeHeight;
                var width = this.W_SIZE;
                var height = this.H_SIZE;
                var cNum = Math.ceil(swidth / width);
                var rNum = Math.ceil(sheight / height);
                var rec = new universe.Rect(c * width, r * height, width, height);
                if (c == cNum - 1) {
                    rec.width = swidth - rec.x;
                }
                if (r == rNum - 1) {
                    rec.height = sheight - rec.y;
                }
                return rec;
            };
            UniverseData.prototype.hideGrid = function (c, r) {
                var $gridVo = this.getGridVo(c, r);
                if (!$gridVo)
                    return;
                var showList = $gridVo.elementKeyList;
                if (showList.length == 0)
                    return;
                $gridVo.isOnShow = false;
                zt.ctrl.GameCtrl.intance.event('HIDE_ELEMENT', showList);
            };
            UniverseData.prototype.showGrid = function (c, r) {
                var $gridVo = this.getGridVo(c, r);
                if (!$gridVo)
                    return;
                var showList = $gridVo.elementKeyList;
                if (showList.length == 0)
                    return;
                $gridVo.isOnShow = true;
                zt.ctrl.GameCtrl.intance.event('SHOW_ELEMENT', showList);
            };
            UniverseData.prototype.moveViewPort = function (moveX, moveY, $isForce) {
                if ($isForce === void 0) { $isForce = false; }
                this._viewRec.x = moveX;
                this._viewRec.y = moveY;
                this.updateViewPort($isForce);
            };
            UniverseData.prototype.updateViewPort = function ($isForceRefresh) {
                if ($isForceRefresh === void 0) { $isForceRefresh = false; }
                if ($isForceRefresh) {
                    this.hideAll();
                }
                var viewRect = this._viewRec;
                var width = this._universeWidth;
                var height = this._universeHeight;
                var gwidht = this.W_SIZE;
                var gheight = this.H_SIZE;
                this._centerX = viewRect.x + viewRect.width;
                this._centerY = viewRect.y + viewRect.height;
                var viewPortX = this._centerX - viewRect.width;
                var viewPortY = this._centerY - viewRect.height;
                var tRight = viewPortX + viewRect.width;
                if (tRight > width) {
                    viewPortX = width - viewRect.width;
                }
                var tBottom = viewPortY + viewRect.height;
                if (tBottom > height) {
                    viewPortY = height - viewRect.height;
                }
                if (viewPortX < 0) {
                    viewPortX = 0;
                }
                if (viewPortY < 0) {
                    viewPortY = 0;
                }
                var rnum = Math.ceil(width / gwidht);
                var cnum = Math.ceil(height / gheight);
                this.tPaddingRect.setTo(200, 200, 300, 300);
                var bottom = Math.ceil((viewPortY + this._viewRec.height + this.tPaddingRect.y) / this.H_SIZE);
                var top = Math.floor((viewPortY - this.tPaddingRect.y) / this.W_SIZE);
                var left = Math.floor((viewPortX - this.tPaddingRect.x) / this.W_SIZE);
                var right = Math.ceil((viewPortX + this._viewRec.width + this.tPaddingRect.x) / this.W_SIZE);
                this._mapRect.top = Math.max(top, 0);
                this._mapRect.left = Math.max(left, 0);
                this._mapRect.bottom = Math.min(bottom, cnum);
                this._mapRect.right = Math.min(right, rnum);
                var lastLeft = this._mapLastRect.left;
                var lastRight = this._mapLastRect.right;
                if (lastLeft == 0 && lastRight == 0 || $isForceRefresh) {
                    this._mapLastRect.setTo(left, top, 0, 0);
                }
                var equal = this._mapRect.equal(this._mapLastRect);
                this._isEqualLast = this._mapRect.equal(this._bgLayerRect);
                if (equal && $isForceRefresh == false)
                    return;
                this.clipViewPort();
                this._mapLastRect.top = this._mapRect.top;
                this._mapLastRect.bottom = this._mapRect.bottom;
                this._mapLastRect.left = this._mapRect.left;
                this._mapLastRect.right = this._mapRect.right;
            };
            UniverseData.prototype.outElementList = function () {
                var gridvo;
                var resutlt = [];
                for (var key in this._gridHash) {
                    gridvo = this._gridHash[key];
                    if (gridvo.isOnShow) {
                        resutlt = resutlt.concat(gridvo.elementKeyList);
                    }
                }
                console.log(resutlt);
            };
            UniverseData.prototype.changeViewPortBySize = function (width, height, rect) {
                if (rect === void 0) { rect = null; }
                if (rect == null) {
                    rect = new universe.Rect();
                }
                this._centerX = this._viewRec.x + this._viewRec.width;
                this._centerY = this._viewRec.y + this._viewRec.height;
                rect.x = this._centerX - width;
                rect.y = this._centerY - height;
                rect.width = width;
                rect.height = height;
                this.changeViewPort(rect.x, rect.y, rect.width, rect.height);
                return rect;
            };
            UniverseData.prototype.hideAll = function () {
                var gridvo;
                var showList = [];
                for (var key in this._gridHash) {
                    gridvo = this._gridHash[key];
                    if (gridvo.isOnShow) {
                        showList = showList.concat(gridvo.elementKeyList);
                        gridvo.isOnShow = false;
                    }
                }
                zt.ctrl.GameCtrl.intance.event('HIDE_ELEMENT', showList);
            };
            UniverseData.prototype.changeViewPort = function (moveX, moveY, width, height) {
                this._viewRec.x = moveX;
                this._viewRec.y = moveY;
                this._viewRec.width = width;
                this._viewRec.height = height;
                this.updateViewPort();
            };
            UniverseData.prototype.clipViewPort = function () {
                var tSpriteNum = 0;
                var tIndex = 0;
                var tSub = 0;
                var tAdd = 0;
                var i, j;
                var mapRect = this._mapRect;
                var mapLastRect = this._mapLastRect;
                if (mapRect.left > mapLastRect.left) {
                    tSub = mapRect.left - mapLastRect.left;
                    if (tSub > 0) {
                        for (j = mapLastRect.left; j < mapLastRect.left + tSub; j++) {
                            for (i = mapLastRect.top; i <= mapLastRect.bottom; i++) {
                                this.hideGrid(j, i);
                            }
                        }
                    }
                }
                else {
                    tAdd = mapLastRect.left - mapRect.left;
                    if (tAdd > 0) {
                        for (j = mapRect.left; j < mapRect.left + tAdd; j++) {
                            for (i = mapRect.top; i <= mapRect.bottom; i++) {
                                this.showGrid(j, i);
                            }
                        }
                    }
                }
                if (mapRect.right > mapLastRect.right) {
                    tAdd = mapRect.right - mapLastRect.right;
                    if (tAdd > 0) {
                        for (j = mapLastRect.right; j <= mapLastRect.right + tAdd; j++) {
                            for (i = mapRect.top; i <= mapRect.bottom; i++) {
                                this.showGrid(j, i);
                            }
                        }
                    }
                }
                else {
                    tSub = mapLastRect.right - mapRect.right;
                    if (tSub > 0) {
                        for (j = mapRect.right + 1; j <= mapRect.right + tSub; j++) {
                            for (i = mapLastRect.top; i <= mapLastRect.bottom; i++) {
                                this.hideGrid(j, i);
                            }
                        }
                    }
                }
                if (mapRect.top > mapLastRect.top) {
                    tSub = mapRect.top - mapLastRect.top;
                    if (tSub > 0) {
                        for (i = mapLastRect.top; i < mapLastRect.top + tSub; i++) {
                            for (j = mapLastRect.left; j <= mapLastRect.right; j++) {
                                this.hideGrid(j, i);
                            }
                        }
                    }
                }
                else {
                    tAdd = mapLastRect.top - mapRect.top;
                    if (tAdd > 0) {
                        for (i = mapRect.top; i < mapRect.top + tAdd; i++) {
                            for (j = mapRect.left; j <= mapRect.right; j++) {
                                this.showGrid(j, i);
                            }
                        }
                    }
                }
                if (mapRect.bottom > mapLastRect.bottom) {
                    tAdd = mapRect.bottom - mapLastRect.bottom;
                    if (tAdd > 0) {
                        for (i = mapLastRect.bottom + 1; i <= mapLastRect.bottom + tAdd; i++) {
                            for (j = mapRect.left; j <= mapRect.right; j++) {
                                this.showGrid(j, i);
                            }
                        }
                    }
                }
                else {
                    tSub = mapLastRect.bottom - mapRect.bottom;
                    if (tSub > 0) {
                        for (i = mapRect.bottom + 1; i <= mapRect.bottom + tSub; i++) {
                            for (j = mapLastRect.left; j <= mapLastRect.right; j++) {
                                this.hideGrid(j, i);
                            }
                        }
                    }
                }
            };
            UniverseData.prototype.registerData = function (element) {
                var cIndex = element.X / this.W_SIZE >> 0;
                var rIndex = element.Y / this.H_SIZE >> 0;
                var gridVo = this.getGridVo(cIndex, rIndex);
                if (gridVo) {
                    gridVo.registerKey(element);
                }
            };
            UniverseData.prototype.getGridVo = function (r, c) {
                return this._gridHash[r + "," + c];
            };
            UniverseData.prototype.getBaseVo = function (r, c) {
                return this._baseHash[r + "," + c];
            };
            Object.defineProperty(UniverseData.prototype, "bgRatio", {
                get: function () {
                    return this._bgRatio;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UniverseData.prototype, "moveRatio", {
                get: function () {
                    return this._moveRatio;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UniverseData.prototype, "sceneID", {
                get: function () {
                    return this._sceneID;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UniverseData.prototype, "universeWidth", {
                get: function () {
                    return this._universeWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UniverseData.prototype, "universeHeight", {
                get: function () {
                    return this._universeHeight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UniverseData.prototype, "isEqualLast", {
                get: function () {
                    return this._isEqualLast;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UniverseData.prototype, "mapWidth", {
                get: function () {
                    return this._mapWidth;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UniverseData.prototype, "mapHeight", {
                get: function () {
                    return this._mapHeight;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UniverseData.prototype, "viewRec", {
                get: function () {
                    return this._viewRec;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(UniverseData.prototype, "containData", {
                get: function () {
                    var mapRect = this._mapRect;
                    var containData = [];
                    var gridVo;
                    for (var i = mapRect.left; i < mapRect.right; i++) {
                        for (var j = mapRect.top; j < mapRect.bottom; j++) {
                            gridVo = this.getGridVo(i, j);
                            containData = containData.concat(gridVo.elementKeyList);
                        }
                    }
                    return containData;
                },
                enumerable: true,
                configurable: true
            });
            UniverseData.prototype.getByRect = function ($x, $y) {
                var baseList = [];
                var left, right, top, bottom;
                var gridW = this.W_SIZE;
                var gridH = this.H_SIZE;
                var rNum = Math.ceil(this._mapWidth / gridW);
                var cNum = Math.ceil(this._mapHeight / gridH);
                if (this._moveRatio == 1) {
                    left = this._mapRect.left;
                    top = this._mapRect.top;
                    bottom = this._mapRect.bottom;
                    right = this._mapRect.right;
                }
                else {
                    left = Math.abs(Math.floor($x / gridW)) - 1;
                    top = Math.abs(Math.floor($y / gridH)) - 1;
                    bottom = top + this._mapRect.height;
                    right = left + this._mapRect.width;
                }
                left = Math.max(0, left);
                top = Math.max(0, top);
                right = Math.min(right, rNum);
                bottom = Math.min(bottom, cNum);
                this._bgLayerRect.setTo(left, top, this._mapRect.width, this._mapRect.height);
                for (var i = left; i < right; i++) {
                    for (var j = top; j < bottom; j++) {
                        baseList.push(j * rNum + i);
                    }
                }
                return baseList;
            };
            UniverseData.prototype.getBaseByIndex = function ($index) {
                return this._baseHash[$index];
            };
            UniverseData.prototype.onResize = function () {
                var swidth = this._universeWidth;
                var sheight = this._universeHeight;
                var width = this.W_SIZE;
                var height = this.H_SIZE;
                var stageW = this._viewRec.width = Laya.stage.width;
                this._viewRec.height = Laya.stage.height;
                this._dragRec.x = this._viewRec.width - swidth;
                this._dragRec.y = this._viewRec.height - sheight;
                this._dragRec.width = -this._viewRec.width + swidth;
                this._dragRec.height = -this._viewRec.height + swidth;
                this.mapShowR = Math.floor(Laya.stage.height / width) + 2;
                this.mapShowC = Math.floor(Laya.stage.width / height) + 2;
                if (swidth == this._mapWidth)
                    this._moveRatio = 1;
                else
                    this._moveRatio = (this._mapWidth - stageW) / (swidth - stageW);
            };
            UniverseData.prototype.clear = function () {
                this._gridHash = {};
                this._elementHash = {};
                this._dragRec = new universe.Rect();
                this._mapRect = new universe.Rect();
                this._viewRec = new universe.Rect();
                this._bgLayerRect = new universe.Rect();
                this._baseHash = {};
                this.tPaddingRect = new universe.Rect();
                this._mapLastRect = new universe.Rect();
            };
            UniverseData.prototype.dispose = function () {
                this._gridHash = null;
                this._elementHash = null;
                this._dragRec = null;
                this._viewRec = null;
                this.tPaddingRect = null;
            };
            return UniverseData;
        }());
        universe.UniverseData = UniverseData;
    })(universe = zt.universe || (zt.universe = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var universe;
    (function (universe) {
        var view;
        (function (view) {
            var Sprite = laya.display.Sprite;
            var Handler = laya.utils.Handler;
            var getResourceURL = zt.utils.getResourceURL;
            var Background = (function (_super) {
                __extends(Background, _super);
                function Background() {
                    var _this = _super.call(this) || this;
                    _this._dealNums = 0;
                    _this._texCache = {};
                    _this._fragments = [];
                    _this._textureLink = [];
                    _this._lastIndex = [];
                    _this._addToIndex = [];
                    _this._thumb = new Sprite();
                    _this.addChild(_this._thumb);
                    return _this;
                }
                Background.prototype.init = function () {
                };
                Background.prototype.build = function ($data) {
                    this._universeData = $data;
                    this.size($data.mapWidth, $data.mapHeight);
                    this.updateThumb();
                };
                Background.prototype.rebuild = function ($data) {
                    this.dispose();
                    this._universeData = $data;
                    this.size($data.mapWidth, $data.mapHeight);
                    this.updateThumb();
                };
                Background.prototype.clipView = function () {
                    if (this._universeData.isEqualLast)
                        return;
                    var currentIndex = this._universeData.getByRect(this.x, this.y);
                    for (var _i = 0, currentIndex_1 = currentIndex; _i < currentIndex_1.length; _i++) {
                        var index = currentIndex_1[_i];
                        if (this._lastIndex.indexOf(index) == -1) {
                            this._addToIndex.push(index);
                        }
                    }
                    for (var _a = 0, _b = this._lastIndex; _a < _b.length; _a++) {
                        var currIndex = _b[_a];
                        if (currentIndex.indexOf(currIndex) == -1)
                            this.hideFragment(currIndex);
                    }
                    this._lastIndex = currentIndex;
                    this.drawDelay();
                };
                Background.prototype.drawNext = function () {
                    this._dealNums = 0;
                    Laya.timer.once(Background.SPEED, this, this.drawDelay);
                };
                Background.prototype.drawDelay = function () {
                    if (this._addToIndex.length == 0) {
                        this._dealNums = 0;
                        return;
                    }
                    ;
                    var index = this._addToIndex.shift();
                    this.showFragment(index);
                    this._dealNums++;
                    if (this._dealNums < Background.DEALNUM) {
                        this.drawDelay();
                    }
                    else {
                        this.drawNext();
                    }
                };
                Background.prototype.showFragment = function ($index) {
                    var baseData = this._universeData.getBaseByIndex($index);
                    if (!baseData)
                        return;
                    var node = Laya.Pool.getItemByClass('floorNode', Sprite);
                    var url = this.getFragmentPath($index);
                    node.loadImage(url);
                    if (this._texCache[url] == null) {
                        this._textureLink.push(url);
                        this._texCache[url] = true;
                    }
                    node.x = baseData.X;
                    node.y = baseData.Y;
                    this.addChild(node);
                    this._fragments[$index] = node;
                };
                Background.prototype.hideFragment = function ($index) {
                    if (this._fragments.length > $index) {
                        var node = this._fragments[$index];
                        this.clearNode(node);
                        this._fragments[$index] = null;
                    }
                };
                Background.prototype.updateThumb = function () {
                    this._thumb.graphics.clear();
                    this._thumb.loadImage(this.getPath(), 0, 0, 0, 0, Handler.create(this, this.onImgLoad));
                };
                Background.prototype.onImgLoad = function (img) {
                    var scaleX = this._universeData.mapWidth / img.sourceWidth;
                    var scaleY = this._universeData.mapHeight / img.sourceHeight;
                    this._thumb.scale(scaleX, scaleY);
                };
                Background.prototype.getPath = function () {
                    return getResourceURL("world/" + this._universeData.sceneID + "/thumbnail.jpg");
                };
                Background.prototype.getFragmentPath = function (index) {
                    return getResourceURL("world/" + this._universeData.sceneID + "/fragment-" + index + ".jpg");
                };
                Object.defineProperty(Background.prototype, "name", {
                    get: function () {
                        return view.LayerType.BACKGROUND;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(Background.prototype, "ratio", {
                    get: function () {
                        return this._universeData.moveRatio;
                    },
                    enumerable: true,
                    configurable: true
                });
                Background.prototype.clear = function () {
                    var len = this._fragments.length;
                    for (var i = 0; i < len; i++) {
                        this.clearNode(this._fragments[i]);
                        this._fragments[i] = null;
                    }
                };
                Background.prototype.clearNode = function ($node) {
                    if ($node) {
                        $node.graphics.clear();
                        $node.removeSelf();
                        Laya.Pool.recover('floorNode', $node);
                    }
                };
                Background.prototype.dispose = function () {
                    this.clear();
                    this._dealNums = 0;
                    var len = this._textureLink.length;
                    for (var i = 0; i < len; i++) {
                        Laya.Loader.clearRes(this._textureLink[i]);
                    }
                    Laya.Pool.clearBySign('floorNode');
                };
                Background.DEALNUM = 1;
                Background.SPEED = 3;
                return Background;
            }(Sprite));
            view.Background = Background;
        })(view = universe.view || (universe.view = {}));
    })(universe = zt.universe || (zt.universe = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var universe;
    (function (universe) {
        var view;
        (function (view) {
            var LayerType = (function () {
                function LayerType() {
                }
                LayerType.ELEMENT = 'Element';
                LayerType.BACKGROUND = 'BACKGROUND';
                return LayerType;
            }());
            view.LayerType = LayerType;
        })(view = universe.view || (universe.view = {}));
    })(universe = zt.universe || (zt.universe = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var universe;
    (function (universe) {
        var view;
        (function (view) {
            var Event = Laya.Event;
            var Rectangle = Laya.Rectangle;
            var Mouse = Laya.Mouse;
            var UniverseLayer = (function (_super) {
                __extends(UniverseLayer, _super);
                function UniverseLayer() {
                    var _this = _super.call(this) || this;
                    _this.SPEED = 30;
                    _this._isneedTween = true;
                    _this._dragAble = true;
                    return _this;
                }
                UniverseLayer.prototype.init = function () {
                    this.universeData = new universe.UniverseData();
                    this._maprect = new Rectangle();
                    view.ViewPort.onChange(this, this.onViewPortChange);
                    this.initDrag();
                };
                Object.defineProperty(UniverseLayer.prototype, "name", {
                    get: function () {
                        return view.LayerType.ELEMENT;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(UniverseLayer.prototype, "ratio", {
                    get: function () {
                        return this._ratio;
                    },
                    enumerable: true,
                    configurable: true
                });
                UniverseLayer.prototype.initDrag = function () {
                    this.on(Event.MOUSE_DOWN, this, this.onMouseDown);
                };
                UniverseLayer.prototype.removeDrag = function () {
                    this.off(Event.MOUSE_DOWN, this, this.onMouseDown);
                };
                UniverseLayer.prototype.onMouseMove = function () {
                    this.update();
                };
                UniverseLayer.prototype.onMouseDown = function (e) {
                    if (!this._dragAble)
                        return;
                    Mouse.cursor = 'pointer';
                    var maprect = this._maprect;
                    var rect = new Rectangle(Laya.stage.width - maprect.width, Laya.stage.height - maprect.height, -Laya.stage.width + maprect.width, -Laya.stage.height + maprect.height);
                    this.startDrag(rect, true);
                    this._startTime = Date.now();
                    this._startX = Laya.stage.mouseX;
                    this._startY = Laya.stage.mouseY;
                    this.on(Event.MOUSE_MOVE, this, this.onMouseMove);
                    Laya.stage.once(Event.MOUSE_UP, this, this.onMouseUp);
                };
                UniverseLayer.prototype.update = function ($isForce) {
                    if ($isForce === void 0) { $isForce = false; }
                    var y = -this.y >> 0;
                    var x = -this.x >> 0;
                    if (this._hexagonal) {
                        this._hexagonal.update(-x, -y);
                    }
                    if (this.universeData == null) {
                        return;
                    }
                    this.universeData.moveViewPort(x, y, $isForce);
                    if (this._bgLayer) {
                        var ratio = this.universeData.moveRatio;
                        this._bgLayer.pos(this.x * ratio, this.y * ratio);
                    }
                };
                UniverseLayer.prototype.onMouseUp = function (e) {
                    Mouse.cursor = 'default';
                    this.off(Event.MOUSE_MOVE, this, this.onMouseMove);
                    var stageW = Laya.stage.width;
                    var stageH = Laya.stage.height;
                    this.moveComplete();
                };
                UniverseLayer.prototype.tweenMove = function () {
                };
                UniverseLayer.prototype.rebuild = function () {
                    this.pos(0, 0);
                    this.update(true);
                };
                UniverseLayer.prototype.getInnerMapPos = function () {
                };
                UniverseLayer.prototype.slowDown = function (t, b, c, d) {
                    return c * Math.pow(0.8, t) + b;
                };
                UniverseLayer.prototype.onViewPortChange = function (data) {
                    if (data.trigger !== 'map')
                        return;
                    var x = -data.viewPort.xPercent * (this._maprect.width - Laya.stage.width);
                    var y = -data.viewPort.yPercent * (this._maprect.height - Laya.stage.height);
                    this._startTime = 0;
                    this._dragAble = true;
                    this.pos(x, y);
                    this.update(true);
                    this._bgLayer.clipView();
                };
                UniverseLayer.prototype.moveComplete = function ($bool) {
                    if ($bool === void 0) { $bool = false; }
                    this.update($bool);
                    this._startTime = 0;
                    this._dragAble = true;
                    if (this.universeData.isEqualLast == true)
                        return;
                    zt.ctrl.GameCtrl.intance.event('drag_complete', this.universeData.containData);
                    var perX = -this.x / (this._maprect.width - Laya.stage.width);
                    var perY = -this.y / (this._maprect.height - Laya.stage.height);
                    view.ViewPort.change(perX, perY, 'universe');
                    this._bgLayer.clipView();
                };
                UniverseLayer.prototype.tweenUpdate = function () {
                    this.update();
                };
                UniverseLayer.prototype.resize = function () {
                    this.universeData.onResize();
                };
                UniverseLayer.prototype.dispose = function () {
                    this.universeData.dispose();
                    this.removeDrag();
                    if (this._bgLayer)
                        this._bgLayer.dispose();
                    this.universeData = null;
                };
                return UniverseLayer;
            }(Sprite));
            view.UniverseLayer = UniverseLayer;
        })(view = universe.view || (universe.view = {}));
    })(universe = zt.universe || (zt.universe = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var universe;
    (function (universe) {
        var view;
        (function (view) {
            var EventDispatcher = Laya.EventDispatcher;
            var Event = Laya.Event;
            var ViewPort = (function (_super) {
                __extends(ViewPort, _super);
                function ViewPort() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                ViewPort.onChange = function (caller, listener) {
                    ViewPort._viewPort.on(Event.CHANGE, caller, listener);
                };
                ViewPort.change = function (xPercent, yPercent, trigger) {
                    ViewPort._viewPort._xPercent = xPercent;
                    ViewPort._viewPort._yPercent = yPercent;
                    ViewPort._viewPort.event(Event.CHANGE, { viewPort: ViewPort._viewPort, trigger: trigger });
                };
                Object.defineProperty(ViewPort.prototype, "xPercent", {
                    get: function () { return this._xPercent; },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(ViewPort.prototype, "yPercent", {
                    get: function () { return this._yPercent; },
                    enumerable: true,
                    configurable: true
                });
                ViewPort.init = function () {
                    ViewPort._viewPort = new ViewPort();
                };
                return ViewPort;
            }(EventDispatcher));
            view.ViewPort = ViewPort;
        })(view = universe.view || (universe.view = {}));
    })(universe = zt.universe || (zt.universe = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var app;
    (function (app) {
        var core;
        (function (core) {
            var STController = (function () {
                function STController() {
                    this._controllerMap = {};
                }
                STController.getInstance = function () {
                    if (!STController._instance) {
                        STController._instance = new STController();
                    }
                    return STController._instance;
                };
                STController.prototype.retrieveController = function ($controllerName) {
                    return this._controllerMap[$controllerName];
                };
                STController.prototype.hasController = function ($controllerName) {
                    return !!this._controllerMap[$controllerName];
                };
                STController.prototype.registerController = function ($icontroller) {
                    var controllerMap = this._controllerMap;
                    if (controllerMap[$icontroller.controllerlName]) {
                        throw new Error("不能注册同名数据代理两次");
                    }
                    controllerMap[$icontroller.controllerlName] = $icontroller;
                    $icontroller.init();
                };
                STController.prototype.removeController = function ($controllerName) {
                    var controllerMap = this._controllerMap;
                    var icontroller = controllerMap[$controllerName];
                    if (icontroller) {
                        icontroller.dispose();
                        delete this._controllerMap[$controllerName];
                    }
                    return icontroller;
                };
                return STController;
            }());
            core.STController = STController;
        })(core = app.core || (app.core = {}));
    })(app = zt.app || (zt.app = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var app;
    (function (app) {
        var core;
        (function (core) {
            var STView = (function () {
                function STView() {
                    this._viewMap = {};
                }
                STView.getInstance = function () {
                    if (!STView._instance) {
                        STView._instance = new STView();
                    }
                    return STView._instance;
                };
                STView.prototype.retrieveUIView = function (uiName) {
                    return this._viewMap[uiName];
                };
                STView.prototype.registerUIView = function ($uiView) {
                    var uiviewMap = this._viewMap;
                    if (!!uiviewMap[$uiView.uIName])
                        return;
                    uiviewMap[$uiView.uIName] = $uiView;
                    $uiView.init();
                };
                STView.prototype.removeUIView = function (uiName) {
                    var view = this._viewMap[uiName];
                    if (view) {
                        view.dispose();
                        delete this._viewMap[uiName];
                    }
                    return view;
                };
                return STView;
            }());
            core.STView = STView;
        })(core = app.core || (app.core = {}));
    })(app = zt.app || (zt.app = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var app;
    (function (app) {
        var core;
        (function (core) {
            var STModel = (function () {
                function STModel() {
                    this._modelMap = {};
                }
                STModel.getInstance = function () {
                    if (!STModel._instance) {
                        STModel._instance = new STModel();
                    }
                    return STModel._instance;
                };
                STModel.prototype.retrieveModel = function ($modelName) {
                    return this._modelMap[$modelName];
                };
                STModel.prototype.hasModel = function ($modelName) {
                    return !!this._modelMap[$modelName];
                };
                STModel.prototype.registerModel = function (iModel) {
                    var modelMap = this._modelMap;
                    if (modelMap[iModel.modelName]) {
                        throw new Error("不能注册同名数据代理两次");
                    }
                    modelMap[iModel.modelName] = iModel;
                    iModel.init();
                };
                STModel.prototype.removeModel = function ($modelName) {
                    var modelMap = this._modelMap;
                    var imodel = modelMap[$modelName];
                    if (imodel) {
                        imodel.dispose();
                        delete this._modelMap[$modelName];
                    }
                    return imodel;
                };
                return STModel;
            }());
            core.STModel = STModel;
        })(core = app.core || (app.core = {}));
    })(app = zt.app || (zt.app = {}));
})(zt || (zt = {}));
var zt;
(function (zt) {
    var STView = zt.app.core.STView;
    var STController = zt.app.core.STController;
    var STModel = zt.app.core.STModel;
    var Facade = (function () {
        function Facade() {
            this._module_hash = {};
            this.initialize();
        }
        Facade.getIns = function () {
            if (Facade._instance == null) {
                Facade._instance = new Facade();
            }
            return Facade._instance;
        };
        Facade.prototype.initialize = function () {
            this._view = STView.getInstance();
            this._model = STModel.getInstance();
            this._controller = STController.getInstance();
        };
        Facade.prototype.retrieveModel = function ($modelName) {
            return this._model.retrieveModel($modelName);
        };
        Facade.prototype.retrieveUIView = function ($uiNameName) {
            return this._view.retrieveUIView($uiNameName);
        };
        Facade.prototype.retrieveController = function ($controllerName) {
            return this._controller.retrieveController($controllerName);
        };
        Facade.prototype.registerModel = function ($iMode) {
            this._model.registerModel($iMode);
            this.registerMoule($iMode.modelName);
            return $iMode;
        };
        Facade.prototype.registerUIView = function ($iUIView) {
            this._view.registerUIView($iUIView);
            this.registerMoule($iUIView.uIName);
            return $iUIView;
        };
        Facade.prototype.registerController = function ($iContorller) {
            this._controller.registerController($iContorller);
            this.registerMoule($iContorller.controllerlName);
            return $iContorller;
        };
        Facade.prototype.removeController = function ($controllerName) {
            var icontroller = this._controller.removeController($controllerName);
            icontroller = null;
            console.log('销毁', $controllerName);
        };
        Facade.prototype.removeView = function ($uiNameName) {
            var iview = this._view.removeUIView($uiNameName);
            iview = null;
            console.log('销毁', $uiNameName);
        };
        Facade.prototype.removeModel = function ($modelName) {
            var iModel = this._model.removeModel($modelName);
            iModel = null;
            console.log('销毁', $modelName);
        };
        Facade.prototype.registerMoule = function ($targetName) {
            var moduleName = $targetName.split('_').shift();
            var moduleHash = this._module_hash;
            if (!moduleHash[moduleName]) {
                moduleHash[moduleName] = [];
                console.log('注册' + moduleName);
            }
            moduleHash[moduleName].push($targetName);
            console.log('注册' + $targetName + ' and start()');
        };
        Facade.prototype.removeModule = function ($module) {
            var moduleNameList = this._module_hash[$module];
            var isExist = Array.isArray(moduleNameList);
            if (isExist == false) {
                console.log($module + '模块不存在!');
                return;
            }
            console.log($module, '开始销毁！');
            for (var _i = 0, moduleNameList_1 = moduleNameList; _i < moduleNameList_1.length; _i++) {
                var moduleName = moduleNameList_1[_i];
                var module_1 = moduleName;
                if (module_1.match('controller_xdxd')) {
                    this.removeController(moduleName);
                }
                if (module_1.match('model_xdxd')) {
                    this.removeModel(moduleName);
                }
                if (module_1.match('view_xdxd')) {
                    this.removeView(moduleName);
                }
            }
            this._module_hash[$module] = null;
            delete this._module_hash[$module];
        };
        Facade.prototype.startModule = function ($module) {
            var moduleNameList = this._module_hash[$module];
            var isExist = Array.isArray(moduleNameList);
            if (isExist == false) {
                console.log($module + '模块不存在!');
                return;
            }
            var model;
            var controller;
            var view;
            for (var _i = 0, moduleNameList_2 = moduleNameList; _i < moduleNameList_2.length; _i++) {
                var moduleName = moduleNameList_2[_i];
                var module_2 = moduleName;
                if (module_2.match('controller_xdxd')) {
                    controller = this.retrieveController(moduleName);
                    controller.start();
                }
                if (module_2.match('model_xdxd')) {
                    model = this.retrieveModel(moduleName);
                    model.start();
                }
                if (module_2.match('view_xdxd')) {
                    view = this.retrieveUIView(moduleName);
                    view.start();
                    view.addEvent();
                }
                console.log('开始启动', moduleName);
            }
        };
        return Facade;
    }());
    zt.Facade = Facade;
    zt.getModelByModuleName = function ($modelName, $prefix) {
        if ($prefix === void 0) { $prefix = ''; }
        var moduleName = zt.getNameByModuleAndprefix($modelName, 'model', $prefix);
        return Facade.getIns().retrieveModel(moduleName);
    };
    zt.getControllerByModuleName = function ($modelName, $prefix) {
        if ($prefix === void 0) { $prefix = ''; }
        var moduleName = zt.getNameByModuleAndprefix($modelName, 'controller', $prefix);
        return Facade.getIns().retrieveController(moduleName);
    };
    zt.getViewByModuleName = function ($modelName, $prefix) {
        if ($prefix === void 0) { $prefix = ''; }
        var moduleName = zt.getNameByModuleAndprefix($modelName, 'view', $prefix);
        return Facade.getIns().retrieveUIView(moduleName);
    };
    zt.getNameByModuleAndprefix = function (moduleName, targetName, prefix) {
        if (prefix === void 0) { prefix = ''; }
        return moduleName + "_" + prefix + "_" + targetName + "_xdxd";
        ;
    };
})(zt || (zt = {}));

//# sourceMappingURL=framework.js.map
