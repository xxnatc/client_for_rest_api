module.exports = exports = function(app) {
  require('./salem_auth_service')(app);
  require('./resource_service')(app);
};
