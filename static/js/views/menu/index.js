define([
    'text!./template.html'
], function(template) {
    var view = Backbone.View.extend({
        initialize: function() {
            var scope = this.scope = new Backbone.Model({
                account: '',
                username: '',
                password: '',
                submit: function() {
                    console.log('Do submit');
                }
            });

            $(this.el).html(template);
        }
    });
    return view;
});
