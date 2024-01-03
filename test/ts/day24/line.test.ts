import { expect } from "chai";
import { describe } from "mocha";
import { Line } from "../../../src/ts/day24/line";
import { Vector } from "../../../src/ts/day24/vector";

describe ("Day 24: Line", () => {
    describe ( "constructor", () => {
        it ( "should create a line", () => {
            const testee = new Line("19, 13, 30 @ -2,  1, -2");
            expect( testee.startPosition ).to.be.deep.equal(new Vector ( 19, 13, 30));
            expect( testee.direction).to.be.deep.equal(new Vector ( -2, 1, -2));
        })
    });

    describe ( "getCrossingPoint", () => {
        it ( "should return  (14.333, 15.333, 0)", () => {
            expect (
                new Line ("19, 13, 30 @ -2, 1, -2")
                    .getCrossingPointXY ( new Line ( "18, 19, 22 @ -1, -1, -2"))
                    ).to.be.deep.equal ( new Vector (14.333, 15.333, 0));
        });
        it ( "should return  (11.667, 16.667, 0)", () => {
            expect (
                new Line ("19, 13, 30 @ -2, 1, -2")
                    .getCrossingPointXY ( new Line ( "20, 25, 34 @ -2, -2, -4"))
                    ).to.be.deep.equal ( new Vector (11.667, 16.667, 0));
        });
    });

    describe ( "crossInArea", () => {
        [
            ["19, 13, 30 @ -2, 1, -2", "18, 19, 22 @ -1, -1, -2"],
            ["19, 13, 30 @ -2, 1, -2", "20, 25, 34 @ -2, -2, -4"]
        ].forEach ( pair => {
            it ( "should find a critical crossing for pair " + pair, () => {
                expect ( new Line( pair[0]).hasCriticalCrossing( new Line(pair[1]), new Vector(7,7,0), new Vector(27,27,0))).to.be.true;
            })
        });

        [
            ["19, 13, 30 @ -2, 1, -2", "20, 19, 15 @ 1, -5, -3"],
            ["18, 19, 22 @ -1, -1, -2", "20, 25, 34 @ -2, -2, -4"],
            ["18, 19, 22 @ -1, -1, -2", "12, 31, 28 @ -1, -2, -1"],
            ["18, 19, 22 @ -1, -1, -2", "20, 19, 15 @ 1, -5, -3"],
            ["20, 25, 34 @ -2, -2, -4", "20, 19, 15 @ 1, -5, -3"],
            ["19, 13, 30 @ -2, 1, -2", "12, 31, 28 @ -1, -2, -1"]
        ].forEach ( pair => {
            it ( "should not find a critical crossing for pair " + pair, () => {
                expect ( new Line( pair[0]).hasCriticalCrossing( new Line(pair[1]), new Vector(7,7,0), new Vector(27,27,0))).to.be.false;
            })
        });

    });
});