const config = require('./config') 

const randomPhoneNumber = () => {
  return Math.random().toString().slice(2,11); 
}

const dummyProfileGenerator = count =>{ 
  profiles = []
  for(var i = 0;i<count;i++){
    profiles.push({
      username: `username${i}`,
      firstname: `FirstNameOfUser${i}`,
      lastname: `LastNameOfUser${i}`,
      phonenumber: randomPhoneNumber() 
    })
  }
  return profiles
}

module.exports = dummyProfileGenerator(config.dummyAccountCount)

