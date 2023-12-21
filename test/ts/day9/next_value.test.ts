import { expect } from "chai";
import { describe } from "mocha";
import { next_step, sum_of_next_steps } from "../../../src/ts/day9/next_step";

describe ( "day 9", () => {

    describe ( "next_value", () => {

        it ( "should be 0", () => {
            expect( next_step ( [])).to.be.equal(0);
        })

        it ( "should be 5", () => {
            expect ( next_step([5])).to.be.equal(5);
        })

        it ( "should be 1", () => {
            expect ( next_step([1,1])).to.be.equal(1);
        })

        it ( "should be 68", () => {
            expect ( next_step([10, 13, 16, 21, 30, 45])).to.be.equal(68);
        });
    });

    describe ( "sum_of_next_steps", () => {
        it ( "should return 114", () => {
            expect ( sum_of_next_steps( 
                "0 3 6 9 12 15\n"+
                "1 3 6 10 15 21\n"+
                "10 13 16 21 30 45"
            )).to.be.equal(114);
        })
    });


});