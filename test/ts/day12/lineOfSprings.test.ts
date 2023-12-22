import { expect } from "chai";
import { describe } from "mocha";
import { LineOfSprings } from "../../../src/ts/day12/lineOfSprings";

describe ( "Day 12", () => {

    describe ("count possibilities", () => {

        [
            ["? 1", 1],
            ["?? 1", 2],
            ["???.### 1,1,3", 1],
            [".??..??...?##. 1,1,3", 4],
            ["?#?#?#?#?#?#?#? 1,3,1,6", 1],
            ["????.#...#... 4,1,1", 1],
            ["????.######..#####. 1,6,5", 4],
            ["?###???????? 3,2,1", 10]
        ].forEach ( input => {
            it ( input[0] + " should have " + input[1] + " possibilities", () => {
                expect ( new LineOfSprings (""+input[0]).getNumberOfPossibleSolutions()).to.be.equal(input[1]);    
            });
        });
    })

    describe ( "validate", () => {
        [
            "# 1",
            ".# 1",
            ".#. 1",
            ".## 2",
            "#.#.### 1,1,3"
        ].forEach ( line => {
            it ( line + " should be valid", () => {
                expect ( LineOfSprings.isValidString ( line )).to.be.true;
            })
        });

        [
            "# 0",
            ".# 2",
            ".#. 2",
            ".## 1,1",
        ].forEach ( line => {
            it ( line + " should not be valid", () => {
                expect ( LineOfSprings.isValidString ( line )).to.be.false;
            })
        })

    })

    describe ( "unfold", () => {
        it ( "should unfold", () => {
            let testee = new LineOfSprings("#.# 1,1");
            testee.unfold();

            expect ( testee.toString()).to.be.equal(
                "#.#?#.#?#.#?#.#?#.# 1,1,1,1,1,1,1,1,1,1"
            )
        })
    })




});