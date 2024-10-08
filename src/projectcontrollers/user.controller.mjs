import usermodel from "../models/user.model.mjs";
import Productmodel from "../models/product.model.mjs";
export default class usercontroller{
     getregister(req,res){
        res.render('register');
    }
    getlogin(req,res){
        res.render('login',{errorMessage:null});
    }
    postregister(req,res){
        const {name,email,password}=req.body;
        usermodel.add(name,email,password);
        res.render('login',{errorMessage:null})
    }
    postlogin(req,res){
       const{email,password}=req.body;
       const user=usermodel.isvaliduser(email,password);
       if(!user){
         return  res.render('login',{errorMessage:'Invalid credentials'});
       }
       req.session.userEmail=email;
       let product=Productmodel.get();
       res.render('inventory',{product:product,userEmail:req.session.userEmail});
    }
    logout(req,res){
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }
            else{
                res.redirect('/login');
            }
        })
    }
}