var redis = require('redis');

var keyMapName = 'keymap';

if (process.env.REDISTOGO_URL) {
  var redisUrl = require('url').parse(process.env.REDISTOGO_URL);
  console.log('Connecting to remote redis server ' + redisUrl.hostname + ':' + redisUrl.port);
  var client = redis.createClient(redisUrl.port, redisUrl.hostname);
  client.auth(redisUrl.auth.split(':')[1]);
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

function getProgramName(id,callback) {
  client.hget(keyMapName, id, callback);
}

function saveProgram(program, key, callback) {
  client.set(key, program, callback);
}

function saveKeyMap(key, description, callback) {
  console.log('Saving ' + description + ' with key ' + key);
  client.hset(keyMapName, key, description, callback);
}

function generateKey(key, callback) {
  if (key) { 
    callback('', key); 
  } else {
    client.incr('program_key');
    client.get('program_key', callback);
  }
}

function listKeys(callback) {
  client.hgetall(keyMapName,callback);
}

exports.loadProgram    = loadProgram;
exports.saveProgram    = saveProgram;
exports.generateKey    = generateKey;
exports.listKeys       = listKeys;
exports.saveKeyMap     = saveKeyMap;
exports.getProgramName = getProgramName;
