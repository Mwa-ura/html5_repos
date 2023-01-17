// local storage
function save(item) {
    var playlistArray = getStoreArray("playlist");
    playlistArray.push(item);
    localStorage.setItem("playlist", JSON.stringify(playlistArray));
}
// load song
function loadPlaylist() {
    var playlistArray = getSavedSongs();
    var ul = document.getElementById("playlist");
    if (playlistArray != null ) {
        for (var i = 0; i < playlistArray.length; i++) {
            var li = document.createElement("li");
            li.innerHTML = playlistArray[i];
            ul.appendChild(li);
        }
    }
}
// Save song
function getSavedSongs() {
    return getStoreArray("playlist");
}
// Display a song or blank form
function getStoreArray(key) {
    var playlistArray = localStorage.getItem(key);
    if (playlistArray == null || playlistArray == "") {
        playlistArray = new Array();
    }
    else { 
        playlistArray = JSON.parse(playlistArray);
    }
    return playlistArray;
}