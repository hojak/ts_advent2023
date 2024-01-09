import { expect } from "chai";
import { describe } from "mocha";
import { DigTrail } from "../../../src/ts/day18/digTrail";

describe ("Day 18: Dig Trail", () => {

    let testee = new DigTrail (
        "R 6 (#70c710)\n"+
        "D 5 (#0dc571)\n"+
        "L 2 (#5713f0)\n"+
        "D 2 (#d2c081)\n"+
        "R 2 (#59c680)\n"+
        "D 2 (#411b91)\n"+
        "L 5 (#8ceee2)\n"+
        "U 2 (#caa173)\n"+
        "L 1 (#1b58a2)\n"+
        "U 2 (#caa171)\n"+
        "R 2 (#7807d2)\n"+
        "U 3 (#a77fa3)\n"+
        "L 2 (#015232)\n"+
        "U 2 (#7a21e3)"
    );

    describe( "Constructor", () => {
        it ( "should create a trail with 14 entries", () => {
            expect(testee.numberOfSegments).to.be.equal(14);
        });
    });

    describe ( "getLength", () => {
        it ( "should have length of 38", () => {
            expect(testee.getLength()).to.be.equal (38);
        });
    });

    describe ("getSizeOfHole", () => {
        it ( "should have a size of 62", () => {
            expect(testee.getSizeOfHole()).to.be.equal (62);        
        });

        
        it ( "should have a size of 9 (1)", () => {
            expect( new DigTrail ( 
                "R 2\n"+
                "D 2\n"+
                "L 2\n"+
                "U 2"
            ).getSizeOfHole()).to.be.equal (9);
        });

        it ( "should have a size of 33", () => {
            expect( new DigTrail ( 
                "R 2\n"+
                "D 2\n"+
                "R 2\n"+
                "U 2\n"+
                "R 2\n"+
                "D 4\n"+
                "L 6\n"+
                "U 4\n"
            ).getSizeOfHole()).to.be.equal (33);
        });

        it ( "should have a size of 9 (2)", () => {
            expect( new DigTrail ( 
                "L 2\n"+
                "D 2\n"+
                "R 2\n"+
                "U 2"
            ).getSizeOfHole()).to.be.equal (9);
        });

    });
});