import React from 'react';

function DepartmentName({ name }) {
  return <div>所属部门： {name}</div>;
}

DepartmentName.propTypes = {
  name: React.PropTypes.required,
};

DepartmentName.defaultProps = {
  name: '未设置',
};

export default DepartmentName;
