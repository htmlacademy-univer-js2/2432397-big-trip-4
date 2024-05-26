const TYPE_POINTS = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];

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
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  INIT: 'INIT',
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const POINT_MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
  CREATING: 'CREATING',
};

const EditPointViewButtonText = {
  SAVE: 'Save',
  DELETE: 'Delete',
  CANCEL: 'Cancel',
  LOAD_SAVE: 'Saving...',
  LOAD_DELETE: 'Deleting...'
};

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000
};

export {
  TYPE_POINTS,
  SortTypes,
  FilterType,
  FilterMessage,
  UserAction,
  UpdateType,
  POINT_MODE,
  EditPointViewButtonText,
  TimeLimit,
};
