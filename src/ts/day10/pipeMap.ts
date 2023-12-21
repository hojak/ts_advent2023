export class PipeMap {
    description: string;
    mainLoop: string = "";
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
        this.mainLoop = " ".repeat(this.description.length);
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
            this.markMainLoopTile ( currentPosition );
            currentPosition = this.getNextPosition ( currentPosition, currentDirection );
            currentDirection = this.getExitDirection ( currentPosition, (currentDirection+2)%4 );
            steps ++;
        } while ( this.getSymbolAt ( currentPosition ) != "S" && ! isNaN (currentDirection));

        this.replaceSInMainLoop();

        return steps;
    }

    replaceSInMainLoop() {
        let index = this.mainLoop.indexOf("S");

        let connections : number [] = [];
        if ( this.mainLoop[index-this._cols] != " " ) { connections.push(0); }
        if ( this.mainLoop[index+1] != " ") {connections.push (1)}
        if ( this.mainLoop[index+this._cols] != " ") {connections.push (2)}
        if ( this.mainLoop[index-1] != " ") {connections.push (3)}
        
        PipeMap.symbolDirections
        let replaceWith = ["|","-","F","L","J","7"].filter( 
            symbol => PipeMap.symbolDirections[symbol][0] == connections[0] && PipeMap.symbolDirections[symbol][1] == connections[1]
        ).at(0) ?? '*';

        this.mainLoop = this.mainLoop.replace ( "S", replaceWith )
    }

    markMainLoopTile(position: number[]) {
        let index = this.getOffsetFor(position);
        this.mainLoop = this.mainLoop.substring(0, index ) + this.getSymbolAt(position) + this.mainLoop.substring(index+1);
    }

    static readonly symbolDirections : { [symbol: string] : number[] } = {
            "|" : [0,2],
            "-" : [1,3],
            "F" : [1,2],
            "L" : [0,1],
            "7" : [2,3],
            "J" : [0,3]
        }

    getExitDirection(position: number[], enteringFromDirection: number): number {
        let direction = PipeMap.symbolDirections[ this.getSymbolAt( position )];
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


    countNumberOfSurroundedTiles(): number {
        let result = 0;
        let openingChar = "";

        for ( let i=0; i<this.description.length; i++ ) {
            let currentChar = this.description[i];
        }

        return result;
    }


}
