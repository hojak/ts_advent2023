export class Area {
    lines: string[];

    constructor ( input : string ) {
        this.lines = input.split("\n").filter ( line => line.trim() >= "");
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

}