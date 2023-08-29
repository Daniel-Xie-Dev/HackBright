import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
    return (
        <Router>
            <div className="main-body">
                <Sidebar />
                <header className="App-header"></header>
            </div>
        </Router>
    );
}

export default App;
