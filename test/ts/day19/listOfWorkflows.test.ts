import { expect } from "chai";
import { describe } from "mocha";
import { ListOfWorkflows, evaluateParts } from "../../../src/ts/day19/listOfWorkflows";
import { Part, createPartFromString } from "../../../src/ts/day19/part";
import { RangeOfParts } from "../../../src/ts/day19/rangeOfParts";


describe ( "day 19: ListOfWorkflows", () => {
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

        it ( "should accept (787, 2655, 1222, 2876)", () => {
            expect ( testee.runOnPart ( createPartFromString ( "{x=787,m=2655,a=1222,s=2876}"))).to.be.equal("A");
        });

        it ( "should not accept (1679, 44, 2067, 496)", () => {
            expect ( testee.runOnPart ( createPartFromString ( "{x=1679,m=44,a=2067,s=496}"))).to.be.equal("R");
        })
    })


    describe ( "getAcceptedPartsOfInput", () => {
        it ( "should return parts resulting in 19114", () => {
            expect ( evaluateParts ( testee.getAcceptedPartsOfInput (
                "{x=787,m=2655,a=1222,s=2876}\n"+
                "{x=1679,m=44,a=2067,s=496}\n"+
                "{x=2036,m=264,a=79,s=2244}\n"+
                "{x=2461,m=1339,a=466,s=291}\n"+
                "{x=2127,m=1623,a=2188,s=1013}"
            ))).to.be.equal(19114)
        });
    })

    describe ("getAcceptedRanges", () => {
        it ( "should return the full possible range for a simple accepting rule", () => {
            expect ( new ListOfWorkflows("in{A}").getAcceptedRanges( RangeOfParts.standardRange()))
               .to.be.deep.equal([RangeOfParts.standardRange()]);
        });

        it ( "should return 2000<a for a simple rule", () => {
            expect ( new ListOfWorkflows("in{a>2000:A,R}").getAcceptedRanges( RangeOfParts.standardRange()))
               .to.be.deep.equal([new RangeOfParts(new Part(0,0,2001,0), new Part(4000,4000,4000,4000))]);
        });

    });

});