/*
    Author: Naman Arora
    Date  : 03/12/2020
*/

// initialize global variables
let currentDate = null;
let lastDate = null;
let timeSinceLast = 0;
let totalInvocations = 0;
let averageGap = 0;
let totalGaps = 0;

// initialize global response
let response_json = {
    ThisInvocation: "",
    TimeSinceLast: "",
    TotalInvocationsOnThisContainer: "",
    AverageGapBetweenInvocations: ""
};

exports.handler = async (event) => {
    // initialize current date
    currentDate = new Date();
    
    try {
        // check if reset called
        // do things accordingly
        if (event.queryStringParameters["cmd"] == "RESET") {
            // change response
            response_json = {
                ThisInvocation: ""
            };
            // reset others
            lastDate = currentDate;
            timeSinceLast = 0;
            totalInvocations = 0;
            totalGaps = 0;
        }
    }
    // if not reset
    catch(err) {
        if (totalInvocations == 0) {
            // if this isthe first call set last date to first only
            lastDate = currentDate;
        }
        
        // calculate all parameters
        timeSinceLast = (currentDate.getTime() - lastDate.getTime()) / 1000;
        totalGaps += timeSinceLast;
        totalInvocations++;
        averageGap = totalGaps / totalInvocations;
        lastDate = currentDate;
        
        
        
        // set the response
        response_json.TimeSinceLast = timeSinceLast.toFixed(2);
        response_json.TotalInvocationsOnThisContainer = totalInvocations;
        response_json.AverageGapBetweenInvocations = averageGap.toFixed(2);
    }
    
    // only this will be returned if reset
    response_json.ThisInvocation = currentDate;
    
    // set the JSON response
    const response = {
        body: JSON.stringify(response_json)
    };
    
    return response;
};