import { _decorator, Component, Node, PhysicsSystem, director, Director } from 'cc';
import { BirdController } from './BirdController';
import { ObtaclesManager } from './ObtaclesManager';
import { ScreenBase, SCREEN_TYPE } from './ScreenBase';
import { ScreenManager } from './ScreenManager';
const { ccclass, property } = _decorator;

@ccclass('GamePlayManager')
export class GamePlayManager extends ScreenBase {
    @property (BirdController)
    birdCtrl: BirdController = null;

    @property (ObtaclesManager)
    otbMng: ObtaclesManager = null;

    _score = 0;
    start() {
        this.birdCtrl.listenerOnBirdDead(this.onBirdDead.bind(this))
        // c
    }

    update(deltaTime: number) {
        
    }

    show() {
        this.startNewGame();

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

