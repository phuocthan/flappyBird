import { _decorator} from 'cc';
import { ScoreController } from './ScoreController';
import { ScreenBase } from './ScreenBase';
import { ScreenManager } from './ScreenManager';
import { UserInfo } from './UserInfo';
const { ccclass, property } = _decorator;

@ccclass('GameOverManager')
export class GameOverManager extends ScreenBase {
    
    @property (ScoreController)
    bestScoreCtrl: ScoreController = null;

    @property (ScoreController)
    curScoreCtrl: ScoreController = null;

    onReplayBtnClick() {
        ScreenManager.inst.gotoGamePlay();
    }

    show() {
        this.curScoreCtrl.curNum = UserInfo.lastScore;
        this.bestScoreCtrl.curNum = UserInfo.bestScore;
    }

}

