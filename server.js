const express = require ('express');
const hbs = require('hbs');
const fs = require('fs');


var app = express();


hbs.registerPartials(__dirname + '/views/partials')

app.set('view motore', 'hbs');


app.use((req, res, next) => {
    var now = new Date().getMilliseconds();
    var log = `${now}: ${req.method} ${req.url}`
    fs.appendFileSync('server.log', log + '\n')
    next()
})

app.use((req, res, next) => {
    res.render('./maintenance.hbs');
    next()
})


app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    // response.send('<h1>NONNO FIORUCCI IS A FNG BOSS</h1>')
    response.send({
        name: 'Enrico',
        try: 'Server'
    })
})

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        pageTitolo: 'About Page',
        ILike: 'Pussy',
    });
})


app.get('/mainpage', (request, response) => {
    response.render('mainpage.hbs', {
        pageTitolo: 'HOME PAGE',
        ILike: 'this is the data imported from server.js',
        when: new Date().getHours()
    });
})

app.get('/bad', (request, response) => {
    response.send({
        ecco: 'request'
    })
})

app.listen(3000, () => {
    console.log('Server is muthafucking app & running')
});