const assert = require("assert");
const firebase = require("@firebase/testing");

const PROJECT_ID = "naily-c16f5";
const FIREBASE_AUTH_EMULATOR = "http://localhost:4000/auth"


const mockUser = {
  email: 'abc@gmail.com',
  password: "12345"
}

const getAuth = firebase => {
  const auth = firebase.auth()
  auth.useEmulator(authEmulator)
  return auth
}

const getFireBase = (mockAuth) => {
  return firebase.initializeTestApp({projectId: PROJECT_ID, auth: mockAuth})
}

const getFireBaseAdmin = () => {
  return firebase.initializeAdminApp({apiKey: config.apiKey, projectId: PROJECT_ID})
}

const getFireStore = firebase => {
  if(firebase != null){
    return firebase.firestore()
  } else {
    return firebase.initializeTestApp({projectId: PROJECT_ID, auth: mockAuth}).firestore()
  }
}


//TESTS

