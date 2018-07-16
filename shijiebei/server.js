var host = '127.0.0.1';
var port = 10011;
var express = require('express');
var path = require('path')
var swig = require('swig');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')))

swig.setDefaults({
    cache: false
});

app.get('/', function (req, res) {
    var deviceAgent = req.headers["user-agent"].toLowerCase();
    var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
    if (agentID) {
        res.render('index');
    } else {
        res.render('index_pc');
    }
})
app.get('/download', function (req, res, next) {
    res.render('download');
});
app.use(express.static(path.join(__dirname, 'public')));



const http = require('http')
const querystring = require('querystring')


app.listen(port, function () {
    console.log(" 端口号 :" + port)
})
