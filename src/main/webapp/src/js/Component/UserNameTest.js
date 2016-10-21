import React from 'react';
import '../../css/test.css';
// const a = {
//   'font-size': '50px',
//   color: 'red',
// };
function UserName({ name }) {
  return <div className="a">当前用户： {name}</div>;
}

UserName.propTypes = {
  name: React.PropTypes.required,
};

UserName.defaultProps = {
  name: '用户名未设置',
};

export default UserName;
