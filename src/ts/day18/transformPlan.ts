
export function transformPlan ( input : string ) {
    let result = "";

    for ( let line of input.split("\n") ) {
        if (line.trim() == "" ) {
            continue;
        }

        let hex = line.substring ( line.indexOf("#")+1, line.indexOf(")"));

        let direction = directionFromNumber ( hex[hex.length-1]);

        let steps = hexToNumber ( hex.substring(0, hex.length-1) );

        result += direction + " " + steps + "\n";
    }

    // remove trailing "\n"
    result = result.substring(0, result.length-1);

    return result;
}

function directionFromNumber(arg0: string) : string {
    switch ( arg0 ) {
        case "0": return "R";
        case "1": return "D";
        case "2": return "L";
        case "3": return "U";
    }
    return "";
}

export function hexToNumber(arg0: string) : number {
    let result = 0;
    
    for ( let place = 0; place<=arg0.length-1; place ++ ) {
        result +=Math.pow(16, place)* valueOfHexChar(arg0.charAt(arg0.length-1-place));
    }
    
    return result;
}

function valueOfHexChar(arg0: string) : number{
    switch ( arg0 ) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
            return Number ( arg0 );

        case "a":
            return 10;
        case "b":
            return 11;
        case "c":
            return 12;
        case "d":
            return 13;
        case "e":
            return 14;
        case "f":
            return 15;

        default:
            return 0;
    }

}

