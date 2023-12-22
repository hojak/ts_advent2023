export class LineOfSprings {
    springs: string;
    groups: number[];

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
        return getNumberOfPossibleSolutions ( this.springs, this.groups );
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
        
}

function getNumberOfPossibleSolutions ( springs: string, groups : number[] ) : number {
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

    let worker = springs; 
    let result = 0;
    let index = 0;

    while ( worker[index]!="?" && index < worker.length) {
        index ++;
    }

    if ( index< worker.length ) {
        result += getNumberOfPossibleSolutions ( worker.substring(0,index) + "#" + worker.substring(index+1), groups );
        result += getNumberOfPossibleSolutions ( worker.substring(0,index) + "." + worker.substring(index+1), groups );
    }

    return result;
}

