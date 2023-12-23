import { expect } from "chai";
import { describe } from "mocha";
import { Platform, moveBlock, tiltColumn } from "../../../src/ts/day14/Platform";

describe ("day 14: platform", () => {
    describe ( "tilting", () => {
        it ( "should tilt correctly", () => {
            expect ( new Platform ( "..\nOO").tilt().getDescription()).to.be.equal( "OO\n..");
        } );
    })

    describe ( "moveBlock", () => {
        it ( "should move the block correctly", () => {
            expect (moveBlock ("---x---O---", 7, 3)).to.be.equal ("---O---.---");
            expect (moveBlock (".O", 1, 0)).to.be.equal ("O.");
        })
    })

    describe ( "tiltColumn", () => {
        it ( "should tilt the column correctly", () => {
            expect (tiltColumn ("...O...")).to.be.equal ("O......");
            expect (tiltColumn (".#.O...")).to.be.equal (".#O....");
            expect (tiltColumn (".O")).to.be.equal ("O.");
        })
    })
})