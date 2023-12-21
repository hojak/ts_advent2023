export class PipeMap {
    description: string;
    private _cols: number;
    private _rows: number;

    constructor ( description: string ) {
        this._cols = description.indexOf("\n");
        this.description = description.replace(/\n/g, "");
        this._rows = this.description.length / this._cols;
    }

    public get cols(): number {
        return this._cols;
    }

    public get rows(): number {
        return this._rows;
    }

    getStartingPosition(): number[] {
        let index = this.description.indexOf("S");
        if ( index == undefined ) {
            throw Error ( "No start position found!");
        }
        return [
            index % this._cols,
            Math.floor ( index / this._cols) 
        ];
    }

    getLoopLength () : number {
        let startPosition = this.getStartingPosition();
        let steps = 0;

        /* directions: 0 -> top, 1 -> right, 2 -> down, 3 -> left */
        let currentPosition : number[] = startPosition;
        let currentDirection = -1;
        let nextDirection : number;
        do {
            currentDirection++;
            nextDirection = this.getExitDirection( 
                this.getNextPosition ( startPosition, currentDirection ),
                4-currentDirection
            );
        } while ( isNaN ( nextDirection ) && currentDirection < 4);

        do {
            currentPosition = this.getNextPosition ( currentPosition, currentDirection );
            currentDirection = this.getExitDirection ( currentPosition, (currentDirection+2)%4 );
            steps ++;
        } while ( this.getSymbolAt ( currentPosition ) != "S" && ! isNaN (currentDirection));

        return steps;
    }

    getExitDirection(position: number[], enteringFromDirection: number): number {
        let symbolDirections : { [symbol: string] : number[] } = {
            "|" : [0,2],
            "-" : [1,3],
            "F" : [1,2],
            "L" : [0,1],
            "7" : [2,3],
            "J" : [0,3]
        }
        let direction = symbolDirections[ this.getSymbolAt( position )];
        if ( direction == undefined ) {
            return NaN;
        }

        if ( direction[0] == enteringFromDirection ) {
            return direction[1];
        } else if ( direction[1] == enteringFromDirection ) {
            return direction[0];
        } else {
            return NaN;
        }
    }

    getNextPosition(position: number[], direction: number): number[] {
        let colOffset = 0;
        let rowOffset = 0;
        switch ( direction ) {
            case 0: rowOffset = -1; break;
            case 1: colOffset = 1; break;
            case 2: rowOffset = 1; break;
            case 3: colOffset = -1; break;
        }
        return [ position[0] + colOffset , position[1] + rowOffset  ];
    }

    getOffsetFor(position: number[]) {
        return position [0] + position[1] * this._cols
    }

    getSymbolAt(position: number[]): string {
        return this.description[  this.getOffsetFor( position ) ];
    }

    getMaximalDistance(): any {
        return Math.floor ( this.getLoopLength() / 2);
    }

}
