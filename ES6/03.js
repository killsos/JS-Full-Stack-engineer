var name = 'killsos',
    age = 18;

function desc(strings, ...values) {
    console.log('strings', strings);
    console.log(strings, values);
}
desc `${name} is ${age} old!`;