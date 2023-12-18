export class Schematic {
    static readonly digitChars = "0123456789";
    lineLength = 0;

    schematic: string;
    constructor ( representation: string ) {
        this.schematic = representation;
        this.lineLength = representation.indexOf("\n")+1;
    }

    getSumOfMissingParts(): number {
        let found : number[] = [0];
        
        let column = 0;
        let line = 0;
        while (column + line*this.lineLength < this.schematic.length) {
            const currentChar = this.schematic[column];

            if ( Schematic.digitChars.includes(currentChar)) {
                let numberOfDigits = 1;
                while ( Schematic.digitChars.includes(this.schematic[column + numberOfDigits])) {
                    numberOfDigits++;
                }

                if ( this.hasNeighboringSymbol(line, column, numberOfDigits) ) {
                    found.push ( Number ( this.schematic.substring(column, column+numberOfDigits)));
                }

                column += numberOfDigits;
            } else if ( currentChar == "\n") {
                line ++;
                column = 0;
            } else {
                column ++;
            }
        }

        return found.reduce( (prev, curr, index) => prev + curr);
    }

    hasNeighboringSymbol(line: number, column: number, numberOfDigits: number) : boolean {
        return this.isSymbolCharacter(line*this.lineLength + column+numberOfDigits)
            || this.isSymbolCharacter(line*this.lineLength + column-1)
            || this.isSymbolCharacter((line+1)*this.lineLength);
    }

    private isSymbolCharacter(index: number) {
        return index >= 0 && index < this.schematic.length &&
            ! (Schematic.digitChars + ".\n").includes( this.schematic[index]);
    }


    
}