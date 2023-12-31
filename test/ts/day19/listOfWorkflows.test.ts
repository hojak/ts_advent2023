import { expect } from "chai";
import { describe } from "mocha";
import { ListOfWorkflows } from "../../../src/ts/day19/listOfWorkflows";
import { createPartFromString } from "../../../src/ts/day19/part";

describe ( "day 19: ListOfWorkflows", () => {

    describe("initializing workflow", () => {
        it ( "should create a workflow with 3 entries", () => {
            expect(new ListOfWorkflows ( 
                "aaa{a<10:bbb,ccc}\n"+
                "bbb{ccc}\n"+
                "ccc{A}"
            ).getNumberOfWorkflows ()).to.be.equal ( 3);
        })
    });

    describe("runOnPart", () => {
        let testee = new ListOfWorkflows (
            "px{a<2006:qkq,m>2090:A,rfg}\n"+
            "pv{a>1716:R,A}\n"+
            "lnx{m>1548:A,A}\n"+
            "rfg{s<537:gd,x>2440:R,A}\n"+
            "qs{s>3448:A,lnx}\n"+
            "qkq{x<1416:A,crn}\n"+
            "crn{x>2662:A,R}\n"+
            "in{s<1351:px,qqz}\n"+
            "qqz{s>2770:qs,m<1801:hdj,R}\n"+
            "gd{a>3333:R,R}\n"+
            "hdj{m>838:A,pv}"
        );

        it ( "should accept (787, 2655, 1222, 2876)", () => {
            expect ( testee.runOnPart ( createPartFromString ( "{x=787,m=2655,a=1222,s=2876}"))).to.be.equal("A");
        });

        it ( "should not accept (1679, 44, 2067, 496)", () => {
            expect ( testee.runOnPart ( createPartFromString ( "{x=1679,m=44,a=2067,s=496}"))).to.be.equal("R");
        })
    })

});