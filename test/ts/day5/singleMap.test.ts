import { expect } from "chai";
import { describe } from "mocha";
import { SingleMap } from "../../../src/ts/day5/singleMap";

describe("day 5", () => {
    
    describe ("singleMap", () => {
        let testee = new SingleMap ( 1, 10, 5 );
        it ( "should be the correct start", () => {
            expect( testee.getSourceStart()).to.be.equal(1);
        });

        it ( "should return the correct end", () => {
            expect( testee.getSourceEnd()).to.be.equal(5);
        });

        [
            [1, 10],
            [5, 14]
        ].forEach((expectedMapping: number[]) => {
            it ( expectedMapping[0] + " should map to " + expectedMapping[1], () => {
                expect( testee.map(expectedMapping[0])).to.be.equal(expectedMapping[1]);
            })
        });


        [0, -1, 6, 10, 100].forEach ( (source : number) => {
            it ( source + " should not be covered", () => {
                expect ( testee.isCovered ( source )).to.be.false;
            })
        });

        [1, 2, 3, 4, 5].forEach ( (source : number) => {
            it ( source + " should be covered", () => {
                expect ( testee.isCovered ( source )).to.be.true;
            })
        })
    })

    describe ("singleMap.createFromString", () => {
        it ( "should create a correct map", () => {
            expect ( SingleMap.createFromString("1 2 3")).to.be.deep.equal ( new SingleMap (2, 1, 3));
        })
    })
});