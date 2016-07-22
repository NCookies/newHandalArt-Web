var express = require('express');
var router = express.Router();

var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/upload', function(req, res) {
	// console.log('dirname : ' + ___dirname);

	fs.readFile(req.files.uploadFile.path, function(error ,data) {
		var filePath = __dirname + "/public/images/" + req.files.uploadFile.name;
		fs.writeFile(filePath, data, function(err) {
			if (error) {
				throw error;
			} else {
				res.redirect('/');
			}
		});
	});
});

module.exports = router;
