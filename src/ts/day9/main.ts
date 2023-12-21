import { consoleApp } from "../consoleApp";
import { sum_of_next_steps, sum_of_prev_steps } from "./next_step";

consoleApp (input => {
    console.log ( "getting sum of steps: ");
    console.log ( "forward: " + sum_of_next_steps(input));
    console.log ( "backwards: " + sum_of_prev_steps(input));
})