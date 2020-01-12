import { expect } from 'chai';
import BinaryHeap from '../src/binary-heap';

describe('BinaryHeap', () => {
  let heap;

  beforeEach(() => {
    heap = new BinaryHeap();
  });

  afterEach(() => {
    heap = null;
  });

  it('is an instance of BinaryHeap', () => {
    expect(heap instanceof BinaryHeap).to.be.true;
  });

  it('initializes itself with a initial empty item of 0', () => {
    expect(heap.items[0]).to.equal(0);
  });

  describe('.size', () => {
    it('returns its size minus the placeholder element', () => {
      expect(heap.size()).to.equal(0);
    });
  });

  describe('.insert', () => {
    it('inserts smaller elements above its initial parent node', () => {
      heap.build([
        5, 9, 11, 14, 18, 19, 21, 33, 17, 40, 7
      ]);

      expect(heap.items).to.deep.equal([0, 5, 7, 11, 14, 9, 19, 21, 33, 17, 40, 18]);
    });
  });

  describe('.isEmpty', () => {
    it('returns true if there are no items in the heap', () => {
      expect(heap.isEmpty()).to.be.true;
    });

    it('returns false if there are items in the heap', () => {
      heap.insert(1);

      expect(heap.isEmpty()).to.be.false;
    });
  });

  describe('.delMin', () => {
    beforeEach(() => {
      heap.build([
        5, 9, 11, 14, 18, 19, 21, 33, 17, 27
      ])
    });

    it('returns the smallest element', () => {  
      expect(heap.delMin()).to.equal(5);
      expect(heap.findMin()).to.equal(9);
    });

    it('preserves the order of the heap', () => {
      heap.delMin();
      expect(heap.items[heap.size() >> 1]).to.equal(17);
    });
  });

  describe('.build', () => {
    it('creates a valid binary heap given an array of elements', () => {
      heap.build([ 5, 11, 9, 14, 21, 18]);
      expect(heap.items).to.deep.equal([
        0, 5, 11, 9, 14, 21, 18
      ]);
    });
  });

  describe('.findMin', () => {
    it('returns the first item in the list, without removing it', () => {
      heap.build([5,9,11]);

      expect(heap.findMin()).to.equal(5);
      expect(heap.items[1]).to.equal(5);
    });
  });

  describe('.delMax', () => {
    it('returns the last element in the list, and removes it', () => {
      heap.build([5,9,11,33]);
      
      expect(heap.delMax()).to.equal(33);
      expect(heap.items[heap.size()]).to.equal(11);
    });
  });
});
