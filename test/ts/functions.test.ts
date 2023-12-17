import { expect } from "chai";
import { findCalibrationValue } from "../../src/ts/functions";

describe ('findCalibrationValue', () => {
    it ('should find 0', () => {
        expect(findCalibrationValue ('0')).to.be.deep.equal(0);
    })

    
});