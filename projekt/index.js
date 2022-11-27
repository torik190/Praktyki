const accessKey = "EFJGPfM_Shem4FlBoyJucYIdGNa3cj6tBZb8_sui1cM";

var images = [];
var container;
var query;
var perPage;
var orderBy;
var page;
var fun;

function start() {
    document.getElementById("query").addEventListener("keypress", event => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleFind();
        }
    });

    document.getElementById("query").value = "";
    perPage = 10;
    orderBy = "relevant";
    page = 1;
    closeZoom();
    fun = ()=>{randomImages()};
    //fun();
}

//-----reakcja na przyciski strony głównej-----

function handleFind() {
    let q = document.getElementById("query").value.trim();
    if(q == "")
        return;
    query = q;
    page = 1;
    closeZoom();
    fun = ()=>{findImages()};
    fun();
}

function showMore() {
    page += 1;
    fun();
}

function settingsChanged() {
    perPage = document.getElementById("per_page").value;
    orderBy = document.getElementById("order_by").value;
    page = 1;
    fun();
}

//-----pobieranie zdjęć-----

function findImages() {
    document.getElementById("order_by").parentElement.style = "display: block";
    fetch("https://api.unsplash.com/search/photos?client_id=" + accessKey + "&query=" + query + "&per_page=" + perPage + "&page=" + page + "&order_by=" + orderBy)
    .then(response => response.json())
    .then(data => data.results)
    .then(results => {
        if(page <= 1)
            images = [];
        images = [...images, ...results];
        showImages();
    })
    .catch(error => {console.error(error);});
}

function randomImages() {
    document.getElementById("order_by").parentElement.style = "display: none";
    fetch("https://api.unsplash.com/photos/random?client_id=" + accessKey + "&count=" + perPage)
    .then(response => response.json())
    .then(results => {
        if(page <= 1)
            images = [];
        images = [...images, ...results];
        showImages();
    })
    .catch(error => {console.error(error);});
}

//-----wyświetlanie zdjęć-----

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
    tile.className = "imageTile";
    tile.id = id;
    tile.onclick = () => {zoomImage(id)};
    tile.title = "by " + data.user.name
    if(data.description != null)
        tile.title += "\n\n" + data.description;

    let image = document.createElement("img");
    tile.appendChild(image);
    image.className = "image";
    image.src = data.urls.raw + "&fm=jpg&w=400&h=400&fit=crop";
    image.alt = "image";

    tile.innerHTML += (isLiked(data.id) ? "&#10084; " : "&#9825; ") + (data.likes + isLiked(data.id));
}

//-----przybliżanie zdjęcia-----

function zoomImage(id) {
    let data = images[id];
    
    document.getElementById("zoom").style = "display: block";
    document.getElementById("zoomImg").src = data.urls.full;
    document.getElementById("zoomLike").children[0].src = isLiked(data.id) ? "icons/like.png" : "icons/unlike.png";
    document.getElementById("zoomLike").title = isLiked(data.id) ? "Odlub" : "Polub";
    
    document.getElementById("zoomImg").onclick = event => {
        event.stopPropagation();
        window.open(data.urls.raw, '_blank').focus();
    };
    
    document.getElementById("zoomLike").onclick = event => {
        event.stopPropagation();
        changeLike(data.id);
        zoomImage(id);
        showImages();
    };
    
    document.getElementById("zoomAuthor").onclick = event => {
        //event.stopPropagation();
        zoomUser(data.user);
    };
    
    document.getElementById("zoomDownload").onclick = event => {
        event.stopPropagation();
        window.open(data.links.download + "&force=true", '_blank').focus();
    };
    
    document.getElementById("zoomInfo").onclick = event => {
        event.stopPropagation();
        window.open("imageInfo.html?id=" + data.id + "&liked=" + isLiked(data.id), '_blank').focus();
    };
}

function closeZoom() {
    document.getElementById("zoom").style = "display: none";
}

//-----strona użytkownika-----

function zoomUser(data) {
    document.getElementById("user").style = "display: block";
    document.getElementById("userImg").src = data.profile_image.large;
    document.getElementById("userName").innerHTML = data.username;
    document.getElementById("userBio").innerHTML = data.bio;
    
    document.getElementById("userDiv").onclick = event => {
        event.stopPropagation();
    };
    
    document.getElementById("userInfo").onclick = event => {
        event.stopPropagation();
        window.open("userInfo.html?id=" + data.username, '_blank').focus();
    };
}

function closeUser() {
    document.getElementById("user").style = "display: none";
}

//-----like/unlike-----

var likedImages = [];

function isLiked(id) {
    return likedImages.includes(id);
}

function changeLike(id) {
    if(isLiked(id)) {
        likedImages = likedImages.filter(el => el != id);
    } else {
        likedImages.push(id);
    }
}