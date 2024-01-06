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
            expect ( testee.process ( {
                type: SignalType.Low, receiver: "broadcaster", sender: "button"
            })).to.be.deep.equal ([8,4]);
        })
    })
});