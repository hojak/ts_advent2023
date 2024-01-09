import { consoleApp } from "../consoleApp";

consoleApp (input => {
    let modulo = 131;

    let counter = 1;

    let outputLine = "";
    for ( let i=0;i<modulo;i++) {
        outputLine += ";" + i;
    }
    console.log ( outputLine );

    outputLine = "0";

    for ( let inputLine of input.split("\n")) {
        let [f, fx, diff] = inputLine.split(";");

        outputLine = outputLine + ";" + diff;
        
        if( counter % modulo == 0 ) {
            console.log ( outputLine );
            outputLine = ""+(Math.floor ( counter / modulo));
        }
        counter ++;
    }

    console.log ( outputLine );
})