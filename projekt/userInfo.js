const accessKey = "EFJGPfM_Shem4FlBoyJucYIdGNa3cj6tBZb8_sui1cM"

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch("https://api.unsplash.com/users/" + id + "?client_id=" + accessKey)
.then(response => response.json())
.then(results => {showData(results);})
.catch((error) => {console.error(error);});

function showData(data) {
    putIntoTable("id", data.id);
    putIntoTable("name", data.username);
    putIntoTable("first_name", data.first_name);
    putIntoTable("last_name", data.last_name);
    putIntoTable("updated", formatDate(data.updated_at));
    putIntoTable("bio", data.bio);
    putIntoTable("location", data.location);
    putIntoTable("photos", data.total_photos);
    putIntoTable("collections", data.total_collections);
    putIntoTable("likes", data.total_likes);
    putIntoTable("downloads", data.downloads);
    putIntoTable("followers", data.followers_count);
    
    putIntoTable("instagram", data.instagram_username);
    putIntoTable("twitter", data.twitter_username);
    putIntoTable("paypal", data.social.paypal_email);

    putIntoTable("portfolio", toLink(data.portfolio_url));
    putIntoTable("user", toLink(data.links.html));
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