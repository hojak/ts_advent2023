export class Hand {
    cards: string;

    constructor ( cards: string ) {
        this.cards = cards;
    }

    getType () : HandType {
        return HandType.FiveOfAKind
    }
}


export enum HandType {
    HighCard = 1,
    OnePair,
    TwoPairs,
    ThreeOfAKind,
    FullHouse,
    FourOfAKind,
    FiveOfAKind
}