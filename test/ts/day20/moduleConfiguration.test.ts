import { expect } from "chai";
import { describe } from "mocha";
import { ModuleConfiguration } from "../../../src/ts/day20/moduleConfiguration";

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

    })
});