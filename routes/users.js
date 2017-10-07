var express = require('express');
var router = express.Router();


router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.get('/api', function(req, res) {
  console.log("we are in the get request");
  var fullname = req.param('firstname');
  var email = req.param('email');
  var username = req.param('username');
  // var lastname = req.param('lastname');

  res.send(firstname + ' ' + email + ' ' + username);
});

router.post('/api', function(req, res) {
    console.log("we are in the post request");
    var fullname = req.body.firstname;
    var email = req.body.email;
    var username = req.body.username;

    res.send(fullname + ' ' + email + ' ' + username);
});

module.exports = router;
