var crypto = require('crypto'); 

class UserDetails {
    
    constructor(first_name, last_name, middle_name, email, password,isAdmin, created, modified, salt,address,city,state,zip) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.middle_name = middle_name;
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
        this.created = created;
        this.modified = modified;
        this.salt = salt;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    getUserDetails(id,first_name, last_name, middle_name, email,isAdmin, created, modified,address,city,state,zip) {
        var loggedInUserDetails = {};
        loggedInUserDetails['id'] = id;
        loggedInUserDetails['first_name'] = first_name;
        loggedInUserDetails['last_name'] = last_name;
        loggedInUserDetails['middle_name'] = middle_name;
        loggedInUserDetails['email'] = email;
        loggedInUserDetails['isAdmin'] = isAdmin;
        loggedInUserDetails['created'] = created;
        loggedInUserDetails['modified'] = modified;
        loggedInUserDetails['address'] = address;
        loggedInUserDetails['city'] = city;
        loggedInUserDetails['state'] = state;
        loggedInUserDetails['zip'] = zip;
        
        return loggedInUserDetails;
    }

    setPassword(password) {
        this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, `sha512`).toString(`hex`);
    };

    validPassword(password) { 
        var hashPwd = crypto.pbkdf2Sync(password,this.salt, 1000, 64, `sha512`).toString(`hex`); 
        return this.password === hashPwd; 
    };
}

module.exports = UserDetails;