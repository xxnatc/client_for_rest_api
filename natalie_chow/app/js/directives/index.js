module.exports = function(app) {
  require('./user_form_directive')(app);
  require('./town_display_directive')(app);
  require('./mafia_display_directive')(app);
  require('./town_create_directive')(app);
  require('./mafia_create_directive')(app);
};
