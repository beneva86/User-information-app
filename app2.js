// given an array of values, write a function that finds the index of where the value is 
// located, and if nothing is found, returns -1.
// example: for ['apple', 'orange', 'pineapple']
// 'orange' returns '1'
// 'durian' returns '-1'

var fruits= ['apple', 'orange', 'pineapple']

function index(fruits, value){
if (fruits.indexOf(value) > -1) {
	return fruits.indexOf(value);
} else {
	return -1;
}
}

console.log(index(fruits, 'orange'));
console.log(index(fruits, 'kiwi'));


// now, write a function that finds all the indexes of where the value is located and 
// returns them in an array, and if nothing is found, returns -1
// example: ['apple', 'orange', 'orange', 'pineapple']
// 'orange' returns [1,2]

var arrayForResults = [];
var array = ['apple', 'orange', 'orange', 'pineapple'];
var element = 'orange';

var results = array.indexOf(element);

while (results != -1) {
  arrayForResults.push(results);
  results = array.indexOf(element, results + 1);
}

console.log(arrayForResults);
