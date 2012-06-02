var redis = require('redis');

if (process.env.REDISTOGO_URL) {
  var redisUrl = require('url').parse(process.env.REDISTOGO_URL);
  console.log('Connecting to remote redis server ' + redisUrl.hostname + ':' + redisUrl.port);
  var client = redis.createClient(redisUrl.port, redisUrl.hostname);
  redis.auth(redisUrl.auth.split(':')[1]);
} else {
  console.log('Connecting to local redis server');
  var client = redis.createClient();
}

client.on('error', function (err) {
  console.log('Error ' + err);
});

function loadProgram(id,callback) {
  client.get(id, callback);
}

function saveProgram(program, key, callback) {
  client.set(key, program, callback);
}

function generateKey(key, callback) {
  if (key) { 
    callback('', key); 
  } else {
    client.incr('program_key');
    client.get('program_key', callback);
  }
}

exports.loadProgram = loadProgram;
exports.saveProgram = saveProgram;
exports.generateKey = generateKey;

