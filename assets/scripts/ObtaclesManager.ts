import { _decorator, Component, Node, Prefab, instantiate, v3, Label, director, view } from 'cc';
import { Utils } from './Utils';
const { ccclass, property } = _decorator;

@ccclass('ObtaclesManager')
export class ObtaclesManager extends Component {

    @property(Prefab)
    pipePrefab: Prefab = null;

    distance = 150;

    obtaclesList: Node[] = [];

    speedMove = -100;
    start() {

    }

    update(dt: number) {


        const screenView = view.getVisibleSize();
        this.obtaclesList.forEach( pipe => {
            let curPos = pipe.getPosition();
            // this.curPosX.x += this.speedMove * dt;
            let newPos = v3(curPos.x + this.speedMove * dt, curPos.y, curPos.z);
            pipe.setPosition(newPos);
            // const wPosX = pipe.worldPosition.x;
            if (pipe.position.x < -1000) {
                const randomPosY = Utils.randomRange(this.MIN_POS_Y, this.MAX_POS_Y, true);
                pipe.position = v3(this.curPosX, randomPosY, 0)
                pipe.setPosition(v3(this.curPosX, randomPosY, 0));
                this.curPosX += this.distance;
                console.log('@@@@@ this.curPosX' ,this.curPosX);
            }
        });
    }

    onStartGame() {
        this.node.removeAllChildren();
        this.obtaclesList = [];
        this.randomObtacles(10);
        this.curPosX = this.startPosX;
    }
    startPosX = 200;
    curPosX = 0;

    readonly MAX_POS_Y = 70;
    readonly MIN_POS_Y = -70;

    randomObtacles(numObtacle = 1) {
        const randomPosY = Utils.randomRange(this.MIN_POS_Y, this.MAX_POS_Y, true);
        console.log('@@@@ randomObtacles ',numObtacle)
        const pipe = instantiate(this.pipePrefab);
        // pipe.parent = this.node;
        pipe.position = v3(this.curPosX, randomPosY, 0)
        pipe.parent = this.node;
        const label = pipe.getChildByName('text').getComponent(Label);
        label.string = '' + numObtacle;
        this.obtaclesList.push(pipe);

        this.curPosX += this.distance;
        numObtacle--;
        if ( numObtacle > 0) {
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

