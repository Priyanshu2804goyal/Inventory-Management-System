// const express=require('express');
import path from 'path';
import express from 'express';
import ejslayout from 'express-ejs-layouts';
 //import Productcontroller from './src/controllers/projectcontrollers/product.controller.mjs';
 import Productcontroller from './src/projectcontrollers/product.controller.mjs';
// import Productmodel from './src/models/product.model';
import validmiddleware from './src/middlewares/validation.middleware.mjs';
import usercontroller from './src/projectcontrollers/user.controller.mjs';
import { uploadfile } from './src/middlewares/file-upload-middleware.mjs';
// import usercontroller from './src/projectcontrollers/user.controller.mjs';
const server=express();
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.mjs';
import cookieParser from 'cookie-parser';
import { setlastvisit } from './src/middlewares/lastvisit.middleware.mjs';
/*
server.get("/",(req,res)=>{
    res.end('this is first e-commerce server');
})
    */
   server.use(express.urlencoded({extended:true}));
   server.use(express.static('public'));
   server.use(cookieParser());
   server.use(setlastvisit);
   server.set("view engine","ejs");
   server.set("views",path.join(path.resolve(),'src','views'));
   server.use(ejslayout);
      server.use(session({
         secret:"secretkey",
         resave:false,
         saveUninitialized:true,
         cookie:{secure:false},
      }))
   const productcontroller=new Productcontroller();
   const userscontroller=new usercontroller();
   server.get('/register',userscontroller.getregister);
   server.get('/login',userscontroller.getlogin);
   server.post('/register',userscontroller.postregister);
   server.post('/login',userscontroller.postlogin);
   server.get('/logout',userscontroller.logout);
   server.get('/',productcontroller.getProducts);
   server.get('/new',auth,productcontroller.getaddform);
   server.post('/delete-product/:id',auth,productcontroller.deleteproduct);
   server.get('/update-product/:id',auth,productcontroller.getupdateproductview);
   server.post('/update-product',auth,productcontroller.postupdateproduct);
   server.post('/',uploadfile.single('imageUrl'),validmiddleware,productcontroller.addnewproduct);
   server.use(express.static('src/views'))
server.listen(8500,()=>{
    console.log('this is new server at 8500');
})