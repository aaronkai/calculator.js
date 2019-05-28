function add(a, b) {
	return parseInt(a) + parseInt(b);
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
}

function divide(a, b) {
	return a / b;
}

function operate(operator, number1, number2) {
	var answer = "";
	switch (operator) {
		case "+":
			answer = add(number1, number2);
			break;
		case "-":
			answer = subtract(number1, number2);
			break;
		case "X":
			answer = multiply(number1, number2);
			break;
		case "/":
			answer = divide(number1, number2);
			break;
		default:
			answer = "ERR";
			break;
	}
	return answer;
}

function processArray(operator, operation, array) {
	for (i=0; i < array.length; i++) {
		if (array[i] === operator){
			var match = array.splice(i-1, 3);
			console.log("match is :"+match);
			var result = operation(match[0], match[2]);
			console.log("result is: "+result);
			if (array.length === 0){
				array[0] = result
			}
			else{
				array.splice(i-1, 0, result);
				i = 0; //resets to beginning of array in case there are two operators of the same type
			}
			console.log(array);
		}
	}
	return array;
}

const buttons = document.querySelectorAll('button');
var displayText = "";
theMath = [];
var displayOutput = document.querySelector('#display p');
var equalButtonPressed = false;

buttons.forEach((button) => {
	button.addEventListener('click', (e) => {
		const userInput = (e.target.textContent);
		if ((equalButtonPressed) && (!isNaN(userInput))){
				//if the user presses a number after performing a computation and pressing equal, they are starting a new calculation at this point
				//so clear out display and theMath
					equalButtonPressed = false;
					theMath=[];
					displayText = "";
		}
		
		displayText += e.target.textContent;
		displayOutput.textContent = displayText;

		//Determine if the user pressed a number
		//if user presses number 
		if (!isNaN(userInput)) {
			console.log(" a number");
			//if the math array is empty, create the first value in the array
			if (theMath === undefined || theMath.length === 0) {
				console.log("The Math was empty. Adding input")
				theMath.push(userInput);
			}
			//if the math array is not empty
			else {
				console.log("The last item in the Math array is :" + theMath[theMath.length - 1]);
				//if last item in math array was a number, add user input to it
				if (!isNaN(theMath[theMath.length - 1])) {
					var firstHalf = theMath.pop();
					var secondHalf = userInput;
					var combinedNumber = firstHalf + secondHalf;
					theMath.push(combinedNumber);
				}
				//if the last number in the math array was not a number, create a new array item 
				else {
					if(equalButtonPressed){
						equalButtonPressed = false;
					}
					theMath.push(userInput);
				}
			}	
		}
		//if the equal button is pressed, return an answer
		else if (userInput === "=") {
			var finalAnswer;
			equalButtonPressed = true;
			theMath = processArray("/",divide, theMath);
			theMath = processArray("X",multiply, theMath);
			theMath = processArray("-",subtract, theMath);
			theMath = processArray("+",add, theMath);
			console.log(theMath);
			displayOutput.textContent = theMath[0];
			displayText = theMath[0];
		}
		//if a non-number in entered, create a new array item
		else{
				if(equalButtonPressed){
					equalButtonPressed = false;
				}
				theMath.push(userInput);
			}
	console.log("The Math Array at the end of the loop is : " + theMath);
	});
});
