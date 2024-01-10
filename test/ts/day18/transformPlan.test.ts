import { expect } from "chai";
import { describe } from "mocha";
import { hexToNumber, transformPlan } from "../../../src/ts/day18/transformPlan";

describe ("Day 18: Transform Plan", () => {
    it ( "should return the correct plan", () => {
        expect (
            transformPlan (
                "r 1 (#70c710)\n"+
                "r 1 (#0dc571)\n"+
                "r 1 (#5713f0)\n"+
                "r 1 (#d2c081)\n"+
                "r 1 (#59c680)\n"+
                "r 1 (#411b91)\n"+
                "r 1 (#8ceee2)\n"+
                "r 1 (#caa173)\n"+
                "r 1 (#1b58a2)\n"+
                "r 1 (#caa171)\n"+
                "r 1 (#7807d2)\n"+
                "r 1 (#a77fa3)\n"+
                "r 1 (#015232)\n"+
                "r 1 (#7a21e3)"
            )
        ).to.be.equal (
            "R 461937\n"+
            "D 56407\n"+
            "R 356671\n"+
            "D 863240\n"+
            "R 367720\n"+
            "D 266681\n"+
            "L 577262\n"+
            "U 829975\n"+
            "L 112010\n"+
            "D 829975\n"+
            "L 491645\n"+
            "U 686074\n"+
            "L 5411\n"+
            "U 500254"
        );
    })


    describe ( "hexToNumber", () => {
        it ( "should transform correctly", () => {
            expect ( Math.pow(16,0)).to.be.equal(1);
            expect ( hexToNumber ("9")).to.be.equal (9);
            expect ( hexToNumber ("a")).to.be.equal (10);
            expect ( hexToNumber ("a0")).to.be.equal (160);
            expect ( hexToNumber ("a1")).to.be.equal (161);
        })
    })
});