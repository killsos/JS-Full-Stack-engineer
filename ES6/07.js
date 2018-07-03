let oldArr = [1, [2, 3]];
let newArr = Array.from(oldArr);

console.log('====================================');
console.log(newArr === oldArr); // false
console.log('====================================');

console.log(newArr[1] === oldArr[1]); // true