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
            console.log('死亡');
            this.player.width = 0;
            this.player.height = 0;
        });

        //敵のマネージャークラスです
        //EnemyManagerクラスにて課題を確認し、色々な敵を作ったり、
        //制御してください。
        this.enemyManager = new EnemyManager ();

        //UIを表示させて下さい。UIクラスをインスタンス化させます。
        //はViewフォルダにあります
        this.ui = new UI (); 

    }
}