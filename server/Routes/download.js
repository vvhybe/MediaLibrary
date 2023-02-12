const path = require("path");
const fs = require("fs");

const downloadRoute = (req, res)=>{
    const page = req.query.page;
    const target = req.query.file;
    console.log("Download ⏬ REQ: ->", req.query);

    fs.readdir(path.resolve(__dirname, "../Api/Content/Files/"+page), (error, files)=>{
        if(error){ return res.status(500).send() };

        const file = files.find(f => f.split(".")[0].toLowerCase() === target.toLowerCase());
        if(!file){ return res.status(404).send() };

        try{
            console.log("Download ⏬ RES: -> ", {page, REQfile: target, RESfile: file});
            res.status(200).download(path.resolve(__dirname, "../Api/Content/Files/"+page+"/"+file));
        }catch (error){
            res.status(502).send();
        }
    })
}

module.exports = downloadRoute;