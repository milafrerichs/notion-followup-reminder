var dateFormat = require("dateformat");

const random = function(arr) {
  return arr[arr.length * Math.random() | 0];
}
const randomX = function(arr, size=2) {
  const result = []
  for(let i=0;i<size;i++) {
    const person = random(arr);
    result.push(person);
    arr = arr.filter(item => item !== person)
  }
  return result;
}
const todayNotionString = function() {
  const today = new Date();
  return dateFormat(today, "yyyy-mm-dd'T'HH:MM:ss'Z'");
}
module.exports = {
  randomX,
  todayNotionString,
}
