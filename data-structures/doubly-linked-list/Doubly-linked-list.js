// Doubly Linked List

/*
Almost identical to Singly Linked Lists, except every node has another pointer, to the previous node!

PUSH
POP
SHIFT
UNSHIFT
GET
SET
INSERT
REMOVE
REVERSE
ROTATE
*/

const DoublyLinkedListNode = require('./Doubly-linked-list-node');

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  /*
- Push
 This function should accept a value add a node to the end of the DoublyLinkedList
 with the given value. It should return the DoublyLinkedList.

 Pushing pseudocode
Create a new node with the value passed to the function
If the head property is null set the head and tail to be the newly created node 
If not, set the next property on the tail to be that node
Set the previous property on the newly created node to be the tail
Set the tail to be the newly created node
Increment the length
Return the Doubly Linked List
*/
  push(data) {
    const newNode = new DoublyLinkedListNode(data);
    // if empty
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.length++;
    return this;
  }
  /*
-Pop
 This function should remove a node at the end of the DoublyLinkedList.  It should return the node removed.

 Popping pseudocode
If there is no head, return undefined
Store the current tail in a variable to return later
If the length is 1, set the head and tail to be null
Update the tail to be the previous Node.
Set the newTail's next to null
Decrement the length
Return the value removed
*/
  pop() {
    if (!this.head) return undefined;
    const removedNode = this.tail;
    this.tail = removedNode.prev;
    removedNode.prev = null;
    this.length--;

    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail.next = null;
    }
    return removedNode;
  }
  /*
- Shift
 This function should remove a node at the beginning of the DoublyLinkedList.
 It should return the node removed.

 Shifting pseudocode
If length is 0, return undefined
Store the current head property in a variable (we'll call it old head)
If the length is one
set the head to be null
set the tail to be null
Update the head to be the next of the old head
Set the head's prev property to null
Set the old head's next to null
Decrement the length
Return old head
 */
  shift() {
    if (!this.head) return undefined;
    const removedNode = this.head;

    if (this.length === 1) {
      this.tail = null;
      this.head = null;
    } else {
      this.head = removedNode.next;
      this.head.prev = null;
      removedNode.next = null;
    }

    this.length--;
    return removedNode;
  }
  /*
- Unshift
This function should accept a value and add a node to the beginning of
the DoublyLinkedList with the given value. It should return the DoublyLinkedList.

Unshifting pseudocode
Create a new node with the value passed to the function
If the length is 0
Set the head to be the new node
Set the tail to be the new node
Otherwise
Set the prev property on the head of the list to be the new node
Set the next property on the new node to be the head property 
Update the head to be the new node
Increment the length
Return the list
*/
  unshift(data) {
    const newNode = new DoublyLinkedListNode(data);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }

    this.length++;

    return this;
  }
  /*
- Get
 This internal/helper function should find a node at a specified index
 in a DoublyLinkedList. It should return the found node.

 Get Pseudocode
If the index is less than 0 or greater or equal to the length, return null
If the index is less than or equal to half the length of the list
Loop through the list starting from the head and loop towards the middle
Return the node once it is found
If the index is greater than half the length of the list
​Loop through the list starting from the tail and loop towards the middle
Return the node once it is found
*/
  get(index) {
    if (index < 0 || index >= this.length) return null;

    const middle = Math.floor(this.length / 2);
    let currentNode;

    if (index < middle) {
      currentNode = this.head;
      for (let i = 1; i <= index; i++) {
        currentNode = currentNode.next;
      }
    } else {
      currentNode = this.tail;
      for (let i = this.length - 1; i > index; i--) {
        currentNode = currentNode.prev;
      }
    }

    return currentNode;
  }
  /*
- Set
This function should accept an index and a value and update the value
of the node in the DoublyLinkedList at the index with the new value.
It should return true if the node is updated successfully,
or false if an invalid index is passed in.

Set pseudocode
Create a variable which is the result of the get method at the index passed to the function
If the get method returns a valid node, set the value of that node to be the value passed to the function
Return true
Otherwise, return false
*/
  set(index, data) {
    const node = this.get(index);
    if (!node) return false;
    node.data = data;
    return true;
  }
  /*
- Insert
This internal/helper function should insert a node at a specified index
in a DoublyLinkedList. It should return true if the index is valid,
and false if the index is invalid (less than 0 or greater than the length of the list).

Insert pseudocode
If the index is less than zero or greater than or equal to the length return false
If the index is 0, unshift
If the index is the same as the length, push
Use the get method to access the index -1
Set the next and prev properties on the correct nodes to link everything together
Increment the length 
Return true
*/
  insert(index, data) {
    if (index < 0 || index > this.length) return false;
    if (index === 0) return !!this.unshift(data);
    if (index === this.length) return !!this.push(data);

    const prevNode = this.get(index - 1);

    if (!prevNode) return false;

    const newNode = new DoublyLinkedListNode(data, prevNode.next, prevNode);
    prevNode.next = newNode;
    newNode.next.prev = newNode;
    this.length++;

    return true;
  }
  /*
- Remove
This function should remove a node at a specified index in a DoublyLinkedList.
It should return the removed node, if the index is valid,
or undefined if the index is invalid.

Remove pseudocode
If the index is less than zero or greater than or equal to the length return undefined
If the index is 0, shift
If the index is the same as the length-1, pop
Use the get method to retrieve the item to be removed
Update the next and prev properties to remove the found node from the list
Set next and prev to null on the found node
Decrement the length
Return the removed node.
*/
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const removedNode = this.get(index);

    if (!removedNode) return undefined;

    removedNode.prev.next = removedNode.next;
    removedNode.next.prev = removedNode.prev;
    removedNode.next = null;
    removedNode.prev = null;
    this.length--;

    return removedNode;
  }
  /*
- Reverse
This function should reverse all of the nodes in a DoublyLinkedList,
and should return the list.

Reverse pseudocode
Create a variable called current and set it to be the head of the list
Create a variable called tail and set it to be the head of the list
Loop through the list and set the next property of the current node to be the prev property of the current node
If there is no next property, set the tail to be the head and the head to be the current variable
Return the list
*/
  reverse() {
    let currentNode = this.head;
    const tail = this.tail;

    while (currentNode) {
      [currentNode.next, currentNode.prev] = [currentNode.prev, currentNode.next];
      currentNode = currentNode.prev;
    }
    this.tail = this.head;
    this.head = tail;
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

    const node = this.get(index);

    if (!node) return undefined;

    this.tail.next = this.head;
    this.head.prev = this.tail;
    this.head = node;
    this.tail = node.prev;
    this.tail.next = null;
    this.head.prev = null;

    return this;
  }

  print() {
    const arr = [];
    let currentNode = this.head;

    while (currentNode) {
      arr.push(currentNode.data);
      currentNode = currentNode.next;
    }

    console.log(arr);
  }
}

