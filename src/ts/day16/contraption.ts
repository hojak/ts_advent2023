export class Contraption {
    private _lines : string[];
    private _numberOfLines : number;
    private _numberOfColumns: number;
    private _tileEnergized: boolean[][] = [];
    private _visitations : Set<string> = new Set<string>();

    constructor( input: string ) {
        this._lines = input.split ("\n");
        this._numberOfLines = this._lines.length;
        this._numberOfColumns = this._lines[0].length;
    }

    getSymbolAt(col: number, row: number) {
        if ( col < 0 || row < 0 || col >= this._numberOfColumns || row >= this._numberOfLines ) {
            return "#";
        }
        return this._lines [row][col];
    }

    numberOfEnergizedTiles(): number {
        this.walkTheBeam();
        return this._tileEnergized.flat().filter ( tile => tile ).length;
    }


    walkTheBeam () {
        // begin walkTheBeam
        this._tileEnergized = [];
        this._visitations = new Set<string>();
        let queue : Step[] = [{toColumn: 0, toRow: 0, direction: Direction.right }];

        while ( queue.length > 0 ) {
            let nextStep = queue.shift();

            let followUpSteps = this.performStep ( nextStep );
            followUpSteps.forEach(step => queue.push(step));
        }
    }

    performStep(step: Step | undefined ) : Step[]{
        if ( step == undefined ) {
            return[];
        }

        if ( this._visitations.has ( step.toColumn + "/" + step.toRow + "/" + step.direction )) {
            // already came here heading this direction!
            return[];
        }

        this._visitations.add (step.toColumn + "/" + step.toRow + "/" + step.direction );

        if ( this._tileEnergized[step.toRow ] == undefined ) {
            this._tileEnergized[step.toRow ] = [];
        }
        this._tileEnergized[step.toRow][step.toColumn] = true;

        let upcoming : Step[] = [];
        let tile = this.getSymbolAt ( step.toColumn, step.toRow );
        switch ( tile ) {
            case ".": 
                upcoming = [getNextStep(step.toColumn, step.toRow, step.direction )];
                break;
            case "\\":
                upcoming = this.nextStepForReverseReflection(step);
                break;
            case "/":
                upcoming = this.nextStepForReflection(step);
                break;
            case "-":
                upcoming = this.nextStepsForHorizontalSplitter(step);
                break;
            case "|": 
                upcoming = this.nextStepsForVerticalSplitter(step);
            break;
                break;
        }

        upcoming = upcoming.filter ( step => 
            step.toColumn >= 0
            && step.toRow >= 0
            && step.toColumn < this._numberOfColumns
            && step.toRow < this._numberOfLines
        );

        return upcoming;
    }


    private nextStepsForVerticalSplitter(step: Step): Step[] {
        if (step.direction == Direction.up || step.direction == Direction.down) {
            return [getNextStep(step.toColumn, step.toRow, step.direction)];
        } else {
            return [
                getNextStep(step.toColumn, step.toRow, Direction.down),
                getNextStep(step.toColumn, step.toRow, Direction.up)
            ];
        }
    }

    private nextStepsForHorizontalSplitter(step: Step): Step[] {
        if (step.direction == Direction.left || step.direction == Direction.right) {
            return [getNextStep(step.toColumn, step.toRow, step.direction)];
        } else {
            return [
                getNextStep(step.toColumn, step.toRow, Direction.right),
                getNextStep(step.toColumn, step.toRow, Direction.left)
            ];
        }
    }

    private nextStepForReflection(step: Step): Step[] {
        switch (step.direction) {
            case Direction.down:
                return [getNextStep(step.toColumn, step.toRow, Direction.left)];
            case Direction.up:
                return [getNextStep(step.toColumn, step.toRow, Direction.right)];
            case Direction.left:
                return [getNextStep(step.toColumn, step.toRow, Direction.down)];
            case Direction.right:
                return [getNextStep(step.toColumn, step.toRow, Direction.up)];
        }
    }

    private nextStepForReverseReflection(step: Step) : Step[] {
        switch (step.direction) {
            case Direction.down:
                return [getNextStep(step.toColumn, step.toRow, Direction.right)];
            case Direction.up:
                return [getNextStep(step.toColumn, step.toRow, Direction.left)];
            case Direction.left:
                return [getNextStep(step.toColumn, step.toRow, Direction.up)];
            case Direction.right:
                return [getNextStep(step.toColumn, step.toRow, Direction.down)];
        }
    }
}


interface Step {
    toColumn : number;
    toRow : number;
    direction: Direction;
}

enum Direction {
    right = 1,
    down = 2,
    left = 3,
    up = 4
}


function getNextStep(toColumn: number, toRow: number, direction: Direction): Step {
    switch ( direction ) {
        case Direction.down: 
            toRow ++;
            break;
        case Direction.up:
            toRow --;
            break;
        case Direction.left:
            toColumn --;
            break;
        case Direction.right:
            toColumn ++;
            break;
    }

    return {
        toColumn: toColumn,
        toRow: toRow,
        direction: direction
    }
}

