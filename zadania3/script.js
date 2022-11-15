const arr1 = ["Anna", "Maria"];
const arr2 = ["Adam", "Marek", "Bartek", "Tomek"];
const numbers = [1, 2, 3, 4, 5];

const subtractArrayFrom = (arr, initialValue) => arr.reduce((previousValue, currectValue) => previousValue - currectValue, initialValue);
const concatArrays = (arr1, arr2) => [...arr1, ...arr2];
const getLast = (arr) => arr.reverse()[0];
const filterArray = (arr, arg) => arr.filter(n => n == arg);
const sumArray = (arr) => arr.reduce((previousValue, currectValue) => previousValue + currectValue);
const squarePlus3 = (arr) => arr.map(n => n*n+3);
const filterNames = (arr) => arr.filter(n => n.length <= 5 && n.substr(n.length - 2) == 'ek');
const filterEven = (arr) => arr.filter(n => n % 2 == 0);
const getSmallest = (arr) => arr.reduce((previousValue, currectValue) => previousValue < currectValue ? previousValue : currectValue);

console.log('arr1:                        ' + arr1);
console.log('arr2:                        ' + arr2);
console.log('numbers:                     ' + numbers);
console.log('10-sum[0, 1, 2, 3, 4]:       ' + subtractArrayFrom([0, 1, 2, 3, 4], 10));
console.log('polacz arr1 i arr2:          ' + concatArrays(arr1, arr2));
console.log('ostatni z arr2:              ' + getLast(arr2));
console.log('arr2 gdzie n="Adam":         ' + filterArray(arr2, "Adam"));
console.log('sum(numbers):                ' + sumArray(numbers));
console.log('n^2+3 z kazdego z numbers:   ' + squarePlus3(numbers));
console.log('arr2 gdzie len<=5 i n="*ek": ' + filterNames(arr2));
console.log('numbers gdzie n mod 2 = 0:   ' + filterEven(numbers));
console.log('najmniejsza z numbers:       ' + getSmallest(numbers));