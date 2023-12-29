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

        let heatLossOfBestKownRoute : number = NaN;

        // start top left
        let stack : Step[]= this.getInitialRouteStarts();

        while ( stack.length > 0 ) {
            let lastStepOfCurrentRoute : Step = stack.pop() ?? {toColumn: -1, toRow: -1, direction: Direction.down, numberOfStraightSteps: 1, sumOfHeatLoss: -1};
            if (lastStepOfCurrentRoute.toColumn == -1) {
                continue;
            }

            if ( ! isNaN(heatLossOfBestKownRoute) && lastStepOfCurrentRoute.sumOfHeatLoss >= heatLossOfBestKownRoute ) {
                // we're already more expensive than the currently best known solution
                continue;
            }
            
            if ( this.lastTileReached(lastStepOfCurrentRoute)) {
                // reached the finish line!
                if ( isNaN(heatLossOfBestKownRoute) || lastStepOfCurrentRoute.sumOfHeatLoss < heatLossOfBestKownRoute) {
                    heatLossOfBestKownRoute = lastStepOfCurrentRoute.sumOfHeatLoss;
                }
                continue;
            }

            this.getNextPossibleSteps(lastStepOfCurrentRoute)
                .filter ( step => 
                    !isOppositeDirection ( step.direction, lastStepOfCurrentRoute.direction)
                    && step.numberOfStraightSteps <= 3
                    && ! this.outOfBounds(step.toColumn, step.toRow)
                ).filter ( step => 
                    ! alreadyBeenHereBetter ( visited, step )
                ).reverse(
                    // push in reverse order tp prefer down right
                    // go for a first solution without detours
                ).forEach ( step => {
                    stack.push ( step);
                });
        }

        return heatLossOfBestKownRoute;
    }


    private getNextPossibleSteps(lastStepOfCurrentRoute: Step): Step[] {
        let result : Step[];

        // prefer going straight right or straight down
        if ( lastStepOfCurrentRoute.direction == Direction.right ) {
            result = [{
                toColumn: lastStepOfCurrentRoute.toColumn + 1, toRow: lastStepOfCurrentRoute.toRow,
                direction: Direction.right, numberOfStraightSteps: lastStepOfCurrentRoute.numberOfStraightSteps + 1,
                sumOfHeatLoss: lastStepOfCurrentRoute.sumOfHeatLoss + this.getHeatLossAt(lastStepOfCurrentRoute.toColumn + 1, lastStepOfCurrentRoute.toRow)
            },{
                toColumn: lastStepOfCurrentRoute.toColumn, toRow: lastStepOfCurrentRoute.toRow + 1,
                direction: Direction.down, numberOfStraightSteps: 1,
                sumOfHeatLoss: lastStepOfCurrentRoute.sumOfHeatLoss + this.getHeatLossAt(lastStepOfCurrentRoute.toColumn, lastStepOfCurrentRoute.toRow + 1)
            }];
        } else {
            result = [{
                toColumn: lastStepOfCurrentRoute.toColumn, toRow: lastStepOfCurrentRoute.toRow + 1,
                direction: Direction.down, numberOfStraightSteps: lastStepOfCurrentRoute.direction == Direction.down ? lastStepOfCurrentRoute.numberOfStraightSteps + 1 : 1,
                sumOfHeatLoss: lastStepOfCurrentRoute.sumOfHeatLoss + this.getHeatLossAt(lastStepOfCurrentRoute.toColumn, lastStepOfCurrentRoute.toRow + 1)
            }, {
                toColumn: lastStepOfCurrentRoute.toColumn + 1, toRow: lastStepOfCurrentRoute.toRow,
                direction: Direction.right, numberOfStraightSteps: 1,
                sumOfHeatLoss: lastStepOfCurrentRoute.sumOfHeatLoss + this.getHeatLossAt(lastStepOfCurrentRoute.toColumn + 1, lastStepOfCurrentRoute.toRow)
            }];
        }

        result.push ({
            toColumn: lastStepOfCurrentRoute.toColumn - 1, toRow: lastStepOfCurrentRoute.toRow,
            direction: Direction.left, numberOfStraightSteps: lastStepOfCurrentRoute.direction == Direction.left ? lastStepOfCurrentRoute.numberOfStraightSteps + 1 : 1,
            sumOfHeatLoss: lastStepOfCurrentRoute.sumOfHeatLoss + this.getHeatLossAt(lastStepOfCurrentRoute.toColumn - 1, lastStepOfCurrentRoute.toRow)
        });
        result.push ( {
            toColumn: lastStepOfCurrentRoute.toColumn, toRow: lastStepOfCurrentRoute.toRow - 1,
            direction: Direction.up, numberOfStraightSteps: lastStepOfCurrentRoute.direction == Direction.up ? lastStepOfCurrentRoute.numberOfStraightSteps + 1 : 1,
            sumOfHeatLoss: lastStepOfCurrentRoute.sumOfHeatLoss + this.getHeatLossAt(lastStepOfCurrentRoute.toColumn, lastStepOfCurrentRoute.toRow - 1)
        });



        return result;
    }

    private getInitialRouteStarts(): Step[] {
        return [
            { toColumn: 1, toRow: 0, direction: Direction.right, numberOfStraightSteps: 1, sumOfHeatLoss: this.getHeatLossAt(1, 0) },
            { toColumn: 0, toRow: 1, direction: Direction.down, numberOfStraightSteps: 1, sumOfHeatLoss: this.getHeatLossAt(0, 1) }
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
        if ( this.outOfBounds( col, row)) {
            return NaN;
        } else {
            return Number(this._lines [row][col]);
        }
    }

    outOfBounds(toColumn: number, toRow: number) : boolean {
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

