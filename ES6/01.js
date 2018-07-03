let [a = "a", b = "b", c = new Error('C必须指定')] = [1, , 3];
console.log(a, b, c);