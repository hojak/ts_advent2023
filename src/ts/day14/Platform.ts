import { CompletionInfoFlags } from "typescript";

export class Platform {
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
            for ( let row=0; row < this.lines.length; row ++ ) {
                currentColumn += this.lines[row][col];
            }
            this.columns.push ( currentColumn);
        }
    }


    tilt (): Platform {
        this.columns = this.columns.map ( col => tiltColumn( col ));

        this.refreshLinesFromColumns();

        return this;
    }
    
    refreshLinesFromColumns() {
        this.lines = [];
        if (this.columns.length == 0) {
            return;
        }

        for ( let line =0; line < this.columns[0].length; line ++) {
            let currentLine = "";
            for ( let col =0; col < this.columns.length; col ++ ) {
                currentLine += this.columns[col][line];
            }
            this.lines.push ( currentLine);
        }
    }

    getDescription () : string {
        return this.lines.join ( "\n");
    }

    getTotalLoad(): number {
        return this.lines.map ( line => line.length - line.replace(/O/g, "").length )
                .reduce ( (prev, curr, index) => prev + curr * (this.lines.length - index), 0);
    }

}

export function tiltColumn(col: string): string {
    let result = col;
    for ( let index = 1; index < result.length; index++) {
        if ( col[index] == "O") {
            let tiltTo = index;
            while ( tiltTo > 0 && result[tiltTo-1] == "." ) {
                tiltTo--;
            }
            if ( tiltTo != index ) {
                result = moveBlock ( result, index, tiltTo );
            }
        }
    }

    return result;
}

export function moveBlock(column: string, index: number, tiltTo: number): string {
    return column.substring(0, tiltTo) + "O" + column.substring(tiltTo+1, index) + "." + column.substring(index+1);
}

