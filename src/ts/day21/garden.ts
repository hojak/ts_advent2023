
export class Garden {
    private _lines: string[];

    constructor ( description: string ) {
        this._lines = description.split("\n");
    }

    getSymbolAt(position: Position): String {
        return this._lines[position.y][position.x];
    }
    getHeight(): any {
        return this._lines.length;
    }
    getWidth(): any {
        return this._lines[0].length;
    }

    getNumberOfReachablePots(numberOfSteps: number): number {
        let startPosition = this.findStartposition();

        let reachablePositions : Set<string> = new Set( [posToString(startPosition)]);
        for ( let step = 0; step < numberOfSteps; step ++ ) {
            let nextSetOfReachablePositions : Set<string> = new Set();

            for ( let positionString of reachablePositions) {
                let position = createPositionFromString ( positionString );
                for ( let offset of stepOffsets ) {
                    let checkPosition = addPositions ( position, offset );
                    if ( ! this.outOfBounds ( checkPosition ) && this.getSymbolAt (checkPosition) != "#") {
                        nextSetOfReachablePositions.add ( posToString(checkPosition) );
                    }
                }
            }

            reachablePositions = nextSetOfReachablePositions;
        }

        return reachablePositions.size;
    }

    outOfBounds(position: Position) : boolean {
        return position.x < 0 && position.y < 0 && position.x >= this.getWidth() && position.y >= this.getHeight();
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
