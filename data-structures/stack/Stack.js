// Stack

/*
WHAT IS A STACK?
A LIFO data structure!
The last element added to the stack will be the first element removed from the stack

Think about a stack of plates, or a stack of markers, or a stack of....anything. 
As you pile it up the last thing (or the topmost thing) is what gets removed first.

PUSH 
POP

*/

const StackNode = require('./Stack-node');

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  /*
-Push - takes in a node and puts it at the top of the stack.
 Should return the new size of the stack.

 The function should accept a value
Create a new node with that value
If there are no nodes in the stack, set the first and last property to be the newly created node 
If there is at least one node, create a variable that stores the current first property on the stack
Reset the first property to be the newly created node
Set the next property on the node to be the previously created variable
Increment the size of the stack by 1
*/
  push(data) {
    const newNode = new StackNode(data);

    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      const temp = this.first;
      this.first = newNode;
      this.first.next = temp;
    }
    this.size++;

    return this.size;
  }
  /*
 - Pop - removes the node at the top of the stack and returns the value of that node.
 POP PSEUDOCODE
If there are no nodes in the stack, return null
Create a temporary variable to store the first property on the stack
If there is only 1 node, set the first and last property to be null
If there is more than one node, set the first property to be the next property on the current first
Decrement the size by 1
Return the value of the node removed
*/
  pop() {
    if (!this.first) return null;

    const removedNode = this.first;
    this.first = removedNode.next;
    this.size--;

    if (!this.size) this.last = null;

    return removedNode.data;
  }
}

if (module.parent) {
  module.exports = Stack;
} else {
  const stack = new Stack();

  stack.push(10);
  stack.push(100);
  stack.push(1000);
  console.log(stack.pop()); // 1000
  console.log(stack.size); // 2
  stack.pop();
  stack.pop();
  console.log(stack.size); // 0
  console.log(stack.pop()); // null
}
