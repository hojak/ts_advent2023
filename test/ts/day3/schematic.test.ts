import { expect } from "chai";
import { describe } from "mocha";
import { Schematic } from "../../../src/ts/day3/schematic";

describe ("day 3", () => {
    describe ("Schematic", () => {
        it ( "should return recognize a simple 1", () => {
            const testee = new Schematic ("1*");
            expect ( testee.getSumOfMissingParts ()).to.be.equal(1);
        })
    });
})