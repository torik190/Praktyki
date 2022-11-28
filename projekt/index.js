const accessKey = "EFJGPfM_Shem4FlBoyJucYIdGNa3cj6tBZb8_sui1cM";

var tiles = [];
var container;
var query;
var perPage;
var findOrderBy;
var userOrderBy;
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
    findOrderBy = "relevant";
    userOrderBy = "latest";
    page = 1;
    closeZoom();
    fun = ()=>{randomImages()};
    fun();
}

function setOrderBy(type) {
    document.getElementById("find_order_by").parentElement.style = "display: none";
    document.getElementById("user_order_by").parentElement.style = "display: none";
    if(type == "find")
        document.getElementById("find_order_by").parentElement.style = "display: block";
    if(type == "user")
        document.getElementById("user_order_by").parentElement.style = "display: block";

}

//-----reakcja na przyciski strony głównej-----

function handleFind() {
    closeZoom();
    closeUser();

    let q = document.getElementById("query").value.trim();
    if(q == "")
        return;
    query = q;
    page = 1;
    
    let c = document.getElementById("category").value;
    if(c == "photo")
        fun = ()=>{findImages()};
    else if(c == "user")
        fun = ()=>{findUsers()};
    else if(c == "collection")
        fun = ()=>{findCollections()};
    fun();
}

function showMore() {
    page += 1;
    fun();
}

function settingsChanged() {
    perPage = document.getElementById("per_page").value;
    findOrderBy = document.getElementById("find_order_by").value;
    userOrderBy = document.getElementById("user_order_by").value;
    page = 1;
    fun();
}

function handleCollection(q) {
    query = q;
    page = 1;
    fun = ()=>{collectionImages()};
    fun();
}

//-----pobieranie zdjęć-----

function findImages() {
    setOrderBy("find");
    fetch("https://api.unsplash.com/search/photos?client_id=" + accessKey + "&query=" + query + "&per_page=" + perPage + "&page=" + page + "&order_by=" + findOrderBy)
    .then(response => response.json())
    .then(data => data.results)
    .then(results => {updateImageTiles(results);})
    .catch(error => {console.error(error);});
}

function randomImages() {
    setOrderBy("none");
    fetch("https://api.unsplash.com/photos/random?client_id=" + accessKey + "&count=" + perPage)
    .then(response => response.json())
    .then(results => {updateImageTiles(results);})
    .catch(error => {console.error(error);});
}

function userImages() {
    setOrderBy("user");
    fetch("https://api.unsplash.com/users/" + query + "/photos?client_id=" + accessKey + "&per_page=" + perPage + "&page=" + page + "&order_by=" + userOrderBy)
    .then(response => response.json())
    .then(results => {updateImageTiles(results);})
    .catch(error => {console.error(error);});
}

function userLikedImages() {
    setOrderBy("user");
    fetch("https://api.unsplash.com/users/" + query + "/likes?client_id=" + accessKey + "&per_page=" + perPage + "&page=" + page + "&order_by=" + userOrderBy)
    .then(response => response.json())
    .then(results => {updateImageTiles(results);})
    .catch(error => {console.error(error);});
}

function collectionImages() {
    setOrderBy("none");
    fetch("https://api.unsplash.com/collections/" + query + "/photos?client_id=" + accessKey + "&per_page=" + perPage + "&page=" + page)
    .then(response => response.json())
    .then(results => {updateImageTiles(results);})
    .catch(error => {console.error(error);});
}

//-----pobieranie użytkowników-----

function findUsers() {
    setOrderBy("none");
    fetch("https://api.unsplash.com/search/users?client_id=" + accessKey + "&query=" + query + "&per_page=" + perPage + "&page=" + page)
    .then(response => response.json())
    .then(data => data.results)
    .then(results => {updateUserTiles(results);})
    .catch(error => {console.error(error);});
}

//-----pobieranie kolekcji-----

