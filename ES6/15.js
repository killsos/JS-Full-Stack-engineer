function buy(books) {
    let i = 0;
    return {
        next() {
            let done = i == books.length;
            let value = !done ? books[i++] : undefined;
            return {
                value,
                done
            }
        }
    }
}

let iterators = buy(['js', 'html']);
var curr;
do {
    curr = iterators.next();
    console.log(curr);
} while (!curr.done);