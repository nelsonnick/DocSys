import React from 'react';
import Blank from '../Component/Blank.js';
import File from '../File/Main.js';
import Flow from '../Flow/Main.js';
import Pass from '../Pass/Main.js';
export default class Right extends React.Component {
  render() {
    let tableCase;
    switch (this.props.menuFunctionType) {
      case 'File':
        tableCase = <File />;
        break;
      case 'Flow':
        tableCase = <Flow />;
        break;
      case 'Pass':
        tableCase = <Pass />;
        break;
      default:
        tableCase = <Blank />;
    }
    return (
      <div>
        {tableCase}
      </div>
    );
  }
}
Right.propTypes = {
  menuFunctionType: React.PropTypes.string,
};
