const db=require('../dbconnection');  

const categories= new db.Schema({  
    category_id:{type: Number,required:true},  
    parent_category:{type: String,required:true}  ,
    sub_category:{type: String,required:true}
}); 
const productdetails=new db.Schema({
product_id:{type:Number,required:true},
product_name:{type:String,required:true},
product_desc:{type:String,required:true},
price:{type:Number,required:true},
quantity:{type:Number,required:true},
gender:{type:String,required:true},
category_id:{type:Number,required:true},
size:{type:String,required:true},
brand:{type:String,required:true}
});

const userdetails = new db.Schema({
    // id:{type:Number,required:true},
    first_name:{type:String,required:true},
    last_name:{type:String,required:true},
    middle_name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    isAdmin:{type:Boolean,required:true},
    created:{type:Date,required:true},
    modified:{type:Date,required:true},
    salt:{type:String,required:true},
    Address:{type:String,required:false},
    City:{type:String,required:false},
    State:{type:String,required:false},
    Zip:{type:Number,required:false}
});

const cart = new db.Schema({
    cart_id:{type:Number,required:false},
    user_id:{type:String,required:true},
    product_names:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:false},
    isPurchased:{type:String,required:true},
    productId:{type:Number,required:false},
})

const orders = new db.Schema({
    // id:{type:Number,required:true},
    "user_id": {type:String,required:true},
    "first_name": {type:String,required:true},
    "email": {type:String,required:true},
    "phoneNo":{type:Number,required:false},
    "Address":{type:String,required:false},
    "City":{type:String,required:false},
    "State":{type:String,required:false},
    "Zip":{type:Number,required:false},
    "productNames": {type:String,required:false},
    "creditCardName":{type:String,required:false},
    "creditCardNumber":{type:Number,required:false},
    "totalPrice":{type:Number,required:false}
});



module.exports.categories=db.model('categorie',categories);  
module.exports.product_details=db.model('productdetail',productdetails);
module.exports.userdetails=db.model('userdetail',userdetails);
module.exports.cart=db.model('cart',cart);
module.exports.orders=db.model('order',orders);
