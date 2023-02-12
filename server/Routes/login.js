const bcrypt = require("bcrypt");

const USERS =  require("../Database/users.json");
const AuthERRORS = require("../Api/Auth/login.json");
const User = require("../Models/User");

const loginRoute = async (req, res)=>{
    const { lang, email, password } = req.body;
    const langs = ["en", "fr", "ar"];
    console.log("REQ: login->: ", req.body);

    if(!langs.includes(lang.toLowerCase())) { lang = "en" };
    if(!email || !password) { return res.status(400).json({ok: false, user: null, error: AuthERRORS[lang].empty}); };

    const found = USERS.find(usr => usr.email === email);
    if(!found){ return res.status(401).send();}

    try {
        if(await bcrypt.compare(password, found.password)){
            console.log("USRLOG: Authontified 🔓", found.email);
            res.status(200).json({ok: true, user: {firstName:found.firstName, lastName:found.lastName, email:found.email, role:found.role}, error: null})
        }else{
            console.log("USRLOG: Not Authontified 🔒");
            res.status(401).json({ok: false, user:null, error: AuthERRORS[lang].unauthorized});
        }
        
    } catch (error) {
        res.status(500).send();
    }
}


module.exports = loginRoute;