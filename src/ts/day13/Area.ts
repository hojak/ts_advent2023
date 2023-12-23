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
        for ( let line = startWithLine; line <= endWithLine; line ++ ) {
            result.push ( this.lines[line]);
        }

        return result;
    }



    getFirstColumns(numberOfColumns: number): string[] {
        return this.getColumns(0, numberOfColumns-1);
    }


    getColumns(startWithColumn: number, endWithColumn: number): string[] {
        let result: string[] = [];
        for ( let line = startWithColumn; line <= endWithColumn; line ++ ) {
            result.push ( this.columns[line]);
        }

        return result;
    }


}