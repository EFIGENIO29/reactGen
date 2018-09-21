"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var selectorFormObject = exports.selectorFormObject = function selectorFormObject(inputs) {

    var data = {};

    inputs.map(function (i) {
        var value = i.value;


        data[i.name] = value;
    });

    return data;
},
    selectorLabelsForm = exports.selectorLabelsForm = function selectorLabelsForm(inputs) {

    var data = {};

    inputs.map(function (i) {

        data[i.name] = i.label;
    });

    return data;
};