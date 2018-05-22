import test from  'ava';
import {Deck} from '../src/deck';
import {Hu} from '../src/hu';

test('deck lenght', t => {

    let deck: Deck = new Deck();
    let cards: number[][] = deck.deal();

    let isHu: boolean = Hu.make(cards[0]);

    t.pass();

});
