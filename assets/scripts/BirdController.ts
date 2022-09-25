import { _decorator, Component, Node, v3, v2, BoxCollider2D, Contact2DType, IPhysics2DContact, Animation, misc, PhysicsSystem2D, Collider2D, Collider2D_base, Director, director, view } from 'cc';
import { GAME_CONFIG } from './GameDefs';
const { ccclass, property } = _decorator;

@ccclass('BirdController')
export class BirdController extends Component {

    private _animation: Animation;

    onLoad() {
        this._animation = this.node.getComponent(Animation);
    }

    private _speed: number = 0;

    private _isDead = false;
    update(dt: number) {
        if (this._isDead) {
            return
        }
        this._speed -= GAME_CONFIG.BIRD_DECREASE_SPEED;

        let curPos = this.node.getPosition();
        this.node.setPosition(curPos.x, curPos.y + this._speed *dt);

        // make the bird rotate  to give more feeling
        // max angle = 30, min angle = -90, so the angle amplitude = 30 - (-90) = 120;
        // max speed when jump = 180, min speed to give the fall feeling = -540; speeed amplitude = 180 - (-540) = 720
        let angle = 30 - ( GAME_CONFIG.BIRD_JUMP_SPEED - this._speed) * 120 / 720
        angle = misc.clampf(angle, -90, 30)
        this.node.angle = angle;
    }

    jump() {
        this._speed = GAME_CONFIG.BIRD_JUMP_SPEED;
    }

    onGameOver() {
        this._isDead = true;
        this._animation.stop();
    }

    onStartGame() {
        this._isDead = false;
        this._animation.play();
        this.node.setPosition(0, 50);
        this._speed = 0;
    }
}

