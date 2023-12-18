const digitNamesToValues = new Map<string, number>( [
    ["one", 1]
]);

const digitMatcher = new RegExp ("^("+ [ ... digitNamesToValues.keys() ].join("|") + ")", "i");

export function calibrate ( input: string ) : number {
    if ( input == "" ) {
        return 0;
    }
    
    return input
        .split("\n")
        .map ( line => findCalibrationValue (line))
        .reduce ( (prev, current, index ) => prev + current )
}


export function findCalibrationValue (line: string) : number {
    let leftDigit = findFirstLeftDigit ( line );
    let rightDigit = findFirstRightDigit ( line );

    return leftDigit * 10 + rightDigit;
}

function findFirstLeftDigit ( line: string ) : number {
    let startIndex = 0;
    while (startIndex < line.length ) {
        let match = digitMatcher .exec(line.substring(startIndex));

        if ( match != null ) {
            return digitNamesToValues.get(match[0]) ?? 0;
        }

        if ( "0123456789".includes ( line[startIndex] ) ) {
            return getValueOfMatchedString(line[startIndex]);
        }
        startIndex ++;
    }

    throw new Error ( "input does not contain digit");    
}

function getValueOfMatchedString(matchingString: string): number {
    return Number(matchingString);
}

function findFirstRightDigit ( line: string ) : number {
    let startIndex = line.length-1;
    while (startIndex >= 0 ) {
        if ( "0123456789".includes ( line[startIndex] ) ) {
            return getValueOfMatchedString (line[startIndex]);
        }
        startIndex --;
    }

    throw new Error ( "input does not contain digit");    
}

