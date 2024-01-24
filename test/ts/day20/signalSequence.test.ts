import { describe } from "mocha";
import { SignalType } from "../../../src/ts/day20/signal";
import { SignalSequence } from "../../../src/ts/day20/signalSequence";
import { expect } from "chai";

describe ( "Day 20: SignalSequence", () => {
    describe( "get signals per push", () => {
        let testee = new SignalSequence ();
        testee.add ( {sender: "a", receiver: "b", type: SignalType.Low, push: 1});
        testee.add ( {sender: "a", receiver: "b", type: SignalType.Low, push: 2});
        testee.add ( {sender: "a", receiver: "b", type: SignalType.Low, push: 2});
        testee.add ( {sender: "a", receiver: "b", type: SignalType.Low, push: 3});
        testee.add ( {sender: "a", receiver: "b", type: SignalType.Low, push: 4});

        it ( "should return both signals of push 2", () => {
        expect ( testee.getSignalsOfPush(2)).to.be.deep.equal ( [
            {sender: "a", receiver: "b", type: SignalType.Low, push: 2},
            {sender: "a", receiver: "b", type: SignalType.Low, push: 2}
        ])});
    });


    describe ("simple loops", () => {
        let testee = new SignalSequence ([], [
            {sender: "a", receiver: "b", type: SignalType.Low, push: 1},
            {sender: "c", receiver: "b", type: SignalType.High, push: 1},
            {sender: "a", receiver: "b", type: SignalType.Low, push: 2}
        ]);

        it ( "should return the 2 signals of the first push of the loop", () => {
            expect ( testee.getSignalsOfPush(11)).to.be.deep.equal ( [
                {sender: "a", receiver: "b", type: SignalType.Low, push: 11},
                {sender: "c", receiver: "b", type: SignalType.High, push: 11}
            ]);
        });
    });

    describe ("simple loop with initial sequence", () => {
        let testee = new SignalSequence ([
            {sender: "a", receiver: "b", type: SignalType.Low, push: 1},
            {sender: "a", receiver: "b", type: SignalType.Low, push: 2},
            {sender: "a", receiver: "b", type: SignalType.Low, push: 2}
        ],[
            {sender: "c", receiver: "b", type: SignalType.Low, push: 1},
            {sender: "c", receiver: "b", type: SignalType.High, push: 3},
        ]);

        it ( "should return the correct signal of the initial sequence", () => {
            expect ( testee.getSignalsOfPush(2)).to.be.deep.equal ( [
                {sender: "a", receiver: "b", type: SignalType.Low, push: 2},
                {sender: "a", receiver: "b", type: SignalType.Low, push: 2}
            ]);
        });

        it ( "should return no signal for the middle of the loop", () => {
            expect ( testee.getSignalsOfPush(7)).to.be.empty;
        });

        it ( "should return the signal of the first push of the loop", () => {
            expect ( testee.getSignalsOfPush(6)).to.be.deep.equal([
                {sender: "c", receiver: "b", type: SignalType.Low, push: 6},
            ]);
        });
    });
});


