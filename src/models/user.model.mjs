export default class usermodel{
    constructor(id,name,email,password){
        this.id=id;
        this.name=name;
        this.email=email;
        this.password=password;
    }
    static add(name,email,password){
        const newuser=new usermodel(user.length+1,name,email,password);
        user.push(newuser);
    }
    static isvaliduser(email,password){
        const result=user.find((u)=>u.email==email && u.password==password);
        return result;
    }
}
var user=[];