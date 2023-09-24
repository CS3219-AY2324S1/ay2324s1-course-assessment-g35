import { closeConsumerConnection, initConnectionAndConsumeMatchingRequests } from './Consumer.js';
import { closeProducerConnection } from './Producer.js';

async function main() {
  try {
    await initConnectionAndConsumeMatchingRequests();
  } catch (error) {
    console.error('Error:', error);
  }

  // Listen for process exit events to close the connection when the application exits.
  process.on('exit', () => {
    closeConsumerConnection();
    closeProducerConnection();
  });
}

main();
