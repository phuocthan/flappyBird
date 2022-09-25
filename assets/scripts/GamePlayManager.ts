import { _decorator, Component, Node, PhysicsSystem, director, Director, Contact2DType, Collider2D } from 'cc';
import { BirdController } from './BirdController';
import { ObtaclesManager } from './ObtaclesManager';
import { ScreenBase, SCREEN_TYPE } from './ScreenBase';
import { ScreenManager } from './ScreenManager';
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

    _score = 0;
    start() {
        this.birdCtrl.listenerOnBirdDead(this.onBirdDead.bind(this))
        this._subscribeColliderContactEvents(this.birdCtrl.node);
    }

    protected _subscribeColliderContactEvents(node: Node): void {
        const collider = node.getComponent(Collider2D);
        console.log('@@@@ collider22222 ', collider)
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact.bind(this), true);
        collider.on(Contact2DType.END_CONTACT, this.onEndContact.bind(this), true);
    }


    public onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D): void {
        this.gameOver();
    }

    public onEndContact(selfCollider: Collider2D, otherCollider: Collider2D): void {
    }

    update(deltaTime: number) {
        
    }

    show() {
        this.startNewGame();
    }

    gameOver() {
        this.birdCtrl.onGameOver();
        this.otbMng.onGameOver();
    }

    startNewGame() {
        this.birdCtrl.onStartGame();
        this.otbMng.onStartGame();
        this._isGameOver = false;
        this._isGameRunning = true;
    }

    private _isGameOver = false;
    private _isGameRunning = false;
    onTouchScreen() {
        if (this._isGameOver || !this._isGameRunning) {
            return;
        }
        this.birdCtrl.jump();
    }

    onBirdDead() {
        this._isGameOver = true;

        setTimeout ( () => {
            ScreenManager.inst.showScreen(SCREEN_TYPE.GAMEOVER);
        }, 1000)
        
    }


}

