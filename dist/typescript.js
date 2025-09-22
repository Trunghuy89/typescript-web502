"use strict";
function rectangleInfo(width, height) {
    const perimeter = 2 * (width + height);
    const area = width * height;
    return { perimeter, area };
}
// Ví dụ sử dụng:
const w = 5;
const h = 10;
const result = rectangleInfo(w, h);
console.log(`Chiều rộng: ${w}, Chiều cao: ${h}`);
console.log(`Chu vi: ${result.perimeter}`);
console.log(`Diện tích: ${result.area}`);
