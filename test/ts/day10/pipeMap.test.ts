import { expect } from "chai";
import { describe } from "mocha";
import { PipeMap } from "../../../src/ts/day10/pipeMap";

describe("Day 10", () => {
    let testee = new PipeMap ( 
        ".....\n"+
        ".S-7.\n"+
        ".|.|.\n"+
        ".L-J.\n"+
        "....."
    );

    describe( "create map", () => {
        it ( "should have 5 columns", () => {
            expect(testee.cols).to.be.equal(5);
        });

        it ( "should have 5 rows", () => {
            expect(testee.rows).to.be.equal(5);
        })

        it ( "should find the correct symbol", () => {
            expect ( testee.getSymbolAt([3,3])).to.be.equal ( "J");
        })

        it ( "should return starting position 1/1", () => {
            expect ( testee.getStartingPosition()).to.be.deep.equal ( [1,1]);
        })
    });

    describe ( "get Loop length", () => {
        it ( "should return 8", () => {
            expect ( testee.getLoopLength()).to.be.equal(8);
        })

        let testee2 = new PipeMap (
            "7-F7-\n"+
            ".FJ|7\n"+
            "SJLL7\n"+
            "|F--J\n"+
            "LJ.LJ"
        );
        it ( "should return 14", () => {
            expect ( testee2.getLoopLength()).to.be.equal(16);
        })
    })

    describe ( "get maximal distance in loop", () => {
        it ("should return 4", () => {
            expect ( testee.getMaximalDistance()).to.be.equal(4);
        })
    })
});
