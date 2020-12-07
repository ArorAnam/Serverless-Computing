This assignment follows on from the last lab where you are asked to develop a Lambda function that can
be invoked from any browser around the world coming in through AWS’s API Gateway.

In this assignment, you will create such a function that will respond to requests like:

https://264ej4vqje.execute-api.us-east-1.amazonaws.com/default/myfirstfunc

The purpose of your function is to monitor how often it is called. Each request should be logged in a
state variable as it come in. The response to the request should be a JSON object of the form

{ThisInvocation: "2020-12-02T12:50:42.456Z",
 TimeSinceLast : “20”,
 TotalInvocationsOnThisContainer : “5”,
 AverageGapBetweenInvocations : “20”}

The function should also respond to a URL of the form

https://264ej4vqje.execute-api.us-east-1.amazonaws.com/default/myfirstfunc?cmd=RESET

which should reset the state of the function and have it return something like:

{ThisInvocation: "2020-12-02T12:55:42.456Z"} 
