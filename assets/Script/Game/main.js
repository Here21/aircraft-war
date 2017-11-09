let pause = false;

cc.Class({
    extends: cc.Component,

    properties: {
        pause: cc.Button,
        scoreDisplay: cc.Label,
        bombAmount: cc.Label,
        bombDisplay: cc.Node,
        pauseSprite: {
          default: [],
          type: cc.SpriteFrame,
          tooltip:'暂停按钮图片组',
        },
        hero: {
            default: null,
            type: require('hero')
        },
        bulletGroup: require('bulletGroup'),
        enemyGroup: require('enemyGroup'),
        ufoGroup: require('ufoGroup'),
    },

    // use this for initialization
    onLoad: function () {
        this.enemyGroup.startAction();
        this.bulletGroup.startAction();
        this.ufoGroup.startAction();
    },
    // 暂停
    handlePause: function () {
        if (pause) {
            this.pause.normalSprite = this.pauseSprite[0];
            this.pause.pressedSprite = this.pauseSprite[1];
            this.pause.hoverSprite = this.pauseSprite[1];
            // 开始正在运行的场景
            cc.director.resume();
            // 添加Hero拖拽监听
            this.hero.onDrag();
            return pause = !pause;
        }
        this.pause.normalSprite = this.pauseSprite[2];
        this.pause.pressedSprite = this.pauseSprite[3];
        this.pause.hoverSprite = this.pauseSprite[3];
        // 暂停正在运行的场景
        cc.director.pause();
        // 移除Hero拖拽监听
        this.hero.offDrag();
        return pause = !pause;
    },
    // 使用tnt炸弹
    useBomb: function () {
        // 把当前的node.children 赋值给一个新的对象
        let enemy = new Array(...this.enemyGroup.node.children);
        for(let i = 0; i < enemy.length; i++) {
            enemy[i].getComponent('enemy').explodingAnim();
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
