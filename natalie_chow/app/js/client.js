const angular = require('angular');
const salemApp = angular.module('salemApp', []);

require('./services')(salemApp);
require('./controllers')(salemApp);
require('./directives')(salemApp);
