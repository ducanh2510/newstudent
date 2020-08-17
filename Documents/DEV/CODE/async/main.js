var co = require('co');
var fs = require('fs');

function readFile(path) {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, {encoding: 'utf-8'}, function(err, data) {
            if(err) reject(err);
            else resolve(data);
        });
    });
}


// co(function*() {
//     var song1 = yield readFile('./song1.txt');
//     var song2 = yield readFile('./song2.txt');
//     return [song1, song2];
// })
//     .then(function(values) {
//         console.log(values);
//     });

var readAllFile = co.wrap(function*(files){
    var arrPromise = yield files.map(function(file){
        return readFile(file);
    });
    return arrPromise;
});

readAllFile(['song1.txt', 'song2.txt'])
    .then(function(arrs) {
        console.log(arrs);
    });