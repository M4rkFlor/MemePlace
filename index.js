var express = require('express');
var bodyParser = require('body-parser');
var routes = require("./routes");
var clientSessions = require("client-sessions");
var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/', express.static('./'));
app.use('/js', express.static('./public/js'));
app.use('/images', express.static('./public/images'));
app.use(clientSessions({
    secret: 'yup this a secret' // CHANGE THIS!
}));
app.use(routes);

app.listen(process.env.PORT || 3000, function () {
    console.log('Example app listening on port 3000!');
});
