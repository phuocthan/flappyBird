import { _decorator, Component, Node, PhysicsSystem, director, Director, Contact2DType, Collider2D } from 'cc';
import { BirdController } from './BirdController';
import { ObtaclesManager } from './ObtaclesManager';
import { ScoreController } from './ScoreController';
import { ScreenBase, SCREEN_TYPE } from './ScreenBase';
import { ScreenManager } from './ScreenManager';
import { UserInfo } from './UserInfo';
const { ccclass, property } = _decorator;

export enum GAME_STATE {
    IDLE,
    RUNNING,
    GAME_OVER
}
@ccclass('GamePlayManager')
export class GamePlayManager extends ScreenBase {
    @property (BirdController)
    birdCtrl: BirdController = null;
    

    @property (ObtaclesManager)
    otbMng: ObtaclesManager = null;

    @property (ScoreController)
    scoreCtrl: ScoreController = null;

    _score = 0;
    private _curScore: number = 0;
    start() {
        // this.birdCtrl.listenerOnBirdDead(this.onBirdDead.bind(this))
        this._subscribeColliderContactEvents(this.birdCtrl.node);
    }

    protected _subscribeColliderContactEvents(node: Node): void {
        const collider = node.getComponent(Collider2D);
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact.bind(this), true);
        collider.on(Contact2DType.END_CONTACT, this.onEndContact.bind(this), true);
    }


    public onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D): void {
        console.log('selfCollider' ,selfCollider);
        console.log('otherCollider' ,otherCollider);
        // score line collide
        if (otherCollider.tag === 1) {
            this.addScore();
        } else {
            this.gameOver();
        }
    }

    public onEndContact(selfCollider: Collider2D, otherCollider: Collider2D): void {
    }

    update(deltaTime: number) {
        
    }

    show() {
        this.startNewGame();
    }

    gameOver() {
        this._isGameOver = true;
        this.birdCtrl.onGameOver();
        this.otbMng.onGameOver();
        UserInfo.lastScore = this._curScore;
        if ( this._curScore > UserInfo.bestScore) {
            UserInfo.bestScore = this._curScore;
        }
        setTimeout ( () => {
            ScreenManager.inst.showScreen(SCREEN_TYPE.GAMEOVER);
        }, 1000)
    }

    startNewGame() {
        this.birdCtrl.onStartGame();
        this.otbMng.onStartGame();
        this._isGameOver = false;
        this._isGameRunning = true;
        this.scoreCtrl.curNum = 0;
        this._curScore = 0;
    }

    private _isGameOver = false;
    private _isGameRunning = false;
    onTouchScreen() {
        if (this._isGameOver || !this._isGameRunning) {
            return;
        }
        this.birdCtrl.jump();
    }

    addScore() {
        this.scoreCtrl.curNum++;
        this._curScore++;
    }

    // onBirdDead() {

        
    // }


}

