import { expect } from "chai"
import { SetOfCubes } from "../../../src/ts/day2/setOfCubes"


describe("SetOfCubes", () =>{
    it ( "should create a set", () => {
        expect ( new SetOfCubes ( 1, 1, 1)).not.to.be.null;
    })
})