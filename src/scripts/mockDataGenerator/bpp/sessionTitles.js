'use strict'

const titles = []

const subjects = [
	'Accountancy',
	'Agriculture Science',
	'Economics',
	'Environmental Science',
	'General Science',
	'Geography',
	'Sociology',
	'Tourism and Travel Management',
	'Zoology',
]

const languageOptions = ['English', 'Hindi', 'Tamil', 'Telgu']

// Generate 200 more elements similar to the existing format
for (let i = 0; i < 400; i++) {
	const grade = Math.floor(Math.random() * 7) + 6 // Random grade between 1 and 12
	const subjectIndex = Math.floor(Math.random() * subjects.length)
	const subject = subjects[subjectIndex]

	const languageIndex = Math.floor(Math.random() * languageOptions.length)
	const language = languageOptions[languageIndex]

	// You can choose the format you prefer here
	// For example: "Science of Class 9 in English" or "Class 9-Science-English"
	//const newTitle = `Science of Class ${grade} in ${language}`;
	const newTitle = `Class${grade}${subject}${language}OLT`.replace(/ /g, '')

	titles.push(newTitle)
}

console.log(titles.length)
console.log(titles)

function countItems(arr) {
	const countMap = {}

	for (const item of arr) {
		if (countMap[item]) {
			countMap[item]++
		} else {
			countMap[item] = 1
		}
	}

	return countMap
}

const itemCounts = countItems(titles)
console.log(itemCounts)

const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

exports.sessionTitles = shuffleArray(titles)
