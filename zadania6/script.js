const promise1 = new Promise((resolve, reject) => {
    setTimeout(() => { resolve("Udało się!"); }, 5000);
});

function multiplyAsync(x, y) {
    return new Promise((resolve, reject) => {
        if(isNaN(x))
            reject("X nie jest liczbą");
        if(isNaN(y))
            reject("Y nie jest liczbą");
        resolve(x * y);
    });
}

promise1
.then(text => {console.log(text)})
.catch((error) => {console.error(error);});

multiplyAsync(2, 3)
.then(text => {console.log(text);})
.catch((error) => {console.error(error);});

fetch("https://jsonplaceholder.typicode.com/posts")
.then(response => {
    if(response.status == 200)
        return response;
    console.error("response niepoprawny");
})
.then(response => response.json())
.then(data => {
    for(x of data) {
        console.log("title:\n" + x.title);
        console.log("body:\n" + x.body);
    }
})
.catch((error) => {console.error(error);});