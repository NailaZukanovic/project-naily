import uuid from 'react-native-uuid';

const discoverySalons = [
  {
    id: uuid.v4(),
    // id: 1,
    salon: 'ProNail',
    likes: 123456,
    comments: 1123,
    isReserved: 1,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./images/salon1.jpeg'),
  },
  {
    id: uuid.v4(),
    // id: 2,
    salon: 'Happy Nail',
    likes: 123456,
    comments: 1123,
    isReserved: 1,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./images/salon2.jpeg'),
  },
  {
    id: uuid.v4(),
    // id: 3,
    salon: 'Nail For Life',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./images/salon3.jpeg'),
  },
  {
    id: uuid.v4(),
    // id: 4,
    salon: 'ProNail',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./images/salon4.jpeg'),
  },
  {
    id: uuid.v4(),
    // id: 5,
    salon: 'ProNail',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./images/salon5.jpeg'),
  },
  {
    id: uuid.v4(),
    // id: 6,
    salon: 'Professional Nail ',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./images/salon6.jpeg'),
  },
  {
    id: uuid.v4(),
    // id: 7,
    salon: 'ProNail',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./images/salon7.jpeg'),
  },
  {
    id: uuid.v4(),
    // id: 8,
    salon: 'Beauty Salon',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./images/salon1.jpeg'),
  },
  {
    id: uuid.v4(),
    // id: 8,
    salon: 'Beauty Salon and Hair',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./images/salon1.jpeg'),
  },
  {
    id: uuid.v4(),
    // id: 8,
    salon: 'Beauty Salon and Hair',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./images/salon1.jpeg'),
  },
  {
    id: uuid.v4(),
    // id: 8,
    salon: 'Beauty Salon and Hair',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./images/salon1.jpeg'),
  },
  {
    id: uuid.v4(),
    // id: 8,
    salon: 'Beauty Salon and Hair',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./images/salon1.jpeg'),
  },
  {
    id: uuid.v4(),
    // id: 8,
    salon: 'Beauty Salon and Hair',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./images/salon1.jpeg'),
  },
  {
    id: uuid.v4(),
    // id: 8,
    salon: 'Beauty Salon and Hair',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./images/salon1.jpeg'),
  },
];

const reservationData = [
  {
    id: uuid.v4(),
    date: 'Nov 13, 2021',
    time: '11:30am',
    status: {
      message: 'Confirmed',
      code: 0,
    },
    salon: {
      id: uuid.v4(),
      name: 'ProNail',
      address: '1234 Bixby Road, Houston, TX',
    },
    worker: {
      id: uuid.v4(),
      name: 'The Rock',
      avatar: require('./images/person1.jpeg'),
    },
    product: {
      id: uuid.v4(),
      name: 'Demon Hunter',
      requestMessage: 'I want it done lone star style',
      image: require('../dummy/images/nail1.jpeg'),
    },
    requestMessage: 'I want it done lone star style',
  },
  {
    id: uuid.v4(),
    date: 'Nov 13, 2021',
    time: '11:30am',
    status: {
      message: 'Pending',
      code: 1,
    },
    salon: {
      id: uuid.v4(),
      name: 'ProNail',
      address: '1234 Bixby Road, Houston, TX',
    },
    worker: {
      id: uuid.v4(),
      name: 'The Rock',
      avatar: require('./images/person2.jpeg'),
    },
    product: {
      id: uuid.v4(),
      name: 'Demon Hunter',
      requestMessage: 'I want it done lone star style',
      image: require('../dummy/images/nail2.jpeg'),
    },
    requestMessage: 'I want it done lone star style',
  },
  {
    id: uuid.v4(),
    date: 'Nov 13, 2021',
    time: '11:30am',
    status: {
      message: 'Pending',
      code: 1,
    },
    salon: {
      id: uuid.v4(),
      name: 'ProNail',
      address: '1234 Bixby Road, Houston, TX',
    },
    worker: {
      id: uuid.v4(),
      name: 'The Rock',
      avatar: require('./images/person3.jpeg'),
    },
    product: {
      id: uuid.v4(),
      name: 'Demon Hunter',
      requestMessage: 'I want it done lone star style',
      image: require('../dummy/images/nail3.jpeg'),
    },
    requestMessage: 'I want it done lone star style',
  },
  {
    id: uuid.v4(),
    date: 'Nov 13, 2021',
    time: '11:30am',
    status: {
      message: 'Confirmed',
      code: 0,
    },
    salon: {
      id: uuid.v4(),
      name: 'ProNail',
      address: '1234 Bixby Road, Houston, TX',
    },
    worker: {
      id: uuid.v4(),
      name: 'The Rock',
      avatar: require('./images/person4.jpeg'),
    },
    product: {
      id: uuid.v4(),
      name: 'Demon Hunter',
      requestMessage: 'I want it done lone star style',
      image: require('../dummy/images/nail4.jpeg'),
    },
    requestMessage: 'I want it done lone star style',
  },
  {
    id: uuid.v4(),
    date: 'Nov 13, 2021',
    time: '11:30am',
    status: {
      message: 'Canceled',
      code: 2,
    },
    salon: {
      id: uuid.v4(),
      name: 'ProNail',
      address: '1234 Bixby Road, Houston, TX',
    },
    worker: {
      id: uuid.v4(),
      name: 'The Rock',
      avatar: require('./images/person5.jpeg'),
    },
    product: {
      id: uuid.v4(),
      name: 'Demon Hunter',
      requestMessage: 'I want it done lone star style',
      image: require('../dummy/images/nail5.jpeg'),
    },
    requestMessage: 'I want it done lone star style',
  },
  {
    id: uuid.v4(),
    date: 'Nov 13, 2021',
    time: '11:30am',
    status: {
      message: 'Confirmed',
      code: 0,
    },
    salon: {
      id: uuid.v4(),
      name: 'ProNail',
      address: '1234 Bixby Road, Houston, TX',
    },
    worker: {
      id: uuid.v4(),
      name: 'The Rock',
      avatar: require('./images/person6.jpeg'),
    },
    product: {
      id: uuid.v4(),
      name: 'Demon Hunter',
      requestMessage: 'I want it done lone star style',
      image: require('../dummy/images/nail6.jpeg'),
    },
    requestMessage: 'I want it done lone star style',
  },
  {
    id: uuid.v4(),
    date: 'Nov 13, 2021',
    time: '11:30am',
    status: {
      message: 'Confirmed',
      code: 0,
    },
    salon: {
      id: uuid.v4(),
      name: 'ProNail',
      address: '1234 Bixby Road, Houston, TX',
    },
    worker: {
      id: uuid.v4(),
      name: 'The Rock',
      avatar: require('./images/person7.jpeg'),
    },
    product: {
      id: uuid.v4(),
      name: 'Demon Hunter',
      image: require('../dummy/images/nail7.jpeg'),
    },
    requestMessage: 'I want it done lone star style',
  },
];

