
var dataProvider = require('../app/dataProvider');

/*
 * GET stored program
 */

exports.load = function(req, res) {
  dataProvider.loadProgram(req.params.id, function(err, value) {
    var programText = value;
    dataProvider.getProgramName(req.params.id, function(err, value) {
      console.log('Found name: ' + value + ' for key: ' + req.params.id);
      res.render('index', { program: programText,
                            id: req.params.id,
                            programName: value,
                            title: 'subleq.js' })
    });
  });
};

exports.save = function(req, res) {
  dataProvider.generateKey(req.body.programId, function (err, key) {
    console.log('Saving program with key: ' + key + ' and name: ' + req.body.programName);
    dataProvider.saveProgram(req.body.inputProgram, key, function(err, value) {
      dataProvider.saveKeyMap(key,req.body.programName, function(err, value) {
        res.redirect('/program/' + key);
      });
    });
  });
};

exports.list = function(req, res) {
  dataProvider.listKeys(function (err, value) {
    console.log(value);
    res.render('list', { programList: value,
                          title: 'subleq.js' })

  });

};

