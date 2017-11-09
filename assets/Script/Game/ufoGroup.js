const ufoG = cc.Class({
   name: 'ufoG',
   properties: {
       name: '',
       prefab: cc.Prefab,
       freq: 0,
       poolAmount: 0,
       delayMax: {
           default: 0,
           tooltip: '最大延时'
       },
       delayMin: {
           default: 0,
           tooltip: '最小延时'
       },
   }
});

cc.Class({
    extends: cc.Component,

    properties: {
        ufoG: {
            default: [],
            type: ufoG
        }
    },

    // use this for initialization
    onLoad: function () {
        D.common.batchInitNodePool(this, this.ufoG);
    },
    // 填充弹药
    startAction: function () {
        for(let i = 0; i < this.ufoG.length; i++) {
            let ufoName = this.ufoG[i].name;
            let freq = this.ufoG[i].freq;
            this[ufoName] = function (ii) {
                let delay = Math.random() * (this.ufoG[ii].delayMax - this.ufoG[ii].delayMin) + this.ufoG[ii].delayMin;
                // 内存定时器，随机掉落时间
                this.scheduleOnce(function() {
                    this.genNewUfo(this.ufoG[ii]);
                }.bind(this), delay);
            }.bind(this, i);
            // 外层定时器，循环掉落
            this.schedule(this[ufoName], freq);
        }
    },
    // 生成ufo
    genNewUfo: function (ufoInfo) {
        let poolName = ufoInfo.name + 'Pool';
        let newNode = D.common.genNewNode(this[poolName], ufoInfo.prefab, this.node);
        let pos = this.getNewEnemyPosition(newNode);
        newNode.setPosition(pos);
        newNode.getComponent('ufo').ufoGroup = this;
    },
    //随机生成的位置
    getNewEnemyPosition: function(newEnemy) {
        //位于上方，先不可见
        let randx = cc.randomMinus1To1() * (this.node.parent.width / 2 - newEnemy.width / 2);
        let randy = this.node.parent.height / 2 + newEnemy.height / 2;
        return cc.v2(randx,randy);
    },
    // 销毁
    destroyUfo: function (node) {
        D.common.putBackPool(this, node);
    }

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
