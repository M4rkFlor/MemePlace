var express = require("express");
var router = express.Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require("path");
var clientSessions = require('client-sessions');
var bcrypt = require('bcryptjs');
const saltRounds = 10;

const myDatabase = require('./myDatabase');
let db = new myDatabase();

router.post("/signup", function (req, res) {
    if (req.body.username == "" || req.body.password == "" ||
        req.body.password !== req.body.passwordconfirm)
        res.json(null);
    else {
        bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
            // Store hash in your password DB.
            let obj = {
                username: req.body.username,
                password: hash
            };
            if (db.addObject(obj) != null) {
                req.session_state.login = req.body.username;
                res.json({
                    redirect: "/session"
                });
            } else
                res.json(null);
        });
    }
});

router.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/views/login.html");
});

router.post("/login", function (req, res) {
    if (req.body.username == null || req.body.password == null) {
        res.json(null);
    }
    let templogin = JSON.parse(JSON.stringify(req.body));

    let checked = db.getObjectWithUsername(templogin.username);
    if (checked == null || checked.password == null) {
        res.json(null);
    } else {
        bcrypt.compare(templogin.password, checked.password, function (err, isMatch) {
            if (isMatch) {
                // Passwords match
                req.session_state.login = templogin.username;
                res.json({
                    redirect: "/session"
                });
            } else {
                // Passwords don't match
                res.json(null);
            }
        });
    }

});




router.get("/logout", function (req, res) {
    req.session_state.reset();
    res.json({
        redirect: "/"
    });
});

router.post("/delete", function (req, res) {
    let templogin = JSON.parse(JSON.stringify(req.body));
    db.deleteObjectWithUsername(templogin.username);
    req.session_state.reset();
    res.json({
        redirect: "/"
    });
});

router.get("/session", function (req, res) {
    if (!req.session_state.login || req.session_state.login == "")
        res.sendFile(__dirname + "/public/views/login.html");
    //DO THIS BETTER
    else
        res.sendFile(__dirname + "/public/views/Canvas.html");
});
router.get("/checksession", function (req, res) {
    if (!req.session_state.login || req.session_state.login == "")
        res.json({
            redirect: "/"
        });
    else
        res.json(null);
});
router.get("/userinfo", function (req, res) {
    if (!req.session_state.login || req.session_state.login == "")
        res.json(null);
    else {
        let thetempobj = db.getObjectWithUsername(req.session_state.login);
        console.log(thetempobj.username + " has connected");
        res.json(thetempobj);
    }
});
router.get("/picturearray", function (req, res) {
    if (!req.session_state.login || req.session_state.login == "")
        res.json(null);
    else {
        let thetempobj = db.getAllPicsObjects();
        //console.log("picarray a x y ");
        //console.log(thetempobj[0].picAdress);
        //console.log(thetempobj[0].x);
        //console.log(thetempobj[0].y);
        res.json(thetempobj);
    }
});
//create a route that handles getting images from folder
//sending them back to user with requests such as bison.png
//change the route to be compatible with parameter
/*
router.get("/bison.jpg", function (req, res) {
    if (!req.session_state.login || req.session_state.login == "")
        res.json(null);
    else {
        res.sendFile(__dirname + "/public/images/bison.jpg");
    }
});
*/


router.get("/findImageSrc/:imageAdresses", function (req, res) {
    if (!req.session_state.login || req.session_state.login == "")
        res.json(null);
    else {
        //console.log("in findimageSrc the param is");
        //console.log(req.params.imageAdresses);
        res.sendFile(__dirname + "/public/images/" + req.params.imageAdresses);
    }
});

router.post('/fileupload', function (req, res) {
    // console.log(req.body.xCordinate);
    // console.log(req.body.yCordinate);
    var form = new formidable.IncomingForm();

    form.parse(req);
    /*
    form.parse(req, function (err, fields, files) {
        res.write('received upload:\n\n');
        res.end(util.inspect({
            fields: fields,
            files: files
        }));
    });
    */
    let picObj = {};

    form.on('fileBegin', function (name, file) {
        file.path = __dirname + '/public/images/' + file.name;
        picObj.picAdress = file.name;
    });

    form.on('file', function (name, file) {
        console.log('Saved ' + file.name);
    });

    form.on('field', function (name, value) {
        if (name == "xCordinate") {
            picObj.x = value;
        } else if (name == "yCordinate") {
            picObj.y = value;
        }
    });

    form.on('error', function (err) {
        res.json(err);
        //request.resume();
    });
    form.on('end', function () {
        console.log(picObj);

        if (db.addPicObj(picObj) != null) {
            res.json(form);
        } else
            res.json(null);
    });
    //res.end();
    //res.sendFile(__dirname + "/public/views/Canvas.html");
});

module.exports = router;
