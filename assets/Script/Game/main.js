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
    },

    // use this for initialization
    onLoad: function () {

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
            return pause = !pause
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


    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
