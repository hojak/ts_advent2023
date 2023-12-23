import { expect } from "chai";
import { describe } from "mocha";
import { hash } from "../../../src/ts/day15/hash";

describe( "day 15: hash", () => {
    describe ( "hash", () => {
        it ( "should return 30", () => {
            expect ( hash("rn=1") ).to.be.equal ( 30 );
        })
    })
})