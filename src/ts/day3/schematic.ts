export class Schematic {
    static readonly digitChars = "0123456789";

    schematic: string;
    constructor ( representation: string ) {
        this.schematic = representation;
    }

    getSumOfMissingParts(): number {
        let found : number[] = [0];
        
        let index = 0;
        while (index < this.schematic.length) {

            if ( Schematic.digitChars.includes(this.schematic[index])) {
                let numberOfDigits = 1;
                while ( Schematic.digitChars.includes(this.schematic[index + numberOfDigits])) {
                    numberOfDigits++;
                }

                if ( this.isSymbolCharacter(index + numberOfDigits)) {
                    found.push ( Number ( this.schematic.substring(index, index+numberOfDigits)));
                }

                index += numberOfDigits;
            } else {
                index ++;
            }
        }

        return found.reduce( (prev, curr, index) => prev + curr);
    }

    private isSymbolCharacter(index: number) {
        return ! (Schematic.digitChars + ".\n").includes( this.schematic[index]);
    }
}