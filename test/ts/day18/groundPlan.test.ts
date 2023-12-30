import { expect } from "chai";
import { describe } from "mocha";
import { GroundPlan } from "../../../src/ts/day18/groundPlan";

describe ( "Day 18: Ground Plan", () => {
    describe ("executeDigPlan", () => {
        it ( "should dig 38 holes", () => {
            expect(new GroundPlan ().digAsPlanned(
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
            ).numberOfDiggedSquares()).to.be.equal (38);
        })

        it ( "should work for negative coordinates", () => {
            expect ( new GroundPlan().digAsPlanned(
                "L 2 ()\n"+
                "U 2 ()\n"+
                "R 2 ()\n"+
                "D 2 ()"
            ).numberOfDiggedSquares()).to.be.equal(8);
        })

        it ( "dig pipe plan", () => {
            expect (new GroundPlan().digAsPlanned(
                "R 2 ()\n"+
                "D 2 ()\n"+
                "L 2 ()\n"+
                "U 2 ()"
            ).planToString()).to.be.equal(
                "F-7\n"+
                "|.|\n"+
                "L-J\n"
            );
        })
    })

    describe ("digOutInterior", () => {
        it ( "should result in a hole of size 62", () => {
            expect(new GroundPlan ().digAsPlanned(
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
            ).digOutInterior().numberOfDiggedSquares()).to.be.equal (62);

        })
    })
});