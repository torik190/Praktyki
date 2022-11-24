function findImages() {
    let query = document.getElementById("query").value;
    let perPage = 14;
    fetch("https://api.unsplash.com/search/photos?client_id=EFJGPfM_Shem4FlBoyJucYIdGNa3cj6tBZb8_sui1cM&query=" + query + "&per_page=" + perPage)
    .then(response => response.json())
    .then(data => data.results)
    .then(results => results.map(img => img.urls.raw))
    .then(srcs => {
        for(let src of srcs) {
            let img = document.createElement("img");
            document.body.appendChild(img);
            img.src = src + "&fm=jpg&w=200&h=200&fit=crop";
            img.alt = query;
        }
    })
    .catch((error) => {console.error(error);});
}