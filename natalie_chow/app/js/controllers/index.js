module.exports = function(app) {
  require('./users_controller')(app);
  require('./non_crud_controller')(app);
  require('./towns_controller')(app);
  require('./mafias_controller')(app);
};
