"use strict";
// // Kiểu dữ liệu cơ bản
// let myAge: number = 54;
// let herName: string = "huynt";
// // Mảng
// let myCourse: string[] = ["node.Js"];  
// let myPoint: number[] = [1, 3];
// // Object với type
// let student: {
//     id: number;
//     name: string;
//     age: number;
//     address: string;
// } = {
//     id: 123,
//     name: "huy",
//     age: 20,
//     address: "hanoi"
// };
// // Interface
// interface Dog {
//     name: string;
//     breed: string;
//     age: number;
//     from: string;
// }
// let dog: Dog = {
//     name: "trung",
//     breed: "becgie",
//     age: 20,
//     from: "hh" 
// };
// // any type
// let dog2: any = {
//     name: "trung",
//     breed: "becgie", 
//     age: 20,
//     from: "uk"
// };
// console.log(myAge, herName, myCourse, myPoint, student, dog, dog2);
//  Hàm tổng nhiều số (rest parameter)
function sumNumbers(...nums) {
    return nums.reduce((acc, cur) => acc + cur, 0);
}
// Hàm đếm số lần xuất hiện của 1 ký tự trong chuỗi
function countChar(str, char) {
    let count = 0;
    for (const c of str) {
        if (c === char)
            count++;
    }
    return count;
}
// Hàm kiểm tra số nguyên tố
function isPrime(num) {
    if (num < 2)
        return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0)
            return false;
    }
    return true;
}
console.log("Tổng:", sumNumbers(1, 2, 3, 4, 5)); // 15
console.log("Số lần xuất hiện:", countChar("hello", "l")); // 2 
console.log("17 có phải số nguyên tố?", isPrime(17));
console.log("18 có phải số nguyên tố?", isPrime(18));
