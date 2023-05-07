import React from 'react';
import '../styles/toolbar.scss';

const Toolbar = () => {
    return (
        <div className='toolbar'>
            <button className='toolbar__btn brush'/>
            <button className='toolbar__btn rect'/>
            <button className='toolbar__btn circle'/>
            <button className='toolbar__btn eraser'/>
            <button className='toolbar__btn line'/>
            <input style={{marginLeft: 10}} type="color"/>
            <button className='toolbar__btn undo'/>
            <button className='toolbar__btn redo'/>
            <button className='toolbar__btn save'/>
        </div>
    );
};

export default Toolbar;
