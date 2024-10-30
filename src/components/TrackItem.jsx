import { Avatar, Box, IconButton, Paper } from "@mui/material";
import { useState } from "react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

function srcset(image, size, rows = 1, cols = 1) {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  }

const TrackItem = ({track,col,row}) =>{
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio] = useState(new Audio(track.track.preview_url));

    const handlePlayPause = () => {
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    // Handle audio end to reset the play button
    audio.onended = () => setIsPlaying(false);

    return <Paper sx={{width:"100%",height:"100%", position:"relative",overflow:"hidden"}}>
        <img
            {...srcset(track.track.album.images[0].url, 121, row, col)}
            loading="lazy"
            width="100%"
            height="100%"
            style={{objectFit:"cover"}}
        />
        <Box sx={{position:'absolute',top:0,left:0}}>
            <h2 style={{color:"white"}}>{track.track.name}</h2>
            <h4 style={{color:"white"}}>{track.track.artists.map(art=><div key={art.name}>{art.name}</div>)}</h4>
            {track.track.preview_url ? (
                <IconButton onClick={handlePlayPause}>
                    {isPlaying ? <PauseIcon sx={{ height: 38, width: 38 }} /> : <PlayArrowIcon sx={{ height: 38, width: 38 }} />} 
                </IconButton>
            ) : (
                <p>No preview available</p>
            )}
        </Box>
        {/* {track.track.name} by {track.track.artists[0].name}
        {track.track.preview_url} */}
    </Paper>
}

export default TrackItem;