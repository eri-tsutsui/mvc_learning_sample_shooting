import CommonBase from "../Common/CommonBase";

/**
 * UIの描画クラス
 * スコア以外にも
 * 自機の体力
 * 経過時間や
 * クリア表示、ゲームオーバーなども作ってみて下さい。
 */
export default class UI extends CommonBase {
    constructor () {
        super ();
        this.score = 0;
        this.isGameOver = false;

        // 攻撃力
        this.power = 10;
    }

    // スコアを更新
    // getScore () {
    //     this.score += this.power;
    // }

    /**
     * スコア
     * @param {Number} value 
     */
    setScore (value) {
        this.score = value;
    }
    /**
     * ゲームオーバー
     * @param {Number} value 
     */
    showGameOver () {
        this.isGameOver = true;
    }
    /**
     * 描画
     * @param {context} context 
     */
    draw (context) {

        //SCOREの表示
        context.font = "bold 9px 'ゴシック'";
        context.fillStyle = "rgb(255, 169, 0)";
        context.fillText("SCORE : " + this.score, 10, 10);

        //GAME OVERの表示
        if(this.isGameOver === true) {
            // context.fillStyle = "rgb(0, 0, 0)";
            context.font = "bold 30px 'ゴシック'";
            context.fillText("GAME OVER", 200, 200);
        }

    }
}