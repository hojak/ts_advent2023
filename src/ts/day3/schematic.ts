export class Schematic {
    schematic: string;
    constructor ( representation: string ) {
        this.schematic = representation;
    }

    getSumOfMissingParts(): number {
        let found : number[] = [0];
        
        let index = 0;
        while (index < this.schematic.length) {
            if ( "0123456789".includes(this.schematic[index])) {
                // we have a number
                if ( this.schematic[index+1] == '*') {
                    found.push ( Number ( this.schematic[index]));
                }
            }
            index ++;
        }

        return found.reduce( (prev, curr, index) => prev + curr);
    }
}