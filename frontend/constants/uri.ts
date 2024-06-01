// constants for api uris

// const USERSERVICE_URI = "http://localhost:8000";
const USERSERVICE_URI = "http://34.126.107.52:8000";

// const QUESTIONSERVICE_URI = "http://localhost:8001";
// const QUESTIONSERVICE_URI = "http://34.142.159.230:8000";
// const QUESTIONSERVICE_URI = "http://34.87.154.0:8000";
const QUESTIONSERVICE_URI = "http://34.142.252.141:8000";

export const MATCHINGSERVICE_URI = "http://34.87.167.153:3001";

// export const CHATSERVICE_URI = 'http://localhost:3002';
export const CHATSERVICE_URI = "http://34.87.120.71:3002";

// const HISTORYSERVICE_URI = "http://localhost:8002";
const HISTORYSERVICE_URI = "http://34.126.71.94:8000";



export const USER_URI = {
  LOGIN: `${USERSERVICE_URI}/login`,
  REGISTER: `${USERSERVICE_URI}`,
  LOGOUT: `${USERSERVICE_URI}/logout`,
  EDIT: `${USERSERVICE_URI}/edit`,
  DELETE: `${USERSERVICE_URI}`,
  GET_TOKEN: `${USERSERVICE_URI}`,
  VERIFY_TOKEN: `${USERSERVICE_URI}/verify`,
  RETRIEVE: `${USERSERVICE_URI}/retrieve`,
};

export const QUESTION_URI = {
  GET_RANDOM_QUESTION: `${QUESTIONSERVICE_URI}/random-difficulty`,
  GET_BY_ID: `${QUESTIONSERVICE_URI}/id`,
};

export const HISTORY_URI = {
  GET_ALL: `${HISTORYSERVICE_URI}/all`,
  GET_BY_USERNAME: `${HISTORYSERVICE_URI}/getUserHistory`,
  CREATE_OR_UPDATE: `${HISTORYSERVICE_URI}/create`,
};
