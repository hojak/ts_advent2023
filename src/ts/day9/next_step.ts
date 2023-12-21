import { transpileModule } from "typescript";

export function next_step ( sequence : number[] ): number {
    if ( sequence.length == 0 ) {
        return 0;
    } else if ( sequence.length == 1 ) {
        return sequence[0];
    }

    let diffs : number[] = [];
    for ( let i=1; i<sequence.length; i++ ) {
        diffs.push(sequence[i]-sequence[i-1]);
    }

    return sequence[sequence.length-1] + next_step(diffs);
}


export function sum_of_next_steps ( input: string ) : number {
    return input.split("\n").filter(line => line.trim() >= "")
        .map ( line => line.split(" ").filter ( part => part.trim() != "").map ( part => Number(part)))
        .map ( sequence => next_step(sequence ))
        .reduce ( (prev, curr, index) => prev+curr);
}