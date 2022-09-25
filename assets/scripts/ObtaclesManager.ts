import { _decorator, Component, Node, Prefab, instantiate, v3, Label, director, view } from 'cc';
import { Utils } from './Utils';
const { ccclass, property } = _decorator;

@ccclass('ObtaclesManager')
export class ObtaclesManager extends Component {

    @property(Prefab)
    pipePrefab: Prefab = null;

    distance = 180;

    obtaclesList: Node[] = [];

    speedMove = -100;
    private _isGameOver = false;
    start() {

    }


    onGameOver() {
        this._isGameOver = true;
    }

    update(dt: number) {
        if (this._isGameOver) {
            return;
        }

        this.obtaclesList.forEach(pipe => {
            let curPos = pipe.getPosition();
            pipe.setPosition(curPos.x + this.speedMove * dt, curPos.y);
        });

        const screenView = view.getVisibleSize();
        console.log('screenView ',screenView.width)

        if (this.obtaclesList[0].position.x < -screenView.width) {
            const removePipe = this.obtaclesList.splice(0, 1)[0];
            removePipe.removeFromParent();
            // const curPos = removePipe.getPosition();
            const lastPipe = this.obtaclesList[this.obtaclesList.length - 1];
            const lastPipePosX = lastPipe.position.x;
            const randomPosY = Utils.randomRange(this.MIN_POS_Y, this.MAX_POS_Y, true);
            // const newPos = v3(lastPipePosX + this.distance, randomPosY, curPos.z)
            removePipe.parent = this.node;
            removePipe.setPosition(lastPipePosX + this.distance, randomPosY);
            this.obtaclesList.push(removePipe);
        }


    }

    onStartGame() {
        this.node.removeAllChildren();
        this.obtaclesList = [];
        this.curPosX = this.startPosX;
        this.randomObtacles(10);
        this._isGameOver = false;
    }
    startPosX = 300;
    curPosX = 0;

    readonly MAX_POS_Y = 90;
    readonly MIN_POS_Y = -90;

    randomObtacles(numObtacle = 1) {
        const randomPosY = Utils.randomRange(this.MIN_POS_Y, this.MAX_POS_Y, true);
        console.log('@@@@ randomObtacles ', numObtacle)
        const pipe = instantiate(this.pipePrefab);
        // pipe.parent = this.node;
        pipe.position = v3(this.curPosX, randomPosY, 0)
        pipe.parent = this.node;
        const label = pipe.getChildByName('text').getComponent(Label);
        label.string = '' + numObtacle;
        this.obtaclesList.push(pipe);

        this.curPosX += this.distance;
        console.log('@@@@@ randomObtacles this.curPosX', this.curPosX);
        numObtacle--;
        if (numObtacle > 0) {
            this.randomObtacles(numObtacle);
        }

    }

    // lateUpdate() {
    //     const screenView = view.getVisibleSize();
    //     this.obtaclesList.forEach( pipe => {
    //         const wPosX = pipe.worldPosition.x;
    //         if (wPosX < -screenView.width  * 5) {
    //             const randomPosY = Utils.randomRange(this.MIN_POS_Y, this.MAX_POS_Y, true);
    //             pipe.position = v3(this.curPosX, randomPosY, 0)
    //             this.curPosX += this.distance;
    //         }
    //     });
    // }

}

