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
        let result: string[] = [];

        for ( let line = 0; line < numberOfLines; line ++) {
            result[line] = this.lines[line];
        }

        return result;
    }

    getLastLines(numberOfLines: number): string[] {
        let result: string[] = [];

        const startingWithLine = this.lines.length - numberOfLines;
        for ( let line = startingWithLine; line < this.lines.length; line ++) {
            result[line-startingWithLine] = this.lines[line];
        }

        return result;
    }

    getLines(startWithLine: number, endWithLine: number): string[] {
        let result: string[] = [];
        for ( let line = startWithLine; line <= endWithLine; line ++ ) {
            result.push ( this.lines[line]);
        }

        return result;
    }



    getFirstColumns(numberOfColumns: number): any {
        let result: string[] = [];

        for ( let column = 0; column < numberOfColumns; column ++) {
            result[column] = this.columns[column];
        }

        return result;
    }

}