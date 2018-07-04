var obj1 = { name: 'killsos' };
var obj3 = {
    __proto__: obj1
}
console.log(obj3.name);
console.log(Object.getPrototypeOf(obj3));