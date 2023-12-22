export class LineOfSprings {
    springs: string;
    groups: number[];

    constructor( line: string ) {
        let split = line.trim().split(" ");
        this.springs = split[0];
        this.groups = split[1].split(",").map ( str => Number(str));
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
        let hasQuestionmarks = false;

        for ( let i=0; i<springs.length; i++) {
            switch ( springs[i]) {
                case "#":
                    if ( groupOpen ) {
                        currentGroup ++;
                    } else {
                        groupOpen = true;
                        currentGroup = 1;
                    }
                    break;
                case "?":
                  hasQuestionmarks = true;
                  break;
                case ".":
                    if ( groupOpen ) {
                        foundGroups.push(currentGroup);
                        groupOpen = false;
                        break;
                    }
                
            }
        }
        if ( groupOpen ) {
            foundGroups.push( currentGroup);
        }

        if ( hasQuestionmarks ) {
            // todo
            return true;
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

    if ( numberOfUnknowns == 0 ) {
        return LineOfSprings.isValid(springs, groups) ? 1 : 0;
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