import "./App.css";
import MusicPlayer from "./Components/MusicPlayerComponent/MusicPlayer";
import Navigation from "./Components/Navigation/Navigation";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Navigation></Navigation>
                <MusicPlayer></MusicPlayer>
            </header>
        </div>
    );
}

export default App;
