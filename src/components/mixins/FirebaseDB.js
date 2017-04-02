import Firebase from 'firebase'

let configTest = {
  apiKey: "AIzaSyBrnMRULFyfa0H7mDcQ3Yb22QyJtBEHSd0",
  authDomain: "my-vue2-firebase.firebaseapp.com",
  databaseURL: "https://my-vue2-firebase.firebaseio.com",
  storageBucket: "my-vue2-firebase.appspot.com",
  messagingSenderId: "282000909832"
};

let configPolarRaidBeta = {
  apiKey: "AIzaSyAFs_c-JhZrYY8RoJtqKcxSIfaZQvJ8VVw",
  authDomain: "polarraid-83d2f.firebaseapp.com",
  databaseURL: "https://polarraid-83d2f.firebaseio.com",
  projectId: "polarraid-83d2f",
  storageBucket: "polarraid-83d2f.appspot.com",
  messagingSenderId: "609239958081"
};


export const getFirebaseRef = function(ref, config = configTest) {
  let app = Firebase.initializeApp(config);
  let firebaseDB = app.database();
  return firebaseDB.ref(ref);
}
