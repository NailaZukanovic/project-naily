const assert = require("assert");
const firebase = require("firebase")
const axios = require('axios')

const PROJECT_ID = "naily-c16f5";
const FAKE_API_KEY = "naily-c16f5"
const FIREBASE_AUTH_EMULATOR = "http://localhost:9099"

const mockUser = {
  email: 'abc@gmail.com',
  password: "123456"
}

const getAuth = firebase => {
  const auth = firebase.auth()
  auth.useEmulator(FIREBASE_AUTH_EMULATOR)
  return auth
}

const getFireBase = (mockAuth) => {
  return firebase.initializeApp({projectId: PROJECT_ID, apiKey: FAKE_API_KEY})
}

const getFireStore = firebase => {
  if(firebase != null){
    return firebase.firestore()
  } else {
    return firebase.initializeTestApp({projectId: PROJECT_ID, auth: mockAuth}).firestore()
  }
}

let auth;

const initFireBase = () => {
  const fb = getFireBase(null)
  auth = getAuth(fb)
}

const clearUserRecords = () => {
  axios.delete(`http://localhost:9099/emulator/v1/projects/${PROJECT_ID}/accounts`).then(response => {
  })
}

before(()=>{
  initFireBase()
  clearUserRecords()
})

//TESTS
describe("Testing auth  routes ... ", () => {
  
    it("Sign up user", async ()=>{
      await auth.createUserWithEmailAndPassword(mockUser.email, mockUser.password)
      .then(data=>{
        assert.ok('success')
      }).catch(err=>{
        assert.fail(err)
      })
    })

    it("Sign in user", async () => {
      await auth.signInWithEmailAndPassword(mockUser.email, mockUser.password)
      .then(data=>{
        assert.ok('success')
      }).catch(err=>{
        assert.fail(err)
      })
    })
})

after(()=>{
  clearUserRecords()
})
