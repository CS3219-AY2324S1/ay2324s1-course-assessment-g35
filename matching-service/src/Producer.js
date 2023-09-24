import amqplib from 'amqplib';

const exchangeName = "msToFe";
let connection; // Maintain a global connection variable.
let channel; // Maintain a global channel variable.

// Function to establish the connection and channel (if not already established).
const initializeProducerConnection = async () => {
  if (!connection) {
    // connection = await amqplib.connect('amqp://localhost');
    connection = await amqplib.connect('amqp://user:MgdnlgaOd0GvetRe@35.240.204.186:5672');
  }
  if (!channel) {
    channel = await connection.createChannel();
  }
  await channel.assertExchange(exchangeName, 'direct', { durable: true });
};

// Function to close the connection and channel gracefully.
export const closeProducerConnection = async () => {
  if (channel) {
    await channel.close();
    channel = null;
  }
  if (connection) {
    await connection.close();
    connection = null;
  }
};

export const initConnectionAndSendMatchingNotification = async (routingKey1, routingKey2) => {
  const msg1 = `You have been matched with ${routingKey2}`;
  const msg2 = `You have been matched with ${routingKey1}`;
  // Ensure that the connection and channel are established.
  await initializeProducerConnection();
  // Publish a message to the exchange.
  channel.publish(exchangeName, routingKey1, Buffer.from(msg1));
  channel.publish(exchangeName, routingKey2, Buffer.from(msg2));
  console.log('Sent: ', msg1);
  console.log('Sent: ', msg2);
};
