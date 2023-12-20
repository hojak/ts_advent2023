export class SingleMap {
    destinationStart: number;
    sourceStart: number;
    length: number;

    constructor ( sourceStart: number, destinationStart: number, length: number ) {
        this.sourceStart = sourceStart;
        this.destinationStart = destinationStart;
        this.length = length;
    }

    getSourceStart() : number {
        return this.sourceStart;
    }

    map(source: number): number {
        if ( ! this.isCovered ( source )) {
            throw new Error("out of bounds");
        }

        return this.destinationStart + ( source - this.sourceStart);
    }

    isCovered(source: number): boolean {
        return source >= this.sourceStart && source <= this.sourceStart + this.length-1
    }

    getSourceEnd(): number {
        return this.sourceStart + this.length -1;
    }

    static createFromString(representation: string): any {
        let splitted = representation.split(" ");
        return new SingleMap ( 
            Number(splitted[1].trim()),
            Number(splitted[0].trim()),
            Number(splitted[2].trim())
        )
    }
}