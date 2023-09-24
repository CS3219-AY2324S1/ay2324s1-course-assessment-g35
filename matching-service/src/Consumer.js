import amqplib from 'amqplib';
import { initConnectionAndSendMatchingNotification } from './Producer.js';

const queueName = "feToMs";
let connection;
let channel;

let easyId;
let mediumId;
let hardId;

const initializeConsumerConnection = async () => {
  if (!connection) {
    // connection = await amqplib.connect('amqp://localhost');
    connection = await amqplib.connect('amqp://user:MgdnlgaOd0GvetRe@35.240.204.186:5672');
  }
  if (!channel) {
    channel = await connection.createChannel();
  }
  await channel.assertQueue(queueName, {durable: true});
};

export const initConnectionAndConsumeMatchingRequests = async () => {
  await initializeConsumerConnection();
  channel.prefetch(1); // Set the maximum number of unacknowledged messages to 1
  console.log(`Waiting for messages in queue: ${queueName}`);
  channel.consume(queueName, msg => {
    console.log("[X] Received:", msg.content.toString());
    processMatchingRequest(msg.content.toString());
    channel.ack(msg);
  }, {noAck: false}) // messages should not be automatically acknowledged
};

const processMatchingRequest = (msg) => {
  const { id, difficulty, matchingBoolean } = JSON.parse(msg);

  const idWord = (difficulty === 'easy' && !easyId) || (difficulty === 'medium' && !mediumId) || (difficulty === 'hard' && !hardId)
    ? 'unoccupied' : 'occupied';

  const matchingWord = matchingBoolean ? 'match' : 'unmatch';

  const combinedValue = `${idWord}-${difficulty}-${matchingWord}`;

  switch (combinedValue) {
    case 'occupied-easy-match':
      initConnectionAndSendMatchingNotification(id, easyId);
      easyId = null;
      break;
    case 'unoccupied-easy-match':
      easyId = id;
      break;
    case 'occupied-medium-match':
      initConnectionAndSendMatchingNotification(id, mediumId);
      mediumId = null;
      break;
    case 'unoccupied-medium-match':
      mediumId = id;
      break;
    case 'occupied-hard-match':
      initConnectionAndSendMatchingNotification(id, hardId);
      hardId = null;
      break;
    case 'unoccupied-hard-match':
      hardId = id;
      break;
    case 'occupied-easy-unmatch':
      easyId = null;
      break;
    case 'occupied-medium-unmatch':
      mediumId = null;
      break;
    case 'occupied-hard-unmatch':
      hardId = null;
      break;
    case 'unoccupied-easy-unmatch':
    case 'unoccupied-medium-unmatch':
    case 'unoccupied-hard-unmatch':
      console.log('Invalid unmatching', combinedValue);
      break
    default:
      console.log('Invalid combined value', combinedValue);
  }
};

export const closeConsumerConnection = async () => {
  if (channel) {
    await channel.close();
    channel = null;
  }
  if (connection) {
    await connection.close();
    connection = null;
  }
};
