import { _decorator, Component, Node, Prefab, instantiate, view, UITransform } from 'cc';
import { GAME_CONFIG } from './GameDefs';
import { Utils } from './Utils';
const { ccclass, property } = _decorator;

@ccclass('ObtaclesManager')
export class ObtaclesManager extends Component {

    @property(Prefab)
    pipePrefab: Prefab = null;

    pipeList: Node[] = [];
    groundList: Node[] = [];

    private _isGameOver = false;
    private _curPosX = 0;
    groundContainNode: Node;

    onGameOver() {
        this._isGameOver = true;
    }

    onLoad() {
        this.groundContainNode = this.node.parent.getChildByName('base');
        this.groundList = this.groundContainNode.children;
    }

    update(dt: number) {
        if (this._isGameOver) {
            return;
        }

        this.pipeList.forEach(pipe => {
            let curPos = pipe.getPosition();
            pipe.setPosition(curPos.x + GAME_CONFIG.PIPE_MOVE_SPEED * dt, curPos.y);
        });

        const screenView = view.getVisibleSize();
        // if first Pipe are out of screen, add it back in the end win random Pos Y
        if (this.pipeList[0].position.x < -screenView.width) {
            const removePipe = this.pipeList.splice(0, 1)[0];
            removePipe.removeFromParent();

            const lastPipe = this.pipeList[this.pipeList.length - 1];
            const lastPipePosX = lastPipe.position.x;
            const randomPosY = Utils.randomRange(GAME_CONFIG.MIN_PIPE_POS_Y, GAME_CONFIG.MAX_PIPE_POS_Y, true);
            removePipe.parent = this.node;
            removePipe.setPosition(lastPipePosX + GAME_CONFIG.DISTANT_BETWEEN_PIPES, randomPosY);
            this.pipeList.push(removePipe);
        }

        // ground move
        this.groundList.forEach(ground => {
            let curPos = ground.getPosition();
            ground.setPosition(curPos.x + GAME_CONFIG.PIPE_MOVE_SPEED * dt, curPos.y);
        });

        if (this.groundList[0].position.x < -screenView.width / 2) {
            const removeGround = this.groundList.splice(0, 1)[0];
            let curPosY = removeGround.getPosition().y;
            removeGround.removeFromParent();

            const lastGround = this.groundList[this.groundList.length - 1];

            removeGround.setPosition(lastGround.position.x + lastGround.getComponent(UITransform).contentSize.width, curPosY);
            removeGround.parent = this.groundContainNode;

            this.groundList.push(removeGround);
        }

    }

    onStartGame() {
        this.node.removeAllChildren();
        this.pipeList = [];
        this._curPosX = GAME_CONFIG.DISTANT_PIPES_FROM_START_POINT;
        this.randomObtacles(GAME_CONFIG.PIPES_POOL_COUNT);
        this._isGameOver = false;
    }

    randomObtacles(numObtacle: number) {
        const randomPosY = Utils.randomRange(GAME_CONFIG.MIN_PIPE_POS_Y, GAME_CONFIG.MAX_PIPE_POS_Y, true);
        const pipe = instantiate(this.pipePrefab);
        pipe.setPosition(this._curPosX, randomPosY)
        pipe.parent = this.node;
        this.pipeList.push(pipe);

        this._curPosX += GAME_CONFIG.DISTANT_BETWEEN_PIPES;
        numObtacle--;
        if (numObtacle > 0) {
            this.randomObtacles(numObtacle);
        }
    }
}

