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
        expect ( testee.getSignalsReceivedInPush(2)).to.be.deep.equal ( [
            {sender: "a", receiver: "b", type: SignalType.Low, push: 2},
            {sender: "a", receiver: "b", type: SignalType.Low, push: 2}
        ])});
    });
});