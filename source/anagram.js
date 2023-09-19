'use strict';

/**
 * Deep clones array or string
 * @param {array|string} items - variable to be deep copied
 * @returns {array|string} - a deep copy of items
 */
const clone = (items) => items.map(item => Array.isArray(item) ? clone(item) : item);

/**
 * Checks whether word is string
 * @param {string} word - a word we are checking
 * @returns {boolean} true if word is string, false if not
 */
const isString = (word) => {
    return typeof word === 'string' || word instanceof String;
}

/**
 * Creates an object containing an amount of times each letter is met in a word
 * @param {string} word - string that we count letters in
 * @returns {Object.<string, number>} - object containing letter: number - amount of times letter is found in a word
 * @throws {TypeError} argument must be string
 */
function countLetters(wordInput) {
    if (!isString(wordInput)) {
        throw new TypeError('word must be string');
    }

    const word = wordInput.toLowerCase();
    const letterCount = {};
    for (let i = 0; i < word?.length; i++) {
        letterCount[word[i]] = letterCount[word[i]] + 1 || 1;
    }

    return letterCount;
}

/**
 * Checks whether given words are anagrams
 * @param {?string} firstWord - first word
 * @param {?string} secondWord - second word
 * @returns {boolean} - true of word is an anagram, false otherwise
 * @throws {TypeError} both arguments must be strings
 */
function areAnagrams(firstWord, secondWord) {
    if (!firstWord || !secondWord) {
        return false;
    }
    if (!isString(firstWord) || !isString(secondWord)) {
        throw new TypeError('word must be string');
    }
    if (firstWord?.length !== secondWord?.length) {
        return false;
    }

    const letterCountFirst = countLetters(firstWord);
    const letterCountSecond = countLetters(secondWord);
    let res = true;

    Object.entries(letterCountFirst).forEach(([key, value]) => {
        if (value != letterCountSecond[key]) {
            res = false;
        }
      });

    return res;
}


/**
 * Groups anagrams into arrays and returns an array of those groups
 * @param {?Array.<string>} inputWords - array of words to check for anagrams
 * @returns {?Array.<Array.<string>>} - array of anagrams grouped into arrays
 * @throws {TypeError} argument must be a an arrays of strings
 */
function anagram(inputWords) {
    if (inputWords === null)
        return null;

    if (!(Array.isArray(inputWords)
        && inputWords.every((word) => isString(word)))) {
        throw new TypeError('argument must be an array of strings');
    }

    const words = clone(inputWords);
    words.sort();
    const result = [];
    let anagramGroup = [];

    words.forEach((firstWord, i) => {
        words.forEach((secondWord, j) => {

            if (words[j] != null && areAnagrams(words[i], words[j])) {
                anagramGroup.push(words[j]);
                if (anagramGroup.length > 1) {
                    words[j] = null;
                }
            }
        });

        if (anagramGroup.length > 1) {
            result.push(anagramGroup);
        }
        anagramGroup = [];
        words[i] = null;
    });
    return result;
}
