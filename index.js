async function onFetchAlbum() {
    const response = await fetch("http://localhost:3000/Album")
    const data = await response.json()

    console.log(data);
}