/** Import modular functions that are packaged with Node

    http is needed to instanciate the web server.
    url is needed to parse the incoming string when a 
    request is made to the server.
**/
var http = require("http");
var url = require("url");


// function used to start the server and listen for requests.
function start(route) {

/* onRequest is a function that calls the router 
    based on the incoming request.
*/
  function onRequest(request, response) {

    // Determine the path from the url in the request
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");

    //Pass the path to the router.
    route(pathname);

    // Write the response back to the page.
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }
  // Create the server and have it listen for requests on port :8888
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}
// export the start function for modular use
exports.start = start;