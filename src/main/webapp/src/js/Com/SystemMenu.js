import { Menu, Icon } from 'antd';
import React from 'react';
import QueueAnim from 'rc-queue-anim';

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
            <Menu.Item key="File"><span><Icon type="bars" />档案管理</span></Menu.Item>
            <Menu.Item key="Flow"><span><Icon type="mail" />档案流转</span></Menu.Item>
            <Menu.Item key="Charts"><span><Icon type="area-chart" />统计分析</span></Menu.Item>
            <Menu.Item key="Contact"><span><Icon type="customer-service" />部门联络</span></Menu.Item>
            <Menu.Item key="Pass"><span><Icon type="setting" />密码变更</span></Menu.Item>
          </Menu>
        </div>
      </QueueAnim>
    );
  }
}
SystemMenu.propTypes = {
  menuLabel: React.PropTypes.func,
};
// <Menu.Item key="Charts"><span><Icon type="area-chart" />统计分析</span></Menu.Item>
