var nameObj = { name: 'killsos' };
var ageObj = { age: 8, add: { sex: 1 } };
var obj = {};
Object.assign(obj, nameObj, ageObj);
console.log(obj);
console.log(obj.add === ageObj.add);
//克隆对象
function clone(obj) {
    return Object.assign({}, obj);
}