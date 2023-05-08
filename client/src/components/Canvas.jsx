import React, {useEffect, useRef, useState} from 'react';
import '../styles/canvas.scss';
import {observer} from "mobx-react-lite";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import {Button, Modal} from "react-bootstrap";
import {useParams} from "react-router-dom";
import Rect from "../tools/Rect";

const Canvas = observer(() => {
    const canvasRef = useRef();
    const usernameRef = useRef();

    const [showModal, setShowModal] = useState(true);
    const {id} = useParams();

    useEffect(() => canvasState.setCanvas(canvasRef.current), []);

    useEffect(() => {
        if (canvasState.username) {
            const socket = new WebSocket('ws://localhost:3001/');
            canvasState.setSocket(socket);
            canvasState.setSessionId(id);
            toolState.setTool(new Brush(canvasRef.current, socket, id));

            socket.onopen = () => {
                socket.send(JSON.stringify({
                    id,
                    username: canvasState.username,
                    method: 'connection'
                }));
            };
            socket.onmessage = e => {
                let msg = JSON.parse(e.data);
                switch (msg.method) {
                    case 'connection':
                        console.log(`User ${msg.username} connected`);
                        break;
                    case 'draw':
                        drawHandler(msg);
                        break;
                }
            }
        }
    }, [canvasState.username]);

    const mouseDownHandler = () => canvasState.pushToUndo(canvasRef.current.toDataURL());

    const connectionHandler = () => {
        canvasState.setUsername(usernameRef.current.value);
        setShowModal(false);
    };

    const drawHandler = msg => {
        const {figure} = msg;
        const ctx = canvasRef.current.getContext('2d');
        switch(figure.type) {
            case 'brush':
                Brush.draw(ctx, figure.x, figure.y);
                break;
            case 'rect':
                Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color);
                break;
            case 'finish':
                ctx.beginPath();
                break;
        }
    }

    return (
        <div className='canvas'>
            <Modal show={showModal} onHide={() => {}}>
                <Modal.Header closeButton>
                    <Modal.Title>Enter your username</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input ref={usernameRef} type='text'/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={connectionHandler}>
                        Enter
                    </Button>
                </Modal.Footer>
            </Modal>
            <canvas onMouseDown={mouseDownHandler} ref={canvasRef} width={900} height={600}></canvas>
        </div>
    );
});

export default Canvas;
