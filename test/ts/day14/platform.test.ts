import { expect } from "chai";
import { describe } from "mocha";
import { Platform, moveBlock, tiltColumn } from "../../../src/ts/day14/Platform";

describe ("day 14: platform", () => {
    describe ( "tilting", () => {
        it ( "should tilt correctly", () => {
            expect ( new Platform ( "..\nOO").tilt().getDescription()).to.be.equal( "OO\n..");
            expect ( new Platform ( "..\nOO\nOO").tilt().getDescription()).to.be.equal( "OO\nOO\n..");
        } );

        it ( "should tilt the test input", () => {
            expect ( new Platform (
                "O....#....\n"+
                "O.OO#....#\n"+
                ".....##...\n"+
                "OO.#O....O\n"+
                ".O.....O#.\n"+
                "O.#..O.#.#\n"+
                "..O..#O..O\n"+
                ".......O..\n"+
                "#....###..\n"+
                "#OO..#...."
            ).tilt().getDescription()).to.be.equal(
                "OOOO.#.O..\n"+
                "OO..#....#\n"+
                "OO..O##..O\n"+
                "O..#.OO...\n"+
                "........#.\n"+
                "..#....#.#\n"+
                "..O..#.O.O\n"+
                "..O.......\n"+
                "#....###..\n"+
                "#....#...."
            );
        })
    })

    describe ( "moveBlock", () => {
        it ( "should move the block correctly", () => {
            expect (moveBlock ("---x---O---", 7, 3)).to.be.equal ("---O---.---");
            expect (moveBlock (".O", 1, 0)).to.be.equal ("O.");
        })
    })

    describe ( "tiltColumn", () => {
        it ( "should tilt the column correctly", () => {
            expect (tiltColumn ("...O...")).to.be.equal ("O......");
            expect (tiltColumn (".#.O...")).to.be.equal (".#O....");
            expect (tiltColumn (".O")).to.be.equal ("O.");
        })
    })

    describe("getTotalLoad", () => {
        it ( "should rate a simple case", () => {
            expect ( new Platform(
                "O#\n"+
                ".O"
            ).getTotalLoad()).to.be.equal(3);
        })

        it ("should rate the sample case", () => {
            expect ( new Platform(
                "OOOO.#.O..\n"+
                "OO..#....#\n"+
                "OO..O##..O\n"+
                "O..#.OO...\n"+
                "........#.\n"+
                "..#....#.#\n"+
                "..O..#.O.O\n"+
                "..O.......\n"+
                "#....###..\n"+
                "#....#...."
            ).getTotalLoad()).to.be.equal(136);
        })
    })

    describe ("rotateRight", () => {
        it ( "should rotate the platform 90 degrees to the right", () => {
            expect ( new Platform ( "1-2\n---\n4-3").rotateRight().getDescription()).to.be.equal (
                "4-1\n---\n3-2"
            );
        })
    })

    describe ("cycle", () => {
        it ( "should cycle the test input as given", () => {
            expect ( new Platform (
                "O....#....\n"+
                "O.OO#....#\n"+
                ".....##...\n"+
                "OO.#O....O\n"+
                ".O.....O#.\n"+
                "O.#..O.#.#\n"+
                "..O..#O..O\n"+
                ".......O..\n"+
                "#....###..\n"+
                "#OO..#...."
            ).cylce().getDescription()).to.be.equal (
                ".....#....\n"+
                "....#...O#\n"+
                "...OO##...\n"+
                ".OO#......\n"+
                ".....OOO#.\n"+
                ".O#...O#.#\n"+
                "....O#....\n"+
                "......OOOO\n"+
                "#...O###..\n"+
                "#..OO#...."
            );
        });

        it ( "should cycle 2 times the test input as given", () => {
            expect ( new Platform (
                "O....#....\n"+
                "O.OO#....#\n"+
                ".....##...\n"+
                "OO.#O....O\n"+
                ".O.....O#.\n"+
                "O.#..O.#.#\n"+
                "..O..#O..O\n"+
                ".......O..\n"+
                "#....###..\n"+
                "#OO..#...."
            ).cylce().cylce().getDescription()).to.be.equal (
                ".....#....\n"+
                "....#...O#\n"+
                ".....##...\n"+
                "..O#......\n"+
                ".....OOO#.\n"+
                ".O#...O#.#\n"+
                "....O#...O\n"+
                ".......OOO\n"+
                "#..OO###..\n"+
                "#.OOO#...O"
            );
        });
    })
})