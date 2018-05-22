/**
 * 条 0-9
 * 万 10-19
 * 简 20-29
 * 字 30-36
 */
export class Deck {

    public cards: number[] = [];

    public constructor() {

        for (let i = 1; i < 10; i++) {
            for (let j = 0; j < 4; j++) {
                this.cards.push(i);
                this.cards.push(i + 10);
                this.cards.push(i + 20);
            }
        }

        for (let i = 1; i < 8; i++) {
            for (let j = 0; j < 4; j++) {
                this.cards.push(i + 30);
            }
        }

    }

    public shuffle(): void {

        //Shuffle the deck array with Fisher-Yates
        let i, j, tempI, tempJ;

        for (i = 0; i < this.cards.length; i++) {
            j = Math.floor(Math.random() * i + 1);
            tempI = this.cards[i];
            tempJ = this.cards[j];
            this.cards[i] = tempJ;
            this.cards[j] = tempI;
        }

    }

    /**
     * 发牌-返回4组牌
     * @returns {number[][]}
     */
    public deal(): number[][] {
        this.shuffle();
        let arr: number[][] = [];
        for (let i = 0; i < 14; i++) {
            for (let j = 0; j < 4; j++) {
                if (!arr[j]) {
                    arr[j] = [];
                }
                arr[j].push(this.cards.pop());
            }
        }
        return arr;
    }

}