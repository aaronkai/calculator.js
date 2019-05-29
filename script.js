function add(a, b) {
	return parseFloat(a) + parseFloat(b);
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

var equalButtonPressed = false;

function evaluateExpression(operator, operation, array) {
	for (i = 0; i < array.length; i++) {
		if (array[i] === operator) {
			var match = array.splice(i - 1, 3);
			var result = operation(match[0], match[2]);
			if (array.length === 0) {
				array[0] = result
			} else {
				array.splice(i - 1, 0, result);
				i = 0; //resets to beginning of array in case there are two operators of the same type
			}
		}
	}
	return array;
}

//Global variables
const buttons = document.querySelectorAll('button');
var displayText = "";
var displayOutput = document.querySelector('#display p');
var theMath = [];
var equalButtonPressed = false;

//Get each button and create event listeners for each
buttons.forEach((button) => {
	button.addEventListener('click', (e) => {
		const userInput = (e.target.textContent);
		if ((equalButtonPressed) && (!isNaN(userInput))) {
			//if the user presses a number after performing a computation and pressing equal, they are starting a new calculation at this point
			//so clear out display and theMath
			equalButtonPressed = false;
			theMath = [];
			displayText = "";
		}

		// 		displayText += e.target.textContent;
		// 		displayOutput.textContent = displayText;

		//Determine if the user pressed a number
		//if user presses number 
		if (!isNaN(userInput) || userInput === ".") {
			displayText += e.target.textContent;
			displayOutput.textContent = displayText;
			//if the math array is empty, create the first value in the array
			if (theMath === undefined || theMath.length === 0) {
				theMath.push(userInput);
			}
			//if the math array is not empty
			else {
				//if last item in math array was a number, add user input to it
				if (!isNaN(theMath[theMath.length - 1])) {
					var firstHalf = theMath.pop();
					var secondHalf = userInput;
					var combinedNumber = firstHalf + secondHalf;
					theMath.push(combinedNumber);
				}
				//if the last number in the math array was not a number, create a new array item 
				//if the user has already pressed 'equals' they are continuing the prior operation
				else {
					if (equalButtonPressed) {
						equalButtonPressed = false;
					}
					theMath.push(userInput);
				}
			}
		}
		//if the equal button is pressed, return an answer
		else if (userInput === "=") {
			displayText += e.target.textContent;
			displayOutput.textContent = displayText;
			equalButtonPressed = true;
			theMath = evaluateExpression("/", divide, theMath);
			theMath = evaluateExpression("X", multiply, theMath);
			theMath = evaluateExpression("-", subtract, theMath);
			theMath = evaluateExpression("+", add, theMath);
			displayOutput.textContent = theMath[0];
			displayText = theMath[0];
		} else if (userInput === "C") {
			equalButtonPressed = false;
			theMath = [];
			displayText = "";
			displayOutput.textContent = displayText;
		} else if (userInput === "del") {
			var stringToBackspace = theMath.pop();
			theMath.push(stringToBackspace.substring(0, stringToBackspace.length - 1));
			displayText = displayText.substring(0, displayText.length - 1);
			displayOutput.textContent = displayText;
		}
		//if a non-number in entered, create a new array item
		else {
			displayText += e.target.textContent;
			displayOutput.textContent = displayText;
			if (equalButtonPressed) {
				equalButtonPressed = false;
			}
			theMath.push(userInput);
		}
	});
});