const salonImages = [
  require('./images/salon1.jpeg'),
  require('./images/salon2.jpeg'),
  require('./images/salon3.jpeg'),
  require('./images/salon4.jpeg'),
  require('./images/salon5.jpeg'),
];

const products = [
  {
    id: uuid.v4(),
    title: 'Demon Slayer',
    likes: 1234,
    comments: 1234,
    image: require('./images/nail1.jpeg'),
  },
  {
    id: uuid.v4(),
    title: 'Nail for Life',
    likes: 1234,
    comments: 1234,
    image: require('./images/nail2.jpeg'),
  },
  {
    id: uuid.v4(),
    title: 'Something Else',
    likes: 1234,
    image: require('./images/nail3.jpeg'),
    comments: 1234,
  },
  {
    id: uuid.v4(),
    title: 'Cool Nail',
    likes: 1234,
    image: require('./images/nail4.jpeg'),
  },
  {
    id: uuid.v4(),
    title: 'Not So Cool nail',
    likes: 1234,
    image: require('./images/nail5.jpeg'),
  },
  {
    id: uuid.v4(),
    title: 'Laughing Nail',
    likes: 1234,
    image: require('./images/nail6.jpeg'),
  },
  {
    id: uuid.v4(),
    title: 'Happy Nail Baby',
    likes: 1234,
    image: require('./images/nail7.jpeg'),
  },
  {
    id: uuid.v4(),
    title: 'Golden Nail',
    likes: 1234,
    image: require('./images/nail8.jpeg'),
  },
  {
    id: uuid.v4(),
    title: 'The Demon Seducer',
    likes: 1234,
    image: require('./images/nail9.jpeg'),
  },
  {
    id: uuid.v4(),
    title: 'The Doomsday',
    likes: 1234,
    image: require('./images/nail10.jpeg'),
  },
  {
    id: uuid.v4(),
    title: 'The Doomsday',
    likes: 1234,
    image: require('./images/nail10.jpeg'),
  },
];

const workers = [
  {
    id: uuid.v4(),
    name: 'The Rock',
    likes: 1234,
    skills: ['Master of Nail', 'Cool Manager', 'Mr Smiley Face'],
    features: ['Manager', 'Super Star'],
    image: require('./images/person1.jpeg'),
  },
  {
    id: uuid.v4(),
    name: 'Johnson',
    likes: 9876,
    skills: ['Master of Nail', 'Diamond Nail', 'Friendly'],
    features: ['Super Star'],
    image: require('./images/person2.jpeg'),
  },
  {
    id: uuid.v4(),
    name: 'Johnson',
    likes: 9876,
    skills: ['Master of Nail', 'Diamond Nail', 'Friendly'],
    features: ['Super Star'],
    image: require('./images/person3.jpeg'),
  },
  {
    id: uuid.v4(),
    name: 'Johnson',
    likes: 9876,
    skills: ['Master of Nail', 'Diamond Nail', 'Friendly'],
    features: ['Super Star'],
    image: require('./images/person4.jpeg'),
  },
  {
    id: uuid.v4(),
    name: 'Johnson',
    likes: 9876,
    skills: ['Master of Nail', 'Diamond Nail', 'Friendly'],
    features: ['Super Star'],
    image: require('./images/person5.jpeg'),
  },
];

