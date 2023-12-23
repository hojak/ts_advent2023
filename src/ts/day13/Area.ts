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


}