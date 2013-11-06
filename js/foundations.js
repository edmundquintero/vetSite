// Event Listeners

$(function(){

$('.example_link').click(function(){
  // store the reference
  var funct = $(this).attr('ref');
  // set reference as a function name creat function
  var caller = window[funct];
  // call newly created function by name
  caller();

});

});

// Exmaple Functions to call

chapt2 = function() {
  alert("Hello, world");
};

chapt3 = function(){
  var a = 5;
  var b = 10;
  var c = 20;
  a ++ ;
  b--;
  c += 10;
  var x = true;
  var z = false;
  var name = prompt("What is your name?");
  var message = "Hello, ";
  alert(message + name);
};

chapt4_1 = function(){
  var a = 123;
var b = "123";

// equality check
if ( a == b ) {
   alert("Yes, they ARE equal");
} else {
   alert("No, they're NOT equal");
}
};

chapt4_2 = function(){
  var a = 5;
  var b = 10;

  if ( a < b ) {
     alert("Yes, a is less than b");
  }

  if ( a == b ) {
     alert("Yes, a is equal to b");
  }
};
chapt4_3 = function(){
  var grade = "Premium";

  if ( grade === "Regular") {
       alert("It's $3.15");
  }
  if ( grade === "Premium") {
       alert("It's $3.35");
  }
  if ( grade === "Diesel") {
       alert("It's $3.47");
  }
};
chapt5_1 = function(){
  var a = 5;
  var b = 10;
  var c = 20;
  var d = a + b + c;
  alert("The value of d is: " + d );
};
chapt5_2 = function(){
  function addTwoNumbers() {
    var a = 5;
    var b = 10;
    var result = a + b;
    alert(result);
  }

  addTwoNumbers();
};
chapt8 = function(){
  var myArray = [500,500,500,500,500];

  var total = 0;

  for ( var i = 0 ; i < myArray.length ; i++ ) {
      // add the current element to the total 
      total = total + myArray[i];
  }

  // after we're done with the loop
  alert("The total is: " + total);

};
chapt10 = function(){
  var headline = document.getElementById("mainHeading");
  headline.innerHTML = "Wow! A new headline!";
};

chapt11_1 = function(){
    // define several functions
  function firstFunction() {
      var a = 5;
      var b = 10;
      secondFunction();
      var c = a + b;
  }
  function secondFunction() {
      var message;
      message = "Hello";
      thirdFunction();
  }
  function thirdFunction() {
      var i = 0;
      var total = 0;

      while ( i < 100 ) {
          total = total + 100;
          i++;
      }
    
      fourthFunction();
  }
  function fourthFunction() {
      $('#mainHeading').html("You clicked the headline!");
  }

  // grab the headline element
      firstFunction();


};
chapt11_2 = function(){
    // define several functions
  function firstFunction() {
      secondFunction();
  }
  function secondFunction() {
      thirdFunction();
  }
  function thirdFunction() {
      fourthFunction();
  }
  function fourthFunction() {
      $('#mainHeading').html("You clicked the headline!");
  }

  firstFunction();
};