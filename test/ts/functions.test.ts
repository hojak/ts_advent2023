import { expect } from "chai";
import { findCalibrationValue } from "../../src/ts/functions";

describe ('findCalibrationValue', () => {
    [
        ["0", 0],
        ["asdhkasjd1adhuawduiad", 11],
        ["2sdhkasjdadhuawduiad3", 23],
        ["asdhka7jdadhuawd9iad", 79],
        ["23", 23],
        ["asdhkasjd22", 22],
    ].forEach( (inputAndExpected : (string|number)[] ) => {
        it ( inputAndExpected[0] + ' should calibrate to ' + inputAndExpected[0], () => {
            expect(findCalibrationValue (""+inputAndExpected[0])).to.be.deep.equal(inputAndExpected[1]);
        })
    
    })

    it ( "should throw an error", () => {
        expect ( () => findCalibrationValue("ahfdahswdoahd")).to.throw(Error, "input does not contain digit");
    })
});