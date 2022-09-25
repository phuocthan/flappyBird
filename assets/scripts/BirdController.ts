import { _decorator, Component, Node, v3, v2, BoxCollider2D, Contact2DType, IPhysics2DContact, Animation, misc, PhysicsSystem2D, Collider2D, Collider2D_base, Director, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BirdController')
export class BirdController extends Component {
    callbackOnDead: () => {};
    private _animation: Animation;

    onLoad() {
        this._animation = this.node.getComponent(Animation);
    }
    start() {

        this._subscribeColliderContactEvents(this.node);
    }

    protected _subscribeColliderContactEvents(node: Node): void {
        const collider = node.getComponent(Collider2D);
        console.log('@@@@ collider ', collider)
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact.bind(this), true);
        collider.on(Contact2DType.END_CONTACT, this.onEndContact.bind(this), true);
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

    dead() {
        this._isDead = true;
        this._animation.stop();
        this.callbackOnDead && this.callbackOnDead();
    }

    onStartGame() {
        this._isDead = false;
        this._animation.play();
    }

    public onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D): void {
        // this.dead();
    }

    public onEndContact(selfCollider: Collider2D, otherCollider: Collider2D): void {
    }






}

