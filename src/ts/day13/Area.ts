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
        return getAreaOfStringArray ( this.lines, startWithLine, endWithLine);        
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
        return findReflectionsInArray(this.columns);
    }

    findHorizontalReflections(): number[] {
        return findReflectionsInArray(this.lines);
    }


    getRate(): any {
        return this.findHorizontalReflections().reduce((prev, curr, index) => prev+(curr+1)*100, 0)
         + this.findVerticalReflections().reduce((prev, curr, index) => prev+(curr+1), 0)
    }


}


function findReflectionsInArray(arrayOfStrings: string[]) : number[] {
    let result: number[] = [];

    for (let index = 0; index < arrayOfStrings.length - 1; index++) {
        let startLeft = Math.max(0, 2 * index + 2 - arrayOfStrings.length);
        let endRight = Math.min(index + 1 + index, arrayOfStrings.length - 1);

        let left = getAreaOfStringArray(arrayOfStrings, index, startLeft);
        let right = getAreaOfStringArray(arrayOfStrings, index + 1, endRight);

        if (left.join("") == right.join("")) {
            result.push(index);
        }
    }
    return result;
}

function getAreaOfStringArray(strings: string[], start: number, end: number): string[] {
    let result: string[] = [];
    let increment = (start <= end) ? 1 : -1

    for ( let line = start; Math.sign(line - end) != Math.sign(increment); line +=increment ) {
        result.push ( strings[line]);
    }

    return result;

}
