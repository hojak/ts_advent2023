import { expect } from "chai";
import { describe } from "mocha";
import { Workflow } from "../../../src/ts/day19/workflow";
import { Part } from "../../../src/ts/day19/part";

describe ( "Day 19: Workflow", () => {
    describe ("execute", () => {
        it ( "should return accepted", () => {
            expect(new Workflow("aaa{A}").perform( { x: 0, m: 0, a: 0, s: 0 })).to.be.equals("A");
        })

        let testee = new Workflow ( "px{a<2006:qkq,m>2090:A,rfg}");
        it ( "should accept a large m", () => {
            expect( testee.perform ( {x: 0, a: 3000, m:3000, s: 0})).to.be.equal("A");
        })
        it ( "should route small a to qkq", () => {
            expect( testee.perform ( {x: 0, a: 1000, m:3000, s: 0})).to.be.equal("qkq");
        })
        it ( "should route to rfg otherwise", () => {
            expect( testee.perform ( {x: 0, a: 3000, m:2000, s: 0})).to.be.equal("rfg");
        })
    });
});