// Graph

// Implement the following methods on the Graph class

// breadthFirstSearch
// This function should return an array of vertices visited using BFS.

//

// Additionally, the following methods are implemented on the class:
// findShortestDistance - finds shortest path from source to destination,
// returns an object with two properties, the first being the shortest path length
// and the second an array of nodes which create the shortest path.
// Method uses Breath First Search algorithm.

// travelingSalesmanProblemBF - finds the shortest possible route that visits
// every vertex exactly once and returns to the starting point.
// Brute Force approach - Time Complexity O(n!)

// travelingSalesmanProblemDP - finds the shortest possible route that visits
// every vertex exactly once and returns to the starting point.
// Dynamic programming approach (top-down - memoization) - Time complexity O(2^n * n^2)

const Queue = require('../queue/Queue');
const Stack = require('../stack/Stack');
const PriorityQueue = require('../priority-queue/Priority-queue');

class Graph {
  constructor() {
    if (new.target === Graph) {
      throw new TypeError('You cannot instantiate Graph class directly');
    }

    this.adjacencyList = {};
  }
  /*
-AddVertex
This function should add a node to the graph and place a new key in
the adjacency list with the value of an empty array.

Write a method called addVertex, which accepts a name of a vertex
It should add a key to the adjacency list with the name of the vertex and set its value to be an empty array
*/
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  /*
- ADDING AN EDGE   - UNDIRECTED GRAPH ignoring error edge cases
This function should add an edge between two nodes in the graph and place
each value of the nodes in each array for the value of the node in the adjacency list.

Pseudocode
This function should accept two vertices, we can call them vertex1 and vertex2
The function should find in the adjacency list the key of vertex1 and push vertex2 to the array
The function should find in the adjacency list the key of vertex2 and push vertex1 to the array
Don't worry about handling errors/invalid vertices
*/
  addEdge(vertexOne, vertexTwo) {
    this.adjacencyList[vertexOne].push(vertexTwo);
    this.adjacencyList[vertexTwo].push(vertexOne);
  }
  /*
- REMOVING AN EDGE - Undirected GRAPH ignoring error edge cases
 This function should accept two nodes and remove the edge between them.
 It should modify the adjacency list to ensure that both values are not
 in each array for the two nodes which no longer contain the edge.

Pseudocode
This function should accept two vertices, we'll call them vertex1 and vertex2
The function should reassign the key of vertex1 to be an array that does not contain vertex2
The function should reassign the key of vertex2 to be an array that does not contain vertex1
Don't worry about handling errors/invalid vertices
*/
  removeEdge(vertexOne, vertexTwo) {
    this.adjacencyList[vertexOne] = this.adjacencyList[vertexOne].filter((v1) => {
      v1 !== vertexTwo;
    });
    this.adjacencyList[vertexTwo] = this.adjacencyList[vertexTwo].filter((v2) => {
      v2 !== vertexOne;
    });
  }
  /*
-RemoveVertex
 This function should remove the node in the array of nodes and also remove
 all edges that the removed node previously contained.

The function should accept a vertex to remove
The function should loop as long as there are any other vertices in the adjacency list for that vertex
Inside of the loop, call our removeEdge function with the vertex we are removing and any values in the adjacency list for that vertex
delete the key in the adjacency list for that vertex
*/
  removeVertex(vertex) {
    if (this.adjacencyList[vertex]) {
      while (this.adjacencyList[vertex].length) {
        this.removeEdge(vertex, this.adjacencyList[vertex].pop());
      }

      delete this.adjacencyList[vertex];
    }
  }
  /*
- DEPTH FIRST TRAVERSAL   - RECURSIVE
  
This function should return an array of nodes visited using DFS.
Do this iteratively (using a stack) and recursively.

Pseudocode
The function should accept a starting node
Create a list to store the end result, to be returned at the very end
Create an object to store visited vertices
Create a helper function which accepts a vertex
The helper function should return early if the vertex is empty
The helper function should place the vertex it accepts into the visited object and push that vertex into the result array.
Loop over all of the values in the adjacencyList for that vertex
If any of those values have not been visited, recursively invoke the helper function with that vertex
Invoke the helper function with the starting vertex
Return the result array
*/
  depthFirstSearchRecursive(start = Object.keys(this.adjacencyList)[0]) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;

