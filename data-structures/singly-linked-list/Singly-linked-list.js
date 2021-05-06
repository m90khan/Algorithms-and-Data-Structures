// Singly Linked List

// Implement the following on the SinglyLinkedList class:

/*
What is a linked list?
A data structure that contains a head, tail and length property.
Linked Lists consist of nodes, and each node has a value and a pointer to another node or null

- PUSH
- POP
- SHIFT
- UNSHIFT
- GET
- SET
- INSERT
- REMOVE
- REVERSE
- ROTATE
- ITERATE


*/

const SinglyLinkedListNode = require('./Singly-linked-list-node');
/*

 class SinglyLinkedListNode {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
};

*/
class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  /*
- PUSH
This function should take in a value and add a node to the end of the SinglyLinkedList.
It should return the SinglyLinkedList.

Pushing pseudocode
This function should accept a value
Create a new node using the value passed to the function
If there is no head property on the list, set the head and tail to be the newly created node
Otherwise set the next property on the tail to be the new node and set the tail property on the list to be the newly created node
Increment the length by one
Return the linked list
  */
  push(data) {
    const node = new SinglyLinkedListNode(data);
    // if empty
    if (!this.head) {
      this.head = node;
      this.tail = this.head;
    }
    // else add to the tail
    else {
      this.tail.next = node;
      // points tail to current node
      this.tail = node;
    }
    this.length++;
    return this;
  }
  /*
- POP
This function should remove a node at the end of the SinglyLinkedList.
It should return the node removed.

Popping pseudocode
If there are no nodes in the list, return undefined
Loop through the list until you reach the tail
Set the next property of the 2nd to last node to be null
Set the tail to be the 2nd to last node
Decrement the length of the list by 1
Return the value of the node removed
*/
  pop() {
    if (!this.head) return undefined;
    let currentNode;
    let newTail;
    // if head is same as tail . only one item
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      currentNode = this.head;

      while (currentNode.next) {
        newTail = currentNode;
        currentNode = currentNode.next;
      }
      this.tail = newTail;
      this.tail.next = null;
    }
    this.length--;
    return currentNode;
  }
  /*
- SHIFT
This function should remove a node from the beginning of the SinglyLinkedList.
It should return the node removed.

Shifting pseudocode
If there are no nodes, return undefined
Store the current head property in a variable
Set the head property to be the current head's next property
Decrement the length by 1
Return the value of the node removed
*/
  shift() {
    if (!this.head) return undefined;
    const removedNode = this.head;
    if (this.head === this.tail) this.tail = null;
    this.head = removedNode.next;
    this.length--;
    return removedNode;
  }
  /*
- Unshift
This function should add a new node to the beginning of the SinglyLinkedList.
It should return the SinglyLinkedList.

Unshifting pseudocode
This function should accept a value
Create a new node using the value passed to the function
If there is no head property on the list, set the head and tail to be the newly created node
Otherwise set the newly created node's next property to be the current head property on the list
Set the head property on the list to be that newly created node
Increment the length of the list by 1
Return the linked list
*/
  unshift(data) {
    this.head = new SinglyLinkedListNode(data, this.head);
    if (!this.length) this.tail = this.head;
    this.length++;
    return this;
  }
  /*
- Get
This function should find a node at a specified index in a SinglyLinkedList.
It should return the found node.

Get pseudocode
This function should accept an index
If the index is less than zero or greater than or equal to the length of the list, return null
Loop through the list until you reach the index and return the node at that specific index
*/
  get(index) {
    if (index < 0 || index >= this.length) return null;
    let currentNode = this.head;
    for (let i = 1; i <= index; i++) {
      currentNode = currentNode.next;
    }
    return currentNode;
  }
  /*
-Set
 This function should accept an index and a value and update the value
 of the node in the SinglyLinkedList at the index with the new value.  It should return true 
 if the node is updated successfully, or false if an invalid index is passed in.

 Set pseudocode
This function should accept a value and an index
Use your get function to find the specific node.
If the node is not found, return false
If the node is found, set the value of that node to be the value passed to the function and return true
*/
  set(index, data) {
    const node = this.get(index);
    if (!node) return false;
    node.data = data;
    return true;
  }
  /*
- Insert
This should insert a node at a specified index in a SinglyLinkedList.  It should return true 
if the index is valid, and false if the index is invalid (less than 0 or greater than the length of the list).
!! =  gives the truthy value instead of whole list

Insert pseudocode
If the index is less than zero or greater than the length, return false
If the index is the same as the length, push a new node to the end of the list
If the index is 0, unshift a new node to the start of the list
Otherwise, using the get method, access the node at the index - 1
Set the next property on that node to be the new node
Set the next property on the new node to be the previous next
Increment the length
Return true
*/
  insert(index, data) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(data);
    if (index === this.length) return !!this.push(data);

    const prevNode = this.get(index - 1);
    if (!prevNode) return false;
    prevNode.next = new SinglyLinkedListNode(data, prevNode.next);
    this.length++;
    return true;
  }
  /*
-Remove
 This function should remove a node at a specified index in a SinglyLinkedList.
 It should return the removed node, if the index is valid, or undefined if the index is invalid.

Remove pseudocode
If the index is less than zero or greater than the length, return undefined
If the index is the same as the length-1, pop
If the index is 0, shift
Otherwise, using the get method, access the node at the index - 1
Set the next property on that node to be the next of the next node
Decrement the length
Return the value of the node removed
*/
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const prevNode = this.get(index - 1);
    if (!prevNode) return undefined;
    const removedNode = prevNode.next;
    prevNode.next = removedNode.next;
    this.length--;
    return removedNode;
  }
  /*

-Find - accepts a parameter compareTo which can be a value for comparison or
a comparison function (must return true or false for each node), returns
the found node or its index.

*/
  find(compareTo, returnIndex = false) {
    if (!this.head) return undefined;

    let currentNode = this.head;
    let index = 0;

    while (currentNode) {
      if (typeof compareTo === 'function' && compareTo(currentNode.data)) {
        return returnIndex ? index : currentNode;
      } else if (typeof compareTo !== 'function' && currentNode.data === compareTo) {
        return returnIndex ? index : currentNode;
      }

      currentNode = currentNode.next;
      index++;
    }

    return undefined;
  }
  /*
-Reverse
This function should reverse the SinglyLinkedList in place.

Reverse pseudocode
Swap the head and tail
Create a variable called next
Create a variable called prev
Create a variable called node and initialize it to the head property
Loop through the list
Set next to be the next property on whatever node is
Set the next property on the node to be whatever prev is
Set prev to be the value of the node variable
Set the node variable to be the value of the next variable
Once you have finished looping, return the list
*/
  reverse() {
    let currentNode = this.head;
    this.head = this.tail;
    this.tail = currentNode;
    let prev = null;
    let next;
    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return this;
  }
  /*
- Rotate
This function should rotate all the nodes in the list by some number passed in.
For instance, if your list looks like 1 -> 2 -> 3 -> 4 -> 5 and you rotate by 2,
the list should be modified to 3 -> 4 -> 5 -> 1 -> 2.
The number passed in to rotate can be any integer (should work with negative indexes).
Time Complexity: O(N), where N is the length of the list. Space Complexity: O(1)
*/
  rotate(number) {
    const index = number < 0 ? number + this.length : number;

    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this;

    const prevNode = this.get(index - 1);

    if (!prevNode) return undefined;

    this.tail.next = this.head;
    this.head = prevNode.next;
    this.tail = prevNode;
    prevNode.next = null;

    return this;
  }
  /*
- Iterate - accepts a callback function as a parameter, iterates through each node
in the list applying the callback function, returns array of values returned from the callback function
*/
  iterate(cb = null) {
    const arr = [];
    let currentNode = this.head;

    while (currentNode) {
      if (typeof cb === 'function') arr.push(cb(currentNode.data));
      else arr.push(currentNode.data);
      currentNode = currentNode.next;
    }

    return arr;
  }

  print() {
    console.log(this.iterate());
  }
}

