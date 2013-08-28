define([
    'rivets',
    'text!./template.html'
], function(rivets, template) {
    var view = Backbone.View.extend({
        initialize: function() {
            var scope = this.scope = new Backbone.Model({
                account: 'account',
                username: '',
                password: '',
                submit: function() {
                    console.log('Do submit');
                }
            });

            $(this.el).html(template);
            rivets.bind($(this.el), scope);
        }
    });
    return view;
});
