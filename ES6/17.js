let obj = { name: 'killsos' };

let wm = new WeakSet();

wm.add(obj);

console.log(wm.has(obj));

obj = null;

console.log(wm.has(obj));