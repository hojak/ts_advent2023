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

    describe ("mergeNodes", () => {
        it ( "should combine two nodes an sum up the edges", () => {
            let testGraph = new Graph ( 
                "a: b c\n"+
                "b: d e\n"+
                "d: a"
            );
            testGraph.mergeNodesByName ("a", "b");
            expect (testGraph.nodeNames).to.be.deep.equal (
                ["a,b", "c", "d", "e"]
            );
            expect ( testGraph.getWeightOfEdge("a,b", "d")).to.be.equal(2);
            expect ( testGraph.numberOfNodes).to.be.equal(4);
            expect ( testGraph.numberOfEdges).to.be.equal(3);
        })
    });
});

