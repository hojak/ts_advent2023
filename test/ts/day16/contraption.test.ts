import { expect } from "chai";
import { describe } from "mocha";
import { Contraption } from "../../../src/ts/day16/contraption";

describe ("Day 16: Contraption", () => {

    describe("numberOfEnergizedTiles", () => {
        it ( "should return 46 for the test input", () => {
            expect ( new Contraption (
                ".|...\\....\n"+
                "|.-.\\.....\n"+
                ".....|-...\n"+
                "........|.\n"+
                "..........\n"+
                ".........\\\n"+
                "..../.\\\\..\n"+
                ".-.-/..|..\n"+
                ".|....-|.\\\n"+
                "..//.|...."
            ).numberOfEnergizedTiles()).to.be.equal(46)
        })
    })
});