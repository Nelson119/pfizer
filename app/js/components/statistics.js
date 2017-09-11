'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations, no-alert*/
/*global app, $ */
app.partial.statistics = function() {


    var container = $('[role=main]');
    container.on('page:update:statistics', function(page, menu) {
        
    });

    if (container.hasClass('statistics')) {
        container.trigger('page:update:statistics', null);
    }

};
