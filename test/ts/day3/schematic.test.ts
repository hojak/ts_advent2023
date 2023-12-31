import { expect } from "chai";
import { describe } from "mocha";
import { Schematic } from "../../../src/ts/day3/schematic";

describe ("Day 3", () => {
    describe ("Schematic Day 1", () => {
        it ( "should return recognize a simple 1", () => {
            const testee = new Schematic ("1*");
            expect ( testee.getSumOfMissingParts ()).to.be.equal(1);
        })

        it ( "should recognize a multichar number", () => {
            const testee = new Schematic ("123*");
            expect ( testee.getSumOfMissingParts ()).to.be.equal(123);
        })
        
        it ( "should also recognize # as a symbol", () => {
            const testee = new Schematic ("123#");
            expect ( testee.getSumOfMissingParts ()).to.be.equal(123);
        })

        it ( "should not recognize . as a symbol", () => {
            const testee = new Schematic ("123.");
            expect ( testee.getSumOfMissingParts ()).to.be.equal(0);
        })

        it ( "should not recognize \n as a symbol", () => {
            const testee = new Schematic ("123\n");
            expect ( testee.getSumOfMissingParts ()).to.be.equal(0);
        })

        it ( "should also recognize a symbol in front of a part", () => {
            const testee = new Schematic ("*123\n");
            expect ( testee.getSumOfMissingParts ()).to.be.equal(123);
        })

        it ( "should recognize a symbol below a part", () => {
            const testee = new Schematic ("1\n*");
            expect ( testee.getSumOfMissingParts ()).to.be.equal(1);
        })

        it ( "should recognize a symbol over a part", () => {
            const testee = new Schematic ("..*..\n..1..\n");
            expect ( testee.getSumOfMissingParts ()).to.be.equal(1);
        })
        
        it ( "should recognize a symbol top right of a part", () => {
            const testee = new Schematic ("....*\n.123.\n");
            expect ( testee.getSumOfMissingParts ()).to.be.equal(123);
        })

        it ( "should recognize a symbol bottom left of a part", () => {
            const testee = new Schematic (".....\n.123.\n*....");
            expect ( testee.getSumOfMissingParts ()).to.be.equal(123);
        })

        it ( "should compute the correct test value", () => {
            const testee = new Schematic (
                "467..114..\n"+
                "...*......\n"+
                "..35..633.\n"+
                "......#...\n"+
                "617*......\n"+
                ".....+.58.\n"+
                "..592.....\n"+
                "......755.\n"+
                "...$.*....\n"+
                ".664.598..\n"
            );
            expect ( testee.getSumOfMissingParts ()).to.be.equal(4361);
        });

    });

    describe ( "Gear Evaluation (part 2)", () => {
        it ( "should return a value", () => {
            expect ( new Schematic(".").getSumOfGearRatios()).to.be.equal (0)
        });

        it ( "should be 6 for a simple case", () => {
            expect ( new Schematic("2*3").getSumOfGearRatios ()).to.be.equal (6);
        });

        it ( "should recognize a value right to left", () => {
            expect ( new Schematic("11*3").getSumOfGearRatios ()).to.be.equal (33);
        });

        it ( "should recognize a gear with both parts on top", () => {
            expect ( new Schematic("2.3\n.*.\n").getSumOfGearRatios ()).to.be.equal (6);
        });

        it ( "should not recognize a gear with 3 adjacent parts", () => {
            expect ( new Schematic("2.3\n.*1\n").getSumOfGearRatios ()).to.be.equal (0);
        });

        
        it ( "should recognize a gear with both parts on bottom", () => {
            expect ( new Schematic(".*.\n2.3\n").getSumOfGearRatios ()).to.be.equal (6);
        });

        it ( "should recognize a gear with a large part on top", () => {
            expect ( new Schematic("123\n2*.\n").getSumOfGearRatios ()).to.be.equal (246);
        });

        it ( "should recognize a gear with a part on center top", () => {
            expect ( new Schematic(".23\n2*.\n").getSumOfGearRatios ()).to.be.equal (46);
        });

        it ( "should recognize a gear with a part on top right", () => {
            expect ( new Schematic("..12\n2*..\n").getSumOfGearRatios ()).to.be.equal (24);
        });


        it ( "should compute the correct test value", () => {
            const testee = new Schematic (
                "467..114..\n"+
                "...*......\n"+
                "..35..633.\n"+
                "......#...\n"+
                "617*......\n"+
                ".....+.58.\n"+
                "..592.....\n"+
                "......755.\n"+
                "...$.*....\n"+
                ".664.598..\n"
            );
            expect ( testee.getSumOfGearRatios ()).to.be.equal(467835);
        });



    });
});