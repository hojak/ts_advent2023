import { expect } from "chai";
import { describe } from "mocha";
import { Graph } from "../../../src/ts/day25/graph";

describe( "Day 25: Graph", () => {
    describe ( "getPartitionSize", () => {
        it ( "should return 2 for a graph with two connected nodes", () => {
            expect(new Graph("a: b").getPartitionSize(0)).to.be.equal(2);
        })
    } )

    describe ( "getListOfEdges", () => {
        it ( "should return a list with x edges", () => {
            expect(new Graph("a: b\nc: d\ne: a").getListOfEdges()).to.be.deep.equal([
                [0,1],
                [0,4],
                [2,3]
            ]);
        })
    } )

    describe("findPartitioningByRemovingEdges", () => {
        it ( "it should find a 6/9 partition of the testgraph", () => {
            let testGraph = new Graph (
                "jqt: rhn xhk nvd" + "\n" +
                "rsh: frs pzl lsr" + "\n" +
                "xhk: hfx" + "\n" +
                "cmg: qnr nvd lhk bvb" + "\n" +
                "rhn: xhk bvb hfx" + "\n" +
                "bvb: xhk hfx" + "\n" +
                "pzl: lsr hfx nvd" + "\n" +
                "qnr: nvd" + "\n" +
                "ntq: jqt hfx bvb xhk" + "\n" +
                "nvd: lhk" + "\n" +
                "lsr: lhk" + "\n" +
                "rzs: qnr cmg lsr rsh" + "\n" +
                "frs: qnr lhk lsr"
            );

            expect ( testGraph.findPartitioningByRemovingEdges()).to.be.deep.equal ([6,9]);
        });
    });
});

