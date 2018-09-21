"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getFormat = exports.getRenderBoolean = exports.getPercentageFormat = exports.getLinkFormat = exports.getCurrencyFormat = exports.getDateObject = exports.getDateDiff = exports.getDateFormat = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _FlatButton = require("material-ui/FlatButton");

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _colors = require("material-ui/styles/colors");

var _checkBox = require("material-ui/svg-icons/toggle/check-box");

var _checkBox2 = _interopRequireDefault(_checkBox);

var _indeterminateCheckBox = require("material-ui/svg-icons/toggle/indeterminate-check-box");

var _indeterminateCheckBox2 = _interopRequireDefault(_indeterminateCheckBox);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//asdasddsadsa
var getDateFormat = exports.getDateFormat = function getDateFormat(data) {
    var _data$isUnix = data.isUnix,
        isUnix = _data$isUnix === undefined ? true : _data$isUnix,
        _data$format = data.format,
        format = _data$format === undefined ? "DD/MM/YYYY" : _data$format; /// 15/15/15 //Date()

    var value = data.value;


    if (!value) {

        return;
    }

    switch (typeof value === "undefined" ? "undefined" : _typeof(value)) {

        case "object":
            value = (0, _moment2.default)(value).format(format);
            break;

        default:

            if (isUnix) {

                if (value.toString().length >= 12) {

                    value /= 1000;
                }

                value = _moment2.default.unix(value).format(format);
            } else {

                value = (0, _moment2.default)("15/15/15").format("DD/MM/YYYY");
            }
            break;

    }

    if (value === "Invalid date") {

        value = "Fecha no válida";
    }

    return value;
};

var getDateDiff = exports.getDateDiff = function getDateDiff(data) {
    var _data$isUnix2 = data.isUnix,
        isUnix = _data$isUnix2 === undefined ? true : _data$isUnix2,
        time = data.time;
    var date = void 0,
        diff = void 0,
        value = data.value,
        now = void 0;

    if (!value) {

        return;
    }

    switch (typeof value === "undefined" ? "undefined" : _typeof(value)) {

        case "object":
            value = (0, _moment2.default)(value).diff((0, _moment2.default)(), time);
            break;

        default:
            if (value.toString().length >= 12) {

                value /= 1000;
            }
            if (isUnix) {

                date = _moment2.default.unix(value);
                now = (0, _moment2.default)();
                diff = _moment2.default.duration(now.diff(date));

                if (isNaN(diff.years()) || isNaN(diff.months()) || isNaN(diff.days())) {

                    value = "Fecha no válida";
                } else {

                    value = diff.years() + " a\xF1os, " + diff.months() + " meses y " + diff.days() + " d\xEDas";
                }
            }
            break;

    }

    return value;
};

var getDateObject = exports.getDateObject = function getDateObject(value, unix) {

    var date = {};

    if (typeof value === "undefined" || value === null || value.toString().length === 0) {

        return null;
    } else if ((typeof value === "number" || typeof value === "string") && unix) {

        if (value.toString().length === 13) {

            value /= 1000;
        }

        date = _moment2.default.unix(value).toDate();
    } else if ((typeof value === "undefined" ? "undefined" : _typeof(value)) === "object") {

        date = value;
    }

    return date;
};

var getCurrencyFormat = exports.getCurrencyFormat = function getCurrencyFormat(value) {

    var formatter = new Intl.NumberFormat("es-MX", {
        "style": "currency",
        "currency": "MXN",
        "minimumFractionDigits": 2
    });

    if (isNaN(value)) {

        value = 0;
    }

    return formatter.format(value);
};

var getLinkFormat = exports.getLinkFormat = function getLinkFormat(value) {
    var labelBtn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Descargar";
    var target = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "_blank";


    return React.createElement(_FlatButton2.default, { label: labelBtn,
        secondary: true,
        target: target,
        href: value });
};

var getPercentageFormat = exports.getPercentageFormat = function getPercentageFormat(value) {

    return value + " %";
};

var getRenderBoolean = exports.getRenderBoolean = function getRenderBoolean() {
    var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var colorTrue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _colors.green500;
    var colorFalse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _colors.red500;


    if (flag) {

        return React.createElement(_checkBox2.default, { color: colorTrue });
    }

    return React.createElement(_indeterminateCheckBox2.default, { color: colorFalse });
};

var getFormat = exports.getFormat = function getFormat(data) {
    var type = data.type,
        value = data.value,
        _data$renderFalseAs = data.renderFalseAs,
        renderFalseAs = _data$renderFalseAs === undefined ? "No" : _data$renderFalseAs,
        _data$renderTrueAs = data.renderTrueAs,
        renderTrueAs = _data$renderTrueAs === undefined ? "Sí" : _data$renderTrueAs;


    switch (type) {
        case "currency":
            return getCurrencyFormat(value);
        case "date":
            return getDateFormat({ value: value });
        case "dateDiff":
            return getDateDiff({ value: value });
        case "percentage":
            return value + " %";
        case "boolean":

            if (value) {

                return renderTrueAs;
            }

            return renderFalseAs;

        case "none":
        default:
            return value;
    }
};