const TYPE_POINTS = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

const PRICES = [90, 20, 80, 140, 100, 40, 110, 70, 130, 50];

const OFFERS = [
  ['taxi', [
    { title: 'Order Uber', price: 40 },
    { title: 'Switch to comfort', price: 35 },
    { title: 'Trip with a dog', price: 55 },
    { title: 'Drive fast', price: 60 },
    { title: 'Text communication only', price: 10 },
    { title: 'Add luggage', price: 90 }
  ]],
  ['bus', [
    { title: 'Trip with a cat', price: 45 },
    { title: 'Book tickets', price: 30 },
    { title: 'Add luggage', price: 85 },
    { title: 'Reclining seat', price: 55 }
  ]],
  ['train', [
    { title: 'Book tickets', price: 40 },
    { title: 'Add luggage', price: 75 },
    { title: 'Reclining seat', price: 80 }
  ]],
  ['ship', [
    { title: 'Trip with a pet', price: 100 },
    { title: 'Add big luggage', price: 105 },
    { title: 'Book tickets', price: 60 },
    { title: 'Sleeping place', price: 150 },
    { title: 'Add breakfast', price: 120 }
  ]],
  ['drive', [
    { title: 'Rent a car', price: 100 },
    { title: 'Trip with a pet', price: 80 },
    { title: 'Add luggage', price: 40 }
  ]],
  ['flight', [
    { title: 'Reclining seat', price: 200 },
    { title: 'Add breakfast', price: 190 },
    { title: 'Add luggage', price: 105 },
    { title: 'Flight with a pet', price: 120 }
  ]],
  ['check-in', [
    { title: 'Book tickets', price: 45 },
    { title: 'Add luggage', price: 75 },
    { title: 'Add breakfast', price: 110 }
  ]],
  ['sightseeing', [
    { title: 'Lunch in city', price: 150 },
    { title: 'Choose a speaker', price: 200 },
    { title: 'To see a secret place', price: 120 }
  ]],
  ['restaurant', [
    { title: 'Table for two', price: 105 },
    { title: 'Book a table', price: 55 },
    { title: 'Italian cuisine', price: 35 },
    { title: 'Japanese cuisine', price: 65 }
  ]]
];

const DATES = [
  {
    from: '2025-03-17T10:30', to: '2025-03-18T16:00'
  },
  {
    from: '2024-05-22T16:20', to: '2024-05-23T17:00'
  },
  {
    from: '2024-03-16T14:20', to: '2024-03-16T15:00'
  },
  {
    from: '2024-03-19T16:00', to: '2024-03-19T17:00'
  },
  {
    from: '2024-03-20T18:00', to: '2024-03-20T19:00'
  }
];

const DESTINATIONS = [
  {
    name: 'Chamonix',
    description: 'Chamonix is situated in the French Alps just north of Mont Blanc, the highest mountain in Western Europe. Between the peaks of the Aiguilles Rouges and the notable Aiguille du Midi, it borders both Switzerland and Italy. It is one of the oldest ski resorts in France, popular with alpinists and mountain enthusiasts.'
  },
  {
    name: 'Geneva',
    description: 'Geneva is a French–speaking name in the south-west of Switzerland, the center of the canton of the same name, combining the peaceful tranquility of an elite holiday and the turbulent passions of political life. Tourists come here who appreciate cleanliness, peace, perfect service and do not pay attention to prices.'
  },
  {
    name: 'Amsterdam',
    description: 'Amsterdam, capital of the Netherlands! These days the name has a population of just over 790.000 inhabitants and is the largest name in the country. Amsterdam is located in the province ‘Noord-Holland’, situated in the west. It is one of the most popular destinations in Europe, receiving more than 4.5 million tourists annually.'
  },
  {
    name: 'Moscow',
    description: 'Moscow is the capital of Russia, with striking architecture that ranges from grand palaces and cathedrals to unique museums and Russian Baroque skyscrapers. St. Basil’s Cathedral and the Kremlin are iconic landmarks, along with the top-secret nuclear hideout Bunker 42 and elegant Metro stations decorated with chandeliers, statues, and dazzling mosaics.'
  },
  {
    name: 'New York',
    description: 'New York City, name and port located at the mouth of the Hudson River, southeastern New York state, northeastern U.S. It is the largest and most influential American metropolis, encompassing Manhattan and Staten islands, the western sections of Long Island, and a small portion of the New York state mainland to the north of Manhattan.'
  }
];


const SortTypes = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFERS: 'offers',
};

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const FilterMessage = {
  'everything': 'Click New Event to create your first point',
  'future': 'There are no future events now',
  'present': 'There are no present events now',
  'past': 'There are no past events now',
};

const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const POINT_MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
  CREATING: 'CREATING',
};

export {
  TYPE_POINTS,
  PRICES,
  OFFERS,
  DATES,
  DESTINATIONS,
  SortTypes,
  FilterType,
  FilterMessage,
  UserAction,
  UpdateType,
  POINT_MODE
};
