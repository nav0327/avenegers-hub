var express = require('express');
var router = express.Router();
var product=require('../models/dbModels'); 
var search_parm = []
var maxprice = Number.MAX_VALUE
var minprice = Number.MIN_VALUE
var cat_id = [];
//var filterQuery = "SELECT * FROM productdetails where category_id in (select category_id from categories where parent_category = ?)";

router.post('/',function(req, res, next) {
    console.log("in intoCategory-backend");
    console.log(req.body);
    console.log("key");
    var content = req.body.parentprops.key;
    if(!content){
      content = 'search';
      search_parm = [];
      req.body.parentprops.map((categor) =>
            search_parm.push(categor.product_id) 
            )
    }
    console.log(content);
    console.log(typeof req.body.priceFilter )
    var size = [];
    var prize = '';
    var brand=[]
 
    //console.log(req.body.parentprops.sizeFilter);
    //console.log(maxsize);
     if(req.body.sizeFilter.length===0){
       if(req.body.parentprops.key==='clothing'){
       size = ['XS','S','M','L','XL'];
      }
       else if(req.body.parentprops.key==='electronics')
       {size = ['8','16','32']}
       else{
         size = ['N'];
       }
     }
    else{
      size = req.body.sizeFilter;
      // "'"+req.body.sizeFilter.join("','")+"'";
    }
    if(req.body.priceFilter.length===0){
       maxprice = Number.MAX_VALUE
       minprice = Number.MIN_VALUE

    // prize = '';
    }else{
      console.log('into price');
      maxprice = Math.max(...req.body.priceFilter);
      minprice = Math.min(...req.body.priceFilter);
      console.log(minprice)
      console.log(maxprice)
      // prize = 'AND price BETWEEN '+minprice+' AND '+maxprice
      // prize = ',"price":{$gt:'+minprice+',$lt:'+maxprice+'}'
  }
    if(req.body.brandFilter.length===0){
      brand = ['ironman','thor','hulk','hawk','captain_america','black_widow','groot','rocket','others']
    }else{
      brand = req.body.brandFilter  
      // "'"+req.body.brandFilter.join("','")+"'";
    }
    console.log("brand filter backend"+req.body.brandFilter)
    if(content==='search'){
      console.log('search query')
      console.log(search_parm)
      // queryString = 'SELECT * from productdetails where product_id in (?)  AND brand in (?) '+prize
      // var query= res.locals.connection.query(queryString,[search_parm,brand], function (error, results, fields) {

        var query = product.productdetails.find({"product_id":search_parm, "brand":brand},function(err,docs){ 
          console.log('after query in homepage.js backend');   
          if(err){  
              res.json(err);  
          }  
          else{  
            console.log(results);
              res.json(docs);  
          }  
          console.log(query);
      });
        //var query= res.locals.connection.query(filterQuery,[content], function (error, results, fields) {
          
          //AND size in (?) AND price BETWEEN ? AND ?         ,req.body.sizeFilter,0,1000   + prize
          //AND price BETWEEN ? AND ?      ,req.body.priceFilter.min(),req.body.priceFilter.max()
          // res.send(results);
            // }
            // );
    }
    else{

    
    // var queryString = "SELECT * FROM productdetails where category_id in (select category_id from categories where parent_category =?) AND size in  (?) AND brand in (?)  "+prize
      //var queryString ='"category_id":1'
      //,"size":{$in:['+size+']},"brand":{$in:['+brand+']}'+prize
      // console.log(queryString);
      //product.categories.find({"parent_category":content},{category_id:1})
    // var query= res.locals.connection.query(queryString,[content,size,brand], function (error, results, fields) {
    cat_id=''  
    product.categories.find({"parent_category":content},{"category_id":1, "_id":0},function(err,docs){ 
        if(err){  
            console.log(err);  
        }  
        else{  
          // var json = `{ "foo": 1, "bar": 2, "baz": 3 }`;
          console.log(typeof docs);
          console.log(docs.length);
          var value = [];
          for(var i=0;i<docs.length;i++){
            // console.log(docs[i]);
            var obj1 = docs[i].category_id;
            
            // var json = '{ "foo": 1, "bar": 2, "baz": 3 }';
            // var obj = JSON.parse(json);
            console.log(typeof obj1);
            console.log(obj1);
            value.push(obj1);
          }
          console.log("values"+value);
        
            console.log("cat"+cat_id+"end cat");
            var query = product.product_details.find({"category_id":{$in:value},"size":{$in:size},"brand":{$in:brand},"price":{$gt:minprice,$lt:maxprice}},function(err,docs){ 
              //,"price":{$gt:minprice,$lt:maxprice}
              // console.log(query.sql);
              console.log('after query in homepage.js backend');   
              if(err){  
                  res.json(err);  
              }  
              else{  
                 console.log(docs);
                  
                res.json(docs);  
      
              }  
          }); 
        }  
    }); 

    
    
    //var query= res.locals.connection.query(filterQuery,[content], function (error, results, fields) {
      
      //AND size in (?) AND price BETWEEN ? AND ?         ,req.body.sizeFilter,0,1000   + prize
      //AND price BETWEEN ? AND ?      ,req.body.priceFilter.min(),req.body.priceFilter.max()
      // res.send(results);
        // }
        // );
      }
        // console.log(query.sql);
      });
module.exports = router;