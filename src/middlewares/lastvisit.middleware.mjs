export const setlastvisit=(req,res,next)=>{
    if(req.cookies.lastvisit){
        res.locals.lastvisit=new Date(req.cookies.lastvisit).toLocaleString();
    }
    res.cookie('lastvisit',new Date().toISOString(),{maxage:2*24*60*60*1000});
    next();
}