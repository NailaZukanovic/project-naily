const accountGenerator = count => {
  accounts = []
  for(var i = 0;i < count;i++){
    accounts.push({
      email: `account${i}@email.com`,
      password: `dummyaccountpassword${i}`
    })
  }
  return accounts
}

module.exports = accountGenerator(20)
