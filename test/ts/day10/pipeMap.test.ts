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
            expect ( testee.getSymbolAt(3,3)).to.be.equal ( "J");
        })

        it ( "should return starting position 1/1", () => {
            expect ( testee.getStartingPosition()).to.be.deep.equal ( [1,1]);
        })
    });
});
