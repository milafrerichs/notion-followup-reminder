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
module.exports = {
  randomX
}
