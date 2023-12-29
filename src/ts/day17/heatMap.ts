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
        this._visits = new Map<string, number>();
        let route1 = this.findBestRoute ( { toColumn: 1, toRow: 0, direction: Direction.right, numberOfStraightSteps: 1}, 0);
        let route2 = this.findBestRoute ( { toColumn: 0, toRow: 1, direction: Direction.down, numberOfStraightSteps: 1}, 0);

        console.log ( "best routes");
        console.log ( route1 );
        console.log ( route2 );

        return Math.min ( this.getHeatLoss(route1), this.getHeatLoss ( route2 ));
    }

    getHeatLoss(route: Step[]): number {
        return route.map ( step =>this.getHeatLossAt(step.toColumn, step.toRow))
            .reduce ( (prev, curr, index) => prev+curr, 0);
    }

    findBestRoute( nextStep: Step, weightUntilNow: number, recDepth: number = 1 ): Step[] {
        if ( this.lastTileReached(nextStep)) {
            return [nextStep];
        }

        const indent = " ".repeat(recDepth);
        console.log ( indent + " visiting " + nextStep.toColumn+"/"+nextStep.toRow + " at depth " + recDepth);
        console.log ( indent + "    size of visited: " + this._visits.size);

        weightUntilNow += this.getHeatLossAt(nextStep.toColumn, nextStep.toRow);
        let bestVisitedWeight = this._visits.get(stepToString(nextStep));

        if ( bestVisitedWeight != undefined && weightUntilNow >= bestVisitedWeight) {
            // already been here 
            // todo: buit could be better now!
            console.log ( indent + "   -> already been here with heat " + bestVisitedWeight + " (currently at " + weightUntilNow + ")")
            return [];
        }
        this._visits.set(stepToString(nextStep), weightUntilNow);

        let possibleNextSteps : Step[] = [{
            toColumn: nextStep.toColumn, toRow: nextStep.toRow+1,
            direction: Direction.down, numberOfStraightSteps: nextStep.direction == Direction.down? nextStep.numberOfStraightSteps + 1 : 1
        }, {
            toColumn: nextStep.toColumn+1, toRow: nextStep.toRow,
            direction: Direction.right, numberOfStraightSteps: nextStep.direction == Direction.right? nextStep.numberOfStraightSteps + 1 : 1
        },{
            toColumn: nextStep.toColumn-1, toRow: nextStep.toRow,
            direction: Direction.left, numberOfStraightSteps: nextStep.direction == Direction.left? nextStep.numberOfStraightSteps + 1 : 1
        },{
            toColumn: nextStep.toColumn, toRow: nextStep.toRow-1,
            direction: Direction.up, numberOfStraightSteps: nextStep.direction == Direction.up? nextStep.numberOfStraightSteps + 1 : 1
        }];

        possibleNextSteps = possibleNextSteps.filter ( step => 
            !isOppositeDirection ( step.direction, nextStep.direction)
            && step.numberOfStraightSteps <= 3
            && ! this.outOfBounts ( step.toColumn, step.toRow)
        );
        
        let minWithNextSteps = NaN;
        let bestRoute : Step[]= [];
        possibleNextSteps.forEach ( step => {
            let stepRoute = this.findBestRoute(step, weightUntilNow, recDepth +1);
            let stepHeatLoss = this.getHeatLoss(stepRoute);

            if ( stepRoute.length > 0 && (isNaN (minWithNextSteps) || stepHeatLoss<minWithNextSteps) ) {
                minWithNextSteps = stepHeatLoss;
                bestRoute = stepRoute;
                bestRoute.unshift(nextStep);
            }
        });

        console.log ( indent + "  ---> found best route with weight " + minWithNextSteps );
        console.log ( indent + "  ---> " + bestRoute );

        return bestRoute;
    }

    private lastTileReached(nextStep: Step) {
        return nextStep.toColumn == this._numberOfCols - 1 && nextStep.toRow == this._numberOfLines - 1;
    }

    getHeatLossAt(col: number, row: number) {
        return Number(this._lines [row][col]);
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
    numberOfStraightSteps : number
}

function stepToString(step: Step): string {
    return `${step.toColumn}/${step.toRow}/${step.direction}/${step.numberOfStraightSteps}`;
}
function isOppositeDirection(direction: Direction, direction1: Direction) : boolean {
    return (direction + 2) % 4 == direction1
}


