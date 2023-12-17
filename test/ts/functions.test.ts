import { expect } from "chai";
import { findCalibrationValue } from "../../src/ts/functions";

describe ('findCalibrationValue', () => {

    [
        ["0", 0]
    ].forEach( (inputAndExpected : (string|number)[] ) => {
        it ( inputAndExpected[0] + ' should calibrate to ' + inputAndExpected[0], () => {
            expect(findCalibrationValue (""+inputAndExpected[0])).to.be.deep.equal(inputAndExpected[1]);
        })
    
    })


});