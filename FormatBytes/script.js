"use strict";

function formatBytes(size, precision) {
    size = size * 1024;
    var arr = ['байт','Кб','Мб','Гб','Тб'];
    for(var i=0; i<arr.length; i++) {
        size = size / 1024;
        if (size<1024) { i++; break; }
    };
    if (i==1) {precision = 0}; 
    return size.toFixed(precision) + ' ' + arr[(i-1)];
};

var precision = 2;
var size = 1;
for(var i=0; i<20; i++) {
    size = size * 10
    console.log("formatBytes(" + size + ", " + precision + ") = " + formatBytes(size, precision));
};
size = 0;
console.log("formatBytes(" + size + ", " + precision + ") = " + formatBytes(size, precision));
size = 1;
console.log("formatBytes(" + size + ", " + precision + ") = " + formatBytes(size, precision));
size = 1024;
console.log("formatBytes(" + size + ", " + precision + ") = " + formatBytes(size, precision));
size = 1048576;
console.log("formatBytes(" + size + ", " + precision + ") = " + formatBytes(size, precision));
size = 1073741824;
console.log("formatBytes(" + size + ", " + precision + ") = " + formatBytes(size, precision));
size = 1099511627776;
console.log("formatBytes(" + size + ", " + precision + ") = " + formatBytes(size, precision));
