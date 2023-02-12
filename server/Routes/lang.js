const path = require("path");

const langRoute = (req, res)=>{
    const langs = ["en", "fr", "ar"];
    const {lang, page} = req.query;
    console.log("TRANS 🔃 REQ: ->", req.query);
    
    if(!langs.includes(lang.toLowerCase())) { return res.status(501).send({error: `the lang [${lang}] not supported`}) };
    
    res.status(200).sendFile(path.resolve(`${__dirname}/../Api/Lang/${page}/${lang}.json`), (error)=>{
        console.log("TRANS RES: ->", `Api/Lang/${page}/${lang}.json`);
        if(error){ return res.status(404).send() }
    })
    
}

module.exports = langRoute;