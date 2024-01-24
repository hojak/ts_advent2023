import { expect } from "chai";
import { describe } from "mocha";
import { ModuleConfiguration } from "../../../src/ts/day20/moduleConfiguration";
import { ConjunctionModule } from "../../../src/ts/day20/module";
import { SignalType } from "../../../src/ts/day20/signal";

describe("Day 20: ModuleConfiguration", () => {
    describe ("create configuration", () => {

        let testee = new ModuleConfiguration ( 
            "broadcaster -> a, b, c\n"+
            "%a -> b\n"+
            "%b -> c\n"+
            "%c -> inv\n"+
            "&inv -> a"
        );

        it ( "should have 5 modules", () => {
            expect(testee.getNumberOfModules()).to.be.equal (5);
        })

        it ( "inv should have c as input", () => {
            expect((testee.getModule("inv") as ConjunctionModule).getInputModules()).to.be.deep.equal(["c"]);
        })

        
        it ( "broadcast should have a,b,c as output", () => {
            expect(testee.getModule("broadcaster")?.outputs).to.be.deep.equal(["a","b","c"]);
        })

        it ( "a should have b as output", () => {
            expect(testee.getModule("a")?.outputs).to.be.deep.equal(["b"]);
        })

    })

    describe ( "processSignal", () => {
        let testee = new ModuleConfiguration ( 
            "broadcaster -> a, b, c\n"+
            "%a -> b\n"+
            "%b -> c\n"+
            "%c -> inv\n"+
            "&inv -> a"
        );

        it ( "should return the expected count of low and high signals", () => {
            testee.process ( {
                type: SignalType.Low, receiver: "broadcaster", sender: "button", push: 1
            });

            expect ( testee.getNumberOfProcessedSignals()).to.be.deep.equal ([8,4]);
        })
    })

    describe("counting signals", () => {
        it ( "should return 8000 low and 4000 high signales for pushing 1000 times", () => {

            let testee = new ModuleConfiguration ( 
                "broadcaster -> a, b, c\n"+
                "%a -> b\n"+
                "%b -> c\n"+
                "%c -> inv\n"+
                "&inv -> a"
            );

            testee.pushTheButton(1000);

            expect( testee.getNumberOfProcessedSignals()).to.be.deep.equal([8000,4000]);
        })

        it ( "should collect signals with no especially configured receiver", () => {
            let testee = new ModuleConfiguration ( 
                "broadcaster -> a, b"
            );
            testee.pushTheButton(1);

            expect (testee.getNumberOfProcessedSignals()).to.be.deep.equal ([3,0]);
        });
    });


    describe("simple loop computation", () => {

        /**
         *    push  1 | 2  | 3 | 4  | 5  | 6 | 7  | 8
         * 
         *     bc
         *     |
         *     |    l | l  | l | l  | l  | l | l  | ....
         *     v
         *  F->%a
         *  |  |    
         *  |  |    h | l. | h | lh | l. | h | lh | l
         *  |  v        ^^^^^^^^^^^^ LOOP
         *  |  %b
         *  |  |    
         *  L--J    . | h  | . | l. | h  | . | l. | h
         *                   ^^^^^^^^^^^^  LOOP
         * 
         */
        let testee = new ModuleConfiguration(
            "broadcaster -> a\n"+
            "%a -> b\n"+
            "%b -> a"
        );

        testee.pushTheButton(8);

        it ( "should have reached a loop incoming at b", () => {
            expect(testee.getModule("b")?.received.signals).to.be.deep.equal ([
                {push: 1, sender: "a", receiver: "b", type: SignalType.High},

                {push: 2, sender: "a", receiver: "b", type: SignalType.Low},
                {push: 3, sender: "a", receiver: "b", type: SignalType.High},
                {push: 4, sender: "a", receiver: "b", type: SignalType.Low},
                {push: 4, sender: "a", receiver: "b", type: SignalType.High},

                {push: 5, sender: "a", receiver: "b", type: SignalType.Low},
                {push: 6, sender: "a", receiver: "b", type: SignalType.High},
                {push: 7, sender: "a", receiver: "b", type: SignalType.Low},
                {push: 7, sender: "a", receiver: "b", type: SignalType.High},

                {push: 8, sender: "a", receiver: "b", type: SignalType.Low},
            ]);
        })

        it ( "at a loop back input should be combined with broadcaster signal", () => {
            expect(testee.getModule("a")?.received.signals).to.be.deep.equal ([
                {push: 1, sender: "broadcaster", receiver: "a", type: SignalType.Low},

                {push: 2, sender: "broadcaster", receiver: "a", type: SignalType.Low},
                {push: 2, sender: "b", receiver: "a", type: SignalType.High},

                {push: 3, sender: "broadcaster", receiver: "a", type: SignalType.Low},

                {push: 4, sender: "broadcaster", receiver: "a", type: SignalType.Low},
                {push: 4, sender: "b", receiver: "a", type: SignalType.Low},

                {push: 5, sender: "broadcaster", receiver: "a", type: SignalType.Low},
                {push: 5, sender: "b", receiver: "a", type: SignalType.High},

                {push: 6, sender: "broadcaster", receiver: "a", type: SignalType.Low},

                {push: 7, sender: "broadcaster", receiver: "a", type: SignalType.Low},
                {push: 7, sender: "b", receiver: "a", type: SignalType.Low},

                {push: 8, sender: "broadcaster", receiver: "a", type: SignalType.Low},
                {push: 8, sender: "b", receiver: "a", type: SignalType.High},
            ]);

        });
    })
});