import { Menu, Icon } from 'antd';
import React from 'react';
import QueueAnim from 'rc-queue-anim';
const SubMenu = Menu.SubMenu;

export default class SystemMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '1',
      openKeys: [],
    };
    this.onToggle = this.onToggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log();
  }

  onToggle(info) {
    this.setState({
      openKeys: info.open ? info.keyPath : info.keyPath.slice(1),
    });
  }

  handleClick(e) {
    this.setState({
      current: e.key,
      openKeys: e.keyPath.slice(1),
    });
    this.props.menuLabel(e.key);
  }

  render() {
    const rolePowers = window.rolePower;
    const getMenu = [];
    if (rolePowers.indexOf('Document,') >= 0) {
      const getSubMenuA = [];
      if (rolePowers.indexOf('DocInfo,') >= 0) {
        getSubMenuA.push(<Menu.Item key="DocInfo"><span><Icon type="bars" />档案信息</span></Menu.Item>);
      }
      if (rolePowers.indexOf('DocFlow,') >= 0) {
        getSubMenuA.push(<Menu.Item key="DocFlow"><span><Icon type="mail" />档案流动</span></Menu.Item>);
      }
      if (rolePowers.indexOf('DocChan,') >= 0) {
        getSubMenuA.push(<Menu.Item key="DocChan"><span><Icon type="book" />信息变更</span></Menu.Item>);
      }
      getMenu.push(<SubMenu key="Document" title={<span><Icon type="file" />档案管理</span>} children={getSubMenuA} />);
    }

    if (rolePowers.indexOf('Analysis,') >= 0) {
      const getSubMenuC = [];
      if (rolePowers.indexOf('DocAnal,') >= 0) {
        getSubMenuC.push(<Menu.Item key="DocAnal"><span><Icon type="area-chart" />档案分析</span></Menu.Item>);
      }
      if (rolePowers.indexOf('PerAnal,') >= 0) {
        getSubMenuC.push(<Menu.Item key="PerAnal"><span><Icon type="bar-chart" />人员分析</span></Menu.Item>);
      }
      if (rolePowers.indexOf('OpeAnal,') >= 0) {
        getSubMenuC.push(<Menu.Item key="OpeAnal"><span><Icon type="line-chart" />业务信息</span></Menu.Item>);
      }
      getMenu.push(<SubMenu key="Analysis" title={<span><Icon type="pie-chart" />统计分析</span>} children={getSubMenuC} />);
    }

    if (rolePowers.indexOf('Control,') >= 0) {
      const getSubMenuD = [];
      if (rolePowers.indexOf('PasCont,') >= 0) {
        getSubMenuD.push(<Menu.Item key="PasCont"><span><Icon type="ellipsis" />密码管理</span></Menu.Item>);
      }
      if (rolePowers.indexOf('DepCont,') >= 0) {
        getSubMenuD.push(<Menu.Item key="DepCont"><span><Icon type="laptop" />部门管理</span></Menu.Item>);
      }
      if (rolePowers.indexOf('UseCont,') >= 0) {
        getSubMenuD.push(<Menu.Item key="UseCont"><span><Icon type="user" />用户管理</span></Menu.Item>);
      }
      if (rolePowers.indexOf('RolCont,') >= 0) {
        getSubMenuD.push(<Menu.Item key="RolCont"><span><Icon type="solution" />角色管理</span></Menu.Item>);
      }
      getMenu.push(<SubMenu key="Control" title={<span><Icon type="setting" />系统管理</span>} children={getSubMenuD} />);
    }
    // const getMenu = [];
    // for (let j = 0; j < rolePower.length; j++) {
    //   if (rolePower[j].Stat) {
    //     const getSubMenu = [];
    //     for (let i = 0; i < rolePower[j].Data.length; i++) {
    //       if (rolePower[j].Data[i].Stat) {
    //         getSubMenu.push(<Menu.Item key={rolePower[j].Data[i].Func}><span><Icon type={rolePower[j].Data[i].Type} />{rolePower[j].Data[i].Name}</span></Menu.Item>);
    //       }
    //     }
    //     getMenu.push(<SubMenu key={rolePower[j].Func} title={<span><Icon type={rolePower[j].Type} />{rolePower[j].Name}</span>} children={getSubMenu} />);
    //   }
    // }
    return (
      <QueueAnim type="left">
        <div key="sys">
          <Menu
            onClick={this.handleClick}
            style={{ width: 160 }}
            openKeys={this.state.openKeys}
            onOpen={this.onToggle}
            onClose={this.onToggle}
            selectedKeys={[this.state.current]}
            mode="inline"
          >
            {getMenu}
          </Menu>
        </div>
      </QueueAnim>
    );
  }
}
SystemMenu.propTypes = {
  menuLabel: React.PropTypes.func,
};
