import React from 'react';
import '../styles/canvas.scss';

const Canvas = () => {
    return (
        <div className='canvas'>
            <canvas width={900} height={600}></canvas>
        </div>
    );
};

export default Canvas;
