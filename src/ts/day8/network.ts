export class Network {
    directions: string = "";
    map = new Map<string, string[]> ();

    constructor( input: string ) {
        let split = input.split("\n\n");

        this.initDirections ( split[0]);
        this.initMap ( split[1]);
    }

    initMap(nodes: string) {
        let regex =  /(...) = \((...), (...)\)/;
        nodes.split("\n")
            .filter ( line => line.trim() != "")
            .forEach ( line => {
                let match = regex.exec(line);
                if ( match != null ) {
                    this.map.set ( match[1], [match[2], match[3]]);
                }
            })
    }

    initDirections(directions: string) {
        this.directions = directions.trim();
    }


    getNumberOfNecessarySteps(): number {
        let currentStep = 0;
        let currentNode = "AAA";
        let currentDirectionIndex = 0;

        while ( currentNode != "ZZZ") {
            currentStep++;
            let direction = this.directions[currentDirectionIndex];

            let nodeDescription = this.map.get(currentNode);
            if ( nodeDescription == undefined ) {
                throw new Error ( "reached node with no further directions: " + currentNode);
            }

            if ( direction == "L") {
                currentNode = nodeDescription [0];
            } else {
                currentNode = nodeDescription [1];
            }

            currentDirectionIndex++;
            if ( currentDirectionIndex >= this.directions.length) {
                currentDirectionIndex = 0;
            }
        }

        return currentStep;
    }


    getNumberOfNecessarySimultaneousSteps(): number {
        let currentNodes = this.getStartingNodes();
        let numberOfSteps = 0;
        let currentDirectionIndex = 0;

        while ( !this.isEndPosition(currentNodes)) {
            numberOfSteps ++;

            let direction = this.directions[currentDirectionIndex];

            currentNodes = this.getNextPositions(currentNodes, direction == "L" ? 0 : 1);

            currentDirectionIndex ++;
            if ( currentDirectionIndex >= this.directions.length) {
                currentDirectionIndex = 0;
            }
        }

        return numberOfSteps;
    }

    getNextPositions(currentNodes: string[], useDirectionIndex : number): string[] {
        return currentNodes.map (
            node => {
                let nodeDescription = this.map.get(node);
                if ( nodeDescription == undefined ) {
                    throw new Error ( "reached node with no further directions: " + node);
                }
                return nodeDescription[useDirectionIndex];
            }
        );
    }

    isEndPosition(currentNodes: string[]) : boolean {
        return currentNodes.map ( node => node[2] == "Z" )
            .reduce ( (prev, curr, index ) => prev && curr );
    }

    getStartingNodes() : string[] {
        return Array.from(this.map.keys()).filter ( node => node[2] == "A");
    }


}