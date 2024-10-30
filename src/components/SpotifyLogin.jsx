import React, { useEffect, useState } from "react";
import SpotifyLoginBtn from "./SpotifyLoginBtn";
import { getTokenFromUrl } from "../actions/spotify";
import { Button } from "@mui/material";

const SpotifyLogin = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const hash = getTokenFromUrl();
        let token = window.localStorage.getItem("mspotify_token");

        if (!token && hash.access_token) {
            token = hash.access_token;
            window.location.hash = "";
            window.localStorage.setItem("mspotify_token", token);
        }
        setToken(token);
    }, []);

    const handleLogout = () => {
        setToken(null);
        window.localStorage.removeItem("mspotify_token");
    };

    return (
        <div>
            {token ? (
                <Button onClick={handleLogout} variant="contained">Log out</Button>
            ) : (
                <SpotifyLoginBtn />
            )}
        </div>
    );
};

export default SpotifyLogin;