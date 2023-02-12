
class FormValidator{
    isName(name){
        return /^\D{2,}$/.test(name);
    }
    
    isEmail(email){
        return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
    }
    
    isPassword(password){
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/.test(password);
    }

    passconfirm(password, confirm){
        return password === confirm;
    }

    isLink(link){
        return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm.test(link);
    }
}

module.exports = FormValidator;