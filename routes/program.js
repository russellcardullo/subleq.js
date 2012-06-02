
var dataProvider = require('../app/dataProvider');

/*
 * GET stored program
 */

exports.load = function(req, res) {
  dataProvider.loadProgram(req.params.id, function(err, value) {
    res.render('index', { program: value,
                          id: req.params.id,
                          title: 'subleq.js' })
  });
};

exports.save = function(req, res) {
  dataProvider.generateKey(req.body.programId, function (err, key) {
    console.log('Saving program with key: ' + key);
    dataProvider.saveProgram(req.body.inputProgram, key, function(err, value) {
      res.redirect('/program/' + key);
    });
  });
};

