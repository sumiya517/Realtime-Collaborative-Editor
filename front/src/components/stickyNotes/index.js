// import React, { useRef } from 'react';
// import { Rnd } from "react-rnd";

// const StickyNote = ({ onChange, key, value }) => {
//     const resizableRef = useRef(null);
//     const [width, setWidth] = React.useState(200);
//     const [height, setHeight] = React.useState(200);

//     const handleResize = (event, { node, size, handle }) => {
//         setWidth(size.width);
//         setHeight(size.height);
//     };

//     const style = {
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         border: "solid 1px #ddd",
//         background: "#f0f0f0"
//     };

//     console.log(height, width);

//     return (
//         <div className=''>
//             <Rnd
//                 style={style}
//                 default={{
//                     x: 0,
//                     y: 0,
//                     width: 320,
//                     height: 200
//                 }}
//             >
//                 <textarea
//                     onChange={(e) => onChange(e.target.value)} // Corrected onChange
//                     style={{ width: '100%', height: '100%' }}
//                     key={key}
//                     value={value}
//                 />
//             </Rnd>
//         </div>
//     );
// };

// export default StickyNote;
