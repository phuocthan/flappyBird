import { _decorator, Component, Node, v3, v2, BoxCollider2D, Contact2DType, IPhysics2DContact, Animation, misc, PhysicsSystem2D, Collider2D, Collider2D_base, Director, director, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BirdController')
export class BirdController extends Component {
    callbackOnDead: () => {};
    private _animation: Animation;

    onLoad() {
        this._animation = this.node.getComponent(Animation);
    }

    listenerOnBirdDead(callback: () => {}) {
        this.callbackOnDead = callback;
    }

    speed: number = 0;
    jumpSpeed: number = 3;
    decSpeed: number = 0.2;

    private _isDead = false;
    update(dt: number) {

        if (this._isDead) {
            return
        }
        this.speed -= this.decSpeed;

        let curPos = this.node.getPosition();
        let newPos = v3(curPos.x, curPos.y + this.speed, curPos.z);
        this.node.setPosition(newPos);

        var angle = (this.speed / 2) * 30;
        if (angle >= 30) {
            angle = 30;
        }
        angle = misc.clampf(angle, -90, 30)
        this.node.angle = angle;

    }

    jump() {
        this.speed = this.jumpSpeed;
    }

    onGameOver() {
        this._isDead = true;
        this._animation.stop();
        this.callbackOnDead && this.callbackOnDead();
    }

    onStartGame() {
        this._isDead = false;
        this._animation.play();
        this.node.setPosition(0, 50);
        this.speed = 0;
    }







}

