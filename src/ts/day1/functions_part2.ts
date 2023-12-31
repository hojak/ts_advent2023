const digitNamesToValues = new Map<string, number>( [
    ["one", 1],
    ["two", 2],
    ["three", 3],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["seven", 7],
    ["eight", 8],
    ["nine", 9],
    ["0", 0],
    ["1", 1],
    ["2", 2],
    ["3", 3],
    ["4", 4],
    ["5", 5],
    ["6", 6],
    ["7", 7],
    ["8", 8],
    ["9", 9]
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
        let matchedValue = findMatchingValueForStartposition ( line, startIndex);
        if ( matchedValue != null) {
            return matchedValue;
        }
        startIndex ++;
    }

    throw new Error ( "input does not contain digit");    
}

function findFirstRightDigit ( line: string ) : number {
    let startIndex = line.length-1;
    while (startIndex >= 0 ) {
        let matchedValue = findMatchingValueForStartposition(line, startIndex);
        if ( matchedValue != null) {
            return matchedValue;
        }
        startIndex --;
    }

    throw new Error ( "input does not contain digit");    
}

function findMatchingValueForStartposition(line: string, startIndex: number ) : number | null {
    let match = digitMatcher .exec(line.substring(startIndex));

    if ( match != null ) {
        return digitNamesToValues.get(match[0]) ?? 0;
    }

    return null;
}

