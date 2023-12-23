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

    describe ("getLines", () => {
        let testee = new Area ( "1111\n2222\n3333");

        it ( "should return the first line", () => {
            expect ( testee.getLines(0,0)).to.be.deep.equal(["1111"]);
        })
        it ( "should return two first lines", () => {
            expect ( testee.getLines(0,1)).to.be.deep.equal(["1111", "2222"]);
        })
        it ( "should return center lines", () => {
            expect ( testee.getLines(1,1)).to.be.deep.equal(["2222"]);
        })
    });


    describe ( "getLastLines", () => {
        let testee = new Area ( "1111\n2222\n3333");

        it ( "should return the last line", () => {
            expect ( testee.getLastLines(1)).to.be.deep.equal(["3333"]);
        })
        it ( "should return two first lines", () => {
            expect ( testee.getLastLines(2)).to.be.deep.equal(["2222", "3333"]);
        })
    })

    describe ( "getFirstColumns", () => {
        let testee = new Area ( "1111\n2232\n3343");

        it ( "should return the first column", () => {
            expect ( testee.getFirstColumns(1)).to.be.deep.equal(["123"]);
        })
        it ( "should return three first columns", () => {
            expect ( testee.getFirstColumns(3)).to.be.deep.equal(["123", "123", "134"]);
        })
    })

    describe ( "getColumns", () => {
        let testee = new Area ( "1111\n2232\n3345");

        it ( "should return the first column", () => {
            expect ( testee.getColumns(0,0)).to.be.deep.equal(["123"]);
        })
        it ( "should return columns 2 and 3", () => {
            expect ( testee.getColumns(2,3)).to.be.deep.equal(["134", "125"]);
        })
    })

})