// Priority Queue

// Implement Priority Queue with Min Binary Heap
// Each Node has a value and a priority.  Use the priority to build the heap.

// enqueue
// This method accepts a value and priority, makes a new node,
// and puts it in the right spot based off of its priority.

// dequeue
// This method removes root element, returns it, and rearranges heap using priority.

// Additionally, the following method is implemented on the class:
// changePriority - changes priority of node

// Version 1

const PriorityQueueNode = require('./Priority-queue-node');
const MinBinaryHeap = require('../binary-heap/Min-binary-heap');

class PriorityQueue extends MinBinaryHeap {
  constructor() {
    super();
    this.getValue = this.getValue.bind(this);
  }

  getItem(index) {
    return this.values[index].priority;
  }

  getValue(index) {
    return this.values[index].value;
  }

  enqueue(value, priority) {
    return super.insert(new PriorityQueueNode(value, priority));
  }

  dequeue() {
    return super.extractMin();
  }

  findByValue(value) {
    return super.find(value, this.getValue);
  }

  remove(value) {
    return super.remove(value, this.getValue);
  }

  changePriority(value, priority) {
    this.remove(value);
    return this.enqueue(value, priority);
  }

  printPriorityQueue() {
    for (const item of this.values) {
      console.log(`${item.value} - ${item.priority}`);
    }
  }
}

if (module.parent) {
  module.exports = PriorityQueue;
} else {
  const priorityQueue = new PriorityQueue()
    .enqueue('cat', 1)
    .enqueue('dog', 2)
    .enqueue('fish', 3)
    .enqueue('rat', 4)
    .enqueue('horse', 5)
    .enqueue('squirrel', 6)
    .enqueue('snake', 2);

  priorityQueue.printPriorityQueue(); // cat - 1, dog - 2, snake - 2, rat - 4, horse - 5, squirrel - 6, fish - 3
  console.log(priorityQueue.findByValue('horse')); // [ 4 ]
  priorityQueue.remove('fish');
  priorityQueue.printPriorityQueue(); // cat - 1, dog - 2, snake - 2, rat - 4, horse - 5, squirrel - 6
  priorityQueue.enqueue('crow', 4).enqueue('rabbit', 3);
  priorityQueue.printPriorityQueue(); // cat - 1, dog - 2, snake - 2, rabbit - 3, horse - 5, squirrel - 6, crow - 4, rat - 4
  console.log(priorityQueue.dequeue());
  priorityQueue.printPriorityQueue(); // dog - 2, rabbit - 3, snake - 2, rat - 4, horse - 5, squirrel - 6, crow - 4
}

// version 2

/* 
OUR PRIORITY QUEUE
Write a Min Binary Heap - lower number means higher priority.
Each Node has a val and a priority.  Use the priority to build the heap.
Enqueue method accepts a value and priority, makes a new node, and puts it in the right spot based off of its priority.
Dequeue method removes root element, returns it, and rearranges heap using priority.

MaxHeapify
Converting an array into a MaxBinaryHeap

Create a new heap
Iterate over the array and invoke your insert function
return the values property on the heap
*/
class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(value, priority) {
    let newNode = new PriorityQueueNode(value, priority);
    this.values.push(newNode);
    this.bubbleUp();
    return this;
  }
  bubbleUp(idx = this.values.length - 1) {
    let index = idx;
    const element = this.values[index];

    while (index > 0) {
      const parentIndex = Math.floor((childIndex - 1) / 2);
      const parent = this.values[parentIndex];
      if (element.priority <= parent.priority) break;
      this.values[parentIndex] = element;
      this.values[index] = parent;
      index = parentIndex;
    }
  }

  dequeue() {
    const max = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      // trickle down
      this.sinkDown();
    } else {
    }

    return max;
  }
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    // find left and right
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;
      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority > element.priority) {
          swap = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority > element.priority) ||
          (swap !== null && rightChild.priority > leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      if (swap === null) break;
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}
