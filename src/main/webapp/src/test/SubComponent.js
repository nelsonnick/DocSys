import React from 'react';
export default class SubComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '这里是初始化文本',
    };
  }
  subHandleClick() {
    this.setState({ text: '文本被改变啦！哈哈！' });
  }
  render() {
    return (
      <div>
        查看：{this.state.text}
      </div>
    );
  }
}
