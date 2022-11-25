var container;
var images;

function findImages() {
    let query = document.getElementById("query").value;
    let perPage = 14;
    
    fetch("https://api.unsplash.com/search/photos?client_id=EFJGPfM_Shem4FlBoyJucYIdGNa3cj6tBZb8_sui1cM&query=" + query + "&per_page=" + perPage)
    .then(response => response.json())
    .then(data => data.results)
    .then(results => {
        images = results;
        showImages();
    })
    .catch((error) => {console.error(error);});
}

function showImages() {
    container = document.getElementById("container");
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
    //tile.onclick = "zoomImage(this.id)";
    tile.title = data.alt_description + "\n\nby " + data.user.name;

    let image = document.createElement("img");
    tile.appendChild(image);
    image.className = "image";
    image.src = data.urls.raw + "&fm=jpg&w=400&h=400&fit=crop";
    image.alt = "alt";

    tile.innerHTML += "&#9825; " + data.likes;
}

/*function zoomImage(id) {
    console.log(id);
}*/