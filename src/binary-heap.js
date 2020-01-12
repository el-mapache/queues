/**
 * Minimum key binary heap. The smallest key
 * is in front, and therefore will be processed
 * first.
 *
 * In a binary heap, the parent of any node (element in the list)
 * can be found by dividing that element's index by 2.
 * And, because we can divide by 2, we can speed up lookups
 * with a right-shift of 1.
*/
class BinaryHeap {
  constructor() {
    // The heap is initialized with a single zero as
    // the first element in the list of items.
    // This is done so that integer division will
    // properly resolve the parent of a given node.
    this.items = [0]
  }

  propagateUp(index) {
    while ((index >> 1) > 0) {
      const node = this.items[index];
      const parentNode = this.items[index >> 1];

      if (node < parentNode) {
        this.items[index >> 1] = node;
        this.items[index] = parentNode;
      }

      index = index >> 1;
    }
  }

  /**
   * Add an element to the heap. Preserves heap order.
   * @param {*} element The element to add to the heap
   */
  insert(element) {
    this.items.push(element);
    this.propagateUp(this.size())
  }

  /**
   * Get the parent node of a child
   * @param {Number} index The index of the child for whose parent we are searching for.
   * 
   * @returns {*} The parent node
   */
  findParentNode(index) {
    return this.items[index >> 1];
  }

  /**
   * Get the first item in the heap. Does not remove it.
   * 
   * @returns {*} The first element of the heap
   */
  findMin() {
    return this.items[1];
  }

  /**
   * Removes the last (largest) element in the heap
   * 
   * @returns {*} The last element in the heap
   */
  delMax() {
    return this.items.pop();
  }

  minChild(parentIndex) {
    // The parent node is the terminal parent in the tree,
    // and it has only one child, so return that child's index
    if (parentIndex * 2 + 1 > this.items.length) {
      return parentIndex * 2;
    }

    // The parent node's left child is smaller than the right child,
    // so that is the minimum child to be returned
    if (this.items[parentIndex * 2] < this.items[parentIndex * 2 + 1]) {
      return parentIndex * 2;
    }

    // The right child of the parent node is the smallest, so return its index
    return parentIndex * 2 + 1;
  }

  propagateDown(index) {
    while ((index * 2) <= this.items.length) {
      const smallest = this.minChild(index);

      if (this.items[index] > this.items[smallest]) {
        const temp = this.items[index];
        this.items[index] = this.items[smallest];
        this.items[smallest] = temp;
      } 
      
      index = smallest;
    }
  }

  /**
   * Removes the smallest element (first) in the heap.
   * Rebalances the heap afterwards to preserve the proper order.
   * 
   * @returns {*} The first item in the heap
   */
  delMin() {
    const first = this.findMin();
    this.items[1] = this.delMax();
    this.propagateDown(1);
    
    return first;
  }

  /**
   * Helper methoid to determine if the list is empty
   * 
   * @returns {Boolean} Whether the list is empty or not
   */
  isEmpty() {
    return !this.size();
  }

  /**
   * The number of items in the list, less the placeholder 0th element
   * 
   * @returns {Number} The number of items in the list, less 1
   */
  size() {
    return this.items.length - 1;  
  }

  /**
   * Update the items list with a list of new values
   * @param {Array} list The values to be inserted into the binary heap
   */
  build(list) {
    this.items = this.items.concat(list);

    let i = this.items.length >> 1;

    while (i > 0) {
      this.propagateDown(i)
      i -= 1;
    }
  }
}

export default BinaryHeap;
