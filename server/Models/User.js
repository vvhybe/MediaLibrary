const fs = require("fs");
const path = require("path");
const USERS =  require("../Database/users.json");

class User {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.role = "user";
        this.registrationDate = new Date();
    }

    setRole(newRole) {
        this.role = newRole;
    }

    badge() {
        let { password, registrationDate, ...userWithoutPassword } = this;
        return userWithoutPassword;
    }

    async save() {
        USERS.push(this);
        return new Promise((resolve, reject) => {
            fs.writeFile(path.resolve(__dirname,'../Database/users.json'), JSON.stringify(USERS, null, 4), 'utf8', (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
}


module.exports = User;