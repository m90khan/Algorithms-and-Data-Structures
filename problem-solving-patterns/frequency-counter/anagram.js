// Frequency Counter - validAnagram
// Given two strings, write a function to determine if the second string is
// an anagram of the first. An anagram is a word, phrase, or name formed
// by rearranging the letters of another, such as cinema, formed from iceman.
// Note: You may assume the string contains only lowercase alphabets.

// Time Complexity - O(n)

function validAnagram(word1, word2) {
  if (word1.length !== word2.length) return false;

  const obj = {};

  for (const char of word1) {
    obj[char] = ++obj[char] || 1;
  }

  for (const char of word2) {
    if (obj[char]) obj[char]--;
    else return false;
  }

  return true;
}

console.log(validAnagram('anagram', 'nagaram')); // true
console.log(validAnagram('rat', 'car')); // false

/*
Example: Given two strings, write a function to determine if the second string is an anagram of the first. 
An anagram is a word, phrase, or name formed by rearranging the letters of another, such as cinema, formed from iceman.
validAnagram('', '') // true
validAnagram('aaz', 'zza') // false
validAnagram('anagram', 'nagaram') // true
validAnagram("rat","car") // false) // false
validAnagram('awesome', 'awesom') // false
validAnagram('qwerty', 'qeywrt') // true
validAnagram('texttwisttime', 'timetwisttext') // true
*/

function validAnagram(str1, str2) {
  if (str1.length !== str2.length) {
    return console.log('length is not equal');
  }
  let strObj1 = {};
  let strObj2 = {};
  for (val of str1) {
    strObj1[val] = (strObj1[val] || 0) + 1;
  }
  for (val of str2) {
    strObj2[val] = (strObj2[val] || 0) + 1;
  }

  for (let val in strObj1) {
    if (!(val in strObj2)) {
      console.log('not anagram');

      return false;
    }
    console.log(strObj1[val], strObj2[val]);
    if (strObj1[val] !== strObj2[val]) {
      console.log('not anagram');
      return false;
    }
  }
  console.log('anagram');
}

// validAnagram('', '');
// validAnagram('abc', 'cba');
//validAnagram('a b c', 'c b a'); // are we considering space ?
// validAnagram('?@/', 'asd'); // special characters?
