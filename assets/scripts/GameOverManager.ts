import { _decorator, Component, Node } from 'cc';
import { ScreenBase } from './ScreenBase';
import { ScreenManager } from './ScreenManager';
const { ccclass, property } = _decorator;

@ccclass('GameOverManager')
export class GameOverManager extends ScreenBase {
    start() {

    }

    update(deltaTime: number) {
        
    }

    onReplayBtnClick() {
        ScreenManager.inst.gotoGamePlay();
    }

}

