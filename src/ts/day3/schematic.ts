export class Schematic {

    static readonly digitChars = "0123456789";
    lineLength = 0;

    schematic: string;
    constructor ( representation: string ) {
        this.schematic = representation;
        this.lineLength = representation.indexOf("\n")+1;
    }

    getSumOfMissingParts(): number {
        return this
            .findMissingParts()
            .reduce( (prev, curr, index) => prev + curr);
    }

    private findMissingParts(): number[] {
        let result : number[] = [0];
        let column = 0;
        let line = 0;
        
        while (column + line * this.lineLength < this.schematic.length) {
            const currentChar = this.schematic[line * this.lineLength + column];

            if (this.isDigit(currentChar)) {
                let numberOfDigits = this.getNumberOfDigitsStartingAt(line, column);

                if (this.hasNeighboringSymbol(line, column, numberOfDigits)) {
                    result.push(this.getCurrentPartNumber(line, column, numberOfDigits));
                }

                column += numberOfDigits;
            } else if (currentChar == "\n") {
                line++;
                column = 0;
            } else {
                column++;
            }
        }
        return result;
    }

    private getNumberOfDigitsStartingAt(line: number, column: number) {
        let numberOfDigits = 1;
        while (this.isDigit(this.schematic[line * this.lineLength + column + numberOfDigits])) {
            numberOfDigits++;
        }
        return numberOfDigits;
    }

    private isDigit(currentChar: string) {
        return Schematic.digitChars.includes(currentChar);
    }

    private getCurrentPartNumber(line: number, column: number, numberOfDigits: number): number {
        return Number(this.schematic.substring(
            line * this.lineLength + column,
            line * this.lineLength + column + numberOfDigits
        ));
    }

    hasNeighboringSymbol(line: number, column: number, numberOfDigits: number) : boolean {
        for ( let checkColumn = column-1; checkColumn <= column+numberOfDigits; checkColumn ++ ) {
            if ( this.isSymbolCharacter( line-1, checkColumn)
                || this.isSymbolCharacter( line+1, checkColumn)) {
                return true;
            }
        }

        return this.isSymbolCharacter(line, column+numberOfDigits)
            || this.isSymbolCharacter(line, column-1);
    }

    private isSymbolCharacter(line: number, column: number) {
        let index = line * this.lineLength + column;

        return line >= 0 && index >= 0 && index < this.schematic.length &&
            ! (Schematic.digitChars + ".\n").includes( this.schematic[index]);
    }

    getSumOfGearRatios(): number {
        let result : number[] = [0];
        let column = 0;
        let line = 0;
        
        while (column + line * this.lineLength < this.schematic.length) {
            const currentChar = this.schematic[line * this.lineLength + column];

            if (currentChar == "*") {
                let ratio = this.getGearRatio ( line, column )
                if ( ratio != null ) {
                    result.push(ratio);
                } 
                column++;
            } else if (currentChar == "\n") {
                line++;
                column = 0;
            } else {
                column++;
            }
        }

        return result.reduce( (prev, curr, index) => prev + curr);
    }

    getGearRatio(line: number, column: number): number | null {
        const charBefore = this.getCharAt(line, column-1);
        const charAfter = this.getCharAt(line, column+1);
        
        if ( this.isDigit( charBefore) && this.isDigit(charAfter)) {
            return this.getPartNumberOfDigitAt(line, column-1) 
                * this.getPartNumberOfDigitAt(line, column+1)
        }

        return null;
    }
    

    private getCharAt(line: number, column: number) {
        return this.schematic[line * this.lineLength + column];
    }

    private getPartNumberOfDigitAt(line: number, column: number) : number {
        let startColumn = column;
        while (this.isDigit(this.getCharAt(line, startColumn-1))) {
            startColumn--;
        }
        let numberOfDigits = column-startColumn+1;
        while ( this.isDigit(this.getCharAt(line,startColumn+numberOfDigits))) {
            numberOfDigits++;
        }
        let numberSubstring = this.schematic.substring(
            line*this.lineLength+startColumn, 
            line*this.lineLength+startColumn+numberOfDigits
        );
        return Number(numberSubstring);
    }
}