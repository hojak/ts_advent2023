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
            for ( let i=0; i<1000; i++)  {
                testee.pushTheButton();
            }

            expect( testee.getNumberOfProcessedSignals()).to.be.deep.equal([8000,4000]);
        })

        it ( "should collect signals with no especially configured receiver", () => {
            let testee = new ModuleConfiguration ( 
                "broadcaster -> a, b"
            );
            testee.pushTheButton();

            expect (testee.getNumberOfProcessedSignals()).to.be.deep.equal ([3,0]);
        });
    });
});