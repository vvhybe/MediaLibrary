const fs = require("fs"); 
const path = require("path");
const ErrMessages = require("../Api/Lang/errors/upload.json"); 
const FormValidator = require('../utils/formValidatore');

const validator = new FormValidator();
const Videos = require("../Api/Content/videos.json");

const uploadVideoRoute = (req, res)=>{
    const ERRORS = [];
    if(!req.files){return res.status(400).json()}
    // const supportedTypes = ["mp3", "m4a"];

    console.log("UPLOAD REQ: -> ", req.body);
    console.log("UPLOAD REQ: -> ", req.files);

    const {lang, title ,author ,platform , link} = req.body;
    const {thumbnail, file} = req.files;

    if(!title || !author || !link || !platform){
        ERRORS.push(ErrMessages[lang].empty);
    }
    
    if(!file || !thumbnail){
        ERRORS.push(ErrMessages[lang].file);
    }

    if(!validator.isLink(link)){
        ERRORS.push(ErrMessages[lang].link);
    }
    
    if(ERRORS.length > 0) {return res.status(404).json(ERRORS)};


    try {
        const thumbnailName = thumbnail.name.split(".");
        fs.writeFileSync(path.resolve(__dirname,'../Api/Content/Images/videos',`${title.normalize().split(" ").join("").toLowerCase()}.${thumbnailName[thumbnailName.length - 1]}`), thumbnail.data)
        console.log("thumbnail added with succes");
    } catch (error) {
        console.log(error)
        return res.status(500).json("Error while trying to regester file");
    }
    
    try {
        const fileName = file.name.split(".");
        fs.writeFileSync(path.resolve(__dirname,'../Api/Content/Files/videos',`${title.normalize().split(" ").join("").toLowerCase()}.${fileName[fileName.length - 1]}`), file.data);
        console.log("file video added with succes");
    } catch (error) {
        console.log(error)
        return res.status(500).json("Error while trying to regester file");
    }

    try {            
        const video = {title ,author ,platform , link, thumbnail: `/thumbnail/videos/${title.normalize().split(" ").join("").toLowerCase()}`}
        Videos.push(video);
        fs.writeFileSync(path.resolve(__dirname,'../Api/Content/videos.json'), JSON.stringify(Videos, null, 4), 'utf8');
        console.log("Video added with succes");
    } catch (error) {
        console.log(error);
        return res.status(500).json("Error while trying to regester file");
    }
      
}

module.exports = uploadVideoRoute;