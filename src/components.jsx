import {styled} from "@mui/system";
import {Box, IconButton, Stack, Typography} from "@mui/material";

export const Wrapper = styled(Box)({
    position: "relative",
    height: "100vh",
    overflow: "hidden"
});

export const Backdrop = styled("div")({
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    position: "absolute",
    filter: "blur(20px) brightness(75%)",
    zIndex: -1,
    transform: "scale(1.1)",
    backgroundSize: "cover",
    backgroundPosition: "center",
});

export const Overlay = styled("div")({
    zIndex: 10,
});

export const RefreshLyricsButton = styled(IconButton)({
    bottom: 15,
    right: 5,
    width: "30px",
    height: "30px",
    position: "fixed",
    backgroundColor: "transparent",
    borderRadius: 5,
    zIndex: 99
});

export const WabisabiFace = styled(Typography)({
    lineHeight: "200px",
    textAlign: "center",
    fontWeight: "bold",
    whiteSpace: "nowrap"
});

export const ErrorMessage = styled(Typography)({
    flexGrow: 1,
    textAlign: "center"
});

export const CenteredDiv = styled("div")({
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
});

export const LyricsFadeTop = styled('div')({
    WebkitMaskImage: "linear-gradient(to top, black 90%, transparent 100%), linear-gradient(to left, black 5px, transparent 6px)",
    maskImage: "linear-gradient(to top, black 90%, transparent 100%), linear-gradient(to left, black 5px, transparent 6px)",
});

export const LyricsFadeBottom = styled('div')({
    WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent 100%), linear-gradient(to left, black 5px, transparent 6px)",
    maskImage: "linear-gradient(to bottom, black 90%, transparent 100%), linear-gradient(to left, black 5px, transparent 6px)",
});

export const LyricsContainer = styled(Typography)({
    height: "95vh",
    paddingTop: "2em",
    paddingBottom: "5em",
    paddingLeft: "1em",
    paddingRight: "1em",
    whiteSpace: "pre-line",
    lineHeight: "2",
    fontWeight: "bold",
    overflow: "auto",
});

export const InfoBar = styled(Stack)({
    backgroundColor: "#2b2b2b",
    height: "65px",
    width: "100vw",
    paddingLeft: 20,
    paddingRight: 20,
    left: 0,
    bottom: 0,
    position: "fixed"
});

export const Thumbnail = styled('div')({
    height: "40px",
    width: "40px",
    backgroundSize: "cover",
    backgroundPosition: "center"
});

export const SongTitle = styled(Typography) ({
    fontSize: "14px",
    fontWeight: "bold",
    textOverflow: "ellipsis",
});

export const SongInfo = styled(Typography) ({
    fontSize: "14px",
    fontWeight: "bold",
    color: "#909090",
    textOverflow: "ellipsis",
});