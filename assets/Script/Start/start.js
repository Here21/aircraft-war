cc.Class({
    extends: cc.Component,

    properties: {
        loadAnimation: {
            default: null,
            type: cc.Animation
        },
        startButton: {
            default: null,
            type: cc.Button
        }
    },

    // use this for initialization
    onLoad: function () {
        this.loadAnimation.play();
        // 预先加载游戏场景
        cc.director.preloadScene('Game');
    },

    startGame: function () {
        // 转场
        cc.director.loadScene('Game');
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
