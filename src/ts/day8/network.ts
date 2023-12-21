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

}