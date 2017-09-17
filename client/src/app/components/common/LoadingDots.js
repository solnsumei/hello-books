import React from 'react';
import PropTypes from 'prop-types';

/**

*/
class LoadingDots extends React.Component {
  /**
   * @param {object} props
   *
   */
  constructor(props) {
    super(props);

    this.state = { frame: 1 };
  }

  /**
   *  @returns {[]} null
   */
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState({
        frame: this.state.frame + 1
      });
    }, this.props.interval);
  }

  /**
   *  @return {[]} null
   */
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  /**
   * @returns {[]} null
   */
  render() {
    let dots = this.state.frame % (this.props.dots + 1);
    let text = '';
    while (dots > 0) {
      text += '.';
      dots -= 1;
    }
    return <span>{text}&nbsp;</span>;
  }
}

LoadingDots.defaultProps = {
  interval: 300, dots: 3
};

LoadingDots.propTypes = {
  dots: PropTypes.number,
  interval: PropTypes.number
};

export default LoadingDots;
