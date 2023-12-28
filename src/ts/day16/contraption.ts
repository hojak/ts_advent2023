export class Contraption {
    private _lines : string[];
    private _numberOfLines : number;
    private _numberOfColumns: number;
    private _tileActivated: boolean[][] = [];
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
        return this._tileActivated.flat().filter ( tile => tile ).length;
    }


    walkTheBeam () {
        // begin walkTheBeam
        this._tileActivated = [];
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

        if ( this._tileActivated[step.toRow ] == undefined ) {
            this._tileActivated[step.toRow ] = [];
        }
        this._tileActivated[step.toRow][step.toColumn] = true;

        let upcoming : Step[] = [];
        let tile = this.getSymbolAt ( step.toColumn, step.toRow );
        switch ( tile ) {
            case ".": 
                upcoming.push ( getNextStep(step.toColumn, step.toRow, step.direction ));
                break;
            case "\\":
                switch (step.direction) {
                    case Direction.down:
                        upcoming.push ( getNextStep ( step.toColumn, step.toRow, Direction.right));
                        break;
                    case Direction.up:
                        upcoming.push ( getNextStep ( step.toColumn, step.toRow, Direction.left));
                        break;
                    case Direction.left:
                        upcoming.push ( getNextStep ( step.toColumn, step.toRow, Direction.up))
                        break;
                    case Direction.right:
                        upcoming.push ( getNextStep ( step.toColumn, step.toRow, Direction.down));
                        break;
                }
                break;
            case "/":
                switch (step.direction) {
                    case Direction.down:
                        upcoming.push ( getNextStep ( step.toColumn, step.toRow, Direction.left));
                        break;
                    case Direction.up:
                        upcoming.push ( getNextStep ( step.toColumn, step.toRow, Direction.right));
                        break;
                    case Direction.left:
                        upcoming.push ( getNextStep ( step.toColumn, step.toRow, Direction.down))
                        break;
                    case Direction.right:
                        upcoming.push ( getNextStep ( step.toColumn, step.toRow, Direction.up));
                        break;
                }
                break;
            case "-":
                if ( step.direction == Direction.left || step.direction == Direction.right) {
                    upcoming.push ( getNextStep(step.toColumn, step.toRow, step.direction ));
                } else {
                    upcoming.push ( getNextStep(step.toColumn, step.toRow, Direction.right ));
                    upcoming.push ( getNextStep(step.toColumn, step.toRow, Direction.left ));
                }
                break;
            case "|": 
                if ( step.direction == Direction.up || step.direction == Direction.down) {
                    upcoming.push ( getNextStep(step.toColumn, step.toRow, step.direction ));
                } else {
                    upcoming.push ( getNextStep(step.toColumn, step.toRow, Direction.down ));
                    upcoming.push ( getNextStep(step.toColumn, step.toRow, Direction.up ));
                }
            break;
            case "#":
                // marks a visitation out of bounds
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

