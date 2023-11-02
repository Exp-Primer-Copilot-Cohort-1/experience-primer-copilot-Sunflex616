// Create web server
// 2016-04-06    PV

var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

// GET /comments
router.get('/', function (req, res, next) {
    fs.readFile(path.join(__dirname, '..', 'data', 'comments.json'), function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal error');
        } else {
            res.setHeader('Cache-Control', 'no-cache');
            res.json(JSON.parse(data));
        }
    });
});

// POST /comments
router.post('/', function (req, res, next) {
    fs.readFile(path.join(__dirname, '..', 'data', 'comments.json'), function (err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Internal error');
        } else {
            var comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile(path.join(__dirname, '..', 'data', 'comments.json'), JSON.stringify(comments, null, 4), function (err) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Internal error');
                } else {
                    res.setHeader('Cache-Control', 'no-cache');
                    res.json(comments);
                }
            });
        }
    });
});

module.exports = router;
