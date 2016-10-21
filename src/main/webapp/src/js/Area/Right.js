import React from 'react';
import Blank from '../Pages/Others/Blank.js';
import DocInfo from '../Pages/Document/Information/DocInfo.js';
import DocChan from '../Pages/Document/Change/DocChan.js';
import DocFlow from '../Pages/Document/Flow/DocFlow.js';
import DocAnal from '../Pages/Analysis/Document/DocAnal.js';
import PerAnal from '../Pages/Analysis/Person/PerAnal.js';
import OpeAnal from '../Pages/Analysis/Operation/OpeAnal.js';
import PasCont from '../Pages/Control/Password/PassCont.js';
import DepCont from '../Pages/Control/Department/Main.js';
import UseCont from './Main.js';
import RolCont from '../Pages/Control/Role/Main.js';
export default class Right extends React.Component {
  render() {
    let tableCase;
    switch (this.props.menuFunctionType) {
      case 'DocInfo':
        tableCase = <DocInfo />;
        break;
      case 'DocChan':
        tableCase = <DocChan />;
        break;
      case 'DocFlow':
        tableCase = <DocFlow />;
        break;
      case 'DocAnal':
        tableCase = <DocAnal />;
        break;
      case 'PerAnal':
        tableCase = <PerAnal />;
        break;
      case 'OpeAnal':
        tableCase = <OpeAnal />;
        break;
      case 'PasCont':
        tableCase = <PasCont />;
        break;
      case 'DepCont':
        tableCase = <DepCont />;
        break;
      case 'UseCont':
        tableCase = <UseCont />;
        break;
      case 'RolCont':
        tableCase = <RolCont />;
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
