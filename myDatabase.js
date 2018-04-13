var fs = require('fs');
let infoList = [];
let picList = [];

function writeToDB(usersdata) {

    fs.writeFile("Users.txt", JSON.stringify(usersdata), function (err) {
        if (err) {
            console.log("Error occured in saving DB");
            return console.log(err);
        }

        console.log("The file was saved in the mydatabase!");
    });
}

function writePicsToDB(picsdata) {
    fs.writeFile("Pics.txt", JSON.stringify(picsdata), function (err) {
        if (err) {
            console.log("Error occured in saving pics DB");
            return console.log(err);
        }

        console.log("The Pics file was saved in the mydatabase!");
    });
}
//var buf = Buffer.from(JSON.stringify(obj));
//And for converting string to json obj :

//var temp = JSON.parse(buf.toString());
function readuserTXTFromDB() {

    fs.readFile('./Users.txt', "utf-8", function read(err, data) {
        if (err) {
            let emptyObj = {};
            console.log("Users file not found. Created it for You ");
            writeToDB(emptyObj);
            //  throw err;
        }
        infoList = JSON.parse(data);
        console.log("These Users Have been loaded: " + JSON.stringify(infoList));
        //console.log(infoList);

    });
}

function readPicturesFromDB() {

    fs.readFile('./Pics.txt', "utf-8", function read(err, data) {
        if (err) {
            let emptyPicObj = {
                picAdress: "images/bison.jpg",
                x: 111,
                y: 222
            };
            console.log("Picture file not found. Created it for You ");
            picList.push(emptyPicObj);
            writePicsToDB(picList);
            //  throw err;
        }
        picList = JSON.parse(data);
        console.log("These Pics Have been loaded: " + JSON.stringify(picList));
    });
}
let myDatabase = function () {
    //load txt file 
    //insert txt data into infolist
    //change the bellow to data read from txt
    readuserTXTFromDB();
    readPicturesFromDB();

}
myDatabase.prototype.getArraySize = function () {
    return infoList.length;
}

//add or modify.  Complete getAllObjects function.
myDatabase.prototype.getAllObjects = function () {
    return (infoList);
}
myDatabase.prototype.getAllPicsObjects = function () {
    return (picList);
}


// myDatabase.prototype.getAllNames = function () {
//     let names = [];
//     for (let i = 0; i < this.infoList.length; i++) {
//         if (this.infoList[i]) {
//             names.push(this.infoList[i].username);
//         }
//     }
//     return (names);
// }

// myDatabase.prototype.getObjectAtIndex = function (index) {
//     if (index < 0 || index >= this.infoList.length)
//         return (null);
//     else {
//         if (!this.infoList[index]) {
//             return (null);
//         } else {
//             return (this.infoList[index]);
//         }
//     }
// }

myDatabase.prototype.getObjectWithUsername = function (_thename) {
    for (let i = 0; i < infoList.length; i++) {
        if (infoList[i] && _thename == infoList[i].username)
            return (infoList[i]);
    }
    return (null);
}
myDatabase.prototype.deleteObjectWithUsername = function (_thename) {
    for (let i = 0; i < infoList.length; i++) {
        if (infoList[i] && _thename == infoList[i].username) {
            let tempy = infoList[i];
            picList.splice(i, 1);
            writeToDB(infoList);
            return tempy;
        }
    }
    return (null);
}
// myDatabase.prototype.addObjectAtIndex = function (obj, index) {
//     if (index < 0)
//         return (null);
//     if (index < this.infoList.length) {
//         if (!this.infoList[index]) {
//             this.infoList[index] = obj;
//             return (obj);
//         } else {
//             return (null);
//         }
//     } else
//         this.infoList[index] = obj;
//     return (obj);
// }


myDatabase.prototype.addObject = function (obj) {
    for (let i = 0; i < infoList.length; i++) {
        if (infoList[i] && obj.username == infoList[i].username)
            return (null);
    }
    infoList.push(obj);
    writeToDB(infoList);
    return (obj);
}
//WIP
myDatabase.prototype.addPicObj = function (Pobj) {
    for (let i = 0; i < picList.length; i++) {
        if (picList[i] && Pobj.picAdress == picList[i].picAdress) {
            //image has same name 
            //delete the other one and use this one instead
            //picList.splice(i, 1, Pobj);
            picList.splice(i, 1);
            //return (null);
        }

    }
    picList.push(Pobj);
    writePicsToDB(picList);
    return (Pobj);
}



// myDatabase.prototype.changeObjectAtIndex = function (obj, index) {
//     if (index < 0 || index >= this.infoList.length)
//         if (!this.infoList[index])
//             return (null);
//     this.infoList[index] = obj;
//     return (obj);
// }

//  Complete changeObject function.
// myDatabase.prototype.changeObject = function (obj) {
//     //check if objexists if it dose change it else return null
//     for (let i = 0; i < this.infoList.length; i++) {
//         if (this.infoList[i] && obj.username == this.infoList[i].username) {
//             this.infoList[i] = null;
//             this.infoList[i] = obj;
//             //this.infoList.push(obj);
//             writeToDB(this.infoList);
//             return (obj);
//         }
//     }
//     return (null);
// }

// myDatabase.prototype.deleteObjectAtIndex = function (index) {
//     if (index < 0 || index >= this.infoList.length) {
//         return (null);
//     } else {
//         if (!this.infoList[index]) {
//             return (null);
//         } else {
//             let obj = this.infoList[index];
//             this.infoList[index] = null;
//             return (obj);
//         }
//     }
// }


//add or modify.  Complete deleteObjectWithID function.
// myDatabase.prototype.deleteObject = function (obj) {
//     for (let i = 0; i < this.infoList.length; i++) {
//         if (this.infoList[i] && obj.username == this.infoList[i].username) {
//             this.infoList[i] = null;
//             writeToDB(this.infoList);
//             return (null);
//         }
//     }
//     return (obj);

// }
module.exports = myDatabase;
