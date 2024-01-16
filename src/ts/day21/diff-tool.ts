import { consoleApp } from "../consoleApp";

consoleApp (input => {

    let lastNumber : number = 0;
    for ( let line of input.split("\n")) {
        let [f, fx] = line.split(";");

        console.log ( line + ";" + (Number(fx)-lastNumber));
        lastNumber = Number(fx);
    }
})