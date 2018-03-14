var zt;
(function (zt) {
    var Start = (function () {
        function Start() {
            Laya.init(1200, 900, Laya.WebGL);
            Laya.Stat.show();
            var scaleMode = Laya.Browser.window.screen.width < 1600 ? "showall" : "full";
            Laya.stage.scaleMode = scaleMode;
            Laya.stage.on(Laya.Event.CLICK, this, this.playEffect);
        }
        Start.prototype.playEffect = function () {
            var url = 'fight/attack/1.json';
            url = zt.utils.getResourceURL(url);
            var x = Laya.stage.mouseX;
            var y = Laya.stage.mouseY;
            var length = 800 * Math.max(Math.random(), 0.3);
            var isContray = Math.random() > 0.5 ? true : false;
            var angle = isContray ? 154 : -26;
            var angleRadius = angle / 180 * Math.PI;
            var offsetY = 110 * Math.cos(angleRadius);
            var offsetX = 110 * Math.sin(angleRadius);
            y = y - offsetY;
            x = x + offsetX;
            var ani = zt.effects.createSkillEffect(url, x, y, isContray, length, Laya.stage, true);
            ani.playEffect(60, false, Laya.BlendMode.ADD);
        };
        return Start;
    }());
    zt.Start = Start;
})(zt || (zt = {}));

//# sourceMappingURL=start.js.map
