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
});