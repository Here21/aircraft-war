cc.Class({
    extends: cc.Component,

    properties: {
        bulletGroup: {
            default: null,
            type: require('bulletGroup'),
        }
    },

    // use this for initialization
    onLoad: function () {
        // 监听拖动事件
        this.node.on('touchmove', this.onHandleHeroMove, this);
        // 获取碰撞检测系统
        let manager = cc.director.getCollisionManager();
        // 开启碰撞检测系统
        manager.enabled = true;
    },

    // Hero拖动
    onHandleHeroMove: function (event) {
        // touchmove事件中 event.getLocation() 获取当前已左下角为锚点的触点位置（world point）
        let position = event.getLocation();
        // 实际hero是background的子元素，所以坐标应该是随自己的父元素进行的，所以我们要将“world point”转化为“node point”
        let location = this.node.parent.convertToNodeSpaceAR(position);
        this.node.setPosition(location);
    },
    
    // 碰撞组件
    onCollisionEnter: function (other, self) {
        if (other.node.name === 'doubleBullet') {
            this.bulletGroup.changeBullet(other.node.name);
        }
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
