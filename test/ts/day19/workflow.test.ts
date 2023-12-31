import { expect } from "chai";
import { describe } from "mocha";
import { Workflow } from "../../../src/ts/day19/workflow";
import { Part } from "../../../src/ts/day19/part";

describe ( "Day 19: Workflow", () => {
    describe ("execute", () => {
        it ( "should return accepted", () => {
            expect(new Workflow("aaa{A}").perform( { x: 0, m: 0, a: 0, s: 0 })).to.be.equals("A");
        })
    });
});