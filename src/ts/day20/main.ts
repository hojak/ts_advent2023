import { consoleApp } from "../consoleApp";
import { ModuleConfiguration } from "./moduleConfiguration";

consoleApp (input => {
    console.log ( "working on module configuration");

    let moduleConfiguration = new ModuleConfiguration ( input );

    let sumOfHigh = 0;
    let sumOfLow = 0;
    for ( let i=0; i<1000; i++ ) {
        let [low, high ] = moduleConfiguration.pushTheButton();
        sumOfHigh += high;
        sumOfLow += low;
    }
    
    console.log ( "Processed Low Signals: " + sumOfLow);
    console.log ( "Processed High Signale: " + sumOfHigh);
    console.log ( "Result: "+ (sumOfHigh *sumOfLow));
})