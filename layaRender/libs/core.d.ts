declare namespace zt {
    class AdditionEffect {
        static getEffect(techType: string, effectType: string, effectProp: string, roleFleetID?: number): number;
        static getTechEffect(techType: string, effectType: string, effectProp: string): number;
        static getCaptainEffect(roleFleetID: number, effectType: string, effectProp: string): number;
    }
}
declare namespace zt {
    class AppEnum {
        static fleetFormation: string;
        static fleetDetail: string;
        static shipDetail: string;
        static map: string;
        static buildDetail: string;
        static fleetRepair: string;
        static shipCreate: string;
        static fleetList: string;
        static battle: string;
        static universe: string;
        static storyScene: string;
        static gui: string;
        static defendConfig: string;
        static defendSetting: string;
        static defenseCenter: string;
        static plotFbApp: string;
        static captain: string;
        static captainRecruit: string;
        static activeTask: string;
        static bountyMission: string;
        static sceneTask: string;
        static createrole: string;
        static colonia: string;
        static fleetInfo: string;
        static buildbase: string;
        static alchemy: string;
        static eventacc: string;
        static league: string;
    }
}
declare namespace zt.net {
    import Handler = Laya.Handler;
    const callRole: (cmd: string, params?: any, cb?: Handler, err?: Handler) => void;
}
declare namespace zt.manager {
    import DataHash = zt.data.DataHash;
    class GameDataManager {
        private static _instance;
        private _initObj;
        private _pathHash;
        constructor();
        static getInstance(): GameDataManager;
        onComplete_gamedata(obj: object): void;
        setupGameData(): void;
        private _sysData;
        setupSysData(): void;
        private registSysData(name, data, mainKeys, itemCls?, hashCls?, buildNow?);
        private registData(name, data, mainKey, itemCls?, hashCls?, buildNow?);
        getDataHash(name: string): DataHash;
        getDataByKey(key: string): object;
        initDataInfo(d: object): void;
        private _proxyPool;
        registerProxy(key: string, proxy: any): void;
        getProxy(key: string): any;
    }
}
declare namespace zt {
    import RoleCDPremiumVo = zt.data.RoleCDPremiumVo;
    class CD {
        static readonly roleCDPremium: data.RoleCDPremiumP;
        static readonly sysCDPremiumP: data.SysCDPremiumP;
        checkExcutorCd(excutorOD: number, type: string): boolean;
        static isLoot($class: string): boolean;
        static isElement($class: string): boolean;
        static sureAcc(vo: RoleCDPremiumVo, needIC: number): void;
    }
    class CDType {
        static ColonyLoot: string;
        static ColonySnatch: string;
        static LootPrivateFleet: string;
        static LootPrivateSuc: string;
        static SnatchPrivateFail: string;
        static SnatchPrivateFleet: string;
        static SnatchPrivateLootProtect: string;
        static SnatchPrivateSnatchProtect: string;
        static SnatchPublicLootProtect: string;
        static LootPublicSuc: string;
        static LootPublicFleet: string;
        static SnatchPublicFleet: string;
        static SnatchPublicSnatchProtect: string;
        static SnatchPublicFail: string;
    }
    class CDClass {
        static ColonyLootProtect: string;
        static ColonySnatchProtect: string;
        static FleetLootPublicForbid: string;
        static FleetSnatchPublicForbid: string;
    }
}
declare namespace zt {
    class ChatMsg {
        static readonly ChatMsgP: data.ChatMsgP;
        static readonly SysChatTemplateP: data.SysChatTemplateP;
        static login(cb?: Function): void;
        static chat(type: string, id: any, msg: string, cb?: Function): void;
        private static _escapeCharacter;
        private static _EquipColor;
        static replaceEscapecharacter(content: string): string;
        static formatChatTemplate(str: string, paramList: any): string;
    }
}
declare namespace zt {
    class Commodity {
        static readonly sysCommodityP: data.SysCommodityP;
        static readonly sysCommodityClassP: data.SysCommodityClassP;
        static readonly roleCommodityP: data.RoleCommodityP;
        static readonly roleCommodityClassP: data.RoleCommodityClassP;
        static getRoleCommodityList(ExecutorID: number, Class: string): void;
        static buyCommodity(executorID: number, commodityID: number, nums: number, callBack?: Function): void;
    }
}
declare namespace zt {
    class core {
        setup(obj: {
            production;
        }): void;
        private initModules();
    }
}
declare namespace zt {
    class Data {
        static staticDatas: object;
    }
}
declare namespace zt {
    import Handler = Laya.Handler;
    const __call: (cmd: string, params: any, callBack?: Handler) => void;
    const __res: (p: any) => void;
    const __exp: (n: number) => void;
    const __fleetProp: (n: number) => void;
    const __testTask: (n: any) => void;
    const __completeTask: (n: any) => void;
    const __item: (n: any, m: any, tag?: boolean) => void;
    const __recruit: (num: any) => void;
}
declare namespace zt {
    const __startExploringPointBattle: () => void;
    const __startColonyBattle: () => void;
    const __load_explore: () => void;
    const __load_exploreBattle: () => void;
}
declare namespace zt {
    const __replayBattle: () => void;
    const __testBattle: () => void;
}
declare namespace zt {
}
declare namespace zt {
    const battle1: () => void;
    const battleCreated: () => void;
    const battleReady: () => void;
    const battleEnterFleet: () => void;
    const __battleJoin: () => void;
    const battleAttack: () => void;
    const __battleAttack: () => void;
    const __battleAttack2: () => void;
    const __battleBuffSkill: () => void;
    const __battleBuff: () => void;
    const __battleSkill: () => void;
    const __battleDead: () => void;
    const __battleDecHp: () => void;
    const __battleDecShield: () => void;
    const __battleDecEn: () => void;
    const __battleIncEn: () => void;
    const __battleTurn: (type?: number, pos?: number) => void;
    const __testBattleAttack: (ani?: number, delay?: number) => void;
    const __testBattleSkill: (ani?: number, delay?: number) => void;
}
declare namespace zt {
    class EventTool {
        constructor();
        static getGoalByPos(pos: number, name: string): any;
        static gridList(name: string): any;
    }
}
declare namespace zt {
    import RoleFleetVo = zt.data.RoleFleetVo;
    class Fleet {
        private static _selectFleet;
        static readonly current: RoleFleetVo;
        static selectFleet: number;
        static readonly list: zt.data.RoleFleetVo[];
        static fleetIndex(roleFleetID: number): number;
        static getFleetIndex(fleetID: number): number;
        static readonly roleFleetP: zt.data.RoleFleetP;
        static readonly roloVirtualFleetCopyP: zt.data.RoleVirtualFleetCopyP;
        static readonly roloVirtualFleetP: zt.data.RoloVirtualFleetP;
        static readonly sysList: zt.data.SysFleetP;
        static readonly roleFleetGroupP: zt.data.RoleFleetGroupP;
        static readonly sysFleetRebuildP: zt.data.SysFleetRebuildP;
        static readonly sysFleetRebuildAwardP: zt.data.SysFleetRebuildAwardP;
        static readonly sysFleetRebuildPropertyP: zt.data.SysFleetRebuildPropertyP;
        static readonly sysFleetGradeP: zt.data.SysFleetGradeP;
        static readonly sysFleetStarP: zt.data.SysFleetStarP;
        static readonly sysFleetLevelP: zt.data.SysFleetLevelP;
        static getPosition(): string;
        static getBattleCabin(roleFleetID: number): number;
        static getShipCabin(roleFleetID: number): number;
        static editFormation(roleFleetID: any, currentIndex: any, nums: any, callback?: Function): void;
        static setVirtualFleet(type: string, $roleFleetID: number, $element: number): void;
        static getRoleFleetByElement($elementID: number): number;
        static getNormalFleetByElement($elementID: number): RoleFleetVo;
        static getFleetBaseInfo(roleID: number, fleetID: number, cb?: Function): void;
    }
}
declare namespace zt {
    class GameConfig {
        static production: boolean;
        static isDebug: boolean;
        static init(data: {
            production;
        }): void;
    }
}
declare namespace zt {
    class Honor {
        static readonly SysExploitOrderP: data.SysExploitOrderP;
        static readonly SysHonorAwardsP: data.SysHonorAwardsP;
        static readonly SysHonorP: data.SysHonorP;
        static readonly RoleHonorP: zt.data.RoleHonorP;
    }
}
declare namespace zt {
    class Item {
        static readonly items: data.SysItemP;
        static readonly roleItems: data.RoleItemP;
        static setup(): void;
        static getItemCoin(itemId: number): string;
    }
    class ItemModule {
        static EventAccelerate: string;
        static MaterialBag: string;
        static EnergySpar: string;
        static CaptainChip: string;
        static CaptainDebris: string;
        static CaptainExp: string;
        static CaptainTalentBook: string;
        static Stuff: string;
        static RepairRobot: string;
    }
}
declare namespace zt {
    class Lair {
        static readonly sysLairP: data.SysLairP;
        static readonly sysLairGroupP: data.SysLairGroupP;
        static readonly sysMobP: data.SysMobP;
    }
}
declare namespace zt {
    class League {
        static readonly sysLeagueLevelP: data.SysLeagueLevelP;
        static readonly sysLeagueFuncPowerP: data.SysLeagueFuncPowerP;
        static readonly sysLeagueDutyPowerP: data.SysLeagueDutyPowerP;
        static readonly sysLeagueSignValueP: data.SysLeagueSignValueP;
        static readonly sysLeagueDonateP: data.SysLeagueDonateP;
        static readonly leagueP: data.LeagueP;
        static readonly roleLeagueP: data.RoleLeagueP;
        static readonly roleLeagueRequestP: data.RoleLeagueRequestP;
        static readonly roleLeagueSignLogP: data.RoleLeagueSignLogP;
        static createLeague(name: string, callBack?: Function): void;
        static setName(name: string, callBack?: Function): void;
        static setNotice(notice: string, callBack?: Function): void;
        static setAutoJoin(autoJoin: number, callBack?: Function): void;
        static setMinFight(minFight: number, callBack?: Function): void;
        static getLeagueList(leagueID: number, numPerPage: number, pageNum: number, callBack?: Function): void;
        static searchLeague(name: string, exact: number, callBack?: Function): void;
        static requestLeague(leagueID: number, callBack?: Function): void;
        static getRoleRequestList(callBack?: Laya.Handler): void;
        static cancelRequest(leagueID: number, callBack?: Function): void;
        static getLeagueRequestList(numPerPage: number, pageNum: number, callBack?: Function): void;
        static acceptRequest(toRoleID: number, callBack?: Function): void;
        static refuseRequest(toRoleID: number, callBack?: Function): void;
        static getMemberList(toRoleID: number, callBack?: Function): void;
        static appointDuty(duty: string, toRoleID: number, callBack: Laya.Handler): void;
        static fireDuty(duty: string, toRoleID: number, callBack?: Function): void;
        static removeMember(toRoleID: number, callBack?: Function): void;
        static leaveLeague(callBack?: Function): void;
        static getChairmanInactiveTime(callBack?: Function): void;
        static seizeChairman(callBack?: Function): void;
        static sign(type: string, callBack?: Function): void;
        static getRoleSignList(toRoleID: number, callBack: Laya.Handler): void;
        static getSignValueAward(awardID: number, callBack?: Function): void;
        static getRoleDonateList(callBack?: Function): void;
        static donate(donateID: number, callBack?: Function): void;
    }
}
declare namespace zt {
    class Modules {
        static setup(): void;
        static addRoleSocket(): void;
    }
}
declare namespace zt {
    class NormalInstance {
        static readonly SysNormalInstanceP: data.SysNormalInstanceP;
        static readonly SysNormalInstanceChapterP: data.SysNormalInstanceChapterP;
        static readonly RoleNormalInstanceP: data.RoleNormalInstanceP;
        static readonly RoleNormalInstanceInfoP: data.RoleNormalInstanceInfoP;
    }
}
declare namespace zt {
    class Npc {
        static readonly sysNpcP: data.SysNpcP;
    }
}
declare namespace zt {
    class RandDrop {
        static readonly SysRandDropP: data.SysRandDropP;
    }
}
declare namespace zt {
    class Rank {
        static readonly SysRankP: data.SysRankP;
    }
}
declare namespace zt {
    import RoleSkillVo = zt.data.RoleSkillVo;
    class Role {
        static readonly id: number;
        static readonly FactionID: number;
        static readonly Level: number;
        static readonly Name: string;
        static readonly LeagueID: number;
        static readonly Fighting: number;
        static readonly coin: zt.data.RoleCoinVo;
        static readonly res: data.MaterialVo;
        static readonly roleSkillP: data.RoleSkillP;
        static readonly sysSkillP: data.SysSkillP;
        static readonly sysSkillLevelP: data.SysSkillLevelP;
        static readonly sysRoleLevelP: data.SysRoleLevelP;
        static readonly roleExtendP: data.RoleExtendP;
        static readonly roleCoinP: data.RoleCoinP;
        static readonly materialP: data.MaterialP;
        static getSkillDescript(skillID: number, roleSkill: RoleSkillVo): any;
    }
}
declare namespace zt {
    class Story {
        static readonly sysStoryChapterP: data.SysStoryChapterP;
        static readonly sysStoryParagraphP: data.SysStoryParagraphP;
        static readonly sysDialogP: data.SysDialogP;
        static readonly sysDialogGroupP: data.SysDialogGroupP;
        static readonly roleStoryP: data.RoleStoryP;
    }
}
declare namespace zt.data {
    import EventDispatcher = Laya.EventDispatcher;
    class RoleTaskP extends EventDispatcher {
        private _dataHash;
        private _mainTaskID;
        private _mainTask;
        constructor();
        getGoalComplete(RoleTaskID: number, TaskGoalID: number): boolean;
        getMyLog(): RoleTaskLogVo;
        getDataList(): RoleTask[];
        getData(id: number): RoleTask;
        update(d?: any): void;
        readonly mainTask: RoleTask;
        updateItem(d?: any): void;
    }
    class RoleTask extends DataItem {
        readonly RoleTaskID: number;
        class: string;
        taskSerialID: string;
        taskID: number;
        roleID: string;
        acceptTime: string;
        expireTime: string;
        goalMode: string;
        goalList: RoleTaskGoal[];
        params: object;
        state: string;
        readonly TaskID: number;
    }
    class RoleTaskGoal {
        Data: number;
        RoleTaskID: number;
        TaskGoalID: number;
    }
    class TaskState {
        static COMPLETE: string;
    }
}
declare namespace zt.data {
    import BaseDataHash = zt.data.BaseDataHash;
    class SysTaskSerialsP {
        protected _dataHash: BaseDataHash;
        constructor();
        getItem(id: string): ITaskSerial;
    }
    class TaskSerial extends BaseDataItem {
    }
    interface ITaskSerial {
        name: string;
        position: string;
        paskList: string;
        orderBy: string;
        viewType: string;
    }
    class TasksP {
        protected _dataHash: BaseDataHash;
        constructor();
        getItem(id: number): ITask;
        TitleTxt(id: number): string;
    }
    class Task extends BaseDataItem {
        private _taskGoals;
        readonly TitleTxt: string;
        readonly DescriptionTxt: string;
        readonly taskGoals: string[][];
        getParams(id: string): string[];
    }
    interface ITask {
        taskID: number;
        taskSerialID: string;
        nextTaskID: string;
        class: string;
        levelLimit: string;
        factionLimit: string;
        titleTxt: string;
        title: string;
        description: string;
        awards: any;
        canCancel: string;
        orderby: string;
        goalMode: string;
        condition: any;
        taskGoals: string[][];
        taskActive: number;
        getParams(id: any): string[];
    }
    class TaskGoalsP {
        protected _dataHash: BaseDataHash;
        constructor();
        getItem(id: number): ITaskGoal;
        description(id: string): string;
    }
    class TaskGoal extends BaseDataItem {
        readonly Description: string;
    }
    interface ITaskGoal {
        taskGoalID: string;
        mode: number;
        refer: string;
        description: string;
        displayOrder: string;
        dataReplaceMode: string;
        dataTrigger: string;
        isTarget: string;
        paramsDetail: string;
        viewMode: string;
    }
}
declare namespace zt.prepare {
    class PrepareItem {
        protected _complete: boolean;
        completeHandler: Laya.Handler;
        progressHandler: Laya.Handler;
        protected _resList: Array<any>;
        protected _weightPast: number;
        constructor();
        start(): void;
        protected complete(): void;
        getProgress(): number;
        protected init(): void;
        readonly weight: number;
        readonly resList: Array<any>;
        readonly cmdList: Array<any>;
    }
}
declare namespace zt.prepare.data {
    class PrepareRoleData extends PrepareItem {
        private static _loadList;
        private _counter;
        private _resTag;
        private _res;
        private _prepareRes;
        constructor();
        start(): void;
        private loadData(list);
        private check();
        private checkAll();
        private onResComplete();
        private onResProgress();
        protected complete(): void;
        static add(item: any[]): void;
        setRes(val: any[]): void;
    }
}
declare namespace zt {
    import SysTaskSerialsP = zt.data.SysTaskSerialsP;
    import TasksP = zt.data.TasksP;
    import TaskGoalsP = zt.data.TaskGoalsP;
    import RoleTaskP = zt.data.RoleTaskP;
    class Task {
        static readonly taskSerials: SysTaskSerialsP;
        static readonly tasks: TasksP;
        static readonly taskGoals: TaskGoalsP;
        static readonly roleTask: RoleTaskP;
        static readonly RoleDailyTaskP: zt.data.RoleDailyTaskP;
        static readonly RoleTaskLogP: zt.data.RoleTaskLogP;
        static readonly SysDailyTaskP: zt.data.SysDailyTaskP;
        static readonly roleSceneTaskPoolP: zt.data.RoleScenetaskPoolP;
        static readonly roleSceneTaskP: zt.data.RoleScenetaskP;
        static setup(): void;
        static addRoleSocket(): void;
        static GetDescriptionTest(taskID: number): string;
    }
}
declare namespace zt {
    class Tech {
        static readonly sysTechP: data.SysTechP;
        static readonly sysTechLevelP: data.SysTechLevelP;
        static readonly sysTechAwardP: data.SysTechAwardP;
        static readonly sysEffectP: data.SysEffectP;
        static readonly roleTechP: data.RoleTechP;
    }
}
declare namespace zt.data {
    import BaseDataHash = zt.data.BaseDataHash;
    class ElementAvatarP {
        protected _dataHash: BaseDataHash;
        private initItemHash();
    }
    class SysElementAvatarVo extends BaseDataItem {
        readonly ElementAvatarID: string;
        readonly Pic: string;
    }
}
declare namespace zt.data {
    import BaseDataHash = zt.data.BaseDataHash;
    class SceneP {
        protected _dataHash: BaseDataHash;
        constructor();
        private initItemHash();
        getPrivate(): SceneVo;
        getItem(id: number): SceneVo;
        update(d?: any): void;
    }
    class SceneVo extends BaseDataItem {
        readonly SceneID: number;
        readonly Name: string;
        readonly Xsize: number;
        readonly Ysize: number;
        readonly Type: string;
        readonly LockWeight: number;
        readonly FlightLockCondition: object;
        readonly Params: object;
        readonly mapW: number;
        readonly mapH: number;
    }
    class SceneType {
        static Private: string;
        static Public: string;
        static Story: string;
    }
}
declare namespace zt.data {
    import BaseDataHash = zt.data.BaseDataHash;
    class SysElementP {
        protected _dataHash: BaseDataHash;
        private _hash;
        private _classHash;
        constructor();
        getElement(elementID: number): SysElementVo;
        getElements(sceneID: number): SysElementVo[];
        getElementsByClass(sceneID: number, classType?: string): SysElementVo[];
    }
    class SysElementVo extends BaseDataItem {
        readonly ElementID: number;
        readonly Class: string;
        readonly Type: string;
        readonly X: number;
        readonly Y: number;
        readonly Name: string;
        readonly NameTxt: string;
        readonly ElementAvatarID: string;
        readonly SceneID: number;
        readonly FactionID: number;
        readonly LardForm: string;
        readonly Level: number;
        readonly Params: any;
        readonly PositionName: any;
        readonly Enabled: string;
        readonly EnterLevel: number;
        x: number;
        y: number;
    }
}
declare namespace zt.data {
    class RoleSceneAreaP {
        private _dataHash;
        constructor();
        getSceneAreaByID(sceneAreaID: number): RoleSceneAreaVo;
        start(): void;
        update(d?: any): void;
    }
    class RoleSceneAreaVo extends DataItem {
        readonly RoleAreaID: number;
        readonly RoleID: number;
        readonly SceneAreaID: number;
        readonly AwardIDList: string;
        readonly LockWeight: number;
        readonly AwardList: number[];
    }
}
declare namespace zt {
    import SceneP = zt.data.SceneP;
    import SysElementP = zt.data.SysElementP;
    import ExploringPointP = zt.data.ExploringPointP;
    import SysSceneAreaP = zt.data.SysSceneAreaP;
    import SysSceneGuideP = zt.data.SysSceneGuideP;
    import SysSceneAreaAwardP = zt.data.SysSceneAreaAwardP;
    import RoleSceneAreaP = zt.data.RoleSceneAreaP;
    import SysElementVo = zt.data.SysElementVo;
    import RoleSceneAreaVo = zt.data.RoleSceneAreaVo;
    import SysScneeAreaAwardVo = zt.data.SysSceneAreaAwardVo;
    class Universe {
        static readonly scenes: SceneP;
        static readonly sysFog: data.SysFogP;
        static readonly sysElements: SysElementP;
        static readonly exploringPoints: ExploringPointP;
        static readonly roleSceneP: data.RoleSceneP;
        static readonly roleElements: zt.data.RoleElementP;
        static readonly RoleSceneFogP: zt.data.RoleSceneFogP;
        static readonly HomeElement: zt.data.HomeElementVo;
        static readonly HomeElementP: zt.data.HomeElementP;
        static readonly elements: zt.data.ElementP;
        static readonly sysPaths: data.SysScenePathP;
        static readonly roleColonyP: data.RoleColonyP;
        static readonly roleDialyInstanceP: data.RoleDailyInstanceP;
        static readonly roleSceneAreaP: RoleSceneAreaP;
        static readonly sysDailyInstanceP: zt.data.SysDailyInstanceP;
        static readonly sysSceneAreaP: SysSceneAreaP;
        static readonly sysSceneAreaAwardP: SysSceneAreaAwardP;
        static readonly sysSceneGuideP: SysSceneGuideP;
        static setup(): void;
        static addRoleSocket(): void;
        static moveToElement(ElementID: number, params?: any): void;
        static exploringIsUnLock($elementID: number): boolean;
        static exploringIsUnLockByElement($sysElement: SysElementVo): boolean;
        static getExplorerName($explorID: string): string;
        static isSceneUnLock($sceneID: number): boolean;
        countNineScreenEIDList($x: number, $y: number, $sceneID: number): void;
        static getElementList(elementIDList: Array<number>, $sceneID: number): void;
        static getFogLockWeight($sceneID: number, $sceneArea: number): number;
        static getSceneAreaAward($AwardList: number[]): void;
        private static element_callBack(d);
        static giveUpColony: (ElementID: number) => void;
        static gatherColony: (ElementID: number) => void;
        static flight(toPlanet: SysElementVo): void;
        static crossflight(ElementID: number): void;
        static fleetFlight(toPlanet: SysElementVo, $fleet: zt.data.RoleFleetVo): void;
        static gather(toPlanet: SysElementVo): void;
        static getRoleSceneLockWeight(): void;
        static getRoleSceneAreaLockWeight($sceneID: number, $elementID: number): number;
        static isReceiveRoleSceneAward($sceneArea: number, $AwardID: number): boolean;
        static getSceneAreaAwardID($roleSceneArea: RoleSceneAreaVo, $sceneAreaAwardList: SysScneeAreaAwardVo[], $lockWeight: number): number[];
        static getSceneAreaAlreadyAchieve($roleSceneArea: RoleSceneAreaVo, $sceneAreaAwardList: SysScneeAreaAwardVo[], $lockWeight: number): boolean;
        static getIsFogUnlock(ElementID: number, sceneID: any): boolean;
        static isPrivateScene($scene: number): boolean;
        static getExploringPointUnlock(ExploringPointID: number): boolean;
        static getExploringPointUnlockBy(ElementID: number): boolean;
        static getUnLock($data: SysElementVo): boolean;
        static getEnterLevel($sceneID: number): number;
        static isCrossFlight: (event: data.EventVo) => boolean;
        static gatherHome(BuildingID: number, type: string, caller?: any, cb?: Function): boolean;
        static overStoreMaterial(type: string): boolean;
        private static onGatherHome(caller, cb, d?);
        static getElementIsCD($element: SysElementVo, $type: string): boolean;
    }
    const getPosition: (ElementID: number) => string;
    const isCrossFlight: (event: data.EventVo) => boolean;
    const getFlightTime: (start: IPoint, end: IPoint, speed?: number) => number;
    class SceneType {
        static Private: string;
        static Public: string;
        static Story: string;
    }
    class ElementClass {
        static Big: string;
        static Resource: string;
        static Passage: string;
        static Ruins: string;
        static ShipWreck: string;
    }
}
declare namespace zt {
    class Vip {
        static readonly SysVipGiftP: data.SysVipGiftP;
        static readonly SysVipLevelP: data.SysVipLevelP;
        static readonly SysVipPrivilegeP: data.SysVipPrivilegeP;
        static readonly RoleVipP: zt.data.RoleVipP;
        static functionValue(level: number, type: string): any;
        static functionMinLevel(type: string): number;
    }
}
declare namespace zt {
    class Battle {
        static readonly SysBattleP: data.SysBattleP;
        static readonly BattleP: data.BattleP;
        static readonly SysBattleEffectP: data.SysBattleEffectP;
        static readonly SysBattlePerformeP: data.SysBattlePerformeP;
        private static _controller;
        static init(): void;
    }
}
declare namespace zt.battleReport {
    class BattleReportMgr {
        static readonly SysBattleP: data.SysBattleP;
        static readonly BattleReportP: data.BattleReportP;
        static getBattleReportList(type: string, page: number, pageCount: number, cb?: Function): void;
        static delete(type: string, page: number, battleReportID: number, cb?: Function): void;
        static read(cb?: Function): void;
    }
}
declare namespace zt {
    import RoleCaptainVo = zt.data.RoleCaptainVo;
    import SysCaptainVo = zt.data.SysCaptainVo;
    import Handler = Laya.Handler;
    import SysCaptainTalentVo = zt.data.SysCaptainTalentVo;
    class Captain {
        static readonly sysCaptainP: data.SysCaptainP;
        static readonly sysCaptainStarP: data.SysCaptainStarP;
        static readonly sysCaptainGradeP: data.SysCaptainGradeP;
        static readonly sysCaptainTalentTreeP: data.SysCaptainTalentTreeP;
        static readonly sysCaptainTalentP: data.SysCaptainTalentP;
        static readonly sysCaptainLevelP: data.SysCaptainLevelP;
        static readonly sysEffectP: data.SysEffectP;
        static readonly roleCaptainP: data.RoleCaptainP;
        static readonly roleTalentP: data.RoleCaptainTalentP;
        static getCaptainListByType: (duty?: string) => RoleCaptainVo[];
        static getCaptainListByDutyAndStar($duty: string, $star: number): RoleCaptainVo[];
        static getCaptainInUseOrNot: (isUsed?: boolean) => RoleCaptainVo[];
        static getCaptainProperityByCaptain(sysCaptain: SysCaptainVo, captainVo: any, isPower?: boolean, add?: number): Object;
        static getCaptainPower($properity: any): number;
        static getResolveItems($roleCaptain: RoleCaptainVo): any;
        static getCaptainExp($roleCaptain: RoleCaptainVo): number;
        static getCaptainTalentSkill($duty: string, $star: number): SysCaptainTalentVo[];
        static getCaptainTotalBookNum(captainVo: RoleCaptainVo): number;
        static gradeUp(CaptainID: number, callBack?: Handler): void;
        static captainSynth(CaptainID: number, callBack?: Handler): void;
        static captainActiveTalent(CaptainID: number, TreeTalentID: number, callBack?: Handler): void;
        static captainResetTalent(CaptainID: number, callBack?: Handler): void;
        static captainRetired(CaptainID: number, callBack?: Handler): void;
        static captainUpToFleet(CaptainID: number, RoleFleetID: number, callBack?: Handler): void;
        static captainDownFromFleet(CaptainID: number, callBack?: Handler): void;
        static captainInlay(CaptainID: number, pos: number, ItemID: number, callBack?: Handler): void;
        static captainUnload(CaptainID: number, pos: number, ItemID: number, callBack?: Handler): void;
        static captainUseTalentBook(CaptainID: number, ItemID: number, callBack?: Handler): void;
        static CaptainLevel(CaptainID: number, ItemID: number, Nums: number, callBack?: any): void;
        static upSkillLevel(RoleSkill: zt.data.RoleSkillVo, SysSkill: zt.data.SysSkillVo, captainVo: RoleCaptainVo): void;
        static recruitCaptain($type: string, $num: number, $callBack?: Handler): void;
        static recruitBack($d: object): void;
        static errorBack($d: object): void;
        static callBack(d: any): void;
    }
}
declare namespace zt {
    enum BattleType {
        ExploringPoint = "ExploringPoint",
        Colony = "Colony",
        LootPrivate = "LootPrivate",
        SnatchPrivate = "SnatchPrivate",
        LootPublic = "LootPublic",
        SnatchPublic = "SnatchPublic",
        LootPublicLair = "LootPublicLair",
        DailyInstance = "DailyInstance",
        Story = "Story",
        NormalInstance = "NormalInstance",
        Mine = "Mine",
    }
    enum BattleState {
        Prepare = "Prepare",
        Running = "Running",
        Finish = "Finish",
        Error = "Error",
        Timeout = "Timeout",
        TestRunning = "TestRunning",
    }
    enum BattleMode {
        NORMAL = 0,
        REPLAY = 1,
        TEST = 2,
    }
}
declare namespace zt {
    enum coloniaType {
        Crystal = 0,
        Money = 1,
        SkillPoint = 2,
        Metal = 3,
        Dili = 4,
        Latiuum = 4,
    }
    enum cononiaStateColor {
        Normal = "#5ce338",
        BeRobbed = "#e35838",
        Lotted = "#e35838",
        Marauding = "#e35838",
        Robbery = "#e35838",
    }
    enum cononiaStateType {
        Normal = "Normal",
        BeRobbed = "BeRobbed",
        Lotted = "Lotted",
        Marauding = "Marauding",
        Robbery = "Robbery",
    }
    enum cononiaStateTxt {
        Normal = "C_Planet_NormalOutput",
        BeRobbed = "C_Planet_BeRobbed",
        Lotted = "C_Planet_Looted",
        Marauding = "C_Planet_MaraudingProtection",
        Robbery = "C_Planet_RobberyProtection",
    }
    enum cononiaStateSelect {
        Normal = 0,
        BeRobbed = 0,
        Lotted = 0,
        Marauding = 1,
        Robbery = 1,
    }
}
declare namespace zt {
    enum hpType {
        low = 2,
        mid = 1,
        high = 0,
        lowValue = 30,
        midValue = 61,
        highValue = 100,
    }
    const getHpStatus: (percent_hp: number) => number;
}
declare namespace zt {
    const SHIP_PART_MAX = 4;
    const SHIP_PART_GRADE_MAX = 5;
    const SHIP_STAR_MAX = 5;
}
declare namespace zt {
    import RoleBuildingP = zt.data.RoleBuildingP;
    import SysBuildingP = zt.data.SysBuildingP;
    import SysBuildingLevelP = zt.data.SysBuildingLevelP;
    class Build {
        static readonly roleBuildP: RoleBuildingP;
        static readonly sysBuildP: SysBuildingP;
        static readonly sysBuildLvP: SysBuildingLevelP;
        private static _roleBuildP;
        private static _sysBuildP;
        private static _sysBuildLvP;
        static getBuildEffects(type: string): any;
        static getEffectsKeyList(param: any): string[];
        static getTotalEnergy(lv: number): number;
        static getOccupyEnergy(): number;
        static getSecondGain(type: string, buildLv: number, append?: number): number;
        static getHourGain(type: string, buildLv: number): number;
        static getFactoryStore(type: string, buildLv: number, append?: number): number;
        static showGatherIcon(type: string): number;
        static showGather(type: string): number;
        static getStorageStore(buildLv: number, additional?: number): number[];
        private static getBuildLv(buildId);
        private static getEffectsKeyFunc(param, keyList);
    }
    enum BuildingIdEnum {
        Alchemy = 1,
        MetalFactory = 2,
        Storage = 3,
        CrystalFactory = 4,
        ShipDebrisFactory = 5,
        DiliFactory = 6,
        EquipResearch = 7,
        SpaceEnergyFactory = 8,
        EnergyStation = 9,
        Shipyard = 10,
        Starport = 11,
        DefenseCenter = 12,
        CommunicationMatrix = 13,
        ResearchLab = 14,
        TradeLine = 15,
    }
}
declare namespace zt {
    class Coin {
        static LATIUUM: string;
        static readonly latiuumGain: number;
        static readonly latiuumTime: number;
        static readonly latiuumStore: number;
    }
}
declare namespace zt {
    import SysCounterP = zt.data.SysCounterP;
    import RoleCounterP = zt.data.RoleCounterP;
    class Counter {
        static ALCHEMY: string;
        static DAILYINSTANCE: string[];
        static DONATE: string[];
        static JuniorCaptain: string;
        static MiddleCaptain: string;
        static HighCaptain: string;
        static StoryProgressAwards: string;
        private static _sysCounterP;
        private static _roleCounterP;
        static readonly sysCounterP: SysCounterP;
        static readonly roleCounterP: RoleCounterP;
        static getModeValue(type: string): number;
        static getCounter(type: string): void;
        private static extraAddValue(type, valueType, obj);
        private static extraBuildAdd(buildId, type, valueType);
    }
}
declare namespace zt {
    import SysEquipP = zt.data.SysEquipP;
    import SysEquipGrooveP = zt.data.SysEquipGrooveP;
    import SysEquipGrooveVo = zt.data.SysEquipGrooveVo;
    import SysEquipGrooveGradeP = zt.data.SysEquipGrooveGradeP;
    import SysEquipGrooveLevelP = zt.data.SysEquipGrooveLevelP;
    import RoleEquipP = zt.data.RoleEquipP;
    import RoleEquipGrooveP = zt.data.RoleEquipGrooveP;
    import Handler = Laya.Handler;
    class Equip {
        private static _sysEquipP;
        private static _sysEquipGroove;
        private static _sysEquipGrooveGrade;
        private static _sysEquipGrooveLevel;
        private static _roleEquipP;
        private static _roleEquipGroove;
        static readonly sysEquipP: SysEquipP;
        static readonly sysEquipGrooveP: SysEquipGrooveP;
        static readonly sysEquipGrooveGradeP: SysEquipGrooveGradeP;
        static readonly sysEquipGrooveLevelP: SysEquipGrooveLevelP;
        private static _sortGrooves;
        static readonly equipGrooves: Array<SysEquipGrooveVo>;
        static readonly roleEquipP: RoleEquipP;
        static readonly roleEquipGrooveP: RoleEquipGrooveP;
        static getRoleFleetIdList(): number[];
        static getRoleFleetVo(roleEquipId: number): data.RoleFleetVo;
        static getScore(roleEquipId: number): number;
        static getIdentifyCost(): any[];
        static getOpenHoleCost(): any;
        static inlay(itemId: number, roleEquipId: number, pos: string): boolean;
        static unload(itemId: number, roleEquipId: number, pos: string): void;
        static identify(roleEquipId: number, callback?: Handler): boolean;
        static openHole(roleEquipId: number, pos: string): boolean;
        static upEquip(roleEquipId: number, roleEquipGrooveId: number): void;
        static downEquip(roleEquipGrooveId: number): void;
        static upLevelGroove(roleEquipGrooveId: any): void;
        static upGradeGroove(roleEquipGrooveId: any): void;
    }
}
declare namespace zt {
    import FuncOpenP = zt.data.SysFuncOpenP;
    class FuncOpen {
        private static _inst;
        static readonly inst: FuncOpen;
        private _funcOpenP;
        private _passList;
        private _listenList;
        constructor();
        private init();
        private listen();
        private eventdispatcher(type);
        isPass(module: string): boolean;
        checkRole(roleLevel: number): boolean;
        checkBuild(buildMes: object): boolean;
        checkTech(techMes: object): boolean;
        checkFleetGroup($condition: object): boolean;
        checkTask(taskMes: object): boolean;
        readonly funcOpenP: FuncOpenP;
    }
}
declare namespace zt {
    import SysRandPropertyP = data.SysRandPropertyP;
    class Random {
        private static _sysRandPropertyP;
        static readonly sysRandPropertyP: SysRandPropertyP;
    }
}
declare namespace zt {
    import RoleShipP = zt.data.RoleShipP;
    import SysShipP = zt.data.SysShipP;
    import RoleShipVo = zt.data.RoleShipVo;
    import SysShipVo = zt.data.SysShipVo;
    import SysShipLevelP = zt.data.SysShipLevelP;
    import SysShipResearchP = zt.data.SysShipResearchP;
    import SysShipStarP = zt.data.SysShipStarP;
    import SysPropertyP = zt.data.SysPropertyP;
    import RolePartP = zt.data.RolePartP;
    import SysShipGradeP = zt.data.SysShipGradeP;
    import SysPartP = zt.data.SysPartP;
    import SysPartGradeP = zt.data.SysPartGradeP;
    import SysPartLevelP = zt.data.SysPartLevelP;
    class Ship {
        static init(): void;
        private static _roleShipP;
        private static _sysShipP;
        static readonly list: RoleShipVo[];
        static getSysShip(shipID: number): SysShipVo;
        static readonly sysShipLevelP: SysShipLevelP;
        static readonly roleShipP: RoleShipP;
        static readonly sysShipP: SysShipP;
        static getResearch(ShipID: number): boolean;
        static readonly researchList: data.RoleShipVo[];
        static readonly SysResearchP: SysShipResearchP;
        static readonly SysShipStarP: SysShipStarP;
        static readonly SysPropertyP: SysPropertyP;
        static readonly SysShipGradeP: SysShipGradeP;
        static readonly SysPartP: SysPartP;
        static readonly SysPartGradeP: SysPartGradeP;
        static readonly SysPartLevelP: SysPartLevelP;
        static readonly RolePartP: RolePartP;
        static sPic(size: any, avatarID: any, isL?: boolean): string;
        static fPic(size: any, avatarID: any, isL?: boolean): string;
    }
}
declare namespace zt.data {
    class Condition {
        private _build;
        private _roleLevel;
        constructor(data: any);
        private parseBuild(builds);
        readonly roleLevel: number;
        readonly build: BuildCondition[];
    }
    interface BuildCondition {
        ID: number;
        Level: number;
    }
}
declare namespace zt.data {
    class GameProxy {
        static update(d?: object): void;
    }
}
declare namespace zt.data {
    class Properties {
        constructor(data: any);
    }
}
declare namespace zt.data {
    class PropertyListHash {
        private _hash;
        constructor(data: any);
        getData(key: string): PropertyList;
    }
    interface PropertyList {
        Attack?: number;
        MaxHp?: number;
        Armor?: number;
        Shield?: number;
    }
}
declare namespace zt.data {
    class Stuff {
        private _items;
        private _res;
        private _coin;
        private _role;
        constructor(data: any);
        private parse(data);
        private parseItem(items);
        private parseRes(data);
        private parseCoin(data);
        private parseRole(data);
        readonly items: ItemStuff[];
        readonly res: any;
        readonly coin: any;
        readonly role: any;
    }
    interface SimpleItemStuff {
        ID: number;
        Nums: number;
    }
    interface ItemStuff extends SimpleItemStuff {
        ItemData: zt.data.SysItemVo;
    }
    interface ResStuff {
        Metal?: number;
        Dili?: number;
        Crystal?: number;
        SkillPoint?: number;
        Latiuum?: number;
    }
    interface CoinStuff {
        Points?: number;
        Plot?: number;
    }
    interface RoleStuff {
        Exp?: number;
    }
    interface CostItem {
        isEnough: boolean;
        needNum?: number;
        lackNum?: number;
        itemID?: number;
    }
    interface CostRes {
        isEnough: boolean;
        type?: string;
        lackNum?: number;
        needNum?: number;
    }
}
declare namespace zt.dialog {
    class ConfirmView {
        private _ui;
        private _btn_close;
        private _btn_cancel;
        private _btn_confirm;
        private _onCallBack;
        private _controller;
        private _isStrictConfirm;
        private _txt_content;
        private _closeHandler;
        private static _confirmView;
        constructor();
        static readonly ins: ConfirmView;
        show(contnet: string, callBack: Function, isStrictConfirm?: boolean): void;
        private rejustCenter();
        private init();
        private onResize();
        private addEvent();
        private removeEvent();
        private onClickMask();
        private colseView();
        private onCallBack(event);
    }
}
declare namespace zt {
    import Handler = laya.utils.Handler;
    class Dialog {
        static show(content: string, handler: Handler, data?: any, isStrictComfirm?: boolean, closeHandler?: Handler): void;
        static showDialogView(dialogID: number, handler: Handler): void;
        static showUseOrReloveView($item: any, handler: Handler): dialog.ResolveView;
    }
}
declare namespace zt.dialog {
    import Handler = laya.utils.Handler;
    class DialogView {
        private _ui;
        private _callBack;
        private _data;
        private _view;
        private TIMENUM;
        private static _ins;
        private _currentDialog;
        private _dialogList;
        private _cacheDialogs;
        private _cacheHandler;
        constructor();
        static readonly ins: DialogView;
        dialog(dialogGroupID: number, callBack: Handler): void;
        private initDialog();
        private initEvent();
        private startDialog();
        private checkDialog();
        private closeView();
    }
}
declare namespace zt.dialog {
    import GComponent = fairygui.GComponent;
    class DialogViewItem extends Sprite {
        private _ui;
        private _leftMc;
        private _rightMc;
        constructor();
        init(): void;
        show(pos: number): void;
        readonly leftMc: GComponent;
        readonly rightMc: GComponent;
        dispose(): void;
    }
}
declare namespace zt.dialog {
    class ResolveView {
        private _ui;
        private _tips;
        private _items;
        private _callBack;
        private _isUseItem;
        constructor($data: object, yes: Function);
        private init();
        private renderItem(index, obj);
        private onClickMask();
        private CloseView();
        private CallBack();
    }
}
declare namespace zt.effects {
    class alchemyEffect {
        private OUTPUTTING1_FRAME;
        private OUTPUTTING2_FRAME;
        private _ani;
        private _freeAni;
        private _aniType;
        constructor();
        playFreeAni(x: number, y: number, parentGcom: Laya.Node): void;
        playGatherAni(x: number, y: number, parentGcom: Laya.Node, callback: Laya.Handler): void;
        playOutputtingAni(x: number, y: number, parentGcom: Laya.Node): void;
        playStarAlchemyAni(x: number, y: number, parentGcom: Laya.Node, callback: Laya.Handler): void;
        private outputtingStep2();
        private playOver(callback);
        private setParent(x, y, parentGcom, child);
        private initAni();
        private setAniType(type);
        private aniUrls(aniName, length);
        clear(): void;
    }
}
declare namespace zt {
    class BaseEffect extends Laya.Animation {
        constructor(name: string, parent: Laya.Sprite, offsetX?: number, offsexY?: number, url?: string);
    }
}
declare namespace zt.effects {
    import Handler = Laya.Handler;
    class equipEffect {
        private _singleAniList;
        private _isLoaded;
        private _urlList;
        constructor();
        playopenHoleAni(parentMc: fairygui.GComponent, x: number, y: number): void;
        playInlayAni(parentMc: fairygui.GComponent, x: number, y: number): void;
        playPropertyAni(parentMc: fairygui.GComponent, x: number, y: number): void;
        playIdentifyAni(parentMc: fairygui.GComponent, x: number, y: number, callback: Handler): void;
        private multiPlayFunc(parentMc, x, y, aniName, callback?);
        private singlePlayFunc(parentMc, x, y, aniName, callback?);
        private getSingleAni(aniName);
        private loadRes(callback?);
        private loaded(callback);
        clear(): void;
    }
}
declare namespace zt.effects {
    class factory {
        private static _instance;
        static getInstance(name: string, parentGcom?: any): any;
        static playEffect(name: string, x?: number, y?: number, parentGcom?: any): void;
        static stopEffect(name: string): void;
    }
}
declare namespace zt.effects {
    class FormFleet1 extends Laya.Animation {
        constructor(parentGcom?: any);
        playEffect(x: number, y: number, parentGcom?: any): void;
        stopEffect(): void;
    }
}
declare namespace zt.effects {
    class FormFleet2 extends Laya.Animation {
        constructor(parentGcom?: any);
        playEffect(x: number, y: number, parentGcom?: any): void;
        stopEffect(): void;
    }
}
declare namespace zt.effects {
    class gather {
        private FULL_STORE_FRAME;
        private FULL_STORE_FRAME1;
        private GAHTER_FRAME;
        private _fullAni;
        private _fullAni1;
        private _gatherAni;
        private _isPlayFull;
        private _isPlayGather;
        constructor();
        playFullStore(parentGcom: Laya.Node, x?: number, y?: number): void;
        playGather(parentGcom: Laya.Node, x?: number, y?: number): void;
        stopFullStore(): void;
        private aniUrls(aniName, length);
        private initFullAni();
        private initGatherAni();
        private gatherAniPlayOver();
        dispose(): void;
    }
}
declare namespace zt {
    class EnumDbName {
        static Server: string;
        static Item: string;
        static Role: string;
        static User: string;
        static RoleFleet: string;
        static Material: string;
        static Event: string;
        static RoleElement: string;
        static RoleTask: string;
        static RoleCoin: string;
        static RoleItem: string;
        static RoleBuilding: string;
        static RoleShip: string;
        static ChatMsg: string;
        static RoleExtend: string;
        static RoleCounter: string;
        static RoleAction: string;
        static RoleEquip: string;
        static RoleEquipGroove: string;
        static RoleSkill: string;
        static RoleColony: string;
        static RoleCol: string;
        static RoleCDPremium: string;
        static RoleLair: string;
        static RoleDailyInstance: string;
        static RoleStory: string;
        static RoleCaptain: string;
        static RoleCaptainTalent: string;
        static RoleNormalInstance: string;
        static RoleNormalInstanceInfo: string;
        static RoleTech: string;
        static RoleDailyTask: string;
        static RoleScene: string;
        static RoleSceneArea: string;
        static RoleCommodity: string;
        static RoleCommodityClass: string;
        static RoleVip: string;
        static League: string;
        static RoleLeague: string;
        static RoleLeagueRequest: string;
        static RoleLeagueSignLog: string;
        static RoleLeagueAssetLog: string;
        static LeagueAssetLog: string;
        static RoleFleetGroup: string;
        static RoleHonor: string;
        static RoleVirtualFleet: string;
        static RoleVirtualFleetCopy: string;
        static RoleScenetaskPool: string;
        static RoleSceneTask: string;
        static SysRoleLevel: string;
        static SysItem: string;
        static ElementAvatar: string;
        static Element: string;
        static Scene: string;
        static SysEvent: string;
        static SysFleet: string;
        static SysFleetGrade: string;
        static SysFleetLevel: string;
        static SysFleetRebuild: string;
        static SysFleetRebuildReward: string;
        static SysFleetSet: string;
        static SysFleetStar: string;
        static SysFleetRebuildProperty: string;
        static SysBuilding: string;
        static SysBuildingLevel: string;
        static SysBuildingPos: string;
        static SysShip: string;
        static SysShipGrade: string;
        static SysShipLevel: string;
        static SysShipResearch: string;
        static SysShipStar: string;
        static SysProperty: string;
        static SysFuncOpen: string;
        static SysCounter: string;
        static SysEquip: string;
        static SysEquipExtend: string;
        static SysEquipGroove: string;
        static SysEquipGrooveLevel: string;
        static SysEquipGrooveGrade: string;
        static SysRandProperty: string;
        static SysRandShipEffect: string;
        static SysSkill: string;
        static SysSkillLevel: string;
        static SysCDPremium: string;
        static SysLair: string;
        static SysLairGroup: string;
        static SysDailyInstance: string;
        static SysCaptain: string;
        static SysCaptainGrade: string;
        static SysCaptainLevel: string;
        static SysCaptainStar: string;
        static SysCaptainTalentTree: string;
        static SysCaptainTalent: string;
        static sysEffect: string;
        static SysDialogGroup: string;
        static SysStoryParagraph: string;
        static SysStoryChapter: string;
        static SysDialog: string;
        static SysMob: string;
        static SysMobFleet: string;
        static SysNpc: string;
        static SysTech: string;
        static SysTechLevel: string;
        static SysTechAward: string;
        static SysNormalInstanceChapter: string;
        static SysNormalInstance: string;
        static SysRandDrop: string;
        static SysDailyTask: string;
        static SysSceneArea: string;
        static SysSceneGuide: string;
        static SysSceneAreaAward: string;
        static SysSceneVo: string;
        static SysCommodity: string;
        static SysCommodityClass: string;
        static SysVipGift: string;
        static SysVipLevel: string;
        static SysVipPrivilege: string;
        static SysLeagueLevel: string;
        static SysLeagueFuncPower: string;
        static SysLeagueDutyPower: string;
        static SysLeagueSignValue: string;
        static SysLeagueDonate: string;
        static SysExploitOrder: string;
        static SysHonorAwards: string;
        static SysHonor: string;
        static SysChatTemplate: string;
        static SysBattleEffect: string;
        static SysBattlePerforme: string;
        static SysGuide: string;
        static SysEffect: string;
        static SysRank: string;
        static SysTagCode: string;
        static SysTaskSerials: string;
        static Tasks: string;
        static TaskGoals: string;
    }
}
declare namespace zt {
    class EnumEventName {
        static FLGIHT: string;
        static BUILD_UP: string;
        static TECH_UP: string;
        static CAPTAIN_PROPERITY_CHANGE: string;
        static CAPTAIN_RECRUIT: string;
        static CAPTAIN_RECRUIT_ERROR: string;
        static CHANGE_SCENE_COMPLETE: string;
        static MOVE_MAP_SCENE: string;
        static SMALLMAP_SELECT_FLEET: string;
        static SHOW_ACTION_BUTTON: string;
        static HIDE_ACTION_BUTTON: string;
        static UNLOCK_ELEMENT: string;
        static GATHER_RESOURCE: string;
        static SHOW_ELEMENT: string;
        static HIDE_ELEMENT: string;
        static UN_LOCK_EFFECt: string;
        static SELECT_FORMATION_GROUP: string;
        static FLEET_EQUIP_UPDATAE: string;
        static ARMY_UPDATE: string;
        static REQUEST_GUIDE: string;
        static TASK_ADD: string;
        static TASK_COMPLETE: string;
        static TASK_UPDATE: string;
        static MINE_START: string;
        static MINE_END: string;
        static VIRTUAL_FLEET_CHANGE: string;
        static VIRTUAL_FLEET_UPDATE_DATA: string;
        static STORY_ACTION: string;
        static NEXT_PRAGRAPH: string;
        static FIGHT_END: string;
        static ADD_ITEM: string;
        static COLONY_ELEMENT: string;
        static CD_TIME_OVER: string;
        static EXPLORER_ELEMENT: string;
        static OPEN_LINK_BUILD: string;
        static TAG_CODE_DATA: string;
        static TASK_TIGGER: string;
        static LEVEL_UP: string;
        static PLAY_COMPLETE: string;
    }
}
declare namespace zt {
    enum EnumGameCmd {
        ROLE_VO = 0,
        FLEET_VO = 1,
        FLEET_CURRENT = 2,
        EVENT_VO = 3,
        EVENT_CREATE = 4,
        EVENT_DELETE = 5,
        EVENT_COMPLETE = 6,
        EVENT_ACC = 7,
        EVENT_PAUSE = 8,
        ROLE_FLEET_VO = 9,
        ROLE_COIN_VO = 10,
        MATERIAL_VO = 11,
        ROLE_ITEM_VO = 12,
        ROLE_SHIP = 13,
        ROLE_BUILD_VO = 14,
        HOME_ELEMENT_VO = 15,
        CHAT_MSG_VO = 16,
        ROLE_EXTEND = 17,
        ROLE_COUNTER = 18,
        ROLE_EQUIP = 19,
        ROLE_EQUIP_GROOVE = 20,
        ROLE_SKILL_VO = 21,
        ROLE_COLONY_VO = 22,
        ROLE_ELEMENT_VO = 23,
        ELEMENT_VO = 24,
        ROLE_CD_VO = 25,
        ROLE_DAILYINSTANCE_BUFF = 26,
        ROLE_CAPTAIN_VO = 27,
        ROLE_CAPTAIN_Talent = 28,
        ROLE_NORMALINSTANCE_VO = 29,
        ROLE_NORMALINSTANCE_INFO = 30,
        ROLE_TECH = 31,
        ROLE_DAILYTASK_VO = 32,
        ROLE_ACTION = 33,
        ROLE_SCENE_AREA = 34,
        ROLE_COMMODITY = 35,
        ROLE_COMMODITY_CLASS = 36,
        ROLE_SCENE_VO = 37,
        ROLE_VIP_VO = 38,
        LEAGUE_VO = 39,
        ROLE_LEAGUE_VO = 40,
        ROLE_LEAGUE_REQUEST_VO = 41,
        ROLE_FLEET_GROUP_VO = 42,
        ROLE_HONOR_VO = 43,
        ROLE_VIRTUAL_FLEET_VO = 44,
        ROLE_VIRTUAL_FLEET_COPY_VO = 45,
        ROLE_STORY_VO = 46,
        ROLE_SCENE_TASK_POOL_VO = 47,
        ROLE_SCENE_TASK_VO = 48,
    }
}
declare namespace zt {
    enum EnumVirtualModule {
        ColonyDefense = "ColonyDefense",
    }
}
declare namespace zt {
    class ErrorHandler {
        constructor();
        init(): void;
        private onseq(code);
        private static _instance;
        static readonly instance: ErrorHandler;
    }
}
declare namespace zt.fight {
    import AppBase = zt.app.AppBase;
    class FightApp extends AppBase {
        constructor();
        dispose(): void;
    }
}
declare namespace zt {
    import RoleFleetVo = zt.data.RoleFleetVo;
    import SysFleetVo = zt.data.SysFleetVo;
    import SysFleetGradeVo = zt.data.SysFleetGradeVo;
    import SysFleetStarVo = zt.data.SysFleetStarVo;
    class FleetAttr {
        private static _ins;
        static readonly ins: FleetAttr;
        init(): void;
        private updateTech($data);
        getPropByType(fleet: data.RoleFleetVo, type: string): number;
        private update(data);
        private static getCaptainValue($roleFleet);
        getFleetPropByType(fleet: RoleFleetVo, captainValue: number, type: string, fuluma: string, sysFleet: SysFleetVo, sysFleetGrade: SysFleetGradeVo, sysFleetStar: SysFleetStarVo): number;
        getFleetRereByType(fleet: RoleFleetVo, captainValue: number, type: string, fuluma: string, sysFleet: SysFleetVo, sysFleetGrade: SysFleetGradeVo, sysFleetStar: SysFleetStarVo): number;
        getData(fleet: data.RoleFleetVo): {
            Fighting: any;
            MaxHp: number;
            Attack: number;
            Armor: number;
            Shield: number;
            Hit: number;
            Dodge: number;
            Crit: number;
            CritRes: number;
            Speed: number;
            CritDamageAdd: number;
            CritDamageDec: number;
            Strength: number;
            Tenacity: number;
            MaxEnergy: number;
            EnergyRestore: number;
            Energy: number;
            BattleCabin: number;
            ShipCabin: number;
        };
    }
    const getEffect: (prop: string) => number;
    interface IFleet {
        FleetID?: number;
        RoleFleetID?: number;
    }
}
declare namespace zt {
    const getAttackFighting: (val: any) => any;
    const getArmorFighting: (val: any) => any;
    const getMaxHpFighting: (val: any) => any;
    const getShieldFighting: (val: any) => any;
    const getHitFighting: (val: any) => any;
    const getDodgeFighting: (val: any) => any;
    const getCritFighting: (val: any) => any;
    const getCritResFighting: (val: any) => any;
    const getStrengthFighting: (val: any) => any;
    const getTenacityFighting: (val: any) => any;
    const getCritDamageAddFighting: (val: any) => any;
    const getCritDamageDecFighting: (val: any) => any;
}
declare namespace zt {
    const getFleetFight: (MaxHp: any, Attack: any, Armor: any, Shield: any, Hit: any, Dodge: any, Crit: any, CritRes: any, Speed: any) => any;
}
declare namespace zt {
    const getShipFight: (ship: data.RoleShipVo) => any;
    const getShipFightBy: (ship: data.RoleShipVo, level?: number) => any;
}
declare namespace zt.guide {
    import SysGuideVo = zt.data.SysGuideVo;
    import RoleTask = zt.data.RoleTask;
    import Point = Laya.Point;
    class Guide {
        private static _ins;
        private _isShow;
        private _currentGuideList;
        private _currentGuideVO;
        private _currentGuide;
        private _guideObject;
        private _isGuideLoad;
        private _arrow;
        private _circle;
        private _container;
        private _target;
        private _targetID;
        private _currentRoleTask;
        private static W;
        private static H;
        constructor();
        private addEvent();
        private onAppClose(moduleName);
        onUpdateTask($task: RoleTask): void;
        onCompleteTask($task: RoleTask): void;
        private onAddTask($task);
        private updateTaskGuide($taskID);
        private dialogComplete();
        private updateGuide();
        init(): void;
        private onResLoad();
        private compare($a, $b);
        private filterData(sysGuideVO, index, $arr);
        private filterFunc(sysGuideVO, index, $arr);
        setFilter(): void;
        drawGuide($target: GuideNode): void;
        private onClickLink(e);
        private onClickGuide();
        private getTopContainer($target);
        private getParent($target);
        private checkTargetParentIs(target, $class);
        getTargetPoint($target: GuideNode): Point;
        private reAdjust($target);
        private hideGuide();
        getGuideUI($guide: SysGuideVo, $isGuide?: boolean): GuideNode;
        static readonly ins: Guide;
        readonly isShow: boolean;
        private readonly res;
        private readonly sysGuideP;
    }
    class GuideType {
        static task: string;
    }
}
declare namespace zt {
    class TagCode {
        private _isInit;
        private _hash;
        private _expressHash;
        private _param;
        private static _ins;
        constructor();
        static readonly ins: TagCode;
        init(): void;
        parseData(data: any): void;
        private setCode(obj);
        private setExpress(obj);
        convert($str: string, $param?: any, isBack?: boolean): string;
    }
}
declare namespace zt {
    class TagLink {
        private _linkHash;
        private static _ins;
        constructor();
        static readonly ins: TagLink;
        doLink(content: any): void;
        private openBuild($build);
        private openElement($elementID);
    }
}
declare namespace zt {
    class ItemNet {
        private static _roleItemP;
        static use(ItemID: number, Nums: number, Params: any, cb?: Function): void;
        static destory(ItemID: number, Nums: number, cb?: Function): void;
        static cancelNew(itemIdList: number[]): void;
        private static readonly roleItemP;
    }
}
declare namespace zt.loading {
    class LoadingView extends Laya.Sprite {
        constructor();
        show(): void;
        dispose(): void;
    }
}
declare namespace zt.prepare {
    class Prepare {
        private _romoteDataPrepare;
        private _loading;
        private _items;
        private _started;
        private _total;
        constructor();
        init(): void;
        private addSocket();
        private addCreateRole();
        private initPrepare();
        private addResPrepare();
        private addItem(item);
        private addToHead(item);
        private start();
        private onPrepareItemComplete(item);
        private onchat(data);
        private updateProgress();
        private onPrepareItemProgress(item, progress);
        private complete();
        private showLoading();
        private getProgress();
        private setTotal();
        private dispose();
    }
}
declare namespace zt.prepare {
    class PrepareDebug extends PrepareItem {
        constructor();
        start(): void;
        private addbtn();
    }
}
declare namespace zt.prepare {
    class PrepareModuleData extends PrepareItem {
        constructor();
        start(): void;
    }
}
declare namespace zt.prepare {
    class PrepareRemoteData extends PrepareItem {
        private _data;
        private _cmdList;
        constructor();
        addCmds(cmds: Array<any>): void;
        start(): void;
    }
}
declare namespace zt {
    const getShipArmor: (ship: data.RoleShipVo) => number;
    const getShipArmorBy: (ship: data.RoleShipVo, lv: number) => number;
}
declare namespace zt {
    const getShipAttack: (ship: data.RoleShipVo) => number;
    const getShipAttackBy: (ship: data.RoleShipVo, lv: any) => number;
}
declare namespace zt {
    const getShipCrit: (ship: data.RoleShipVo) => number;
}
declare namespace zt {
    const getShipCritDamageAdd: (ship: data.RoleShipVo) => number;
}
declare namespace zt {
    const getShipCritDamageDec: (ship: data.RoleShipVo) => number;
}
declare namespace zt {
    const getShipCritRes: (ship: data.RoleShipVo) => number;
}
declare namespace zt {
    const getShipDodge: (ship: data.RoleShipVo) => number;
}
declare namespace zt {
    const getShipHit: (ship: data.RoleShipVo) => number;
}
declare namespace zt {
    const getShipMaxHp: (ship: data.RoleShipVo) => number;
    const getShipMaxHpBy: (ship: data.RoleShipVo, lv: any) => number;
}
declare namespace zt {
    const getShipShield: (ship: data.RoleShipVo) => number;
    const getShipShieldBy: (ship: data.RoleShipVo, lv: any) => number;
}
declare namespace zt {
    const getShipStrength: (ship: data.RoleShipVo) => number;
}
declare namespace zt {
    const getShipTenacity: (ship: data.RoleShipVo) => number;
}
declare namespace zt {
    class ShipAttr {
        static init(): void;
        static onPartUpdate(part: data.RolePartVo): void;
        static update(ship: data.RoleShipVo): void;
        static getData(ship: data.RoleShipVo): {
            MaxHp: number;
            Attack: number;
            Armor: number;
            Shield: number;
            Hit: number;
            Dodge: number;
            Crit: number;
            CritRes: number;
            CritDamageAdd: number;
            CritDamageDec: number;
            Strength: number;
            Tenacity: number;
            Fighting: any;
        };
    }
}
declare namespace zt {
    class TaskGoalChecker {
        private static _cbs;
        static check(RoleTaskID: number, TaskGoalID: number): boolean;
        static checkBuildingLevel($goal: zt.data.ITask): boolean;
        static checkExploringPoint($goal: zt.data.ITask): boolean;
        static checkFleetGrooveLevel($goal: zt.data.ITask): boolean;
        static checkFleetNum($goal: zt.data.ITask): boolean;
        static checkShipLevelUp($goal: zt.data.ITask): boolean;
        static checkFleetStarCount($goal: zt.data.ITask): boolean;
        static checkFormation($goal: zt.data.ITask): boolean;
        static checkEquipNum($goal: zt.data.ITask): boolean;
        static checkFleetCaptainNum($goal: zt.data.ITask): boolean;
        static checkTechTotalLevel($goal: zt.data.ITask): boolean;
        static checkFleetPosition($goal: zt.data.ITask): boolean;
        static checkPositionClient($goal: zt.data.ITask): boolean;
        static checkStoryChapterPass($goal: zt.data.ITask): boolean;
        static checkFleetLevelUp($goal: zt.data.ITask): boolean;
        static checkShipNum($goal: zt.data.ITask): boolean;
        static checkShipLevel($goal: zt.data.ITask): boolean;
        static init(): void;
        static addCb(caller: any, method: Function): void;
        static removeCb(caller: any, method: Function): void;
        private static oncheck(data);
    }
}
declare namespace zt {
    class TaskNet {
        static accept(id: string, cb?: Function): void;
        static complete(roleTaskID: number, cb?: Function): void;
        static complete2(roleTaskID: number, cb?: Function): void;
        static cancel(id: string, cb?: Function): void;
    }
}
declare namespace zt.tips {
    import GComponent = fairygui.GComponent;
    import SysElementVo = zt.data.SysElementVo;
    class BigElementTips extends UIBase {
        constructor($ui: GComponent);
        data: SysElementVo;
        readonly ui: GComponent;
        start(): void;
        dispose(): void;
    }
}
declare namespace zt.tips {
    import GComponent = fairygui.GComponent;
    class CaptainTips extends UIBase {
        private _txt_duty;
        private _txt_name;
        private _txt_power;
        private _txt_grade;
        private _txt_level;
        private _list_star;
        private _txt_battle_txt;
        private _list_properity;
        private _txt_skill_txt;
        private _load_icon;
        private _txt_skill_name;
        private _txt_skill_level;
        private _txt_skill_des;
        private _txt_talent;
        private _list_icon;
        private _txt_chip_txt;
        private _list_chip;
        private _txt_fleet;
        private _txt_fleet_name;
        private _captainVo;
        private _sysCaptain;
        private _properity;
        private _baseProperity;
        private _chipList;
        private _talentList;
        private _bg;
        private _c1;
        constructor($ui: GComponent);
        initUIView(): void;
        private updateProperityRender(index, obj);
        private updarteIconRender(index, obj);
        private updateChipRender(index, obj);
        data: any;
        private showProperity();
        private showChip();
        private showTalent();
        start(): void;
        dispose(): void;
    }
}
declare namespace zt.tips {
    import GComponent = fairygui.GComponent;
    class EquipTips extends UIBase {
        private SPACE;
        private _isIdentify;
        private _h;
        private _basePropertyDataList;
        private _energyStoneDataList;
        private _randPropertyDataList;
        private _shipEffectDataList;
        private _sysEquipVo;
        private _roleEquipVo;
        private _nameTxt;
        private _scoreTxt;
        private _basePropertyTxt;
        private _energyStoneTxt;
        private _randPropertyTxt;
        private _shipEffectTxt;
        private _explainTxt;
        private _basePropertyList;
        private _energyStoneList;
        private _randPropertyList;
        private _shipEffectList;
        private _itemCellList;
        private _c1;
        constructor($ui: GComponent);
        data: any;
        private showExplainTxt();
        private showShipEffect();
        private showRandProperty();
        private showEnergyStone();
        private showBaseProperty();
        private initView();
        private initEvent();
        private shipEffectRender(index, obj);
        private isShipEffectActivate();
        private randPropertyRender(index, obj);
        private energyStoneRender(index, obj);
        private basePropertyRender(index, obj);
        dispose(): void;
    }
}
declare namespace zt.tips {
    import RoleFleetVo = zt.data.RoleFleetVo;
    class FleetStarUpTips extends UIBase {
        private _fleet;
        private itemList;
        private _curStar;
        private _curStarCon;
        private _nextStar;
        private _nextStarCon;
        constructor(ui: any);
        data: RoleFleetVo;
        private draw();
        dispose(): void;
        private readonly bg;
        private readonly title;
        private readonly curStars;
        private readonly nextStars;
        private readonly prop_0;
        private readonly prop_1;
        private readonly prop_2;
        private readonly prop_3;
    }
}
declare namespace zt.tips {
    class FleetTips extends UIBase {
        private _data;
        private _starController;
        private _roleFleetVo;
        data: data.SysFleetVo;
        private draw();
        dispose(): void;
        private readonly stars;
        private readonly skillcell;
        private readonly fightskillcell;
        private readonly name;
        private readonly lv;
        private readonly Strength;
        private readonly hp;
        private readonly equip;
        private readonly officer;
        private readonly skill;
        private readonly fightskill;
    }
}
declare namespace zt.tips {
    import GComponent = fairygui.GComponent;
    class LockPlanetTips extends UIBase {
        private _posTxt;
        private _needNumTxt;
        private _myNumTxt;
        constructor($ui: GComponent);
        data: number;
        readonly ui: GComponent;
        start(): void;
        dispose(): void;
    }
}
declare namespace zt.tips {
    import GComponent = fairygui.GComponent;
    class MineTips extends UIBase {
        constructor($ui: GComponent);
        data: any;
        readonly ui: GComponent;
        start(): void;
        dispose(): void;
    }
}
declare namespace zt.tips {
    import GComponent = fairygui.GComponent;
    class MiningTips extends UIBase {
        constructor($ui: GComponent);
        data: any;
        readonly ui: GComponent;
        start(): void;
        dispose(): void;
    }
}
declare namespace zt.tips {
    class ResTips extends UIBase {
        private _data;
        private _type;
        private _cost;
        data: {
            type: string;
            cost: data.ResStuff;
        };
        private draw();
        dispose(): void;
    }
}
declare namespace zt.tips {
    class RoleFleetTips extends UIBase {
        private _data;
        data: data.RoleFleetVo;
        private draw();
        dispose(): void;
        private readonly stars;
        private readonly skillcell;
        private readonly fightskillcell;
        private readonly name;
        private readonly lv;
        private readonly Strength;
        private readonly hp;
        private readonly equip;
        private readonly officer;
        private readonly skill;
        private readonly fightskill;
    }
}
declare namespace zt {
    import GList = fairygui.GList;
    class ItemList {
        private _itemList;
        private _costItemList;
        private _items;
        private _isUseItem;
        constructor($ui: GList);
        private itemRenderer(index, obj);
        setData($data: any[]): void;
        isUseItem: boolean;
        private clear();
        dispose(): void;
    }
}
declare namespace zt {
    import GComponent = fairygui.GComponent;
    import SysSceneAreaAwardVo = zt.data.SysSceneAreaAwardVo;
    class SceneAreaItem extends GComponent {
        private _txt_progress;
        private _rewardList;
        private _itemList;
        private _txt_state;
        private _data;
        constructor();
        constructFromXML(xml: Object): void;
        setData($data: SysSceneAreaAwardVo, totalLock: number, $currentLock: number): void;
        dispose(): void;
    }
}
declare namespace zt.tips {
    import GComponent = fairygui.GComponent;
    import SysElementVo = zt.data.SysElementVo;
    class SceneAreaTips extends UIBase {
        private _txt_title;
        private _list_reward;
        private _awardList;
        private _data;
        private _sysSceneArea;
        constructor($ui: GComponent);
        data: SysElementVo;
        readonly ui: GComponent;
        start(): void;
        dispose(): void;
    }
}
declare namespace zt.tips {
    import RoleShipVo = zt.data.RoleShipVo;
    class ShipGradeUpTips extends UIBase {
        private _ship;
        private _res;
        constructor(ui: any);
        data: RoleShipVo;
        private draw();
        private updateCost();
        dispose(): void;
        private readonly res;
        private readonly txt1;
        private readonly txt2;
        private readonly txt3;
        private readonly txt4;
    }
}
declare namespace zt.tips {
    class ShipPartGradeUpTips extends UIBase {
        private _part;
        private _cell1;
        private _cell2;
        constructor(ui: any);
        data: data.RolePartVo;
        private draw();
        private updateCell();
        dispose(): void;
        private readonly cell1;
        private readonly itemnums1;
        private readonly itemnums2;
        private readonly cell2;
        private readonly txt1;
        private readonly txt2;
    }
}
declare namespace zt.tips {
    class ShipTips extends UIBase {
        private _data;
        private _starController;
        data: data.RoleShipVo;
        private draw();
        dispose(): void;
        private readonly stars;
        private readonly formation;
        private readonly name;
        private readonly Strength;
        private readonly lv;
        private readonly hp;
        private readonly fleet;
    }
}
declare namespace zt.tips {
    class SkillTips extends UIBase {
        private _sdata;
        data: data.SysSkillVo;
        private draw();
        dispose(): void;
        private readonly skillIcon;
        private readonly skillName;
        private readonly level;
        private readonly desc;
        private readonly enCost;
    }
}
declare namespace zt.tips {
    class StoryAwardTips extends UIBase {
        private _data;
        private _roleData;
        private _GCList;
        private _needItemList;
        data: any;
        private draw();
        clear(): void;
        dispose(): void;
        private readonly bg;
        private readonly titleTxt;
        private readonly con;
    }
}
declare namespace zt.tips {
    class TaskAwardTips extends UIBase {
        private _data;
        private _staticTaskData;
        data: any;
        private draw();
        dispose(): void;
    }
}
declare namespace zt.tips {
    class TechTips extends UIBase {
        private _data;
        private _roleData;
        private _GCList;
        private _needItemList;
        data: data.SysTechVo;
        private draw();
        clear(): void;
        dispose(): void;
        private readonly bg;
        private readonly name;
        private readonly lv;
        private readonly curCom;
        private readonly nextCom;
        private readonly needCom;
    }
}
declare namespace zt {
    const showFleetTips: (FleetID: number) => void;
    const showEquipTips: (d: any) => void;
    const showBigElementTips: (d: any) => void;
    const showSceneAreaTips: (d: any) => void;
    const showLockPlanetTips: (d: any) => void;
    const showMineTips: (d: any) => void;
    const showMiningTips: (d: any) => void;
    const showCaptainTips: (d: any) => void;
    const showFleetStarUpTips: (d: any) => void;
    const showTaskAwardTips: (d: any) => void;
    const showShipTips: (ShipID: number) => void;
    const showSkillTips: (SkillID: number) => void;
    const showTechTips: (tech: data.SysTechVo) => void;
    const showStoryAwardTips: (award: any) => void;
    const showShipGradeUpTips: (ship: any) => void;
    const showPartShipGradeUpTips: (d: any) => void;
    const showResTips: (type: string, cost: data.ResStuff) => void;
    const getResTips: (type: string, cost: data.ResStuff) => any;
    const getTips: (name: string, data: any, res?: string) => any;
    const showItemTips: (name: string, description: string) => void;
    const addTips: (target: fairygui.GObject | Sprite, listener: Function, arg?: any[]) => void;
}
declare namespace zt {
    const getBuildLevels: (BuildID: number) => number;
    const isBuildEnough: (stuff: data.SimpleItemStuff) => boolean;
}
declare namespace zt {
    const isPointsEnouph: (nums: number) => boolean;
}
declare namespace zt {
    const getCostErrorTip: (cost: data.Stuff) => any;
    const hasEnoughItem: ($item: any[], $times?: number) => data.CostItem;
    const hasEnoughRes: ($cost: object, $times?: number) => data.CostRes;
    const raiseLackRes: ($cost: object, $times?: number) => boolean;
    const raiseLackItem: ($cost: object[], $times?: number) => boolean;
}
declare namespace zt {
    const c_fighting: (obj: object) => number;
}
declare namespace zt {
    const getItemNums: (ItemID: number) => number;
    const isItemEnough: (stuff: data.SimpleItemStuff) => boolean;
    const getItemNotEnoughTips: (item: data.ItemStuff) => any;
}
declare namespace zt {
    const getLair: (group: data.SysLairGroupVo) => BattleLairParams;
}
declare namespace zt {
    const isMetalEnouph: (nums: number) => boolean;
    const isDiliEnouph: (nums: number) => boolean;
    const isCrystalEnouph: (nums: number) => boolean;
    const isSkillPointEnouph: (nums: number) => boolean;
    const isResEnouph: (type: string, nums: number) => boolean;
    const getMetalNotEnouphTips: (nums: number) => any;
    const getDiliNotEnouphTips: (nums: number) => any;
    const getCrystalNotEnouphTips: (nums: number) => any;
    const getSkillPointNotEnouphTips: (nums: number) => any;
}
declare namespace zt {
    const isRoleLevelEnouph: (nums: number) => boolean;
}
declare namespace zt.utils {
    class SkillConditon {
        constructor();
        checkConditon(): number;
    }
}
declare namespace zt {
    import Stuff = zt.data.Stuff;
    const sumStuff: (list: Stuff[]) => Stuff;
}
declare namespace zt {
    const getTechLevels: (TechID: number) => number;
    const isTechEnough: (stuff: data.SimpleItemStuff) => boolean;
}
declare namespace zt {
    const UserBuryPoint: (pointID: number) => void;
}
declare namespace zt.cells {
    class BaseCell extends UIBase {
        dispose(): void;
    }
}
declare namespace zt {
}
declare namespace zt.cells {
    class CellCreator {
        static create(name: string): BaseCell;
    }
}
declare namespace zt {
    const getCountdownColor: () => string;
    const getWarnColor: () => string;
    const getColor: () => string;
    const getNormalColor: () => string;
    const setMetalTextColor: (nums: number, text: fairygui.GTextField) => string;
    const setCrystalTextColor: (nums: number, text: fairygui.GTextField) => string;
    const setSkillPointTextColor: (nums: number, text: fairygui.GTextField) => string;
    const setBuildTextColor: (id: number, level: number, text: fairygui.GTextField) => string;
    const setDiliTextColor: (nums: number, text: fairygui.GTextField) => string;
    const setRoleLevelTextColor: (level: number, text: fairygui.GTextField) => string;
    const setPointsTextColor: (nums: number, text: fairygui.GTextField) => string;
    const setResTextColor: (type: string, nums: number, text: fairygui.GTextField) => string;
    const setItemTextColor: (id: number, nums: number, text: fairygui.GTextField) => void;
    const setTechTextColor: (techID: number, level: number, text: fairygui.GTextField) => void;
    const checkColor: (enouph: boolean) => string;
    const getGradeColor: (grade: number) => string;
    const setGradeColor: (grade: number, text: fairygui.GTextField) => string;
}
declare namespace zt {
    import GComponent = fairygui.GComponent;
    import Handler = Laya.Handler;
    class DropItem extends GComponent {
        private _state;
        private _icon;
        private _effect;
        private _txt_num;
        static ITEM: string;
        static EQUIP: string;
        static KEY: string;
        private _dragData;
        private _callBack;
        constructor();
        readonly isQuene: boolean;
        constructFromXML(xml: object): void;
        setData($data: any): void;
        playEffect($callBack: Handler): void;
        private hideOrAll(bo?);
        clear(): void;
        readonly dragItem: any;
    }
}
declare namespace zt {
    import GComponent = fairygui.GComponent;
    import GTextField = fairygui.GTextField;
    class EquipShowView {
        private _defaultLvColor;
        private _noScoreStr;
        private _equipId;
        private _roleEquipId;
        private _cell;
        private _nameTxt;
        private _equipLvTxt;
        private _scoreTxt;
        private _fleetTxt;
        private _icon;
        private _equipScoreMode;
        constructor(cell: GComponent, nameTxt?: GTextField, equipLvTxt?: GTextField, scoreTxt?: GTextField, fleetTxt?: GTextField);
        equipScoreMode: number;
        setData(equipId: number, roleEquipId?: number): void;
        setNoScoreTxt(str: string): void;
        private updateRoleEquip(roleEquipId);
        private initView();
        private initEvent();
        private removeEvent();
        private onOverCell();
        dispose(): void;
    }
}
declare namespace zt {
    import GObject = fairygui.GObject;
    import GList = fairygui.GList;
    import Event = Laya.Event;
    enum EnumFleetState {
        Normal = 0,
        Flight = 1,
        War = 2,
        None = 3,
    }
    class FleetView {
        private _listData;
        private _caller;
        _show: Boolean;
        private _ui;
        private mask;
        private fleetID;
        constructor(ui: GList, caller: Object);
        init(): void;
        private _roleProxy;
        private _roleFleetProxy;
        show(e?: Event): void;
        protected initData(): void;
        private _fleetList;
        protected initFleet(): void;
        private onSelect(click?);
        private fleetItemRender(index, obj);
        getListDataIndex(i: number): any;
        readonly ui: GList;
        static FleetTweenspeed: number;
        private removeEvent();
        setFleetInfo(): void;
        updateFleetItem(index: number, obj: GObject): void;
        start(): void;
        dispose(): void;
    }
}
declare namespace zt.cells {
    class ItemCell extends BaseCell {
    }
}
declare namespace zt.cells {
    import Sprite = Laya.Sprite;
    import SysItemVo = zt.data.SysItemVo;
    class ItemCells extends Sprite {
        private _data;
        data: SysItemVo[];
        private draw();
    }
}
declare namespace zt {
    import GComponent = fairygui.GComponent;
    import GTextField = fairygui.GTextField;
    import ItemStuff = zt.data.ItemStuff;
    class ItemCostView {
        private _mode;
        private _namemode;
        private _cell;
        private _nums;
        private _name;
        private _data;
        private _url;
        private _itemdata;
        constructor(cell: GComponent, nums?: GTextField, name?: GTextField, mode?: string, url?: string, namemode?: string);
        data: ItemStuff;
        isShowTips: boolean;
        private update();
        private initEvent();
        private onmouse();
        private removeEvent();
        private updateItemLevel();
        private readonly icon;
        clear(): void;
        dispose(): void;
    }
}
declare namespace zt {
    import GComponent = fairygui.GComponent;
    import GTextField = fairygui.GTextField;
    class ItemShowView {
        private _cell;
        private _nums;
        private _name;
        private _itemdata;
        private _ItemID;
        private _ItemNums;
        private _url;
        constructor(cell: GComponent, nums: GTextField, name?: GTextField, itemNums?: number, url?: string);
        data: number;
        private clear();
        private update();
        private initEvent();
        private onmouse();
        private removeEvent();
        private readonly icon;
        dispose(): void;
    }
}
declare namespace zt {
    import GComponent = fairygui.GComponent;
    class ResCostView {
        private _key;
        private _mode;
        private _nums;
        private _data;
        private _gc;
        constructor(key: string, gc: GComponent, mode?: string);
        visible: boolean;
        key: string;
        data: data.ResStuff;
        private update();
        private readonly name;
        private initEvent();
        private removeEvent();
        dispose(): void;
        clear(): void;
    }
    const getResFrameIndex: (key: any) => 0 | 1 | 2 | 4 | 10 | 8 | 9 | 5 | 6 | 7 | 13 | 12;
}
declare namespace zt {
    import GComponent = fairygui.GComponent;
    class ResShowView {
        private _key;
        private _mode;
        private _nums;
        constructor(key: string, gc: GComponent, mode?: string);
        private update();
        data: data.ResStuff;
        private readonly name;
        private initEvent();
        private removeEvent();
        dispose(): void;
        clear(): void;
    }
}
declare namespace zt {
    const formatScientificNum: (num: number) => string;
}
declare namespace zt {
    class Stars {
        static setStar(ui: fairygui.GComponent, val: number): void;
    }
}
declare namespace zt {
    class TimerManger {
        private static _instance;
        private _callers;
        constructor();
        static getTime_HMS(time: number): String;
        onTimer(): void;
        addCaller(obj: any): void;
        removeCaller(caller: any): void;
        removeTimer(): void;
        static readonly instance: TimerManger;
    }
}
declare namespace zt {
    const toGray: (item: any, sure?: boolean) => void;
}
declare namespace zt {
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
declare namespace zt {
    class BattleController {
        private _addList;
        constructor();
        private init();
        private onBattleAdd(battle);
        private onBattleUpdate(battle);
        private onRunning(battle);
    }
}
declare namespace zt {
    const battleStart: (params: BattleStartParams) => void;
}
declare namespace zt {
    const joinBattleApp: (battle: {
        type: any;
        battleID: any;
    }) => void;
    const reJoinBattleApp: (battle: {
        type: any;
        battleID: any;
    }) => void;
    const joinBattle: (battle: {
        type: any;
        battleID: any;
    }, cb: Laya.Handler, err: Laya.Handler) => void;
}
declare namespace zt {
    const replayBattle: (data: any, battle: any) => void;
    const testReplayBattle: () => void;
}
declare namespace zt {
    const startColonyBattle: (RoleFleetID: number, ElementID: number, Params: BattleLairParams) => void;
}
declare namespace zt {
    const startDailyBattle: (RoleFleetID: number, targetID: number, Params: BattleLairParams) => void;
}
declare namespace zt {
    const startExploringPointBattle: (RoleFleetID: number, ExploringPointID: number, Params: BattleLairParams) => void;
}
declare namespace zt {
    const startLootBattle: (RoleFleetID: number, ElementID: number, Params: BattleLairParams, type: string) => void;
}
declare namespace zt {
    const startMineBattle: (RoleFleetID: number, targetID: number, Params: any) => void;
}
declare namespace zt {
    const startNormalBattle: (RoleFleetID: number, targetID: number, Params: BattleLairParams) => void;
}
declare namespace zt {
    const startSnatchBattle: (RoleFleetID: number, ElementID: number, Params: BattleLairParams, type: string) => void;
}
declare namespace zt {
    const startStoryBattle: (RoleFleetID: number, targetID: number, Params: any) => void;
}
declare namespace zt {
    enum BattleEvent {
        RUNNING = 0,
    }
}
declare namespace zt {
    const getBattleAddEvent: () => string;
    const getBattleUpdateEvent: () => string;
    const getBattleDeleteEvent: () => string;
}
declare namespace zt {
    interface BattleLairParams {
        Lair: [number, number];
        LairGroupID: number;
    }
}
declare namespace zt {
    interface BattleStartParams {
        Type: string;
        ActivityID: number;
        ExecutorID: number;
        TargetID: number;
        Params: any;
    }
}
declare namespace zt {
    const getActivityID: (type: string) => number;
}
declare namespace zt.event {
    import Handler = Laya.Handler;
    class EventProxy {
        private _proxyPool;
        private static _eventP;
        private static _sysEventP;
        getListByType(eventName: string): any;
        checkLock(eventName: string, index: number): any;
        start(eventName: string, params: object, callback?: Handler): void;
        cancel(EventID: number, callback?: Function, params?: any): void;
        accelerate(EventID: number, Params: any, callback?: Function): void;
        complete(eventName: string, params: object, callback: Function): void;
        unlockQueue(eventName: string, pos: number): void;
        getUnlockQueueCost(eventName: string, index: number): any;
        static readonly eventP: zt.data.EventP;
        static readonly sysEventP: zt.data.SysEventP;
        private _proxy(eventName);
        static _instanceOf: EventProxy;
        static readonly _inst: EventProxy;
    }
}
declare namespace zt.data {
    class RoleActionP {
        private _dataHash;
        constructor();
        update(d?: any): void;
        start(): void;
        getActionByKey(actionTrigger: string): RoleActionVo;
    }
    class RoleActionVo extends DataItem {
        readonly ActionTrigger: string;
        readonly RoleID: number;
        readonly DayCount: number;
        readonly RoleActionID: number;
        readonly TotalCount: number;
        readonly UpdateTime: number;
        readonly DayTime: number;
        update(d: object): void;
    }
}
declare namespace zt.data {
    class BattleP {
        private _dataHash;
        constructor();
        update(d?: any): void;
        getDataBy(ElementID: number, Type: string): BattleVo[];
        getFirst(): any;
        getList(): any[];
        getData(BattleID: number): BattleVo;
    }
    class BattleVo extends DataItem {
        readonly BattleID: number;
        type: string;
        serverID: number;
        roleID: number;
        executorID: number;
        tServerID: number;
        targetID: number;
        sceneID: number;
        elementID: number;
        state: string;
        params: any;
        serverInfo: any;
        createTime: number;
    }
}
declare namespace zt.data {
    class BattleReportP {
        private _dataHash;
        constructor();
        update(d?: any): void;
        getData(BattleReportID: number): BattleReportVo;
    }
    class BattleReportVo extends DataItem {
        readonly BattleReportID: number;
    }
}
declare namespace zt.data {
    class SysBattleEffectP {
        private _dataHash;
        constructor();
        getDataByAction(ActionName: string): SysBattleEffectVo;
    }
    class SysBattleEffectVo extends BaseDataItem {
        readonly ActionName: string;
        readonly HitEffect: string;
        readonly Lx: number[];
        readonly Ly: number[];
        readonly Rx: number[];
        readonly Ry: number[];
        readonly Frame: number;
    }
}
declare namespace zt.data {
    class SysBattleP {
        private _dataHash;
        constructor();
        getData(Class: string): SysBattleVo;
        getDataByType(Type: string): SysBattleVo;
    }
    class SysBattleVo extends BaseDataItem {
        readonly Type: string;
        condition: any;
        params: any;
    }
}
declare namespace zt.data {
    class SysBattlePerformeP {
        private _dataHash;
        constructor();
        getDataByShip(ShipName: string): SysBattlePerformeVo;
    }
    class SysBattlePerformeVo extends BaseDataItem {
        readonly ShipName: string;
        readonly HitEffect: string;
        readonly AttackX: number;
        readonly AttackY: number;
        readonly HitX: number;
        readonly HitY: number;
    }
}
declare namespace zt.data {
    class CaptainOpenType {
        static OPEN_BY_ILL: string;
        static OPEN_BY_FLEET: string;
    }
}
declare namespace zt.data {
    class RoleCaptainP {
        private _dataHash;
        private _sysCaptainP;
        constructor();
        initItemHash(): void;
        update(d?: any): void;
        start(): void;
        getRoleCaptainList(): Array<RoleCaptainVo>;
        getRoleCaptainByID(CaptainID: number): RoleCaptainVo;
    }
    class RoleCaptainVo extends DataItem {
        readonly RoleCaptainID: number;
        readonly CaptainID: number;
        readonly RoleID: number;
        readonly Level: number;
        readonly Exp: number;
        readonly Grade: number;
        readonly Star: number;
        readonly RoleFleetID: number;
        readonly UsedTalentPoint: number;
        readonly UsedTalentBook: number;
        readonly TotalTalentPoint: number;
        readonly CreateTime: number;
        readonly ChipList: object;
        update(d: any): void;
        readonly FleetID: number;
        readonly Power: number;
    }
}
declare namespace zt.data {
    class RoleCaptainTalentP {
        private _dataHash;
        private _sysCaptainP;
        constructor();
        initItemHash(): void;
        update(d?: any): void;
        getRoleCaptainList(): Array<number>;
        getRoleCaptainByID(captainID: number): RoleCaptainTalentVo;
    }
    class RoleCaptainTalentVo extends DataItem {
        readonly RoleTalentID: number;
        readonly RoleID: number;
        readonly CaptainID: number;
        readonly TreeTalentIDList: number[];
        private _newTalentID;
        update($data: any): void;
        newTalentID: number;
    }
}
declare namespace zt.data {
    class SysCaptainGradeP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(captainGradeID: number, grade: number): SysCaptainGradeVo;
    }
    class SysCaptainGradeVo extends BaseDataItem {
        readonly CaptainGradeID: number;
        readonly Grade: number;
        readonly Cost: string;
        readonly PropertyList: Object;
        readonly Level: number[];
        readonly TalentPoint: number;
        readonly CaptainID: number;
    }
}
declare namespace zt.data {
    class SysCaptainLevelP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(level: number): SysCaptainLevelVo;
    }
    class SysCaptainLevelVo extends BaseDataItem {
        readonly CaptainLevelID: number;
        readonly Exp: number;
        readonly Level: number;
        readonly TalentPoint: number;
    }
}
declare namespace zt.data {
    class SysCaptainP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(captainID: number): SysCaptainVo;
    }
    class SysCaptainVo extends BaseDataItem {
        readonly CaptainID: number;
        readonly Name: string;
        readonly Duty: string;
        readonly AvatarID: number;
        readonly FactionID: number;
        readonly Level: number;
        readonly Star: number;
        readonly Grade: number;
        readonly ItemID: number;
        readonly PropertyList: Object;
        readonly FactorList: Object;
        readonly TalentPoint: number;
        readonly RoleLevel: number;
        readonly SkillList: number[];
    }
}
declare namespace zt.data {
    class SysCaptainStarP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(CaptainStarID: number): SysCaptainStarVo;
    }
    class SysCaptainStarVo extends BaseDataItem {
        readonly CaptainStarID: number;
        readonly Star: number;
        readonly DebrisNums: number;
        readonly TalentBook: number;
        readonly OpenChipNums: number;
        readonly ChipGroove: object;
    }
}
declare namespace zt.data {
    class SysCaptainTalentP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(TalentID: number): SysCaptainTalentVo;
    }
    class SysCaptainTalentVo extends BaseDataItem {
        readonly TalentID: number;
        readonly PropertyList: object;
        readonly TalentSkillList: number[];
        readonly MappingList: number;
    }
}
declare namespace zt.data {
    class SysCaptainTalentTreeP {
        private _dataHash;
        private _talentTree;
        private _captainToTalent;
        constructor();
        initItemHash(): void;
        getTalentTreeByCaptainDutyAndStar($duty: string, $star: number): SysCaptainTalentTreeVo[];
        getTreeByCaptainStarAndLevel($duty: string, $star: number, $pos: number): SysCaptainTalentTreeVo[];
        getData(TreeTalentID: number): SysCaptainTalentTreeVo;
    }
    class SysCaptainTalentTreeVo extends BaseDataItem {
        readonly TreeTalentID: number;
        readonly Duty: string;
        readonly Star: number;
        readonly Parents: number[];
        readonly RoleLevel: number;
        readonly TalentPointCost: number;
        readonly TalentID: number;
        readonly Pos: number[];
        readonly Enabled: number;
    }
}
declare namespace zt.data {
    class RoleBuildingP {
        private _dataHash;
        constructor();
        getSysBuildLevel(buildId: number): SysBuildingLevelVo;
        getBuildIdList(): Array<number>;
        getDataByItemId(itemId: any): RoleBuildingVo;
        update(d?: any): void;
    }
    class RoleBuildingVo extends DataItem {
        readonly RoleBuildingID: number;
        readonly RoleID: number;
        readonly BuildingID: number;
        readonly Level: number;
        readonly EventState: string;
        readonly UpdateTime: number;
    }
}
declare namespace zt.data {
    class SysBuildingLevelP {
        private _dataHash;
        private _paramHash;
        constructor();
        initItemHash(): void;
        getData(buildId: number, level: number): SysBuildingLevelVo;
        getDataByBuildID(BuildingID: number): SysBuildingLevelVo[];
        getParamList(key: string): any[];
        private initParamHash();
        private initOneParam(prevParam, currParam, keyList);
    }
    class SysBuildingLevelVo extends BaseDataItem {
        readonly BuildingLevelID: number;
        readonly BuildingID: number;
        readonly Level: number;
        readonly Cost: any;
        readonly AutoOutPut: any;
        readonly OutPut: number;
        readonly RoleLevel: number;
        readonly BuildCondition: any;
        readonly TechConditon: number;
        readonly Time: number;
        readonly Energy: any;
        readonly Params: any;
    }
}
declare namespace zt.data {
    class SysBuildingP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getList(): object;
        getdataById(BuidlingID: number): SysBuildingVo;
    }
    class SysBuildingVo extends BaseDataItem {
        readonly BuildingID: number;
        readonly Class: string;
        readonly MaxLevel: number;
        readonly Functions: string[];
        readonly Enabled: number;
        readonly Name: string;
        readonly Desc: string;
    }
}
declare namespace zt.data {
    class SysBuildingPosP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getdataById(BuidlingID: number, FactionID: number): SysBuildingPosVo;
    }
    class SysBuildingPosVo extends BaseDataItem {
        readonly BuildingPosID: number;
        readonly BuildingID: number;
        readonly X: number;
        readonly Y: number;
        readonly Params: object;
    }
}
declare namespace zt.data {
    class RoleCDPremiumP {
        private _dataHash;
        constructor();
        getCDListByExecutorID(ExecutorID: number): RoleCDPremiumVo[];
        getCDDataByExecutor(ExecutorID: number, $class: string): RoleCDPremiumVo;
        getCDListByType(Type: string): RoleCDPremiumVo;
        initItemHash(): void;
        update(d?: any): void;
    }
    class RoleCDPremiumVo extends DataItem {
        readonly RoleCDID: number;
        readonly RoleID: number;
        readonly Class: string;
        readonly Type: string;
        readonly ExecutorID: number;
        readonly CDTime: number;
        readonly CDCount: number;
        readonly RefreshTime: number;
        update(d: any): void;
    }
}
declare namespace zt.data {
    class SysCDPremiumP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getdataByType(Type: string): SysCDPremiumVo;
    }
    class SysCDPremiumVo extends BaseDataItem {
        readonly Type: string;
        readonly Class: string;
        readonly ExcutorType: string;
        readonly IsRefresh: number;
        readonly RefreshTime: string;
        readonly BaseValue: string;
        readonly Premium: number;
        readonly AccelerateRate: string;
        readonly AccelerateItem: string;
        readonly Description: string;
    }
}
declare namespace zt.data {
    enum ChannelType {
        All = "All",
        World = "World",
        Faction = "Faction",
        League = "League",
        Private = "Private",
        System = "System",
    }
    class ChatMsgP {
        private _dataHash;
        private _totalMsgList;
        private _allMsg;
        constructor();
        private initMsgList();
        private initItemHash();
        update(d?: any): void;
        receiveMsg(msg: ChatMsgVo): void;
        private addToMsgList(msg);
        getChannelData(channel: string): Array<ChatMsgVo>;
        readonly allChannelData: Array<ChatMsgVo>;
    }
    class ChatMsgVo extends BaseDataItem {
        readonly GroupType: ChannelType;
        readonly GroupID: string;
        readonly Message: string;
        readonly Time: number;
        readonly Source: number;
        readonly RoleID: number;
        readonly SenderName: string;
        readonly FactionID: number;
        readonly Duty: string;
        readonly Honor: string;
        readonly FromType: string;
        readonly TemplateName: string;
        readonly DataKeys: string;
        readonly Area: number;
    }
}
declare namespace zt.data {
    class SysChatTemplateP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(name: string): SysChatTemplateVo;
    }
    class SysChatTemplateVo extends BaseDataItem {
        readonly ChatTemplateID: number;
        readonly Name: string;
        readonly Area: number;
        readonly ChannelType: string;
        readonly DataKeys: string;
        readonly Content: any;
    }
}
declare namespace zt.data {
    class RoleColonyP {
        private _dataHash;
        constructor();
        getDataByElementID(ElementID: number): RoleColonyVo;
        initItemHash(): void;
        getMyData(): RoleColonyVo[];
        update(d?: any): void;
    }
    class RoleColonyVo extends DataItem {
        readonly RoleID: number;
        readonly ElementID: number;
        readonly SceneID: number;
        readonly FactionID: number;
        readonly ResCDTime: number;
        readonly ResCollectTime: number;
        readonly State: string;
        readonly RoleName: string;
        readonly RoleLevel: number;
        readonly Fight: number;
        readonly LootVirtualFleetID: number;
        readonly SnatchVirtualFleetID: number;
        readonly ExtraFight: number;
        readonly SysFight: number;
        update(d: any): void;
    }
}
declare namespace zt.data {
    class RoleCommodityClassP {
        private _dataHash;
        constructor();
        getDataByRefreshID(ExecutorID: number): RoleCommodityClassVo;
        update(d: any): void;
    }
    class RoleCommodityClassVo extends DataItem {
        readonly RoleCommodityClassID: number;
        readonly ExecutorID: number;
        readonly Class: string;
        readonly IDList: Array<number>;
        readonly ExpireTime: number;
        readonly RefreshTimes: number;
        readonly UpdateTime: number;
    }
}
declare namespace zt.data {
    class RoleCommodityP {
        private _dataHash;
        constructor();
        getDataByExecutorIDAndCommodityID(ExecutorID: number, CommodityID: number): RoleCommodityVo;
        update(d: any): void;
    }
    class RoleCommodityVo extends DataItem {
        readonly RoleCommodityID: number;
        readonly ExecutorID: number;
        readonly CommodityID: number;
        readonly Nums: number;
        readonly WeekNums: number;
        readonly UpdateTime: number;
    }
}
declare namespace zt.data {
    class SysCommodityClassP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getdataById(ItemID: number): SysCommodityClassVo;
        getDataByModule(Class: string): SysCommodityClassVo[];
        getDataByType(type: string): SysCommodityClassVo;
    }
    class SysCommodityClassVo extends BaseDataItem {
        readonly Class: string;
        readonly Type: string;
        readonly TimeType: string;
        readonly RefreshTime: number;
        readonly RefreshCost: any;
        readonly Points: number;
        readonly RefreshNums: number;
        readonly RefreshLimitTimes: number;
        readonly ExecutorType: string;
    }
}
declare namespace zt.data {
    class SysCommodityP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getdataById(ItemID: number): SysCommodityVo;
        getListByCategoryAndFactionID(Category: string, factionID: number): SysCommodityVo[];
    }
    class SysCommodityVo extends BaseDataItem {
        readonly CommodityID: number;
        readonly Class: string;
        readonly Category: string;
        readonly AvatarID: number;
        readonly Description: string;
        readonly Condition: any;
        readonly VipLevel: number;
        readonly GainType: string;
        readonly GainParam: any[];
        readonly CostType: string;
        readonly CostParam: any[];
        readonly Grade: number;
        readonly FactionID: number;
        readonly Discount: number;
        readonly DayLimit: number;
        readonly WeekLimit: number;
        readonly ForeverLimit: number;
        readonly IsShow: number;
        readonly Odd: number;
        readonly OrderBy: number;
        readonly Module: string;
        readonly Enabled: number;
    }
}
declare namespace zt.data {
    class RoleCounterP {
        private _dataHash;
        private _updateTimeList;
        constructor();
        getData(type: string): RoleCounterVo;
        update(d?: any): void;
        private updateTimeList(dataList);
        private addToList(updateTime, type);
        private updateTimer();
        private onUpdateTime();
        private getUpdateTime(type);
    }
    class RoleCounterVo extends DataItem {
        readonly Count: number;
        readonly UsedCount: number;
        readonly AddCount: number;
        readonly Type: number;
        readonly CoolTime: number;
        readonly RefreshTime: number;
        readonly CreateTime: number;
    }
}
declare namespace zt.data {
    class SysCounterP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(type: string): SysCounterVo;
    }
    class SysCounterVo extends BaseDataItem {
        readonly Type: string;
        readonly InitValue: number;
        readonly RefreshValue: number;
        readonly IntervalValue: number;
        readonly LimitValue: number;
        readonly Model: string;
        readonly RefreshTime: string;
        readonly IntervalTime: number;
        readonly AssociationParams: any;
        readonly BuyPoints: any;
    }
}
declare namespace zt.data {
    class RoleDailyTaskP {
        private _dataHash;
        constructor();
        getData(): RoleDailyTaskVo;
        update(d: any): void;
    }
    class RoleDailyTaskVo extends DataItem {
        readonly RoleDailyTaskID: number;
        readonly RoleID: number;
        readonly FinishedTaskID: any;
        readonly TaskPoolID: number;
        readonly UpdateTime: number;
        readonly FetchActiveAwardInfo: any;
        readonly ActiveDegree: any;
    }
}
declare namespace zt.data {
    class RoleTaskLogP {
        private _dataHash;
        constructor();
        getData(): RoleTaskLogVo;
        update(d: any): void;
    }
    class RoleTaskLogVo extends DataItem {
        readonly RoleTaskLogID: number;
        readonly RoleID: number;
        readonly TaskList: any;
        readonly TaskSerialID: number;
        readonly IsEnd: any;
    }
}
declare namespace zt.data {
    class SysDailyTaskP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(DailyTaskPoolID: number): SysDailyTaskVo;
        getDataInstance(): any;
    }
    class SysDailyTaskVo extends BaseDataItem {
        readonly DailyTaskPoolID: number;
        readonly TotalActive: number;
        readonly TaskIDList: any;
        readonly Condition: any;
        readonly Awards: any;
    }
}
declare namespace zt.data {
    class RoleDailyInstanceP {
        private _dataHash;
        constructor();
        getData(): RoleDailyInstanceVo;
        update(d?: any): void;
    }
    class RoleDailyInstanceVo extends DataItem {
        readonly RoleDailyInstanceID: number;
        readonly RoleID: number;
        readonly FleetID: number;
        Buff: string;
        readonly BuffRefreshDay: number;
    }
}
declare namespace zt.data {
    class SysDailyInstanceP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(dailyInstanceID: number): SysDailyInstanceVo;
        getDataInstance(): any;
    }
    class SysDailyInstanceVo extends BaseDataItem {
        readonly DailyInstanceID: number;
        readonly GroupID: number;
        readonly Diff: number;
        readonly Name: string;
        readonly Avator: number;
        readonly Level: number;
        readonly Cost: number;
        readonly Params: any;
        readonly Awards: any;
    }
}
declare namespace zt.data {
    class RoleEquipGrooveP {
        private _dataHash;
        constructor();
        update(d?: any): void;
        searchOne(key: any, value: any): RoleEquipGrooveVo;
        searchTwo(key: any, value: any, key2: any, value2: any): RoleEquipGrooveVo;
        getData(id: number): RoleEquipGrooveVo;
        getList(): RoleEquipGrooveVo[];
    }
    class RoleEquipGrooveVo extends DataItem {
        readonly RoleEquipGrooveID: number;
        readonly RoleEquipID: number;
        readonly RoleFleetID: number;
        readonly Type: string;
        readonly Grade: number;
        readonly Level: number;
        readonly FleetID: number;
    }
}
declare namespace zt.data {
    class RoleEquipP {
        private _dataHash;
        private _energyStoneItemHash;
        private _energyStoneEquipHash;
        constructor();
        update(d?: any): void;
        updateBy(d: any): void;
        getEnergyStoneList(): number[];
        getList(): RoleEquipVo[];
        getListByType(type: string): RoleEquipVo[];
        getData(roleEquipId: number): RoleEquipVo;
        private initEnergyStoneHash();
        private updateEnergyStoneHash(roleEquipId);
    }
    class RoleEquipVo extends DataItem {
        readonly RoleEquipID: number;
        readonly EquipID: number;
        readonly RoleEquipGrooveID: number;
        readonly RandProperty: any[];
        readonly RandShipEffect: any[];
        readonly ShipID: number;
        readonly OpenHoleList: string;
        readonly HoleList: any;
        readonly CreateTime: number;
        readonly sysEquipVo: SysEquipVo;
        readonly Type: string;
        readonly roleEquipGrooveVo: RoleEquipGrooveVo;
        private readonly fleetID;
        private readonly level;
        private readonly grade;
        getPropByType(type: string): number;
        readonly Attack: number;
        readonly MaxHp: number;
        readonly Armor: number;
        readonly Shield: number;
        readonly Crit: number;
        readonly CritDamageAdd: number;
        readonly CritRes: number;
        readonly CritDamageDec: number;
        readonly Hit: number;
        readonly Dodge: number;
        readonly Strength: number;
        readonly Tenacity: number;
    }
}
declare namespace zt.data {
    class SysEquipExtendP {
        private _dataHash;
        constructor();
        private initItemHash();
        getData(equipId: number): SysEquipVo;
    }
    class SysEquipExtendVo extends BaseDataItem {
        readonly EquipID: number;
        readonly RandNums: number;
        readonly ShipRandOdds: number;
        readonly ShipRandNums: number;
    }
}
declare namespace zt.data {
    class SysEquipGrooveGradeP {
        private _dataHash;
        constructor();
        private initItemHash();
        getData(type: string, fleetId: number, grade: number): SysEquipGrooveGradeVo;
    }
    class SysEquipGrooveGradeVo extends BaseDataItem {
        readonly GrooveGradeID: number;
        readonly Type: number;
        readonly FleetID: number;
        readonly Grade: number;
        readonly Level: number;
        readonly Cost: string;
        readonly PropertyList: object;
        readonly ViewLevel: number;
        getPercentByType(type: string): number;
    }
}
declare namespace zt.data {
    class SysEquipGrooveLevelP {
        private _dataHash;
        constructor();
        private initItemHash();
        getData(type: string, fleetId: number, level: number): SysEquipGrooveLevelVo;
    }
    class SysEquipGrooveLevelVo extends BaseDataItem {
        readonly GrooveLevelID: number;
        readonly Type: number;
        readonly FleetID: number;
        readonly Level: number;
        readonly Cost: string;
        readonly PropertyList: object;
        getPercentByType(type: string): number;
    }
}
declare namespace zt.data {
    class SysEquipGrooveP {
        private _dataHash;
        constructor();
        private initItemHash();
        getList(): object;
        readonly length: number;
        getData(grooveId: number): SysEquipGrooveVo;
    }
    class SysEquipGrooveVo extends BaseDataItem {
        readonly GrooveID: number;
        readonly Name: string;
        readonly Type: string;
        readonly Level: number;
        readonly Grade: number;
        readonly MaxLevel: number;
        readonly MaxGrade: number;
        readonly OrderBy: number;
    }
}
declare namespace zt.data {
    class SysEquipP {
        private _dataHash;
        private _typeList;
        constructor();
        private initItemHash();
        getData(equipId: number): SysEquipVo;
        getTypeList(): string[];
        private initTypeList();
    }
    class SysEquipVo extends BaseDataItem {
        readonly EquipID: number;
        readonly Name: string;
        readonly Type: string;
        readonly Grade: number;
        readonly Factor: number;
        readonly EquipLevel: number;
        readonly PropertyList: number[];
        readonly HoleList: number[];
        readonly OpenHoleList: number[];
        readonly RandNums: number;
        readonly ShipRandOdds: number;
        readonly ShipRandNums: number;
        readonly Recycle: object;
        readonly Resolve: object;
        getPropByType(type: string): number;
    }
}
declare namespace zt.data {
    class SysEffectP {
        private _dataHash;
        constructor();
        getDataByItemId(effectID: number): SysEffectVo;
        initItemHash(): void;
    }
    class SysEffectVo extends DataItem {
        readonly EffectID: number;
        readonly Type: string;
        readonly Target: string;
        readonly Prop: string;
        readonly Mode: number;
        readonly AvatarID: number;
    }
}
declare namespace zt.data {
    class EventP extends Laya.EventDispatcher {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getSceneEvent(SceneID: number, EventName: string): EventVo[];
        removeSceneEvent(SceneID: number, EventName: string): void;
        getDatasByEventName(EventName: string): EventVo[];
        getDataItemByExecutor(executorType: string, executorID: number): Array<any>;
        getDatasByFilter(filter: any): EventVo[];
        getDataByFilter(filter: any, self?: boolean): EventVo;
        getEventTypeList(filter: any): EventVo[];
        searchItems(keys: any, values: any): any[];
        private getData(EventID);
        update(d?: any): void;
        updateOne(d?: any): void;
    }
    class EventVo extends DataItem {
        readonly EventID: number;
        readonly RoleID: number;
        readonly ExecutorType: string;
        readonly executorID: number;
        readonly EventName: string;
        readonly Property: any;
        readonly Progress: string;
        readonly Position: string;
        readonly StartTime: number;
        readonly EndTime: number;
        readonly PauseTime: number;
        readonly CanAccelerate: number;
        readonly AccelerateTime: number;
        readonly CanCancel: number;
        readonly ServerID: number;
        readonly ElementID: number;
        readonly SceneID: number;
        readonly leftTime: number;
        readonly totalTime: number;
    }
}
declare namespace zt.data {
    class EventState {
        static Doing: string;
        static Complement: string;
        static Cancel: string;
        static Normal: string;
    }
}
declare namespace zt.data {
    class SysEventP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getdataById(EventName: string): SysEventVo;
    }
    class SysEventVo extends BaseDataItem {
        readonly EventSetID: number;
        readonly EventName: string;
        readonly CanAccelerate: number;
        readonly CanCancel: number;
        readonly AccelerateRate: string;
        readonly AccelerateItem: Array<number>;
        readonly Time: number;
        readonly EventType: string;
        readonly QueueNums: number;
        readonly ExeFieldName: string;
        readonly ExecutorType: string;
        readonly ExeClassName: string;
        readonly FreeTime: number;
        readonly Enabled: string;
        readonly UnlockQueue: any[];
        readonly FreeQueueNums: any;
        readonly GridCondition: object;
    }
}
declare namespace zt.data {
    class RoleFleetGroupP {
        private _dataHash;
        private _fleetGroup;
        constructor();
        getDataByRoleID(roleId?: number): RoleFleetGroupVo;
        getDataByItemId(fleetGroupID: number): RoleFleetGroupVo;
        initItemHash(): void;
        start(): void;
        update(d?: any): void;
        updateBy(d?: any): void;
        readonly fleetGroup: RoleFleetGroupVo;
    }
    class RoleFleetGroupVo extends DataItem {
        readonly FleetGroupID: number;
        readonly RoleID: number;
        readonly SuperFleetID: number;
        readonly Formation: object;
        readonly FleetList: object;
        readonly ShipList: object;
        readonly State: string;
        readonly EventState: string;
        readonly UpdateTime: number;
    }
}
declare namespace zt.data {
    class RoleFleetP {
        private _dataHash;
        private _sysFleetP;
        private _sysFleetStarP;
        private _sysFleetRebuildPropertyP;
        private _current;
        constructor();
        current: number;
        getDataListByRoleID(roleId?: number): Array<RoleFleetVo>;
        getDataByItemId(roleFleetID: number): RoleFleetVo;
        getDataByFleetID(FleetID: number): RoleFleetVo;
        getDataByRoleFleetID(RoleFleetID: number): RoleFleetVo;
        getDataByElementID(Element: number): RoleFleetVo;
        initItemHash(): void;
        start(): void;
        private initOne(vo);
        update(d?: any): void;
        updateBy(d?: any): void;
    }
    class RoleFleetVo extends DataItem {
        readonly RoleFleetID: number;
        readonly FleetID: number;
        readonly RoleID: number;
        readonly SceneID: number;
        readonly ElementID: number;
        readonly Grade: number;
        readonly Star: number;
        readonly Level: number;
        readonly Exp: number;
        readonly Hp: number;
        readonly Formation: object;
        readonly StandBy: object;
        readonly State: string;
        readonly EventState: string;
        readonly StoreLimit: string;
        readonly ProtectTime: number;
        readonly BattleID: number;
        readonly RebuildList: string;
        readonly PropertyList: string;
        readonly RebuildRewardList: object;
        readonly AutoSupply: number;
        readonly EquipShipEffect: number;
        readonly AvatarID: number;
        readonly Name: string;
        readonly Attack: number;
        readonly MaxHp: number;
        readonly Armor: number;
        readonly Shield: number;
        readonly Crit: number;
        readonly CritDamageAdd: number;
        readonly CritRes: number;
        readonly CritDamageDec: number;
        readonly Hit: number;
        readonly Dodge: number;
        readonly Strength: number;
        readonly Tenacity: number;
        readonly Speed: number;
        readonly MaxEnergy: number;
        readonly BattleCabin: number;
        readonly ShipCabin: number;
        readonly Energy: number;
        readonly EnergyRestore: number;
        readonly Fighting: number;
        readonly EquipGroove: object;
        readonly CaptainList: object;
        readonly CaptainMapping: string;
        update(d: any): void;
    }
}
declare namespace zt.data {
    class RoleVirtualFleetCopyP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(virtualCopyID: number): RoleVirtualFleetCopyVo;
        update(d?: any): void;
        updateBy(d?: any): void;
    }
    class RoleVirtualFleetCopyVo extends DataItem {
        readonly VirtualCopyID: number;
        readonly RoleID: number;
        readonly RoleFleetID: number;
        readonly Module: string;
        readonly Formation: object;
        readonly ShipList: object[];
        readonly FleetList: object[];
        readonly CaptainList: object;
        readonly Fight: number;
        readonly EventState: number;
        readonly BattleID: number;
        readonly MaxHp: number;
        readonly Hp: number;
    }
}
declare namespace zt.data {
    class RoloVirtualFleetP {
        private _dataHash;
        constructor();
        initItemHash(): void;
    }
    class RoleVirtualFleetVo extends DataItem {
        private _hp;
        readonly VirtualCopyID: number;
        readonly RoleID: number;
        readonly RoleFleetID: number;
        readonly Module: string;
        readonly Formation: object;
        readonly ShipList: object;
        readonly FleetList: object;
        readonly CaptainList: object;
        readonly Fight: number;
        readonly EventState: number;
        readonly BattleID: number;
        readonly IsGroup: boolean;
        update(d: object): void;
        readonly hp: number;
    }
}
declare namespace zt.data {
    class SysFleetGradeP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getdataById(Grade: number): SysFleetGradeVo;
        readonly maxGrade: number;
    }
    class SysFleetGradeVo extends BaseDataItem {
        readonly FleetGradeID: number;
        readonly Grade: number;
        readonly Level: Array<number>;
        readonly Cost: Stuff;
        readonly PropertyList: object;
        readonly Fight: number;
    }
}
declare namespace zt.data {
    class SysFleetLevelP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getdataById(Level: number): SysFleetLevelVo;
        getDataByFleetExp(exp: any): SysFleetLevelVo;
        readonly maxLevel: number;
        getdataByRoleLevel(roleLevel: number): SysFleetLevelVo[];
    }
    class SysFleetLevelVo extends BaseDataItem {
        readonly FleetLevelID: number;
        readonly Level: number;
        readonly Exp: number;
    }
}
declare namespace zt.data {
    class SysFleetP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        readonly list: SysFleetVo[];
        getdataById(FleetID: number): SysFleetVo;
    }
    class SysFleetVo extends BaseDataItem {
        readonly FleetID: number;
        readonly AvatarID: number;
        readonly Name: string;
        readonly FactionID: number;
        readonly CanBuild: number;
        readonly createCondition: string;
        readonly Cost: string;
        readonly Time: number;
        readonly Attack: number;
        readonly MaxHp: number;
        readonly Armor: number;
        readonly Shield: number;
        readonly Crit: number;
        readonly CritDamageAdd: number;
        readonly CritRes: number;
        readonly CritDamageDec: number;
        readonly Hit: number;
        readonly Dodge: number;
        readonly Strength: number;
        readonly Tenacity: number;
        readonly BattleCabin: number;
        readonly ShipCabin: number;
        readonly Speed: number;
        readonly Energy: number;
        readonly EnergyRestore: number;
        readonly Fight: number;
        readonly Grade: number;
        readonly MaxEnergy: number;
        readonly SkillList: Array<number>;
        readonly AttackFactor: number;
        readonly ArmorFactor: number;
        readonly MaxHpFactor: number;
        readonly ShieldFactor: number;
    }
}
declare namespace zt.data {
    class SysFleetRebuildAwardP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getdataByFidAndNums(fleetID: number, RebuildNums: number): SysFleetRebuildAwardVo;
        getdataByFid(fleetID: number): SysFleetRebuildAwardVo[];
    }
    class SysFleetRebuildAwardVo extends BaseDataItem {
        readonly AwardID: number;
        readonly RebuildNums: number;
        readonly Awards: number;
    }
}
declare namespace zt.data {
    class SysFleetRebuildP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getdataById(RebuildLevel: number): SysFleetRebuildVo;
        getDataListByGrade(FleetGrade: number): SysFleetRebuildVo[];
    }
    class SysFleetRebuildVo extends BaseDataItem {
        readonly FleetRebuildID: number;
        readonly RebuildLevel: number;
        readonly Cost: string;
        readonly FleetGrade: number;
    }
}
declare namespace zt.data {
    class SysFleetRebuildPropertyP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getdataById(RebuildNums: number, Key: string): SysFleetRebuildPropertyVo;
        getAllKey(fleetID: any): string[];
    }
    class SysFleetRebuildPropertyVo extends BaseDataItem {
        readonly AwardID: number;
        readonly RebuildPropertyID: number;
        readonly RebuildLevel: number;
        readonly Key: number;
        readonly Value: number;
    }
}
declare namespace zt.data {
    class SysFleetSetP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getdataById(module: string): SysFleetSetVo;
    }
    class SysFleetSetVo extends BaseDataItem {
        readonly VirtualFleetID: number;
        readonly Module: number;
        readonly Condition: number;
        readonly IsGroup: number;
        readonly IsLockTeam: number;
        readonly IsVirtual: number;
    }
}
declare namespace zt.data {
    class SysFleetStarP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(fleetID: number, star: number): SysFleetStarVo;
        getMaxStarByFleetID(fleetID: number): number;
    }
    class SysFleetStarVo extends BaseDataItem {
        readonly FleetStarID: number;
        readonly FleetID: number;
        readonly Star: number;
        readonly Cost: number;
        readonly PropertyList: any;
    }
}
declare namespace zt.data {
    class SysGuideP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getdataById(guide: number): SysGuideVo;
        getGuideByTarget($targetID: number): SysGuideVo[];
    }
    class SysGuideVo extends BaseDataItem {
        readonly GuideID: number;
        readonly Type: number;
        readonly Module: string;
        readonly TargetType: string;
        readonly TargetID: number;
        readonly Params: object;
        readonly offsetX: number;
        readonly offsetY: number;
        readonly Loop: boolean;
        readonly Circle: boolean;
        readonly Direction: number;
        readonly isScene: boolean;
        readonly DialogGroupID: number;
        readonly LightTarget: boolean;
    }
}
declare namespace zt.data {
    class RoleHonorP {
        private _dataHash;
        constructor();
        getData(): RoleHonorVo;
        update(d: any): void;
    }
    class RoleHonorVo extends DataItem {
        readonly RoleHonorID: number;
        readonly RoleID: number;
        readonly Title: string;
        readonly Week: any;
        readonly WeekExploit: number;
        readonly WeekExploitLimit: number;
        readonly ExploitOrder: number;
        readonly LastWeekExploit: number;
        readonly ExploitAward: Array<number>;
    }
}
declare namespace zt.data {
    class SysExploitOrderP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(ExploitOrderID: number): SysExploitOrderVo;
        getDataLsit(): Array<SysExploitOrderVo>;
    }
    class SysExploitOrderVo extends BaseDataItem {
        readonly ExploitOrderID: number;
        readonly Exploit: number;
        readonly ExploitAwards: any;
        readonly RangeInfo: any;
        readonly OrderAwards: any;
    }
}
declare namespace zt.data {
    class SysHonorAwardsP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(ExploitAwardID: number): SysHonorAwardsVo;
    }
    class SysHonorAwardsVo extends BaseDataItem {
        readonly ExploitAwardID: number;
        readonly Title: any;
        readonly Exploit: number;
        readonly Awards: any;
    }
}
declare namespace zt.data {
    class SysHonorP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(title: string): SysHonorVo;
        getDataById(id: number): SysHonorVo;
        readonly honorList: Array<SysHonorVo>;
    }
    class SysHonorVo extends BaseDataItem {
        readonly HonorID: number;
        readonly Title: any;
        readonly Honor: number;
        readonly WeekExploitLimit: number;
        readonly PrivilegeInfo: any;
        readonly HonorAwards: any;
        readonly PrivilegeAwards: any;
    }
}
declare namespace zt.data {
    import EventDispatcher = Laya.EventDispatcher;
    class HomeElementP extends EventDispatcher {
        private _dataHash;
        constructor();
        initItemHash(): void;
        readonly data: HomeElementVo;
        update(d: any): void;
        private updateItem(d);
    }
    class HomeElementVo extends DataItem {
        metalTime: number;
        diliTime: number;
        crystalTime: number;
        spaceEnergyTime: number;
        readonly Latiuum: number;
        update(d: any): void;
    }
}
declare namespace zt.data {
    class RoleItemP extends Laya.EventDispatcher {
        private _dataHash;
        private _sysItemP;
        constructor();
        private initDataHash();
        private initOne(one);
        getDataByPackage(packageType: string): RoleItemVo[];
        getDataByModule(classModule: string): RoleItemVo[];
        getDataByItemId(itemId: number): RoleItemVo;
        update(d?: any): void;
        updateOne(d?: any): void;
        updateBy(d?: any): void;
    }
    class RoleItemVo extends DataItem {
        readonly RoleItemID: number;
        readonly ItemID: number;
        readonly Nums: number;
        readonly RoleID: number;
        readonly CreateTime: number;
        readonly Name: number;
        readonly Description: number;
        readonly PackageType: string;
        readonly AvatarID: number;
        readonly Enabled: number;
        readonly Level: number;
        readonly IsNew: number;
        readonly ClassModule: string;
        updataByMode(d: object, p?: Array<string>): void;
    }
}
declare namespace zt.data {
    class SysItemP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getdataById(ItemID: number): SysItemVo;
        getDataByModule(classModule: string): SysItemVo[];
    }
    class SysItemVo extends BaseDataItem {
        readonly ItemID: number;
        readonly Name: string;
        readonly ClassModule: number;
        readonly ClassParam: any;
        readonly Description: string;
        readonly Level: number;
        readonly ClientView: number;
        readonly IsUse: number;
        readonly Stackable: number;
        readonly CanBatchUse: number;
        readonly Destroy: number;
        readonly UsingIcon: number;
        readonly UsingAnima: number;
        readonly PackageType: string;
        readonly AvatarID: number;
        readonly CommodityID: number;
        readonly DestoryMaterial: number;
        readonly Class: number;
        readonly Enabled: number;
    }
}
declare namespace zt.data {
    class SysLairGroupP {
        private _dataHash;
        constructor();
        getDataByItemId(lairGroupID: number): SysLairGroupVo;
        getDataByLvAndBattleType(Level: number, BattleType: string): SysLairGroupVo;
        initItemHash(): void;
    }
    class SysLairGroupVo extends DataItem {
        readonly LairGroupID: number;
        readonly Group: any[];
        readonly BattleType: string;
        readonly Level: Array<number>;
    }
}
declare namespace zt.data {
    class SysLairP {
        private _dataHash;
        constructor();
        getDataByItemId(lairID: number): SysLairVo;
        initItemHash(): void;
    }
    class SysLairVo extends DataItem {
        readonly LairID: number;
        readonly FactionID: number;
        readonly Name: string;
        readonly FleetList: Array<number>;
        readonly Awards: number;
        readonly AvatarID: number;
        readonly Fight: number;
        readonly Level: number;
        readonly Description: string;
        readonly Enabled: number;
    }
}
declare namespace zt.data {
    class SysMobP {
        private _dataHash;
        constructor();
        getDataByItemId(mobID: number): SysMobVo;
        initItemHash(): void;
    }
    class SysMobVo extends DataItem {
        readonly MobID: number;
        readonly Name: string;
        readonly Class: string;
        readonly Type: string;
        readonly FactionID: number;
        readonly AvatarID: number;
        readonly Attack: number;
        readonly Armor: number;
        readonly MaxHp: number;
        readonly Shield: number;
        readonly Crit: number;
        readonly CritRes: number;
        readonly CritDamageAdd: number;
        readonly CritDamageDec: number;
        readonly Hit: number;
        readonly Dodge: number;
        readonly Strength: number;
        readonly Tenacity: number;
        readonly Star: number;
        readonly Level: number;
        readonly Grade: number;
        readonly Energy: number;
        readonly MaxEnergy: number;
        readonly EnergyRestore: number;
        readonly IsMain: number;
        readonly Fight: number;
        readonly SkillList: Array<Array<number>>;
        readonly Enabled: number;
    }
}
declare namespace zt.data {
    class RoleNormalInstanceInfoP {
        private _dataHash;
        constructor();
        getData(): RoleNormalInstanceInfoVo;
        update(d?: any): void;
    }
    class RoleNormalInstanceInfoVo extends DataItem {
        readonly InstanceInfoID: number;
        readonly RoleID: number;
        FleetID: number;
        readonly FetchAllAwardChapter: number;
    }
}
declare namespace zt.data {
    class RoleNormalInstanceP {
        private _dataHash;
        _currentChapter: number;
        constructor();
        getData(ChapterID: any): RoleNormalInstanceVo;
        update(d?: any): void;
    }
    class RoleNormalInstanceVo extends DataItem {
        readonly RoleChapterID: number;
        readonly RoleID: number;
        readonly ChapterID: number;
        readonly Stars: number;
        readonly AwardsInfo: any;
        readonly PassInstanceIDList: any;
    }
}
declare namespace zt.data {
    class SysNormalInstanceChapterP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(ChapterID: number): SysNormalInstanceChapterVo;
        getDataInstance(): any;
    }
    class SysNormalInstanceChapterVo extends BaseDataItem {
        readonly ChapterID: number;
        readonly Name: number;
        readonly ParentID: number;
        readonly LastInstanceID: string;
        readonly Condition: number;
        readonly Awards: any;
    }
}
declare namespace zt.data {
    class SysNormalInstanceP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(InstanceID: number): SysNormalInstanceVo;
        getDataByChapteID(ChapterID: any): Array<any>;
    }
    class SysNormalInstanceVo extends BaseDataItem {
        readonly InstanceID: number;
        readonly Name: string;
        readonly ParentID: number;
        readonly ChapterID: number;
        readonly Lair: any;
        readonly Awards: data.Stuff;
        readonly RandDropID: number;
        readonly MarkStar: any;
        readonly Cost: any;
    }
}
declare namespace zt.data {
    class LeagueAssetLogP {
        private _dataHash;
        constructor();
        getDataByAssetLogID(LeagueAssetLogID: number): LeagueAssetLogVo;
        update(d: any): void;
    }
    class LeagueAssetLogVo extends DataItem {
        readonly LeagueAssetLogID: number;
        readonly LeagueID: number;
        readonly Type: string;
        readonly Num: number;
        readonly Mode: string;
        readonly ActionTrigger: string;
        readonly ActionParam: string;
        readonly CreateTime: number;
    }
}
declare namespace zt.data {
    class LeagueP {
        private _dataHash;
        constructor();
        getDataByLeagueID(LeagueID: number): LeagueVo;
        readonly allList: LeagueVo[];
        update(d: any): void;
        updateBy(d?: any): void;
    }
    class LeagueVo extends DataItem {
        readonly LeagueID: number;
        readonly Name: string;
        readonly Avatar: number;
        readonly Exp: number;
        readonly Level: number;
        readonly FactionID: number;
        readonly AutoJoin: number;
        readonly MinFight: number;
        readonly RequestNum: number;
        readonly MemberNum: number;
        readonly Chairman: number;
        readonly ViceChairmainList: Array<number>;
        readonly EliteList: Array<number>;
        readonly SeizeChairmanTime: number;
        readonly CandidateChairman: number;
        readonly Notice: string;
        readonly Money: number;
        readonly SignNum: number;
        readonly SignValue: number;
        readonly UpdateTime: number;
        readonly NameParams: object;
        readonly PageNum: number;
        readonly PageCount: number;
        readonly InactiveTime: number;
    }
}
declare namespace zt.data {
    class RoleLeagueAssetLogP {
        private _dataHash;
        constructor();
        getDataByAssetLogID(RoleLeagueAssetLogID: number): RoleLeagueAssetLogVo;
        update(d: any): void;
    }
    class RoleLeagueAssetLogVo extends DataItem {
        readonly RoleLeagueAssetLogID: number;
        readonly RoleID: number;
        readonly Type: string;
        readonly Num: number;
        readonly Mode: string;
        readonly ActionTrigger: string;
        readonly ActionParam: string;
        readonly CreateTime: number;
    }
}
declare namespace zt.data {
    class RoleLeagueP {
        private _dataHash;
        constructor();
        getDataByRoleID(RoleID: number): RoleLeagueVo;
        update(d: any): void;
        deleteItem(RoleID: number): void;
        updateBy(d?: any): void;
        readonly memberData: Array<RoleLeagueVo>;
    }
    class RoleLeagueVo extends DataItem {
        readonly RoleLeagueID: number;
        readonly RoleID: number;
        readonly LeagueID: number;
        readonly PrevLeagueID: number;
        readonly JoinTime: number;
        readonly Duty: string;
        readonly RequestNum: number;
        readonly Money: number;
        readonly SignParams: any;
        readonly SignValueAwardList: Array<number>;
        readonly DailyContribution: number;
        readonly TotalContribution: number;
        readonly Params: object;
        readonly UpdateTime: number;
        readonly RoleLevel: number;
        readonly IsLogin: number;
        readonly RoleName: string;
        readonly DutyID: number;
    }
}
declare namespace zt.data {
    class RoleLeagueRequestP {
        private _dataHash;
        constructor();
        getDataByRequestID(RoleLeagueRequestID: number): RoleLeagueRequestVo;
        getDataByLeagueIDAndRoleID(LeagueID: number): RoleLeagueRequestVo;
        readonly list: RoleLeagueRequestVo[];
        removeRequest(id: number, type: string): void;
        update(d: any): void;
    }
    class RoleLeagueRequestVo extends DataItem {
        readonly RoleLeagueRequestID: number;
        readonly RoleID: number;
        readonly LeagueID: number;
        readonly Name: string;
        readonly Level: number;
        readonly Fight: number;
        readonly UpdateTime: number;
        readonly PageNum: number;
        readonly PageCount: number;
    }
}
declare namespace zt.data {
    class RoleLeagueSignLogP {
        private _dataHash;
        constructor();
        getDataBySignLogID(RoleLeagueSignLogID: number): RoleLeagueSignLogVo;
        update(d: any): void;
        readonly logData: Array<RoleLeagueSignLogVo>;
    }
    class RoleLeagueSignLogVo extends DataItem {
        readonly RoleLeagueSignLogID: number;
        readonly RoleID: number;
        readonly LeagueID: number;
        readonly RoleName: string;
        readonly Type: string;
        readonly CreateTime: number;
    }
}
declare namespace zt.data {
    class SysLeagueDonateP {
        private _dataHash;
        constructor();
        getDataByItemId(DonateID: number): SysLeagueDonateVo;
        initItemHash(): void;
        readonly len: number;
    }
    class SysLeagueDonateVo extends DataItem {
        readonly DonateID: number;
        readonly Type: string;
        readonly Amount: number;
        readonly Level: number;
        readonly Awards: any;
    }
}
declare namespace zt.data {
    class SysLeagueDutyPowerP {
        private _dataHash;
        constructor();
        getDataByItemId(duty: string): SysLeagueDutyPowerVo;
        initItemHash(): void;
        readonly dutyList: Array<SysLeagueDutyPowerVo>;
    }
    class SysLeagueDutyPowerVo extends DataItem {
        readonly Duty: string;
        readonly DutyID: number;
        readonly Power: number;
    }
}
declare namespace zt.data {
    class SysLeagueFuncPowerP {
        private _dataHash;
        constructor();
        getDataByItemId(Func: string): SysLeagueFuncPowerVo;
        initItemHash(): void;
    }
    class SysLeagueFuncPowerVo extends DataItem {
        readonly Func: string;
        readonly Power: number;
        readonly Description: string;
    }
}
declare namespace zt.data {
    class SysLeagueLevelP {
        private _dataHash;
        constructor();
        getDataByItemId(Level: number): SysLeagueLevelVo;
        initItemHash(): void;
    }
    class SysLeagueLevelVo extends DataItem {
        readonly Level: number;
        readonly Condition: any;
        readonly MemberNum: number;
    }
}
declare namespace zt.data {
    class SysLeagueSignValueP {
        private _dataHash;
        constructor();
        getDataByItemId(AwardID: number): SysLeagueSignValueVo;
        initItemHash(): void;
    }
    class SysLeagueSignValueVo extends DataItem {
        readonly AwardID: number;
        readonly SignValue: number;
        readonly Awards: any;
    }
}
declare namespace zt.data {
    class SysNpcP {
        private _dataHash;
        constructor();
        getDataByItemId(NPCID: number): SysNpcVo;
        initItemHash(): void;
    }
    class SysNpcVo extends DataItem {
        readonly NPCID: number;
        readonly Sex: string;
        readonly Name: string;
        readonly AvatarID: number;
    }
}
declare namespace zt.data {
    class RoleStoryP {
        private _dataHash;
        constructor();
        getDataByChapterID(StoryChapterID: number): RoleStoryVo;
        readonly list: RoleStoryVo[];
        update(d: any): void;
    }
    class RoleStoryVo extends DataItem {
        readonly RoleStoryID: number;
        readonly RoleID: number;
        readonly StoryChapterID: number;
        readonly StoryParagraphList: Array<number>;
        readonly Params: object;
        readonly State: string;
        readonly IsCompleted: number;
        updatePos(params: any): void;
    }
}
declare namespace zt.data {
    class SysDialogGroupP {
        private _dataHash;
        constructor();
        getDataByItemId(DialogGroupID: number): SysDialogGroupVo;
        initItemHash(): void;
    }
    class SysDialogGroupVo extends DataItem {
        readonly DialogGroupID: number;
        readonly Type: string;
        readonly List: Array<number>;
    }
}
declare namespace zt.data {
    class SysDialogP {
        private _dataHash;
        constructor();
        getDataByItemId(DialogID: number): SysDialogVo;
        initItemHash(): void;
    }
    class SysDialogVo extends DataItem {
        readonly DialogID: number;
        readonly DialogGroupID: number;
        readonly Content: string;
        readonly Params: string;
        readonly Action: string;
        readonly NPCID: number;
        readonly Pos: number;
        readonly desc: string;
    }
}
declare namespace zt.data {
    class SysStoryChapterP {
        private _dataHash;
        constructor();
        getDataByItemId(StoryChapterID: number): SysStoryChapterVo;
        initItemHash(): void;
        getDataByFactionID(): SysStoryChapterVo[];
    }
    class SysStoryChapterVo extends DataItem {
        readonly StoryChapterID: number;
        readonly Name: string;
        readonly AvartarID: number;
        readonly ParentID: number;
        readonly OpenCondition: object;
        readonly SceneID: number;
        readonly ElementID: number;
        readonly StoryParagraphList: Array<number>;
        readonly Awards: Stuff;
        readonly Description: string;
        readonly FactionID: number;
        readonly OrderBy: number;
    }
}
declare namespace zt.data {
    class SysStoryParagraphP {
        private _dataHash;
        constructor();
        getDataByItemId(StoryParagraphID: number): SysStoryParagraphVo;
        initItemHash(): void;
    }
    class SysStoryParagraphVo extends DataItem {
        readonly StoryParagraphID: number;
        readonly Type: string;
        readonly Params: string;
        readonly PreviousID: number;
        readonly NextID: number;
        readonly StoryChapterID: number;
        readonly Description: object;
        readonly Auto: number;
        readonly Action: number;
        readonly url: string;
        readonly offsetX: number;
        readonly offsetY: number;
        readonly ActionParam: object;
    }
}
declare namespace zt.data {
    class SysRandDropP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(RandDropID: number): SysRandDropVo;
        getRandList(RandDropID: number): any;
    }
    class SysRandDropVo extends BaseDataItem {
        readonly RandDropID: number;
        readonly Params: string;
        readonly Description: number;
        readonly RandList: any;
    }
}
declare namespace zt.data {
    class SysRandPropertyP {
        private _dataHash;
        constructor();
        private initItemHash();
        getData(id: number): SysRandPropertyVo;
    }
    class SysRandPropertyVo extends BaseDataItem {
        readonly RandPropertyID: number;
        readonly Key: string;
        readonly ValueList: string;
        readonly Type: string;
        readonly Params: any;
    }
}
declare namespace zt.data {
    class SysRandShipEffectP {
        private _dataHash;
        constructor();
        private initItemHash();
        getData(id: number): SysRandShipEffectVo;
    }
    class SysRandShipEffectVo extends BaseDataItem {
        readonly RandEffectID: number;
        readonly TargetID: string;
        readonly TargetType: string;
        readonly Property: string;
        readonly Score: number;
        readonly Fight: number;
    }
}
declare namespace zt.data {
    class RankListP {
        private _dataHash;
        constructor();
        getDataByRoleID(Type: string): RankListVo;
        update(d: any): void;
    }
    class RankListVo extends DataItem {
        readonly RankID: number;
        readonly ExpireTime: number;
        readonly Type: string;
        readonly RankInfo: any;
    }
}
declare namespace zt.data {
    class SysRankP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(type: string): SysRankVo;
    }
    class SysRankVo extends BaseDataItem {
        readonly RankID: number;
        readonly Type: any;
        readonly Title: any;
        readonly RefreshTime: any;
        readonly IsDynUpdate: number;
        readonly RecordRange: number;
    }
}
declare namespace zt.data {
    class TimeP {
        private _dataHash;
        constructor();
        getDataByRoleID(Type: string): TimeVo;
        update(d: any): void;
        updateBy(d?: any): void;
    }
    class TimeVo extends DataItem {
        readonly RankID: number;
        readonly ExpireTime: number;
        readonly Type: string;
        readonly RankInfo: any;
    }
}
declare namespace zt.data {
    class MaterialP {
        private _dataHash;
        private _data;
        constructor();
        initItemHash(): void;
        getDataByItemId(itemId: number): MaterialVo;
        update(d?: object): void;
        updateBy(d?: any): void;
        readonly data: MaterialVo;
    }
    class MaterialVo extends DataItem {
        readonly MaterialID: number;
        readonly RoleID: number;
        readonly Metal: number;
        readonly Dili: number;
        readonly Crystal: number;
        readonly SpaceEnergy: number;
        readonly SkillPoint: number;
        readonly MetalExtend: number;
        readonly CrystalExtend: number;
        readonly DiliExtend: number;
        readonly Latiuum: number;
        update(d: any): void;
    }
}
declare namespace zt.data {
    class RoleCoinP {
        private _dataHash;
        private _data;
        constructor();
        initItemHash(): void;
        getDataByItemId(roleID: number): RoleCoinVo;
        update(d?: any): void;
        updateOne(d?: any): void;
        updateBy(d: any): void;
        readonly data: RoleCoinVo;
    }
    class RoleCoinVo extends DataItem {
        readonly RoleCoinID: number;
        readonly RoleID: number;
        readonly Points: number;
        readonly Honor: number;
        readonly Exploit: number;
        readonly Plot: number;
        update(d: any): void;
    }
}
declare namespace zt.data {
    class RoleExtendP {
        private _dataHash;
        constructor();
        readonly data: RoleExtendVo;
        update(d: any): void;
    }
    class RoleExtendVo extends DataItem {
        readonly RoleExtendID: number;
        readonly BuildUpList: Array<number>;
        readonly RoleID: number;
        readonly StoryChapter: number;
        readonly ColonyRoleFleetID: number;
        readonly ColonyDefenseNum: number;
        readonly DefenseCenterFleetID: number;
        readonly TechResearchList: Array<any>;
        readonly TechAwardList: Array<number>;
        readonly BattleReportNewCount: number;
    }
}
declare namespace zt.data {
    class RoleP {
        private _dataHash;
        private _data;
        private _addExp;
        constructor();
        readonly AddExp: number;
        initItemHash(): void;
        getDataByItemId(itemId: number): RoleVo;
        update(d?: any): void;
        readonly data: RoleVo;
    }
    class RoleVo extends DataItem {
        readonly RoleID: number;
        readonly UserID: number;
        readonly AvatarID: number;
        readonly Sex: number;
        readonly FactionID: number;
        readonly Name: string;
        readonly Level: number;
        readonly CreateDate: number;
        readonly Exp: number;
        readonly LeagueID: number;
        update(d: object): void;
    }
}
declare namespace zt.data {
    import BaseDataHash = zt.data.BaseDataHash;
    class SysRoleLevelP {
        protected _dataHash: BaseDataHash;
        constructor();
        getLength(): number;
        private initItemHash();
        getDataByItemId(level: number): SysRoleLevelVo;
    }
    class SysRoleLevelVo extends BaseDataItem {
        readonly RoleLevelID: number;
        readonly Level: number;
        readonly Exp: number;
        readonly ShipLevel: number;
        readonly FleetLevel: number;
    }
}
declare namespace zt.data {
}
declare namespace zt.data {
    import EventDispatcher = Laya.EventDispatcher;
    class ElementP extends EventDispatcher {
        private _dataHash;
        constructor();
        getDataList(): Element[];
        getData(ElementID: number): ElementVo;
        update(d?: any): void;
        private addItem(d?);
        updateItem(d?: any): void;
    }
    class ElementVo extends DataItem {
        readonly ID: number;
        readonly ElementID: number;
        readonly SceneID: number;
        readonly FactionID: number;
        readonly State: string;
        readonly Produce: string;
        readonly ResCDTime: number;
        readonly RoleID: number;
        readonly CDPremium: object;
        update(d: object): void;
    }
}
declare namespace zt.data {
    import BaseDataHash = zt.data.BaseDataHash;
    class ExploringPointP {
        protected _dataHash: BaseDataHash;
        constructor();
        private initItemHash();
        getItem(id: string): ExploringPointVo;
        getItemBy(ElementID: number): ExploringPointVo;
    }
    class ExploringPointVo extends BaseDataItem {
        readonly ExploringPointID: number;
        readonly SceneID: number;
        readonly ElementID: number;
        readonly Name: string;
        readonly AvatarID: string;
        readonly Params: any;
        readonly Level: number;
        readonly Type: string;
    }
}
declare namespace zt.data {
    import EventDispatcher = Laya.EventDispatcher;
    class RoleElementP extends EventDispatcher {
        private _dataHash;
        constructor();
        getDataList(): RoleElementVo[];
        getData(ElementID: number): RoleElementVo;
        update(d?: any): void;
        addItem(d?: any): void;
        updateItem(d?: any): void;
    }
    class RoleElementVo extends DataItem {
        readonly RoleElementID: number;
        readonly ElementID: number;
        readonly State: string;
        readonly FactionID: number;
        readonly Produce: string;
        readonly ResCDTime: number;
        readonly ResCollectTime: number;
        readonly RoleID: number;
        readonly CDPremium: object;
        update(d: object): void;
    }
}
declare namespace zt.data {
    import EventDispatcher = Laya.EventDispatcher;
    class RoleSceneFogP extends EventDispatcher {
        private _dataHash;
        constructor();
        readonly list: RoleSceneVo[];
        getData(SceneID: number): RoleSceneFogVo;
        getIsUnlock(SceneID: number, SceneFogID: number): boolean;
        update(d?: any): void;
        addItem(d?: any): void;
        updateItem(d?: any): void;
    }
    class RoleSceneFogVo extends DataItem {
        SceneID: number;
        OpenList: string;
        readonly OpenListObj: number[];
    }
}
declare namespace zt.data {
    import EventDispatcher = Laya.EventDispatcher;
    class RoleSceneP extends EventDispatcher {
        private _dataHash;
        constructor();
        getDataList(): RoleSceneVo[];
        getData(SceneID: number): RoleSceneVo;
        getUnlock(RoleExploringPointID: number): boolean;
        update(d?: any): void;
        addItem(d?: any): void;
        updateItem(d?: any): void;
    }
    class RoleSceneVo extends DataItem {
        sceneID: number;
        readonly LockWeight: number;
        readonly OpenList: string;
        readonly ExploringOpenList: string;
        readonly OpenListObj: number[];
        readonly ExploringPointID: string;
    }
}
declare namespace zt.data {
    import BaseDataHash = zt.data.BaseDataHash;
    class SysFogP {
        protected _dataHash: BaseDataHash;
        private _hash;
        constructor();
        getDataBy(ElementID: number): SysFogVo;
        getSceneFogIDBy(ElementID: number): number;
        readonly list: SysFogVo[];
        getData(SceneFogID: number): SysFogVo;
        getDataBySceneAreaID(sceneAreaID: number): SysFogVo;
    }
    class SysFogVo extends BaseDataItem {
        sceneFogID: number;
        elementList: number[];
        readonly Params: object;
        readonly ElementListObj: number[];
    }
}
declare namespace zt.data {
    import BaseDataHash = zt.data.BaseDataHash;
    class SysSceneAreaAwardP {
        protected _dataHash: BaseDataHash;
        private _hash;
        constructor();
        getData(SceneAreaID: number): SysSceneAreaAwardVo[];
    }
    class SysSceneAreaAwardVo extends BaseDataItem {
        readonly AwardID: number;
        readonly SceneAreaID: number;
        readonly LockWeight: number;
        readonly Awards: object;
    }
}
declare namespace zt.data {
    import BaseDataHash = zt.data.BaseDataHash;
    import Rectangle = Laya.Rectangle;
    class SysSceneAreaP {
        protected _dataHash: BaseDataHash;
        private _hash;
        private _sceneAreaList;
        private _sceneCenterList;
        private _centerObj;
        private _rectObj;
        constructor();
        getData(SceneAreaID: number): SysSceneAreaVo;
        getAreaList(sceneID: number): SysSceneAreaVo[];
        getCenterArea($centerElementID: number): SysSceneAreaVo;
        getCenterAreaRect($elementID: number): Rectangle;
        getSceneAreaByElement($sceneID: number, element: number): SysSceneAreaVo;
        getCenterElementByScene(sceneID: number): number[];
    }
    class SysSceneAreaVo extends BaseDataItem {
        readonly SceneAreaID: number;
        readonly SceneID: number;
        readonly CenterElementID: number;
        readonly Name: number;
        readonly ElementList: number[];
        readonly Level: number;
        readonly FogList: number;
        readonly LockWeight: number;
        readonly Size: number;
    }
}
declare namespace zt.data {
    import BaseDataHash = zt.data.BaseDataHash;
    class SysSceneGuideP {
        protected _dataHash: BaseDataHash;
        private _hash;
        constructor();
        getData(GuideID: number): SysSceneGuideVo;
        getDataByScene(SceneID: number): SysSceneGuideVo[];
    }
    class SysSceneGuideVo extends BaseDataItem {
        readonly GuideID: number;
        readonly From: number;
        readonly To: number;
        readonly RoleLevel: string;
        readonly SceneID: string;
    }
}
declare namespace zt.data {
    import BaseDataHash = zt.data.BaseDataHash;
    class SysScenePathP {
        protected _dataHash: BaseDataHash;
        private _hash;
        constructor();
        readonly list: SysScenePathVo[];
        getDataBy(from: number): SysScenePathVo;
    }
    class SysScenePathVo extends BaseDataItem {
        readonly From: number;
        readonly To: number;
    }
}
declare namespace zt.data {
    class ServerP {
        private _data;
        constructor(data?: object);
        initUserInfo(d: object): void;
        update(d?: object): void;
    }
    class ServerVo extends DataItem {
        readonly SystemTime: number;
        readonly Timezone: string;
        readonly StartTime: number;
    }
}
declare namespace zt.data {
    class RolePartP extends Laya.EventDispatcher {
        private _dataHash;
        constructor();
        private getData(RolePartID);
        filterData(partID: number, shipID: number): RolePartVo;
        update(d?: any): void;
    }
    class RolePartVo extends DataItem {
        readonly RolePartID: number;
        partID: number;
        grade: number;
        level: number;
        readonly nextLevel: number;
        shipID: number;
        levelFight: number;
        gradeFight: number;
        update(d: any): void;
    }
}
declare namespace zt.data {
    class RoleShipP extends Laya.EventDispatcher {
        private _dataHash;
        private _sysShipP;
        constructor();
        readonly list: RoleShipVo[];
        getListByRoleID(roleId: number): Array<RoleShipVo>;
        getDataByItemId(ShipID: number): RoleShipVo;
        initItemHash(): void;
        private initOne(vo);
        update(d?: any): void;
        updateBy(d?: any): void;
    }
    class RoleShipVo extends DataItem {
        readonly RoleShipID: number;
        readonly RoleID: number;
        readonly ShipID: number;
        readonly Nums: number;
        readonly Level: number;
        readonly Exp: number;
        readonly Grade: number;
        readonly Star: number;
        readonly StarHoleList: number[];
        readonly PropertyList: string;
        readonly RoleFleetID: number;
        readonly PartFight: number;
        readonly CreateTime: number;
        readonly AvatarID: number;
        readonly Name: string;
        readonly Attack: number;
        readonly MaxHp: number;
        readonly Armor: number;
        readonly Shield: number;
        readonly Crit: number;
        readonly CritRes: number;
        readonly CritDamageAdd: number;
        readonly CritDamageDec: number;
        readonly Strength: number;
        readonly Tenacity: number;
        readonly Hit: number;
        readonly Dodge: number;
        readonly Speed: number;
        readonly Fighting: number;
        update(d: any): void;
        updateBy(d?: any): void;
    }
}
declare namespace zt.data {
    class SysPartGradeP {
        private _dataHash;
        constructor();
        getData(partID: number, grade: number): SysPartGradeVo;
    }
    class SysPartGradeVo extends BaseDataItem {
        partGradeID: number;
        partID: number;
        grade: number;
        readonly Cost: Stuff;
        fight: number;
        factor: number;
    }
}
declare namespace zt.data {
    class SysPartLevelP {
        private _dataHash;
        constructor();
        getData(partID: number, level: number): SysPartLevelVo;
    }
    class SysPartLevelVo extends BaseDataItem {
        partLevelID: number;
        partID: number;
        level: number;
        readonly Cost: Stuff;
        propertyList: PropertyList;
        fight: number;
        shipLevel: number;
    }
}
declare namespace zt.data {
    class SysPartP {
        private _dataHash;
        constructor();
        getData(PartID: number): SysPartVo;
    }
    class SysPartVo extends BaseDataItem {
        partID: number;
        maxLevel: number;
        maxGrade: number;
        avatarID: number;
        type: string;
    }
}
declare namespace zt.data {
    class SysPropertyP {
        private _dataHash;
        constructor();
        getdataById(Property: string): SysPropertyVo;
        list(): SysPropertyVo[];
    }
    class SysPropertyVo extends BaseDataItem {
        readonly Property: string;
        valueType: string;
        viewType: string;
        class: string;
    }
}
declare namespace zt.data {
    class SysShipGradeP {
        private _dataHash;
        constructor();
        getData(keyId: number): SysShipGradeVo;
        readonly list: any[];
    }
    class SysShipGradeVo extends BaseDataItem {
        readonly Grade: number;
        readonly Cost: Stuff;
        propertyList: PropertyList;
        fight: number;
    }
}
declare namespace zt.data {
    class SysShipLevelP {
        private _dataHash;
        constructor();
        getdataById(keyId: number): SysShipLevelVo;
        readonly maxLevel: number;
        getdataByRoleLevel(roleLevel: any): SysShipLevelVo[];
        getDataByShipLevel(level: any): SysShipLevelVo;
        getDataByShipExp(exp: any): SysShipLevelVo;
    }
    class SysShipLevelVo extends BaseDataItem {
        readonly ShipLevelID: number;
        readonly Exp: number;
        readonly Level: number;
    }
}
declare namespace zt.data {
    class SysShipP {
        private _dataHash;
        constructor();
        readonly list: SysShipVo[];
        readonly displayableShips: SysShipVo[];
        getdataById(keyId: number): SysShipVo;
    }
    class SysShipVo extends BaseDataItem {
        readonly ShipID: number;
        grade: number;
        star: number;
        readonly Fight: number;
        readonly AvatarID: number;
        readonly Name: string;
        readonly FactionID: number;
        readonly CanBuild: number;
        readonly Cost: data.Stuff;
        readonly Time: number;
        readonly PartList: number[];
        readonly Attack: number;
        readonly MaxHp: number;
        readonly Armor: number;
        readonly Shield: number;
        readonly Crit: number;
        readonly CritDamageAdd: number;
        readonly CritRes: number;
        readonly CritDamageDec: number;
        readonly Hit: number;
        readonly Dodge: number;
        readonly Strength: number;
        readonly Tenacity: number;
        readonly Enabled: number;
        readonly AttackFactor: number;
        readonly ArmorFactor: number;
        readonly MaxHpFactor: number;
        readonly ShieldFactor: number;
        readonly SkillList: Array<number>;
        getPropertyByTypeAndLv(type: string, level: number): number;
    }
}
declare namespace zt.data {
    class SysShipResearchP {
        private _dataHash;
        constructor();
        getdata(ShipID: number): SysShipResearchVo;
    }
    class SysShipResearchVo extends BaseDataItem {
        readonly ShipResearchID: number;
        readonly ShipID: number;
        readonly Building: number;
        readonly Cost: data.Stuff;
        readonly Condition: data.Condition;
        showCodition: any;
    }
}
declare namespace zt.data {
    class SysShipStarP {
        private _dataHash;
        constructor();
        getData(ShipID: number, Star: number): SysShipStarVo;
        getDataByShipID(ShipID: number): SysShipStarVo[];
    }
    class SysShipStarVo extends BaseDataItem {
        private _HoleListCache;
        readonly StarID: number;
        readonly ShipID: number;
        star: number;
        readonly HoleList: {
            [key: string]: Stuff;
        };
        getHole(pos: number): Stuff;
        readonly HoleEffect: data.PropertyListHash;
        propertyList: PropertyList;
        fight: number;
    }
}
declare namespace zt.data {
    class RoleSkillP {
        private _dataHash;
        constructor();
        getDataByItemId(roleSkillID: number): RoleSkillVo;
        getDataBySkillID(SkillID: number): RoleSkillVo;
        initItemHash(): void;
        update(d?: any): void;
    }
    class RoleSkillVo extends DataItem {
        readonly RoleSkillID: number;
        readonly RoleID: number;
        readonly SkillID: number;
        readonly Level: number;
        update(d: any): void;
    }
}
declare namespace zt.data {
    class SysSkillLevelP {
        private _dataHash;
        constructor();
        getDataBySkillIdAndLevel(skillID: number, level: number): SysSkillLevelVo;
        initItemHash(): void;
    }
    class SysSkillLevelVo extends DataItem {
        readonly SkillID: number;
        readonly Level: number;
        readonly Values: Array<number>;
        readonly Effects: object;
        readonly Cost: Stuff;
        readonly OpenCondition: any;
        readonly Fight: number;
    }
}
declare namespace zt.data {
    class SysSkillP {
        private _dataHash;
        constructor();
        getDataByItemId(skillID: number): SysSkillVo;
        initItemHash(): void;
    }
    class SysSkillVo extends DataItem {
        readonly SkillID: number;
        readonly Name: string;
        readonly AvatarID: number;
        readonly Type: string;
        readonly FunctionType: string;
        readonly OwnerType: string;
        readonly MaxLevel: number;
        readonly EnCost: number;
        readonly SkillMode: number;
        readonly TargetSelector: string;
        readonly PlayTime: number;
        readonly EffectTemplate: string;
        readonly Description: string;
        readonly Enabled: number;
    }
}
declare namespace zt.data {
    class SysFuncOpenP {
        private _dataHash;
        constructor();
        getList(): object;
        getdataById(keyId: string): SysFuncOpenVo;
    }
    class SysFuncOpenVo extends BaseDataItem {
        readonly FuncOpenID: number;
        readonly Module: string;
        readonly Condition: object;
        readonly AvatarID: number;
        readonly IsClient: number;
        readonly Enabled: number;
    }
}
declare namespace zt.data {
    import EventDispatcher = Laya.EventDispatcher;
    class RoleScenetaskP extends EventDispatcher {
        private _dataHash;
        private _sceneTaskVo;
        constructor();
        update(d: object): void;
        readonly data: RoleScenetaskVo;
    }
    class RoleScenetaskVo extends DataItem {
        roleID: number;
        readonly LiveAwardList: string;
        readonly AwardList: any[];
        readonly SceneTaskNums: number;
        readonly UpdateTime: number;
    }
}
declare namespace zt.data {
    import EventDispatcher = Laya.EventDispatcher;
    class RoleScenetaskPoolP extends EventDispatcher {
        private _dataHash;
        constructor();
        getSceneTaskList(): RoleScenetaskPoolVo[];
        update(d: object): void;
    }
    class RoleScenetaskPoolVo extends DataItem {
        readonly RoleSceneTaskPoolID: number;
        readonly RoleID: number;
        readonly TaskPoolID: number;
        readonly TaskIDList: object;
        readonly IngRoleTaskID: number;
        readonly ElementID: number;
        readonly SceneID: number;
        readonly CreateTime: number;
        readonly ExpireTime: number;
        readonly Params: object;
    }
}
declare namespace zt.data {
    import BaseDataHash = zt.data.BaseDataHash;
    class SysSceneTaskP {
        protected _dataHash: BaseDataHash;
        constructor();
        getItem(id: number): ITask;
        TitleTxt(id: number): string;
    }
    class SysSceneTaskPoolVo extends BaseDataItem {
    }
}
declare namespace zt.data {
    class RoleTechP {
        private _dataHash;
        constructor();
        getDataByItemId(TechID: number): RoleTechVo;
        initItemHash(): void;
        getCountLvByType(Type: string): number;
        getByType(Type: string): any;
        update(d?: any): void;
    }
    class RoleTechVo extends DataItem {
        readonly RoleTechID: number;
        readonly RoleID: number;
        readonly TechID: number;
        readonly Level: number;
        readonly Type: string;
        update(d: any): void;
    }
}
declare namespace zt.data {
    class SysTechAwardP {
        private _dataHash;
        constructor();
        getDataByItemId(TechAwardID: number): SysTechAwardVo;
        getDataByLevel(TotalLevel: number): SysTechAwardVo;
        getListByType(Type: string): SysTechAwardVo[];
        initItemHash(): void;
    }
    class SysTechAwardVo extends DataItem {
        readonly TechAwardID: number;
        readonly TotalLevel: number;
        readonly Awards: data.Stuff;
        readonly Type: string;
    }
}
declare namespace zt.data {
    class SysTechLevelP {
        private _dataHash;
        constructor();
        getDataByItemId(TechID: number, Level: number): SysTechLevelVo;
        getListByTechID(TechID: number): SysTechLevelVo[];
        initItemHash(): void;
        maxLevel(TechID: number): number;
    }
    class SysTechLevelVo extends DataItem {
        readonly TechLevelID: number;
        readonly TechID: number;
        readonly Level: number;
        readonly Cost: data.Stuff;
        readonly Condition: object;
        readonly TotalLevel: number;
        readonly Effect: Array<Array<number>>;
        readonly EventTime: number;
    }
}
declare namespace zt.data {
    class SysTechP {
        private _dataHash;
        constructor();
        getDataByItemId(TechID: number): SysTechVo;
        initItemHash(): void;
        getDataByType(Type: string): SysTechVo[];
        getDataByTypeAndPos(Type: string, Pos: Array<number>): SysTechVo;
    }
    class SysTechVo extends DataItem {
        readonly TechID: number;
        readonly Name: string;
        readonly Type: string;
        readonly AvatarID: number;
        readonly Pos: Array<number>;
        readonly Enabled: number;
        readonly Description: string;
        readonly AssociatPos: Array<Array<number>>;
    }
}
declare namespace zt.data {
    class UserP {
        private _data;
        constructor(data?: object);
        initUserInfo(d: object): void;
        update(d?: object): void;
        readonly UserID: number;
        readonly Type: string;
        readonly RoleID: number;
        readonly Status: string;
        readonly IsAdult: number;
        readonly PlatName: string;
        readonly Recomment: number;
        readonly userVo: UserVo;
    }
    class UserVo extends DataItem {
        readonly UserID: number;
        readonly Type: string;
        readonly RoleID: number;
        readonly Status: string;
        readonly IsAdult: number;
        readonly PlatName: string;
        readonly Recomment: number;
    }
}
declare namespace zt.data {
    class RoleVipP {
        private _dataHash;
        constructor();
        getData(): RoleVipVo;
        update(d: any): void;
    }
    class RoleVipVo extends DataItem {
        readonly RoleVipID: number;
        readonly RoleID: number;
        readonly Level: number;
        readonly Points: number;
        readonly GiftIDList: any;
    }
}
declare namespace zt.data {
    class SysVipGiftP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(Level: number): SysVipGiftVo;
    }
    class SysVipGiftVo extends BaseDataItem {
        readonly VipGiftID: number;
        readonly Level: number;
        readonly Awards: any;
        readonly Price: number;
        readonly ShowPrice: number;
    }
}
declare namespace zt.data {
    class SysVipLevelP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(Level: number): SysVipLevelVo;
        readonly maxLevel: number;
    }
    class SysVipLevelVo extends BaseDataItem {
        readonly VipLevelID: number;
        readonly Level: number;
        readonly Points: number;
        readonly PrivilegeList: any;
    }
}
declare namespace zt.data {
    class SysVipPrivilegeP {
        private _dataHash;
        constructor();
        initItemHash(): void;
        getData(type: string): SysVipPrivilegeVo;
        readonly maxLevel: number;
        readonly data: any;
    }
    class SysVipPrivilegeVo extends BaseDataItem {
        readonly PrivilegeID: number;
        readonly Type: any;
        readonly Description: string;
        readonly Mode: any;
        readonly OrderBy: number;
        readonly Enable: number;
        readonly Class: string;
    }
}
declare namespace zt.prepare.guide {
    class PrepareGuide extends PrepareItem {
        private NAME;
        constructor();
        protected init(): void;
        start(): void;
    }
}
declare namespace zt.prepare.res {
    class PrepareLang extends PrepareItem {
        constructor();
        start(): void;
    }
}
declare namespace zt.prepare.res {
    class PrepareSettings extends PrepareItem {
        private _oprHash;
        private _funcs;
        private _paramList;
        constructor();
        start(): void;
        private parseFormula(client_settings);
        private sortOnID($a, $b);
        private getParamList(obj);
        private formatByOpr(str);
    }
}
declare namespace zt.prepare.res {
    class PrepareStaticData extends PrepareItem {
        private _zip;
        private static NAME;
        private _counter;
        protected init(): void;
        start(): void;
        private onZipLoad();
        private getSuccessFn(key);
        private _datas;
        private addText(key, text);
        protected complete(): void;
    }
}
declare namespace zt.prepare.role {
    class PrepareCreateRole extends PrepareItem {
        start(): void;
        private onSuccess(data);
        private onError(data);
    }
}
declare namespace zt.prepare.socket {
    class PrepareSocket extends PrepareItem {
        constructor();
        start(): void;
        private onConnected();
        private request_getwayapp();
        private onGATEWAYAPP_callback(buffer);
        private error();
        private connect_getway();
        private onConnected_getway();
        private loginGame();
        private cb_gameLogin(buffer);
        private HEART_INTERVAL;
        private sendHeart();
    }
}
declare namespace zt.prepare.ui {
    class PrepareAmf extends PrepareItem {
        private static NAME;
        constructor();
        start(): void;
        protected init(): void;
    }
}
declare namespace zt.prepare.ui {
    class PrepareDefaultScene extends PrepareItem {
        private static NAME;
        constructor();
        start(): void;
        init(): void;
        private readonly name;
    }
}
declare namespace zt.prepare.ui {
    class PrepareGUI extends PrepareItem {
        private static NAME;
        constructor();
        protected init(): void;
        start(): void;
    }
}
declare namespace zt.prepare.ui {
    class PreparePlayGround extends PrepareItem {
        private static NAME;
        constructor();
        start(): void;
    }
}
declare namespace zt.prepare.ui {
    class PrepareUILib extends PrepareItem {
        constructor();
        start(): void;
        protected init(): void;
    }
}
declare namespace zt {
    import GButton = fairygui.GButton;
    import Handler = laya.utils.Handler;
    class BasePageView {
        private _isLoop;
        private _totalPageNum;
        private _currNum;
        private _callback;
        private _prevBtn;
        private _nextBtn;
        private _firstBtn;
        private _lastBtn;
        private _pageTxt;
        private _pageObj;
        constructor(prevBtn: GButton, nextBtn: GButton, callback?: Handler, pageObj?: any, leapObj?: any, isLoop?: boolean);
        private init();
        setData(totalPageNum: number, showPage?: number): void;
        showPage(index: number): void;
        updatePage(totalPageNum: number, currentNum: number): void;
        private setPageState();
        private showPageTxt();
        private initView();
        private initEvent();
        private removeEvent();
        private onClickFirstBtn();
        private onClickLastBtn();
        private onClickPrevBtn();
        private onClickNextBtn();
        dispose(): void;
    }
}
declare namespace zt {
    import GButton = fairygui.GButton;
    import GTextInput = fairygui.GTextInput;
    import Handler = laya.utils.Handler;
    class NumSelectView {
        private _num;
        private _basePageView;
        private _numTxt;
        private _callback;
        constructor(prevBtn: GButton, nextBtn: GButton, numTxt: GTextInput, callback?: Handler, leapObj?: any);
        setData(pageNum: number, showPage?: number): void;
        showPage(index: number): void;
        private initEvent();
        private removeEvent();
        private onBlur(e);
        private onInputNum(e);
        private onChangeNum(num);
        dispose(): void;
    }
}
declare namespace zt {
    import GList = fairygui.GList;
    import GButton = fairygui.GButton;
    import Handler = Laya.Handler;
    class PageListView {
        private _currNum;
        private _listView;
        private _renderCallback;
        private _pageView;
        constructor(listView: GList, renderCallback: Handler, prevBtn: GButton, nextBtn: GButton);
        setData(num: number): void;
        private initUI();
        private initEvent();
        private onChangePage(num);
        private onScroll();
    }
}
declare namespace zt {
    import GComponent = fairygui.GComponent;
    import SysElementVo = zt.data.SysElementVo;
    class ActionGroup extends GComponent {
        private static _ins;
        private _btn_1;
        private _btn_2;
        private _btn_3;
        private _showTran;
        private _hideTran;
        private _data;
        private _actionList;
        private _actionHandle;
        private _actionTarget;
        constructor();
        constructFromXML(xml: Object): void;
        static readonly ins: ActionGroup;
        show($parent: any, $data: SysElementVo, $actions: string[], $handler: object): void;
        private showActionList();
        addEvent(): void;
        private clickAction1(e);
        private clickAction2(e);
        private clickAction3(e);
        private clickActionGroup(e);
        private clickTarget($target);
        hide(): void;
        private remove();
        private disposeHandle();
    }
}
declare namespace zt {
    import SysElementVo = zt.data.SysElementVo;
    import EventVo = zt.data.EventVo;
    class CrossFlight {
        private static _instance;
        private _effectList;
        private _effectEndList;
        private _effectTxtList;
        private _container;
        constructor(container: Sprite);
        add(evt: data.EventVo): void;
        addAll(): void;
        private removeAll();
        remove(executorID: number): void;
        showLoopEffect(target: SysElementVo, fleetID: number): void;
        completeEvent(event: EventVo): void;
        crossScene(event: EventVo): void;
        dispose(): void;
    }
}
declare namespace zt {
    import Sprite = Laya.Sprite;
    import Event = Laya.Event;
    import SysElementVo = zt.data.SysElementVo;
    import Effect = zt.effects.Effect;
    class ElementNode extends Sprite {
        static ANIMATION_SPEED: number;
        static UNLOCK_SPEED: number;
        protected _effect: Effect;
        protected _texW: number;
        protected _texH: number;
        protected _interval: number;
        protected _response: Sprite;
        protected _sysData: SysElementVo;
        constructor();
        protected addEvent(): void;
        protected removeEvent(): void;
        private readonly url;
        needUnLock(): boolean;
        readonly isUnLock: boolean;
        protected onMouseEvent(e: Event, posTarget?: any): void;
        protected loadPlanet(): void;
        protected resetTexture(): void;
        protected load(): void;
        protected onload(): void;
        clear(): void;
        readonly sysData: SysElementVo;
        readonly textureW: number;
        readonly textureH: number;
    }
}
declare namespace zt {
    import Sprite = laya.display.Sprite;
    class FlyTimeItem extends UIBase {
        private _progressBar;
        private _txt;
        private _totalTime;
        private _surpTime;
        private _surpTime2;
        private _x;
        private _y;
        constructor();
        init(): void;
        update(totalTime?: number): void;
        updateTime(): void;
        readonly width: number;
        readonly displayObject: Sprite;
        x: number;
        y: number;
        dispose(): void;
    }
}
declare namespace zt {
    import GComponent = fairygui.GComponent;
    import Handler = Laya.Handler;
    class LootCDItem extends GComponent {
        private _controller;
        private _txt_timer;
        private _roleColony;
        private _cdTotalTime;
        private _tip_con;
        private _elementID;
        private _type;
        private cdHandler;
        constructor();
        constructFromXML(xml: object): void;
        private removeEvent();
        private addEvent();
        private onmouse();
        setData($type: string, $timer: number, $elementID: number, $cdHandler?: Handler): void;
        private updateTimer();
        clear(): void;
        dispose(): void;
    }
}
declare namespace zt {
    import GComponent = fairygui.GComponent;
    import GTextField = fairygui.GTextField;
    import Controller = fairygui.Controller;
    import SysElementVo = zt.data.SysElementVo;
    import GButton = fairygui.GButton;
    import Sprite = Laya.Sprite;
    class PlanetName {
        protected _ui: GComponent;
        protected _data: SysElementVo;
        protected _controller1: Controller;
        protected _controller2: Controller;
        protected _sceneX: number;
        protected _sceneY: number;
        protected _txt_name: GTextField;
        protected _txt_Pos: GTextField;
        protected _parentContainer: Sprite;
        protected _prePlanetUIName: string;
        protected _btn_task: GButton;
        constructor();
        setData(sysElement: SysElementVo, $parent: Sprite): void;
        protected draw(): void;
        readonly isFogUnlock: boolean;
        updatePlanetName(): void;
        dispose(): void;
        protected clearUI(): void;
        clear(): void;
        protected onOpenBounty(): void;
        readonly ui: GComponent;
        x: number;
        y: number;
        protected readonly planetNameByClass: string;
    }
}
declare namespace zt {
    import Sprite = laya.display.Sprite;
    import ElementVo = zt.data.SysElementVo;
    import PathLine = zt.PathLine;
    import Point = Laya.Point;
    import PathTarget = zt.PathTarget;
    import Effect = zt.effects.Effect;
    class ShipItem extends Sprite {
        static ANIMATION_SPEED: number;
        protected _end: Point;
        protected _start: Point;
        protected _type: string;
        protected _path: PathLine;
        protected _xoffset: number;
        protected _yoffset: number;
        protected _swidth: number;
        protected _sheight: number;
        protected _shipEfect: Effect;
        protected _data: IRoleFleet;
        protected _target: PathTarget;
        protected _flyItem: FlyTimeItem;
        constructor();
        build(): void;
        flight(from: ElementVo, to: ElementVo, total: number, left: number): void;
        getPos(from: ElementVo, to: ElementVo, total: number, left: number): IPoint;
        startFlight(to: ElementVo, total: number): void;
        protected tweenUpdate(d: any): void;
        stopFlight(from: ElementVo): void;
        highlight(): void;
        unhighlight(): void;
        setData(val: IRoleFleet, xoffset: number, yoffset: number): void;
        protected loadShip(form: any, to: any): void;
        protected startLoad(index?: number): void;
        readonly width: number;
        readonly height: number;
        private resetShipWidth();
        readonly swidth: number;
        readonly sheight: number;
        protected clearShipCon(): void;
        protected showTarget(): void;
        protected hideTarget(): void;
        dispose(): void;
        readonly data: IRoleFleet;
        readonly path: PathLine;
        readonly target: PathTarget;
        type: string;
        readonly flyItem: FlyTimeItem;
        hideFlyItem(): void;
        private showFlyItem(flyTime);
    }
    interface IRoleFleet {
        FleetID: number;
        Speed: number;
    }
}
declare namespace zt.event {
    class AProxy {
        getList(): any[];
        checkLock(index: number): any;
        checkStart(params: object): boolean;
        getLockList(eventName: string): any;
        statr(params: object): void;
        cancel(params: object): void;
        accelerate(params: object): void;
    }
}
declare namespace zt.event {
    class AlchemyE extends AProxy {
        static Event_Name: string;
        private _eventList;
        checkStart(params: object): boolean;
        start(params: object): object;
        getList(): data.EventVo[];
    }
}
declare namespace zt.event {
    class BuildUpE extends AProxy {
        static Event_Name: string;
        private _eventList;
        private _eventP;
        private _materialP;
        private static _sysEventP;
        constructor();
        getList(): data.EventVo[];
        checkLock(index: number): {
            'OpenMes': string;
        };
        start(params: object): object;
        checkStart(params: any): boolean;
        static eventOpenNum(): number;
        private static readonly buildFreeNum;
        private static readonly roleCoinNum;
        private static readonly sysEventP;
        private isEnergyEnough(buildId);
        private isMaxLevel(buildId);
        private isBuildCondition(buildId);
        private isCostCondition(buildId);
    }
}
declare namespace zt.event {
    class FleetCreateE extends AProxy {
        static Event_Name: string;
        private _eventList;
        start(params: object): object;
        cancel(): void;
        accelerate(): void;
    }
}
declare namespace zt.event {
    class FleetRepairE extends AProxy {
        static Event_Name: string;
        private _eventList;
        start(params: object): object;
        cancel(): void;
        accelerate(): void;
    }
}
declare namespace zt.event {
    class FlightE extends AProxy {
        static Event_Name: string;
        private _eventList;
        start(params: object): object;
        cancel(): void;
        accelerate(): void;
    }
}
declare namespace zt.event {
    class GatherE extends AProxy {
        private _eventList;
        start(params: object): object;
        cancel(): void;
        accelerate(params: object): object;
    }
}
declare namespace zt.event {
    class ShipCreateE extends AProxy {
        static Event_Name: string;
        private sysEventP;
        private _eventList;
        getList(): data.EventVo[];
        checkLock(index: number): any;
        start(params: object): object;
    }
}
declare namespace zt.event {
    class TechResearchE extends AProxy {
        static Event_Name: string;
        private _eventList;
        getList(): data.EventVo[];
        checkLock(index: number): {
            'OpenMes': any;
        };
        start(params: object): object;
    }
}
