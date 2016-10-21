import SystemMenu from '../Component/SystemMenu.js';
import React from 'react';

export default class Left extends React.Component {

  constructor(props) {
    super(props);
    this.setMenuLabel = this.setMenuLabel.bind(this);
  }

  setMenuLabel(labelName) {
    this.props.menuLabel(labelName);
  }

  render() {
    return (
      <SystemMenu menuLabel={this.setMenuLabel} />
    );
  }
}
Left.propTypes = {
  menuLabel: React.PropTypes.func,
};
