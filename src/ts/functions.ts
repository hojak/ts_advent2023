export function findCalibrationValue (line: string) : number {
    let leftDigit = findFirstLeftDigit ( line );
    let rightDigit = findFirstRightDigit ( line );

    return leftDigit * 10 + rightDigit;
}

function findFirstLeftDigit ( line: string ) : number {
    let index = 0;
    while (index < line.length ) {
        if ( "0123456789".includes ( line[index] ) ) {
            return Number (line[index]);
        }
        index ++;
    }

    throw new Error ( "input does not contain digit");    
}

function findFirstRightDigit ( line: string ) : number {
    let index = line.length-1;
    while (index >= 0 ) {
        if ( "0123456789".includes ( line[index] ) ) {
            return Number (line[index]);
        }
        index --;
    }

    throw new Error ( "input does not contain digit");    
}

