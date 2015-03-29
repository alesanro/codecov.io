var services = {
  'shippable' : require('./services/shippable'),
  'travis' : require('./services/travis'),
  'circle' : require('./services/circle'),
  'codeship' : require('./services/codeship'),
  'drone' : require('./services/drone'),
  'appveyor' : require('./services/appveyor'),
  'wercker' : require('./services/wercker'),
  'jenkins' : require('./services/jenkins'),
  'semaphore' : require('./services/semaphore')
};

var servicesNames = [
  'shippable',
  'travis',
  'circle',
  'codeship',
  'drone',
  'appveyor',
  'wercker',
  'jenkins',
  'semaphore'
];

module.exports = function(){
  var config;
  console.log(require('util').inspect(process.env));
  for (var name in servicesNames){
    console.log('iterate on service ' + name);
    if (services[name].detect()){
      config = services[name].configuration();
      break;
    }
  }
  if (!config){
    var local = require('./services/localGit');
    config = local.configuration();
    if (!config){
      throw new Error("unknown service. could not get configuration");
    }
  }
  var token = (process.env.codecov_token || process.env.CODECOV_TOKEN);
  if (token){
    config.token = token;
  }
  return config;
};
