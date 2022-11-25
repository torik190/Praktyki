var container;
var images;
var query;
var perPage
var page;
var fun;

start();
function start() {
    perPage = 10;
    page = 1;
    fun = ()=>{randomImages()};
    //fun();
}

function handleFind() {
    let q = document.getElementById("query").value.trim();
    if(q == "")
        return;
    query = q;
    page = 1;
    fun = ()=>{findImages()};
    fun();
}

function showMore() {
    page += 1;
    fun();
}

function findImages() {
    fetch("https://api.unsplash.com/search/photos?client_id=EFJGPfM_Shem4FlBoyJucYIdGNa3cj6tBZb8_sui1cM&query=" + query + "&per_page=" + perPage + "&page=" + page)
    .then(response => response.json())
    .then(data => data.results)
    .then(results => {
        images = results;
        showImages();
    })
    .catch((error) => {console.error(error);});
}

function randomImages() {
    fetch("https://api.unsplash.com/photos/random?client_id=EFJGPfM_Shem4FlBoyJucYIdGNa3cj6tBZb8_sui1cM&count=" + perPage)
    .then(response => response.json())
    .then(results => {
        images = results;
        showImages();
    })
    .catch((error) => {console.error(error);});
}

function showImages() {
    container = document.getElementById("container");
    if(page == 1)
        container.innerHTML = "";

    for(let id in images) {
        createImage(id);
    }
}

function createImage(id) {
    data = images[id];

    let tile = document.createElement("div");
    container.appendChild(tile);
    tile.className = "tile";
    tile.id = id;
    tile.onclick = () => {zoomImage(id)};
    tile.title = "by " + data.user.name
    if(data.description != null)
        tile.title += "\n\n" + data.description;

    let image = document.createElement("img");
    tile.appendChild(image);
    image.className = "image";
    image.src = data.urls.raw + "&fm=jpg&w=400&h=400&fit=crop";
    image.alt = "alt";

    tile.innerHTML += "&#9825;&#10084; " + data.likes;
}

function zoomImage(id) {
    console.log(id);
}