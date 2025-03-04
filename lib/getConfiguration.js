var services = {
  'travis' : require('./services/travis'),
  'circle' : require('./services/circle'),
  'codeship' : require('./services/codeship'),
  'drone' : require('./services/drone'),
  'jenkins' : require('./services/jenkins'),
  'semaphore' : require('./services/semaphore')
};

module.exports = function(){
  var config;
  for (var name in services){
    if (services[name].detect()){
      config = services[name].configuration();
      break;
    }
  }
  if (!config){
    throw new Error("unknown service.  could not get configuration");
  }
  var token = (process.env.codecov_token || process.env.CODECOV_TOKEN);
  if (token){
    config.token = token;
  }
  return config;
};
