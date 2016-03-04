require(__dirname + '/../app/js/client');
require('angular-mocks');

require(__dirname + '/controllers/auth_controller_test.js');
require(__dirname + '/controllers/non_crud_controller_test.js');
require(__dirname + '/controllers/towns_controller_test.js');
require(__dirname + '/controllers/mafias_controller_test.js');

require(__dirname + '/services/resource_service_test.js');
require(__dirname + '/services/salem_auth_service_test.js');

require(__dirname + '/directives/user_form_directive_test.js');
require(__dirname + '/directives/town_display_directive_test.js');
require(__dirname + '/directives/mafia_display_directive_test.js');
require(__dirname + '/directives/town_create_directive_test.js');
require(__dirname + '/directives/mafia_create_directive_test.js');
require(__dirname + '/directives/warning_directive_test.js');
