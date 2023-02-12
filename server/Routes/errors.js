const path = require("path");

const errorsRoute = (req, res)=>{
    const errid = req.params.errid;
    try {
        res.status(200).sendFile(path.resolve(__dirname, `../Api/Lang/errors/${errid}.json`))
    } catch (error) {
        res.status(404).send();
    }
}

module.exports = errorsRoute;