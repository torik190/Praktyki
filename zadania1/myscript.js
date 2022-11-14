//Kalkulator

function handleCalculator(form) {
    form.result.innerHTML = calculate(form.input1.value, form.input2.value, form.mode.value);
}

function calculate(x, y, mode) {
    x = parseFloat(x);
    y = parseFloat(y);
    switch(mode) {
        case 'add':
            return x + y;
        case 'sub':
            return x - y;
        case 'mul':
            return x * y;
        case 'div':
            if(y == 0)
                return 'Dzielenie przez zero';
            return x / y;
        case 'mod':
            if(y == 0)
                return 'Dzielenie przez zero';
            return x % y;
        case 'pow':
            if(y % 1 != 0)
                return 'Wykładnik nie jest całkowity';
            return power(x, y);
        case 'log':
            if(x < 0)
                return 'Liczba jest ujemna';
            if(y <= 1)
                return 'Podstawa jest mniejsza lub równa 1';
            let z = log(x, y, x > 1);
            if(isNaN(z))
                return 'Wynik nie jest całkowity';
            return z;
        case 'fac':
            if(x % 1 != 0)
                return 'Liczba nie jest całkowita';
            if(x < 0)
                return 'Liczba jest ujemna';
            return factorial(x);
    }
}

function changeNames(form, mode) {
    n1 = form.name1;
    n2 = form.name2;
    i2 = form.input2;
    i2.disabled = false;
    switch(mode) {
        case 'add':
            n1.innerHTML = 'Składnik:';
            n2.innerHTML = 'Składnik:';
            return;
        case 'sub':
            n1.innerHTML = 'Odjemna:';
            n2.innerHTML = 'Odejmnik:';
            return;
        case 'mul':
            n1.innerHTML = 'Czynnik:';
            n2.innerHTML = 'Czynnik:';
            return;
        case 'div':
            n1.innerHTML = 'Dzielna:';
            n2.innerHTML = 'Dzielnik:';
            return;
        case 'mod':
            n1.innerHTML = 'Dzielna:';
            n2.innerHTML = 'Dzielnik:';
            return;
        case 'pow':
            n1.innerHTML = 'Podstawa:';
            n2.innerHTML = 'Wykładnik:';
            return;
        case 'log':
            n1.innerHTML = 'Liczba logarytmowa:';
            n2.innerHTML = 'Podstawa logarytmu';
            return;
        case 'fac':
            n1.innerHTML = 'Liczba naturalna:';
            n2.innerHTML = 'Nie dotyczy';
            i2.disabled = true;
            return;
    }
}

function power(x, y) {
    if(y == 0)
        return 1;
    if(y < 0)
        return power(x, y+1) / x;
    return power(x, y-1) * x;
}

function log(x, y, test) {
    if(x == 1)
        return 0;
    if(x > 1 != test)
        return NaN;
    if(x < 1)
        return log(x * y, y, false) - 1;
    return log(x / y, y, true) + 1;
}

function factorial(x) {
    if(x <= 1)
        return 1;
    return factorial(x-1) * x;
}

//Palindrom

function handlePalindrome(form) {
    form.result.innerHTML = palindrome(form.input.value);
}

function palindrome(x) {
    x = x.toLowerCase();
    for(let i in x) {
        if(x[i] != x[x.length - 1 - i])
            return 'Nie jest';
    }
    return 'Jest';
}

//drugi największy

function handleFindInArray(form) {
    let arr = distinct(form.input.value.split(','));
    if(arr.length < 2) {
        form.result.innerHTML = 'Tablica jest za krótka';
        return;
    }
    let numbers = isNumbers(arr);
    arr = sort(arr, numbers);
    form.result.innerHTML = arr[arr.length-2] + '<br><br>jest drugie ' + (numbers ? 'największe' : 'najdłuższe') + ' w:<br>[' + arr + ']';
}

function distinct(arr) {
    let arr2 = [];
    for(let x of arr) {
        if(!contains(arr2, x))
            arr2.push(x);
    }
    return arr2;
}

function contains(arr, y) {
    for(let x of arr) {
        if(x == y)
            return true;
    }
    return false;
}

function isNumbers(arr) {
    for(let x of arr) {
        if(isNaN(x))
            return false;
    }
    return true;
}

function sort(arr, numbers) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < (arr.length - i - 1); j++) {
            if(numbers ? parseFloat(arr[j]) > parseFloat(arr[j+1]) : arr[j].length > arr[j+1].length) {           
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}
