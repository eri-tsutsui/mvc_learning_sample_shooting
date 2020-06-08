import Enemy from "js/View/Enemy";
import Enemy2 from "js/View/Enemy2";
import Enemy3 from "js/View/Enemy3";
import CommonBase from "js/Common/CommonBase";
/**
 * 敵ユニットを管理するマネージャークラス
 * 
 * 最初は1体だけできているので他にも複数体生成して
 * バリエーションを作って下さい。
 */
export default class EnemyManager extends CommonBase {
    constructor (){
        super ();
        this.enemysList = []; // Enemy管理配列
        this.enemysList.push (new Enemy()); 
        this.enemysList.push (new Enemy2()); //2体目

        // Enemyを一定間隔で5体生産
        this.production = setInterval(() => {
            const enemy = new Enemy();
            this.enemysList.push (new Enemy());
            this.setListener(enemy);
        }, 4000);
        this.stopProduction();
        this.enemysList.forEach(enemy => {
            this.setListener(enemy);
        });

        this.produceBoss();
    }

    setListener(enemy) {
        // Enemyが死んだ時のリスナー
        enemy.addEventListener ('death', (e) => {
            // this.enemysListから死んだenemy を削除
            this.enemysList = this.enemysList.filter(ene => ene != enemy);
        });

        // 弾に当たった時のスコア通知をEnemyから受け取る
        // さらにMainMnagaerに報告する
        enemy.addEventListener('addScore', (e) => {
            this.dispatchEvent(new CustomEvent('addScore', {detail: e.detail}));
        });
    }

    // 20000秒で5体生産
    stopProduction() {
        setTimeout(() => {
            clearInterval(this.production, 20000);
        }, 20000);
    }

    // ボスを出現させる
    produceBoss () {
        if(this.enemysList.length == 0) {
            this.enemysList.push (new Enemy3()); 
        }
    }
    
    /**
     * EnterFrame.jsの中で
     * requestAnimationFrameから自動的にcallされ続けます。
     */
    update () {
    }
}