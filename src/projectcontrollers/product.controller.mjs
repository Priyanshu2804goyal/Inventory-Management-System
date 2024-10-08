import path from 'path';
import Productmodel from '../models/product.model.mjs';
import { error } from 'console';
export default class Productcontroller{
  getProducts(req,res){
    // console.log(path.resolve());
    let product=Productmodel.get();
    console.log(product);
    res.render('inventory',{product,userEmail:req.session.userEmail});
    /*
     return res.sendFile(path.join(path.resolve(),'src','views','inventory.html'));
     */
  }
  getaddform(req,res){
    return  res.render('new-product',{errorMessage:null,userEmail:req.session.userEmail});
  }
  addnewproduct(req,res,next){
    // access the data from form;
     const {name,desc,price}=req.body;
     const imageUrl='images/'+req.file.filename;
    console.log(req.body);
    // validate the data;
    Productmodel.add(name,desc,price,imageUrl);
    let product=Productmodel.get();
     return res.render('inventory',{product,userEmail:req.session.userEmail});
  }
  getupdateproductview(req,res,next){
    const id=req.params.id;
    const productfound=Productmodel.getbyid(id);
    if(productfound){
      res.render('update-product',{product:productfound,errorMessage:null,userEmail:req.session.userEmail});
    }
    else{
      res.status(401).send('product is not found');
    }
  }
  postupdateproduct(req,res,next){
    Productmodel.update(req.body);
    let product=Productmodel.get();
    return res.render('inventory',{product:product,userEmail:req.session.userEmail});
  }
  deleteproduct(req,res,next){
    const id=req.params.id;
    const productfound=Productmodel.getbyid(id);
    if(!productfound){
      res.status(401).send('product is not found');
    }
    Productmodel.delete(id);
    let product=Productmodel.get();
    res.render('inventory',{product:product});
  }
}
