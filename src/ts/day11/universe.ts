export class Universe {
    description: string;
    private _cols: number;
    private _rows: number;

    emptyRows : number[] = [];
    emptyCols : number[] = [];
    private expansionFactor: number = 2;

    constructor( input: string ) {
        this.description = input.replace(/\n/g, "");
        this._cols = input.indexOf("\n");
        this._rows = this.description.length / this._cols;

        this.expand();
    }

    expand() {
        for (let i=0; i<this._rows; i++ ) {
            let row = this.getRow (i);
            if ( isEmpty(row)) {
                this.emptyRows.push(i);
            }
        }

        for ( let i=0; i<this._cols; i++) {
            let col = this.getCol(i);
            if ( isEmpty ( col )) {
                this.emptyCols.push(i);
            }
        }
    }

    insertEmptyCol(col: number) {
        for ( let index = this.description.length - this._cols + col; index >= 0; index -= this._cols  ) {
            this.description = this.description.substring(0, index+1) + "." + this.description.substring(index+1);
        }
        this._cols ++;
    }

    getCol(col: number) {
        let result = "";
        for ( let row=0; row<this._rows; row++) {
            result += this.getSymbolAt ( col, row )
        }
        return result;
    }

    getSymbolAt(col: number, row: number) {
        return this.description [col + row*this._cols];
    }

    insertEmptyRow(atRow: number) {
        this.description = 
            this.description.substring(0,atRow*this._cols+1) 
            + ".".repeat(this._cols) 
            + this.description.substring(atRow*this._cols+1);
        this._rows++;        
    }

    getRow(row: number) : string{
        return this.description.substring(row*this._cols, (row+1)*this._cols);
    }

    public get cols(): number {
        return this._cols;
    }

    public get rows(): number {
        return this._rows;
    }

    getSumOfDistances(): number {
        let columnVisits: number[] = new Array ( this._cols);
        let rowVisits: number[] = new Array ( this._rows );

        for ( let col=0; col < this._cols; col ++ ) {
            columnVisits[col] = 0;
        }
        for ( let row=0; row < this._rows; row ++ ) {
            rowVisits[row] = 0;
        }

        let galaxies = this.getGalaxyCoordinates();

        for ( let index1=0; index1 < galaxies.length-1; index1++ ) {
            let galaxy1 = galaxies[index1];
            for ( let index2=index1+1; index2 < galaxies.length; index2++ ) {
                let galaxy2 = galaxies[index2];

                let from = Math.min ( galaxy1[0], galaxy2[0]);
                let to = Math.max ( galaxy1[0], galaxy2[0]);
                for ( let col=from; col<to; col ++ ) {
                    columnVisits[col]++;
                }

                from = Math.min ( galaxy1[1], galaxy2[1]);
                to = Math.max ( galaxy1[1], galaxy2[1]);
                for ( let row=from; row<to; row ++ ) {
                    rowVisits[row]++;
                }
            }
        }

        this.emptyCols.forEach ( emptyCol => {
            columnVisits[emptyCol] *= this.expansionFactor;
        });
        this.emptyRows.forEach ( emptyRow => {
            rowVisits[emptyRow] *= this.expansionFactor;
        });

        let sumOfVisits = columnVisits.reduce ( (prev, curr, index) => prev+curr) + 
            rowVisits.reduce ((prev, curr, index) => prev+curr);

        return sumOfVisits;
    }

    getGalaxyCoordinates(): number[][] {
        let result : number[][] = [];
        for ( let col=0; col<this._cols; col ++) {
            for ( let row = 0; row<this._rows; row++) {
                if ( this.getSymbolAt(col, row) == "#") {
                    result.push ( [col, row]);
                }
            }
        }
        return result;
    }

}

function isEmpty(row: string) {
    return row.replace(/\./g, '').length == 0;
}
