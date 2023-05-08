import React from 'react';
import './styles/app.scss';
import Toolbar from "./components/Toolbar";
import SettingsBar from "./components/SettingsBar";
import Canvas from "./components/Canvas";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path='/:id' element={
                        <>
                            <Toolbar/>
                            <SettingsBar/>
                            <Canvas/>
                        </>
                    }/>
                    <Route
                        path="*"
                        element={<Navigate to={`f${(+new Date).toString(16)}`} replace/>}
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
