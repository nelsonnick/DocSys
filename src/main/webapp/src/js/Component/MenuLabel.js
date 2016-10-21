import React from 'react';


export default class MenuLabel extends React.Component {

  render() {
    const { menuLabel, menuLabelFunction, menuLabelName } = this.props;
    return (
      <span onClick={() => menuLabel(menuLabelFunction)}>{menuLabelName}</span>
    );
  }
}

MenuLabel.propTypes = {
  menuLabelFunction: React.PropTypes.required,
  menuLabelName: React.PropTypes.required,
  menuLabel: React.PropTypes.func,
};

MenuLabel.defaultProps = {
  menuLabelFunction: '',
  menuLabelName: '',
};
