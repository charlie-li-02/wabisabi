const playerBar = document.querySelector('[slot="player-bar"]');
let currentTrack = "";
let observer = new MutationObserver(function(mutations) {
    const currentTrackContainer = document.getElementsByClassName("content-info-wrapper style-scope ytmusic-player-bar")[0];
    if (currentTrackContainer && currentTrackContainer.textContent !== currentTrack) {
        currentTrack = currentTrackContainer.textContent;
        const currentTrackData = currentTrack.trim().split("\n      ");
        chrome.runtime.sendMessage({
            type: "trackChange",
            trackName: currentTrackData[0],
            trackInfo: currentTrackData[currentTrackData.length-1]
        }).catch(() => {
            // extension is not open
        });
    }
});

observer.observe(document, {attributes: true, childList: true, characterData: true, subtree:true});