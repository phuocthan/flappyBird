import { Vec2, Node, v2 } from "cc";

export class Utils {


  public static randomRange(min: number, max: number, int: boolean = false) {
    let delta = max - min;
    let rnd = Math.random();
    let result = min + rnd * delta;

    if (int) {
      result = Math.round(result);
    }
    return result;
  }

  // public static getWorldPos(node: Node) {
  //   return node.
  //   return node.convertToWorldSpaceAR(v2(0, 0));
  // }

  // public static setWorldPos(node: Node, posWS: Vec2) {
  //   node.setPosition(node.parent.convertToNodeSpaceAR(posWS));
  // }


}
