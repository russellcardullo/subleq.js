
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
  var key = req.body.programId || dataProvider.generateKey();
  console.log('Saving program with key: ' + key);
  dataProvider.saveProgram(req.body.inputProgram, key, function(err, value) {
    res.render('index', { program: req.body.inputProgram,
                          id: key,
                          title: 'subleq.js' })
  });
};

