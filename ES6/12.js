console.log(Object.is(NaN, NaN));

console.log(Object.is(null, null));

console.log(Object.is({ name: 'a' }, { name: 'a' }));


let obj = { name: 'a' };

console.log(Object.is(obj, obj));