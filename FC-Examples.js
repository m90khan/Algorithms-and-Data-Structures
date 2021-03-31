// Frequency Counter - sameFrequency
// Write a function called sameFrequency. Given two positive integers,
// find out if the two numbers have the same frequency of digits.

// Your solution MUST have the following complexities: Time: O(N)
function sameFrequency(num1, num2) {
  let strNum1 = num1.toString();
  let strNum2 = num2.toString();
  if (strNum1.length !== strNum2.length) return false;

  let countNum1 = {};
  let countNum2 = {};

  for (let i = 0; i < strNum1.length; i++) {
    countNum1[strNum1[i]] = (countNum1[strNum1[i]] || 0) + 1;
  }

  for (let j = 0; j < strNum1.length; j++) {
    countNum2[strNum2[j]] = (countNum2[strNum2[j]] || 0) + 1;
  }

  for (let key in countNum1) {
    if (countNum1[key] !== countNum2[key]) return false;
  }

  return true;
}

function sameFrequency(num1, num2) {
  const str1 = `${num1}`;
  const str2 = `${num2}`;

  if (str1.length !== str2.length) return false;

  const obj = {};

  for (const char of str1) {
    obj[char] = ++obj[char] || 1;
  }

  for (const char of str2) {
    if (!obj[char]) return false;
    obj[char]--;
  }

  return true;
}

console.log(sameFrequency(34, 14)); // false
console.log(sameFrequency(3589578, 5879385)); // true
// Frequency Counter - areThereDuplicates
// Implement a function called areThereDuplicates which accepts a variable number of arguments,
// and checks whether there are any duplicates among the arguments passed in.

// Restrictions: Time Complexity - O(n), Space Complexity - O(n)
function areThereDuplicates(...args) {
  if (!args.length) return false;

  const lookup = {};

  for (const item of args) {
    if (lookup[item]) return true;
    lookup[item] = 1;
  }

  return false;
}

console.log(areThereDuplicates(1, 2, 3)); // false
console.log(areThereDuplicates('a', 'b', 'c', 'a')); // true

function areThereDuplicates() {
  let collection = {};
  for (let val in arguments) {
    collection[arguments[val]] = (collection[arguments[val]] || 0) + 1;
  }
  for (let key in collection) {
    if (collection[key] > 1) return true;
  }
  return false;
}

// Frequency Counter - constructNote
// Write a function called constructNote, which accepts two strings, a message and some letters.
// The function should return true if the message can be built with the letters
// that you are given, or it should return false.
// Assume that there are only lowercase letters and no space or
// special characters in both the message and the letters.

// Bonus Constraints:
// If M is the length of message and N is the length of letters:
// Time Complexity: O(M+N)
// Space Complexity: O(N)

function constructNote(message, letters) {
  const obj = {};

  for (const char of letters) {
    obj[char] = ++obj[char] || 1;
  }

  for (const char of message) {
    if (!obj[char]) return false;
    obj[char]--;
  }

  return true;
}

console.log(constructNote('aa', 'abc')); // false
console.log(constructNote('abc', 'dcba')); // true
console.log(constructNote('aabbcc', 'bcabcaddff')); // true
console.log(constructNote('aabbcc', 'bc')); // false
// Frequency Counter - findAllDuplicates
// Given an array of positive integers, some elements appear twice and others appear once.
// Find all the elements that appear twice in this array.
// Note that you can return the elements in any order.

// Time Complexity - O(n)

function findAllDuplicates(arr) {
  const obj = {};
  const resultArr = [];

  for (const item of arr) {
    obj[item] = ++obj[item] || 1;
    if (obj[item] > 1) resultArr.push(item);
  }

  return resultArr;
}

console.log(findAllDuplicates([4, 3, 2, 1, 0])); // []
console.log(findAllDuplicates([4, 3, 2, 1, 0, 1, 2, 3])); // array with 3, 2 and 1

// Frequency Counter - findPair
// Given an unsorted array and a number n, find if there exists a pair of elements
// in the array whose difference is n. This function should return true
// if the pair exists or false if it does not.

// Solve this with the following requirements:
// Time Complexity - O(n)
// Space Complexity - O(n)

function findPair(arr, num) {
  const obj = {};

  for (const item of arr) {
    if (obj[item - num] || obj[item + num]) return true;
    obj[item] = item;
  }

  return false;
}

console.log(findPair([6, 1, 4, 10, 2, 4], 2)); // true
console.log(findPair([8, 6, 2, 4, 1, 0, 2, 5, 13], 1)); // true
console.log(findPair([4, -2, 3, 10], -6)); // true
console.log(findPair([6, 1, 4, 10, 2, 4], 22)); // false
console.log(findPair([], 0)); // false
console.log(findPair([5, 5], 0)); // true
console.log(findPair([-4, 4], -8)); // true
console.log(findPair([-4, 4], 8)); // true
console.log(findPair([1, 3, 4, 6], -2)); // true
console.log(findPair([0, 1, 3, 4, 6], -2)); // true
