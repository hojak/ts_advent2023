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

        it ( "a larger block should fall down an occupy space", () => {
            let pile = new PileOfBricks();
            pile.add ( new Brick ( "10,0,10~1,0,10"));

            expect ( pile.isOccupied( new Coordinates ( 1,0,0)) ).to.be.true;
            expect ( pile.isOccupied( new Coordinates ( 10,0,0)) ).to.be.true;
            expect ( pile.isOccupied( new Coordinates ( 3,0,0)) ).to.be.true;
            expect ( pile.numberOfOccupiedSpaces()).to.be.equal(10);
        })

        it ( "large block falls down on a small one", () => {
            let pile = new PileOfBricks();
            pile.add ( new Brick ( "1,1,0~1,1,0"));

            pile.add ( new Brick ( "0,1,10~10,1,10"));
            expect ( pile.isOccupied( new Coordinates ( 1,1,0)) ).to.be.true;
            expect ( pile.isOccupied( new Coordinates ( 0,1,1)) ).to.be.true;
            expect ( pile.isOccupied( new Coordinates ( 1,1,1)) ).to.be.true;
            expect ( pile.isOccupied( new Coordinates ( 2,1,1)) ).to.be.true;
            expect ( pile.isOccupied( new Coordinates ( 3,1,1)) ).to.be.true;
            expect ( pile.isOccupied( new Coordinates ( 4,1,1)) ).to.be.true;
            expect ( pile.isOccupied( new Coordinates ( 5,1,1)) ).to.be.true;
            expect ( pile.isOccupied( new Coordinates ( 6,1,1)) ).to.be.true;
            expect ( pile.isOccupied( new Coordinates ( 7,1,1)) ).to.be.true;
            expect ( pile.isOccupied( new Coordinates ( 8,1,1)) ).to.be.true;
            expect ( pile.isOccupied( new Coordinates ( 9,1,1)) ).to.be.true;
            expect ( pile.isOccupied( new Coordinates ( 10,1,1)) ).to.be.true;

            expect ( pile.isOccupied( new Coordinates ( 10,1,0)) ).to.be.false;

            expect ( pile.numberOfOccupiedSpaces()).to.be.equal(12);
        })

        it ("should keep a list of added bricks", () => {
            let pile = new PileOfBricks();
            pile.add ( new Brick ( "1,1,1~1,1,1"));
            pile.add ( new Brick ( "2,2,2~2,4,2"));

            expect ( pile.bricks ).to.be.deep.equal ( [
                new Brick("1,1,0~1,1,0"),
                new Brick("2,2,0~2,4,0"),
            ]);
        });
    });
});