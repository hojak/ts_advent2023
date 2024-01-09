import { expect } from "chai";
import { describe } from "mocha";
import { Universe } from "../../../src/ts/day11/universe";

describe ( "Day 11", () => {
    
    describe ( "creating universe", () => {
        it ( "should find the correct size", () => {
            let testee = new Universe("##\n##");
            expect(testee.cols).to.be.equal(2);
            expect(testee.rows).to.be.equal(2);
        })
    })

    describe ( "expanding universe", () => {
        it ( "should find empty rows", () => {
            let testee = new Universe ( "...#...\n.......\n#######");
            expect(testee.emptyRows).to.be.deep.equal ([1]);
        });

        it ( "should find empty cols", () => {
            let testee = new Universe ( ".#.#\n..##");
            expect(testee.emptyCols).to.be.deep.equal ([0]);
        });
    });

    describe ( "getSumOfDistances", () => {
        it ( "should return 374", () => {
            let testee = new Universe (
                "...#......\n"+
                ".......#..\n"+
                "#.........\n"+
                "..........\n"+
                "......#...\n"+
                ".#........\n"+
                ".........#\n"+
                "..........\n"+
                ".......#..\n"+
                "#...#.....\n"
            );
            expect ( testee.getSumOfDistances()).to.be.equal(374);
        })


        it ( "should return 6", () => {
            let testee = new Universe (
                "#..\n"+
                "...\n"+
                "..#"
            );
            expect ( testee.getSumOfDistances()).to.be.equal(6);
        })
    });

});