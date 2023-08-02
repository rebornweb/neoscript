"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pipeFix = void 0;
function pipeFix(numbers) {
    var array = [];
    var first = numbers[0];
    var last = numbers[numbers.length - 1];
    for (var i = first; i <= last; i++) {
        array.push(i);
    }
    return array;
}
exports.pipeFix = pipeFix;
pipeFix([-2, 4]);
