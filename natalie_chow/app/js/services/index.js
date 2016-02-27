module.exports = exports = function(app) {
  require('./resource_service')(app);
  require('./user_service')(app);
};
