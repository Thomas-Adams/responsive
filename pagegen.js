var swig  = require('swig');
var fs = require('fs');
var s = swig.renderFile('templates/base.tmpl.html', {
    ie8: true,
    meta : {
        charset : 'utf-8',
        title : 'Test',
        description : 'First SWIG template'
    }
});

fs.writeFile('public/index.html', s, function(err){
    if(err) {
        return console.log(err);
    }
    console.log('File was written');
});
