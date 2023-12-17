import { calibrate } from "./functions";

let input = '';

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on ('data', function (part) {
    input += part
})

process.stdin.on ('end', function () {
    console.log ("Calibrating on input");
    console.log ( "Calibration value: " + calibrate ( input ));
})