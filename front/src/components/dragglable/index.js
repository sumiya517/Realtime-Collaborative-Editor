import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './index.scss';
// const ENDPOINT = 'http://localhost:4000';
const ResizableAndDraggableDiv = ({ onChange, key, value }) => {
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(200);
    const [top, setTop] = useState(100);
    const [left, setLeft] = useState(100);
    // const socket = io(ENDPOINT);


    const handleMouseDown = (e, resizeType) => {
        e.preventDefault();
        const startX = e.pageX;
        const startY = e.pageY;

        const handleMouseMove = (e) => {
            const dx = e.pageX - startX;
            const dy = e.pageY - startY;

            if (resizeType === 'top-left') {
                setWidth(width - dx);
                setHeight(height - dy);
                setTop(top + dy);
                setLeft(left + dx);
            } else if (resizeType === 'top-right') {
                setWidth(width + dx);
                setHeight(height - dy);
                setTop(top + dy);
            } else if (resizeType === 'bottom-left') {
                setWidth(width - dx);
                setHeight(height + dy);
                setLeft(left + dx);
            } else if (resizeType === 'bottom-right') {
                setWidth(width + dx);
                setHeight(height + dy);
            } else if (resizeType === 'move') {
                setTop(top + dy);
                setLeft(left + dx);
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

    };

    // useEffect(() => {
    //     socket.emit('position', { width, height, top, left });
    // }, [width, height, top, left])


    // console.log(width, height, top, left);

    // useEffect(() => {
    //     socket.on('connect', () => {
    //         console.log('Connected to server position');
    //     });

    //     socket.on('position', (data) => {
    //         console.log('Received position:', data);
    //         setWidth(data.width);
    //         setHeight(data.height);
    //         setLeft(data.left);
    //         setTop(data.top);
    //     });

    //     socket.on('disconnect', () => {
    //         console.log('Disconnected from server');
    //     });

    //     // Clean up the socket listeners
    //     return () => {
    //         socket.off('connect');
    //         socket.off('position');
    //         socket.off('disconnect');
    //     };
    // }, [socket]);

    return (
        <div
            style={{
                position: 'absolute',
                top: top + 'px',
                left: left + 'px',
                width: width + 'px',
                height: height + 'px',
                border: '1px solid black',
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0, width: '100%', height: '100%', cursor: 'move'
                }}
                onMouseDown={(e) => handleMouseDown(e, 'move')}
            />
            <textarea
                onChange={(e) => onChange(e.target.value)}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    border: '0'
                }}
                key={key}
                value={value}
            />
            <div
                style={{
                    position: 'absolute',
                    width: '10px',
                    height: '10px',
                    bottom: 0,
                    right: 0,
                    cursor: 'se-resize',
                }}
                onMouseDown={(e) => handleMouseDown(e, 'bottom-right')}
            ></div>
            <div
                style={{
                    position: 'absolute',
                    width: '10px',
                    height: '10px',
                    bottom: 0,
                    left: 0,
                    cursor: 'sw-resize',
                }}
                onMouseDown={(e) => handleMouseDown(e, 'bottom-left')}
            ></div>
            <div
                style={{
                    position: 'absolute',
                    width: '10px',
                    height: '10px',
                    top: 0,
                    right: 0,
                    cursor: 'ne-resize',
                }}
                onMouseDown={(e) => handleMouseDown(e, 'top-right')}
            ></div>
            <div
                style={{
                    position: 'absolute',
                    width: '10px',
                    height: '10px',
                    top: 0,
                    left: 0,
                    cursor: 'nw-resize',
                }}
                onMouseDown={(e) => handleMouseDown(e, 'top-left')}
            ></div>

        </div>
    );
};

export default ResizableAndDraggableDiv;
