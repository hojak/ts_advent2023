export interface Part {
    x: number,
    m: number,
    a: number,
    s: number
}

export function createPartFromString (description: string): Part {
    let regex = /\{x=([0-9]+),m=([0-9]+),a=([0-9]+),s=([0-9]+)\}/;
    let groups = regex.exec( description );

    if ( groups == undefined ) {
        throw new Error ( description + " is not a part description!");
    }

    return {
        x: Number(groups[1]),
        m: Number(groups[2]),
        a: Number(groups[3]),
        s: Number(groups[4])
    }
}