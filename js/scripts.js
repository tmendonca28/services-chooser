$(function(){

    // Create model for services
    var Service = Backbone.Model.extend({
        
        // Has 3 attribs; these are the default values
        defaults: {
            title: 'My service',
            price: 100,
            checked: false
        },

        // Helper function for checking/unchecking a service
        toggle: function(){
            this.set('checked', !this.get('checked'));
        }
    });

    // Create a collection of services
    var ServiceList = Backbone.Collection.extend({

        // Will hold objects of the Service model
        model: Service,

        // Return an array only with checked services
        getChecked: function(){
            return this.where({checked:true});
        }
    });

    // Prefill collection with a number of services
    var services  = new ServiceList([
        new Service({title: 'Backbone JS', price: 200}),
        new Service({title: 'Angular JS', price: 300}),
        new Service({title: 'React JS', price: 100}),
        new Service({title: 'Vue JS', price: 150}),
        new Service({title: 'Ractive JS', price: 200}),
        new Service({title: 'Ember JS', price: 300})
    ]);

    // Turns a Service model into html. Will create li elements
    var ServiceView = Backbone.View.extend({
        tagName: 'li',
        events:{
            'click': 'toggleService'
        },
        initialize: function() {
            // set up event listeners. The change backbone event is raised when a property changes
            this.listenTo(this.model, 'change', this.render);
        },

        render: function(){

            //Create the HTML
            this.$el.html('<input type="checkbox" value="1" name="' + this.model.get('title') + '" />' + this.model.get('title') + '<span>$' + this.model.get('price') + '</span>');
            this.$('input').prop('checked', this.model.get('checked'));

            //Returning the obj is good practice
            return this;
        },

        toggleService: function(){
            this.model.toggle();
        }

    });

    // The main view of the application
    var App = Backbone.View.extend({
        
        // Base the view on an existing element
        el: $('main'),
        initialize: function(){

            // Cache these selectors
            this.total = $('#total span');
            this.list = $('#services');

            // Listen for the change event on the collection
            // Equivalent to listening on every one of the service objects
        }
    });
    

});