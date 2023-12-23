import { consoleApp } from "../consoleApp";
import { checksum } from "./hash";

consoleApp (input => {
    console.log ( "computing checksum");
    console.log ( checksum(input));
})