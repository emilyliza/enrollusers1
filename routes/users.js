var express = require('express');
var router = express.Router();


router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});

router.post('/adduser', function(req, res) {
    var db = req.db;
    var collection = db.get('userlist');
    collection.insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

router.get('/api', function(req, res) {

    res.json({name: "Emily"});

  // console.log("we are in the get request");
  // res.render('index');
  // // var fullname = req.param('firstname');
  // var email = req.param('email') || "fred@gmail.com";
  // var username = req.param('username') || "fred";
  // console.log(email, username);
  // // res.send(email, username);
  // var lastname = req.param('lastname');

  // res.send(firstname + ' ' + email + ' ' + username);
});

router.post('/api', function(req, res) {
    console.log(req.body);

    res.json(req.body);
});

module.exports = router;
