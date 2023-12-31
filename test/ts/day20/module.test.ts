import { expect } from "chai";
import { describe } from "mocha";
import { BroadcasterModule, ConjunctionModule, FlipFlopModule, Module } from "../../../src/ts/day20/module";
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
            let signals = testee.process ( {type: SignalType.Low, receiver: "B", sender: ""} );
            expect(signals).to.be.deep.equal ( [
                {type: SignalType.Low, receiver: "a", sender: "B"},
                {type: SignalType.Low, receiver: "b", sender: "B"}
            ])
        });

        it ( "should distribute a High Pulse to all outputs", () => {
            let signals = testee.process ( {type: SignalType.High, receiver: "B", sender: ""} );
            expect(signals).to.be.deep.equal ( [
                {type: SignalType.High, receiver: "a", sender: "B"}, 
                {type: SignalType.High, receiver: "b", sender: "B"}
            ])
        });
    })

    describe ( "FlipFlipModule", () => {
        let testee = new FlipFlopModule("flip", ["a", "b"]);
        it ( "should be turned off on initialization", () => {
            expect(testee.isOn).to.be.false;
        })

        it ( "should ignore a HighPuls", () => {
            expect(testee.process ( {type: SignalType.High, receiver: "flip", sender: ""})).to.be.empty;
        })

        it ( "should turn on and send a High Pulse when receiving a LowPulse", () => {
            let resultingSignals = testee.process ( { type: SignalType.Low, receiver: "flip", sender: ""} );

            expect(testee.isOn).to.be.true;
            expect(resultingSignals).to.be.deep.equal ( [
                {type: SignalType.High, receiver: "a", sender: "flip"}, 
                {type: SignalType.High, receiver: "b", sender: "flip"}
            ])
        });

        it ( "should still should ignore a HighPuls", () => {
            expect(testee.process (  { type: SignalType.High, receiver: "flip", sender: ""})).to.be.empty;
        })

        it ( "should turn off and send a Low Pulse when receiving a LowPulse", () => {
            let resultingSignals = testee.process ( {type: SignalType.Low, receiver: "flip", sender: ""} );

            expect(testee.isOn).to.be.false;
            expect(resultingSignals).to.be.deep.equal ( [
                {type: SignalType.Low, receiver: "a", sender: "flip"}, 
                {type: SignalType.Low, receiver: "b", sender: "flip"}
            ])

        });
    })


    describe ("ConjunctionModule", () => {
        let testee = new ConjunctionModule ( "con", ["a", "b"]);
        testee.addInputModule ( "c" );
        testee.addInputModule ( "d" );

        it ( "should send a high pulse", () => {
            expect( testee.process ( {type: SignalType.Low, sender: "c", receiver: "con"}) ).to.be.deep.equal ([
                {type: SignalType.High, sender: "con", receiver: "a"},
                {type: SignalType.High, sender: "con", receiver: "b"},
            ]);

        })

        it ( "should send a Low Pulse after all inputs have send a High", () => {
            testee.process ( { type: SignalType.High, sender: "c", receiver: "con"});
            let output = testee.process ( { type: SignalType.High, sender: "d", receiver: "con"});
            expect( output ).to.be.deep.equal ([
                {type: SignalType.Low, sender: "con", receiver: "a"},
                {type: SignalType.Low, sender: "con", receiver: "b"},
            ]);
        })

        it ( "should send a High Pulse after receiving a low from c", () => {
            testee.process ( { type: SignalType.Low, sender: "c", receiver: "con"});
            let output = testee.process ( { type: SignalType.High, sender: "d", receiver: "con"});
            expect( output ).to.be.deep.equal ([
                {type: SignalType.High, sender: "con", receiver: "a"},
                {type: SignalType.High, sender: "con", receiver: "b"},
            ]);
        })

    });
})

