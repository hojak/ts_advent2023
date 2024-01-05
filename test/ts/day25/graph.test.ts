import { expect } from "chai";
import { describe } from "mocha";
import { Graph } from "../../../src/ts/day25/graph";

describe( "Day 25: Graph", () => {

    describe ( "constructor", () => {
        it ( "should create a weighted graph", () => {
            let testee = new Graph ( "A: B(2) c(10)");
            expect ( testee.nodes.map ( node => node.name).sort()).to.be.deep.equal ( [
                "A","B","c"
            ]);
            expect ( testee.numberOfEdges ).to.be.equal(2);
            expect ( testee.nodes[0].edges[0].weight).to.be.equal(2);
            expect ( testee.nodes[0].edges[1].weight).to.be.equal(10);
        });
    });


    describe ( "toString", () => {
        it ( "should return an ordered representation of the graph", () => {
            expect ( new Graph ( 
                "D: A\n"+
                "A: C B"
            ).toString()).to.be.equal(
                "A: B(1) C(1) D(1)\n"+
                "B: \n"+
                "C: \n"+
                "D: "
            );
        })

        it ( "should not create an additional node", () => {
            expect ( new Graph ( new Graph ( 
                "D: A\n"+
                "A: C B"
            ).toString()).toString() ).to.be.equal(
                "A: B(1) C(1) D(1)\n"+
                "B: \n"+
                "C: \n"+
                "D: "
            );
        });
    });


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

    describe ("stoerWagnerMinCut", () => {
        
        it ( "should compute the correct minimal cut", () => {
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
            
            let result = testGraph.stoerWagnerMinCut();
            expect ( result ).to.be.deep.equal ( {
                setA: ["bvb","hfx","jqt","ntq","rhn","xhk"],
                setB: ["cmg","frs","lhk","lsr","nvd","pzl","qnr","rsh","rzs"],
                weight: 3
            });
        });

        let testGraph = new Graph (
            "A: B(2) E(3)" + "\n" +
            "B: C(3) E(2) F(2)" + "\n" +
            "C: D(4) G(2)" + "\n" +
            "D: G(2) H(2)" + "\n" +
            "E: F(3)" + "\n" +
            "F: G(1)" + "\n" +
            "G: H(3)" 
        );        
        let result = testGraph.stoerWagnerMinCut();
            
        it ( "should compute the correct minimal cut for a small sample", () => {
            expect( result ).to.be.deep.equal ({
                setA: ["A","B","E","F"],
                setB: ["C","D","G","H"],
                weight: 4
            });
        });
        it ("should not change the original graph", () => {
            expect(testGraph.numberOfNodes).to.be.equal(8);
        });
        
    });
});

