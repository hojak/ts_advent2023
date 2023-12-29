export class HeatMap {
    private _lines: string[];
    private _numberOfLines: number;
    private _numberOfCols: number;

    private _visits : Map<string, number>;

    constructor ( input: string ) {
        this._lines = input.split("\n");
        this._numberOfLines = this._lines.length;
        this._numberOfCols = this._lines[0].length;
        this._visits = new Map<string, number>();
    }


    findHeatLossForBestRoute(): number {
        let visited = new Map<string, number>();

        let bestKnownRoute : Step[] = [];
        let heatLossOfBestKownRoute : number = NaN;

        // start top left
        let stack : Step[][]= this.getInitialRouteStarts();

        while ( stack.length > 0 ) {
            let currentRoute = stack.pop() ?? [];
            if (currentRoute.length == 0 ) {
                continue;
            }
            let lastStepOfCurrentRoute = currentRoute[currentRoute.length-1];
            if ( ! isNaN(heatLossOfBestKownRoute) && lastStepOfCurrentRoute.sumOfHeatLoss >= heatLossOfBestKownRoute ) {
                // we're already more expensive than the currently best known solution
                continue;
            }

            if ( alreadyBeenHereBetter ( visited, lastStepOfCurrentRoute )) {
                continue;
            }
            
            if ( this.lastTileReached(lastStepOfCurrentRoute)) {
                // reached the finish line!
                if ( isNaN(heatLossOfBestKownRoute) || lastStepOfCurrentRoute.sumOfHeatLoss < heatLossOfBestKownRoute) {
                    heatLossOfBestKownRoute = lastStepOfCurrentRoute.sumOfHeatLoss;
                    bestKnownRoute = currentRoute;
                }
                continue;
            }

            this.getNextPossibleSteps(lastStepOfCurrentRoute)
                .filter ( step => 
                    !isOppositeDirection ( step.direction, lastStepOfCurrentRoute.direction)
                    && step.numberOfStraightSteps <= 3
                    && ! this.outOfBounts(step.toColumn, step.toRow)
                ).filter ( step => 
                    ! alreadyBeenHereBetter ( visited, step )
                ).forEach ( step => {
                    stack.push ( [step]);
                });
        }

        return heatLossOfBestKownRoute;
    }


    private getNextPossibleSteps(lastStepOfCurrentRoute: Step): Step[] {
        return [{
            toColumn: lastStepOfCurrentRoute.toColumn, toRow: lastStepOfCurrentRoute.toRow + 1,
            direction: Direction.down, numberOfStraightSteps: lastStepOfCurrentRoute.direction == Direction.down ? lastStepOfCurrentRoute.numberOfStraightSteps + 1 : 1,
            sumOfHeatLoss: lastStepOfCurrentRoute.sumOfHeatLoss + this.getHeatLossAt(lastStepOfCurrentRoute.toColumn, lastStepOfCurrentRoute.toRow + 1)
        }, {
            toColumn: lastStepOfCurrentRoute.toColumn + 1, toRow: lastStepOfCurrentRoute.toRow,
            direction: Direction.right, numberOfStraightSteps: lastStepOfCurrentRoute.direction == Direction.right ? lastStepOfCurrentRoute.numberOfStraightSteps + 1 : 1,
            sumOfHeatLoss: lastStepOfCurrentRoute.sumOfHeatLoss + this.getHeatLossAt(lastStepOfCurrentRoute.toColumn + 1, lastStepOfCurrentRoute.toRow)
        }, {
            toColumn: lastStepOfCurrentRoute.toColumn - 1, toRow: lastStepOfCurrentRoute.toRow,
            direction: Direction.left, numberOfStraightSteps: lastStepOfCurrentRoute.direction == Direction.left ? lastStepOfCurrentRoute.numberOfStraightSteps + 1 : 1,
            sumOfHeatLoss: lastStepOfCurrentRoute.sumOfHeatLoss + this.getHeatLossAt(lastStepOfCurrentRoute.toColumn - 1, lastStepOfCurrentRoute.toRow)
        }, {
            toColumn: lastStepOfCurrentRoute.toColumn, toRow: lastStepOfCurrentRoute.toRow - 1,
            direction: Direction.up, numberOfStraightSteps: lastStepOfCurrentRoute.direction == Direction.up ? lastStepOfCurrentRoute.numberOfStraightSteps + 1 : 1,
            sumOfHeatLoss: lastStepOfCurrentRoute.sumOfHeatLoss + this.getHeatLossAt(lastStepOfCurrentRoute.toColumn, lastStepOfCurrentRoute.toRow - 1)
        }];
    }

    private getInitialRouteStarts(): Step[][] {
        return [
            [{ toColumn: 1, toRow: 0, direction: Direction.right, numberOfStraightSteps: 1, sumOfHeatLoss: this.getHeatLossAt(1, 0) }],
            [{ toColumn: 0, toRow: 1, direction: Direction.down, numberOfStraightSteps: 1, sumOfHeatLoss: this.getHeatLossAt(0, 1) }]
        ];
    }

    getHeatLoss(route: Step[]): number {
        return route.map ( step =>this.getHeatLossAt(step.toColumn, step.toRow))
            .reduce ( (prev, curr, index) => prev+curr, 0);
    }


    private lastTileReached(nextStep: Step) {
        return nextStep.toColumn == this._numberOfCols - 1 && nextStep.toRow == this._numberOfLines - 1;
    }

    getHeatLossAt(col: number, row: number) : number {
        if ( this.outOfBounts( col, row)) {
            return NaN;
        } else {
            return Number(this._lines [row][col]);
        }
    }

    outOfBounts(toColumn: number, toRow: number) : boolean {
        return toColumn < 0 || toRow < 0 || toColumn >= this._numberOfCols || toRow >= this._numberOfLines;
    }
}

enum Direction {
    right = 0,
    down,
    left,
    up
}


interface Step {
    toColumn : number;
    toRow : number;
    direction: Direction;
    numberOfStraightSteps : number,
    sumOfHeatLoss: number
}

function stepToString(step: Step): string {
    return `${step.toColumn}/${step.toRow}/${step.direction}/${step.numberOfStraightSteps}`;
}
function isOppositeDirection(direction: Direction, direction1: Direction) : boolean {
    return (direction + 2) % 4 == direction1
}


function alreadyBeenHereBetter(visited: Map<string, number>, step: Step) : boolean {
    for ( let checkNumberOfSteps = step.numberOfStraightSteps; checkNumberOfSteps >=1; checkNumberOfSteps--) {
        let checkStep = step;
        let bestVisitOfCurrentStepTile = visited.get(stepToString( {
            toColumn: step.toColumn,
            toRow: step.toRow,
            numberOfStraightSteps: checkNumberOfSteps,
            direction: step.direction,
            sumOfHeatLoss: step.sumOfHeatLoss
        }));
        if ( bestVisitOfCurrentStepTile != undefined && bestVisitOfCurrentStepTile <= step.sumOfHeatLoss ) {
            return true;
        }
    }

    visited.set ( stepToString(step), step.sumOfHeatLoss);
    return false;
}

