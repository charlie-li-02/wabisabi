function translate() {
    let lyricsDivs = document.getElementsByClassName("non-expandable description style-scope ytmusic-description-shelf-renderer");
    let lyricsFrame = lyricsDivs[lyricsDivs.length-1];
    console.log(lyricsFrame);
    let rawLyrics = lyricsFrame.textContent.replaceAll("\n", "*");

    const url = 'https://labs.goo.ne.jp/api/hiragana';

    const query = {
        app_id: "6ab97b2decd506fbc7f275c4087f008fad37fcca4a2d2d286c2e0ef5f0f96d72",
        request_id: "0",
        sentence: rawLyrics,
        output_type: "hiragana",
    };

    const queryOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
    };

    fetch(url, queryOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let convertedLyrics = data.converted.replaceAll("* ", "*").replaceAll(" *", "*");
            console.log(convertedLyrics);

            rawLyrics = rawLyrics.split('*');
            convertedLyrics = convertedLyrics.split('*');
            let processedLyrics = "";
            for (let i = 0; i < rawLyrics.length; i++) {
                let line = "\n\n";
                if (rawLyrics[i] !== '' && convertedLyrics[i] !== '') {
                    line = `(${convertedLyrics[i]})\n${rawLyrics[i]}\n\n`;
                }
                processedLyrics = processedLyrics.concat("", line);
            }

            console.log(processedLyrics);

            lyricsFrame.textContent = processedLyrics;
        })
        .catch(error => {
            console.error('Error:', error);
        });
};

export default translate;