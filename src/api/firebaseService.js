import firebase from "firebase";
import firebaseApp from "./firebaseAPIs";

function AuthService() {}

AuthService.prototype.login = (providerName) => {
  const authProvider = new firebase.auth[`${providerName}AuthProvider`]();
  return firebaseApp.auth().signInWithPopup(authProvider);
};

AuthService.prototype.logout = () => {
  firebase.auth().signOut();
};

AuthService.prototype.onAuthChange = (callback) => {
  firebase.auth().onAuthStateChanged((user) => {
    callback(user);
  });
};

export default AuthService;
