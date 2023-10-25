import jwt from 'jsonwebtoken';

const KEY = process.env.JWT_KEY || "SECRET";

const authenticateSocket = (socket, next) => {
  const token = socket.handshake.auth.token;

  if (!token) {
    return next(new Error('Authentication failed: Token missing'));
  }

  jwt.verify(token.replace("Bearer ", ""), KEY, (err, decoded) => {
    if (err) {
      return next(new Error('Authentication failed: Invalid token'));
    }

    // attach the decoded token or user information to the socket for future use
    socket.decoded = decoded;

    next();
  });
};

export default authenticateSocket;
