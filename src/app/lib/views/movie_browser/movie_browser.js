(function(App) {
    "use strict";

    /**
     * Manage movie browsing:
     *  * Create filter views
     *  * Create movie list
     *  * Fetch new movie collection and pass them to the movie list view
     *  * Show movie detail
     *  * Start playing a movie
     */
    var MovieBrowser = Backbone.Marionette.Layout.extend({
        template: '#movie-browser-tpl',
        className: 'movie-browser',

        regions: {
            FilterBar: '.filter-bar',
            MovieList: '.movie-list'
        },

        initialize: function() {
            this.movieCollection = new App.currentScrapper();

            // Fetch default category movie:
            this.movieCollection.fetch({
                category: App.Config.categories[0]
            });
        },

        onShow: function() {
            this.FilterBar.show(new App.View.FilterBar({
                categories: App.Config.categories
            }));

            this.MovieList.show(new App.View.MovieList({
                model: this.movieCollection
            }));
        }
    });

    App.View.MovieBrowser = MovieBrowser;
})(window.App);