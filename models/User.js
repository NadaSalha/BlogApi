
class User{
    static id = 1;
    constructor( firstname , secondname , password) {
        this.id = User.id++;
        this.firstname = firstname ; 
        this.secondname = secondname ; 
        this.password = password;
    }
}

module.exports = User;