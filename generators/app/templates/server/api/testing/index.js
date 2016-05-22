'use strict';

module.exports = function(app) {
    app.get('/api/testing/:id', function(req, res) {
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

    app.post('/api/testing', function(req, res) {

        console.log(req.body); // what you give in body
        console.log(req.params); // what's matched through params in URL pattern
        console.log(req.query); // query string params

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
};
