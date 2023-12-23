import { expect } from "chai";
import { describe } from "mocha";
import { Area } from "../../../src/ts/day13/Area";

describe( "Day 13: area", () => {

    describe ( "getFirstLines", () => {
        let testee = new Area ( "1111\n2222\n3333");

        it ( "should return the first line", () => {
            expect ( testee.getFirstLines(1)).to.be.deep.equal(["1111"]);
        })
        it ( "should return two first lines", () => {
            expect ( testee.getFirstLines(2)).to.be.deep.equal(["1111", "2222"]);
        })
    })

    
})