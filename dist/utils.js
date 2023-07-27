"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listFiles = void 0;
var fs = require("fs");
var listFiles = function (root, path) {
    var stat = fs.statSync(path);
    if (stat.isDirectory()) {
        var paths = fs.readdirSync(path);
        return paths.map(function (p) { return (0, exports.listFiles)(root, "".concat(path, "/").concat(p)); }).flat();
    }
    else if (videoExts.some(function (ext) { return path.endsWith(ext); })) {
        return [path.slice(root.length + 1)];
    }
    return [];
};
exports.listFiles = listFiles;
var videoExts = [
    ".webm",
    ".mkv",
    ".flv",
    ".flv",
    ".vob",
    ".vob",
    ".ogv",
    ".ogg",
    ".drc",
    ".gif",
    ".gifv",
    ".g",
    ".webm",
    ".gifv",
    ".mng",
    ".avi",
    ".MTS",
    ".M2TS",
    ".mov",
    ".qt",
    ".wmv",
    ".net",
    ".yuv",
    ".rm",
    ".rmvb",
    ".asf",
    ".amv",
    ".mp4",
    ".m4p",
    ".m4v",
    ".mpg",
    ".mp2",
    ".mpeg",
    ".mpe",
    ".mpv",
    ".mpg",
    ".mpeg",
    ".m2v",
    ".m4v",
    ".svi",
    ".3gp",
    ".3g2",
    ".mxf",
    ".roq",
    ".nsv",
    ".flv",
    ".f4v",
    ".f4p",
    ".f4a",
    ".f4b",
];
