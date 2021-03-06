var React = require('react');
var pad = require('../utils/pad');
var FragmentSelect = require('../mixins/FragmentSelect');
var numberRange = require('../utils/numberRange');

var Hour = module.exports = React.createClass({

  displayName: 'Hour',

  mixins: [ FragmentSelect ],

  statics: {
    datePickerChild: true
  },

  propTypes: {
    military: React.PropTypes.bool,
    am: React.PropTypes.string,
    pm: React.PropTypes.string
  },

  getDefaultProps () {
    return { military: false, am: 'AM', pm: 'PM' };
  },

  getOnChangeValue (event) {
    return { hours: parseInt(event.target.value, 10) };
  },

  getHourText (hour) {
    var { military, am, pm } = this.props;
    if (military)
      return pad(hour);
    if (hour === 0)
      return `12 ${am}`;
    if (hour === 12)
      return `12 ${pm}`;
    if (hour > 11)
      return `${pad(hour) - 12} ${pm}`;
    return `${pad(hour)} ${am}`;
  },

  renderOptions () {
    return numberRange(0, 23).map((hour) => {
      var text = this.getHourText(hour)
      return <option key={hour} value={hour}>{text}</option>;
    });
  },

  getValue (value) {
    return value.getHours();
  }

});

