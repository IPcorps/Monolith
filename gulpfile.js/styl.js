
// A few 'require'
const { src, dest } = require('gulp'),
    styl = require('gulp-stylus');

// Configuration preparation
let stylOpt = require('./config/config-styl.js');

exports.change = path => {

    // Pug processing
    src(path)                           // Reading the file 
        .pipe(styl(stylOpt))            // Stylus -> CSS
        .on('error', console.log)       // For oops caught a mistake 🙀
        .pipe(dest('.'));               // Saving the file

    // To see something happen
    console.log('\x1b[36m%s\x1b[0m', path, 'processed');

}
