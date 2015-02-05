import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    // carModel should display after a make has been selected, it's value should be reset
    // if a different make is selected.

    didChooseMake: function (make) {
      this.set('make', make);
      this.set('carModel', null)
      this.set('styles', []);
      this.set('year', null);
    },

    didChooseModel: function (model) {
      this.set('carModel', model);
    },

    didChooseYear: function(make, model, year){
      var promise = $.getJSON(
        'https://api.edmunds.com/api/vehicle/v2/'+ make.name.toString() +
        '/'+
        model.name.toString() +
        '/'+
        year.year.toString() +
        '/styles?fmt=json&api_key=aqtqbdzr9ehs27chq6tre3k7&view=full'
      );

      this.set('year', year);
      promise.then(function (json) {
        this.set('styles', json.styles);
      }.bind(this));
    }
  }

});
