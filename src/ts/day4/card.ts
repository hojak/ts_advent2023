export class Card {
    winningNumbers : number[];
    myNumbers : number[];

    constructor ( representation: string ) {
        let splitHeader = representation.split(":").map ( part => part.trim());

        let splitWinningNumbers = splitHeader[1].split("|").map( part => part.trim());

        this.winningNumbers = Card.splitToNumbers(splitWinningNumbers[0]);
        this.myNumbers = Card.splitToNumbers(splitWinningNumbers[1]);
    }

    rate(): number {
        if ( this.winningNumbers.length == 0 && this.myNumbers.length == 0 ) {
            return 0;
        }
        if ( this.winningNumbers[0] == this.myNumbers[0]) {
            return 1;
        }
        return 0;
    }

    static splitToNumbers ( str: string ) : number[] {
        return str
            .split(" ")
            .map(part => part.trim())
            .filter ( part => part != "" )
            .map ( part => Number (part))
            .sort();
    }

}