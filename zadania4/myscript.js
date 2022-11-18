const books = [
    {title: 'Total loss', pages: 600, genre: 'fantasy', rating: 5},
    {title: 'Total enlightenment', pages: 250, genre: 'romance', rating: 2},
    {title: 'Big loss', pages: 400, genre: 'fantasy', rating: 7},
    {title: '10th Joy', pages: 32, genre: 'action', rating: 8},
    {title: 'Quickfix', pages: 15, genre: 'fantasy', rating: 1},
    {title: 'World Ender', pages: 199, genre: 'fantasy', rating: 3},
    {title: 'Paranormal', pages: 200, genre: 'thriller', rating: 9},
    {title: '300', pages: 600, genre: 'criminology', rating: 10},
    {title: 'Renewer', pages: 472, genre: 'biology', rating: 2},
];

const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);

const filterPagesIsEven = (list) => list.filter((book) => book.pages % 2 == 0);
const filterPagesIsOdd = (list) => list.filter((book) => book.pages % 2 == 1);
const filterGenreEndsWithY = (list) => list.filter((book) => book.genre.endsWith('y'));
const filterLetterIsNotSpace = (list) => list.filter((letter) => letter != ' ');
const filterGreaterThan5 = (list) => list.filter((x) => x > 5);
const filterTitleContainsNumber = (list) => list.filter((book) => [...book.title].some((letter) => letter != ' ' && !isNaN(letter)));

const mapToTitles = (list) => list.map((book) => book.title);
const mapToRatings = (list) => list.map((book) => book.rating);

const sortByLength = (list) => list.sort((a, b) => b.length - a.length);

const toLetters = (list) => list.reduce((currLetters, newTitle) => [...currLetters, ...newTitle]);
const arrayLength = (list) => list.length;
const getSecond = (list) => list[1];

const zad1 = compose(arrayLength, filterLetterIsNotSpace, toLetters, mapToTitles, filterPagesIsEven, filterGenreEndsWithY);
const zad2 = compose(arrayLength, filterGreaterThan5, mapToRatings, filterPagesIsOdd, filterTitleContainsNumber);
const zad3 = compose(getSecond, sortByLength, mapToTitles);
console.log(zad1(books));
console.log(zad2(books));
console.log(zad3(books));
