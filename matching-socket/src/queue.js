export class Queue {
  constructor() {
    this.items = [];
  }

  // Add an element to the end of the queue
  enqueue(item) {
    console.log("adding to queue", item);
    this.items.push(item);
    console.log(this.items);
  }

  // Remove and return the element from the front of the queue
  dequeue() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items.shift();
  }

  // Return the element at the front of the queue without removing it
  front() {
    if (this.isEmpty()) {
      return "Queue is empty";
    }
    return this.items[0];
  }

  remove(socketIdToRemove) {
    // check for object with same socketid and remove it
    const index = this.items.findIndex((item) => item.id === socketIdToRemove);
    if (index !== -1) {
      this.items.splice(index, 1);
      console.log(`Removed item: ${socketIdToRemove}`);
    } else {
      console.log(`Item not found in the queue: ${socketIdToRemove}`);
    }
  }

  // Check if the queue is empty
  isEmpty() {
    return this.items.length === 0;
  }

  // Return the number of elements in the queue
  size() {
    return this.items.length;
  }

  // Print the elements of the queue
  print() {
    console.log("matchingQueue: ", this.items);
  }
}
