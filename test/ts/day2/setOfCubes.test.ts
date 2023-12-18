import { expect } from "chai"
import { SetOfCubes } from "../../../src/ts/day2/setOfCubes"


describe("SetOfCubes", () =>{
    it ( "should create a set", () => {
        expect ( new SetOfCubes ( 1, 1, 1)).not.to.be.null;
    });

    [
        [1,1,1],
        [1,0,0],
        [2,1,1],
    ].forEach( (setDefinition : (number)[])  => {
        it ( "it should contain itself: " + setDefinition, () => {
            expect ( new SetOfCubes ( setDefinition[0], setDefinition[1], setDefinition[2])
                .contains ( new SetOfCubes(setDefinition[0],setDefinition[1],setDefinition[2] )))
                .to.be.true;
        })            
    });

    [
        [1,1,1],
        [1,0,0],
        [2,1,1],
    ].forEach( (setDefinition : (number)[])  => {
        it ( "it should contain empty set: " + setDefinition, () => {
            expect ( new SetOfCubes ( setDefinition[0], setDefinition[1], setDefinition[2])
                .contains ( new SetOfCubes(0,0,0 )))
                .to.be.true;
        })            
    });


})