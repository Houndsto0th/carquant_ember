import Ember from 'ember';


export default Ember.Controller.extend({
  actions: {


    didChooseMake: function (make) {
      this.set('make', make);
      this.set('carModel', null);
      this.set('styles', []);
      this.set('year', null);
      this.set('style', null);
      this.set('zipCode', null);
    },

    didChooseModel: function (model) {
      this.set('carModel', model);
    },

    didChooseYear: function(make, model, year){
      var styleApi = $.getJSON(
        'https://api.edmunds.com/api/vehicle/v2/'+ make.name.toString() +
        '/'+
        model.name.toString() +
        '/'+
        year.year.toString() +
        '/styles?fmt=json&api_key=aqtqbdzr9ehs27chq6tre3k7&view=full'
      );

      this.set('year', year);
      styleApi.then(function (json) {
        this.set('styles', json.styles);
      }.bind(this));
    },

    didChooseStyle: function (style, year, zipCode) {
      console.log(year.id);
      console.log(style);
      var maintenanceApi = $.getJSON(
        'https://api.edmunds.com/v1/api/maintenance/actionrepository/findbymodelyearid?modelyearid='+
                                    year.id.toString() +
                                    '&fmt=json&api_key='+
                                    'aqtqbdzr9ehs27chq6tre3k7'
      );

      this.set('style', style);
      maintenanceApi.then(function (json) {
        this.set('maintenances', json.actionHolder)
      }.bind(this));

      var localLabor = $.getJSON(
        'https://api.edmunds.com/v1/api/maintenance/ziplaborrate/'+
        zipCode.toString() +
        '?fmt=json&api_key=aqtqbdzr9ehs27chq6tre3k7'
      );

      localLabor.then(function (json) {
        console.log(json);
      })
    }
  }

});
