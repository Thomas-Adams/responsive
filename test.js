var extract = require('./extractfiles.js');
var gulp = require('gulp');

var callback=function(){console.log('finished!')};
gulp.src('./public/accordion-navigation.html').pipe(extract({js:true,jsDestination:'./dist/_common/',encoding:'utf8'},callback));
gulp.src('./public/accordion-navigation.html').pipe(extract({js:false,cssDestination:'./dist/_common/',encoding:'utf8'},callback));
