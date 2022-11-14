//liczby z przedziału
function handleRange(form) {
    let a = parseInt(form.input1.value);
    let b = parseInt(form.input2.value);
    if(isNaN(a) || isNaN(b)) {
        form.result.innerHTML = 'Dane niepoprawne';
        return;
    }
    form.result.innerHTML = range(a, b);
}

function range(a, b) {
    if(a < b) {
        return a + ' ' + range(a + 1, b);
    } else if(a > b) {
        return a + ' ' + range(a - 1, b);
    }
    return a;
}

//szukanie w tablicy

function handleSearch(form) {
    let arr = form.input1.value.split(',');
    let x = parseInt(form.input2.value);
    if(isNaN(x)) {
        form.result.innerHTML = 'Dane niepoprawne';
        return;
    }
    for(let el of arr) {
        if(isNaN(el)) {
            form.result.innerHTML = 'Dane niepoprawne';
            return;
        }
    }
    arr = sort(arr);
    let y = search(arr, 0, arr.length-1, x);
    form.result.innerHTML = arr;
    if(y == undefined)
        form.result.innerHTML += '<br>Liczby ' + x + ' nie ma w tablicy';
    else
        form.result.innerHTML += '<br>Liczba ' + x + ' znajduje się na pozycji ' + y;
}

function search(arr, start, end, c) {
    console.log(start, end);
    if(start > end)
        return undefined;
    let q = parseInt((start + end) / 2);
    if(arr[q] > c) return search(arr, start, q-1, c);
    if(arr[q] < c) return search(arr, q+1, end, c);
    return q;
}


function sort(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < (arr.length - i - 1); j++) {
            if(parseFloat(arr[j]) > parseFloat(arr[j+1])) {           
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}