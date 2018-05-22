define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Deck = /** @class */ (function () {
        function Deck() {
            this.cards = [];
            for (var i = 1; i < 10; i++) {
                for (var j = 0; j < 4; j++) {
                    this.cards.push(i);
                    this.cards.push(i + 10);
                    this.cards.push(i + 20);
                }
            }
            for (var i = 1; i < 8; i++) {
                for (var j = 0; j < 4; j++) {
                    this.cards.push(i + 30);
                }
            }
        }
        Deck.prototype.shuffle = function () {
            //Shuffle the deck array with Fisher-Yates
            var i, j, tempI, tempJ;
            for (i = 0; i < this.cards.length; i++) {
                j = Math.floor(Math.random() * i + 1);
                tempI = this.cards[i];
                tempJ = this.cards[j];
                this.cards[i] = tempJ;
                this.cards[j] = tempI;
            }
        };
        Deck.prototype.deal = function () {
            this.shuffle();
            var arr = [];
            for (var i = 0; i < 14; i++) {
                for (var j = 0; j < 4; j++) {
                    if (!arr[j]) {
                        arr[j] = [];
                    }
                    arr[j].push(this.cards.pop());
                }
            }
            return arr;
        };
        return Deck;
    }());
    exports.Deck = Deck;
});
