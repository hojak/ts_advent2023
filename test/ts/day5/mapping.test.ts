import { expect } from "chai";
import { describe } from "mocha";
import { Mapping } from "../../../src/ts/day5/mapping";

describe ("day 5: mapping", () => {

    let testee = new Mapping ( 
        "0 10 2\n"+
        "10 100 20\n"+
        "1000 500 10\n"+
        "500 600 100"
    );

    [31, 32, 600, 999].forEach ( (source: number) => {
        it( source + " should map to itself", () => {
            expect ( testee.map ( source )).to.be.equal ( source );
        })
    });

    [
        [0, 10],
        [1, 11],
        [10, 100],
        [29, 119],
        [1000, 500],
        [550, 650],
    ].forEach((expectedMapping: number[]) => {
        it ( expectedMapping[0] + " should map to " + expectedMapping[1], () => {
            expect( testee.map(expectedMapping[0])).to.be.equal(expectedMapping[1]);
        })
    });

})