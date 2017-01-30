var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');
var User = require('./models/User.js');
var config = require('./config.js');
//mongoose.connect(config.MONGOOSE_CONNECTON);

var port = process.env.PORT || 8080;

var environment = process.env.NODE_ENV;

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

console.log('About to crank up node');
console.log('PORT=' + config.PORT);
console.log('NODE_ENV=' + environment);


switch (environment) {
    case 'build':
        console.log('** BUILD **');
        app.use(express.static('./build/'));
        app.use('/*', express.static('./build/index.html'));
        break;
    default:
        console.log('** DEV **');
        app.use(express.static('./src/client/'));
        app.use(express.static('./src/'));
        app.use(express.static('./'));
        app.use('/*', express.static('./src/client/index.html'));
        break;
}

app.listen(config.PORT, function() {
    console.log('Express server listening on port ' + config.PORT);
    console.log('env = ' + app.get('env') +
                '\n__dirname = ' + __dirname +
                '\nprocess.cwd = ' + process.cwd());
});
