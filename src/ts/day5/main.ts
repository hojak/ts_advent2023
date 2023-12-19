import { consoleApp } from "../consoleApp";
import {Almanach} from "./almanach";

consoleApp (input => {
    console.log ( "lowest location number for input almanach (with input as normal seeds): ");
    console.log ( new Almanach(input).getLowestLocationNumber());

    console.log ( "lowest location number for input almanach (with input as ranges): ");
    console.log ( "start: " + new Date());
    console.log ( new Almanach(input).getLowestLocationNumberForRanges());
    console.log ( "end: " + new Date());
    
})