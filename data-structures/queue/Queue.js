// Queue

// Implement the following methods on the Queue class.
/*
ADD to the end and remove from the beginning


*/

const QueueNode = require('./Queue-node');

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  /*
- Enqueue
This function adds the value to the end of the queue.
This should be an O(1) operation and return the new size of the queue.

Enqueue Pseudocode
This function accepts some value
Create a new node using that value passed to the function
If there are no nodes in the queue, set this node to be the first and last property of the queue
Otherwise, set the next property on the current last to be that node, and then set the last property of the queue to be that node
Increment the size of the queue by 1
*/
  enqueue(data) {
    const newNode = new QueueNode(data);

    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }

    this.size++;
    return this.size;
  }
  /*
- Dequeue
This function removes the value at the beginning of the queue.
This should be an O(1) operation and return the value removed.

Dequeue pseudocode
If there is no first property, just return null
Store the first property in a variable
See if the first is the same as the last (check if there is only 1 node). If so, set the first and last to be null
If there is more than 1 node, set the first property to be the next property of first 
Decrement the size by 1
Return the value of the node dequeued
*/
  dequeue() {
    if (!this.first) return null;

    const removedNode = this.first;
    this.first = removedNode.next;
    this.size--;

    if (!this.size) this.last = null;

    return removedNode.data;
  }
}

if (module.parent) {
  module.exports = Queue;
} else {
  const queue = new Queue();

  console.log(queue.enqueue(10)); // 1
  console.log(queue.size); // 1
  console.log(queue.enqueue(100)); // 2
  console.log(queue.size); // 2
  console.log(queue.enqueue(1000)); // 3
  console.log(queue.size); // 3
  console.log(queue.dequeue()); // 10
  queue.dequeue();
  console.log(queue.size); // 1
  queue.dequeue();
  console.log(queue.dequeue()); // null
  console.log(queue.size); // 1
}
