import React, { useEffect, useState } from "react";
import { getTokenFromUrl } from "../actions/spotify";
import TrackItem from "./TrackItem";
import { ImageList, ImageListItem } from "@mui/material";

const PlaylistTracks = () => {
    const [token, setToken] = useState(null);
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        // Get the token from URL
        const hash = window.location.hash;
        let token = window.localStorage.getItem("mspotify_token");

        if (!token && hash) {
            token = getTokenFromUrl().access_token;
            window.location.hash = "";
            window.localStorage.setItem("mspotify_token", token);
        }
        setToken(token);
    }, []);

    useEffect(() => {
        if (token) {
            // Fetch tracks from a playlist (replace with your playlist ID)
            const playlistId = "54ZA9LXFvvFujmOVWXpHga"; 
            fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    data.items.forEach(d=>{
                        // d.col = Math.round(Math.random())+1;
                        d.row = Math.round(Math.random()*2)+1;
                    })
                    setTracks(data.items);
                })
                .catch(error => console.error("Error fetching tracks:", error));
        }
    }, [token]);

    return (
        <div>
            <h1>Playlist Tracks</h1>
            <ImageList
                sx={{ width: '100%', height: 450 }}
                variant="quilted"
                cols={4}
                rowHeight={121}
                >
                {tracks.map((item) => (
                    <ImageListItem key={item.track.uri} cols={item.col || 1} rows={item.row || 1}>
                        <TrackItem track={item} col={item.col} row={item.row}/>
                    </ImageListItem>
                ))}
                </ImageList>
        </div>
    );
};

export default PlaylistTracks;