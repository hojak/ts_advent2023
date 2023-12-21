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
        
    })
});