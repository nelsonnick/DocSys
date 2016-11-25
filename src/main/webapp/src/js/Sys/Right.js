import React from 'react';
import Blank from '../Component/Blank.js';
import Department from '../Department/Main.js';
import User from '../User/Main.js';
import Anal from '../Anal/Main.js';
import Export from '../Export/Main.js';
import Pass from '../Pass/Main.js';
export default class Right extends React.Component {
  render() {
    let tableCase;
    switch (this.props.menuFunctionType) {
      case 'Department':
        tableCase = <Department />;
        break;
      case 'User':
        tableCase = <User />;
        break;
      case 'Anal':
        tableCase = <Anal />;
        break;
      case 'Export':
        tableCase = <Export />;
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
