import { describe } from "mocha";
import { SetOfDraws } from "../../../src/ts/day2/setOfDraws";
import { expect } from "chai";
import { SetOfCubes } from "../../../src/ts/day2/setOfCubes";

describe("SetOfDraws", () => {
    it ( "should create a set", () => {
        expect(SetOfDraws.createFromString ("1 red; 1 blue")).not.to.be.null;
    });

    it ( "an empty set should be possible", () => {
        expect(SetOfDraws.createFromString("").isPossibleWith ( new SetOfCubes(1,1,1))).to.be.true;
    });
})