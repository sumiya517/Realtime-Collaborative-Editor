import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "./index.scss";
import ColorChoose from "../colorChoose";
const ENDPOINT = "http://localhost:4000";

const StickyNote = ({
    onChange,
    key,
    value,
    color,
    colors,
    active,
    onClick,
    initialTop,
    initialLeft,
    parentWidth,
    parentHeight,
    handleDelete
}) => {
    const [width, setWidth] = useState(64);
    const [height, setHeight] = useState(64);
    const [top, setTop] = useState(initialTop);
    const [left, setLeft] = useState(initialLeft);
    const [isColorChoose, setIsColorChoose] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [resizeType, setResizeType] = useState('');

    // const socket = io(ENDPOINT);
    const divRef = useRef(null);

    // ----------------methods----------------

    const handleMouseDown = (e, resizeType) => {
        const startX = e.pageX;
        const startY = e.pageY;

        const handleMouseMove = (e) => {
            const dx = e.pageX - startX;
            const dy = e.pageY - startY;

            if (resizeType === "top-left") {
                setWidth(width - dx);
                setHeight(height - dy);
                setTop(top + dy);
                setLeft(left + dx);
            } else if (resizeType === "top-right") {
                setWidth(width + dx);
                setHeight(height - dy);
                setTop(top + dy);
            } else if (resizeType === "bottom-left") {
                setWidth(width - dx);
                setHeight(height + dy);
                setLeft(left + dx);
            } else if (resizeType === "bottom-right") {
                setWidth(width + dx);
                setHeight(height + dy);
            } else if (resizeType === "move") {
                setTop(top + dy);
                setLeft(left + dx);
            }
        };

        const handleMouseUp = () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };
    // const handleMouseDown = (e, type) => {
    //     setIsResizing(true);
    //     setResizeType(type);
    // };

    // const handleMouseMove = (e) => {
    //     if (!isResizing) return;

    //     let newWidth = width;
    //     let newHeight = height;
    //     let newTop = top;
    //     let newLeft = left;

    //     if (resizeType === 'move') {
    //         newLeft = left + e.movementX;
    //         newTop = top + e.movementY;

    //         // Restrict movement within parent bounds
    //         if (newLeft < 0) newLeft = 0;
    //         if (newTop < 0) newTop = 0;
    //         if (newLeft + width > parentWidth) newLeft = parentWidth - width;
    //         if (newTop + height > parentHeight) newTop = parentHeight - height;
    //     } else if (resizeType === 'bottom-right') {
    //         newWidth = Math.min(parentWidth - left, e.clientX - left);
    //         newHeight = Math.min(parentHeight - top, e.clientY - top);
    //     // } else if (resizeType === 'bottom-left') {
    //     //     newWidth = Math.min(left + width, left + width - (e.clientX - left));
    //     //     newHeight = Math.min(parentHeight - top, e.clientY - top);
    //     //     newLeft = left + width - newWidth;
    //     // } else if (resizeType === 'top-right') {
    //     //     newWidth = Math.min(parentWidth - left, e.clientX - left);
    //     //     newHeight = Math.min(top + height, top + height - (e.clientY - top));
    //     //     newTop = top + height - newHeight;
    //     // } else if (resizeType === 'top-left') {
    //     //     newWidth = Math.min(left + width, left + width - (e.clientX - left));
    //     //     newHeight = Math.min(top + height, top + height - (e.clientY - top));
    //     //     newTop = top + height - newHeight;
    //     //     newLeft = left + width - newWidth;
    //     }

    //     // Set minimum width and height
    //     newWidth = Math.max(newWidth, 100);
    //     newHeight = Math.max(newHeight, 100);

    //     setWidth(newWidth);
    //     setHeight(newHeight);
    //     setTop(newTop);
    //     setLeft(newLeft);
    // };


    // const handleMouseUp = () => {
    //     setIsResizing(false);
    //     setResizeType('');
    // };


    const handleRightClick = (e) => {
        e.preventDefault();
        console.log('Right click');
        setIsColorChoose(true);
    }


    // -----------------useEffects--------------

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (divRef.current && !divRef.current.contains(event.target)) {
                setIsColorChoose(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [divRef]);

    useEffect(() => {
        setWidth(Math.min(64, parentWidth / 3));
        setHeight(Math.min(64, parentHeight / 3));

    }, [parentWidth, parentHeight]);

    // useEffect(() => {
    //     socket.emit("position", { width, height, top, left });
    // }, [width, height, top, left]);

    // console.log(width, height, top, left);

    // useEffect(() => {
    //     socket.on("connect", () => {
    //         console.log("Connected to server position");
    //     });

    //     socket.on("position", (data) => {
    //         console.log("Received position:", data);
    //         setWidth(data.width);
    //         setHeight(data.height);
    //         setLeft(data.left);
    //         setTop(data.top);
    //     });

    //     socket.on("disconnect", () => {
    //         console.log("Disconnected from server");
    //     });

    //     // Clean up the socket listeners
    //     return () => {
    //         socket.off("connect");
    //         socket.off("position");
    //         socket.off("disconnect");
    //     };
    // }, [socket]);

    return (
        <div
            ref={divRef}
            className="c-sticky"
            style={{
                top: top + "px",
                left: left + "px",
                width: width + "px",
                height: height + "px",
                background: `${color}`
            }}
            onContextMenu={(e) => handleRightClick(e)}
        // onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
        >
            {isColorChoose && <ColorChoose colors={colors} active={active} onClick={onClick} />}
            <div onMouseDown={(e) => handleMouseDown(e, "move")}>
                <textarea
                    className="c-sticky__textarea"
                    onChange={(e) => {
                        onChange(e);
                    }}
                    key={key}
                    value={value}
                />
            </div>
            <div
                className="c-sticky__resize c-sticky__resize-se"
                onMouseDown={(e) => handleMouseDown(e, "bottom-right")}
            ></div>
            <div
                className="c-sticky__resize c-sticky__resize-sw"
                onMouseDown={(e) => handleMouseDown(e, "bottom-left")}
            ></div>
            <div
                className="c-sticky__resize c-sticky__delete"
                onClick={handleDelete}
            >
                <img src="/icons/close-circle.png" />
            </div>
            <div
                className="c-sticky__resize c-sticky__resize-nw"
                onMouseDown={(e) => handleMouseDown(e, "top-left")}
            ></div>
        </div>
    );
};

export default StickyNote;
