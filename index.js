const albumsContainer = document.getElementById("albumsContainer")


async function onFetchAlbumClick() {

    const albumResponse = await fetch("http://localhost:3000/Album")
    const albumData = await albumResponse.json()

    const genreResponse = await fetch("http://localhost:3000/Genre")
    const genreData = await genreResponse.json()

    const reviewsResponse = await fetch("http://localhost:3000/Reviews")
    const reviewsData = await reviewsResponse.json()

    const genreMap = genreData.reduce((map, genre) => {
        map[genre.id] = genre.text;
        return map;
    }, {});

    const ratingMap = reviewsData.reduce((map, reviews) => {
        map[reviews.albumId] = reviews.rating;
        return map;
    }, {});

    const reviewsMap = reviewsData.reduce((map, reviews) => {
        map[reviews.albumId] = reviews.text;
        return map;
    }, {});

    albumsContainer.innerHTML = albumData.map(
        Album => `<div>
        <h2>${Album.id}</h2> <h2>${Album.title}</h2>
        <h3>${Album.artist}</h3>
        <p>${genreMap[Album.genreID]}</p>
        <p>${ratingMap[Album.id]}: ${reviewsMap[Album.id]}</p>
        </div>`
    ).join("")
}

let lastInput = null;

async function onCreateAlbumClick() {

    let titleInput = document.getElementById("createAlbum").value;
    let artistInput = document.getElementById("createArtist").value;;
    let genreInput = document.getElementById("createGenre").value;;
    let albumInput = null;

    if (titleInput !== "" && artistInput !== "" && genreInput !== "") {
        albumInput = {title: titleInput, artist: artistInput, genreID: genreInput}
        const albumResponse = await fetch("http://localhost:3000/Album", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(albumInput)
        })
        const newAlbum = await albumResponse.json()
        lastInput = newAlbum
    } else {
        console.log("Incomplete input")
        return
    }
} 

async function onDeleteAlbumClick() {
    
    const albumResponse = await fetch("http://localhost:3000/Album")
    const albumData = await albumResponse.json()

    const deleteID = document.getElementById("inputDelete").value;
    const albumToDelete = albumData.find(album => album.id == deleteID);

    if (albumToDelete !== undefined) {
        await fetch("http://localhost:3000/Album/" + albumToDelete.id, {
            method: "DELETE"
        })
        console.log("The album deleted was " + albumToDelete.title)
    } else {
        console.log("No album found with the given ID.");
    }
}