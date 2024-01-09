import { Position } from "./position";

export class GroundPlan {
    private _groundPlan : string[][] = [];

    digAsPlanned(digPlan: string) : this {
        let diggerAt = new Position (0,0);

        let lastDirection = "";

        digPlan.split("\n").filter(line => line.length>0).forEach ( line => {
            let lineSplit = line.split(" ").map ( part => part.trim()).filter ( part => part.length > 0);
            let directionDelta = getDelta(lineSplit[0]);

            let cornerSymbol = getCornerSymbol ( lastDirection, lineSplit[0]);
            lastDirection = lineSplit[0];
            this.digAt ( diggerAt, cornerSymbol );
     
            let directionSymbol = (lineSplit[0] == "R" || lineSplit[0] == "L") ? "-" : "|";
     
            for ( let steps=0; steps<Number(lineSplit[1])-1; steps++) {
                diggerAt = sumOfPositions(diggerAt, directionDelta);
                this.digAt ( diggerAt, directionSymbol );
            }

            // last position may alreay contain a symbol (close the loop)
            diggerAt = sumOfPositions(diggerAt, directionDelta);
            let symbolAtLastPosition = this.getSymbolAt(diggerAt)
            
            if ( isDirectionSymbol(symbolAtLastPosition) ) {
                directionSymbol = getCornerSymbol(lineSplit[0], symbolAtLastPosition);
            }
            this.digAt ( diggerAt, directionSymbol );
        });

        return this;
    }

    getSymbolAt(position: Position) : string | undefined {
        try {
            return this._groundPlan[position.x][position.y];
        } catch ( error ) {
            return undefined;
        }
    }

    outOfBounds(position: Position) : boolean{
        let topLeft = getTopLeftOfFloorPlan ( this._groundPlan );
        let bottomRight = getBottomRightOfFloorPlan ( this._groundPlan );
        return position.x >= topLeft.x && position.x <= bottomRight.x   
            && position.y >= topLeft.y && position.y <= bottomRight.y;
    }

    digOutInterior(): this {
        let topLeft = getTopLeftOfFloorPlan ( this._groundPlan );
        let bottomRight = getBottomRightOfFloorPlan ( this._groundPlan );
        
        let result = 0;
        let openingChar = "";

        let open = false;

        let lookAt = new Position (0, 0);

        for ( lookAt.y = topLeft.y; lookAt.y <= bottomRight.y; lookAt.y++ ) {
            for ( lookAt.x = topLeft.x; lookAt.x <= bottomRight.x ; lookAt.x++) {
                let currentChar = this.getSymbolAt(lookAt);

                switch ( currentChar ) {
                    case "|": open = ! open; break;
                    case "F": openingChar = "F"; break;
                    case "J":
                        if ( openingChar == "F") {
                            open = ! open;
                        } 
                        openingChar = "";
                        break;
                    case "L": openingChar = "L"; break;
                    case "7": 
                        if ( openingChar == "L") {
                            open = ! open;
                        }
                        openingChar = "";
                        break;

                    case "-": break;

                    case " ": 
                    case ".":
                    case undefined:
                        if ( open ) {
                            this.digAt(lookAt, "#");
                        }
                        break;

                }
            }
        }

        return this;
    }


    printBoundaries () {
        let topLeft = getTopLeftOfFloorPlan ( this._groundPlan );
        let bottomRight = getBottomRightOfFloorPlan ( this._groundPlan );

        console.log ( "Top-Left: " + topLeft.x + "/" + topLeft.y
            +  "\nBottom-Right: " + bottomRight.x + "/" + bottomRight.y + "\n" );
    }

    planToString(): string {
        let topLeft = getTopLeftOfFloorPlan ( this._groundPlan );
        let bottomRight = getBottomRightOfFloorPlan ( this._groundPlan );

        let result = "";

        let lookAt: Position = new Position ( 0,0);
        for ( lookAt.y = topLeft.y; lookAt.y <= bottomRight.y; lookAt.y++ ) {
            for ( lookAt.x = topLeft.x; lookAt.x <= bottomRight.x ; lookAt.x++) {
                result += this._groundPlan[lookAt.x][lookAt.y] ?? ".";
            }
            result += "\n";
        }
        return result;
    }

    private digAt(diggerAt: Position, comingFrom : string) {
        if ( this._groundPlan[diggerAt.x] == undefined ) {
            this._groundPlan[diggerAt.x] = []
        }
        this._groundPlan[diggerAt.x][diggerAt.y] = comingFrom;
    }

