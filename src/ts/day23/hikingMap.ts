export class HikingMap {
    private _map: string;
    private _width: number;
    private _height: number;
    
    constructor ( map: string ) {
        this._map = map;
        this._width = map.indexOf("\n");
        this._height = map.length - map.replace(/\n/g, "").length + 1;
    }
    public get width(): number {
        return this._width;
    }
    public get height(): number {
        return this._height;
    }

    getLongestWalk(): string {
        const startPosition = this.getStartPosition();
        return this.markPositionOnMap (this.getStartPosition(), "S")
            .markPositionOnMap (this.getFinishPosition(), "F")
            ._getLongestWalk(startPosition);
    }   

    getFinishPosition(): Position {
        return {x: this.width-2, y: this.height-1 };
    }

    private _getLongestWalk(currentPosition: Position): string {
        const directions = [
            {x: 0, y: 1},
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: -1, y: 0},
        ]

        let currentLongestLength = -1;
        let currentLongestWalk = "";

        let checkedDirections = 0;

        for ( let direction of directions ) {
            const posInDirection = addPositions(currentPosition, direction);
            let tileInDirection = this.getSymbolAt(posInDirection);

            let nextWalk : HikingMap | undefined = undefined;
            let startOfNextWalk = posInDirection;

            if ( tileInDirection == ".") {
                nextWalk = this.markPositionOnMap(posInDirection, "O");
            } else if ( tileInDirection == ">") {
                if ( direction.x != -1 ) {
                    startOfNextWalk = addPositions ( posInDirection, {x: 1, y:0})
                    nextWalk = this.markPositionOnMap(posInDirection, "O")
                        .markPositionOnMap(startOfNextWalk, "O");
                }
            } else if ( tileInDirection == "<") {
                if ( direction.x != 1 ) {
                    startOfNextWalk = addPositions ( posInDirection, {x: -1, y:0})
                    nextWalk = this.markPositionOnMap(posInDirection, "O")
                        .markPositionOnMap(startOfNextWalk, "O");
                }
            } else if ( tileInDirection == "^" ) {
                if ( direction.y != 1) {
                    startOfNextWalk = addPositions ( posInDirection, {x: 0, y:-1})
                    nextWalk = this.markPositionOnMap(posInDirection, "O")
                        .markPositionOnMap(startOfNextWalk, "O");
                }
            } else if ( tileInDirection == "v") {
                if ( direction.y != -1 ) {
                    startOfNextWalk = addPositions ( posInDirection, {x: 0, y:1})
                    nextWalk = this.markPositionOnMap(posInDirection, "O")
                        .markPositionOnMap(startOfNextWalk, "O");
                }
            } else if ( tileInDirection == "F") {
                return this._map;
            }

            if ( nextWalk != undefined ) {
                let walkForPosition = nextWalk._getLongestWalk(startOfNextWalk);
                let lengthOfWalkForPosition = lengthOfWalk(walkForPosition);
                checkedDirections++;

                if (lengthOfWalkForPosition > currentLongestLength ) {
                    currentLongestLength = lengthOfWalkForPosition;
                    currentLongestWalk = walkForPosition;
                }
            }
        }

        return currentLongestWalk;
    }

    getSymbolAt(position: Position) {
        return this._map[this._stringPositionFor( position )];
    }

    markPositionOnMap(position: Position, symbol: string): HikingMap {
        return new HikingMap( 
            this._map.substring ( 0, this._stringPositionFor(position) )
            + symbol
            +  this._map.substring ( this._stringPositionFor(position)+1 ) 
        );
    }

    private _stringPositionFor(position: Position) {
        return position.x + (this._width+1)*position.y;
    }

    getStartPosition(): Position {
        return { x: 1, y: 0};
    }

    removeSlopes() {
        return new HikingMap( this._map.replace(/[\^v<>]/g, "."));
    }

    toString() {
        return this._map;
    }
}


interface Position {
    x: number,
    y: number
}

function addPositions(pos1: Position, pos2: Position): Position {
    return {x: pos1.x+pos2.x, y: pos1.y+pos2.y};
}

export function lengthOfWalk(walkForPosition: string) {
    return walkForPosition.length - walkForPosition.replace(/O/g,"").length +1 ;
}

