import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

export enum SCREEN_TYPE {
    START,
    GAMEPLAY,
    GAMEOVER
}
@ccclass('ScreenBase')
export class ScreenBase extends Component {

    start() {

    }

    update(deltaTime: number) {
        
    }

    show () {

    }
}

