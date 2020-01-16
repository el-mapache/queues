import { expect } from 'chai';
import sinon from 'sinon';
import BinaryHeap from '../src/binary-heap';
import priorityQueue, {
  defaultConfiguration,
  PriorityQueue,
  STATUS_MESSAGES
} from '../src/priority-queue';

describe('PriorityQueue', () => {
  const sandbox = sinon.createSandbox();

  beforeEach(() => {
    sandbox.stub(console, 'warn');
  });

  afterEach(() => {
    sandbox.restore();
  })

  describe('instantiation', () => {
    it('makes an instance of PriorityQueue', () => {
      const queue = priorityQueue();
  
      expect(queue instanceof PriorityQueue).to.be.true;
    });
  
    it('warns the user if a comparator function is not supplied', () => {
      priorityQueue();
  
      expect(console.warn.calledOnce).to.be.true;
      expect(console.warn.getCall(0).args[0]).to.equal(STATUS_MESSAGES.NO_COMPARATOR);
    });
  
    it('does not set properties on the Queue that are not explicity defined in the default configs', () => {
      const queue = priorityQueue({ invalid: 'hello' });
  
      expect(queue.invalid).to.equal(undefined);
    });
  
    it('sets all default config properties on instantiation', () => {
      const queue = priorityQueue();
  
      Object.keys(defaultConfiguration).forEach(prop => 
        expect(queue[prop]).to.not.be.undefined  
      );
    });

    it('initializes its defaults properly', () => {
      const queue = priorityQueue();

      expect(queue.activeWorkers).to.equal(0);
      expect(queue.queue instanceof BinaryHeap).to.be.true;
      expect(queue.working).to.be.false;
    });
  });

  describe('.push', () => {
    it('adds a function to the queue', () => {
      const queue = priorityQueue();
      const func = () => ({});

      queue.push(func);

      expect(queue.queue.size()).to.equal(1);
    });

    it('inserts elements into the correct order', () => {
      const queue = priorityQueue();
    });
  })
});
