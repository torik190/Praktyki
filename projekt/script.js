function findImages() {
    var container = document.getElementById("container");
    container.innerHTML = "";

    let query = document.getElementById("query").value;
    let perPage = 14;
    
    fetch("https://api.unsplash.com/search/photos?client_id=EFJGPfM_Shem4FlBoyJucYIdGNa3cj6tBZb8_sui1cM&query=" + query + "&per_page=" + perPage)
    .then(response => response.json())
    .then(data => data.results)
    .then(results => {
        for(let image of results) {
            createImage(image.urls.raw, image.likes);
        }
    })
    .catch((error) => {console.error(error);});
}

function createImage(src, likes) {
    let tile = document.createElement("div");
    container.appendChild(tile);
    tile.className = "tile";

    let image = document.createElement("img");
    tile.appendChild(image);
    image.className = "image";
    image.src = src + "&fm=jpg&w=400&h=400&fit=crop";
    image.alt = "alt";

    tile.innerHTML += "&#9825; " + likes;
}