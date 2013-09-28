/**
  The route function takes 1 parameter "pathname".

  pathname is the url in the HTTP request passed in 
  from the sart function in server.js

**/
function route(pathname) {
  // logs the current URL
  console.log("About to route a request for " + pathname);
}

// export the function for modular use
exports.route = route;