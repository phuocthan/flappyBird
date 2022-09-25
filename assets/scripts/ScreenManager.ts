import { _decorator, Component, Node } from 'cc';
import { ScreenBase, SCREEN_TYPE } from './ScreenBase';
const { ccclass, property } = _decorator;

@ccclass('ScreenManager')
export class ScreenManager extends Component {

    @property(Node)
    screenList: Node[] = [];

    public static inst: ScreenManager = null;

    start() {
        ScreenManager.inst = this;
        this.showScreen(SCREEN_TYPE.GAMEPLAY);
        // this.showScreen(SCREEN_TYPE.START);
    }

    update(deltaTime: number) {

    }

    showScreen(screenID: SCREEN_TYPE) {
        this.screenList.forEach((screen, i) => {
            screen.active = screenID === i;
            screen.getComponent(ScreenBase).show();
        });
    }

    gotoGamePlay() {
        this.showScreen(SCREEN_TYPE.GAMEPLAY);
    }
}

