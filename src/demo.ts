import {Deck, Hu} from './index';

let deck: Deck = new Deck();

deck.shuffle();

let cards = deck.deal();

let hands = cards[0];

console.log(hands);

let isHu = Hu.make(hands);

console.log(isHu);

let hands1 = [1, 1, 1, 2, 3, 4, 5, 5, 6, 7, 8, 9, 9, 9];

let test1 = Hu.make(hands1);

console.log(test1);

