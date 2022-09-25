import { _decorator, Component, Node } from 'cc';
import { ScreenBase } from './ScreenBase';
import { ScreenManager } from './ScreenManager';
const { ccclass, property } = _decorator;

@ccclass('StartScreenManager')
export class StartScreenManager extends ScreenBase {
    onTouchScreen() {
        ScreenManager.inst.gotoGamePlay();
    }
}

