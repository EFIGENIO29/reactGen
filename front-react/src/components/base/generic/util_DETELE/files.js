"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getCSV = exports.getCSV = function getCSV(list, headers) {
    var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "reporte";


    var downloadLink = void 0,
        line = [],
        str = "",
        uri = void 0;

    headers.map(function (h) {

        line.push(h.label);
    });

    str += line.join(",");
    str += "\r\n";

    list.map(function (l) {

        line = [];

        for (var index in l) {

            if (l.hasOwnProperty(index)) {

                line.push(l[index]);
            }
        }

        str += line.join(",");
        str += "\r\n";
    });

    uri = "data:text/csv;charset=utf-8," + encodeURIComponent(str);

    downloadLink = document.createElement("a");
    downloadLink.href = uri;
    downloadLink.download = title + ".csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
};