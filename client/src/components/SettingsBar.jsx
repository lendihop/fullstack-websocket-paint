import React from 'react';
import '../styles/toolbar.scss';
import toolState from "../store/toolState";

const SettingsBar = () => {
    return (
        <div className='setting-bar'>
            <label style={{marginLeft: 10}} htmlFor='line-width'>Line width:</label>
            <input
                onChange={e => toolState.setLineWidth(e.target.value)}
                style={{margin: '0 10px'}}
                id='line-width'
                type='number'
                defaultValue={1} min={1} max={50}/>

            <label style={{marginLeft: 10}} htmlFor='stroke-color'>Stroke color:</label>
            <input
                onChange={e => toolState.setStrokeColor(e.target.value)}
                style={{margin: '0 10px'}}
                id='stroke-color'
                type='color'/>
        </div>
    );
};

export default SettingsBar;
