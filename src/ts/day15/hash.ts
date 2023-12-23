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