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
        this.deathCount = 0;

        // Enemy(赤)を一定間隔で5体生産
        this.production = setInterval(() => {
            const enemy = new Enemy();
            this.setListener(enemy);
        }, 4000);

        this.stopProduction();

        this.enemysList.forEach(enemy => {
            this.setListener(enemy);
        });

        // Enemy2(黒)
        const enemy2 = new Enemy2();
        this.setListener(enemy2);

    }

    setListener(enemy) {
        // Enemyが死んだ時のリスナー
        enemy.addEventListener ('death', (e) => {
            // this.enemysListから死んだenemy を削除
            this.enemysList = this.enemysList.filter(ene => ene != enemy);

            // 死亡数をカウント
            this.deathCount ++;

            // 全てのエネミーが死んだという報告を受けたら実行するのでコードはここ
            this.produceBoss();
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
        if(this.deathCount == 7) {
            const enemy3 = new Enemy3();
            this.setListener(enemy3);
        }
    }
    
    /**
     * EnterFrame.jsの中で
     * requestAnimationFrameから自動的にcallされ続けます。
     */
    update () {
    }
}