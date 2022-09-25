import { _decorator, Component, Node, Prefab, Sprite, instantiate } from 'cc';
import { Num } from './Num';
const { ccclass, property } = _decorator;

@ccclass('ScoreController')
export class ScoreController extends Component {

    @property(Prefab)
    numPrefab: Prefab = null;

    numList: Node[] = [];

    private _curNum = 0;
    public get curNum() {
        return this._curNum;
    }
    public set curNum(value) {
        this._curNum = value;
        this.showNum(value);
    }
    showNum(number) {
        if (number === 0) {
            //reset on start game
            this.node.removeAllChildren();
            this.numList = [];
        }

        const numString: string = '' + number;
        for (let i = 0; i <= numString.length - 1; i++) {
            if (this.numList.length < i + 1) {
                const newNum = instantiate(this.numPrefab)
                newNum.parent = this.node;
                this.numList.push(newNum);
            }
            this.numList[i].active = true;
            this.numList[i].getComponent(Num).num(parseInt(numString[i]));
        }
    }
}

