const path = require("path");
const fs = require("fs");

const thumbnailRoute = (req, res)=>{
    const page = req.params.page;
    const cover = req.params.cover;

    fs.readdir(path.resolve(__dirname, "../Api/Content/Images/"+page), (error, thumbnailes)=>{
        if(error){ return res.status(500).send() };

        const thumbnail = thumbnailes.find(file => file.split(".")[0].normalize().toLowerCase() === cover.normalize().toLowerCase());
        if(!thumbnail){ return res.status(404).send() };

        console.log("API 🖼️ RES: -> ", {page, REQcover: cover, REScover: thumbnail});
        res.status(200).sendFile(path.resolve(__dirname, "../Api/Content/Images/"+page+"/"+thumbnail));
    })
}

module.exports = thumbnailRoute;