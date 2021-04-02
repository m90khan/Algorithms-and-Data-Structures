// Insertion Sort
/*
Taking an element one at a time and insertin it at the correct position. 

Insertion Sort Pseudocode

Start by picking the second element in the array
Now compare the second element with the one before it and swap if necessary.
Continue to the next element and if it is in the incorrect order, iterate through the sorted portion (i.e. the left side) to place the element in the correct place.
Repeat until the array is sorted.

Best Case: O(n) if the array is already sorted or maybe need to replace only value or so
Worst Case: O(n^2)
*/
// Insertion sort is an O(n^2) algorithm.

// Using swap
function insertionSortSwap(arr) {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j > 0; j--) {
      if (arr[j] < arr[j - 1]) [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]];
      else break;
    }
  }

  return arr;
}

const nums = [
  4,
  3,
  5,
  3,
  43,
  232,
  4,
  34,
  232,
  32,
  4,
  35,
  34,
  23,
  2,
  453,
  546,
  75,
  67,
  4342,
  32,
];
console.log(insertionSortSwap(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]
console.log(insertionSortSwap([0, -10, 7, 4])); // [-10, 0, 4, 7]

// Using auxiliary variable
function insertionSortVariable(arr) {
  for (let i = 1; i < arr.length; i++) {
    const current = arr[i];
    let j;

    //  j >= 0 && arr[j] > current . j is greater than 0 and  value is greater than the current element value
    for (j = i - 1; j >= 0 && arr[j] > current; j--) {
      arr[j + 1] = arr[j];
    }
    // found the corrent stop to insert the value
    arr[j + 1] = current;
  }

  return arr;
}

console.log(insertionSortVariable(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]
console.log(insertionSortVariable([0, -10, 7, 4])); // [-10, 0, 4, 7]
