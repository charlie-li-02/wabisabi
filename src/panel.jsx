import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom/client";
import {Box, IconButton, ThemeProvider, Typography, Stack} from "@mui/material";
import {styled} from "@mui/system";
import RefreshIcon from "@mui/icons-material/Refresh";
import CssBaseline from "@mui/material/CssBaseline";
import {darkTheme} from "./theme.jsx";
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

    const Wrapper = styled(Box)({
        position: "relative",
        height: "100vh",
        overflow: "hidden"
    });

    const Backdrop = styled("div")({
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        position: "absolute",
        filter: "blur(20px) brightness(75%)",
        zIndex: -1,
        transform: "scale(1.1)",
        backgroundImage: `url(${thumbnail})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
    });

    const Overlay = styled("div")({
        zIndex: 10,
    });

    const RefreshLyricsButton = styled(IconButton)({
        bottom: 15,
        right: 5,
        width: "30px",
        height: "30px",
        position: "fixed",
        backgroundColor: "transparent",
        borderRadius: 5,
        zIndex: 99
    });

    const WabisabiFace = styled(Typography)({
        lineHeight: "200px",
        textAlign: "center",
        fontWeight: "bold",
        whiteSpace: "nowrap"
    });

    const ErrorMessage = styled(Typography)({
        flexGrow: 1,
        textAlign: "center"
    });

    const CenteredDiv = styled("div")({
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    });

    const Lyrics = styled(Typography)({
        height: "100vh",
        paddingTop: "1em",
        paddingBottom: "5em",
        paddingLeft: "1em",
        paddingRight: "1em",
        whiteSpace: "pre-line",
        lineHeight: "2",
        fontWeight: "bold",
        overflow: "auto",
    });

    const InfoBar = styled(Stack)({
        backgroundColor: "#2b2b2b",
        height: "65px",
        width: "100vw",
        paddingLeft: 20,
        paddingRight: 20,
        left: 0,
        bottom: 0,
        position: "fixed"
    });

    const Thumbnail = styled('div')({
        height: "40px",
        width: "40px",
        backgroundImage: `url(${thumbnail})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
    });


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
        <ThemeProvider theme={darkTheme}>
            <Wrapper>
                <Backdrop/>
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
                        <Lyrics variant={"h4"}>
                            <div dangerouslySetInnerHTML={{ __html: lyrics }}/>
                        </Lyrics>
                    </Box>
                    {isInfoBarVisible &&
                    <InfoBar direction={"row"} alignItems={"center"} justifyContent={"flex-start"} spacing={2}>
                        <Thumbnail/>
                        <Stack alignItems={"stretch"} justifyContent={"center"} spacing={0}>
                            <Typography sx={{fontSize: "14px", fontWeight: "bold"}}>
                                {title}
                            </Typography>
                            <Typography sx={{fontSize: "14px", fontWeight: "bold", color: "#909090"}}>
                                {info}
                            </Typography>
                        </Stack>
                    </InfoBar>}
                    {/*<RefreshLyricsButton*/}
                    {/*    variant={"contained"}*/}
                    {/*    onClick={fetchData}>*/}
                    {/*    <RefreshIcon/>*/}
                    {/*</RefreshLyricsButton>*/}
                </Overlay>
            </Wrapper>
        </ThemeProvider>
    )
}

const root = ReactDOM.createRoot(document.getElementById("react-target"));
root.render(<Panel/>);