import { expect } from "chai";
import { Hand, HandType, getValueOfCard } from "../../../src/ts/day7/Hand";

describe ("day 7: hand", () => {
    describe ( "finding type", () => {
        it ("should be of type five of a kind", () => {
            expect ( new Hand ("AAAAA").getType()).to.be.equal ( HandType.FiveOfAKind);
        })

        it ("should be of type four of a kind", () => {
            expect ( new Hand ("AAAAK").getType()).to.be.equal ( HandType.FourOfAKind);
        })

        it ("should be of type full house", () => {
            expect ( new Hand ("12121").getType()).to.be.equal ( HandType.FullHouse);
        })

        it ("should be of type three of a kind", () => {
            expect ( new Hand ("B2B3B").getType()).to.be.equal ( HandType.ThreeOfAKind);
        })

        it ("should be of type two pairs", () => {
            expect ( new Hand ("11A22").getType()).to.be.equal ( HandType.TwoPairs);
        })

        it ("should be of type one pair", () => {
            expect ( new Hand ("TA23T").getType()).to.be.equal ( HandType.OnePair);
        })

        it ("should be of type High Card", () => {
            expect ( new Hand ("BJT23").getType()).to.be.equal ( HandType.HighCard);
        })
    } )

    describe ( "finding type with J as Joker", () => {

        it ("rate normal when no jokers are present", () => {
            expect ( new Hand ("QAK23", true).getType()).to.be.equal ( HandType.HighCard);
        })

        it ("should be of type five of a kind", () => {
            expect ( new Hand ("AAAJJ", true).getType()).to.be.equal ( HandType.FiveOfAKind);
        })

        it ("should be of type four of a kind", () => {
            expect ( new Hand ("AJJAK", true).getType()).to.be.equal ( HandType.FourOfAKind);
        })

        it ("should be of type full house", () => {
            expect ( new Hand ("1212J", true).getType()).to.be.equal ( HandType.FullHouse);
        })

        it ("should be of type three of a kind", () => {
            expect ( new Hand ("J2B3B", true).getType()).to.be.equal ( HandType.ThreeOfAKind);
        });

        new Map<string, HandType>([
            ["34JJJ", HandType.FourOfAKind ],
            ["J4J2J", HandType.FourOfAKind ],
            ["343JJ", HandType.FourOfAKind ],
            ["343J3", HandType.FourOfAKind ],
            ["567JJ", HandType.ThreeOfAKind ],
            ["5J78J", HandType.ThreeOfAKind ],
            ["5664J", HandType.ThreeOfAKind ],
            ["AKQTJ", HandType.OnePair ],
            ["AKQJT", HandType.OnePair ],
            ["AKJQT", HandType.OnePair ],
            ["JAKQT", HandType.OnePair ],
            ["JJJJJ", HandType.FiveOfAKind ],
        ]).forEach ( (type, hand) => {
            it ( `${hand} to be of type ${type}`, () => {
                expect ( new Hand ( hand, true).getType()).to.be.equal(type);
            });
        });


        it ("should be of type one pair", () => {
            expect ( new Hand ("TA23J", true).getType()).to.be.equal ( HandType.OnePair);
            expect ( new Hand ("KJT23", true).getType()).to.be.equal ( HandType.OnePair);
        })
    });



    describe ("getValueOfCard", () => {
        it ( "should return 10", () => {
            expect ( getValueOfCard("T")).to.be.equal (10);
        })

        it ( "should return 5", () => {
            expect ( getValueOfCard("5")).to.be.equal (5);
        })

        it ( "should return 14", () => {
            expect ( getValueOfCard("A")).to.be.equal (14);
        })

        it ( "should return 11 when J is not a Joker", () => {
            expect ( getValueOfCard("J")).to.be.equal (11);
        })

        it ( "should return 1 when J is a Joker", () => {
            expect ( getValueOfCard("J", true)).to.be.equal (1);
        })

    });

    describe ("getDistanceTo", () => {
        [
            "66678",
            "55576",
            "81117",
            "19999",
            "11221"
        ].forEach ( (compareTo) => {
            it ( "55567 should be smaller " + compareTo, () => {
                expect ( new Hand("55567").compareTo(new Hand(compareTo))).to.be.lessThan ( 0 );
            })
        });

        [
            "23456",
            "11167",
            "55543",
            "19219"
        ].forEach ( (compareTo) => {
            it ( "55567 should be larger " + compareTo, () => {
                expect ( new Hand("55567").compareTo(new Hand(compareTo))).to.be.greaterThan ( 0 );
            })
        });

        [
            "23456",
            "11167",
            "55543",
            "19219"
        ].forEach ( (compareTo) => {
            it ( compareTo + " should be equal to itself", () => {
                expect ( new Hand(compareTo).compareTo(new Hand(compareTo))).to.be.equal ( 0 );
            })
        });        
    });

    describe ("getDistanceTo using J as Joker", () => {
        [
            "JJJJ7",
            "655J1"
        ].forEach ( (compareTo) => {
            it ( "55567 should be smaller than " + compareTo, () => {
                expect ( new Hand("55567", true).compareTo(new Hand(compareTo, true))).to.be.lessThan ( 0 );
            })
        });

        new Map<string, string>([
            ["33456", "4J789"],
            ["J3456", "22456"],
            ["44J41", "44441"],
            ["11122", "11112"]
        ]).forEach( (larger: string, smaller: string) => {
            it ( `${smaller} should be smaller than ${larger}`, () => {
                expect ( new Hand ( smaller, true).compareTo( new Hand ( larger, true))).to.be.lessThan (0);
            })
        });

    });

});