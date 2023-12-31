import { expect } from "chai";
import { describe } from "mocha";
import { Garden } from "../../../src/ts/day21/garden";

describe ("Day 21: Garden", () => {
    describe ( "create a garden", () => {
        let testee = new Garden ( 
            "..........."+"\n"+
            ".....###.#."+"\n"+
            ".###.##..#."+"\n"+
            "..#.#...#.."+"\n"+
            "....#.#...."+"\n"+
            ".##..S####."+"\n"+
            ".##..#...#."+"\n"+
            ".......##.."+"\n"+
            ".##.#.####."+"\n"+
            ".##..##.##."+"\n"+
            "..........."
        );

        it ( "should have size 11x11", () => {
            expect ( testee.getWidth() ).to.be.equal(11);
            expect ( testee.getHeight() ).to.be.equal(11);
        });

        it ( "should have S at position 5/5", () => {
            expect ( testee.getSymbolAt ( {x:5, y:5 })).to.be.equal("S");
        })
    });


    let testee = new Garden ( 
        "..........."+"\n"+
        ".....###.#."+"\n"+
        ".###.##..#."+"\n"+
        "..#.#...#.."+"\n"+
        "....#.#...."+"\n"+
        ".##..S####."+"\n"+
        ".##..#...#."+"\n"+
        ".......##.."+"\n"+
        ".##.#.####."+"\n"+
        ".##..##.##."+"\n"+
        "..........."
    );


    describe ( "getNumberOfReachablePots", () => {
        it ( "should identify 2 reachable pots with 1 step", () => {
            expect ( testee.getNumberOfReachablePots(1)).to.be.equal (2);                
        });

        it ( "should identify 4 reachable pots with 2 steps", () => {
            expect ( testee.getNumberOfReachablePots(2)).to.be.equal (4);                
        });

        it ( "should identify 16 reachable pots with 6 steps", () => {
            expect ( testee.getNumberOfReachablePots(6)).to.be.equal (16);                
        });
    })

    describe ( "getNumberOfReachablePots (with infinite map)", () => {
        it ( "should return 1594 for 50 steps", () => {
            expect ( testee.getNumberOfReachablePots(50, true)).to.be.equal (1594);
        });

        it ( "should return 167004 for 100 steps", () => {
            expect ( testee.getNumberOfReachablePots(100, true)).to.be.equal (6536);
        });
    });


    describe ("computeReachableTilesForLageNumberOfSteps", () => {
        it ( "should return 16733044 for 5000 steps in the test input", () => {
            expect ( testee.computeReachableTilesForLageNumberOfSteps(5000)).to.be.equal (16733044);
        })

        it ( "should return 1594 for 50 steps in the test input", () => {
            expect ( testee.computeReachableTilesForLageNumberOfSteps(50)).to.be.equal (1594);
        })

        it ( "should return 167004 for 500 steps in the test input", () => {
            expect ( testee.computeReachableTilesForLageNumberOfSteps(500)).to.be.equal (167004);
        })

        it ( "should return 16 for 6 steps in the test input", () => {
            expect ( testee.computeReachableTilesForLageNumberOfSteps(6)).to.be.equal (16);
        })

    })
});