import { expect } from "chai";
import { Hand, HandType } from "../../../src/ts/day7/Hand";

describe ("day 7: hand", () => {
    describe ( "finding type", () => {
        it ("should be of type five of a kind", () => {
            expect ( new Hand ("AAAAA").getType()).to.be.equal ( HandType.FiveOfAKind);
        })
    } )
});