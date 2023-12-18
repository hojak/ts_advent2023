import { expect } from "chai";
import { describe } from "mocha";
import { Schematic } from "../../../src/ts/day3/schematic";

describe ("day 3", () => {
    describe ("Schematic", () => {
        it ( "should return 0", () => {
            const testee = new Schematic ("123");
            expect ( testee.getSumOfMissingParts ()).to.be.equal(0);
        })
    });
})