import React from 'react';
const a = {
  'font-size': '45px',
  color: '#2DB7F5',
};
function LogoName({ name }) {
  return <div style={a} >{name}</div>;
}

LogoName.propTypes = {
  name: React.PropTypes.required,
};
LogoName.defaultProps = {
  name: '未设置',
};
export default LogoName;