const comments = [
  {
    id: uuid.v4(),
    content: 'Had my nail done for graduation and it’s wonder full',
    commenter: 'Reiley Joanna',
    likes: 1234,
    dislikes: 2345,
  },
  {
    id: uuid.v4(),
    content:
      'Had my nail done for graduation and it’s wonder full, Had my nail done for graduation and it’s wonder full',
    commenter: 'Reiley Joanna',
    likes: 1234,
    dislikes: 2345,
  },
  {
    id: uuid.v4(),
    content:
      'Had my nail done for graduation and it’s wonder full Had my nail done for graduation and it’s wonder full Had my nail done for graduation and it’s wonder full Had my nail done for graduation and it’s wonder full',
    commenter: 'Reiley Joanna The Angry',
    likes: 1234,
    dislikes: 2345,
  },
  {
    id: uuid.v4(),
    content:
      'Had my nail done for graduation and it’s wonder full Had my nail done for graduation and it’s wonder full Had my nail done for graduation and it’s wonder full Had my nail done for graduation and it’s wonder full',
    commenter: 'Karen the Kraken Sea Monster',
    likes: 1234,
    dislikes: 2345,
  },
];

const salonContact = {
  id: uuid.v4(),
  address: '1234 Bocky Rd, Alala, NY, 14549',
  hours: {
    monday: [6, 22],
    tuesday: [6, 22],
    wednesday: [6, 22],
    thursday: [6, 22],
    friday: [6, 22],
    saturday: [8, 22],
    sunday: [10, 22],
  },
  phone: '(858) 429 4400',
};

const availableTimeSlots = [
  {
    time: '8:00 AM',
    availableWorkers: 4,
    avatar: [
      require('./images/person1.jpeg'),
      require('./images/person2.jpeg'),
      require('./images/person3.jpeg'),
    ],
  },
  {
    time: '8:15 AM',
    availableWorkers: 4,
    avatar: [
      require('./images/person4.jpeg'),
      require('./images/person5.jpeg'),
      require('./images/person6.jpeg'),
    ],
  },
  {
    time: '8:30 AM',
    availableWorkers: 4,
    avatar: [
      require('./images/person1.jpeg'),
      require('./images/person2.jpeg'),
      require('./images/person3.jpeg'),
    ],
  },
  {
    time: '8:45 AM',
    availableWorkers: 4,
    avatar: [
      require('./images/person1.jpeg'),
      require('./images/person2.jpeg'),
      require('./images/person3.jpeg'),
    ],
  },
  {
    time: '9:00 AM',
    availableWorkers: 4,
    avatar: [
      require('./images/person1.jpeg'),
      require('./images/person2.jpeg'),
      require('./images/person3.jpeg'),
    ],
  },
  {
    time: '9:15 AM',
    availableWorkers: 4,
    avatar: [
      require('./images/person1.jpeg'),
      require('./images/person2.jpeg'),
      require('./images/person3.jpeg'),
    ],
  },
  {
    time: '9:30 AM',
    availableWorkers: 4,
    avatar: [
      require('./images/person1.jpeg'),
      require('./images/person2.jpeg'),
      require('./images/person3.jpeg'),
    ],
  },
  {
    time: '9:45 AM',
    availableWorkers: 4,
    avatar: [
      require('./images/person1.jpeg'),
      require('./images/person2.jpeg'),
      require('./images/person3.jpeg'),
    ],
  },
  {
    time: '10:00 AM',
    availableWorkers: 4,
    avatar: [
      require('./images/person1.jpeg'),
      require('./images/person2.jpeg'),
      require('./images/person3.jpeg'),
    ],
  },
  {
    time: '10:15',
    availableWorkers: 4,
    avatar: [
      require('./images/person1.jpeg'),
      require('./images/person2.jpeg'),
      require('./images/person3.jpeg'),
    ],
  },
  {
    time: '10:30 AM',
    availableWorkers: 4,
    avatar: [
      require('./images/person1.jpeg'),
      require('./images/person2.jpeg'),
      require('./images/person3.jpeg'),
    ],
  },
];

export {
  discoverySalons,
  reservationData,
  salonImages,
  products,
  workers,
  comments,
  salonContact,
  availableTimeSlots,
};
