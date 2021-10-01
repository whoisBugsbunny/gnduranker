function testing() {
    var arr = [];
    var y = 2017;
    var r;
    for (let i = 0; i < 6; i++) {
        r = Math.floor(Math.random() * (900) + 100);
        arr[i] = [y, i % 2, r];
        y = y + (i % 2);
    }
    return (arr);
}
var c = testing();
console.log(c);