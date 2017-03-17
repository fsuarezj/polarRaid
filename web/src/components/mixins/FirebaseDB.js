import Firebase from 'firebase'

let config = {
  apiKey: "AIzaSyBrnMRULFyfa0H7mDcQ3Yb22QyJtBEHSd0",
  authDomain: "my-vue2-firebase.firebaseapp.com",
  databaseURL: "https://my-vue2-firebase.firebaseio.com",
  storageBucket: "my-vue2-firebase.appspot.com",
  messagingSenderId: "282000909832"
};

let app = Firebase.initializeApp(config);
let firebaseDB = app.database();

export const getFirebaseRef = function(ref) {
  return firebaseDB.ref(ref);
}
