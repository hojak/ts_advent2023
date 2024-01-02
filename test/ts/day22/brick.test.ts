import { expect } from "chai";
import { describe } from "mocha";
import { Brick } from "../../../src/ts/day22/brick";
import { Coordinates } from "../../../src/ts/day22/coordinates";

describe("Day 22: Brick", () => {
    describe ("constructor", () => {
        it ( "should create a brick", () => {
            expect( new Brick( "1,0,1~1,2,1" ).start).to.be.deep.equal ( new Coordinates ( 1,0,1));
        })
    })

    describe ("getBlocks", () => {
        it ( "should return an array with all blocks of the brick", () => {
            expect ( new Brick("0,0,0~0,0,10").getBlocks()).to.be.deep.equal ([
                new Coordinates(0,0,0),
                new Coordinates(0,0,1),
                new Coordinates(0,0,2),
                new Coordinates(0,0,3),
                new Coordinates(0,0,4),
                new Coordinates(0,0,5),
                new Coordinates(0,0,6),
                new Coordinates(0,0,7),
                new Coordinates(0,0,8),
                new Coordinates(0,0,9),
                new Coordinates(0,0,10)
            ])
        })

        it ( "should return an array with one block", () => {
            expect ( new Brick("0,0,0~0,0,0").getBlocks()).to.be.deep.equal ([ new Coordinates(0,0,0)] ); 
        });

        it ( "should work in negative direction", () => {
            expect ( new Brick("0,3,0~0,0,0").getBlocks()).to.be.deep.equal ([ 
                new Coordinates(0,3,0),
                new Coordinates(0,2,0),
                new Coordinates(0,1,0),
                new Coordinates(0,0,0)
            ]); 
        });
    });

    describe ( "isZDirection", () => {
        [
            new Brick("1,0,0~1,0,10"),
            new Brick("1,0,10~1,0,1"),
            new Brick("1,0,0~1,0,-1"),
        ].forEach ( testee => {
            it ( testee.toString() + " should be in Z direction", () => {
                expect(testee.isZDirection()).to.be.true;
            })
        });

        [
            new Brick("1,0,0~1,0,0"),
            new Brick("1,0,0~10,0,0")
        ].forEach ( testee => {
            it ( testee.toString() + " should not be in Z direction", () => {
                expect(testee.isZDirection()).to.be.false;
            })
        });

    })
});