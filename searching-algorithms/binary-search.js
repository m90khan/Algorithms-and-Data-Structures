// Binary Search
/*
Binary Search Pseudocode

This function accepts a sorted array and a value
Create a left pointer at the start of the array, and a right pointer at the end of the array
While the left pointer comes before the right pointer:
Create a pointer in the middle
If you find the value you want, return the index
If the value is too small, move the left pointer up
If the value is too large, move the right pointer down
If you never find the value, return -1


 Write a function called binarySearch which accepts a sorted array and
 a value and returns the index at which the value exists. Otherwise, return -1.
 
 - Time Complexity - O(log n)
 */

function binarySearch(arr, val) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);

    if (arr[middle] === val) return middle;

    if (arr[middle] > val) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }

  return -1;
}

console.log(binarySearch([5, 6, 10, 14, 18, 30, 37, 40, 44, 79, 84, 86, 98, 99], 10)); // 2
console.log(binarySearch([5, 10, 16, 34, 37, 40, 44, 64, 84, 86, 95, 98, 99], 95)); // 10
console.log(binarySearch([5, 6, 13, 14, 18, 64, 79, 84, 86, 95, 96, 98, 99], 100)); // -1

/*
What if the value is never found in array?
solution : left <= right

*/
