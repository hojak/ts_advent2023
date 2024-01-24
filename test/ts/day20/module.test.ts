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
            let signals = testee.process ( {type: SignalType.Low, receiver: "B", sender: "", push: 1} );
            expect(signals).to.be.deep.equal ( [
                {type: SignalType.Low, receiver: "a", sender: "B", push: 1},
                {type: SignalType.Low, receiver: "b", sender: "B", push: 1}
            ])
        });

        it ( "should distribute a High Pulse to all outputs", () => {
            let signals = testee.process ( {type: SignalType.High, receiver: "B", sender: "", push: 2} );
            expect(signals).to.be.deep.equal ( [
                {type: SignalType.High, receiver: "a", sender: "B", push: 2}, 
                {type: SignalType.High, receiver: "b", sender: "B", push: 2}
            ])
        });
    })

    describe ( "FlipFlipModule", () => {
        let testee = new FlipFlopModule("flip", ["a", "b"]);
        it ( "should be turned off on initialization", () => {
            expect(testee.isOn).to.be.false;
        })

        it ( "should ignore a HighPuls", () => {
            expect(testee.process ( {type: SignalType.High, receiver: "flip", sender: "", push: 1})).to.be.empty;
        })

        it ( "should turn on and send a High Pulse when receiving a LowPulse", () => {
            let resultingSignals = testee.process ( { type: SignalType.Low, receiver: "flip", sender: "", push: 1} );

            expect(testee.isOn).to.be.true;
            expect(resultingSignals).to.be.deep.equal ( [
                {type: SignalType.High, receiver: "a", sender: "flip", push: 1}, 
                {type: SignalType.High, receiver: "b", sender: "flip", push: 1}
            ])
        });

        it ( "should still should ignore a HighPuls", () => {
            expect(testee.process (  { type: SignalType.High, receiver: "flip", sender: "", push: 1})).to.be.empty;
        })

        it ( "should turn off and send a Low Pulse when receiving a LowPulse", () => {
            let resultingSignals = testee.process ( {type: SignalType.Low, receiver: "flip", sender: "", push: 2} );

            expect(testee.isOn).to.be.false;
            expect(resultingSignals).to.be.deep.equal ( [
                {type: SignalType.Low, receiver: "a", sender: "flip", push: 2}, 
                {type: SignalType.Low, receiver: "b", sender: "flip", push: 2}
            ])

        });
    })


    describe ("ConjunctionModule", () => {
        let testee = new ConjunctionModule ( "con", ["a", "b"]);
        testee.addInputModule ( "c" );
        testee.addInputModule ( "d" );

        it ( "should send a high pulse", () => {
            expect( testee.process ( {type: SignalType.Low, sender: "c", receiver: "con", push: 1}) ).to.be.deep.equal ([
                {type: SignalType.High, sender: "con", receiver: "a", push: 1},
                {type: SignalType.High, sender: "con", receiver: "b", push: 1},
            ]);

        })

        it ( "should send a Low Pulse after all inputs have send a High", () => {
            testee.process ( { type: SignalType.High, sender: "c", receiver: "con", push: 1});
            let output = testee.process ( { type: SignalType.High, sender: "d", receiver: "con", push: 1});
            expect( output ).to.be.deep.equal ([
                {type: SignalType.Low, sender: "con", receiver: "a", push: 1},
                {type: SignalType.Low, sender: "con", receiver: "b", push: 1},
            ]);
        })

        it ( "should send a High Pulse after receiving a low from c", () => {
            testee.process ( { type: SignalType.Low, sender: "c", receiver: "con", push: 1});
            let output = testee.process ( { type: SignalType.High, sender: "d", receiver: "con", push: 1});
            expect( output ).to.be.deep.equal ([
                {type: SignalType.High, sender: "con", receiver: "a", push: 1},
                {type: SignalType.High, sender: "con", receiver: "b", push: 1},
            ]);
        })
    });


    describe ( "process signal", () => {
        it ("should store received input signals", () => {
            let testee = new ConjunctionModule ( "con", ["a", "b"]);
            testee.process ( {type: SignalType.Low, sender: "test", receiver: "con", push: 1});
            testee.process ( {type: SignalType.Low, sender: "test2", receiver: "con", push: 1});

            expect ( testee.received.signals ).to.be.deep.equal ([
                {type: SignalType.Low, sender: "test", receiver: "con", push: 1},
                {type: SignalType.Low, sender: "test2", receiver: "con", push: 1}
            ]);
        });
    });
});

