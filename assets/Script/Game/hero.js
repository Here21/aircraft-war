cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        // 监听拖动事件
        this.node.on('touchmove', this.onHandleHeroMove, this);
    },

    // Hero拖动
    onHandleHeroMove: function (event) {
        // touchmove事件中 event.getLocation() 获取当前已左下角为锚点的触点位置（world point）
        let position = event.getLocation();
        // 实际hero是background的子元素，所以坐标应该是随自己的父元素进行的，所以我们要将“world point”转化为“node point”
        let location = this.node.parent.convertToNodeSpaceAR(position);
        this.node.setPosition(location);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
