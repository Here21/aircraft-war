cc.Class({
    extends: cc.Component,

    properties: {
        score: {
            default: 0,
            type: cc.Integer,
            tooltip: '敌机分数',
        },
        HP: {
            default: 0,
            type: cc.Integer,
            tooltip: '敌机血量',
        },
        speedMax: 0,
        speedMin: 0,
        initSpriteFrame: {
            default: null,
            type: cc.SpriteFrame,
            tooltip: '初始化图像'
        },
        explosionSound: {
            default: null,
            url: cc.AudioClip
        },
    },

    // use this for initialization
    onLoad: function () {
        // 速度随机[speedMax, speedMin]
        this.speed = Math.random() * (this.speedMax - this.speedMin + 1) + this.speedMin;
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        this.enemyInit();
    },
    enemyInit: function () {
        this.enemyHp = this.HP;
        // 找到node的Sprite组件
        let nSprite = this.node.getComponent(cc.Sprite);
        // 初始化spriteFrame
        if (nSprite.spriteFrame != this.initSpriteFrame){
            nSprite.spriteFrame = this.initSpriteFrame;
        }
    },
    //碰撞检测
    onCollisionEnter: function(other, self){
        if (other.node.group !== 'bullet') {
            return;
        }
        if (this.enemyHp === 0) {
            this.enemyHp--;
            this.explodingAnim();
            return;
        }
        if (this.enemyHp > 0) {
            this.enemyHp--;
        }
    },
    explodingAnim: function () {
        // 播放爆炸音效
        cc.audioEngine.play(this.explosionSound);
        let anim = this.getComponent(cc.Animation);
        let animName = this.node.name + '_exploding';
        anim.play(animName);
        anim.on('finished',  this.onHandleDestroy, this);
    },
    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        this.node.y -= dt * this.speed;
        //出屏幕后 回收节点
        if (this.node.y < -this.node.parent.height / 2){
            this.enemyGroup.destroyEnemy(this.node);
        }
    },
    onHandleDestroy: function () {
        // Demo中零时使用，后续要使用对象池，参考bullet
        this.enemyGroup.destroyEnemy(this.node, this.score);
    }
});
