export function hash ( input: string ) : number {
    let result = 0;
    for ( let char of input ) {
        let ascii = char.charCodeAt(0);
        result += ascii;
        result *= 17;
        result %= 256;
    }
    return result;
}


export function checksum ( input: string ) : number {
    return input.split (",").filter( str => str.trim() != "").map ( part => hash (part)).reduce ( (prev, curr, index) => prev+curr, 0);
}