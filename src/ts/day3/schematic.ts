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
            const currentChar = this.schematic[index];

            if ( Schematic.digitChars.includes(currentChar)) {
                let numberOfDigits = 1;
                while ( Schematic.digitChars.includes(this.schematic[index + numberOfDigits])) {
                    numberOfDigits++;
                }

                if ( this.hasNeighboringSymbol(index, numberOfDigits) ) {
                    found.push ( Number ( this.schematic.substring(index, index+numberOfDigits)));
                }

                index += numberOfDigits;
            } else {
                index ++;
            }
        }

        return found.reduce( (prev, curr, index) => prev + curr);
    }

    hasNeighboringSymbol(index: number, numberOfDigits: number) : boolean {
        return this.isSymbolCharacter(index+numberOfDigits)
            || this.isSymbolCharacter(index-1);
    }

    private isSymbolCharacter(index: number) {
        return index >= 0 && index < this.schematic.length &&
            ! (Schematic.digitChars + ".\n").includes( this.schematic[index]);
    }


    
}