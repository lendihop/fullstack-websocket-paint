import React from 'react';
import './styles/app.scss';
import Toolbar from "./components/Toolbar";
import SettingsBar from "./components/SettingsBar";
import Canvas from "./components/Canvas";

const App = () => {
    return (
        <div className="app">
            <Toolbar/>
            <SettingsBar/>
            <Canvas/>
        </div>
    );
}

export default App;
