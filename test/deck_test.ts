import test from  'ava';
import {Deck} from '../src/deck';

test('new deck', t => {

    let deck: Deck = new Deck();

    t.is(136, deck.cards.length);

});


test('deck deal', t => {

    let deck: Deck = new Deck();

    let cards = deck.deal();

    t.is(4, cards.length);

    let handCards = cards.reduce((prev, cur) => {
        return [...prev, ...cur];
    }, []);

    t.is(4 * 14, handCards.length);

});
