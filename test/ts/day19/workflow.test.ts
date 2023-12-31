import { expect } from "chai";
import { describe } from "mocha";
import { Workflow } from "../../../src/ts/day19/workflow";
import { Part } from "../../../src/ts/day19/part";

describe ( "Day 19: Workflow", () => {
    describe ("execute", () => {
        it ( "should return accepted", () => {
            expect(new Workflow("aaa{A}").perform( new Part ( 0, 0, 0, 0 ))).to.be.equals("A");
        })

        let testee = new Workflow ( "px{a<2006:qkq,m>2090:A,rfg}");
        it ( "should accept a large m", () => {
            expect( testee.perform ( new Part ( 0,3000,3000, 0))).to.be.equal("A");
        })
        it ( "should route small a to qkq", () => {
            expect( testee.perform ( new Part ( 0,3000, 2000, 0))).to.be.equal("qkq");
        })
        it ( "should route to rfg otherwise", () => {
            expect( testee.perform ( new Part (0, 2000, 3000, 0))).to.be.equal("rfg");
        })
    });
});