import UnitBase from "js/View/UnitBase";
import HitTest from "js/Util/HitTest";

/**
 * 自機クラス
 */
export default class Player extends UnitBase {

    constructor () {
        super ();
        this.x = 100;
        this.y = 200;
        this.moveSpeed = 5;
        this.isLeft = false;
        this.isRight = false;
        this.isUp = false;
        this.isDown = false;
        this.setHP(100);
        this.setWidth(40);
        this.setHeight(40);

        // 矢印キー操作
        window.addEventListener('keyup', (e) => this.keyup(e));
        window.addEventListener('keydown', (e) => this.keydown(e));

        // Bullet発射
        // window.addEventListener('keydown', (e) => {
        //     this.throwBullet (e);
        // });

    }

    keyup (e) {
        const key_code = e.keyCode;
        if (key_code === 37) this.isLeft = false;
        if (key_code === 38) this.isUp = false;
        if (key_code === 39) this.isRight = false;
        if (key_code === 40) this.isDown = false;
    }

    keydown (e) {
        const key_code = e.keyCode;
        if (key_code === 37) this.isLeft = true;
        if (key_code === 38) this.isUp = true;
        if (key_code === 39) this.isRight = true;
        if (key_code === 40) this.isDown = true;
    }

    // throwBullet (e) {
    //     if(e.keyCode === 32) {
    //         const bullet = new Bullet (this.x + 10, this.y);
    //         bullet.setSpeed(-4);
    //     }
    // }
    
    /**
     * EnterFrame.jsの中で
     * requestAnimationFrameから自動的にcallされ続けます。
     */
    update () {
        // 矢印キー　←↑→↓で動くようにしてください。googleで「js keycode」など検索してみて下さい。

        if (this.isLeft) this.x -= this.moveSpeed;
        if (this.isRight) this.x += this.moveSpeed;
        if (this.isUp) this.y -= this.moveSpeed;
        if (this.isDown) this.y += this.moveSpeed;

        // スペースキーを押すとBulletが発射されるようにして下さい。
        // Enemyクラスを参考にしてください。

        // 敵の弾に当たったらダメージを受けるようにして下さい。
        const bullet = HitTest.getHitObjectByClassName(this, "Bullet");
        if(bullet) {
            // ダメージを与えて下さい。↓コメントアウトを外していただくですがw
            this.setDamage (bullet.damage);
            // ↑さて、setDamageはどこで定義されているでしょうか？

            // HPが0になったら死亡状態にし、MainManageに通知して下さい。
            // そして、MainManager側に、その通知を受け取れるようにして下さい。
            // console.log (this.HP);
        }
    }

    /**
     * 機体描画
     * 三角形
     * @param {ctx} context 
     */
    draw (context) {
		context.beginPath();
		context.moveTo(this.x - 20, this.y + 10); 
		context.lineTo(this.x + 20, this.y);
		context.lineTo(this.x - 20, this.y - 10);
		context.closePath();

		context.strokeStyle = "rgb(0,0,0)"; //枠線の色
		context.stroke();

		context.fillStyle="rgba(0,0,255, 1)";//塗りつぶしの色
		context.fill();
    }
}