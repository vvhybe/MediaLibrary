const Books = require("../Api/Content/books.json");
const Music = require("../Api/Content/music.json");
const Videos = require("../Api/Content/videos.json");

const searchRoute = (req, res)=>{
    const page = req.query.page;
    const query = req.query.query;
    console.log("SEARCH 🔍 REQ: ->", req.query);

    if(!query){ return res.status(400).send() };

    console.log("SEARCH FOUND: ->", Books.find(search => search.title.toLowerCase().split(" ").includes(query) || search.author.split(" ").includes(query)))

    switch(page){
        case "books": return res.status(200).json(Books.find(search => search.title.toLowerCase().split(" ").includes(query) || search.author.split(" ").includes(query)));
        case "music": return res.status(200).json(Music.find(search => search.title.toLowerCase().split(" ").includes(query) || search.album.split(" ").includes(query) || search.artist.split(" ").includes(query)));
        case "videos": return res.status(200).json(Videos.find(search => search.title.toLowerCase().split(" ").includes(query) || search.author.split(" ").includes(query)));

        default: return res.status(404).send();
    }

}

module.exports = searchRoute;