"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var PORT = 3000;
app_1["default"].listen(PORT, function () {
    return console.log("little victories server listening on port " + PORT);
});
