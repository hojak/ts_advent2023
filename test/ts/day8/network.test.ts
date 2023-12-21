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

    it ( "should need 6 simultaneous steps", () => {
        expect ( new Network ( 
            "LR\n"+
            "\n"+
            "11A = (11B, XXX)\n"+
            "11B = (XXX, 11Z)\n"+
            "11Z = (11B, XXX)\n"+
            "22A = (22B, XXX)\n"+
            "22B = (22C, 22C)\n"+
            "22C = (22Z, 22Z)\n"+
            "22Z = (22B, 22B)\n"+
            "XXX = (XXX, XXX)"
        ).getNumberOfNecessarySimultaneousSteps()).to.be.equal(6);
    });

});