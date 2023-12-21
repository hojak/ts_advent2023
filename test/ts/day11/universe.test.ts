import { expect } from "chai";
import { describe } from "mocha";
import { Universe } from "../../../src/ts/day11/universe";

describe ( "day 11", () => {
    
    describe ( "creating universe", () => {
        it ( "should find the correct size", () => {
            let testee = new Universe("##\n##");
            expect(testee.cols).to.be.equal(2);
            expect(testee.rows).to.be.equal(2);
        })
    })

    describe ( "expanding universe", () => {

        it ( "should enlarge rows", () => {
            let testee = new Universe ( "...#...\n.......\n#######");
            expect(testee.rows).to.be.equal (4);
            expect(testee.cols).to.be.equal (7);
            expect(testee.description).to.be.equal("...#.................#######")
        });

        it ( "should enlarge cols", () => {
            let testee = new Universe ( ".#.#\n..##");
            expect(testee.rows).to.be.equal (2);
            expect(testee.cols).to.be.equal (5);
            expect(testee.description).to.be.equal("..#.#...##")
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
    });

});