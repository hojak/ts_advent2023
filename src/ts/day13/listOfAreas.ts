import { expect } from "chai";
import { describe } from "mocha";
import { ListOfAreas } from "../../../test/ts/day13/listOfAreas.test";

describe( "Day 13: list of areas", () => {


    describe("rate list of areas", () => {
        it ( "should return 405", () => {
            let testee = new ListOfAreas ( 
                "#.##..##.\n"+
                "..#.##.#.\n"+
                "##......#\n"+
                "##......#\n"+
                "..#.##.#.\n"+
                "..##..##.\n"+
                "#.#.##.#.\n"+
                "\n"+
                "#...##..#\n"+
                "#....#..#\n"+
                "..##..###\n"+
                "#####.##.\n"+
                "#####.##.\n"+
                "..##..###\n"+
                "#....#..#"
            );
            expect(testee.getRate()).to.be.equal(405);
        });
    });

})