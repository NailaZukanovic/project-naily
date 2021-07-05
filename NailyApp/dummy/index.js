import uuid from 'react-native-uuid';

const reservations = [
  {
    id: '1',
    salon: 'ProNail',
    worker: 'Jesscia Pham',
    date: '11.13.2021',
    time: '11:30am',
  },
  {
    id: '2',
    salon: 'Happy Nail',
    worker: 'John Backer',
    date: '11.13.2021',
    time: '11:30am',
  },
  {
    id: '3',
    salon: 'No Nail No Life',
    worker: 'Lu Nguyen',
    date: '11.13.2021',
    time: '11:30am',
  },
  {
    id: '4',
    salon: 'Nail For Life Boiee',
    worker: 'The Rock',
    date: '11.13.2021',
    time: '11:30am',
  },
];

const discoverySalons = [
  {
    // id: uuid.v4(),
    id: 1,
    salon: 'ProNail',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./salon_images/salon1.jpeg'),
  },
  {
    // id: uuid.v4(),
    id: 2,
    salon: 'ProNail',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./salon_images/salon2.jpeg'),
  },
  {
    // id: uuid.v4(),
    id: 3,
    salon: 'ProNail',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./salon_images/salon3.jpeg'),
  },
  {
    // id: uuid.v4(),
    id: 4,
    salon: 'ProNail',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./salon_images/salon4.jpeg'),
  },
  {
    // id: uuid.v4(),
    id: 5,
    salon: 'ProNail',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./salon_images/salon5.jpeg'),
  },
  {
    // id: uuid.v4(),
    id: 6,
    salon: 'ProNail',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./salon_images/salon6.jpeg'),
  },
  {
    // id: uuid.v4(),
    id: 7,
    salon: 'ProNail',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./salon_images/salon7.jpeg'),
  },
  {
    // id: uuid.v4(),
    id: 8,
    salon: 'ProNail',
    likes: 123456,
    comments: 1123,
    isReserved: 0,
    address: '1234 Bixby Drive, Houston, TX',
    image: require('./salon_images/salon1.jpeg'),
  },
];
export {reservations, discoverySalons};
