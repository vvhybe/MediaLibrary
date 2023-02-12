const books = require("../Api/Content/books.json");
const music = require("../Api/Content/music.json");
const videos = require("../Api/Content/videos.json");

const statisticsRoute = (req, res)=>{
    res.status(200).json({books: books.length, music: music.length, videos: videos.length});
}

module.exports = statisticsRoute;