export class GroundPlan {
    private _groundPlan : boolean[][] = [];

    digAsPlanned(digPlan: string) : this {
        let diggerAt : Position = {x: 0, y: 0};
        this.digAt(diggerAt);

        digPlan.split ("\n").forEach ( line => {
            let lineSplit = line.split(" ").map ( part => part.trim()).filter ( part => part.length > 0);
            let directionDelta = getDelta(lineSplit[0]);

            for ( let steps=0; steps<Number(lineSplit[1]); steps++) {
                diggerAt = sumOfPositions(diggerAt, directionDelta);
                this.digAt ( diggerAt );
            }

        });
        return this;
    }

    digOutInterior(): this {
        // precondition: we have a loop (not checked!)
        let lookAt: Position = {x: 0, y:0};
        let inside = false;
        let seenHolesInARow = 0;
        for ( lookAt.x = 0; lookAt.x < this._groundPlan.length; lookAt.x++) {
            inside = false;
            seenHolesInARow = 0;

            for ( lookAt.y = 0; lookAt.y < this._groundPlan[lookAt.x].length; lookAt.y ++ ) {
                if (this._groundPlan[lookAt.x][lookAt.y]) {
                    seenHolesInARow ++;
                } else {
                    if ( seenHolesInARow == 1) {
                        inside = ! inside;
                    }
                    seenHolesInARow = 0;

                    if ( inside ) {
                        this.digAt ( lookAt );
                    }
                }
            }
        }

        return this;
    }

    planToString(): string {
        let result = "";
        let lookAt: Position = {x: 0, y:0};
        for ( lookAt.x = 0; lookAt.x < this._groundPlan.length; lookAt.x++) {
            let inside = false;
            for ( lookAt.y = 0; lookAt.y < this._groundPlan[lookAt.x].length; lookAt.y ++ ) {
                result += this._groundPlan[lookAt.x][lookAt.y] ? "#" : ".";
            }
            result += "\n";
        }
        return result;
    }

    private digAt(diggerAt: Position) {
        if ( this._groundPlan[diggerAt.x] == undefined ) {
            this._groundPlan[diggerAt.x] = []
        }
        this._groundPlan[diggerAt.x][diggerAt.y] = true;
    }

    numberOfDiggedSquares(): number {
        return this._groundPlan.flat().filter(digged => digged).length;
    }
}


interface Position {
    x: number,
    y: number
}


function getDelta(direction: string) : Position {
    switch ( direction ) {
        case "R": return {x: 1, y: 0};
        case "L": return {x:-1, y: 0};
        case "D": return {x: 0, y: 1};
        case "U": return {x: 0, y:-1};
        default:
            return {x:0, y:0};
    }
}

function sumOfPositions(pos1: Position, pos2: Position): Position {
    return {
        x: pos1.x + pos2.x,
        y: pos1.y + pos2.y
    };
}

