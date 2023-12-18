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
                let numberOfDigits = 1;
                while ( "0123456789".includes(this.schematic[index + numberOfDigits])) {
                    numberOfDigits++;
                }

                if ( this.schematic[index+numberOfDigits] == '*') {
                    found.push ( Number ( this.schematic.substring(index, index+numberOfDigits)));
                }

                index += numberOfDigits;
            } else {
                index ++;
            }
        }

        return found.reduce( (prev, curr, index) => prev + curr);
    }
}