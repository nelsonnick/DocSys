import React from 'react';

function UserName({ name }) {
  return <div>当前用户： {name}</div>;
}

UserName.propTypes = {
  name: React.PropTypes.required,
};

UserName.defaultProps = {
  name: '未设置',
};

export default UserName;
