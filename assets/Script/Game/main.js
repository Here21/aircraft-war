cc.Class({
    extends: cc.Component,
    properties: () => ({
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
        bulletGroup: {
            default: null,
            type: require('bulletGroup')
        },
        enemyGroup: {
            default: null,
            type:require('enemyGroup')
        },
        ufoGroup: {
            default: null,
            type:require('ufoGroup')
        },
        bgm: {
            default: null,
            url: cc.AudioClip
        },
        gameOverSound: {
            default: null,
            url: cc.AudioClip
        },
        bombSound: {
            default: null,
            url: cc.AudioClip
        },
        buttonSound: {
            default: null,
            url: cc.AudioClip
        }
    }),

    // use this for initialization
    onLoad: function () {
        this.initState();
        this.enemyGroup.startAction();
        this.bulletGroup.startAction();
        this.ufoGroup.startAction();
        // play bgm
        cc.audioEngine.play(this.bgm, true);
    },
    initState: function () {
        D.commonState.pauseState = false;
        D.commonState.bombAmount = 0;
        D.commonState.gameScore = 0;
    },
    // 暂停
    handlePause: function () {
        cc.audioEngine.play(this.buttonSound);
        if (D.commonState.pauseState) {
            this.pause.normalSprite = this.pauseSprite[0];
            this.pause.pressedSprite = this.pauseSprite[1];
            this.pause.hoverSprite = this.pauseSprite[1];
            // 开始正在运行的场景
            cc.director.resume();
            // 添加Hero拖拽监听
            this.hero.onDrag();
            return D.commonState.pauseState = !D.commonState.pauseState;
        }
        this.pause.normalSprite = this.pauseSprite[2];
        this.pause.pressedSprite = this.pauseSprite[3];
        this.pause.hoverSprite = this.pauseSprite[3];
        // 暂停正在运行的场景
        cc.director.pause();
        // 移除Hero拖拽监听
        this.hero.offDrag();
        return D.commonState.pauseState = !D.commonState.pauseState;
    },
    // 使用tnt炸弹
    useBomb: function () {
        if (D.commonState.bombAmount > 0) {
            // 音效
            cc.audioEngine.play(this.bombSound);
            // 把当前的node.children 赋值给一个新的对象
            let enemy = new Array(...this.enemyGroup.node.children);
            for(let i = 0; i < enemy.length; i++) {
                enemy[i].getComponent('enemy').explodingAnim();
            }
            D.commonState.bombAmount--;
            this.bombAmount.string = String(D.commonState.bombAmount);
        }
    },
    // 接收炸弹
    receiveBomb: function () {
        D.commonState.bombAmount++;
        this.bombAmount.string = String(D.commonState.bombAmount);
    },
    // 分数
    changeScore: function (score) {
        D.commonState.gameScore += score;
        this.scoreDisplay.string = D.commonState.gameScore.toString();
    },
    // 游戏结束
    gameOver: function () {
        D.common.clearAllPool();
        cc.audioEngine.play(this.gameOverSound);
        cc.director.loadScene('End');
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
