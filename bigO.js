/* 
// Topic Big O notation
Big O Notation is a way to formalize fuzzy counting
It allows us to talk formally about how the runtime of an algorithm grows as the inputs grow
We won't care about the details, only the trends
*/

function addToN(n) {
  // O(n)
  let total = 0;
  for (let i = 0; i <= n; i++) {
    total += i;
  }
  return total;
}

// let t1 = performance.now();
// addToN(10000000);
// let t2 = performance.now();

// console.log(`addToN Time Elapsed: ${(t2 - t1) / 1000} seconds`);

function addToN2(n) {
  // O(1)
  return (n * (n + 1)) / 2;
}

// let t3 = performance.now();
// addToN2(10000000);
// let t4 = performance.now();

// console.log(`addToN2 Time Elapsed: ${(t4 - t3) / 1000} seconds`);

// addToN Time Elapsed: 0.018769999999676656 seconds
// AddToN2 Time Elapsed: 0.00008000000025276677 seconds

// Count up and down  O(n)
function countUpAndDown(n) {
  console.log('Going up!');
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
  console.log('At the top!\nGoing down...');
  for (let j = n - 1; j >= 0; j--) {
    console.log(j);
  }
  console.log('Back down. Bye!');
}

// printAllPairs   O(n2)
function printAllPairs(n) {
  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      console.log(i, j);
    }
  }
}

/*  // TOPIC : PROBLEM SOLVING PATTERNS
Frequency Counter
Multiple Pointers
Sliding Window
Divide and Conquer
Dynamic Programming
Greedy Algorithms
Backtracking
Many more!
*/

// - Frequency Counter
/*
Write a function called same, which accepts two arrays. The function should return true if every value in the array has 
it's corresponding value squared in the second array. The frequency of values must be the same.
same([1,2,3], [4,1,9]) // true
same([1,2,3], [1,9]) // false
same([1,2,1], [4,4,1]) // false (must be same frequency)
*/
// Time Complexity : O(n2)
function same(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    let correctIndex = arr2.indexOf(arr1[i] ** 2);
    if (correctIndex === -1) {
      return false;
    }
    arr2.splice(correctIndex, 1);
  }

  return true;
}

// Time Complexity : O(n)
function same2(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }
  let frequencyCounter1 = {};
  let frequencyCounter2 = {};
  for (let val of arr1) {
    console.log((frequencyCounter1[val] || 0) + 1);
    frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1;
  }
  for (let val of arr2) {
    frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1;
  }
  for (let key in frequencyCounter1) {
    // if the value is there in frequencyCounter2
    if (!(key ** 2 in frequencyCounter2)) {
      return false;
    }
    if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
      return false;
    }
  }
  console.log(frequencyCounter1);
  console.log(frequencyCounter2);
  return true;
}
// same2([1, 2, 2, 3], [1, 4, 4, 9]);

/*
- Multiple Pointers
Write a function called sumZero which accepts a sorted array of integers. The function should find the first pair
where the sum is 0. Return an array that includes both values that sum to zero or undefined if a pair does not exist
sumZero([-3,-2,-1,0,1,2,3]) // [-3,3] 
sumZero([-2,0,1,3]) // undefined
sumZero([1,2,3]) // undefined
 */

// NAIVE SOLUTION   :    Time Complexity - O(N^2)   Space Complexity - O(1)
function sumZero(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]];
      }
    }
  }
}

// sumZero([-3, -2, -1, 0, 1, 2, 3]);

// Better Solution REFACTOR  : Time Complexity - O(N)  | Space Complexity - O(1)
function sumZeroPointer(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    let sum = arr[left] + arr[right];
    if (sum === 0) {
      console.log([arr[left], arr[right]]);
      return [arr[left], arr[right]];
    } else if (sum > 0) {
      right--;
    } else {
      left++;
    }
  }
}

// sumZeroPointer([-3, -2, -1, 0, 34, 4, 5]);

/*
Example countUniqueValues
Implement a function called countUniqueValues, which accepts a sorted array, and counts the unique values in the array. 
There can be negative numbers in the array, but it will always be sorted.

countUniqueValues([1,1,1,1,1,2]) // 2
countUniqueValues([1,2,3,4,4,4,7,7,12,12,13]) // 7
countUniqueValues([]) // 0
countUniqueValues([-2,-1,-1,0,1]) // 4
 */

/*   O(n)
so we have an array. where we set 2 pointers at 0 as i  and 1 as j. 
if they are  equal then move j++ cause of loop else move i++ and newvalue to current j value
*/
function countUniqueValues(arr) {
  if (arr.length === 0) return;
  let i = 0;
  const uniqueArr = [];
  for (let j = 1; j < arr.length; j++) {
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  return i + 1;
}

// countUniqueValues([1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 7]);

/*
- SLIDING WINDOW
This pattern involves creating a window which can either be an array or number from one position to another
Depending on a certain condition, the window either increases or closes (and a new window is created)
Very useful for keeping track of a subset of data in an array/string etc.

Find the longest sequence of unique characters

EXAMPLE 
Write a function called maxSubarraySum which accepts an array of integers and a number called n.
The function should calculate the maximum sum of n consecutive elements in the array.

maxSubarraySum([1,2,5,2,8,1,5],2) // 10
maxSubarraySum([1,2,5,2,8,1,5],4) // 17
maxSubarraySum([4,2,1,6],1) // 6
maxSubarraySum([4,2,1,6,2],4) // 13
maxSubarraySum([],4) // null
*/
// naive solution    Time Complexity - O(N^2)
function maxSubarraySum(arr, num) {
  if (num > arr.length) {
    return null;
  }
  let max = -Infinity; // if the array only has neative integers
  let temp;
  for (let i = 0; i < arr.length - num + 1; i++) {
    temp = 0;
    for (let j = 0; j < num; j++) {
      temp += arr[i + j];
    }
    if (temp > max) {
      max = temp;
    }
    console.log(temp, max);
  }
  return max;
}

// maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2);

// Better Solution : Sliding Window   Time Complexity - O(N)
function maxSubarraySum2(arr, num) {
  let maxSum = 0;
  let tempSum = 0;
  if (arr.length < num) return null;
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  for (let i = num; i < arr.length; i++) {
    tempSum = tempSum - arr[i - num] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}
maxSubarraySum2([1, 2, 5, 2, 8, 1, 5], 2);

/*
Divide and Conquer
This pattern involves dividing a data set into smaller chunks and then repeating a process with a subset of data.
This pattern can tremendously decrease time complexity

An Example
Given a sorted array of integers, write a function called search, that accepts a value and returns the index where 
the value passed to the function is located. If the value is not found, return -1

search([1,2,3,4,5,6],4) // 3
search([1,2,3,4,5,6],6) // 5
search([1,2,3,4,5,6],11) // -1
*/

// Naive solution | Time Complexity O(N)  Linear Search
function search(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      return i;
    }
  }
  return -1;
}

// Better Solution -  Divide and conquer | Time Complexity - Log(N) - Binary Search!
function search2(array, val) {
  let min = 0;
  let max = array.length - 1;

  while (min <= max) {
    let middle = Math.floor((min + max) / 2);
    let currentElement = array[middle];

    if (array[middle] < val) {
      min = middle + 1;
    } else if (array[middle] > val) {
      max = middle - 1;
    } else {
      return middle;
    }
  }

  return -1;
}

search2([1, 2, 3, 4, 5, 6], 6); // 5
