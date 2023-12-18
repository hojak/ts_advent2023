import { expect } from "chai";
import { findCalibrationValue, calibrate } from "../../../src/ts/day1/functions_part2";

describe ('day 1', () => {

    describe ('findCalibrationValue', () => {
        [
            ["0", 0],
            ["asdhkasjd1adhuawduiad", 11],
            ["2sdhkasjdadhuawduiad3", 23],
            ["asdhka7jdadhuawd9iad", 79],
            ["23", 23],
            ["asdhkasjd22", 22],
            ["blaonetest1", 11],
            ["blaonetest", 11],
            ["one", 11],
            ["two", 22],
            ["three", 33],
            ["four", 44],
            ["five", 55],
            ["six", 66],
            ["seven", 77],
            ["eight", 88],
            ["nine", 99],
        ].forEach( (inputAndExpected : (string|number)[] ) => {
            it ( inputAndExpected[0] + ' should calibrate to ' + inputAndExpected[0], () => {
                expect(findCalibrationValue (""+inputAndExpected[0])).to.be.deep.equal(inputAndExpected[1]);
            })
        
        })

        it ( "should throw an error", () => {
            expect ( () => findCalibrationValue("ahfdahswdoahd")).to.throw(Error, "input does not contain digit");
        })
    });


    describe ('calibrate', () => {
        [
            ["0", 0],
            ["1", 11],
            ["1\n2", 33],
            ["1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet", 142],
            ["two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen", 281]
        ].forEach( (inputAndExpected : (string|number)[] ) => {
            it ( inputAndExpected[0] + ' should calibrate to ' + inputAndExpected[0], () => {
                expect(calibrate (""+inputAndExpected[0])).to.be.deep.equal(inputAndExpected[1]);
            })
        })

        it ( "should return 0 for empty input", () => {
            expect(calibrate ("")).to.be.equal(0);
        })

        it ( "should raise an error", () => {
            expect ( () => calibrate("aadsdlk")).to.throw(Error, "input does not contain digit");
        })
    });
});