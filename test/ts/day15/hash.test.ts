import { expect } from "chai";
import { describe } from "mocha";
import { checksum, hash } from "../../../src/ts/day15/hash";

describe( "day 15: hash", () => {
    describe ( "hash", () => {
        it ( "should return 30", () => {
            expect ( hash("rn=1") ).to.be.equal ( 30 );
        })
    })

    describe ( "checksum", () => {
        it ( "should return the result as described in the puzzle", () => {
            expect ( checksum ( "rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7")).to.be.equal(1320);
        })
    })
})