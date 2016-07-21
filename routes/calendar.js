var express = require('express');
var router = express.Router();

/* GET fullcalendar page. */
router.get('/', function(req, res, next) {
    res.render('fullcalendar');
});


module.exports = router;
