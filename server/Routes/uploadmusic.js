const fs = require("fs"); 
const path = require("path");
const ErrMessages = require("../Api/Lang/errors/upload.json"); 
const FormValidator = require('../utils/formValidatore');

const validator = new FormValidator();
const Music = require("../Api/Content/music.json");

const uploadMusicRoute = (req, res)=>{
    const ERRORS = [];
    if(!req.files){return res.status(400).json()}
    // const supportedTypes = ["mp3", "m4a"];

    console.log("UPLOAD 🎵 REQ: -> ", req.body);
    console.log("UPLOAD 🎵 REQ: -> ", req.files);

    const {lang, title, artist, artistLink, album, albumLink, platform} = req.body;
    const {thumbnail, file} = req.files;

    if(!title || !artist || !artistLink  || !album || !albumLink || !platform){
        ERRORS.push(ErrMessages[lang].empty);
    }
    
    if(!file || !thumbnail){
        ERRORS.push(ErrMessages[lang].file);
    }

    if(!validator.isLink(artistLink) || !validator.isLink(albumLink)){
        ERRORS.push(ErrMessages[lang].link);
    }
    
    if(ERRORS.length > 0) {return res.status(404).json(ERRORS)};


    try {
        const thumbnailName = thumbnail.name.split(".");
        fs.writeFileSync(path.resolve(__dirname,'../Api/Content/Images/music',`${title.normalize().split(" ").join("").toLowerCase()}.${thumbnailName[thumbnailName.length - 1]}`), thumbnail.data)
        console.log("thumbnail added with succes");
    } catch (error) {
        console.log(error)
        return res.status(500).json("Error while trying to regester file");
    }
    
    try {
        const fileName = file.name.split(".");
        fs.writeFileSync(path.resolve(__dirname,'../Api/Content/Files/music',`${title.normalize().split(" ").join("").toLowerCase()}.${fileName[fileName.length - 1]}`), file.data);
        console.log("file song added with succes");
    } catch (error) {
        console.log(error)
        return res.status(500).json("Error while trying to regester file");
    }

    try {            
        const song = {title, artist, artistLink, album, albumLink, platform}
        Music.push(song);
        fs.writeFileSync(path.resolve(__dirname,'../Api/Content/music.json'), JSON.stringify(Music, null, 4), 'utf8');
        console.log("Song added with succes");
    } catch (error) {
        console.log(error);
        return res.status(500).json("Error while trying to regester file");
    }
      
}

module.exports = uploadMusicRoute;