import { sys } from "cc";

export class UserInfo {

    static readonly  BEST_SCORE = '_bestScore';
    public static setKey(key: string, value: any) {
        sys.localStorage.setItem(key, value);
    }

    public static getKey(key: string, defaulValue: any) {
        let result;
        try {
            result = sys.localStorage.getItem(key);
            
        } catch (error) {
            result = defaulValue;
        }
        if (result === '' || result === null || result === undefined) {
            result = defaulValue;
        }
        return result;        
    }    

    private static _bestScore = 0;
    public static get bestScore() {
        if (UserInfo._bestScore === 0) {
            UserInfo._bestScore = UserInfo.getKey(UserInfo.BEST_SCORE, 0)
        }
        return UserInfo._bestScore;
    }
    public static set bestScore(value) {
        UserInfo.setKey(UserInfo.BEST_SCORE, value);
        UserInfo._bestScore = value;
    }

    public static lastScore = 0;
}