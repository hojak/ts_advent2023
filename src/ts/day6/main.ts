import { consoleApp } from "../consoleApp";
import { Races } from "./races";


consoleApp (input => {
    console.log ( "rate the races: ");
    console.log ( new Races(input).getRating());
})