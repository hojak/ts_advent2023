import { expect } from "chai";
import { describe } from "mocha";
import { BroadcasterModule, Module } from "../../../src/ts/day20/module";

describe ( "Day 20: Module", () => {
    describe ("createFromString", () => {
        it ( "should create a broadcaster", () => {
            let testee = Module.createFromString ("broadcaster -> a,  b, c" );

            expect(testee.constructor.name).to.be.equal("BroadcasterModule");
            expect(testee.outputs).to.deep.equal (["a", "b", "c"]);
        })


        it ( "should create a flip-flip", () => {
            let testee = Module.createFromString ("%xy -> c" );

            expect(testee.constructor.name).to.be.equal("FlipFlopModule");
            expect(testee.name).to.be.equal("xy");
            expect(testee.outputs).to.deep.equal (["c"]);
        })


        it ( "should create a conjunction", () => {
            let testee = Module.createFromString ("&xyz -> c, a" );

            expect(testee.constructor.name).to.be.equal("ConjunctionModule");
            expect(testee.name).to.be.equal("xyz");
            expect(testee.outputs).to.deep.equal (["c", "a"]);
        })
    })
})

