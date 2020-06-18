import Player from "js/View/Player";
import UI from "js/View/UI";
import EnemyManager from "js/Manager/EnemyManager";
// import CommonBase from "js/Common/CommonBase";

/**
 * MainManager
 * 指示系統のトップクラス
 */
export default class MainManager {
    constructor (canvas){
        
        // super ();
        this.canvas = canvas;
        console.log(canvas);
        //自機を生成（インスタンス化）しています。
        //Playerクラスにて課題を確認し、動くようにしたり、弾をとばせたり
        //するようにしてください。
        this.player = new Player ();

        //死亡した時
        this.player.addEventListener('currentHP', () => {
            this.ui.showGameOver();
        });

        //敵のマネージャークラスです
        //EnemyManagerクラスにて課題を確認し、色々な敵を作ったり、
        //制御してください。
        this.enemyManager = new EnemyManager ();

        // 弾に当たった時のスコア通知をenemyManagerから受け取る
        this.enemyManager.addEventListener('addScore', (e) => {
            this.ui.addScore(e.detail);
        });

        // this.enemyManager.addEventListener('addBossScore', (e) => {
        //     this.ui.addScore(e.detail);
        // });

        // ゲームをクリアしたとき
        this.enemyManager.addEventListener('clearGame', (e) => {
            this.ui.showClearGame();
        });
        

        //UIを表示させて下さい。UIクラスをインスタンス化させます。
        //はViewフォルダにあります
        this.ui = new UI (); 

    }
}