// import { name } from "ejs";
import { body,validationResult } from "express-validator";
const validmiddleware =async(req,res,next)=>{
  // express validator;
  // 1.setup rule for validation;
    const rules=[
       body('name').notEmpty().withMessage('name is required'),
       body('price').isFloat({gt:0}).withMessage('price should be positive'),
     /*  body('imageurl').isURL().withMessage('invalid url'),*/
     body('imageUrl').custom((value,{req})=>{
      if(!req.file){
          throw new Error('Image is required');
      }
      return true;
     }),
    ]
  // 2.run those rules;
  await Promise.all(rules.map(rule=>rule.run(req)));

  // 3.check if their any error on the rules;
   var validerror=validationResult(req);
   if (!validerror.isEmpty()) {
    return res.render('new-product', {errorMessage: validerror.array()[0].msg});
  }
  /*
const{name,price,imageurl}=req.body;
    let error=[];
    if (!name || name.trim() == '') {
      error.push('Name is required');
    }
    if (!price || parseFloat(price) < 1) {
      error.push('Price must be a positive value');
    }
    try {
      const validUrl = new URL(imageurl);
    } catch (err) {
      error.push('URL is invalid');
    }
    if (error.length > 0) {
      return res.render('new-product', {errorMessage: error[0]});
    }
    */
    next();
  }
  export default validmiddleware;