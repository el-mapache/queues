/**
 * Define some common operations. The fact that these are functions almost
 * certainly slows down the rebalancing operations, but assuming the heap sizes are
 * relatively small and not used for e.g. graphics or audio processing,
 * the cost of looking up and calling these functions should be minimal.
 * Technically a perf. test should be tried.
 */
const resolveParentIndex = i => i >> 1;
const getLeftChildIndex = i => i << 1;
const getRightChildIndex = i => getLeftChildIndex(i) + 1;

// es6 swap
const swap = (list, a, b) => [ list[a], list[b] ] = [ list[b], list[a] ];

/**
 * Default comparator function to determine if the first node is the minimum
 * value node. This is only useful if you are using the binary heap to store
 * integers, which would probably be of dubious value. This method should
 * be overwritten by all implementations that need to store additional data.
 *
 * @param {Number} a The node we think might be the 'minimum value' node
 * @param {Number} b Another node whose value we want to compare
 * @returns {Boolean} Whether the first node is the minimum value node.
 */
const isMinValue = (a, b) => a < b;

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
  constructor(comparator = isMinValue) {
    // The heap is initialized with a single zero as
    // the first element in the list of items.
    // This is done so that integer division will
    // properly resolve the parent of a given node.
    this.items = [0];
    this.compareNodes = comparator;
  }

  /**
   * When a node is inserted into the heap, it is not guaranteed to be
   * in the correct spot. If the node resolves to a higher priority than
   * its parent, we swap the inserted node with the parent node. This
   * operation continues until the node has been placed in the correct
   * position in the heap.
   * @param {Number} index The current index of the node to be moved up.
   */
  propagateUp(index) {
    while (resolveParentIndex(index) > 0) {
      const node = this.items[index];
      const parentNode = this.items[resolveParentIndex(index)];

      if (this.compareNodes(node, parentNode)) {
        this.items[resolveParentIndex(index)] = node;
        this.items[index] = parentNode;
      }

      index = resolveParentIndex(index);
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
    return this.items[resolveParentIndex(index)];
  }

  /**
   * Get the first item in the heap. Does not remove it.
   * 
   * @returns {*} The first element of the heap
   */
  peek() {
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

  /**
   * Given a node's index, the the index of its smallest child.
   * @param {Number} parentIndex The index of the node who's minimum child we want to find
   * @returns {Number} The index of the smallest child value
   */
  minChild(parentIndex) {
    const leftIndex = getLeftChildIndex(parentIndex);
    const rightIndex = getRightChildIndex(parentIndex);

    // The parent node is the terminal parent in the tree,
    // and it has only one child, so return that child's index
    if (rightIndex > this.items.length) {
      return leftIndex;
    }

    // The parent node's left child is smaller than the right child,
    // so that is the minimum child to be returned
    if (this.items[leftIndex] < this.items[rightIndex]) {
      return leftIndex;
    }

    // The right child of the parent node is the smallest, so return its index
    return rightIndex;
  }

  /**
   * Rebalance the heap after a node is taken from the top. Ensures the
   * top item is the smallest number (highest priority)
   * @param {Number} index Move a node down, swapping with its children
   *
   */
  propagateDown(index) {
    while ((index * 2) <= this.items.length) {
      const smallest = this.minChild(index);

      if (this.compareNodes(this.items[smallest], this.items[index])) {
        swap(this.items, index, smallest);
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
    const first = this.peek();
    this.items[1] = this.delMax();
    this.propagateDown(1);
    
    return first;
  }

  /**
   * Helper method to determine if the list is empty
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
