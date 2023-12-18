import { describe } from "mocha";
import { SetOfDraws } from "../../../src/ts/day2/setOfDraws";
import { expect } from "chai";

describe("SetOfDraws", () => {
    it ( "should create a set", () => {
        expect ( SetOfDraws.createFromString ("1 red; 1 blue")).not.to.be.null;
    } )
})