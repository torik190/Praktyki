const accessKey = "EFJGPfM_Shem4FlBoyJucYIdGNa3cj6tBZb8_sui1cM"

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const liked = params.get("liked");

fetch("https://api.unsplash.com/photos/" + id + "?client_id=" + accessKey)
.then(response => response.json())
.then(results => {showData(results);})
.catch((error) => {console.error(error);});

function showData(data) {
    putIntoTable("id", data.id);
    putIntoTable("created", formatDate(data.created_at));
    putIntoTable("updated", formatDate(data.updated_at));
    putIntoTable("promoted", formatDate(data.promoted_at));
    putIntoTable("width", data.width, " px");
    putIntoTable("height", data.height, " px");
    putIntoTable("description", data.description);
    putIntoTable("alt_description", data.alt_description);
    putIntoTable("likes", data.likes, liked ? " + Ty" : undefined);
    putIntoTable("views", data.views);
    putIntoTable("downloads", data.downloads);

    putIntoTable("city", data.location.name);
    putIntoTable("latitude", data.location.position.latitude);
    putIntoTable("longitude", data.location.position.longitude);
    
    putIntoTable("camera", data.exif.name);
    putIntoTable("aperture", data.exif.aperture);
    putIntoTable("focal_length", data.exif.focal_length, " cm");
    putIntoTable("exposure_time", data.exif.exposure_time, " s");
    
    putIntoTable("user_id", data.user.id);
    putIntoTable("user_name", data.user.username);
    putIntoTable("user_first_name", data.user.first_name);
    putIntoTable("user_last_name", data.user.last_name);
    putIntoTable("user_updated", formatDate(data.user.updated_at));
    putIntoTable("user_bio", data.user.bio);
    putIntoTable("user_photos", data.user.total_photos);
    putIntoTable("user_collections", data.user.total_collections);
    putIntoTable("user_likes", data.user.total_likes);

    putIntoTable("raw", toLink(data.urls.raw));
    putIntoTable("download", toLink(data.links.download + "&force=true"));
    putIntoTable("photo", toLink(data.links.html));
    putIntoTable("portfolio", toLink(data.user.portfolio_url));
    putIntoTable("user", toLink(data.user.links.html));
}

function putIntoTable(id, value, unit) {
    const td = document.getElementById(id);
    if(value == null) {
        td.parentElement.remove();
        return;
    }
    if(unit == undefined)
        td.innerHTML = value;
    else
        td.innerHTML = value + unit;
}

function formatDate(date) {
    if(date == null)
        return null;
    return new Date(date).toLocaleDateString("pl-PL");
}

function toLink(link) {
    if(link == null)
        return null;
    return "<a href=\"" + link + "\" target=\"_blank\">" + link + "</a>";
}

function back() {
    window.opener.focus();
    window.close();
}