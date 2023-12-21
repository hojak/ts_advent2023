import { expect } from "chai";
import { describe } from "mocha";
import { Universe } from "../../../src/ts/day11/universe";

describe ( "day 11", () => {
    
    describe ( "creating universe", () => {
        it ( "should find the correct size", () => {
            let testee = new Universe("..\n..");
            expect(testee.cols).to.be.equal(2);
            expect(testee.rows).to.be.equal(2);
        })
    })

    describe ( "expanding universe", () => {



    });

});