function findCollections() {
    setOrderBy("none");
    fetch("https://api.unsplash.com/search/collections?client_id=" + accessKey + "&query=" + query + "&per_page=" + perPage + "&page=" + page)
    .then(response => response.json())
    .then(data => data.results)
    .then(results => {updateCollectionTiles(results);})
    .catch(error => {console.error(error);});
}

function userCollections() {
    setOrderBy("none");
    fetch("https://api.unsplash.com/users/" + query + "/collections?client_id=" + accessKey + "&per_page=" + perPage + "&page=" + page)
    .then(response => response.json())
    .then(results => {updateCollectionTiles(results);})
    .catch(error => {console.error(error);});
}

//-----wyświetlanie zdjęć-----

function updateImageTiles(results) {
    if(page <= 1) {
        tiles = [];
        window.scrollTo(0, 0);
    }
    tiles = [...tiles, ...results];
    showImageTiles();
}

function showImageTiles() {
    container = document.getElementById("container");
    container.innerHTML = "";

    for(let id in tiles) {
        createImageTile(id);
    }
}

function createImageTile(id) {
    let data = tiles[id];

    let tile = document.createElement("div");
    container.appendChild(tile);
    tile.className = "imageTile";
    tile.onclick = () => {zoomImage(data)};
    tile.title = data.user.username;
    if(data.description != null)
        tile.title += "\n\n" + data.description;

    let image = document.createElement("img");
    tile.appendChild(image);
    image.src = data.urls.raw + "&fm=jpg&w=400&h=400&fit=crop";

    tile.innerHTML += (isLiked(data.id) ? "&#10084; " : "&#9825; ") + (data.likes + isLiked(data.id));
}

//-----wyświetlanie użytkowników-----

function updateUserTiles(results) {
    if(page <= 1) {
        tiles = [];
        window.scrollTo(0, 0);
    }
    tiles = [...tiles, ...results];
    showUserTiles();
}

function showUserTiles() {
    container = document.getElementById("container");
    container.innerHTML = "";

    for(let id in tiles) {
        createUserTile(id);
    }
}

function createUserTile(id) {
    let data = tiles[id];

    let tile = document.createElement("div");
    container.appendChild(tile);
    tile.className = "userTile";
    tile.onclick = () => {zoomUser(data)};
    tile.title = data.username + "\n\n" + data.name;

    let image = document.createElement("img");
    tile.appendChild(image);
    image.src = data.profile_image.large;

    tile.innerHTML += data.username;
}

//-----wyświetlanie kolekcji-----

function updateCollectionTiles(results) {
    if(page <= 1) {
        tiles = [];
        window.scrollTo(0, 0);
    }
    tiles = [...tiles, ...results];
    showCollectionTiles();
}

function showCollectionTiles() {
    container = document.getElementById("container");
    container.innerHTML = "";

    for(let id in tiles) {
        createCollectionTile(id);
    }
}

function createCollectionTile(id) {
    let data = tiles[id];

    let tile = document.createElement("div");
    container.appendChild(tile);
    tile.className = "collectionTile";
    tile.onclick = () => {handleCollection(data.id);};
    tile.title = data.user.username;
    if(data.description != null)
        tile.title += "\n\n" + data.description;

    let image = document.createElement("img");
    tile.appendChild(image);
    image.src = data.cover_photo.urls.raw + "&fm=jpg&w=400&h=400&fit=crop";

    tile.innerHTML += data.title + " - " + data.total_photos + " photos";
}

//-----przybliżanie zdjęcia-----

function zoomImage(data) {
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
        zoomImage(data);
        showImageTiles();
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
    
    document.getElementById("userPhotos").onclick = event => {
        event.stopPropagation();
        query = data.username;
        page = 1;
        fun = ()=>{userImages()};
        fun();

        closeUser();
    };
    
    document.getElementById("userLikedPhotos").onclick = event => {
        event.stopPropagation();
        query = data.username;
        page = 1;
        fun = ()=>{userLikedImages()};
        fun();

        closeUser();
    };
    
    document.getElementById("userCollections").onclick = event => {
        event.stopPropagation();
        query = data.username;
        page = 1;
        fun = ()=>{userCollections()};
        fun();

        closeUser();
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