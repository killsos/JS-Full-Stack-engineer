var person = {
    name: 'zfpx',
    getName: function() {
        setTimeout(function() { console.log(this); }, 1000);
        //在浏览器执行的话this指向window

        // ES5解决办法 使用bind
        setTimeout(function() { console.log(this); }.bind(this), 1000);

        setTimeout(() => console.log(this), 1000);
        //在浏览器执行的话this指向person
    }
}
person.getName();