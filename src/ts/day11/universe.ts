export class Universe {
    description: string;
    private _cols: number;
    private _rows: number;

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
                this.insertEmptyRow ( i );
                i++;
            }
        }

        for ( let i=0; i<this._cols; i++) {
            let col = this.getCol(i);
            if ( isEmpty ( col )) {
                this.insertEmptyCol(i);
                i++
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
}

function isEmpty(row: string) {
    return row.replace(/\./g, '').length == 0;
}
