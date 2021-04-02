/*
Problem with default javascript sort
every item in a array is converted into string. then take the unicode values and sort them accordingly

we can specify the aruments to tell ajavscript how to sort 

[1,2,4,1,2].sort((a,b)=>{
  return a-b
})

*/

// Bubble Sort
/*
as we loop through array, we comparing the two items next to each other. get the bigger value and swap until swap is true
until the largest values are moved to the end.

BubbleSort Pseudocode
Let's visualize this!

Start looping from  the end of the array with a variable i towards the beginning
Start an inner loop with a variable called j from the beginning until i - 1
If arr[j] is greater than arr[j+1], swap those two values!
Return the sorted array


Problem: even the code is sorted, bubble sort will still go through every value
*/

// Bubble sort is an O(n^2) algorithm.

function bubbleSort(arr) {
  let swap;

  for (let i = 0; i < arr.length; i++) {
    swap = false;

    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swap = true;
      }
    }

    if (!swap) break;
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
console.log(bubbleSort(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]
console.log(bubbleSort([0, -10, 7, 4])); // [-10, 0, 4, 7]
