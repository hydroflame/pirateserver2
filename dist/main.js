"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var vlc_1 = require("./vlc");
var utils_1 = require("./utils");
var app = express();
var port = 3000;
var root = "root";
// app.use("/static/", express.static(root));
app.use("/raw/", express.static(root));
app.get("/api/files", function (req, res) {
    var files = (0, utils_1.listFiles)(root, root).map(function (f) {
        return f.slice(root.length + 1);
    });
    res.send(files);
});
app.get("/vlc/", (0, vlc_1.vlcHandler)(root));
app.listen(port, function () { return console.log("OK"); });
