
// A few 'require'
const { src, dest } = require('gulp'),
    pug = require('gulp-pug');

// Configuration preparation
let pugOpt = require('./config/config-pug.js');

exports.change = path => {

    // Pug processing
    src(path)                           // Reading the file 
        .pipe(pug(pugOpt))              // Pug -> HTML
        .on('error', console.log)       // For oops caught a mistake 🙀
        .pipe(dest('.'));               // Saving the file

    // To see something happen
    console.log('\x1b[36m%s\x1b[0m', path, 'processed');

}
