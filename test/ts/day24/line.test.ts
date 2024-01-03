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

    })
});