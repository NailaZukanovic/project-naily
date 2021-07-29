// const firebase = require("firebase");
const axios = require('axios')
const express = require('express');
const request = require("supertest");
// const bodyParser = require('body-parser')
const assert = require('assert')
const { isSignedIn } = require('../../middlewares/firebaseAuth');

const PROJECT_ID = "naily-c16f5";
const FAKE_API_KEY = "naily-c16f5";
const FIREBASE_AUTH_EMULATOR = "http://localhost:9099"

jest.setTimeout(30000)

const clearUserRecords = async () => {
  await axios.delete(`http://localhost:9099/emulator/v1/projects/${PROJECT_ID}/accounts`).then(response => {
  })
}

const clearFireStore = async () => {
  await axios.delete(`http://localhost:8080/emulator/v1/projects/${PROJECT_ID}/databases/(default)/documents`)
}

const USER_ID = "123456789"

//TESTS
beforeAll(() => {
  clearUserRecords()
  clearFireStore()
})


describe("/POST Create profile", () => {

  const { createProfile } = require("./profile");
  let app;

  beforeAll(done => {

    app = express()
    app.use(express.json())
    app.post('/createProfile', (req, res, next) => {
      req.currentUser = { uid: USER_ID }
      next()
    }, createProfile)
    done()
  })

  test("Create profile only when logged in", async () => {
    const profile = {
      username: 'profiletest',
      firstname: 'profileFirstnameTest',
      lastname: 'profileLastnameTest',
      phonenumber: '123456789',
      createdAt: new Date().toISOString()
    }
    // assert(1,1)
    await request(app).post('/createProfile')
      .send(profile)
      .expect(200)
      .then(response=>{
        console.log(response.message)
      })
  })

})
afterAll(() => {
  clearUserRecords()
  clearFireStore()
})