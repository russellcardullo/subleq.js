
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { program: '',
                        id: '',
                        title: 'subleq.js' })
};
