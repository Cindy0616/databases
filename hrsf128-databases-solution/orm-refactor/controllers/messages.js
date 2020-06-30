var db = require('../db');

module.exports = {
  get: function (req, res) {
    db.Message.findAll({include: [db.User]})
      .then(function(messages) {
        res.json(messages);
      });
  },
  post: function (req, res) {
    db.User.findOrCreate({where: {username: req.body.username}})
      // findOrCreate returns multiple resutls in an array
      // use spread to assign the array to function arguments
      .spread(function(user, created) {
        db.Message.create({
          userid: user.get('id'),
          text: req.body.message,
          roomname: req.body.roomname
        }).then(function(message) {
          res.sendStatus(201);
        });
      });
  }
};
