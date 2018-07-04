function log(o) {
    console.log(Object.prototype.toString.call(o));
}

log(new Set())
log(new WeakSet())
log(new Map())
log(new WeakMap())
log(Symbol()) // [object Symbol]

console.log(typeof Symbol()); // symbol

log(1)

console.log(typeof 1); // number

console.log(typeof new Set()) // object
console.log(typeof new WeakSet()) // object
console.log(typeof new Map()) // object
console.log(typeof new WeakMap()) // object