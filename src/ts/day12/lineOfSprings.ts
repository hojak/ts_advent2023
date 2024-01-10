export class LineOfSprings {
    springs: string;
    groups: number[];
    private _partialResults: Map<string, number> = new Map();

    constructor( line: string ) {
        let split = line.trim().split(" ");
        this.springs = split[0];
        this.groups = split[1].split(",").map ( str => Number(str));
    }

    unfold () {
        this.springs = this.springs + ("?" + this.springs).repeat(4);
        this.groups = this.groups.concat(this.groups).concat(this.groups).concat(this.groups).concat(this.groups);
    }

    toString() : string {
        return this.springs + " " + this.groups.join(",");
    }



    getNumberOfPossibleSolutions () : number {
        this._partialResults = new Map();
        return this._getNumberOfPossibleSolutions ( this.springs, this.groups );
    }


    static isValidString(line: string): any {
        let split = line.trim().split(" ");
        let springs = split[0];
        let groups = split[1].split(",").map ( str => Number(str));
        
        return LineOfSprings.isValid ( springs, groups);
    }

    static isValid(springs: string, groups: number[]): boolean {
        let foundGroups : number[] = [];

        let currentGroup = 0;
        let groupOpen = false;

        let i = 0;
        while ( i<springs.length && springs[i] != "?") {
            switch ( springs[i]) {
                case "#":
                    if ( groupOpen ) {
                        currentGroup ++;
                    } else {
                        groupOpen = true;
                        currentGroup = 1;
                    }
                    break;
                case ".":
                    if ( groupOpen ) {
                        foundGroups.push(currentGroup);
                        groupOpen = false;
                        break;
                    }
                
            }
            i++;
        }
        if ( groupOpen ) {
            foundGroups.push( currentGroup);
        }

        if ( springs[i] == "?" ) {
            if ( foundGroups.length == 0 ) {
                return true;
            }

            for ( let i=0; i<foundGroups.length-1; i++) {
                if ( foundGroups[i] != groups[i]) {
                    return false;
                }
            }
            return foundGroups[foundGroups.length-1] <= groups[foundGroups.length-1];
        }

        if ( foundGroups.length != groups.length ) {
            return false;
        }

        for ( let i=0; i<foundGroups.length; i++) {
            if ( foundGroups[i] != groups[i]) {
                return false;
            }
        }
        return true;
    }
        



    _getNumberOfPossibleSolutions ( springs: string, groups : number[], l: number = 1 ) : number {
        let solution = this._partialResults.get(springs + " " + groups.join(","));
        if ( solution != undefined) {
            return solution;
        }

        springs = trimSprings(springs);
        let copyOfGroups = Object.assign([], groups);

        if ( groups.length == 0) {
            return ( springs.indexOf("#") == -1 ) ? 1 : 0;
        }

        let numberOfUnknowns = springs.length - springs.replace ( /\?/g, "").length;
        let numberOfSprings = groups.reduce( (prev, curr, index) => prev+curr);
        let numberOfKnownSprings = springs.length - springs.replace ( /#/g, "").length;

        if ( ! LineOfSprings.isValid(springs, groups) ) {
            return 0;
        }

        if ( numberOfUnknowns == 0 ) {
            return 1;
        }

        if (numberOfUnknowns < numberOfSprings - numberOfKnownSprings) {
            return 0;
        }


        let sizeOfFirstGroup = copyOfGroups.shift() ?? 0;
        let sizeOfRemainingGroups = numberOfSprings - sizeOfFirstGroup;

        let firstPossibleStart = getSmallesStartIndexForABlock(springs);
        let lastPossibleStart = Math.min (
            springs.length - sizeOfFirstGroup - sizeOfRemainingGroups - copyOfGroups.length,
            getFirstKnownSpring(springs)
        );

        let result = 0;
        for ( let tryStartForFirstGroup = firstPossibleStart; tryStartForFirstGroup <= lastPossibleStart; tryStartForFirstGroup ++) {
            let springsWithPlacedGroup = placeGroup ( springs, sizeOfFirstGroup, tryStartForFirstGroup );
            if ( springsWithPlacedGroup != null ) {
                result += this._getNumberOfPossibleSolutions(springsWithPlacedGroup.substring(tryStartForFirstGroup + sizeOfFirstGroup + 1), copyOfGroups, l+1);
            }
        }

        this._partialResults.set(springs + " " + groups.join(","), result);
        return result;
    }
}

function getSmallesStartIndexForABlock(springs: string) {
    let firstPossibleStart = 0;
    while (springs[firstPossibleStart] == ".") {
        firstPossibleStart++;
    }
    return firstPossibleStart;
}

function getFirstKnownSpring(springs: string): number {
    let index = springs.indexOf("#");
    if ( index == -1 ) {
        index = springs.length;
    }
    return index;
}

function placeGroup(springs: string, sizeOfFirstGroup: number, startingAtIndex: number) : string | null {
    let result = springs.substring(0,startingAtIndex) + "#".repeat(sizeOfFirstGroup) + "." + springs.substring (startingAtIndex + sizeOfFirstGroup+ 1);

    if ( springs.substring(startingAtIndex, startingAtIndex+sizeOfFirstGroup).indexOf(".") != -1 ) {
        // block starting at the given point would overlap "." and is therefore not possible
        return null;
    }

    if ( springs.length >= startingAtIndex + sizeOfFirstGroup +1 && springs[startingAtIndex+sizeOfFirstGroup] == "#" ){
        // next char after the new group is a #, so we have no separation of this group
        return null;
    }

    return result;
}

function trimSprings(springs: string): string {
    let trimmedStart = 0;
    while ( springs[trimmedStart] == "." ) {
        trimmedStart ++;
    }

    let trimmedEnd = springs.length-1;
    while ( springs[trimmedEnd ] == ".") {
        trimmedEnd--;
    }
    return springs.substring(trimmedStart, trimmedEnd+1);
}

