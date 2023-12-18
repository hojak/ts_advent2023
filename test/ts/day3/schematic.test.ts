import { expect } from "chai";
import { describe } from "mocha";
import { Schematic } from "../../../src/ts/day3/schematic";

describe ("day 3", () => {
    describe ("Schematic", () => {
        it ( "should return recognize a simple 1", () => {
            const testee = new Schematic ("1*");
            expect ( testee.getSumOfMissingParts ()).to.be.equal(1);
        })

        it ( "should recognize a multichar number", () => {
            const testee = new Schematic ("123*");
            expect ( testee.getSumOfMissingParts ()).to.be.equal(123);
        })

        
        it ( "should also recognize # as a symbol", () => {
            const testee = new Schematic ("123#");
            expect ( testee.getSumOfMissingParts ()).to.be.equal(123);
        })

        it ( "should not recognize . as a symbol", () => {
            const testee = new Schematic ("123.");
            expect ( testee.getSumOfMissingParts ()).to.be.equal(0);
        })

        it ( "should not recognize \n as a symbol", () => {
            const testee = new Schematic ("123\n");
            expect ( testee.getSumOfMissingParts ()).to.be.equal(0);
        })

        it ( "should also recognize a symbol in front of a part", () => {
            const testee = new Schematic ("*123\n");
            expect ( testee.getSumOfMissingParts ()).to.be.equal(123);
        })


        it ( "should recognize a symbol below a part", () => {
            const testee = new Schematic ("1\n*");
            expect ( testee.getSumOfMissingParts ()).to.be.equal(1);
        })



    });
})