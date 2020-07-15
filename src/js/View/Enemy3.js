import UnitBase from "./UnitBase";
import Bullet from "./Bullet";
import HitTest from "../Util/HitTest";
import Enemy from "./Enemy";

/**
 * 敵のBaseクラス。
 * 新規の敵を作る場合はこのクラスを継承してください。
 */
export default class Enemy3 extends Enemy {
    constructor () {
        
        super ();
        this.x = 400;
        this.y = 200;
        this.setHP(30);
        this.setWidth(40);
        this.setHeight(40);
        this.crashScore = 30;  
        clearInterval(this.nId);
        this.nId = setInterval(() => {
            // 一定間隔で弾を発射
            const bullet = new Bullet (this.x - 40, this.y);
            bullet.setSpeed(-8);
        }, 200)

    }
    /**
     * EnterFrame.jsの中で
     * requestAnimationFrameから自動的にcallされ続けます。
     */
    update (){   
        // 動きはoverrideして下さい。↓のサンプルは上下運動
        this.deg = this.deg || 0;
        this.y = Math.cos(this.deg * (Math.PI / 180)) * 5 + this.y;
        this.deg++;

        const bullet = HitTest.getHitObjectByClassName (this, "Bullet");
        if (bullet) {
            // 弾にあたったらダメージを与え、EnemyManagerに通知して下さい。
            // bullet.damage
            this.setDamage (bullet.damage);

            if(this.HP <= 0) {
                this.dispatchEvent(new Event('death'));
                this.disappear();
                this.stopBullet();
            }

            // EnemyManagerにまずスコアを通知（引数も渡したいのでCustomEventとすべき）
            this.dispatchEvent(new CustomEvent('addScore', {detail: this.crashScore}));
        }    

    }

    disappear() {
        this.destroy();                    
    }

    stopBullet() {
        clearInterval(this.nId);    
    }
    
    /**
     * 描画
     * @param {context} context 
     */
    draw (context) {
        context.beginPath () ;

        context.arc( this.x, this.y, 40, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
        context.fillStyle = "blue" ;
        context.fill() ;

        context.strokeStyle = "purple" ;
        context.lineWidth = 8 ;
        context.stroke() ;
    }
}
