let obj = { name: 'killsos' };

let wm = new WeakMap();

wm.set(obj, 'killer');

console.log(wm.get(obj));

obj = null;

console.log(wm.has(obj));