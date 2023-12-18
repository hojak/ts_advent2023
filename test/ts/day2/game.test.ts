import { describe } from "mocha";
import { Game } from "../../../src/ts/day2/game";
import { expect } from "chai";
import { SetOfCubes } from "../../../src/ts/day2/setOfCubes";

describe("Game", () => {
    it ( "an empty set should be possible", () => {
        expect(Game.createFromString("Game 1:").isPossibleWith ( new SetOfCubes(1,1,1))).to.be.true;
    });

    it ( "finding 2 reds should not be possible", () => {
        expect(Game.createFromString("Game 2:2 red").isPossibleWith ( new SetOfCubes(1,1,1))).to.be.false;
    });

    it ( "finding 2 blues should not be possible (1)", () => {
        expect(Game.createFromString("Game 3: 2 red; 2 blue").isPossibleWith ( new SetOfCubes(1,2,2))).to.be.false;
    });
    
    it ( "finding 2 blues should not be possible (2)", () => {
        expect(Game.createFromString("Game 1: 2 red, 1 blue; 1 green, 2 red; 2 blue")
            .isPossibleWith ( new SetOfCubes(1,2,2))).to.be.false;
    });

    it ("should have number 12", () => {
        expect (Game.createFromString("Game 12: 2 red").getNumber()).to.be.equal(12);
    })


    it ( "Game 1 should be possible", function () {
        expect ( Game.createFromString("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green")
            .isPossibleWith(SetOfCubes.createFromString("12 red, 13 green, 14 blue"))).to.be.true;
    })

    it ( "Game 3 should not be possible", function () {
        expect ( Game.createFromString("Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red")
            .isPossibleWith(SetOfCubes.createFromString("12 red, 13 green, 14 blue"))).to.be.false;
    })
})