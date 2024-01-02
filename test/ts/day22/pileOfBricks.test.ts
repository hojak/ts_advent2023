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
            const brick1 = new Brick("1,1,1~1,1,1");
            const brick2 = new Brick("2,2,2~2,4,2");

            pile.add ( brick1)
                .add ( brick2);

            expect(pile.bricks ).to.be.deep.equal ( [
                new Brick("1,1,0~1,1,0"),
                new Brick("2,2,0~2,4,0"),
            ]);
            expect(brick1.start).to.be.deep.equal ( new Coordinates(1,1,0));
            expect(pile.getBrickAt (new Coordinates(2,2,0))).to.be.equal(brick2);
        });
    });

    describe ( "isRemovable", () => {
        let pile = new PileOfBricks();
        const brick1 = new Brick("1,1,1~1,1,1");
        const brick2 = new Brick("0,1,4~2,1,4");

        pile.add ( brick1)
            .add ( brick2);

        it ( "should be removable", () => {
            expect ( pile.isRemovable ( brick2 )).to.be.true;
        })

        it ( "should not be removable", () => {
            expect ( pile.isRemovable ( brick1 )).to.be.false;
        })
    })

    describe ("getNumberOfRemovableBricks", () => {
        it ( "should return 5 for the test input", () => {
            let pile = new PileOfBricks();
            pile.initializeFromSnapshot ( 
                "1,0,1~1,2,1"+"\n"+
                "0,0,2~2,0,2"+"\n"+
                "0,2,3~2,2,3"+"\n"+
                "0,0,4~0,2,4"+"\n"+
                "2,0,5~2,2,5"+"\n"+
                "0,1,6~2,1,6"+"\n"+
                "1,1,8~1,1,9"
            );

            expect ( pile.getNumberOfRemovableBricks()).to.be.equal (5);

        });
    });

    
    describe ("howManyBricksWouldFall", () => {
        it ( "should return 6 for the first brick of the test input", () => {
            let pile = new PileOfBricks();
            pile.initializeFromSnapshot ( 
                "1,0,1~1,2,1"+"\n"+
                "0,0,2~2,0,2"+"\n"+
                "0,2,3~2,2,3"+"\n"+
                "0,0,4~0,2,4"+"\n"+
                "2,0,5~2,2,5"+"\n"+
                "0,1,6~2,1,6"+"\n"+
                "1,1,8~1,1,9"
            );

            expect ( pile.howManyBricksWouldFall( pile.bricks[0])).to.be.equal (6); // Brick A
            expect ( pile.howManyBricksWouldFall( pile.bricks[5])).to.be.equal (1); // Brick F
        });
    });

    describe ("initializeFromSnaphot", () => {
        it ( "it should not use the order of bricks", () => {
            let pile = new PileOfBricks();
            pile.initializeFromSnapshot ( 
                "0,1,2~2,1,2"+"\n"+
                "1,1,1~1,1,1"
            );

            expect ( pile.isOccupied( new Coordinates ( 1,1,0)) ).to.be.true;
            expect ( pile.isOccupied( new Coordinates ( 0,1,1)) ).to.be.true;
            expect ( pile.isOccupied( new Coordinates ( 1,1,1)) ).to.be.true;
            expect ( pile.isOccupied( new Coordinates ( 2,1,1)) ).to.be.true;
        });
    })
});