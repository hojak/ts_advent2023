import { expect } from "chai";
import { describe } from "mocha";
import { BroadcasterModule, FlipFlopModule, Module } from "../../../src/ts/day20/module";
import { SignalType } from "../../../src/ts/day20/signal";

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

    describe ( "BroadcaseModule", () => {
        let testee = new BroadcasterModule ( "B", ["a", "b"]);
        it ( "should distribute a Low Pulse to all outputs", () => {
            let signals = testee.process ( SignalType.Low );
            expect(signals).to.be.deep.equal ( [{type: SignalType.Low, destination: "a"}, {type: SignalType.Low, destination: "b"}])
        });

        it ( "should distribute a High Pulse to all outputs", () => {
            let signals = testee.process ( SignalType.High );
            expect(signals).to.be.deep.equal ( [{type: SignalType.High, destination: "a"}, {type: SignalType.High, destination: "b"}])
        });
    })

    describe ( "FlipFlipModule", () => {
        let testee = new FlipFlopModule("flip", ["a", "b"]);
        it ( "should be turned off on initialization", () => {
            expect(testee.isOn).to.be.false;
        })

        it ( "should ignore a HighPuls", () => {
            expect(testee.process ( SignalType.High)).to.be.empty;
        })

        it ( "should turn on and send a High Pulse when receiving a LowPulse", () => {
            let resultingSignals = testee.process ( SignalType.Low );

            expect(testee.isOn).to.be.true;
            expect(resultingSignals).to.be.deep.equal ( [{type: SignalType.High, destination: "a"}, {type: SignalType.High, destination: "b"}])
        });

        it ( "should still should ignore a HighPuls", () => {
            expect(testee.process ( SignalType.High)).to.be.empty;
        })

        it ( "should turn off and send a Low Pulse when receiving a LowPulse", () => {
            let resultingSignals = testee.process ( SignalType.Low );

            expect(testee.isOn).to.be.false;
            expect(resultingSignals).to.be.deep.equal ( [{type: SignalType.Low, destination: "a"}, {type: SignalType.Low, destination: "b"}])

        });
    })
})