const doublyLinkedList = new DoublyLinkedList();

doublyLinkedList.push(5).push(10);
console.log(doublyLinkedList.length); // 2
console.log(doublyLinkedList.head.data); // 5
console.log(doublyLinkedList.head.next.data); // 10
console.log(doublyLinkedList.tail.data); // 10
doublyLinkedList.pop();
console.log(doublyLinkedList.length); // 1
console.log(doublyLinkedList.head.next); // null
doublyLinkedList.unshift(20);
doublyLinkedList.unshift(40);
console.log(doublyLinkedList.head.data); // 40
console.log(doublyLinkedList.shift().data); // 40
console.log(doublyLinkedList.head.data); // 20
console.log(doublyLinkedList.get(1).data); // 5
doublyLinkedList.set(1, 1000);
console.log(doublyLinkedList.get(1).data); // 1000
doublyLinkedList.print(); // [ 20, 1000 ]
doublyLinkedList.insert(1, 25);
doublyLinkedList.insert(0, 30);
doublyLinkedList.insert(-1, 500);
doublyLinkedList.print(); // [ 30, 20, 25, 1000 ]
doublyLinkedList.reverse();
doublyLinkedList.print(); // [ 1000, 25, 20, 30 ]
doublyLinkedList.rotate(-2);
doublyLinkedList.print(); // [ 20, 30, 1000, 25 ]
