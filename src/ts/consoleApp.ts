export function consoleApp ( callBack: (input: string ) => void ) {

    let input = '';

    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    
    process.stdin.on ('data', function (part) {
        input += part
    })
    
    process.stdin.on ('end', function () {
        callBack(input);
    })
}

