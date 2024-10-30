import logo from './logo.svg';
import './App.css';
import SpotifyLogin from './components/SpotifyLogin';
import PlaylistTracks from './components/PlaylistTracks';

function App() {
  return (
    <div className="App">
      <SpotifyLogin/>
      <PlaylistTracks/>
    </div>
  );
}

export default App;
