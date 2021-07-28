const assert = require("assert");
const firebase = require("firebase");
const axios = require('axios')

const PROJECT_ID = "naily-c16f5";
const FAKE_API_KEY = "naily-c16f5";
const FIREBASE_AUTH_EMULATOR = "http://localhost:9099"

const mockUser = {
  email: 'profile.spec.test()@gmail.com',
  password: "123456"
}

const initFirebase = () => {
  return firebase.initializeApp({projectId: PROJECT_ID, apiKey: FAKE_API_KEY})
}

const getAuth = fb => {
  const auth = fb.auth()
  auth.useEmulator(FIREBASE_AUTH_EMULATOR)
  return auth
}

const clearUserRecords = () => {
  axios.delete(`http://localhost:9099/emulator/v1/projects/${PROJECT_ID}/accounts`).then(response => {
  })
}

//TESTS
beforeAll(()=>{
  clearUserRecords()
})
describe("/POST Create profile", () => {
  let auth;
  let fb;
  let uid;
  beforeAll(()=>{
    fb = initFirebase()
    auth = getAuth(fb)
  })
  test("User signs up", async ()=>{
    await auth.createUserWithEmailAndPassword(mockUser.email, mockUser.password)
    .then(data=>{
      uid = data.user.uid
      assert.ok("Signed up successfully")
    }).catch(err=>{
      assert.fail(`${err.code}: ${err.message}`)
    })
  })

})
afterAll(()=>{
  clearUserRecords()
})