import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import {Box, ThemeProvider, Stack} from "@mui/material";
import {
    Wrapper,
    Backdrop,
    Overlay,
    WabisabiFace,
    ErrorMessage,
    CenteredDiv,
    LyricsContainer,
    InfoBar,
    Thumbnail,
    SongTitle,
    SongInfo,
    LyricsFadeTop,
    LyricsFadeBottom
} from "./components.jsx";
import CssBaseline from "@mui/material/CssBaseline";
import * as Theme from "./theme.jsx";
import Kuroshiro from "kuroshiro";
import KuromojiAnalyzer from "kuroshiro-analyzer-kuromoji";
import BeatLoader from "react-spinners/BeatLoader";


const errorFace = "(  ●  ‿  ●  )";
const notOnYTMErrorMessage = "play a song first!";
const refreshYTMErrorMessage = "refresh the music player page!";
const urlRegex = new RegExp('https:\\/\\/music.youtube.com\\/*');

const kuroshiro = new Kuroshiro();
await kuroshiro.init(new KuromojiAnalyzer({
    dictPath: `${chrome.runtime.getURL("/")}dict/`
}));

function decodeLyrics(lyrics) {
    return lyrics.replaceAll("*", "\n");
}

function Panel() {
    const [lyrics, setLyrics] = useState("");
    const [error, setError] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [title, setTitle] = useState("");
    const [info, setInfo] = useState("");

    const [init, setInit] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isFaceVisible, setIsFaceVisible] = useState(false);
    const [isInfoBarVisible, setIsInfoBarVisible] = useState(false);

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "trackChange" && request.trackName !== title && request.trackInfo !== info) {
        fetchData();
    }
});
    async function fetchData() {
        const tabs = await chrome.tabs.query({url: "https://music.youtube.com/*"});
        if (tabs.length !== 0) {
            const ytmTab = tabs[0];
            setLoading(true);
            setIsFaceVisible(false);
            setError("");
            setLyrics("");
            setIsInfoBarVisible(false);
            sendMessagePromise(ytmTab.id, {type: "fetchData"})
                .then((response) => {
                    generateFurigana(decodeLyrics(response.lyrics));
                    setThumbnail(response.image);
                    setTitle(response.title);
                    setInfo(response.info);
                    setIsInfoBarVisible(true);
                    setIsFaceVisible(false);
                    setError("");
                })
                .catch(() => {
                    setIsFaceVisible(true);
                    setError(refreshYTMErrorMessage);
                    setIsInfoBarVisible(false);
                })
                .finally(() => {
                    setLoading(false);
                })
        } else {
            setIsFaceVisible(true);
            setError(notOnYTMErrorMessage);
            setIsInfoBarVisible(false);
        }

    }

    function sendMessagePromise(tabId, message) {
        return new Promise((resolve, reject) => {
            chrome.tabs.sendMessage(tabId, message, response => {
                if(response && response.complete) {
                    resolve(response);
                } else {
                    reject("fetch unsuccessful");
                }
            })
        });
    }

    function generateFurigana(string) {
        kuroshiro.convert(string, {mode: "furigana", to: "hiragana"})
            .then(data => {
                setLyrics(data);
            })
    }

    useEffect(() => {
        if (init){
            setInit(false);
            fetchData();
        }
    })

    return (
        <ThemeProvider theme={Theme.darkTheme}>
            <Wrapper >
                <Backdrop style={{backgroundImage: `url(${thumbnail})`}}/>
                <Overlay>
                    <CssBaseline/>
                    <CenteredDiv>
                        {isFaceVisible &&
                        <WabisabiFace variant={"h2"}>
                            {errorFace}
                        </WabisabiFace>}
                        <ErrorMessage>
                            {error}
                        </ErrorMessage>
                    </CenteredDiv>
                    <CenteredDiv>
                        {loading && <BeatLoader loading={loading} color={"#ffffff"} size={30}/>}
                    </CenteredDiv>
                    <Box>
                        <LyricsFadeTop>
                            <LyricsFadeBottom>
                                <LyricsContainer variant={"h4"}>
                                    <div dangerouslySetInnerHTML={{ __html: lyrics }}/>
                                </LyricsContainer>
                            </LyricsFadeBottom>
                        </LyricsFadeTop>
                    </Box>
                    {isInfoBarVisible &&
                    <InfoBar direction={"row"} alignItems={"center"} justifyContent={"flex-start"} spacing={2}>
                        <Thumbnail style={{backgroundImage: `url(${thumbnail})`}}/>
                        <Stack alignItems={"stretch"} justifyContent={"center"} spacing={0}>
                            <SongTitle>
                                {title}
                            </SongTitle>
                            <SongInfo>
                                {info}
                            </SongInfo>
                        </Stack>
                    </InfoBar>}
                </Overlay>
            </Wrapper>
        </ThemeProvider>
    )
}

const root = ReactDOM.createRoot(document.getElementById("react-target"));
root.render(<Panel/>);