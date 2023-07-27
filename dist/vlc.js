"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vlcHandler = void 0;
var utils_1 = require("./utils");
var vlcTrackURL = function (host, file) {
    return encodeURI("".concat(host, "/raw/").concat(file));
};
var vlcPlaylistTrack = function (host) { return function (file, i) {
    return "<track>\n<location>".concat(vlcTrackURL(host, file), "</location>\n<title>").concat(file, "</title>\n<extension application=\"http://www.videolan.org/vlc/playlist/0\">\n    <vlc:id>").concat(i, "</vlc:id>\n    <vlc:option>network-caching=1000</vlc:option>\n</extension>\n</track>");
}; };
var vlcPlaylistContent = function (host, name, files) {
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?><playlist xmlns=\"http://xspf.org/ns/0/\" xmlns:vlc=\"http://www.videolan.org/vlc/playlist/ns/0/\" version=\"1\"><title>".concat(name, "</title><trackList>\n    ").concat(files.map(vlcPlaylistTrack(host)).join(""), "\n</trackList><extension application=\"http://www.videolan.org/vlc/playlist/0\">\n    ").concat(files.map(function (_, i) { return "<vlc:item tid=\"".concat(i, "\"/>"); }).join(""), "\n</extension></playlist>");
};
var vlcHandler = function (root) { return function (req, res) {
    var source = String(req.query["source"]);
    var path = "".concat(root, "/").concat(source);
    var files = (0, utils_1.listFiles)(root, path);
    res.send(vlcPlaylistContent(req.headers.host, source, files));
}; };
exports.vlcHandler = vlcHandler;
