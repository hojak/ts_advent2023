import { expect } from "chai";
import { describe } from "mocha";
import { Part } from "../../../src/ts/day19/part";
import { RangeOfParts } from "../../../src/ts/day19/rangeOfParts";


describe ("Day 19: Range of Parts", () => {

    describe ("size", () => {
        it ( "should return the expected range", () => {
            expect ( new RangeOfParts ( 
                new Part ( 0,10,100,0), 
                new Part ( 10, 30, 100, 50)).size)
            .to.be.equal(11*21*1*51);    
        })

        it ( "should return 100", () => {
            expect ( new RangeOfParts ( 
                new Part ( 0,0,0,0), 
                new Part ( 99, 0, 0, 0)).size)
            .to.be.equal(100);    
        })

        it ( "should return 0 if NaN is in min", () => {
            expect ( new RangeOfParts ( 
                new Part ( 0,10,NaN,0), 
                new Part ( 10, 30, 100, 50)).size)
            .to.be.equal(0);    
        })

        it ( "should return the correct size for the standard range", () => {
            expect ( RangeOfParts.standardRange().size)
            .to.be.equal(Math.pow (4000,4));    
        })


        
    })
});