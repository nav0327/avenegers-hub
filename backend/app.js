var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var loginRouter = require("./routes/loginroutes");
var registerRouter = require("./routes/registerroutes");
var homepage = require("./routes/homepage");
var intoCategory = require("./routes/intoCategory");
var editUserProfile = require("./routes/editUserProfile");
var checkOutPagePricingRouter = require("./routes/checkOutPagePricing");
var fetchCategories = require("./routes/fetchCategories");
var fetchSubCategories = require("./routes/fetchSubCategories");
var addProduct = require("./routes/addProductAdmin");
var search = require("./routes/searchFunction");
var placeorder = require("./routes/placeOrder");
var fetchOrderDetails = require("./routes/fetchOrderDetails");
var editProductAdmin = require("./routes/editProductAdmin");
var ProductDetails = require("./routes/ProductDetails");
var counter = require("./routes/counter");
var app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// var mysql = require("mysql");
// app.use(function(req, res, next) {
//   res.locals.connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "root",
//     database: "e-commerce_schema"
//   });
//   res.locals.connection.connect();
//   next();
// });
// const mongoose=require('mongoose');  
// const url="mongodb://localhost:27017/e-commerce";  
// app.use(function(req,res,next){
//   res.locals.mongoose = mongoose.connect(url,{useNewUrlParser:true},function(err){  
//     if(err){  
//         console.log('Error in connection');  
//     }  
//     else{  
//         console.log('Connected!');  
//     }  
// })
// });  
  
// module.exports=mongoose;  
Product = require('./models/ProductModel');
var routes = require('./routes/productRoutes');
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/homepage", homepage);
app.use("/intoCategory", intoCategory);
app.use("/userProfile", editUserProfile);
app.use("/checkOutPagePricing", checkOutPagePricingRouter);
app.use("/fetchCategories", fetchCategories);
app.use("/fetchSubCategories", fetchSubCategories);
app.use("/addProduct", addProduct);
app.use("/search", search);
app.use("/placeorder", placeorder);
app.use("/fetchOrderDetails", fetchOrderDetails);
app.use("/editProductAdmin", editProductAdmin);
app.use("/ProductDetails", ProductDetails);
app.use("/counter", counter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//var http = require('http');

//var server = http.createServer(app);
//server.listen(4000);

app.listen(4000);
module.exports = app;
