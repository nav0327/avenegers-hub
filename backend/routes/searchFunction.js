var express = require('express');
var router = express.Router();

var search_query = 'call SearchEcommerce(?)';

router.post('/', function (req, res, next) {
  console.log(req.body);

  res.locals.connection.query(search_query, req.body.searchKeyword, function (error, results, fields) {
    console.log(results);
    if (error) {
      console.log("error ocurred", error);
      res.send({
        "code": 400,
        "failed": "error ocurred"
      })
    } else {
      console.log('The solution is: ', results);
      res.send(JSON.stringify(results[0]));
    }
  });

});

module.exports = router;