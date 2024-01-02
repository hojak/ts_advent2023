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
})