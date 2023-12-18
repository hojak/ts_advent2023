import { Schematic } from "./schematic";

let input = '';

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on ('data', function (part) {
    input += part
})

process.stdin.on ('end', function () {
    console.log ( "compute sum of missing part numbers:");
    console.log ( new Schematic (input).getSumOfMissingParts() );

    console.log ( "compute sum of gear Ratios:");
    console.log ( new Schematic (input).getSumOfGearRatios() );
})
