import { expect } from "chai";
import { describe } from "mocha";
import { HikingMap } from "../../../src/ts/day23/hikingMap";

describe ("Day 23: HikingMap", () => {

    let testee = new HikingMap ( 
        "#.#####################\n"+
        "#.......#########...###\n"+
        "#######.#########.#.###\n"+
        "###.....#.>.>.###.#.###\n"+
        "###v#####.#v#.###.#.###\n"+
        "###.>...#.#.#.....#...#\n"+
        "###v###.#.#.#########.#\n"+
        "###...#.#.#.......#...#\n"+
        "#####.#.#.#######.#.###\n"+
        "#.....#.#.#.......#...#\n"+
        "#.#####.#.#.#########v#\n"+
        "#.#...#...#...###...>.#\n"+
        "#.#.#v#######v###.###v#\n"+
        "#...#.>.#...>.>.#.###.#\n"+
        "#####v#.#.###v#.#.###.#\n"+
        "#.....#...#...#.#.#...#\n"+
        "#.#########.###.#.#.###\n"+
        "#...###...#...#...#.###\n"+
        "###.###.#.###v#####v###\n"+
        "#...#...#.#.>.>.#.>.###\n"+
        "#.###.###.#.###.#.#v###\n"+
        "#.....###...###...#...#\n"+
        "#####################.#"
    );

    describe ("constructor", () => {
        it ( "should create a map of size 23x23", () => {
            expect(testee.width).to.be.equal(23);
            expect(testee.height).to.be.equal(23);
        })
    })
})