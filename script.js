function add(a, b) {
	return a + b;
}

function subtract(a, b) {
	return a - b;
}

function multiply(a, b) {
	return a * b;
	}

function divide(a,b){
	return a / b;
}

function operate(operator, number1, number2){
	var display = "";
	switch(operator){
		case "+":
			display = add(number1, number2);
			break;
		case "-":
			display = subtract(number1, number2);
			break;
		case "*":
			display = multiply(number1, number2);
			break;
		case "/":
			display = divide(number1, number2);
			break;
		default:
			display = "ERR";
			break;
	}
}