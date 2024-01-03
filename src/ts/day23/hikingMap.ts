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
        let currentLongestLength = -1;
        let currentLongestWalk = "";

        let walkingPosition = currentPosition;
        let walkingMap = this._map;
        let possibleSteps : Position[] = this.getPossibleNextSteps(walkingPosition, walkingMap);
        while ( possibleSteps.length == 1 ) {
            if ( this.getSymbolAt( possibleSteps[0]) == "F") {
                return walkingMap;
            }
            walkingMap = this.walkTheStep ( possibleSteps[0], walkingMap );
            walkingPosition = possibleSteps[0];
            possibleSteps = this.getPossibleNextSteps(walkingPosition, walkingMap );
        }

        if ( possibleSteps.length == 0) {
            return "";
        }

        let mapToNextJunction = new HikingMap ( walkingMap );

        for ( let step of possibleSteps ) {
            if ( this.getSymbolAt(step) == "F") {
                return this._map;
            }

            let mapForStep = mapToNextJunction.markPositionOnMap(step, "O");
            let longestHikeForStep = mapForStep._getLongestWalk(step);
            let lengthOfWalkForStep = lengthOfWalk(longestHikeForStep);

            if (lengthOfWalkForStep > currentLongestLength ) {
                currentLongestLength = lengthOfWalkForStep;
                currentLongestWalk = longestHikeForStep;
            }
        }

        return currentLongestWalk;
    }

    walkTheStep(position: Position, mapString: string): string {
        return mapString.substring ( 0, this._stringPositionFor(position) )
            + "O"
            +  mapString.substring ( this._stringPositionFor(position)+1 ) 
    }

    getPossibleNextSteps(walkingPosition: Position, walkingMap: string): Position[] {
        let result: Position[] = [];
        let directionOfSlopeTile : Position | undefined;

        let currentSymbol = this.getSymbolAt(walkingPosition, walkingMap);
        if ( (directionOfSlopeTile = getDirectionForSlopteTile ( currentSymbol )) != undefined) {
            return [addPositions(walkingPosition, directionOfSlopeTile)];
        }

        for (let direction of directions) {
            let symbol = this.getSymbolAt( addPositions(walkingPosition, direction), walkingMap );


            if ( symbol == "." || symbol == "F" ) {
                result.push ( addPositions(walkingPosition, direction));
            } else if ((directionOfSlopeTile = getDirectionForSlopteTile ( symbol )) != undefined) {
                if ( direction.x != - directionOfSlopeTile.x || direction.y != - directionOfSlopeTile.y ) {
                    result.push ( addPositions(walkingPosition, direction));
                }
            }
        }
        return result;
    }

    getSymbolAt(position: Position, overrideMap: String = "") {
        if ( overrideMap != "" ) {
            return overrideMap[this._stringPositionFor( position )];
        } else {
            return this._map[this._stringPositionFor( position )];
        }
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

let slopeCharToDirection : {[tile: string]: any} = {
    ">": {x: 1, y:0},
    "<": {x: -1, y:0},
    "^": {x: 0, y:-1},
    "v": {x: 0, y:1}
}

const directions = [
    {x: 0, y: 1},
    {x: 0, y: -1},
    {x: 1, y: 0},
    {x: -1, y: 0},
]

function getDirectionForSlopteTile (tile: string) : Position | undefined {
    return slopeCharToDirection[tile];
}



