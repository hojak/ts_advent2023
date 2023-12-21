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

            currentNode = this.getNextNodeFor ( currentNode, direction=="L" ? 0 : 1);

            currentDirectionIndex++;
            if ( currentDirectionIndex >= this.directions.length) {
                currentDirectionIndex = 0;
            }
        }

        return currentStep;
    }

    getNextNodeFor(node: string, directionIndex: number): string {
        let nodeDescription = this.map.get(node);
        if ( nodeDescription == undefined ) {
            throw new Error ( "reached node with no further directions: " + node);
        }
        return nodeDescription [directionIndex];
    }


    getNumberOfNecessarySimultaneousSteps(): number {
        let currentNodes = this.getStartingNodes();
        let numberOfSteps = 0;
        let currentDirectionIndex = 0;

        while ( !this.isEndPosition(currentNodes)) {
            numberOfSteps ++;

            let direction = this.directions[currentDirectionIndex];

            currentNodes = this.getNextPositions(currentNodes, direction == "L" ? 0 : 1);

            console.log ( numberOfSteps + " " + direction + ": " + currentNodes);

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

    findLoopStartingWithSoureNode(node: string): LoopSearchResult {
        let currentDirectionIndex = 0;
        let currentStepNumber = 0;
        let currentNode = node;

        let visited = new Map<string, number>();

        do {
            visited.set ( currentNode + "/" + currentDirectionIndex, currentStepNumber);

            let direction = this.directions[currentDirectionIndex] == "L" ? 0 : 1;

            currentNode = this.getNextNodeFor(currentNode, direction);

            currentStepNumber++;
            currentDirectionIndex++;
            if ( currentDirectionIndex >= this.directions.length) {
                currentDirectionIndex = 0;
            }
        } while ( !visited.has(currentNode + "/" + currentDirectionIndex) );
        
        let firstNodeInLoop = currentNode;
        let directionIndexOfFirstNodeInLoop = currentDirectionIndex;
        let stepsIntoLoop = visited.get(firstNodeInLoop + "/" + directionIndexOfFirstNodeInLoop) ?? 1;

        let result : LoopSearchResult = {
            stepsIntoLoop: stepsIntoLoop,
            loopLength: visited.size - stepsIntoLoop,
            endPositions:  Array.from(visited.keys())
                .filter ( key => key[2] == "Z" )
                .map ( keyOfEndNode => visited.get(keyOfEndNode) ?? -1)
                .map ( steps => steps - stepsIntoLoop)
        }

        return result;
    }

    solveSimultaneousStepsFor1EndPositionPerLoop () : number {
        let staringNodes = this.getStartingNodes();
        let loopDescriptions = staringNodes.map ( node => this.findLoopStartingWithSoureNode( node ));

        let worker = loopDescriptions.map ( desc => desc.stepsIntoLoop + desc.endPositions[0]);

        let steps = 0;
        while ( ! isEndReached (worker)) {
            let indexOfSmallest = 0;
            for ( let i=1; i<worker.length; i++) {
                if ( worker[i] < worker[indexOfSmallest ]) {
                    indexOfSmallest = i;
                }
            }

            worker[indexOfSmallest] += loopDescriptions[indexOfSmallest].loopLength;
            steps ++;

            if ( steps % 1000000 == 0) {
                console.log ( steps + ": " + worker);
            }
        }

        return worker[0];
    }
}

export interface LoopSearchResult {
    stepsIntoLoop: number;
    loopLength: number;
    endPositions: number[]
}

function isEndReached(worker: number[]) {
    let result = true;
    for ( let i=1; i<worker.length; i++) {
        result = result && ( worker[i-1] == worker[i]);
    }
    return result;
}
