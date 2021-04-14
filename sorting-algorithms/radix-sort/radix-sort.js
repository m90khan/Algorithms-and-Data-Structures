// Radix Sort
/*

RADIX SORT
Radix sort is a special sorting algorithm that works on lists of numbers
It exploits the fact that information about the size of a number is encoded in the number of digits.  
More digits means a bigger number!
It never makes comparisons between elements!

RADIX SORT PSEUDOCODE
Define a function that accepts list of numbers
Figure out how many digits the largest number has
Loop from k = 0 up to this largest number of digits
For each iteration of the loop:
Create buckets for each digit (0 to 9)
place each number in the corresponding bucket based on its kth digit
Replace our existing array with values in our buckets, starting with 0 and going up to 9
return list at the end!
*/
// Radix Sort Helper function - getDigit
// Implement a function called getDigit which accepts a positive integer and
// a position, and returns the digit in that number at the given position.
// The position reads from right to left, so the 0th position corresponds to the rightmost digit.

// Radix Sort Helper - digitCount
// Implement a function called digitCount which accepts a positive integer and
// returns the number of digits that the integer has.

// Radix Sort Helper - mostDigits
// Implement a function called mostDigits which accepts an array of integers and
// returns a count of the number of digits for the number in the array with the most digits.

// Radix Sort function - radixSort
// Write a function called radixSort which accepts an array of numbers and
// sorts them in ascending order.

function getDigit(num, i) {
  let result = Math.abs(num);
  for (let count = i; count > 0; count--) {
    result = Math.floor(result / 10);
  }
  return result % 10;
}

function digitCount(num) {
  return Math.abs(num).toString().length;
}

function mostDigits(nums) {
  let max = 0;

  for (const num of nums) {
    max = Math.max(max, digitCount(num));
  }
  return max;
}

function radixSort(nums) {
  const end = mostDigits(nums); // get maximum number in the array

  for (let i = 0; i < end; i++) {
    const helperArr = Array.from({ length: 10 }, () => []); // create 10 buckets
    for (const num of nums) {
      helperArr[getDigit(num, i)].push(num);
    }
    nums = [].concat(...helperArr);
  }
  return nums;
}

// version 2
function radixSort(nums) {
  let maxDigitCount = mostDigits(nums);
  for (let k = 0; k < maxDigitCount; k++) {
    let digitBuckets = Array.from({ length: 10 }, () => []);
    for (let i = 0; i < nums.length; i++) {
      let digit = getDigit(nums[i], k);
      digitBuckets[digit].push(nums[i]);
    }
    nums = [].concat(...digitBuckets);
  }
  return nums;
}

radixSort([23, 345, 5467, 12, 2345, 9852]);

console.log(radixSort([8, 6, 1, 12])); // [1, 6, 8, 12]
console.log(radixSort([10, 100, 1, 1000, 10000000])); // [1, 10, 100, 1000, 10000000]
console.log(radixSort([902, 4, 7, 408, 29, 9637, 1556, 3556, 8157, 4386, 86, 593]));
// [4, 7, 29, 86, 408, 593, 902, 1556, 3556, 4386, 8157, 9637]
