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

        let matching = 0;
        let myIndex = 0, winningIndex = 0;
        while ( myIndex < this.myNumbers.length && winningIndex < this.winningNumbers.length) {
            if ( this.winningNumbers[winningIndex] == this.myNumbers[myIndex]) {
                matching++;
                myIndex++;
                winningIndex++;
            } else {
                while ( this.winningNumbers[winningIndex] < this.myNumbers[myIndex]) {
                    winningIndex++;
                }
                while ( this.winningNumbers[winningIndex] > this.myNumbers[myIndex]) {
                    myIndex++;
                }
            }
        }

        if ( matching == 0) { 
            return 0; 
        } else {
            return Math.pow(2, matching-1);
        }
    }

    static splitToNumbers ( str: string ) : number[] {
        return str
            .split(" ")
            .map(part => part.trim())
            .filter ( part => part != "" )
            .map ( part => Number (part))
            .sort( (a,b) =>  a-b );
    }

}