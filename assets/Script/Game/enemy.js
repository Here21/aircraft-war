cc.Class({
    extends: cc.Component,

    properties: {
        HP: {
            default: 0,
            type: cc.Integer,
            tooltip: '敌机血量',
        },
        speedMax: 0,
        speedMin: 0,
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
        if (other.node.group !== 'bullet') {
            return;
        }
        if (this.HP === 0) {
            this.HP--;
            let anim = this.getComponent(cc.Animation);
            let animName = this.node.name + '_exploding';
            anim.play(animName);
            anim.on('finished',  this.onHandleDestroy, this);
            return;
        }
        if (this.HP > 0) {
            this.HP--;
        }
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.y -= dt * this.speed;
    },
    onHandleDestroy: function () {
        // Demo中零时使用，后续要使用对象池，参考bullet
        this.node.destroy();
    }
});
