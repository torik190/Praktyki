function showCat(form) {
    let tag = form.tag.value;
    let n = parseInt(form.number.value);
    let div = document.getElementById("div");
    if(isNaN(n)) {
        div.innerHTML = "Ilość jest nieprawidłowa";
        return;
    }
    div.innerHTML = "";

    for(let i = 1; i <= n; i++) {
        let img = document.createElement("img");
        div.appendChild(img);
        img.alt = "Generowanie...";
        img.width = 300;
        fetch(tag == "" ? "https://cataas.com/cat" : "https://cataas.com/cat/" + tag)
        .then(response => {
            if(!response.ok) {
                div.innerHTML = "Nie można znaleść tagu";
                throw new Error("Nie można znaleść tagu");
            }
            return response.blob();
        })
        .then(imageBlob => {
            img.src = URL.createObjectURL(imageBlob);
        })
        .catch((error) => {
            console.error(error);
        });
    }
};

function showOneCat() {
    let div = document.getElementById("div2");
    div.innerHTML = "";
    let img = document.createElement("img");
    div.appendChild(img);
    img.alt = "Generowanie...";
    fetch("https://cataas.com/cat")
    .then(response => response.blob())
    .then(imageBlob => {
        img.src = URL.createObjectURL(imageBlob);
    })
    .catch((error) => {
        console.error(error);
    });
};