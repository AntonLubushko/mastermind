'use strict';
// Sets array of all 1296 proper numbers
const SET = Array.from({length: 5666}, (v, k) => String(k + 1001)).filter(number => /^[1-6]{4}$/.test(number));

// Refreshes a set of possible numbers
function getNewNumberSet(set, guessNumber, code) {
    return set.filter(number => getCodebreakerAnswer(number, guessNumber) === code);
}

function getCodebreakerAnswer(mindNumber, guessNumber) {
    let answer = [0, 0];
    let mindArray = mindNumber.split('');
    let guessArray = guessNumber.split('');
    guessArray.forEach((digit, index) => {
        if (digit === mindArray[index]) {
            answer[0]++;
            mindArray[index] = 'x';
            guessArray[index] = 'x';
        }
    });
    guessArray.forEach((digit, index) => {
        let coincidenceIndex = mindArray.indexOf(digit);
        if (digit !== 'x' && coincidenceIndex !== -1) {
            answer[1]++;
            mindArray[coincidenceIndex] = 'x';
            guessArray[index] = 'x';
        }
    });
    return answer.join('');
}
/**
 *
 * @param mindNumber - a number that codemaker conceived
 * @returns {Array} - an array of codebreaker steps
 *
 */
export function startGuessing(mindNumber) {
    let set = Array.from(SET);
    let steps = [];
    let guessNumber = '3366';
    let attempt = 0;
    while (attempt++ < 10) {
        let code = getCodebreakerAnswer(mindNumber, guessNumber);
        steps.push({
            code: code,
            attempts: attempt,
            guessNumber: guessNumber
        });
        if (code === '40') return steps;
        if (code === '04' && guessNumber[0] === guessNumber[1] && guessNumber[2] === guessNumber[3]) {
            steps[steps.length - 1].guessNumber = guessNumber.split('').reverse().join('');
            return steps;
        }
        set = getNewNumberSet(set, guessNumber, code);
        guessNumber = set.length > 9 ? set[9] : set[set.length - 1];
    }
    return steps;
}
// Just for testing, this function prints a quantity of games,
// where number of steps to win exceeded some value (amount)
function printExceeding(amount) {
    let count = SET.reduce((exceed, mindNumber) =>
    exceed + (startGuessing(mindNumber).attempts > amount ? 1 : 0), 0);
    console.log(`Games exceeding ${amount} steps  is `, count);
}
