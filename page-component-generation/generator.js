var nunjucks = require('nunjucks'),
    path = require('path'),
    fs = require('fs');
var json = JSON.parse(fs.readFileSync('../templates/mobile-carousel.json', 'utf8'));

nunjucks.configure('../templates/', {
    autoescape: true
});


var res = nunjucks.render('mobile-carousel.tmpl.nun', json);

fs.writeFileSync('mobile-carousel.html', res, 'utf8');
