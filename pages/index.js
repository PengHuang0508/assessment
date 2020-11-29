const Assessment = ({}) => {
	/**
	 * #1. Compare two objects to determine if the first one contains property values in the second one; for example, `person3` below is contained in `person1` below and so should be `true`, while `person3` is not contained in `person2`
	 */

	const step1 = () => {
		/*
		Hi Peng,

		Sorry, may not have been clear enough. #1 checks if all key/values of `firstObj` are contained in `secondObj`. So the first to logs should be `false`, while the last log should be `true`. Whichever direction you’re using, though, your answer to #1 below comes out as `false`, `false`, and `false` (instead of `true` for the third log).

		I’ve included a simpler solution as follows. It’s much simpler — in code, the simpler and more concise, the better. This alternative solution is only 3 lines.
	 */

		const alternativeMatches = ({ firstObj, secondObj }) =>
			Object.keys(firstObj).every(x =>
				Object.keys(secondObj).some(y => x === y && firstObj[x] === secondObj[y])
			)

		// From my understanding, matches() checks if firstOjb contains secondObj
		// Sorry, I may misunderstood the direction of the question

		// Overall: O(l2), l = number of properties of the second object
		const matches = ({ firstObj, secondObj }) => {
			// if it's the opposite direction, change it to:
			// for (property in firstObj) {
			// 	if (!secondObj.hasOwnProperty(property)) {
			for (let property in secondObj) {
				// O(l), l = number of properties of the object
				if (!firstObj.hasOwnProperty(property)) {
					// O(1)
					return false
				}

				if (firstObj[property] !== secondObj[property]) {
					// O(1)
					return false
				}
			}

			return true
		}

		const person1 = { age: 25, hair: 'long', beard: true }
		const person2 = { age: 26, hair: 'short', beard: true }
		const person3 = { hair: 'long', beard: true }

		console.log(matches({ firstObj: person1, secondObj: person2 }))
		console.log(matches({ firstObj: person2, secondObj: person3 }))
		console.log(matches({ firstObj: person3, secondObj: person1 }))
	}

	step1()

	/**
	 * #2. Filter out the specified values from a specified array. Return the original array without the filtered values.
	 */

	const step2 = () => {
		/*
		While your solution below is correct, again it’s better to make it simpler. See as follows. Only 2 lines!
		*/

		// More concise alternative
		const alternativeRemove = ({ array, values }) =>
			array.filter(x => !values.some(y => x === y))

		// Overall: O(n + v); n = length of the array, v = length of the values
		const remove = ({ array, values }) => {
			const valueSet = new Set(values) // O(v),

			const swapWithLast = i => {
				const lastArrayValue = array[array.length - 1]

				array[array.length - 1] = array[i]
				array[i] = lastArrayValue

				return
			}

			// O(n)
			let i = 0
			while (i < array.length) {
				if (valueSet.has(array[i])) {
					swapWithLast(i)
					array.pop() // O(1)
				} else {
					i++
				}
			}

			return array
		}
		const values = ['e', 'h', 'z']
		const array1 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
		const array2 = ['l', 'o', 'g', 'q', 'z', 'f', 'j', 'r']

		console.log(remove({ array: array1, values }))
		console.log(remove({ array: array2, values }))
	}

	step2()

	/**
	 * #3. Write a function to generate a random hexadecimal color code.
	 */
	// References:
	//	https://www.pluralsight.com/blog/tutorials/understanding-hexadecimal-colors-simple#:~:text=Hex%20color%20codes%20start%20with,0%20to%20255%20in%20RGB).
	//	https://www.developintelligence.com/blog/2017/02/rgb-to-hex-understanding-the-major-web-color-codes/#:~:text=First%20Value,code%20is%2012%2C%20or%20C.
	const step3 = () => {
		const hex = () => {
			// Method 1:
			// const hexValues = [
			// 	'0',
			// 	'1',
			// 	'2',
			// 	'3',
			// 	'4',
			// 	'5',
			// 	'6',
			// 	'7',
			// 	'8',
			// 	'9',
			// 	'A',
			// 	'B',
			// 	'C',
			// 	'D',
			// 	'E',
			// 	'F'
			// ]
			// let hexResult = '#'

			// for (let i = 0; i < 3; i++) {
			// 	const randomRGB = Math.floor(Math.random() * 255)
			// 	const hexValue = randomRGB / 16
			// 	const firstValue = Math.floor(hexValue)
			// 	const secondValue = (hexValue - firstValue) * 16

			// 	hexResult = hexResult.concat(hexValues[firstValue], hexValues[secondValue])
			// }

			// return hexResult

			// Method 2

			/* Excellent work */

			const numberOfHexDigits = 6
			let hexString = ['#']

			for (let i = 0; i < numberOfHexDigits; i++) {
				const randomRGB = Math.floor(Math.random() * 16)

				hexString.push(randomRGB.toString(16)) // O(1)
			}

			return hexString.join('') // O(n)
		}

		console.log(hex())
	}

	step3()

	/**
	 * #4. Write a function to implement the Luhn Algorithm used to validate a variety of identification numbers, such as credit card numbers, IMEI numbers, National Provider Identifier numbers etc.
	 */
	// References:
	// https://www.youtube.com/watch?v=PNXXqzU4YnM

	const step4 = () => {
		/* Excellent work! Well done! */

		// Overall: O(n)
		const luhn = input => {
			// Sanitize the input
			input = input.toString().replace(/\D+/g, '')
			let sum = 0

			for (let i = 0; i < input.length; i++) {
				// O(n)
				let value = Number(input[i])

				// Multiplication Order: 1 2 1 2 1 2 ...
				// Checking if it's even digit
				if (i % 2 == 0) {
					value *= 2
				}

				// if the value has 2 digits, add first digit to second digit
				// eg: 15 = 1 + 5 = 6
				// OR
				// value minus 9
				// eg:	15 - 9 = 6
				if (value > 9) {
					value -= 9
				}

				sum += value
			}

			// Check if the last digit of the sum is 0
			return sum % 10 === 0
		}

		console.log(luhn('5221320000307276'))
		console.log(luhn(6011329933655299))
		console.log(luhn(123456789))
		console.log(luhn('4242 4242 4242 4242'))
	}

	step4()

	return <h1>Open developer console to read logs.</h1>
}

/* This was intentionally left like this so you can run and test the app via NextJS, see package.json */

// Assessment({})
export default Assessment
