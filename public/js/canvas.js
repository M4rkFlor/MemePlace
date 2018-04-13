var picarray = [];
var tempImage = [];
///111111
var canvasDragVal; // The X and Y amounts for the proper drag distance (I think) - the amounts that are added to canvasX and canvasY
var canvasX = 0; // The X position of the canvas
var canvasY = 0; // The Y position of the canvas
var dragX = 0; // The amount dragged in X for a single drag
var dragY = 0; // The amount dragged in Y for a single drag
var mousePos; // The X and Y position of the mouse on the canvas
var pictureX; // The X position of the next image
var pictureY; // The Y position of the next image

// Y is positive going down
var canvas = document.getElementById('Maincanvas');
var context = canvas.getContext('2d');
///2222
function logoutClient(data) {
    $.ajax({
        url: "/logout",
        type: "GET",
        success: function (data) {
            console.log("logged a boy out");
            window.location = data.redirect;
        },
        dataType: "json"
    });
    return false;
}

function deleteAccount(data) {
    $.ajax({
        type: "POST",
        url: "/delete",
        data: {
            username: $("#userDisplay").html()
        },
        success: function (data) {
            if (!data)
                alert("cannot delte urself");
            else
                alert("u have delted urself");
        },
        dataType: "json"
    });
}

function doUserDisplay() {
    console.log("doin it");
    $.ajax({
        url: "/userinfo",
        type: "GET",
        success: function (data) {
            console.log("success");
            if (!data) {
                alert("YOU ARE NOT LOGGED IN -.-");
                window.location = "/";
            } else {
                console.log(data.username + "Has connedted");
                $("#userDisplay").html(data.username);
            }
        },
        dataType: "json"
    });
    return false;
}
//update canavs every 15 seconds


