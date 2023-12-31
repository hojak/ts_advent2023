import { expect } from "chai";
import { describe } from "mocha";
import { ListOfWorkflows } from "../../../src/ts/day19/listOfWorkflows";

describe ( "day 19: ListOfWorkflows", () => {

    describe("initializing workflow", () => {
        it ( "should create a workflow with 3 entries", () => {
            expect(new ListOfWorkflows ( 
                "aaa{a<10:bbb,ccc}\n"+
                "bbb{ccc}\n"+
                "ccc{A}"
            ).getNumberOfWorkflows ()).to.be.equal ( 3);
        })

    });

});