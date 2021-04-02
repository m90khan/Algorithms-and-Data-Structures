/*
The problem with naive algorithm is that as soon a mismatch happens, instead of comparing pattern after the mismatched value
it pattern breaks out of loop (meaning it starts again from index 0) and text moves one step i+1 and start comparing from that position.
Hence KMP
*/

// Knuth-Morris-Pratt algorithm
/*
The idea is to find values in a pattern in which suffix is equal to prefix (meaning if the beginning part of pattern is again appearing
in the pattern or not), matched pattern table  also called as lps or Pie table
Pattern: a b c d a b c
prefix: a , ab , abc , abcd
suffix: c , bc , abc , dabc

so abc matched which is reason that it avoid the mistake in naive search.

*/
// Write a function which accepts a string and a pattern, and returns the index
// at which the value exists. If the pattern does not exist in the string, return -1.

// Time Complexity - O(n + m)
// Space complexity - O(n)

function buildArrayPattern(pattern) {
  const arrayPattern = [0];
  let prefix = 0;
  let suffix = 1;

  while (arrayPattern.length < pattern.length) {
    if (pattern[prefix] === pattern[suffix]) {
      arrayPattern.push(prefix + 1);
      prefix++;
      suffix++;
    } else if (prefix === 0) {
      arrayPattern.push(0);
      suffix++;
    } else {
      prefix = arrayPattern[prefix - 1];
    }
  }

  return arrayPattern;
}

function kmp(text, pattern) {
  const arrayPattern = buildArrayPattern(pattern);
  let textIndex = 0;
  let patternIndex = 0;

  while (textIndex < text.length) {
    if (text[textIndex] === pattern[patternIndex]) {
      if (patternIndex === pattern.length - 1) {
        return textIndex - pattern.length + 1;
      } else {
        textIndex++;
        patternIndex++;
      }
    } else if (patternIndex === 0) {
      textIndex++;
    } else {
      patternIndex = arrayPattern[patternIndex - 1];
    }
  }

  return -1;
}

console.log(kmp('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcy')); // 1
console.log(kmp('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcyd')); // -1

function kmpCounter(text, pattern) {
  const arrayPattern = buildArrayPattern(pattern);
  let textIndex = 0;
  let patternIndex = 0;
  let counter = 0;

  while (textIndex < text.length) {
    if (text[textIndex] === pattern[patternIndex]) {
      if (patternIndex === pattern.length - 1) {
        textIndex++;
        patternIndex = 0;
        counter++;
      } else {
        textIndex++;
        patternIndex++;
      }
    } else if (patternIndex === 0) {
      textIndex++;
    } else {
      patternIndex = arrayPattern[patternIndex - 1];
    }
  }

  return counter;
}

console.log(kmpCounter('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcy')); // 2
console.log(kmpCounter('dabcdabcyabkglabcdcxabcdabcdabcy', 'abcdabcyd')); // 0

//Building the Table

function matchTable(word) {
  let arr = Array.from({ length: word.length }).fill(0);
  let suffixEnd = 1;
  let prefixEnd = 0;
  while (suffixEnd < word.length) {
    if (word[suffixEnd] === word[prefixEnd]) {
      // we can build a longer prefix based on this suffix
      // store the length of this longest prefix
      // move prefixEnd and suffixEnd
      prefixEnd += 1;
      arr[suffixEnd] = prefixEnd;
      suffixEnd += 1;
    } else if (word[suffixEnd] !== word[prefixEnd] && prefixEnd !== 0) {
      // there's a mismatch, so we can't build a larger prefix
      // move the prefixEnd to the position of the next largest prefix
      prefixEnd = arr[prefixEnd - 1];
    } else {
      // we can't build a proper prefix with any of the proper suffixes
      // let's move on
      arr[suffixEnd] = 0;
      suffixEnd += 1;
    }
  }
  return arr;
}

//KMP - FTW!

function kmpSearch(long, short) {
  let table = matchTable(short);
  let shortIdx = 0;
  let longIdx = 0;
  let count = 0;
  while (longIdx < long.length - short.length + shortIdx + 1) {
    if (short[shortIdx] !== long[longIdx]) {
      // we found a mismatch :(
      // if we just started searching the short, move the long pointer
      // otherwise, move the short pointer to the end of the next potential prefix
      // that will lead to a match
      if (shortIdx === 0) longIdx += 1;
      else shortIdx = table[shortIdx - 1];
    } else {
      // we found a match! shift both pointers
      shortIdx += 1;
      longIdx += 1;
      // then check to see if we've found the substring in the large string
      if (shortIdx === short.length) {
        // we found a substring! increment the count
        // then move the short pointer to the end of the next potential prefix
        count++;
        shortIdx = table[shortIdx - 1];
      }
    }
  }
  return count;
}