if (module.parent) {
  module.exports = SinglyLinkedList;
} else {
  const singlyLinkedList = new SinglyLinkedList();

  singlyLinkedList.push(5).push(10).push(15).push(20).push(25).push(30);
  singlyLinkedList.print(); // [ 5, 10, 15, 20, 25, 30 ]
  singlyLinkedList.pop();
  singlyLinkedList.print(); // [ 5, 10, 15, 20, 25 ]
  singlyLinkedList.unshift(1);
  singlyLinkedList.print(); // [ 1, 5, 10, 15, 20, 25 ]
  singlyLinkedList.shift();
  singlyLinkedList.print(); // [ 5, 10, 15, 20, 25 ]
  console.log(singlyLinkedList.get(2).data); // 15
  singlyLinkedList.set(2, 100);
  console.log(singlyLinkedList.get(2).data); // 100
  singlyLinkedList.insert(3, 10000);
  singlyLinkedList.print(); // [ 5, 10, 100, 10000, 20, 25 ]
  singlyLinkedList.remove(3);
  singlyLinkedList.print(); // [ 5, 10, 100, 20, 25 ]
  singlyLinkedList.reverse();
  singlyLinkedList.print(); // [ 25, 20, 100, 10, 5 ]
  singlyLinkedList.rotate(-2);
  singlyLinkedList.print(); // [ 10, 5, 25, 20, 100 ]
  console.log(singlyLinkedList.find(25, true)); // 2
}

/*
function LinkedList() {
  this.head = null;
  this.tail = null;
}

function Node(value, next, prev) {
  this.value = value;
  this.next = next;
  this.prev = prev;
}

LinkedList.prototype.addToHead = function(value) {
  var newNode = new Node(value, this.head, null);
  if (this.head) this.head.prev = newNode;
  else this.tail = newNode;
  this.head = newNode;
};

LinkedList.prototype.addToTail = function(value) {
  var newNode = new Node(value, null, this.tail);
  if (this.tail) this.tail.next = newNode;
  else this.head = newNode;
  this.tail = newNode;
};

LinkedList.prototype.removeHead = function() {
  if (!this.head) return null;
  var val = this.head.value;
  this.head = this.head.next;
  if (this.head) this.head.prev = null;
  else this.tail = null;
  return val;
};

LinkedList.prototype.removeTail = function() {
  if (!this.tail) return null;
  var val = this.tail.value;
  this.tail = this.tail.prev;
  if (this.tail) this.tail.next = null;
  else this.head = null;
  return val;
};

LinkedList.prototype.search = function(searchValue) {
  var currentNode = this.head;
  while (currentNode) {
    if (currentNode.value === searchValue) return currentNode.value;
    currentNode = currentNode.next;
  } 
  return null;
};

LinkedList.prototype.indexOf = function(value) {
  var indexes = [];
  var currentIndex = 0;
  var currentNode = this.head;
  while(currentNode) {
    if (currentNode.value === value) indexes.push(currentIndex);
    currentNode = currentNode.next;
    currentIndex++;
  }
  return indexes;
};


var myLL = new LinkedList();

myLL.addToHead(123);
myLL.addToHead(70);
myLL.addToHead('hello');
myLL.addToTail(19);
myLL.addToTail('world');
myLL.addToTail(20);
*/
