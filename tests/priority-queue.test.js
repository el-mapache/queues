import { expect } from 'chai';
import sinon from 'sinon';
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

  it('instantiates an instance of PriorityQueue', () => {
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
});
