const bcrypt = require("bcrypt");

const USERS =  require("../Database/users.json");
const AuthERRORS = require("../Api/Auth/regester.json");
const User = require("../Models/User");
const FormValidator = require("../utils/formValidatore");

const validator = new FormValidator();

const regesterRoute = async (req, res)=>{
    const {lang, firstName, lastName, email, password, cpassword} = req.body;
    const langs = ["en", "fr", "ar"];
    const ERRORS = [];
    console.log("REQ: regester->: ", req.body);

    if(!langs.includes(lang.toLowerCase())) { lang = "en" }; 
    if(!validator.isName(firstName) || !validator.isName(lastName)){ ERRORS.push(AuthERRORS[lang].name) };
    if(!validator.isEmail(email)){ ERRORS.push(AuthERRORS[lang].email) };
    if(!validator.isPassword(password)){ ERRORS.push(AuthERRORS[lang].password) };
    if(!validator.passconfirm(password, cpassword)){ ERRORS.push(AuthERRORS[lang].Cpassword) };


    if(USERS.find(usr => usr.email === email)){ ERRORS.push(AuthERRORS[lang].alreadyexists) };

    console.log("ERRORS: ", ERRORS);
    if(ERRORS.length > 0){ return res.status(400).json({ok:false, errors:ERRORS}) };


    try {
        let hashpass = await bcrypt.hash(password, 7);
        const user = new User(firstName, lastName, email, hashpass);
        try {
            user.save();
            console.log("RES: User regesterd", user);
            res.status(201).json({ok:true, errors: null})
        } catch (error) {
            res.status(500).send();
            console.log("ERROR while trying to regester user");
        }
    } catch (error) {
        res.status(500).send();
    }

}

module.exports = regesterRoute;