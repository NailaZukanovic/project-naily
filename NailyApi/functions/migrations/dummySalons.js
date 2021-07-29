const randomPhoneNumber = () => {
  return Math.random().toString().slice(2, 11);
}

const randomInt = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const randomSentence = () => {
  var sentences= [
    'so fat not even Dora can explore her',
    'so  fat I swerved to miss her and ran out of gas',
    'so smelly she put on Right Guard and it went left',
    'so fat she hasn’t got cellulite, she’s got celluheavy',
    'so fat she don’t need no internet – she’s already world wide',
    'so hair her armpits look like Don King in a headlock',
    'so classless she could be a Marxist utopia',
    'so fat she can hear bacon cooking in Canada',
    'so fat she won “The Bachelor” because she all those other bitches',
    'so stupid she believes everything that Brian Williams says',
    'so ugly she scared off Flavor Flav',
    'is like Domino’s Pizza, one call does it all',
    'is twice the man you are',
    'is like Bazooka Joe, 5 cents a blow',
    'is like an ATM, open 24/7',
    'is like a championship ring, everybody puts a finger in her'
  ]

  return sentences[randomInt(sentences.length - 1)]

}

const generateRandomAddress = count => {
  let streetNumber = Math.random().toString().slice(2, 6)
  let street = `WhaeverStreet${count}`
  let city = `NewCity${count}`
  let state = 'NY'
  let zip = Math.random().toString().slice(2, 7)

  return [streetNumber + " " + street, city, state, zip].join(', ')
}

const randomReviews = () => {
  let count = randomInt(20)
  var reviews = []
  for (var i = 0; i < count; i++) {
    reviews.push({
      content: randomSentence(),
      likes: randomInt(5000),
      dislikes: randomInt(5000),
      author: `RandomAuthor${count}`
    })
  }
  return reviews
}

const randomProducts = (salonName) => {
  let count = randomInt(15, 5)
  products = []
  for (var i = 0; i < count; i++) {
    products.push({
      name: `NewProduct${i}-${salonName}`,
      likes: randomInt(10000),
      duration: randomInt(120),
      reviews: randomReviews(),
      imageUrl: [`https://url${i}_image.jpg`]
    })
  }
  return products
}

const generateDummySalon = (count, followingUserIds = [], workerSnapShots = [], imageUrls = []) => {
  salons = []
  for (var i = 0; i < count; i++) {
    salons.push({
      name: `NewSalonInTown${count}`,
      address: generateRandomAddress(count),
      phonenumber: randomPhoneNumber(),
      products: randomProducts(`NewwSalonInTown${count}`),
      reviews: randomReviews(),
      followingUserIds: followingUserIds,
      workerSnapShots:workerSnapShots,
      imageUrls: imageUrls
      })
  }
  return salons
}
module.exports = generateDummySalon(1)
