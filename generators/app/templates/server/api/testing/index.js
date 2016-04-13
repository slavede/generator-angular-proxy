'use strict';

var express = require('express');

var router = express.Router();

router.get('/', function(req, res) {
    res.json({ items: [
        {
            id : 1,
            item : 'Item 1'
        },
        {
            id : 2,
            item : 'Item 2'
        }
    ] });
});

router.post('/', function(req, res) {
    res.json({ items: [
        {
            id : 11,
            item : 'Item 11'
        },
        {
            id : 22,
            item : 'Item 22'
        }
    ] });
});

module.exports = router;
