chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type === "fetchData") {
            fetchData()
                .then(data => {
                    sendResponse({
                        complete: true,
                        lyrics: data.lyrics,
                        image: data.image,
                        title: data.title,
                        info: data.info,
                    })
                });
        }
        return true;
    });

async function fetchData() {
    let playerWasOpen = true;
    let tabSelected = 1;

    const openPlayerButton = document.querySelector('[aria-label="Open player page"]');
    const playerPage = document.getElementById("player-page");
    const lyricsContainer = document.querySelector('[page-type="MUSIC_PAGE_TYPE_TRACK_LYRICS"]');
    const playerTabs = document.getElementsByClassName("tab-header style-scope ytmusic-player-page");

    // check if player page is open and open it if it isn't
    if (playerPage.style.visibility === "hidden") {
        playerWasOpen = false;
        openPlayerButton.click();
    }
    // check if lyrics tab is open and open it if it isn't
    if (lyricsContainer === null || lyricsContainer.style.display === "none") {
        for (let i = 0; i < playerTabs.length; i++) {
            if (playerTabs[i].ariaSelected === "true") {
                tabSelected = i;
            }
        }
        playerTabs[1]?.click();
    }
    // wait for the lyrics to be populated
    await new Promise(r => setTimeout(r, 1000));
    // scrape the data
   const data = scrapeData();

    if (tabSelected !== 1) {
        playerTabs[tabSelected].click();
    }
   if (playerWasOpen === false) {
       const closePlayerButton = document.querySelector('[aria-label="Close player page"]');
       closePlayerButton.click();
   }

   return data;
}

function encodeLyrics(lyrics) {
    return lyrics?.replaceAll("\n", "*");
}

function scrapeData() {
    const data = {};
    const currentTrackContainer = document.getElementsByClassName("content-info-wrapper style-scope ytmusic-player-bar");
    const currentTrack = currentTrackContainer[0].textContent.trim().split("\n      ");
    data.title = currentTrack[0];
    data.info = currentTrack[currentTrack.length-1];
    const lyricsContainer = document.getElementsByClassName("non-expandable description style-scope ytmusic-description-shelf-renderer");
    data.lyrics = encodeLyrics(lyricsContainer[lyricsContainer.length - 1]?.textContent);
    const albumCoverContainer = document.getElementById("song-image");
    data.image = albumCoverContainer.getElementsByTagName('img')[0].src;
    data.complete = true;
    return data;
}
