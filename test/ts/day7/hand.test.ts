import { expect } from "chai";
import { Hand, HandType } from "../../../src/ts/day7/Hand";

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
});