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


    [
        [1,1,1],
        [1,0,0],
        [2,1,1],
    ].forEach( (setDefinition : (number)[])  => {
        it ( "it should not contain larger set: " + setDefinition, () => {
            expect ( new SetOfCubes ( setDefinition[0], setDefinition[1], setDefinition[2])
                .contains ( new SetOfCubes(setDefinition[0]+1,setDefinition[1],setDefinition[2] )))
                .to.be.false;
            expect ( new SetOfCubes ( setDefinition[0], setDefinition[1], setDefinition[2])
                .contains ( new SetOfCubes(setDefinition[0],setDefinition[1]+1,setDefinition[2] )))
                .to.be.false;
            expect ( new SetOfCubes ( setDefinition[0], setDefinition[1], setDefinition[2])
                .contains ( new SetOfCubes(setDefinition[0],setDefinition[1],setDefinition[2]+1 )))
                .to.be.false;
        })            
    });

    it ("should create a set with one blue cube", () => {
        expect ( SetOfCubes.createFromString("1 blue")).to.be.deep.equal(new SetOfCubes(1,0,0));
    })

    it ("should create a set with multiple blue cube", () => {
        expect ( SetOfCubes.createFromString("243 blue")).to.be.deep.equal(new SetOfCubes(243,0,0));
    })

    it ("should create a set with cubes of all colors", () => {
        expect ( SetOfCubes.createFromString("243 blue, 234 green, 123 red"))
            .to.be.deep.equal(new SetOfCubes(243,234,123));
    })

    it ("should use the last found value", () => {
        expect ( SetOfCubes.createFromString("1 red, 2 red, 3 red"))
            .to.be.deep.equal(new SetOfCubes(0,0,3));
    })

    it ("should ignore white spaces", () => {
        expect ( SetOfCubes.createFromString("   1     red   "))
            .to.be.deep.equal(new SetOfCubes(0,0,1));
    })

    describe ("Power", () => {
        it ( "should be 0 for an empty set", () => {
            expect ( new SetOfCubes ( 0,0,0).getPower()).to.be.equal(0);
        })

        it ( "should be the sum of the number of cubes", () => {
            expect ( new SetOfCubes ( 10,20,30).getPower()).to.be.equal(60);
        })

    })

    describe ("getSuperSet", () => {
        it ( "should stay the same for a smaller set", () => {
            let testSet = new SetOfCubes(10,11,12);
            expect ( testSet.getSuperSetWith( new SetOfCubes(10,1,1))).to.be.deep.equal(testSet);
        })

        it ( "should return the larger set", () => {
            let testSet = new SetOfCubes(10,11,12);
            expect ( new SetOfCubes(1,1,1).getSuperSetWith( testSet )).to.be.deep.equal(testSet);
        })

        it ( "should return a set with the larger number of cubes for each color", () => {
            expect ( 
                new SetOfCubes(10,1,7).getSuperSetWith( new SetOfCubes(2, 20, 12) ))
                .to.be.deep.equal(new SetOfCubes(10, 20, 12));
        })
    });
})