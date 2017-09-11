'use strict';
/*eslint-disable new-cap, no-unused-vars,
	no-use-before-define, no-trailing-spaces, space-infix-ops, comma-spacing,
	no-mixed-spaces-and-tabs, no-multi-spaces, camelcase, no-loop-func,no-empty,
	key-spacing ,curly, no-shadow, no-return-assign, no-redeclare, no-unused-vars,
	eqeqeq, no-extend-native, quotes , no-inner-declarations, no-alert*/
/*global app, $ */
app.partial.articles = function() {


    var container = $('[role=main]');
    container.on('page:update:articles', function(page, menu) {
        $('.video-container .video').lightGallery({
            controls: false,
            autoplay: false,
            download: false,
            counter: false,
            zoom: false,
            share: false,
            youtubePlayerParams: {
                modestbranding: 1,
                showinfo: 0,
                rel: 0,
                controls: 0
            }
        });
    });

    if (container.hasClass('articles')) {
        container.trigger('page:update:articles', null);
    }

};
