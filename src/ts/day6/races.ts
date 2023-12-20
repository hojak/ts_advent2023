export class Races {
    times: number[];
    records: number[];

    constructor ( input: string ) {
        let lines = input.split("\n");

        this.times = (lines[0].trim().split (":"))[1].split(" ").filter ( s => s!= "").map ( part => Number ( part));
        this.records = (lines[1].trim().split (":"))[1].split(" ").filter(s => s != "").map ( part => Number ( part));

        console.log(this);
    }

    getWinningPossibilitiesOfRace(raceNumber: number): number {
        let t = this.times[raceNumber];
        let s = this.records[raceNumber];

        let sqrt = Math.sqrt ( t*t / 4.0 - s);

        let correctionForEqualDistance = ( sqrt-Math.floor(sqrt) < 0.00000001 ) ? 2 : 0;

        return Math.floor(t/2+sqrt) - Math.ceil(t/2-sqrt) +1 - correctionForEqualDistance;
    }

    getRating(): any {
        let result = 1;
        for ( let i=0; i<this.times.length; i++) {
            result *= this.getWinningPossibilitiesOfRace(i);
        }
        return result;
    }

}