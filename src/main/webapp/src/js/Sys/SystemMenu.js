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
            <Menu.Item key="Department"><span><Icon type="laptop" />部门管理</span></Menu.Item>
            <Menu.Item key="User"><span><Icon type="user" />用户管理</span></Menu.Item>
          </Menu>
        </div>
      </QueueAnim>
    );
  }
}
SystemMenu.propTypes = {
  menuLabel: React.PropTypes.func,
};
