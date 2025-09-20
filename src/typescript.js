function rectangleInfo(width, height) {
    var perimeter = 2 * (width + height);
    var area = width * height;
    return { perimeter: perimeter, area: area };
}
// Ví dụ sử dụng:
var w = 5;
var h = 10;
var result = rectangleInfo(w, h);
console.log("Chi\u1EC1u r\u1ED9ng: ".concat(w, ", Chi\u1EC1u cao: ").concat(h));
console.log("Chu vi: ".concat(result.perimeter));
console.log("Di\u1EC7n t\u00EDch: ".concat(result.area));
