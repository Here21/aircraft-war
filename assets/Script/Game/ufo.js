cc.Class({
    extends: cc.Component,

    properties: {
        speedMax: 0,
        speedMin: 0,
        getUfoSound: {
            default: null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function () {
        // 速度随机[speedMax, speedMin]
        this.speed = Math.random() * (this.speedMax - this.speedMin + 1) + this.speedMin;

        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },
    //碰撞检测
    onCollisionEnter: function(other, self){
        cc.audioEngine.play(this.getUfoSound);
        this.ufoGroup.destroyUfo(this.node);
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.y -= dt * this.speed;
        //出屏幕后
        if (this.node.y < -this.node.parent.height / 2) {
            this.ufoGroup.destroyUfo(this.node);
        }
    },
});
