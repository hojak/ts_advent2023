import { consoleApp } from "../consoleApp";
import { ListOfWorkflows, evaluateParts } from "./listOfWorkflows";
import { RangeOfParts } from "./rangeOfParts";

consoleApp (input => {
    console.log ( "working on pile of parts...")

    let workflows, parts : string;
    [workflows, parts] =  input.split ( "\n\n", 2);

    let listOfWorkflows = new ListOfWorkflows ( workflows);
    let acceptedParts = listOfWorkflows.getAcceptedPartsOfInput(parts);

    console.log ( evaluateParts(acceptedParts) );

    console.log ( "Values ranges for accepted parts:")
    const acceptedRanges = listOfWorkflows.getAcceptedRanges(RangeOfParts.standardRange());
    console.log ( acceptedRanges);
    console.log ( "Number of different possibly accepted parts:" );
    console.log(acceptedRanges.map(range => range.size).reduce ( (prev,curr) => prev+curr));
})