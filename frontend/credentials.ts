export const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};
echo 'export API_KEY="AIzaSyDX8gLnFkXmqZgAyxelm_Oe8nBuVEVdI8Q"' >> ~/.bashrc
echo 'export AUTH_DOMAIN="astral-shape-402017.firebaseapp.com"' >> ~/.bashrc
echo 'export DATABASE_URL="https://astral-shape-402017-default-rtdb.asia-southeast1.firebasedatabase.app"' >> ~/.bashrc
echo 'export PROJECT_ID="astral-shape-402017"' >> ~/.bashrc
echo 'export STORAGE_BUCKET="astral-shape-402017.appspot.com"' >> ~/.bashrc
echo 'export MESSAGING_SENDER_ID="508111642693"' >> ~/.bashrc
echo 'export APP_ID="1:508111642693:web:5052057c67f03236b6832c"' >> ~/.bashrc
source ~/.bashrc