    numberOfDiggedSquares(): number {
        let topLeft = getTopLeftOfFloorPlan ( this._groundPlan );
        let bottomRight = getBottomRightOfFloorPlan ( this._groundPlan );

        let result = 0;
        let lookAt = new Position (0,0);

        for ( lookAt.y = topLeft.y; lookAt.y <= bottomRight.y; lookAt.y++ ) {
            for ( lookAt.x = topLeft.x; lookAt.x <= bottomRight.x ; lookAt.x++) {

                let symbol = this.getSymbolAt(lookAt);
                if ( symbol != undefined && symbol != "." ) {
                    result ++;
                }
            }
        }


        let length = this.planToString().replace (/\n/g, "").replace(/\./g, "").length;

        console.log ( "result: " + result  + "  stringlength: " + length )

        return result;
    }
}

function isDigTraceSymbol(currentSymbol: string) {
    return currentSymbol == "U" || currentSymbol == "D" || currentSymbol == "L" || currentSymbol == "R";
}

function getDelta(direction: string) : Position {
    switch ( direction ) {
        case "R": return new Position (1,0);
        case "L": return new Position (-1, 0);
        case "D": return new Position (0, 1);
        case "U": return new Position (0, -1);
        default:
            return new Position (0, 0);
    }
}

function sumOfPositions(pos1: Position, pos2: Position): Position {
    return new Position (pos1.x + pos2.x, pos1.y + pos2.y);
}

function getMinimalKeyOf( someArray : any[]) : any{
    if ( someArray == undefined) {return 0;}
    return Object.keys ( someArray ).reduce( (prev, curr) => (Number(prev) < Number(curr)) ? prev : curr);
}

function getMaximalKeyOf( someArray : any[]) : any{
    if ( someArray == undefined) {return 0;}
    return Object.keys(someArray).reduce( (prev, curr) => (Number(prev) > Number(curr)) ? prev : curr);
}


function getTopLeftOfFloorPlan(groundPlan: string[][]) : Position {
    let result = new Position (
        getMinimalKeyOf(groundPlan), 
        0
    );

    let maxX = getMaximalKeyOf(groundPlan);

    for (let x = result.x; x<=maxX; x++ ){
        result.y = Math.min ( result.y, getMinimalKeyOf(groundPlan[x]));
    }

    return result;
}

function getBottomRightOfFloorPlan(groundPlan: string[][]) : Position {
    let result = new Position (
        getMaximalKeyOf(groundPlan), 
        0
    );

    let minX = getMinimalKeyOf(groundPlan);

    for (let x = minX; x<=result.x; x++ ){
        result.y = Math.max ( result.y, getMaximalKeyOf(groundPlan[x]));
    }

    return result;
}

function getCornerSymbol(lastDirection: string, newDirection: string | undefined) : string {
    if (newDirection == undefined) {
        return lastDirection;
    }

    switch ( lastDirection+newDirection) {
        case "UL":
        case "RD": 
            return "7";
        case "RU":
        case "DL": 
            return "J";
        case "DR":
        case "LU":
            return "L";
        case "LD":
        case "UR": 
            return "F";
        default:
            return newDirection;
    }
}

function isDirectionSymbol(symbol: string | undefined) {
    return symbol == "R" || symbol == "L" || symbol == "D" || symbol == "U";
}

export function getPlanBoundaries ( digPlan : string ) : Position[] {
    let topLeft = new Position (0, 0);
    let bottomRight = new Position  (0, 0);
    let diggerAt = new Position (0, 0);

    digPlan.split("\n").filter(line => line.length>0).forEach ( line => {
        let lineSplit = line.split(" ").map ( part => part.trim()).filter ( part => part.length > 0);
        let directionDelta = getDelta(lineSplit[0]);

        for ( let steps=0; steps<Number(lineSplit[1]); steps++) {
            diggerAt = sumOfPositions(diggerAt, directionDelta);
            if ( diggerAt.x < topLeft.x) {
                topLeft.x = diggerAt.x;
            }
            if ( diggerAt.x > bottomRight.x) {
                bottomRight.x = diggerAt.x;
            }
            if ( diggerAt.y < topLeft.y) {
                topLeft.y = diggerAt.y;
            }
            if ( diggerAt.y > bottomRight.y) {
                bottomRight.y = diggerAt.y;
            }
        }
    });

    return [topLeft, bottomRight];
}
