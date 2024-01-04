import { expect } from "chai";
import { describe } from "mocha";
import { Graph } from "../../../src/ts/day25/graph";

describe( "Day 25: Graph", () => {
    describe ( "getPartitionSize", () => {
        it ( "should return 2 for a graph with two connected nodes", () => {
            expect(new Graph("a: b").getPartitionSize("a")).to.be.equal(2);
        })
    } )

    describe ( "getListOfEdges", () => {
        it ( "should return a list with x edges", () => {
            expect(new Graph("a: b\nc: d\ne: a").getListOfEdgeDescriptions()).to.be.deep.equal([
                "a,b",
                "a,e",
                "c,d"
            ]);
        })
    } )
});

