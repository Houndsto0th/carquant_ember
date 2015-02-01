import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return $.getJSON('https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=aqtqbdzr9ehs27chq6tre3k7');
  }
});