function updateCanavs() {
    //console.log("updating Canvas");
    $.ajax({
        url: "/picturearray",
        type: "GET",
        success: function (data) {
            //console.log("success");
            if (!data) {
                //alert("yoursesionExpiredandThecanvascouldnotreload");
                window.location = "/";
            } else {
                //save data to pic array call redraw
                picarray = data;
                //God like image caching
                for (let i = 0; i < picarray.length; i++) {
                    tempImage[i] = new Image();
                    tempImage[i].src = "/findImageSrc/" + picarray[i].picAdress;
                }
            }
        },
        dataType: "json"
    });
    return false;
}
updateCanavs();
setInterval(updateCanavs, 1000);
/*
function getImageSrc(imgAdress) {
    console.log("updating Canvas");
    $.ajax({
        url: "/findImageSrc/" + imgAdress.toString(),
        type: "GET",
        success: function (data) {
            console.log("success");
            if (!data) {
                alert("nullSrc");
                window.location = "/";
            } else {
                //send back imgSrc
                let recivefile = new Image();
                recivefile.src = data;
                return recivefile.src;

            }
        },
        dataType: "json"
    });
    //return false;
}
*/
/*
$("#uploadbutton").click(
    function (event) {
        
                if ($("#uploadbutton").val() == "") {
                    alert("NO IMAGE");
                    return false;
                }
        
        $.post("/fileupload", {
            file: $("#uploadbutton").val()
        }, successUpload);


});
*/
$(document).ready(function (e) {
    $('#formData').on('submit', (function (e) {
        e.preventDefault();
        if ($("#filetoupload").val() == "") {
            alert("NO IMAGE");
            return false;
        }
        if ($("#xCordinateID").val() == "" || $("#yCordinateID").val() == "") {
            alert("insert a cordinate before uploading");
            return false;
        }
        var formData = new FormData(this);
        $.ajax({
            type: 'POST',
            url: $(this).attr('action'),
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (data) {
                $("#formData")[0].reset();
                if (data == null)
                    console.log("agy");
                //alert("image name already exists change the name of image. i haved moved the image with that name to your new cordinates ");
                else
                    console.log("success Form");
            },
            error: function (data) {
                console.log("error Form that image name already exists");
                console.log(data);
            }
        });
    }));

});
/*
$("#sendtocanavs").click(
    function (event) {

        if ($("#uploadbutton").val() == "") {
            alert("NO IMAGE");
            return false;
        }
        //also create no x y
        console.log("Image not null");
        $.post("/fileupload", {
            file: $("#uploadbutton").val()
        }, successPlace);


    });

function successPlace(data) {
    console.log("succesplace");
    if (!data)
        alert("ERROR");
    else {
        //place image that was added onto canvas and into info list to place xy
        conssole.log("succesfully uploaded");
    }

}
*/
function successUpload(data) {
    if (!data)
        alert("ERROR");
    else
        conssole.log("succesfully uploaded");
}
/*
var canvas = document.getElementById('Maincanvas');
var context = canvas.getContext('2d');

var img = new Image();
img.onload = function () {
    context.drawImage(img, 0, 0);
}
img.src = 'https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg';
*/
//////////////////////////////////////////////////////////////
var canvas = document.getElementById('Maincanvas');
//canvas.width = 800;
//canvas.height = 600;
//var imgarry[] = new Image(); cant do this
var img = new Image();
var img2 = new Image();
$(document).ready(function () {
    doUserDisplay();
    updateCanavs();
    //setInterval(redraw, 1000);
    $("#logout").click(logoutClient);
    $("#deletemyAccount").click(deleteAccount);
    var ctx = canvas.getContext('2d');
    trackTransforms(ctx);

    function redraw() {

        // Clear the entire canvas
        var p1 = ctx.transformedPoint(0, 0);
        var p2 = ctx.transformedPoint(canvas.width, canvas.height);
        ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);

        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
        ctx.globalAlpha = .85;
        //Create a for loop to draw all images in imagearray
        ////////////

        ///
        //console.log("picarray in redraw is:" + JSON.stringify(picarray));
        //console.log("attempoed to draw x" + picarray[0].x + "y is ");
        for (let i = 0; i < picarray.length; i++) {
            let tempdrawImage = new Image();
            //might need to do an ajax call instead of picarray[0].picadress
            //tempImage.src = getImageSrc(picarray[0].picAdress);
            //tempImage.src = picarray[0].picAdress;
            // img.src="/uploads/"+res;
            //tempImage.src = "/findImageSrc/" + picarray[i].picAdress;
            tempdrawImage.src = tempImage[i].src;
            ctx.drawImage(tempdrawImage, picarray[i].x, picarray[i].y);
        }


        //ctx.drawImage(img, 0, 0);
        //ctx.drawImage(img2, 500, 500);
        ///////////
    }
    redraw();
    setInterval(redraw, 1000);

    var lastX = canvas.width / 2,
        lastY = canvas.height / 2;

    var dragStart, dragged;

    canvas.addEventListener('mousedown', function (evt) {
        document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragStart = ctx.transformedPoint(lastX, lastY);
        dragged = false;
        dragX = (evt.pageX - canvas.offsetLeft);
        dragY = (evt.pageY - canvas.offsetTop);
    }, false);

    canvas.addEventListener('mousemove', function (evt) {
        lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
        lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
        dragged = true;
        if (dragStart) {
            var pt = ctx.transformedPoint(lastX, lastY);
            ctx.translate(pt.x - dragStart.x, pt.y - dragStart.y);
            redraw();
        }
    }, false);

    canvas.addEventListener('mouseup', function (evt) {
        dragStart = null;

        //remove this line for no zoom on click
        //if (!dragged) zoom(evt.shiftKey ? -1 : 1);
        //88888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888888
        canvasDragVal = getCanvasDragVal(canvas, evt);
        canvasX += canvasDragVal.x;
        canvasY += canvasDragVal.y;

        mousePos = getMousePos(canvas, evt);

        pictureX = mousePos.x - canvasX; //may be incorrect, but we'll see
        pictureY = mousePos.y - canvasY;
        $("#xCordinateID").val(Math.floor(pictureX));
        $("#yCordinateID").val(Math.floor(pictureY));


        console.log("canvasX = " + canvasX);
        console.log("canvasY = " + canvasY);
        console.log("canvasDragVal.x = " + canvasDragVal.x);
        console.log("canvasDragVal.y = " + canvasDragVal.y);
        console.log("mousePos.x = " + mousePos.x);
        console.log("mousePos.y = " + mousePos.y);
    }, false);

    function getCanvasDragVal(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left - dragX,
            y: evt.clientY - rect.top - dragY
        };
    }

    function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }
    //cahnge to 1 for no scale
    var scaleFactor = 1;

    var zoom = function (clicks) {
        var pt = ctx.transformedPoint(lastX, lastY);
        ctx.translate(pt.x, pt.y);
        var factor = Math.pow(scaleFactor, clicks);
        ctx.scale(factor, factor);
        ctx.translate(-pt.x, -pt.y);
        redraw();
    }

    var handleScroll = function (evt) {
        //Ternary Operator (conditon ? true:false)
        var delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
        if (delta) zoom(delta);
        return evt.preventDefault() && false;
    };

    canvas.addEventListener('DOMMouseScroll', handleScroll, false);
    canvas.addEventListener('mousewheel', handleScroll, false);
});
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////
img.src = 'https://wallpaperbrowse.com/media/images/soap-bubble-1958650_960_720.jpg';
img2.src = "https://www.gettyimages.com/gi-resources/images/Embed/new/embed2.jpg";
// Adds ctx.getTransform() - returns an SVGMatrix
// Adds ctx.transformedPoint(x,y) - returns an SVGPoint
function trackTransforms(ctx) {
    var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
    var xform = svg.createSVGMatrix();
    ctx.getTransform = function () {
        return xform;
    };

    var savedTransforms = [];
    var save = ctx.save;
    ctx.save = function () {
        savedTransforms.push(xform.translate(0, 0));
        return save.call(ctx);
    };

    var restore = ctx.restore;
    ctx.restore = function () {
        xform = savedTransforms.pop();
        return restore.call(ctx);
    };

    var scale = ctx.scale;
    ctx.scale = function (sx, sy) {
        xform = xform.scaleNonUniform(sx, sy);
        return scale.call(ctx, sx, sy);
    };

    var rotate = ctx.rotate;
    ctx.rotate = function (radians) {
        xform = xform.rotate(radians * 180 / Math.PI);
        return rotate.call(ctx, radians);
    };

    var translate = ctx.translate;
    ctx.translate = function (dx, dy) {
        xform = xform.translate(dx, dy);
        return translate.call(ctx, dx, dy);
    };

    var transform = ctx.transform;
    ctx.transform = function (a, b, c, d, e, f) {
        var m2 = svg.createSVGMatrix();
        m2.a = a;
        m2.b = b;
        m2.c = c;
        m2.d = d;
        m2.e = e;
        m2.f = f;
        xform = xform.multiply(m2);
        return transform.call(ctx, a, b, c, d, e, f);
    };

    var setTransform = ctx.setTransform;
    ctx.setTransform = function (a, b, c, d, e, f) {
        xform.a = a;
        xform.b = b;
        xform.c = c;
        xform.d = d;
        xform.e = e;
        xform.f = f;
        return setTransform.call(ctx, a, b, c, d, e, f);
    };

    var pt = svg.createSVGPoint();
    ctx.transformedPoint = function (x, y) {
        pt.x = x;
        pt.y = y;
        return pt.matrixTransform(xform.inverse());
    }
}
