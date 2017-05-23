import { Component } from 'react';
import PropTypes from 'prop-types';

class RangeSelectorButton extends Component {

  static propTypes = {
    count: PropTypes.number,
    type: PropTypes.string.isRequired
  };

  static contextTypes = {
    chart: PropTypes.object
  };

  constructor (props, context) {
    super(props, context);
    this.getButtons = this.getButtons.bind(this);
    this.getButtonIndex = this.getButtonIndex.bind(this);
    this.updateRangeSelectorButtons = this.updateRangeSelectorButtons.bind(this);
  }

  componentDidMount () {
    const button = this.getButtonIndex();
    if (!button) {
      const { count, type, children } = this.props;
      const buttons = this.getButtons();
      buttons.push({
        count,
        type,
        text: children
      });
      this.updateRangeSelectorButtons(buttons);
    }
  }

  componentWillUnmount () {
    const button = this.getButtonIndex();
    if (button) {
      const buttons = this.getButtons();
      buttons.splice(button, 1);
      this.updateRangeSelectorButtons(buttons);
    }
  }

  getButtons () {
    const { buttons = [] } = this.context.chart.options.rangeSelector;
    return buttons;
  }

  getButtonIndex () {
    const { count, type } = this.props;
    this.getButtons().findIndex(b => {
      return (b.count === count && b.type === type);
    });
  }

  updateRangeSelectorButtons (config) {
    this.context.chart.update({
      rangeSelector: {
        buttons: config
      }
    });
  }

  render () {
    return null;
  }
}

export default RangeSelectorButton;