    function traverse(vertex) {
      if (!adjacencyList[vertex]) return;

      result.push(vertex);
      visited[vertex] = true;

      for (const linkedVertex of adjacencyList[vertex]) {
        if (!visited[linkedVertex.value]) traverse(linkedVertex.value);
      }
    }

    traverse(start);

    return result;
  }
  /*
DEPTH FIRST TRAVERSAL - Iterative
The function should accept a starting node
Create a stack to help use keep track of vertices (use a list/array)
Create a list to store the end result, to be returned at the very end
Create an object to store visited vertices
Add the starting vertex to the stack, and mark it visited
While the stack has something in it:
Pop the next vertex from the stack
If that vertex hasn't been visited yet:
​Mark it as visited
Add it to the result list
Push all of its neighbors into the stack
Return the result array
*/
  depthFirstSearchIterative(start = Object.keys(this.adjacencyList)[0]) {
    if (!this.adjacencyList[start]) return [];

    const stack = new Stack();
    const result = [];
    const visited = {};
    stack.push(start);
    visited[start] = true;
    let currentVertex;
    while (stack.size) {
      currentVertex = stack.pop();
      result.push(currentVertex);

      for (const linkedVertex of this.adjacencyList[vertex]) {
        if (!visited[linkedVertex.value]) {
          visited[linkedVertex.value] = true;
          stack.push(linkedVertex.value);
        }
      }
    }

    return result;
  }
  /*
BREADTH FIRST
This function should accept a starting vertex
Create a queue (you can use an array) and place the starting vertex in it
Create an array to store the nodes visited
Create an object to store nodes visited
Mark the starting vertex as visited
Loop as long as there is anything in the queue
Remove the first vertex from the queue and push it into the array that stores nodes visited
Loop over each vertex in the adjacency list for the vertex you are visiting.
If it is not inside the object that stores nodes visited, mark it as visited and enqueue that vertex
Once you have finished looping, return the array of visited nodes
*/
  breadthFirstSearchIterative(start = Object.keys(this.adjacencyList)[0]) {
    if (!this.adjacencyList[start]) return [];

    const queue = [start];
    const result = [];
    const visited = {};
    let currentVertex;
    visited[start] = true;

    while (queue.length) {
      currentVertex = queue.shift();
      result.push(currentVertex);

      for (const linkedVertex of this.adjacencyList[vertex]) {
        if (!visited[linkedVertex.value]) {
          visited[linkedVertex.value] = true;
          queue.push(linkedVertex.value);
        }
      }
    }

    return result;
  }
  // Solution 2: using Queue
  breadthFirstSearchIterative(start = Object.keys(this.adjacencyList)[0]) {
    if (!this.adjacencyList[start]) return [];

    const queue = new Queue();
    const result = [];
    const visited = {};
    queue.enqueue(start);
    visited[start] = true;

    while (queue.size) {
      const vertex = queue.dequeue();
      result.push(vertex);

      for (const linkedVertex of this.adjacencyList[vertex]) {
        if (!visited[linkedVertex.value]) {
          visited[linkedVertex.value] = true;
          queue.enqueue(linkedVertex.value);
        }
      }
    }

    return result;
  }

  // a modified version of BFS that stores predecessor of each vertex and its distance from source
  findShortestDistanceUtil(start, end) {
    if (!this.adjacencyList[start]) return [];

    const queue = new Queue();
    const visited = {};
    const prev = {};
    const dist = {};
    queue.enqueue(start);
    visited[start] = true;
    dist[start] = 0;
    prev[start] = -1;

    while (queue.size) {
      const vertex = queue.dequeue();

      for (const linkedVertex of this.adjacencyList[vertex]) {
        if (!visited[linkedVertex.value]) {
          visited[linkedVertex.value] = true;
          dist[linkedVertex.value] = dist[vertex] + 1;
          prev[linkedVertex.value] = vertex;
          queue.enqueue(linkedVertex.value);

          if (linkedVertex.value === end)
            return { prev, distance: dist[linkedVertex.value] };
        }
      }
    }

    return {};
  }

  findShortestDistance(start, end) {
    const { prev, distance } = this.findShortestDistanceUtil(start, end);

    if (!prev || !distance) return null;

    const path = [];
    let vertex = end;
    while (prev[vertex] !== -1) {
      path.push(vertex);
      vertex = prev[vertex];
    }

    path.push(vertex);

    return { path: path.reverse(), distance };
  }
  /*
- Dijkstra
This function should return an object with two properties, the first being
the total distance and the second an array of nodes which create the shortest path.

Dijkstra's Pseudocode

This function should accept a starting and ending vertex
Create an object (we'll call it distances) and set each key to be every vertex in the adjacency list 
with a value of infinity, except for the starting vertex which should have a value of 0.
After setting a value in the distances object, add each vertex with a priority of Infinity to the 
priority queue, except the starting vertex, which should have a priority of 0 because that's where we begin.
Create another object called previous and set each key to be every vertex in the adjacency list with a value of null
Start looping as long as there is anything in the priority queue
dequeue a vertex from the priority queue
If that vertex is the same as the ending vertex - we are done!
Otherwise loop through each value in the adjacency list at that vertex
Calculate the distance to that vertex from the starting vertex
if the distance is less than what is currently stored in our distances object
update the distances object with new lower distance
update the previous object to contain that vertex
enqueue the vertex with the total distance from the start node
*/
  Dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = []; //to return at end
    let smallest;
    //build up initial state
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }
    // as long as there is something to visit
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      if (smallest === finish) {
        //WE ARE DONE
        //BUILD UP PATH TO RETURN AT END
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          //find neighboring node
          let nextNode = this.adjacencyList[smallest][neighbor];
          //calculate new distance to neighboring node
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          if (candidate < distances[nextNeighbor]) {
            //updating new smallest distance to neighbor
            distances[nextNeighbor] = candidate;
            //updating previous - How we got to neighbor
            previous[nextNeighbor] = smallest;
            //enqueue in priority queue with new priority
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    return path.concat(smallest).reverse();
  }

  // another solution
  dijkstra(start, end) {
    const priorityQueue = new PriorityQueue();
    const prev = { [start]: [null, 0] };
    const visited = {};
    const path = [];
    priorityQueue.enqueue(start, 0);

    while (!priorityQueue.isEmpty()) {
      const { value: vertex, priority: weight } = priorityQueue.dequeue();
      visited[vertex] = true;

      for (const linkedVertex of this.adjacencyList[vertex]) {
        if (!visited[linkedVertex.value]) {
          const newWeight = weight + linkedVertex.weight;

          if (!prev[linkedVertex.value] || prev[linkedVertex.value][1] > newWeight) {
            prev[linkedVertex.value] = [vertex, newWeight];
            priorityQueue.changePriority(linkedVertex.value, newWeight);
          }
        }
      }
    }

    let pathVertex = end;

    while (pathVertex) {
      path.push(pathVertex);
      pathVertex = prev[pathVertex][0];
    }

    return { path: path.reverse(), distance: prev[end][1] };
  }
  buildAdjacencyMatrix(vertices = Object.keys(this.adjacencyList)) {
    const verticesObj = vertices.reduce((obj, vertex, index) => {
      obj[vertex] = index;
      return obj;
    }, {});

    const matrix = Array.from({ length: vertices.length }, (row, i) =>
      Array.from({ length: vertices.length }, (elem, j) => (i === j ? 0 : Infinity))
    );

    for (let i = 0; i < vertices.length; i++) {
      for (let j = 0; j < this.adjacencyList[vertices[i]].length; j++) {
        matrix[i][
          verticesObj[this.adjacencyList[vertices[i]][j].value]
        ] = this.adjacencyList[vertices[i]][j].weight;
      }
    }

    return { matrix, verticesObj };
  }

  // Traveling Salesman Problem
  // Brute Force approach
  travelingSalesmanProblemBF(vertex) {
    const self = this;
    const paths = [];
    const vertices = Object.keys(this.adjacencyList);
    const numberOfVertices = vertices.length;
    const start = this.adjacencyList[vertex] ? vertex : vertices[0];

    function findPaths(vertex, visited = {}, path = []) {
      const currentPath = [...path];
      const currentVisited = { ...visited };
      currentPath.push(vertex);
      currentVisited[vertex] = true;

      const unvisitedLinkedVertices = self.adjacencyList[vertex].filter(
        (linkedVertex) => {
          return !visited[linkedVertex.value];
        }
      );

      if (
        !unvisitedLinkedVertices.length &&
        currentPath.length === numberOfVertices &&
        self.adjacencyList[vertex].some((linkedVertex) => linkedVertex.value === start)
      ) {
        currentPath.push(start);
        paths.push(currentPath);
      } else {
        for (const linkedVertex of unvisitedLinkedVertices) {
          findPaths(linkedVertex.value, currentVisited, currentPath);
        }
      }
    }

    findPaths(start);

    if (!paths.length) return { path: [], distance: null };

    let bestPath = [];
    let bestDistance = Infinity;
    const { matrix, verticesObj } = this.buildAdjacencyMatrix(vertices);

    for (const path of paths) {
      let currentDistance = 0;

      for (let i = 0; i < path.length - 1; i++) {
        currentDistance += matrix[verticesObj[path[i]]][verticesObj[path[i + 1]]];
      }

      if (currentDistance && bestDistance > currentDistance) {
        bestDistance = currentDistance;
        bestPath = path;
      }
    }

    return { path: bestPath, distance: bestDistance };
  }

  // Traveling Salesman Problem
  // Dynamic programming approach (top-down approach - memoization)
  travelingSalesmanProblemDP(vertex) {
    const vertices = Object.keys(this.adjacencyList);
    const numberOfVertices = vertices.length;
    const { matrix, verticesObj } = this.buildAdjacencyMatrix(vertices);
    const startIndex = verticesObj[vertex] || 0;
    const startState = 1 << startIndex;
    const VISITED_ALL_VERTICES = (1 << numberOfVertices) - 1;

    const memo = Array.from({ length: numberOfVertices }, () =>
      Array.from({ length: 1 << numberOfVertices }, () => null)
    );

    const prev = Array.from({ length: numberOfVertices }, () =>
      Array.from({ length: 1 << numberOfVertices }, () => null)
    );

    function findPath(state, position) {
      if (state === VISITED_ALL_VERTICES) return matrix[position][startIndex];

      if (memo[position][state]) return memo[position][state];

      let bestDistance = Infinity;
      let bestIndex = null;

      for (let indexOfVertex = 0; indexOfVertex < numberOfVertices; indexOfVertex++) {
        if ((state & (1 << indexOfVertex)) === 0) {
          const currentDistance =
            matrix[position][indexOfVertex] +
            findPath(state | (1 << indexOfVertex), indexOfVertex);

          if (currentDistance < bestDistance) {
            bestDistance = currentDistance;
            bestIndex = indexOfVertex;
          }
        }
      }

      memo[position][state] = bestDistance;
      prev[position][state] = bestIndex;

      return bestDistance;
    }

    const distance = findPath(startState, startIndex);

    if (distance === Infinity) return { path: [], distance: null };

    let path = [];
    let currentIndex = startIndex;
    let currentState = startState;

    while (true) {
      path.push(currentIndex);
      currentIndex = prev[currentIndex][currentState];
      if (currentIndex === null) break;
      currentState = currentState | (1 << currentIndex);
    }

    path.push(startIndex);

    path = path.map((item) => vertices[item]);

    return { path, distance };
  }
}

module.exports = Graph;
