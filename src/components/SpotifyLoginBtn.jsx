import { Button } from "@mui/material"
import { loginUrl } from "../actions/spotify"

export default function SpotifyLoginBtn(){
    return <Button href={loginUrl} variant="contained">Login</Button>
}