declare namespace zt {
    import EventDispatcher = Laya.EventDispatcher;
    const onEvents: (eventDispatcher: EventDispatcher, events: string | string[], caller: any, listener: Function) => void;
}
declare namespace zt {
    class framework {
    }
}
declare namespace zt {
    import Sprite = Laya.Sprite;
    class Layers {
        private static _layers;
        static init(layers: Array<any>): void;
        private static createLayer($root, $index);
        static getLayer(layerName: string): Laya.Node;
    }
    class LayerNode extends Sprite {
        private _root;
        private _index;
        private _layerList;
        constructor($root: LayerNode | Sprite, index: number);
        show(): void;
        readonly index: number;
        hide(): void;
        repainted(): void;
        private sortFun(a, b);
        readonly layerList: LayerNode[];
    }
}
declare namespace zt {
    class Loader {
        static loadModule(moduleName: string, onComplete?: Laya.Handler, fileName?: string): void;
    }
}
declare namespace zt {
    class Scene {
        private static _current;
        private static _enterScene;
        private static _prevParams;
        private static _switchSceneing;
        static CHANGESCENE: string;
        static enter(name: string, params?: any): void;
        static move(pos: ScenePos, layerName: string, params: any): void;
        private static change(name, params);
        private static update(params);
        private static load(name, params);
        static switchToPreScene(): void;
        private static onload();
        private static onPreloadComplete();
        private static onBuildComplete();
        static readonly current: scene.SceneItem;
        static readonly prevParams: SceneParams;
    }
}
declare namespace zt {
    class WebParams {
        private static _isLoad;
        private static _domain;
        private static _userId;
        private static _key;
        private static _server;
        private static _lan;
        private static init();
        static readonly domain: string;
        static readonly key: string;
        static readonly userId: number;
        static readonly server: string;
        static readonly lan: string;
    }
}
declare namespace zt.app {
    import Sprite = Laya.Sprite;
    import Rectangle = Laya.Rectangle;
    class AppBase extends Sprite {
        protected _params: AppParams;
        xpos: number;
        ypos: number;
        private _level;
        private _sidebar;
        protected _adaptionType: number;
        moduleName: string;
        constructor($level?: number);
        init(): void;
        start(): void;
        protected initEvent(): void;
        protected superRegisterView($iView: IView, $prefix?: string): IView;
        protected superRegisterModel($iModel: IModel, $prefix?: string): IModel;
        protected superRegisterController($icontroller: IController, $prefix?: string): IController;
        getAppBounds(): Rectangle;
        adaptation(): void;
        resize(): void;
        showSideBar(name: string, param?: any): void;
        closeSidebar(): void;
        isShowSidebar(name: string): boolean;
        getSidebarView(name: string): any;
        createSidebar(arr: any[]): void;
        setSidebarRenderer(name: string, renderer: Laya.Handler): void;
        readonly sidebarList: any[];
        private onMouseDown(e);
        private onMouseUp(e);
        protected load(): void;
        readonly res: any[];
        readonly cmds: {
            cmd: string;
            params;
            data?;
        }[];
        protected readonly dragRect: Sprite;
        startDispose(): void;
        params: any;
        readonly level: number;
        private setLevel($level);
        dispose(): void;
        readonly adaptionType: number;
        disposeTexture(): void;
    }
}
declare namespace zt.app {
    class AppCaches {
        private _apps;
        private _levelApps;
        private _mask;
        private static DEFAULT_COLOR;
        private _color;
        private _alpha;
        constructor();
        add(name: string, app: AppBase): AppItem;
        closeLevelApps(level: number): void;
        closeAllApp(): void;
        readonly isMultiLevel: boolean;
        readonly currLevelApp: AppItem;
        private onAppDispose(appItem);
        private onAppPreloadComplete(appItem);
        getItem(name: string): AppItem;
        appCloseCheck(applevel: number): void;
        private updateLevelMask();
        private showMask();
        private hideMask();
        updateMask(color: any, alpha: any): void;
        resetMask(): void;
    }
}
declare namespace zt.app {
    class AppEvent {
        static RES_LOAD: string;
        static START_DISPOSE: string;
        static DISPOSE: string;
        static APP_DISPOSE: string;
        static PRELOAD_COMPLETE: string;
    }
}
declare namespace zt.app {
    import EventDispatcher = Laya.EventDispatcher;
    class AppItem extends EventDispatcher {
        private static ANIMATION_MS;
        private _app;
        private _name;
        private _resLoaded;
        private _dataLoaded;
        private _openX;
        private _openY;
        constructor(name: string, app: AppBase);
        start(noLoading: any): void;
        topup(): void;
        private loadRes();
        private loadData();
        private onResLoad();
        private onResProgress(val);
        private checkComplete();
        onStartDispose(): void;
        private onDisposeAnimationComplete();
        private onRenderComplete();
        private dispose();
        readonly name: string;
        readonly level: number;
        readonly app: AppBase;
    }
}
declare namespace zt {
    import AppCaches = zt.app.AppCaches;
    class App {
        static load(name: string, params?: any, cb?: Laya.Handler, noLoading?: boolean): void;
        static updateMask(color: any, alpha: any): void;
        static resetMaskColor(): void;
        private static _currAppName;
        private static topup(app);
        private static _appCaches;
        static readonly appCaches: AppCaches;
    }
}
declare namespace zt.app {
    class AppLevel {
        static LEVEL_0: number;
        static LEVEL_1: number;
        static LEVEL_2: number;
    }
}
declare namespace zt {
    class AppLoading extends Laya.Sprite {
        private _free;
        private _mask;
        private _ui;
        constructor();
        private initEvent();
        draw(): void;
        free: boolean;
        dispose(): void;
        private static _instance;
        show(): void;
        hide(): void;
        update(val: number): void;
        static readonly instance: AppLoading;
    }
    const showAppLoading: () => void;
    const hideAppLoading: () => void;
    const updateAppLoading: (val: number) => void;
}
declare namespace zt.app {
    interface AppParams {
        onClose?: Laya.Handler;
    }
}
declare namespace zt.app {
    class AppSidebar {
        private _sidebarList;
        private _viewList;
        private _uiList;
        private _rendererList;
        private _currName;
        private _mc;
        constructor(sidebarList: any[]);
        setSidebarRenderer(name: string, renderer: Laya.Handler): void;
        showSideBar(name: string, param: any): void;
        getView(name: string): any;
        readonly mc: Laya.Sprite;
        readonly currName: string;
        private indexOfSidebar(name);
        clear(): void;
        dispose(): void;
    }
}
declare namespace zt.ctrl {
    import EventDispatcher = Laya.EventDispatcher;
    class GameCtrl extends EventDispatcher {
        private static mInstance;
        static readonly intance: GameCtrl;
    }
}
declare namespace zt.data {
    class BaseDataHash {
        protected static KEY_SPACE: string;
        protected _values: Array<any>;
        protected _keys: Array<any>;
        protected _dic: object;
        protected _name: string;
        protected _itemCls: any;
        protected _mainKeys: Array<string>;
        constructor(name: string, data?: any, mainKeys?: any, itemCls?: any);
        getlength(): number;
        getList(): object;
        getItemByMainKey(keyId: any): object;
        searhItems(keyName: any, keyValue: any): Array<any>;
        private searchItemsByKey(key, keyId);
        private searchItemsByKeys(keys, keyIds);
        protected checkMainKey(item: object): boolean;
        protected getItemKey(keys: Array<string>, data: object): string;
        protected readonly defaultItemCls: any;
        readonly length: number;
        readonly name: string;
        readonly values: Array<any>;
        readonly keys: Array<any>;
    }
}
declare namespace zt.data {
    class BaseDataItem extends Laya.EventDispatcher {
        constructor(d: object);
        setPropRead(key: string, d: Object): void;
    }
}
declare namespace zt.data {
    class DataHash extends BaseDataHash {
        static D_UP: string;
        static D_DEL: string;
        static D_ADD: string;
        constructor(name: string, data?: any, mainKey?: any, itemCls?: any);
        readonly defaultItemCls: any;
        removeItem(item: object): object;
        clearAll(): void;
        updateItem(item: object): object;
        addItem(item: object): object;
    }
}
declare namespace zt.data {
    class DataItem extends BaseDataItem {
        constructor(d: object);
        hasUpdate: number;
        update(d: object): void;
        updataByMode(d: object, p?: Array<string>): void;
    }
}
declare namespace zt.manager {
    import DataHash = zt.data.DataHash;
    import BaseDataHash = zt.data.BaseDataHash;
    class DataManager {
        private static _instance;
        private _cache;
        private _waitPool;
        constructor();
        static readonly inst: DataManager;
        registSysDataHash(name: string, data: any, mainKeys?: any, itemCls?: any, hashCls?: any, buildNow?: Boolean): BaseDataHash;
        getSysDataHash(name: string): BaseDataHash;
        getDataHash(name: string): DataHash;
        registDataHash(name: string, data: any, mainKey: any, itemCls?: any, hashCls?: any, buildNow?: boolean): DataHash;
    }
}
declare namespace zt {
    const reload: () => void;
}
declare namespace zt.effects {
    import Sprite = Laya.Sprite;
    class AniFactory {
        private static _ins;
        private _effectCache;
        private _moduleCache;
        constructor();
        static getInstance(): AniFactory;
        createEffect($url: string, $module: string, $endToRemove?: boolean, $once?: boolean, $callBack?: Function): Effect;
        createSingleEffect($url: string, $module: string, $endToRemove?: boolean, $once?: boolean, $callBack?: Function): Effect;
        effectComplete($target: Effect, force?: boolean): void;
        clearSingleEffect($url: string): void;
        resyleEffectGroup($effect: Effect): void;
        disposeByUrl($url: string): void;
        disposeEffect(effect: Effect): void;
        disposeModule($module: string): void;
        createFightEffect($url: string, $x: number, $y: number, $isContray: boolean, $length: number, $parent: Sprite, $isAttack: boolean): SkillEffect;
        dispose(): void;
    }
    const createEffect: ($url: string, $module: string, $endToRemove?: boolean, $once?: boolean, $callBack?: Function) => Effect;
    const createSingleEffect: ($url: string, $module: string, $endToRemove?: boolean, $once?: boolean, $callBack?: Function) => Effect;
    const disposeModule: (module: string) => void;
    const resyleEffectGroup: (effect: Effect) => void;
    const playCenterQueueEffect: ($url: string, $module: string, $width: number, $height: number, $x?: number, $y?: number) => void;
    const playAutoQueueEffect: ($url: string, $module: string, $width: number, $height: number, $x?: number, $y?: number) => void;
    const createSkillEffect: ($url: string, $x: number, $y: number, $isContray: boolean, $length: number, $parent: Sprite, $isAttack: boolean) => SkillEffect;
}
declare namespace zt.effects {
    class DamageFactory {
        private static _instance;
        DAMAGE: string;
        HEAL: string;
        CRITICAL: string;
        private _damageType;
        constructor();
        static readonly instance: DamageFactory;
        getDamageView($num: DamageNum, $hurtNum: String, $type: number, $isAdd?: Boolean, $gap?: number): void;
        init(): void;
    }
}
declare namespace zt.effects {
    import Sprite = Laya.Sprite;
    class DamageNum extends Sprite {
        private _dispose;
        type: number;
        isAdd: boolean;
        private static _damagePool;
        constructor();
        static getDamageNum($hurtNum: number, $type: number, $isAdd: boolean): DamageNum;
        setNum($hurtNum: number): void;
        setScale(scale: number): void;
        dispose(): void;
        play($type: number): void;
        private playLoseBlood();
        private playCrticle();
        private onPlayComplete();
    }
}
declare namespace zt.effects {
    import Sprite = Laya.Sprite;
    import Handler = Laya.Handler;
    class Effect extends Laya.Animation {
        isOnce: boolean;
        url: string;
        private _callBack;
        endToRemove: boolean;
        private _module;
        private _isSingle;
        private _cacheFrame;
        private _currentFrame;
        private _loadCompleteList;
        private _isCenter;
        private _scale;
        private _container;
        constructor($url: string, $once: boolean, $endToRemove: boolean, $callBack?: Function);
        private loadComplete();
        private onPlayComplete();
        playEffect($parent: Sprite, $x: number, $y: number, $isLoop?: boolean, $blendMode?: string, $callBack?: Function, speed?: number): void;
        playEffectAtCenter($parent: Sprite, $isLoop?: boolean, $blendMode?: string, speed?: number, scale?: number): void;
        protected _frameLoop(): void;
        addFrame($frame: number, $handle: Handler): void;
        registerLoadComplete($func: Handler): void;
        stopEffect(): Effect;
        changeSpeed($inteval: number): void;
        destroy(destroyChild?: boolean): void;
        module: string;
        isSingle: boolean;
        callBack: Function;
        isCenter: boolean;
        readonly name: string;
    }
}
declare namespace zt.effects {
    class EffectQueue {
        private static _ins;
        private _effectQueue;
        static CENTER: string;
        static AUTO: string;
        private _isCenterPlaying;
        private _isAutoPlaying;
        constructor();
        static readonly ins: EffectQueue;
        addToCenterQunue($url: string, $module: string, $width: number, $height: number, $x: number, $y: number): void;
        addToAutoQunue($url: string, $module: string, $width: number, $height: number, $x: number, $y: number): void;
        private playEffect($type);
        private playEffectComplete($type);
        private getEffectData($url, $module, $width, $height, $x, $y, $type);
    }
    class EffectData {
        url: string;
        module: string;
        width: number;
        height: number;
        type: string;
        speed: number;
        x: number;
        y: number;
    }
}
declare namespace zt.effects {
    import Sprite = Laya.Sprite;
    import Handler = Laya.Handler;
    class SkillEffect extends Sprite {
        url: string;
        private _module;
        private _cacheFrame;
        private _currentFrame;
        private _loadCompleteList;
        private interval;
        private frames;
        private _totalFrame;
        private _speed;
        private _isContray;
        private _length;
        private _isLoadComplete;
        private _rectangle;
        private _isPlaying;
        private _isStart;
        private _sourceWidth;
        private _sourceHeight;
        private _isAttack;
        private _startFrame;
        private _isLoop;
        constructor($url: string, $x: number, $y: number, $isContray: boolean, $length: number, $parent: Sprite, $isAttack: boolean);
        private loadComplete();
        private parseAni();
        private checkPlayComplete();
        private dispose();
        playEffect(speed?: number, isLoop?: boolean, $blendMode?: string, frame?: number): void;
        private play(frame?);
        readonly isPlaying: boolean;
        protected loop(): void;
        addFrame($frame: number, $handle: Handler): void;
        registerLoadComplete($func: Handler): void;
        stopEffect(): SkillEffect;
        changeSpeed($inteval: number): void;
        destroy(destroyChild?: boolean): void;
        module: string;
        readonly name: string;
    }
}
declare namespace zt {
    interface RaiseParams {
        start: {
            x: number;
            y: number;
        };
        end: {
            x: number;
            y: number;
        };
        duration?: number;
        isQuene: boolean;
        detalTime: number;
    }
    interface IPoint {
        x: number;
        y: number;
    }
}
declare namespace zt.loader {
    class ModuleItem {
        private _url;
        private _name;
        private _projPrefix;
        private _onComplete;
        load(moduleName: string, fileName: string, onComplete: Laya.Handler): void;
        private onload(data);
    }
}
declare namespace zt.net {
    import Handler = Laya.Handler;
    import Byte = Laya.Byte;
    const call: (cmd: string, params: Object, callback?: Handler, errorHandler?: Handler, noMask?: boolean) => void;
    const on: (cmd: string, caller: any, method: any) => void;
    const off: (cmd: string, caller: any, method: any) => void;
    const onSeq: (cmd: string, cb: Handler, onerror?: Handler) => Function;
    const onSeqOff: (cmd: string, onevent: any) => void;
    const callCompMsg: (toCompType: number, toCompID: number, toCompCMD: number, data: any, callback: Handler, errorHandler: Handler) => void;
    const getByteObj: (data?: any) => Byte;
    class EventUtils {
        static getSeqEventName(cmd: string): string;
        static getSeqEventNames(cmds: string[]): string[];
    }
}
declare namespace zt {
    class Calls extends Laya.EventDispatcher {
        private _list;
        private _counter;
        constructor();
        add(cmd: string, params: any): void;
        addCmds(list: {
            cmd: string;
            params;
            data?;
        }[]): void;
        start(): void;
        private check();
        readonly list: {
            cmd: string;
            params: any;
            data?: any;
        }[];
    }
}
declare namespace zt.net {
    import EventDispatcher = Laya.EventDispatcher;
    import Handler = Laya.Handler;
    class GameSocket extends EventDispatcher {
        private static _instance;
        private _socket;
        private _onConnected;
        private _url;
        private _counter;
        private _callbacks;
        private _errorHandlers;
        private _componentMsgCb;
        private _componentErrorCb;
        private _inited;
        private protocols;
        constructor();
        static readonly instance: GameSocket;
        init(socket: ISocketProxy): void;
        connect(url: string, onConnected: Handler): void;
        setProtocol(protocol: string): GameSocket;
        sendHeart(): void;
        sendComponentMsg(msgHead: MessageHeadOut, componentCMD: number, data: any, callback: Handler, errorHandler: Handler): void;
        send(msgHead: MessageHeadOut, data: any, callback: Handler, errorHandler: Handler): void;
        private initEvent();
        removeEvents(): void;
        onSocketOpen(e: any): void;
        onSocketClose(e: any): void;
        onMessageReceived(buffer: ArrayBuffer): void;
        handleComponentMsgBack(data: any): void;
        onConnectError(e: any): void;
        private getTime();
        close(): void;
    }
}
declare namespace zt.net {
    class GetwayAppMgr {
        static list: any[];
    }
}
declare namespace zt.net {
    interface ISocketProxy {
        connectByUrl(url: string): void;
        protocols: Array<any>;
        send(data: any): void;
        on(type: String, caller: any, listener: Function, args: Array<any>): Laya.EventDispatcher;
        close(): void;
        onSocketOpen: Laya.Handler;
        onMessageReceived: Laya.Handler;
    }
}
declare namespace zt.net {
    class SocketProxy implements net.ISocketProxy {
        private _socket;
        private _onMessageReceived;
        private _onSocketOpen;
        constructor();
        private $onSocketOpen(e);
        private $onMessageReceived(e);
        onMessageReceived: Laya.Handler;
        onSocketOpen: Laya.Handler;
        connectByUrl(url: string): void;
        on(type: string, caller: any, listener: Function, args?: Array<any>): Laya.EventDispatcher;
        close(): void;
        readonly protocols: Array<any>;
        send(data: any): void;
    }
}
declare namespace zt.net {
    enum CELLAPPType {
    }
    enum ComponentCMDType {
        REQUEST_GATEWAYAPP = 1,
        LOGIN = 2,
        LOGOUT = 3,
        INTERRUPT = 4,
        ERROR = 5,
    }
    enum ComponentIDType {
        GATEWAYAPPMGR = 1,
    }
    enum ComponentType {
        CLIENT = 1,
        GATEWAYAPPMGR = 2,
        GATEWAYAPP = 3,
        CELLAPP = 4,
    }
    enum FlagType {
        UNCOMPRESS = 0,
        COMPRESS = 1,
    }
    enum MessageType {
        NULL = 0,
        COMPONENT = 1,
        ENTITY = 2,
    }
}
declare namespace zt.scene {
    import Sprite = Laya.Sprite;
    import ILayer = zt.universe.view.ILayer;
    class SceneBase extends Sprite {
        private _moveTween;
        private static DURATION;
        move(pos: ScenePos, layerName: string, params: any): void;
        private find(layerName);
        update(val: any): void;
        preproccess(): void;
        build(): void;
        dispose(): void;
        private disposeTexture();
        protected moveComplete(): void;
        readonly cmds: {
            cmd: string;
            params;
            data?;
        }[];
        readonly res: Array<any>;
        protected _params: SceneParams;
        params: any;
        protected reBuild(): void;
        protected readonly layer: ILayer;
        protected readonly layers: ILayer[];
    }
}
declare namespace zt.scene {
    class SceneData {
        private _name;
        private _gui;
        private _backgroundID;
        constructor(obj: object);
        background: string;
        gui: Array<any>;
        name: string;
    }
}
declare namespace zt.scene {
    class SceneEvent {
        static RES_LOAD: string;
        static PRELOAD_COMPLETE: string;
        static START_DISPOSE: string;
        static DISPOSE: string;
    }
}
declare namespace zt {
    interface ScenePos {
        x: number;
        y: number;
        offsetX: number;
        offsetY: number;
    }
    interface SceneParams {
        onbuildComplete?: Laya.Handler;
        SceneID?: number;
        sceneName: string;
    }
}
declare namespace zt.scene {
    class SceneItem extends Laya.EventDispatcher {
        private _name;
        private _scene;
        private _params;
        private _resLoaded;
        private _dataLoaded;
        private _isReBuild;
        constructor(name: string, scene: SceneBase, params: SceneParams);
        preload(): void;
        update(params: SceneParams): void;
        private loadRes();
        private onResProgress(val);
        private loadData();
        private onResLoad();
        private checkComplete();
        readonly scene: SceneBase;
        readonly name: string;
        readonly params: SceneParams;
        dispose(): void;
    }
}
declare namespace zt {
    const getTimer: () => number;
    const getServerTime: () => number;
    const formatTime: (time: number, type?: string, dibit?: boolean, suffixs?: string[]) => string;
    const formatTimeHMS: (time: number) => string;
    const getCountDown: (time: number, type?: string, dibit?: boolean) => any[];
    const getSysTimeByTime: (hourTime: string) => number;
    const offsetTime: (time: number, offset: any) => number;
    const getDateByTime: (time: number) => Date;
    class CountDownType {
        static HMS: string;
        static DHMS: string;
    }
}
declare namespace zt.tips {
    const getTipBg: () => Sprite;
}
declare namespace zt.tips {
    import Sprite = Laya.Sprite;
    import RaiseParams = zt.RaiseParams;
    class RaisingImageManager {
        private _layer;
        private _waitsQuene;
        private _waitParamsQuene;
        private _busy;
        private static _instance;
        add(url: string, raiseParam: RaiseParams): void;
        private checkNext();
        private next();
        playRaise(url: string, param: RaiseParams): void;
        private getRaiseItem(url, isQuene?);
        private oncomplete(raiseItem);
        static readonly instance: RaisingImageManager;
        init(layer: Sprite): void;
    }
    class RaiseItem extends Sprite {
        private _url;
        private _isQuene;
        constructor($url: string);
        url: string;
        private loadComplete();
        isQuene: boolean;
        clear(): void;
    }
}
declare namespace zt.tips {
    import Sprite = Laya.Sprite;
    import Point = Laya.Point;
    class RaisingItemManager {
        private _layer;
        private _waitsQuene;
        private _busy;
        private static _instance;
        private _registerDic;
        private _displayItems;
        private _flyItems;
        private _isFlying;
        add(item: IRaseData): void;
        constructor();
        play(): void;
        private arrange();
        private playSingle();
        private flyItem();
        private addToStage();
        registerRaiseItem($key: string, url: string): void;
        private playRaiseItem();
        private getRaiseItem(url, isQuene?);
        private oncomplete(raiseItem);
        static readonly instance: RaisingItemManager;
        init(layer: Sprite): void;
    }
    interface IRaseData {
        key: string;
        raisePoint: Point;
    }
}
declare namespace zt.tips {
    import Sprite = Laya.Sprite;
    class RaisingTipManager {
        private _last;
        private _layer;
        private _waits;
        private _waitParams;
        private _busy;
        private static DURATION;
        private static RAISING_Y;
        private static OFFSET_X;
        private static OFFSET_Y;
        add(tips: string, param?: {}): void;
        private checkNext();
        private next();
        private getText(tips, param);
        private showToStage(tip);
        private oncomplete(text);
        private static _instance;
        static readonly instance: RaisingTipManager;
        init(layer: Sprite): void;
    }
}
declare namespace zt.tips {
    class TipCaches {
        private static _instance;
        private static _cls;
        private static DELAY;
        private _hash;
        constructor();
        static getInstance(): TipCaches;
        static register(type: string, cls: any): void;
        getTip(type: string): BaseTip;
        private getTipByType(type);
        clearCache(): void;
        private clear();
    }
}
declare namespace zt.tips {
    class TipManager {
        private static OFFSETX;
        private static OFFSETY;
        private static DELAY;
        private static _instance;
        private _currentTip;
        show(type: String, data: UIBase | string | string[]): void;
        private showTip(type, data);
        private onStageMouseMove(param0);
        private showToStage(tip, offX?, offY?);
        dispose(): void;
        static readonly instance: TipManager;
        hide(): void;
        private _layer;
        init(layer: Sprite): void;
    }
}
declare namespace zt.tips {
    import Sprite = Laya.Sprite;
    class BaseTip {
        protected _data: any;
        protected _bgWidth: number;
        protected _bgHeight: number;
        protected _ui: Sprite;
        setData(data: any): void;
        readonly bgWidth: number;
        readonly bgHeight: number;
        draw(): void;
        dispose(): void;
        readonly ui: Sprite;
    }
}
declare namespace zt.tips {
    class CommonTip extends BaseTip {
        draw(): void;
        dispose(): void;
    }
}
declare namespace zt.tips {
    class NormalTip extends BaseTip {
        private static MAX_TEXT_WIDTH;
        private static GAP;
        private static LINE_GAP;
        private _bg;
        private _list;
        private _h;
        constructor();
        draw(): void;
        private createText(text);
        dispose(): void;
    }
}
declare namespace zt.tips {
    class SimpleTip extends BaseTip {
        private static MAX_TEXT_WIDTH;
        private static GAP;
        private _bg;
        private _text;
        constructor();
        draw(): void;
    }
}
import Sprite = Laya.Sprite;
import TipManager = zt.tips.TipManager;
import RaisingTipManager = zt.tips.RaisingTipManager;
import RaisingImageManager = zt.tips.RaisingImageManager;
import RaisingItemManager = zt.tips.RaisingItemManager;
import TipCaches = zt.tips.TipCaches;
import CommonTip = zt.tips.CommonTip;
import NormalTip = zt.tips.NormalTip;
import SimpleTip = zt.tips.SimpleTip;
import RaiseParams = zt.RaiseParams;
declare namespace zt {
    class Tips {
        static show(tip: string | UIBase | string[]): void;
        private static isJSON(str);
        static showRaisingTips(tips: string, type?: number, param?: {}): void;
        static showRaiseItem(data: any): void;
        static registerRaiseItem(key: string, url: string): void;
        static playRaiseItem(): void;
        static showRaisingImages(url: string, param: RaiseParams): void;
        private static showTipNormal(tip);
        private static showSimpleTip(tip);
        private static showCommonTip(ui);
        static hide(): void;
        static showTipByType(type: String, data: UIBase | string | string[]): void;
        static register(type: string, cls: any): void;
        static init(): void;
        private static readonly tipLayer;
    }
    const getRaiseParam: ($start: IPoint, $end: IPoint, $isQuene?: boolean, $duration?: number, $delta?: number) => RaiseParams;
}
declare class TipType {
    static SIMPLE: string;
    static NORMAL: string;
    static COMMON: string;
}
declare namespace zt {
    import GComponent = fairygui.GComponent;
    import AppBase = zt.app.AppBase;
    import Handler = Laya.Handler;
    class Adaptation {
        private static _ins;
        static MAX_SCREEN_W: number;
        static MAX_SCREEN_H: number;
        static MIN_SCEEN_W: number;
        static MIN_SCEEN_H: number;
        private static _centerTarget;
        private static _fullTarget;
        private static _borderTarget;
        private static _posTarget;
        private static _allTarget;
        private static _funcTarget;
        private static _handleParam;
        constructor();
        static init(): void;
        static addEvent(): void;
        static resizeView(): void;
        private static fullUIAdaptaion($ui);
        private static centerUIAdaptaion($ui);
        static removeEvent(): void;
        static register($ui: GComponent | AppBase, $adaptType?: number, handler?: Handler): void;
        static registerFunc($key: string, target: Function | Handler): void;
        static unregisterFunc($key: string): void;
        static unregister($target: GComponent | AppBase, $adaptType?: number): void;
    }
    class AdaptationType {
        static ADAPT_CENTER: number;
        static ADAPT_FULL_SCREEN: number;
        static ADAPT_CLOSE_BORDER: number;
        static ADAPT_OPEN_POS: number;
    }
}
declare namespace zt.utils {
    class ArrayUtil {
        static NUMERIC: number;
        static DESCENDING: number;
        static contains(item: any, list: Array<any>): Boolean;
        static remove(item: any, list: Array<any>): any;
        static keys(object: any): any[];
        static sortOnArr(arr: any, keyArr: string[], order: number[]): void;
    }
}
declare namespace zt {
    const __app: (data: string) => void;
    const __getapp: () => string;
    const __scene: (name: string) => void;
    const __getscene: () => string;
    const __disable: (names: string | string[]) => void;
    const __enable: (key: string) => void;
    const __enablePlayGround: (key: string) => void;
    const __enableDebugPanel: () => void;
    const __disableDebugPanel: () => void;
    const __getDebugEnabled: (key: string) => boolean;
    const __getEnabled: (key: string) => boolean;
    const __clear: () => void;
    const __clearAndDisable: (names?: string | string[]) => void;
    const __cb: (cmd: string, params: any) => void;
    const __notify: (cmd: string, params: any) => void;
}
declare namespace zt {
    class FloatTool {
        private _ships;
        private _offsets;
        private static SPEED;
        private static RANGE;
        constructor();
        static add(ship: Sprite): void;
        static remove(ship: Sprite): void;
        static dispose(): void;
        private onframe();
        private onframeItem(ship);
        private static _instance;
        static instance: FloatTool;
        static init(): void;
    }
}
declare namespace zt {
    const getDefinition: (classpath: string) => Function;
}
declare namespace zt.utils {
    import Point = Laya.Point;
    const getAngle: (form: any, to: any) => number;
    const getDistance: (form: any, to: any) => number;
    const fix: (value: number, fixnum?: number) => number;
    const sum: (nums: number[]) => number;
    const getTargetToCenter: (x: number, y: number, p1?: Point, p2?: Point) => number;
    const getLineVerticalPoint: (x: number, y: number, p1?: Point, p2?: Point) => Point;
}
declare namespace zt.utils {
    class ModuleUtils {
        static getModulePath(name: string): string;
        static hasDefinition(name: string): Boolean;
        static getModuleDefinition(name: string): Function;
        static getInstance(name: string): Object;
    }
}
declare namespace zt {
    class MyArray {
        static DESCENDING: number;
        static NUMERIC: number;
        static sortOn(arr: any[], fieldName: any, options?: any): void;
        private static oneSortFunc(arr, fieldName, options);
        private static listSortFunc(arr, fieldNameList, optionsList);
        private static sortFunc(a, b, options);
        private static numberCompare(a, b, options);
        private static stringCompare(a, b, options);
        private static isDescending(options);
        private static isNumeric(options);
    }
}
declare namespace zt {
    class ObjectUtils {
        static hasKey(obj: object): boolean;
    }
    const getKey: (object: any) => string;
    const getValue: (object: any) => any;
}
declare namespace zt {
    import GObject = fairygui.GObject;
    class Pool {
        private static _gobjectPool;
        private static _pool;
        constructor();
        static readonly ins: Pool;
        getComFormPool($url: string): GObject;
        returnToPool(obj: GObject, $url: string): void;
        clear($url: string): void;
    }
}
declare namespace zt.utils {
    class stringUtil {
        static paramFormat(str: any, ...paramList: any[]): any;
        private static paramFormatItem(str, paramList);
        static isNumeric(p_string: any): boolean;
        static trim(p_string: string): string;
        static replaceFirstUper(str: string): string;
        static replaceFirstLower(str: string): string;
    }
}
declare namespace zt {
    class System {
        static _systemTime: number;
        static _systemTimeTag: number;
        static setSystemTime(val: any): void;
    }
}
declare namespace zt.utils {
    const getDataURL: (path: string) => string;
    const getJSURL: (name: string) => string;
    const getResourceURL: (path: string) => string;
    const getUIURL: (path: string) => string;
    const getURL: (path: string) => string;
}
declare namespace zt {
    import Sprite = Laya.Sprite;
    import Point = Laya.Point;
    import Rectangle = Laya.Rectangle;
    class GuideLine extends Sprite {
        pathLength: number;
        protected _mapRect: Rectangle;
        protected _offsetX: number;
        protected _offsetY: number;
        protected _url: string;
        protected _start: Point;
        protected _end: Point;
        protected _pathList: PathData[];
        protected _type: string;
        protected _isLoad: boolean;
        protected _angle: number;
        private _frame;
        private lightUrl0;
        private lightUrl1;
        private lightUrl2;
        private _data;
        constructor();
        init(): void;
        clear(): void;
        data: GuideLineData;
        private reRender();
        protected loadTex(): void;
        protected readonly url: string;
        protected clipViewPort(): void;
        protected getDistance($start: Point, $end: Point): number;
        updatePath($start: Point, $end: Point): void;
        update(offsetx?: number, offsety?: number): void;
        dispose(): void;
    }
    class GuideLineData {
        guideID: number;
        to: number;
        from: number;
        minLevel: number;
        maxLevel: number;
    }
    class PathData {
        private _x;
        private _y;
        static pathDatas: Array<PathData>;
        static index: number;
        constructor(x: number, y: number);
        static getPath(x: number, y: number): PathData;
        x: number;
        y: number;
        static reset(): void;
        static clear(): void;
    }
}
declare namespace zt {
    import Sprite = Laya.Sprite;
    import Point = Laya.Point;
    import Rectangle = Laya.Rectangle;
    class Hexagonal extends Sprite {
        edgeRange: number;
        protected cacheGrid: object;
        protected _mapRect: Rectangle;
        protected viewPorts: Array<HexData>;
        protected hasGenerate: object;
        protected _offsetX: number;
        protected _offsetY: number;
        protected _isLoad: boolean;
        protected _hexRangeList: HexRangeData[];
        constructor();
        init($list: HexRangeData[]): void;
        protected getPointByIndex(u: number, v: number): Laya.Point;
        protected loadTex(): void;
        protected resizeMapRect(): void;
        protected getIndexByPoint(p: Point): Point;
        update(offsetx?: number, offsety?: number): void;
        protected showHoldRange($data?: any): void;
        protected generateByRange(hexData: HexData, range: number): void;
        protected clipViewPort(): void;
        protected getEdgeSide(hexData: HexData): string;
        protected edgeTotalScore(hexData: HexData): number;
        protected sideScore(u: number, v: number, hexData: HexData): number;
        dispose(): void;
        protected initilization(): void;
        protected calcHexEdge(hexData: HexData, depth: number): void;
        protected edge(u: number, v: number, add?: number): void;
    }
    class HexData {
        u: number;
        v: number;
        x: number;
        y: number;
        isEdge: boolean;
        inEdge: boolean;
        needAdd: number;
        static hexDatas: Array<HexData>;
        static index: number;
        constructor(ou: number, ov: number);
        readonly key: string;
        static getHex(u: number, v: number): HexData;
        static reset(): void;
        static clear(): void;
    }
    interface HexRangeData {
        X: number;
        Y: number;
        Range: number;
    }
}
declare namespace zt {
    class Mask extends Laya.Sprite {
        private _free;
        constructor();
        private initEvent();
        draw(alpha: number): void;
        free: boolean;
        dispose(): void;
        private static _instance;
        show(alpha: number): void;
        hide(): void;
        static readonly instance: Mask;
    }
    const DEFAULT_MASK_ALPHA = 0.4;
    const showMask: (alpha?: number) => void;
    const hideMask: () => void;
}
declare namespace zt {
    import Sprite = Laya.Sprite;
    import Point = Laya.Point;
    class PathLine extends Sprite {
        pathLength: number;
        protected _url: string;
        protected _start: Point;
        protected _end: Point;
        protected _type: string;
        protected _isLoad: boolean;
        protected _angle: number;
        private pathUrl;
        private pathPointUrl;
        constructor();
        protected readonly url: string;
        protected clipViewPort(): void;
        protected getDistance($start: Point, $end: Point): number;
        updatePath($start: Point, $end: Point): void;
        clear(): void;
        dispose(): void;
    }
}
declare namespace zt {
    import Sprite = Laya.Sprite;
    class PathTarget extends Sprite {
        private pathPointUrl;
        constructor();
        private loadTex();
        show(): void;
        hide(): void;
        dispose(): void;
    }
}
declare namespace zt.app {
    import Handler = Laya.Handler;
    import GComponent = fairygui.GComponent;
    import GButton = fairygui.GButton;
    class BaseSilder {
        protected _callBack: Handler;
        protected _ui: GComponent;
        protected _closeBtn: GButton;
        protected _closeHandler: Handler;
        constructor($ui: GComponent);
        init(): void;
        addEvent(): void;
        removeEvent(): void;
        readonly width: number;
        showSilder($handler: Handler): void;
        hideSilder(): void;
        dispose(): void;
    }
}
declare namespace zt {
    import GComponent = fairygui.GComponent;
    class UIBase implements AppUIBase {
        protected _ui: GComponent;
        constructor(ui: GComponent);
        visible: boolean;
        readonly ui: GComponent;
        start(): void;
        update(): void;
        dispose(): void;
    }
    interface AppUIBase {
        start(): any;
        dispose(): any;
    }
}
declare namespace zt.app {
    import Handler = Laya.Handler;
    class UIController implements IController {
        protected _app: AppBase;
        private _controllerName;
        private _uiModel;
        protected _moduleName: string;
        private _prefix;
        constructor(app: AppBase);
        init(): void;
        setModuleName(moduleName: string, $prefix: string): void;
        start(): void;
        close(): void;
        dispose(): void;
        readonly model: IModel;
        readonly prefix: string;
        readonly moduleName: string;
        readonly controllerlName: string;
        showSilder(silderName: string, handler: Handler): void;
        hideSilder(silderName: any): void;
    }
}
declare namespace zt.app {
    class UIModel implements IModel {
        private _modelName;
        private _prefix;
        protected _params: any;
        private _moduleName;
        constructor($param: any);
        init(): void;
        dispose(): void;
        getData(): object;
        start(): void;
        setModuleName(moduleName: string, $prefix: string): void;
        readonly moduleName: string;
        readonly modelName: string;
        readonly prefix: string;
    }
}
declare namespace zt.app {
    import GComponent = fairygui.GComponent;
    import Event = Laya.Event;
    class UIView implements IView {
        private _uiViewName;
        private _model;
        private _controller;
        protected _moduleName: string;
        protected _ui: GComponent;
        private _prefix;
        constructor($root?: GComponent);
        getUI($d: object, $isGuide: boolean): GuideNode;
        startGuild($d: object): void;
        start(): void;
        setModuleName(moduleName: string, $prefix: string): void;
        init(): void;
        addEvent(): void;
        protected removeEvent(): void;
        protected closeApp(event?: Event): void;
        readonly model: IModel;
        readonly controller: IController;
        readonly prefix: string;
        readonly moduleName: string;
        readonly uIName: string;
        readonly ui: GComponent;
        dispose(): void;
    }
}
declare namespace zt.net {
    class MessageHeadIn {
        private _type;
        private _from_component_type;
        private _from_component_id;
        private _to_component_type;
        private _to_component_id;
        constructor(source: Laya.Byte);
        readonly from_component_id: number;
        readonly to_component_id: number;
        readonly to_component_type: number;
        readonly from_component_type: number;
        readonly type: number;
        toString(): string;
    }
}
declare namespace zt.net {
    class MessageHeadOut {
        private _type;
        private _from_component_type;
        private _from_component_id;
        private _to_component_type;
        private _to_component_id;
        constructor(type: number, from_component_type?: number, from_component_id?: number, to_component_type?: number, to_component_id?: number);
        write(byte: Laya.Byte): void;
        toString(): String;
        readonly type: number;
    }
}
declare namespace zt.net {
    class PackageIn extends Laya.Byte {
        private _msgsize;
        private _flag;
        private _sourcesize;
        private _msgHead;
        private _content;
        private _source;
        private _componentCMD;
        constructor(source: ArrayBuffer);
        readonly msgHead: MessageHeadIn;
        readonly content: any;
        parse(): void;
        readonly componentCMD: number;
    }
}
declare namespace zt.net {
    class PackageOut extends Laya.Byte {
        private static COMPRESS_BYTES_MIN;
        private static BODY_BYTES;
        private _componentCMD;
        private _flag;
        private _msgbodyBuffer;
        private _msgbody;
        constructor();
        writeData(messageHead: MessageHeadOut, componentCMD?: number, msg?: string): void;
        getmsgsize(msgbodyBuffer: ArrayBuffer): number;
        compress(msgSourceByte: Laya.Byte): ArrayBuffer;
        getFlag(msgbody: Laya.Byte): number;
        readonly flag: number;
        readonly msgBodyLen: number;
        readonly msgbody: Laya.Byte;
    }
}
declare namespace zt.universe {
    class BaseVo implements IElementVo {
        X: number;
        Y: number;
        rIndex: number;
        cIndex: number;
        ElementID: number;
        index: number;
        constructor();
        readonly key: string;
    }
}
declare namespace zt.universe {
    class GridVo {
        private _rIndex;
        private _cIndex;
        private _w;
        private _h;
        private _x;
        private _y;
        private _url;
        private _key;
        private _elementKeyList;
        private _isOnShow;
        constructor();
        rIndex: number;
        cIndex: number;
        width: number;
        height: number;
        x: number;
        y: number;
        readonly key: string;
        private updateKey();
        registerKey(iGrid: IElementVo): void;
        deleteKey(iGrid: IElementVo): void;
        readonly elementKeyList: any[];
        isOnShow: boolean;
        clear(): void;
    }
}
declare namespace zt.universe {
    interface IElementVo {
        X: number;
        Y: number;
        ElementID: number;
    }
}
declare namespace zt.universe {
    class Rect {
        x: number;
        y: number;
        width: number;
        height: number;
        private _right;
        private _left;
        private _bottom;
        private _top;
        constructor(x?: number, y?: number, width?: number, height?: number);
        setTo(x?: number, y?: number, width?: number, height?: number): void;
        bottom: number;
        top: number;
        left: number;
        right: number;
        equal(rect: Rect): boolean;
        cloneTo(target: Rect): void;
        scaleRatio($ratio?: number): Rect;
        toString(): string;
    }
}
declare namespace zt.universe {
    class UniverseData {
        W_SIZE: number;
        H_SIZE: number;
        private _universeWidth;
        private _universeHeight;
        private _mapWidth;
        private _mapHeight;
        private mapShowR;
        private mapShowC;
        private tPaddingRect;
        private _gridHash;
        private _baseHash;
        private _viewRec;
        private _dragRec;
        private _mapLastRect;
        private _mapRect;
        private _bgLayerRect;
        private _centerX;
        private _centerY;
        private _elementHash;
        private _bgRatio;
        private _moveRatio;
        private _sceneID;
        private _isEqualLast;
        constructor();
        initUniverse(sceneData: ISceneVo, $elementList: any[]): void;
        private initGrid();
        private initElementList(elementList);
        private initBase();
        getGridRec(r: number, c: number): Rect;
        private hideGrid(c, r);
        private showGrid(c, r);
        moveViewPort(moveX: number, moveY: number, $isForce?: boolean): void;
        updateViewPort($isForceRefresh?: boolean): void;
        outElementList(): void;
        changeViewPortBySize(width: number, height: number, rect?: Rect): Rect;
        private hideAll();
        changeViewPort(moveX: number, moveY: number, width: number, height: number): void;
        private clipViewPort();
        registerData(element: IElementVo): void;
        getGridVo(r: number, c: number): GridVo;
        getBaseVo(r: number, c: number): BaseVo;
        readonly bgRatio: number;
        readonly moveRatio: number;
        readonly sceneID: number;
        readonly universeWidth: number;
        readonly universeHeight: number;
        readonly isEqualLast: boolean;
        readonly mapWidth: number;
        readonly mapHeight: number;
        readonly viewRec: Rect;
        readonly containData: IElementVo[];
        getByRect($x: number, $y: number): number[];
        getBaseByIndex($index: number): BaseVo;
        onResize(): void;
        private clear();
        dispose(): void;
    }
    interface ISceneVo {
        Xsize: number;
        Ysize: number;
        mapW: number;
        mapH: number;
        SceneID: number;
    }
}
declare namespace zt.universe.view {
    import Sprite = laya.display.Sprite;
    class Background extends Sprite implements ILayer {
        private _thumb;
        private _universeData;
        private _fragments;
        private _textureLink;
        private _lastIndex;
        private _addToIndex;
        private _dealNums;
        private _texCache;
        static DEALNUM: number;
        static SPEED: number;
        constructor();
        init(): void;
        build($data: UniverseData): void;
        rebuild($data: UniverseData): void;
        clipView(): void;
        private drawNext();
        private drawDelay();
        private showFragment($index);
        hideFragment($index: number): void;
        private updateThumb();
        private onImgLoad(img);
        getPath(): string;
        getFragmentPath(index: number): string;
        readonly name: string;
        readonly ratio: number;
        clear(): void;
        private clearNode($node);
        dispose(): void;
    }
}
declare namespace zt.universe.view {
    interface ILayer extends IDispose {
        ratio: number;
        name: string;
        init(): void;
    }
    class LayerType {
        static ELEMENT: string;
        static BACKGROUND: string;
    }
}
declare namespace zt.universe.view {
    import Rectangle = Laya.Rectangle;
    import Tween = Laya.Tween;
    class UniverseLayer extends Sprite implements ILayer {
        protected universeData: UniverseData;
        protected _type: string;
        protected SPEED: number;
        protected _maprect: Rectangle;
        protected _hexagonal: Hexagonal;
        protected _guideLayer: Sprite;
        protected _pathLayer: Sprite;
        protected _elementLayer: Sprite;
        protected _tween: Tween;
        protected _isneedTween: boolean;
        protected _speedX: number;
        protected _speedY: number;
        protected _startX: number;
        protected _startY: number;
        protected _startTime: number;
        protected _bgLayer: Background;
        private _ratio;
        private _currentPoint;
        private _lastPoint;
        private _dragAble;
        constructor();
        init(): void;
        readonly name: string;
        readonly ratio: number;
        private initDrag();
        private removeDrag();
        private onMouseMove();
        private onMouseDown(e);
        update($isForce?: boolean): void;
        private onMouseUp(e);
        tweenMove(): void;
        rebuild(): void;
        getInnerMapPos(): void;
        private slowDown(t, b, c, d);
        private onViewPortChange(data);
        moveComplete($bool?: boolean): void;
        private tweenUpdate();
        protected resize(): void;
        dispose(): void;
    }
}
declare namespace zt.universe.view {
    import EventDispatcher = Laya.EventDispatcher;
    class ViewPort extends EventDispatcher {
        private static _viewPort;
        private _xPercent;
        private _yPercent;
        static onChange(caller: any, listener: Function): void;
        static change(xPercent: number, yPercent: number, trigger: string): void;
        readonly xPercent: number;
        readonly yPercent: number;
        static init(): void;
    }
}
declare namespace zt.app.core {
    class STController {
        private static _instance;
        private _controllerMap;
        constructor();
        static getInstance(): STController;
        retrieveController($controllerName: string): IController;
        hasController($controllerName: string): boolean;
        registerController($icontroller: IController): void;
        removeController($controllerName: string): IModel;
    }
}
declare namespace zt.app.core {
    class STView {
        private static _instance;
        private _viewMap;
        constructor();
        static getInstance(): STView;
        retrieveUIView(uiName: string): IView;
        registerUIView($uiView: IView): void;
        removeUIView(uiName: string): IView;
    }
}
declare namespace zt.app.core {
    class STModel {
        private static _instance;
        private _modelMap;
        constructor();
        static getInstance(): STModel;
        retrieveModel($modelName: string): IModel;
        hasModel($modelName: string): boolean;
        registerModel(iModel: IModel): void;
        removeModel($modelName: string): IModel;
    }
}
declare namespace zt {
    class Facade {
        private static _instance;
        private _view;
        private _model;
        private _controller;
        private _module_hash;
        constructor();
        static getIns(): Facade;
        protected initialize(): void;
        retrieveModel($modelName: string): IModel;
        retrieveUIView($uiNameName: string): IView;
        retrieveController($controllerName: string): IController;
        registerModel($iMode: IModel): IModel;
        registerUIView($iUIView: IView): IView;
        registerController($iContorller: IController): IController;
        removeController($controllerName: string): void;
        removeView($uiNameName: string): void;
        removeModel($modelName: string): void;
        private registerMoule($targetName);
        removeModule($module: string): void;
        startModule($module: string): void;
    }
    const getModelByModuleName: ($modelName: string, $prefix?: string) => IModel;
    const getControllerByModuleName: ($modelName: string, $prefix?: string) => IController;
    const getViewByModuleName: ($modelName: string, $prefix?: string) => IView;
    const getNameByModuleAndprefix: (moduleName: string, targetName: string, prefix?: string) => string;
}
declare namespace zt {
    import Handler = Laya.Handler;
    interface IController extends IDispose {
        init(): void;
        start(): void;
        close(): void;
        dispose(): void;
        readonly prefix: string;
        readonly moduleName: string;
        readonly controllerlName: string;
        setModuleName(module: string, $prefix: string): void;
        showSilder(silderName: string, handler: Handler): void;
        hideSilder(silderName: any): void;
    }
}
declare namespace zt {
    interface IDispose {
        dispose(): void;
    }
}
declare namespace zt {
    interface IModel extends IDispose {
        init(): void;
        start(): void;
        dispose(): void;
        getData(): object;
        readonly prefix: string;
        readonly modelName: string;
        readonly moduleName: string;
        setModuleName(module: string, $prefix: string): void;
    }
}
declare namespace zt {
    interface IView extends IDispose {
        getUI($d: object, $isGuide: boolean): GuideNode;
        init(): void;
        start(): void;
        dispose(): void;
        startGuild($d: object): void;
        setModuleName(modelName: string, $prefix: string): void;
        addEvent(): void;
        readonly uIName: string;
        readonly prefix: string;
        readonly moduleName: string;
    }
    interface GuideNode {
        x: number;
        y: number;
        width: number;
        height: number;
    }
}
