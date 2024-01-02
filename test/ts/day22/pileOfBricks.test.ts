import { describe } from "mocha";
import { Brick } from "../../../src/ts/day22/brick";
import { Coordinates } from "../../../src/ts/day22/coordinates";
import { expect } from "chai";
import { PileOfBricks } from "../../../src/ts/day22/pileOfBricks";

describe ( "Day 22: PileOfBricks", () => {
    describe ( "placing a brick", () => {
        it ( "block should fall down to ground level", () => {
            let pile = new PileOfBricks();
            pile.add ( new Brick ( "1,0,10~1,0,10"));

            expect ( pile.isOccupied( new Coordinates ( 1,0,0)) ).to.be.true;
            expect ( pile.numberOfOccupiedSpaces()).to.be.equal(1);
        })
    });
});