
function getRandomArrayElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function getRandomUUID(){
  return crypto.randomUUID();
}

export { getRandomArrayElement, getRandomUUID};
