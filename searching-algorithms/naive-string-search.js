// naive string search
// Write a function which accepts a string and a pattern,
// and counts the number of times the pattern appears in the string.
/*
Pseudocode
Loop over the longer string
Loop over the shorter string
If the characters don't match, break out of the inner loop
If the characters do match, keep going
If you complete the inner loop and find a match, increment the count of matches
Return the count

*/
// Time Complexity - O(n * m)

function stringSearch(long, short) {
  if (short === '') return;
  let count = 0;

  for (let i = 0; i <= long.length - short.length; i++) {
    for (let j = 0; j < short.length; j++) {
      console.log(long[i + j], short[j]);
      if (long[i + j] !== short[j]) break;
      if (j === short.length - 1) count++;
    }
  }

  return count;
}

console.log(stringSearch('hojoklokoklok', 'lok')); // 2
