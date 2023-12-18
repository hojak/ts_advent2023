import { describe } from "mocha";
import { SetOfDraws } from "../../../src/ts/day2/setOfDraws";
import { expect } from "chai";
import { SetOfCubes } from "../../../src/ts/day2/setOfCubes";

describe("SetOfDraws", () => {
    it ( "an empty set should be possible", () => {
        expect(SetOfDraws.createFromString("").isPossibleWith ( new SetOfCubes(1,1,1))).to.be.true;
    });

    it ( "finding 2 reds should not be possible", () => {
        expect(SetOfDraws.createFromString("2 red").isPossibleWith ( new SetOfCubes(1,1,1))).to.be.false;
    });

    it ( "finding 2 blues should not be possible (1)", () => {
        expect(SetOfDraws.createFromString("2 red; 2 blue").isPossibleWith ( new SetOfCubes(1,2,2))).to.be.false;
    });
    
    it ( "finding 2 blues should not be possible (2)", () => {
        expect(SetOfDraws.createFromString("2 red, 1 blue; 1 green, 2 red; 2 blue")
            .isPossibleWith ( new SetOfCubes(1,2,2))).to.be.false;
    });

})