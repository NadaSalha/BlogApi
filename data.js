const user_lst = [];
const blog_lst=[];

class User{
    static id = 1;
    constructor( firstname , secondname , password) {
        this.id = User.id++;
        this.firstname = firstname ; 
        this.secondname = secondname ; 
        this.password = password;
    }
}

class Blog{

    constructor( userId , title , content) {
        this.userId = userId ; 
        this.title = title ; 
        this.content = content;
    }
}


module.exports = {User , Blog , blog_lst , user_lst};