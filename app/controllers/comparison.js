import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {

    didChooseMake: function (make) {
      this.set('make', make);
      this.set('carModel', null);
    },

    didChooseModel: function (model) {
      this.set('carModel', model);
    }

  }

});
