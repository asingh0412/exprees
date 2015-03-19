var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET Contact listpage. */
router.get('/contactlist', function(req, res) {
	var db = req.db;
	var collection = db.get('contacts');
	collection.find({},{limit:10, sort:[['last',1]]},function(e,docs){
		res.render('contactlist',{
			"contactlist" : docs
		});
	});
});

/* GET New User page. */
router.get('/newcontact', function(req, res) {
  res.render('newcontact', { title: 'Add new Contact' });
});

/* POST to Add Contact*/
router.post('/addcontact',function(req, res){
	// Set our internal DB variable
	var db = req.db;

	//Get our form values. These rely on the "Name" attributes
	var userFirst = req.body.first;
	var userLast = req.body.last;
	var userTitle = req.body.titl;
	var userCompany = req.body.company;
	var userEmail = req.body.email;
	var userMet = req.body.met;
	var userDate = req.body.date;
	var userComments = req.body.comments;

	// Set our collection
	var collection = db.get('contacts');

	// Submit to the db
	collection.insert({
		"first": userFirst,
		"last": userLast,
		"title": userTitle,
		"company": userCompany,
		"email": userEmail,
		"met": userMet,
		"date": userDate,
		"comments":userComments
	}, function(err,doc){
		if(err){
			// If it failed, return error
			res.send("There was a problem adding the information to the database");
		}
		else{
			// if it worked, set the header so the address var doesn't say /adduser
			res.location("contactlist");
			// and forward to succes page
			res.redirect("contactlist");
		}
		});
});

module.exports = router;
