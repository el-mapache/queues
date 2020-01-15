import BinaryHeap from './binary-heap';

const defaultConfiguration = {
  // When true, the queue will begin processesing items as soon as it receives them.
  // When false, the queue will wait until the `dequeue` method has been called.
  eager: false,
  fnDelay: 0,
  logDelimiter: '::',
  // The maximum number of workers the queue can spawn
  maxWorkers: 1,
  name: 'Queue',
  // time to wait in ms before processing the next item in the queue
  paused: false,
  // Whether the queue should output logging information
  verbose: true,
};

const STATUS_MESSAGES = {
  NO_COMPARATOR: 'No comparator function was supplied. This function should be supplied unless you really want the queue to store only integers.'
};

const isValidConfigOption = (key) => key in defaultConfiguration;

/**
 * @class PriorityQueue
 * Interface wrapping a binary heap. Exposes a set of methods that
 * hopefully make it easy to schedule and process units of work.
 * 
 * All items passed to this queue must be functions, and they must implement
 * the Promise interface. Callback style function signatures aren't supported
 * because:
 *  1). I don't want to make any assumptions about function signature
 *  2). I don't want to have to perform additional tests to check if any of the
 *      extra params supplied to a function are themselves functions, and them
 *      being so doesn't guarantee that they are callbacks.
 *  3). The Promise interface is a standard and is pretty nice!
 * All executed function will be passed to Promise.resolve(), so callers can
 * always use .then call to get data back from the functions they supplied, fire
 * off any side-effects, or throw an error to a .catch if something goes wrong.
 * 
 * Functions WILL be wrapped in a PriorityQueueNode interface internally, so that
 * they can be easily de-referenced from the data structure holding them.
 * 
 */
class PriorityQueue {
  constructor(configs = {}) {
    const options = {
      ...defaultConfiguration,
      ...configs
    };

    if (!options.comparator) {
      console.warn(STATUS_MESSAGES.NO_COMPARATOR);
    }

    /**
     * Set supplied configuration options as proeprties of the queue.
     * If an unsupported option is passed, ignore it.
    */
    Object.entries(options).forEach(([key, value]) => {
      if (isValidConfigOption(key)) {
        this[key] = value;
      }
    });

    this.activeWorkers = 0;
    this.queue = new BinaryHeap(options.comparator);
    this.working = false;

    this.dequeue = this.dequeue.bind(this);
  }

  push(handler, context = null, ...args) {}
  dequeue() {}
  process() {}
}

const factory = (configs) => {
  return new PriorityQueue(configs);
}

export {
  STATUS_MESSAGES,
  defaultConfiguration,
  PriorityQueue
};
export default factory;
