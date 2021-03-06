var models = require('../models');

module.exports = {

  get: function (req, res) {
    models.messages.getAll(function(err, results) {
      if (err) { /* do something */ }
      res.json(results);
    });
  },
  post: function (req, res) {
    var params = [req.body.message, req.body.username, req.body.roomname];
    models.messages.create(params, function(err, results) {
      if (err) { /* do something */ }
      res.sendStatus(201);
    });
  }
  };
