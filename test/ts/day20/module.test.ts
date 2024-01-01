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
    })
})

