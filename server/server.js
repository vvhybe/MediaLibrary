const express = require("express");
const cors = require("cors");
const fileupload = require("express-fileupload");
// Routes or Controllers
const langRoute = require("./Routes/lang");
const loginRoute = require("./Routes/login");
const regesterRoute = require("./Routes/regester");
const thumbnailRoute = require("./Routes/thumbnail");
const contentsRoute = require("./Routes/contents");
const errorsRoute = require("./Routes/errors");
const statisticsRoute = require("./Routes/statistics");
const searchRoute = require("./Routes/search");
const downloadRoute = require("./Routes/download");
const uploadBookRoute = require("./Routes/uploadbook");
const uploadMusicRoute = require("./Routes/uploadmusic");
const uploadVideoRoute = require("./Routes/uploadvideo");

const server = express();

// middel wheres
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(fileupload());


server.listen(8080, ()=> console.info("=> Server is live on: http://localhost:8080"));
//Multi Lang API
server.get(["/lang", "/Lang"], langRoute);
//AUTH API
server.post("/login", loginRoute);
server.post("/regester", regesterRoute);
//Content API
server.get("/contents/:content", contentsRoute);
server.get("/statistics", statisticsRoute);
server.get("/download", downloadRoute);
//Search
server.get("/search", searchRoute);

//Thumbnail/Cover API;
server.get("/thumbnail/:page/:cover", thumbnailRoute);
//Errors
server.get("/errors/:errid", errorsRoute);

///Admin Dashboard:
server.post("/uploadbook", uploadBookRoute);
server.post("/uploadmusic", uploadMusicRoute);
server.post("/uploadvideo", uploadVideoRoute);

server.get("/", (req, res) => res.status(200).send(`The Backend Server for the <a href="http://localhost:3000">Library</a>`))
