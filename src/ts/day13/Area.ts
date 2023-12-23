import { isThisTypeNode } from "typescript";

export class Area {
    lines: string[];
    columns: string[] = [];

    constructor ( input : string ) {
        this.lines = input.split("\n").filter ( line => line.trim() >= "");

        this.initColumns ();
    }

    initColumns() {
        if (this.lines.length == 0) {
            return;
        }

        for ( let col =0; col < this.lines[0].length; col ++) {
            let currentColumn = "";
            for ( let row =0; row < this.lines.length; row ++ ) {
                currentColumn += this.lines[row][col];
            }
            this.columns.push ( currentColumn);
        }
    }

    getFirstLines(numberOfLines: number): string[] {
        return this.getLines(0, numberOfLines-1);
    }

    getLastLines(numberOfLines: number): string[] {
        return this.getLines( this.lines.length - numberOfLines, this.lines.length-1);
    }

    getLines(startWithLine: number, endWithLine: number): string[] {
        let result: string[] = [];
        let increment = (startWithLine <= endWithLine) ? 1 : -1

        for ( let line = startWithLine; Math.sign(line - endWithLine) != Math.sign(increment); line +=increment ) {
            result.push ( this.lines[line]);
        }

        return result;
    }

    getFirstColumns(numberOfColumns: number): string[] {
        return this.getColumns(0, numberOfColumns-1);
    }


    getColumns(startWithColumn: number, endWithColumn: number): string[] {
        let result: string[] = [];
        let increment = (startWithColumn <= endWithColumn) ? 1 : -1

        for ( let line = startWithColumn; Math.sign(line - endWithColumn) != Math.sign(increment); line +=increment ) {
            result.push ( this.columns[line]);
        }

        return result;
    }


    findVerticalReflections(): number[] {
        let result : number[] = [];

        for ( let column = 0; column < this.columns.length-1; column++ ) {
            let startLeft = Math.max (0,  2*column+2-this.columns.length)
            let endRight = Math.min ( column+1+column, this.columns.length-1);

            let left = this.getColumns(column, startLeft);
            let right = this.getColumns( column+1,endRight);

            if ( left.join("") == right.join("") ) {
                result.push ( column );
            }
        }

        return result;
    }



}