// const _ = require('lodash');

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        D.common = this;
        D.commonState.poolObj = {};
    },
    // 批处理对象池
    batchInitNodePool: function (that, objArray) {
        for(let i=0; i< objArray.length; i++) {
            let objInfo = objArray[i];
            this.initNodePool(that, objInfo);
        }
    },
    // 初始化对象池
    initNodePool: function (that, objInfo) {
        let name = objInfo.name;
        let poolName = name + 'Pool';
        that[poolName] = new cc.NodePool();
        // 在commonState中备份，方便clear
        D.commonState.poolObj[poolName] = that[poolName];
        // 创建对象，并放入池中
        for (let i = 0; i < objInfo.poolAmount; i++) {
            let newNode = cc.instantiate(objInfo.prefab);
            that[poolName].put(newNode);
        }
    },

    // 生成节点
    genNewNode: function (pool, prefab, nodeParent) {
        let newNode = null;
        if (pool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
            newNode = pool.get();
        } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
            newNode = cc.instantiate(prefab);
        }
        nodeParent.addChild(newNode);
        return newNode;
    },

    // 销毁节点
    putBackPool: function (that, node) {
        let poolName = node.name + "Pool";
        that[poolName].put(node);
    },
    
    // 清空缓冲池
    clearAllPool: function () {
        _.forEach(D.commonState.poolObj, function (pool) {
            pool.clear();
        })
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
