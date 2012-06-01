if (process.env.REDISTOGO_URL) {
  var redisUrl = require('url').parse(process.env.REDISTOGO_URL);
  var redis = require('redis').createClient(redisUrl.port, redisUrl.hostname);
  redis.auth(redisUrl.auth.split(':')[1]);
} else {
  var redis = require('redis').createClient();
}

function loadProgram(id,callback) {
  redis.get(id, callback);
}

function saveProgram(program, key, callback) {
  redis.set(key, program, callback);
}

function generateKey() {
  redis.incr('program_key');
  redis.get('program_key', function (err, value) {
    return value;
  });
}

exports.loadProgram = loadProgram;
exports.saveProgram = saveProgram;
exports.generateKey = generateKey;

