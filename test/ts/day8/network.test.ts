import { expect } from "chai";
import { describe } from "mocha";
import { Network } from "../../../src/ts/day8/network";

describe ( "Day 8: Network", () => {

    it ( "should find a way with 6 steps", () => {
        expect ( new Network ( 
            "LLR\n"+
            "\n"+
            "AAA = (BBB, BBB)\n"+
            "BBB = (AAA, ZZZ)\n"+
            "ZZZ = (ZZZ, ZZZ)"
        ).getNumberOfNecessarySteps()).to.be.equal(6);
    });


    it ( "should find a way", () => {
        expect ( new Network ( 
            "RL\n"+
            "\n"+
            "AAA = (BBB, CCC)\n"+
            "BBB = (DDD, EEE)\n"+
            "CCC = (ZZZ, GGG)\n"+
            "DDD = (DDD, DDD)\n"+
            "EEE = (EEE, EEE)\n"+
            "GGG = (GGG, GGG)\n"+
            "ZZZ = (ZZZ, ZZZ)"
        ).getNumberOfNecessarySteps()).to.be.equal(2);
    });

});