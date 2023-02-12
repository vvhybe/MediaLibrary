const path = require("path");

const contentsRoute = (req, res)=>{
    const content = req.params.content;
    console.log("API 📚 REQ: -> ", req.params);

    try {
        res.status(200).sendFile(path.resolve(__dirname, `../Api/Content/${content}.json`))
    } catch (error) {
        res.status(400).send();
    }
}

module.exports = contentsRoute;