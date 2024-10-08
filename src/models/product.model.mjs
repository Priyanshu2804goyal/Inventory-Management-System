
export default class Productmodel{

    constructor(id,name,desc,price,imageurl){
        this.id=id;
        this.name=name;
        this.desc=desc;
        this.price=price;
        this.imageurl=imageurl;
    }

  static get(){
     return product;
  }
  static delete(id){
    const index=product.findIndex((p)=>p.id==id);
    product.splice(index,1);
  }
  static update(productobj){
    const index=product.findIndex((p)=>p.id==productobj.id);
    product[index]=productobj;
  }
  static add(name,desc,price,imageUrl){
     let newproduct=new Productmodel(product.length+1,name,desc,price,imageUrl);
     product.push(newproduct);
  }
  static getbyid(id){
    return product.find((p)=>p.id==id);
  }
}
    var product=[
        new Productmodel( 1,
            'Product 1',
            'Description for Product 1',
            19.99,
            'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
          ),
          new Productmodel( 2,
            'Product 2',
            'Description for Product 2',
            29.99,
            'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
          ),
          new Productmodel(
            3,
      'Product 3',
      'Description for Product 3',
      39.99,
      'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
          )

]
