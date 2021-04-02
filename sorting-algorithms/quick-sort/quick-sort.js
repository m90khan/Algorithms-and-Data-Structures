// Quick sort
/*
Like merge sort, exploits the fact that arrays of 0 or 1 element are always sorted
Works by selecting one element (called the "pivot") and finding the index where the pivot should end up in the sorted array
Move the numbers that are less than pivot to the left and greater than to the right
Once the pivot is positioned appropriately, quick sort can be applied on either side of the pivot

simple words: 
pick a number (pivot number ) in a array then look for all numbers that are less than that number and move next to them.
Then do the quick sort where all numbers that are less than picot to the left and greater to the right side.

Pivot Pseudocode
It will help to accept three arguments: an array, a start index, and an end index (these can default to 0 and the array length minus 1, respectively)
Grab the pivot from the start of the array 
Store the current pivot index in a variable (this will keep track of where the pivot should end up)
Loop through the array from the start until the end
If the pivot is greater than the current element, increment the pivot index variable and then swap the current element with the element at the pivot index
Swap the starting element (i.e. the pivot) with the pivot index
Return the pivot index

Quicksort Pseudocode
Call the pivot helper on the array
When the helper returns to you the updated pivot index, recursively call the pivot helper on the subarray to the left of that index, and the subarray to the right of that index
Your base case occurs when you consider a subarray with less than 2 elements
*/

// Quick sort is an O(n * log(n)) algorithm (Worst case - O(n^2).
// Pivot is always the first element

function pivot(arr, start = 0, end = arr.length - 1) {
  let pivotIndex = start;

  for (let i = start + 1; i <= end; i++) {
    if (arr[start] > arr[i]) {
      pivotIndex++;
      [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
    }
  }

  if (pivotIndex !== start) [arr[pivotIndex], arr[start]] = [arr[start], arr[pivotIndex]];

  return pivotIndex;
}

function quickSort(arr, start = 0, end = arr.length - 1) {
  if (start < end) {
    const pivotIndex = pivot(arr, start, end);

    quickSort(arr, start, pivotIndex - 1); // left
    quickSort(arr, pivotIndex + 1, end); // right
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
console.log(quickSort(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]
console.log(quickSort([])); // []
