// Selection Sort

/*
Similar to bubble sort, but instead of first placing large values into sorted position, it places small values into sorted position

we find the smallest value in the array and replace it with the starting position of index

Selection Sort Pseudocode
 
Store the first element as the smallest value you've seen so far.
Compare this item to the next item in the array until you find a smaller number.
If a smaller number is found, designate that smaller number to be the new "minimum" and continue until the end of the array.
If the "minimum" is not the value (index) you initially began with, swap the two values.
Repeat this with the next element until the array is sorted.
*/
// Selection sort is an O(n^2) algorithm.

function selectionSort(arr) {
  let min;

  for (let i = 0; i < arr.length; i++) {
    min = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    //swap values
    if (min !== i) [arr[i], arr[min]] = [arr[min], arr[i]];
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
console.log(selectionSort(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]
console.log(selectionSort([0, -10, 7, 4])); // [-10, 0, 4, 7]
