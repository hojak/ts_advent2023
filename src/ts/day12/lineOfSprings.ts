export class LineOfSprings {
    springs: string;
    groups: string[];

    constructor( line: string ) {
        let split = line.trim().split(" ");
        this.springs = split[0];
        this.groups = split[1].split(",");
    }

    getNumberOfPossibleSolutions () : number {
        return 1;
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

