import { ListOfAreas } from "./listOfAreas";
import { consoleApp } from "../consoleApp";


consoleApp (input => {
    console.log ( "rating input");
    console.log ( new ListOfAreas (input).getRate());
    console.log ( "rating input with flaw");
    console.log ( new ListOfAreas (input).getRateWithOneFlaw());
})