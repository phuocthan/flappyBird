import { _decorator, Component, Node, SpriteFrame, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Num')
export class Num extends Component {
    
    @property(SpriteFrame)
    numFrames: SpriteFrame[] = [];

    @property(Sprite)
    spr: Sprite = null;
    start() {

    }

    update(deltaTime: number) {
        
    }

    onLoad() {
        this.num(0);
    }

    private _num = 0;
    
    num(num: number) {
        this.spr.enabled = num !== -1;
        if ( num === -1) {
            return;
        }
        this.spr.spriteFrame = this.numFrames[num];

    }
}

