import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./styles/index.scss";
import Login from "./pages/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import StickyNote from "./components/stickyNote";
import Workspace from "./pages/workspace";

function App() {
  // const socket = io(process.env.API_BASE_URL);
  // const [textAreas, setTextAreas] = useState([{ id: 0, content: '' },]);
  // const [active, setActive] = useState("rgb(223, 255, 0)");
  // const colors = [
  //   "rgb(223, 255, 0)",
  //   "rgb(252, 242, 129)",
  //   "rgb(255, 127, 80)",
  //   "rgb(254, 187, 190)",
  //   "rgb(159, 226, 191)",
  //   "rgb(64, 224, 208)",
  //   "rgb(135, 206, 250)",
  //   "rgb(204, 204, 255)",
  // ];

  // const handleDoubleClick = () => {
  //   const newTextArea = { id: textAreas.length, content: '' };
  //   setTextAreas([...textAreas, newTextArea]);
  //   // socket.emit('textUpdate', textAreas);
  // };

  // const handleChange = (id, event) => {
  //   event.stopPropagation();
  //   event.preventDefault()
  //   const updatedTextAreas = textAreas.map((area) => {
  //     if (area.id === id) {
  //       return { ...area, content: event.target.value };
  //     }
  //     return area;
  //   });

  //   setTextAreas(updatedTextAreas);
  //   // socket.emit('textUpdate', updatedTextAreas); // Emit the updated areas
  // };

  // _______useeffects_____________

  // useEffect(() => {
  //   socket.emit('textUpdate', textAreas);
  // }, [textAreas])

  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('Connected to server');
  //   });

  //   socket.on('textUpdate', (data) => {
  //     console.log('Received text update:', data);
  //     setTextAreas(data);
  //   });

  //   socket.on('disconnect', () => {
  //     console.log('Disconnected from server');
  //   });

  //   // Clean up the socket listeners
  //   return () => {
  //     socket.off('connect');
  //     socket.off('textUpdate');
  //     socket.off('disconnect');
  //   };
  // }, [socket]);

  // console.log(textAreas);

  const storedUser = JSON.parse(localStorage.getItem("user"));

  console.log("storeduser", storedUser?.isAdmin);
  return (
    <div className="App">
      {/* <div className='container'>
        <button onClick={() => handleDoubleClick()}>Add Sticky</button>
        <div className='sticky-holder'>
          {textAreas.map((textarea) => (
            <div className='sticky-holder-container'>
            <StickyNote
              key={textarea.id}
              value={textarea.content}
              onChange={(value) => handleChange(textarea.id, value)}
              color={active}
              colors={colors}
              active={active}
              onClick={(e) => {
                setActive(e.target.style.backgroundColor);
              }}
                parentWidth={800}
                parentHeight={600}
            />
            </div>
          ))}
        </div>
      </div> */}
      <Router>
        <Routes>
          {/* <Route path={`/*`} element={<AdminTemplate />} /> */}
          <Route path="/" element={<Login />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/workspace/:id" element={<Workspace />} />
          {/* <Route
            path="/login"
            element={
              <Login />
            }
          /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
