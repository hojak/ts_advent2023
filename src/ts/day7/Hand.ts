export class Hand {
    cards: string;
    cardCount: { [card: string]: number } = {};
    type: HandType = HandType.HighCard;
    jAsJoker: boolean = false;

    constructor ( cards: string, jAsJoker: boolean = false ) {
        this.cards = cards;
        this.jAsJoker = jAsJoker;

        this.countCards(cards);

        this.determineCardType();
    }

    determineCardType() {
        let localCardCount = this.cardCount;
        let numberOfJokers = 0;

        if ( this.jAsJoker && (localCardCount['J'] > 0) ) {
           numberOfJokers = this.cardCount['J'];
           delete (localCardCount['J']);
        }

        let counts = Object.values ( localCardCount ).sort ( (a,b) => b-a);
        counts[0] += numberOfJokers;

        let numberOfDifferentCards = Object.keys(localCardCount).length;
        switch ( numberOfDifferentCards ) {
            case 5: this.type = HandType.HighCard; break;
            case 1: this.type = HandType.FiveOfAKind; break;
            case 4: this.type = HandType.OnePair; break;
            case 2:
                if ( counts[0] == 3) {
                    this.type = HandType.FullHouse;
                } else {
                    this.type = HandType.FourOfAKind;
                }
                break;
            case 3:
                if ( (counts[0]) == 3) {
                    this.type = HandType.ThreeOfAKind;
                } else {
                    this.type = HandType.TwoPairs;
                }
                break;
        }
    }

    private countCards(cards: string) {
        cards.split("").forEach(card => {
            if (!(card in this.cardCount)) {
                this.cardCount[card] = 1;
            } else {
                this.cardCount[card]++;
            }
        });
    }

    getType () : HandType {
        return this.type;
    }

    compareTo(otherHand: Hand): number {
        if ( this.cards == otherHand.cards ) {
            return 0;
        }
        if( this.type != otherHand.type ) {
            return (this.type - otherHand.type) * 100000;
        }
        let differentIndex = 0;
        while ( this.cards[differentIndex] == otherHand.cards[differentIndex]) {
            differentIndex++;
        }

        return (getValueOfCard(this.cards[differentIndex], this.jAsJoker) - getValueOfCard(otherHand.cards[differentIndex], this.jAsJoker))
            *Math.pow(10,5-differentIndex);
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

export function getValueOfCard ( card: string, jIsJoker: boolean = false ) : number {
    let compareString = "--23456789TJQKA";
    if ( jIsJoker ) {
        compareString = "-J23456789T-QKA"
    }
    return  compareString.indexOf ( card );
}
