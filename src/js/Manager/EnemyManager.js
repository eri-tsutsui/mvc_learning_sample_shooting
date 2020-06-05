import Enemy from "js/View/Enemy";
import Enemy2 from "js/View/Enemy2";
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
        this.enemysList.push (new Enemy()); //1体だけ生成
        this.enemysList.push (new Enemy2()); //2体目

        // Enemyを自動で5体生産
        this.production = setInterval(() => {
            this.enemysList.push (new Enemy());
        }, 4000);

        this.enemysList.forEach(enemy => {

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

        });

    }

    update() {
         this.stopProduction();
    }

    // 20000秒で5体生産
    stopProduction() {
        clearInterval(this.production, 20000);
    }

    /**
     * EnterFrame.jsの中で
     * requestAnimationFrameから自動的にcallされ続けます。
     */
    update () {
    }
}