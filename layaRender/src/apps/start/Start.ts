namespace zt
{
    export class Start
    {
        constructor()
        {
            Laya.init(1200, 768,Laya.WebGL);
            Laya.Stat.show();
            const scaleMode = Laya.Browser.window.screen.width < 1600 ? "showall":"full";
            Laya.stage.scaleMode = scaleMode;
            Laya.stage.on(Laya.Event.CLICK,this,this.playEffect);
        }

        public playEffect():void
        {
            let url:string = 'fight/attack/1.json';
            url = zt.utils.getResourceURL(url);
            let x:number = Laya.stage.mouseX ;
            let y:number = Laya.stage.mouseY ;
            const length:number = 800 * Math.max(Math.random(),0.3);
            let isContray = Math.random() > 0.5 ? true : false;
            let angle:number = isContray ?  154:-26;
            const angleRadius =  angle/180* Math.PI;
            const offsetY= 110*Math.cos(angleRadius);
            const offsetX = 110*Math.sin(angleRadius);

            y = y - offsetY;
             x = x + offsetX;
            
            const ani:zt.effects.SkillEffect = zt.effects.createSkillEffect(url,x,y,isContray,length,Laya.stage,true);
            ani.playEffect(60,false,Laya.BlendMode.ADD);
        }
        
    }
}
