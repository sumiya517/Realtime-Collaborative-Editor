# Realtime-Collaborative-Editor

## Environment and Technology Used
- Node version: v16.15.0
- Redux
- Websockets: socket.io
- MongoDB Compass
- Postman / Insomnia
- VSCode

--- 

## Project Structure
- Backend and Frontend parts are kept in a single folder.

**Backend:**
- Follows the MVC pattern with models, routes, and controllers in separate folders.
- Each model has a corresponding controller file where all middlewares are implemented.
- Database connections are established in the config folder.
- Sensitive information such as secret keys are stored in the .env file.

**Frontend:**
- Grouped by file type pattern:
  - Components, layouts, pages, Redux, and styles are in separate folders within the src directory.
- The components folder contains reusable components used across different pages.
- Layouts include sidebar, header, and overall project layout.
- Redux folder includes API Slices folders and a store.js file.
- Styles folder holds partials and styles that can affect multiple components.
- The dist folder contains files after building the project, and public folder contains all icons.

---

## Installation Process
Add the .env files to their respective projects.
Navigate to each project in the terminal and run the following commands:

- `npm i` or `npm install`

---

**To Run in Terminal:**
`npm start`

**User Create and Login:**
- Import the Sticky-notes.postman_collection.json file to the postman / insomnia.
- Hit the user/register with proper user json object and create a user with "isAdmin" true.
- Then login to the system with proper credentials.

---

**Github Link:** https://github.com/sumiya517/Realtime-Collaborative-Editor

**Figma Link:**  https://www.figma.com/file/6XaZg9raugAkHYQwmi7LkB/Real-Time-Collaborative-Notes-Editor?type=design&node-id=230-14518&mode=design&t=SevbDIFCjHjSs5tV-0
