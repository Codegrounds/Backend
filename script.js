// const fs = require('fs')

// const data = fs.readFileSync('text.txt')
// console.log(data.toString().split("\n").join("\\n"))

function main() {
	// Assign integerValue to the integer 5
	let integerValue = 5

	// Assign stringValue to the value 'Hello World'
	let stringValue = 'Hello World'

	// Assign booleanValue to return true
	let booleanValue = true

	// Write an if statement that checks if integerValue is greater than 3.
	// If integerValue is greater than 3, set doubleValue to 3.6
	
	let doubleValue; // don't touch this line
	
	if (integerValue > 3) {
		doubleValue = 3.6
	}

	return {
		integerValue,
		stringValue,
		booleanValue,
		doubleValue
	}
}

console.log(`${main().integerValue} - ${main().stringValue} - ${main().booleanValue} - ${main().doubleValue}`)
