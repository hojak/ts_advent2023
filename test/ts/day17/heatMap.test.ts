import { expect } from "chai";
import { describe } from "mocha";
import { HeatMap } from "../../../src/ts/day17/heatMap";

describe("Day 17: heatMap", () => {
    describe ( "findHeatLossForBestRoute", () => {
        it ( "should return 102 for the test input", () => {
            expect( new HeatMap( 
                "2413432311323\n"+
                "3215453535623\n"+
                "3255245654254\n"+
                "3446585845452\n"+
                "4546657867536\n"+
                "1438598798454\n"+
                "4457876987766\n"+
                "3637877979653\n"+
                "4654967986887\n"+
                "4564679986453\n"+
                "1224686865563\n"+
                "2546548887735\n"+
                "4322674655533"
            ).findHeatLossForBestRoute()).to.be.equal(102)
        });
    })
})