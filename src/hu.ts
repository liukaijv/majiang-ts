/**
 * via from https://github.com/yuanfengyun/qipai/tree/master/mjlib_lua/base_split
 * 条 0-9
 * 万 10-19
 * 简 20-29
 * 字 30-36
 */

export class Hu {

    private static hasEye: boolean = false;

    private static values: { [key: string]: number } = {};

    public static make(cards: number[]): boolean {

        //reset
        this.hasEye = false;
        this.values = {};

        for (let card of cards) {
            if (!this.values[card]) {
                this.values[card] = 1;
            } else {
                this.values[card] = this.values[card] + 1;
            }
        }

        //检查字牌
        if (!this.checkZhi()) {
            return false;
        }

        //检查条牌
        if (!this.checkSuit(0)) {
            return false;
        }

        //检查万牌
        if (!this.checkSuit(10)) {
            return false;
        }

        //检查筒牌
        return this.checkSuit(20);

    }

    private static getSuitValues(from: number, to: number): { [key: string]: number } {
        let temp: { [key: string]: number } = {};
        for (let i of Object.keys(this.values)) {
            if (parseInt(i) >= from && parseInt(i) <= to) {
                temp[i] = this.values[i];
            }
        }
        return temp;
    }

    /**
     * 检查字牌
     * @returns {boolean}
     */
    private static checkZhi(): boolean {

        let zhiValues = this.getSuitValues(30, 36);
        for (let i of Object.keys(zhiValues)) {
            let count: number = zhiValues[i];
            //1张或4张不能胡
            if (count === 1 || count === 4) {
                return false;
            }
            //2张，已经有将不能胡了
            if (count === 2) {
                if (!this.hasEye) {
                    this.hasEye = true;
                } else {
                    return false;
                }
            }
        }

        return true;
    }

    private static checkSuit(from: number): boolean {

        let total: number = 0,
            to: number = from + 9,
            cards = this.getSuitValues(from, to);

        for (let i of Object.keys(cards)) {
            total = total + cards[i];
        }

        //没有些花色，继续下一种花色
        if (total === 0) {
            return true;
        }

        let remainder: number = total % 3;
        //牌总数除3余1，不能胡
        if (remainder === 1) {
            return false;
        }
        //牌总数除3余2
        else if (remainder === 2) {
            //已经有将不能胡了
            if (this.hasEye) {
                return false;
            }
            this.hasEye = true;
            //带将的拆分
            return this.splitEye(cards);
        }
        //不带将的拆分
        return this.split(cards);
    }

    /**
     * 返回所有可能的将
     * @param cards
     */
    private static findEyes(cards: { [key: string]: number }): string[] {

        let eyes: string[] = [];
        for (let i of Object.keys(cards)) {
            if (cards[i] >= 2) {
                eyes.push(i);
            }

        }
        return eyes;
    }

    /**
     * 扣除将后拆分
     * @param cards
     * @returns {boolean}
     */
    private static splitEye(cards: { [key: string]: number }): boolean {

        let eyes = this.findEyes(cards);
        if (!eyes.length) {
            return false;
        }

        for (let i of eyes) {
            let restCards = {...cards, [i]: cards[i] - 2};
            if (this.split(restCards)) {
                return true;
            }
        }

        return false;
    }

    /**
     * 拆分
     * @param cards
     * @returns {boolean}
     */
    private static split(cards: { [key: string]: number }): boolean {

        let sorted: string[] = Object.keys(cards).sort((a, b) => parseInt(a) - parseInt(b));
        let len: number = sorted.length;

        for (let i = 0; i < len; i++) {
            //顺子数量
            let n: number = 0;
            let count: number = cards[sorted[i]];
            //一个顺子
            if (count === 1 || count === 4) {
                n = 1;
            }
            //两个顺子
            else if (count === 2) {
                n = 2;
            }
            if (n > 0) {
                //越界了
                if (i + 2 > len) {
                    return false;
                }
                let c1 = cards[sorted[i + 1]];
                if (c1 < n) {
                    return false;
                }
                let c2 = cards[sorted[i + 2]];
                if (c2 < n) {
                    return false;
                }
                cards[sorted[i + 1]] = c1 - n;
                cards[sorted[i + 2]] = c2 - n;
            }
        }

        return true;
    }

}