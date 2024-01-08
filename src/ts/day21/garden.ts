import { LinearFunction } from "./linearFunction";

export class Garden {
    private _lines: string[];

    constructor ( description: string ) {
        this._lines = description.split("\n");
    }

    getSymbolAt(position: Position): string {
        let x = position.x % this.getWidth();
        if ( x < 0 ) {
            x += this.getWidth();
        }

        let y = position.y % this.getHeight();
        if ( y < 0 ) {
            y += this.getHeight();
        }
        return this._lines[y][x];
    }
    getHeight(): any {
        return this._lines.length;
    }
    getWidth(): any {
        return this._lines[0].length;
    }

    getNumberOfReachablePots(numberOfSteps: number, infiniteMap: boolean = false): number {
        let startPosition = this.findStartposition();

        let reachablePositions : Set<string> = new Set( [posToString(startPosition)]);
        for ( let step = 0; step < numberOfSteps; step ++ ) {
            console.log ( ""+ step + ";" + reachablePositions.size);
            reachablePositions = this.walkSingleStep(reachablePositions, infiniteMap);
        }

        return reachablePositions.size;
    }

    private walkSingleStep(reachablePositions: Set<string>, infiniteMap: boolean) {
        let nextSetOfReachablePositions: Set<string> = new Set();

        for (let positionString of reachablePositions) {
            let position = createPositionFromString(positionString);
            for (let offset of stepOffsets) {
                let checkPosition = addPositions(position, offset);
                if ((infiniteMap || !this.outOfBounds(checkPosition))
                    && this.getSymbolAt(checkPosition) != "#") {
                    nextSetOfReachablePositions.add(posToString(checkPosition));
                }
            }
        }

        reachablePositions = nextSetOfReachablePositions;
        return reachablePositions;
    }

    outOfBounds(position: Position) : boolean {
        return position.x < 0 || position.y < 0 || position.x >= this.getWidth() || position.y >= this.getHeight();
    }

    findStartposition() : Position {
        let position : Position = {x:0, y:0};
        for ( position.x =0; position.x < this.getWidth (); position.x ++) {
            for ( position.y = 0; position.y < this.getHeight(); position.y++ ) {
                if ( this.getSymbolAt( position ) == "S") {
                    return position;
                } 
            }
        }
        return {x: -1, y: -1};
    }


    private readonly startUpCycles = 15;

    computeReachableTilesForLageNumberOfSteps(numberOfSteps: number): number {
        // interesting: 
        // for the test input, the strict linear gradient starts after some cycles. For the "real" data, this
        // happens directly and no offset would be required.
        // additional possible feature: detect this point automatically.
        // for now, we go with 20 cycles and use cycle 20 and 21 for the gradient functions
        // hint: the cycle length in general is not necessarily equal to the tile's length (or width); 
        // it could be larger depending on the layout

        let reachablePositionsForNumberOfSteps = this.getReachableStepsForCycles((this.startUpCycles+1) * this.getHeight());
        reachablePositionsForNumberOfSteps.unshift(0);

        let differencesPerStep = reduceToDifferences(reachablePositionsForNumberOfSteps);

        let separatedForFunctions = separateToCycleSteps ( differencesPerStep, this.getWidth() );
        let startupOffsetsPerCycleStep = this.sumUpStartupOffsets ( separatedForFunctions );

        let gradientFunctionsForCycleSteps = this.createGradientFunctionsFromStartValues ( separatedForFunctions )

        reachablePositionsForNumberOfSteps.shift();
        return this.computeStepCount ( 
            startupOffsetsPerCycleStep,
            gradientFunctionsForCycleSteps, 
            numberOfSteps,
            reachablePositionsForNumberOfSteps
        );
    }

    sumUpStartupOffsets(separatedForFunctions: number[][]) {
        return separatedForFunctions.map ( cycleStepArray => {
            let result = 0;
            for ( let i=0; i<this.startUpCycles; i++ ) {
                result += cycleStepArray[i];
            }
            return result;
        });
    }

    getReachableStepsForCycles(numberOfSteps: number) : number[] {
        let result : number [] = [];

        let startPosition = this.findStartposition();
        let reachablePositions : Set<string> = new Set( [posToString(startPosition)]);

        for (let step=0; step < numberOfSteps; step++) {
            result.push ( reachablePositions.size);
            reachablePositions = this.walkSingleStep(reachablePositions, true);
        }

        return result;
    }

    
    createGradientFunctionsFromStartValues(stepsSeparatedByStepInCycle: number[][]) : LinearFunction[] {
    let result : LinearFunction[] = [];

    for ( let cycleStep = 0; cycleStep < stepsSeparatedByStepInCycle.length; cycleStep++ ) {
        result.push ( LinearFunction.createFromPoints (
             {x: this.startUpCycles-1, y: stepsSeparatedByStepInCycle[cycleStep][this.startUpCycles-1]},
             {x: this.startUpCycles, y: stepsSeparatedByStepInCycle[cycleStep][this.startUpCycles]},
        ));
    }

    return result;
}

    computeStepCount(startupOffsets: number[], functionsForCycleSteps: LinearFunction[], numberOfSteps: number, baseValues: number[]): number {
        if ( numberOfSteps < baseValues.length ) {
            console.log ( "number of steps too small!");
            return baseValues[numberOfSteps];
        }
    
        let result = 0;
            
        let modulo = numberOfSteps % functionsForCycleSteps.length;
        let cycles = Math.floor(numberOfSteps / functionsForCycleSteps.length);
    
        for ( let cycleStep=0; cycleStep<functionsForCycleSteps.length; cycleStep++) {
            let useCycle = ( cycleStep <= modulo) ? cycles : cycles-1;
    
            result += sumUpLinearFunctionValues(useCycle, functionsForCycleSteps[cycleStep])
                - sumUpLinearFunctionValues(this.startUpCycles-1, functionsForCycleSteps[cycleStep])
                + startupOffsets[cycleStep];
        }
        
        return result;
    }
    

}

export interface Position {
    x: number,
    y: number
}

const stepOffsets = [
    {x: 0, y: 1},
    {x: 0, y: -1},
    {x: 1, y: 0},
    {x: -1, y: 0}
];


function addPositions ( pos1 : Position, pos2 : Position) : Position {
    return {
        x: pos1.x + pos2.x,
        y: pos1.y + pos2.y
    }
}

function posToString ( position: Position ) : string {
    return ""+position.x + "/" + position.y;
}

function createPositionFromString(positionString: string) : Position {
    let split = positionString.split("/");
    return {
        x: Number(split[0]),
        y: Number(split[1])
    }
}




function reduceToDifferences(arrayOfNumbers: number[]) : number[] {
    let result : number[] = [];

    for ( let index = 1; index<arrayOfNumbers.length; index++) {
        result.push ( arrayOfNumbers[index]-arrayOfNumbers[index-1]);
    }

    return result;
}

function separateToCycleSteps(differencesPerStep: number[], cycleLength: number) : number[][] {
    let result : number[][] = [];

    for ( let stepInCycle = 0; stepInCycle < cycleLength; stepInCycle++ ) {
        result[stepInCycle] = [];
        for ( let cycle = 0; cycle < Math.floor(differencesPerStep.length / cycleLength); cycle++ ) {
            result[stepInCycle][cycle] = differencesPerStep[stepInCycle + cycle*cycleLength];
        }
    }

    return result;
}


function sumUpLinearFunctionValues(useCycle: number, f: LinearFunction) {
    return useCycle * (useCycle + 1) / 2 * f.b
        + (useCycle + 1) * f.a;
}
