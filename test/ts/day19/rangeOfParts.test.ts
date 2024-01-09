import { expect } from "chai";
import { describe } from "mocha";
import { Part } from "../../../src/ts/day19/part";
import { RangeOfParts } from "../../../src/ts/day19/rangeOfParts";


describe ("Day 19: Range of Parts", () => {

    describe ("size", () => {
        expect ( new RangeOfParts ( 
            new Part ( 0,10,100,0), 
            new Part ( 10, 30, 100, 50)).size)
        .to.be.equal(11*21*1*51);
    })
});