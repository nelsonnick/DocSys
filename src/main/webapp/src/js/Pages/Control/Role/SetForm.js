import React from 'react';
import { Form, Input, TreeSelect } from 'antd';
const FormItem = Form.Item;

class SetFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      powerValue: this.props.powerValue,
      deptValue: this.props.deptValue,
      powerTree: [],
      deptTree: [],
    };
    this.onChangePower = this.onChangePower.bind(this);
    this.onChangeDept = this.onChangeDept.bind(this);
  }

  // componentWillReceiveProps() {
  //   this.setState(
  //     {
  //       powerValue: this.props.powerValue,
  //       deptValue: this.props.deptValue,
  //     }
  //   );
  // }
  onChangePower(powerValue) {
    this.props.getPower(powerValue);
    this.setState({ powerValue });
  }
  onChangeDept(deptValue) {
    this.props.getDept(deptValue);
    this.setState({ deptValue });
  }
  render() {
    const { getFieldProps } = this.props.form;
    const { roleId, roleName, roleOther, powerTree, deptTree } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const roleIdProps = getFieldProps('roleId', {
      initialValue: roleId,
    });
    const roleNameProps = getFieldProps('roleName', {
      initialValue: roleName,
    });
    const roleOtherProps = getFieldProps('roleOther', {
      initialValue: roleOther,
    });
    const powerTreeProps = getFieldProps('powerTree', {
      initialValue: this.state.powerValue,
    });
    const deptTreeProps = getFieldProps('deptTree', {
      initialValue: this.props.deptValue,
    });
    return (
      <Form horizontal>
        <FormItem
          label=""
          {...formItemLayout}
        >
          <Input type="hidden" {...roleIdProps} />
        </FormItem>
        <FormItem
          label="角色名称"
          {...formItemLayout}
          hasFeedback
          required
        >
          <Input placeholder="请输入角色名称" disabled {...roleNameProps} />
        </FormItem>
        <FormItem
          label="其他信息"
          {...formItemLayout}
          hasFeedback
        >
          <Input type="textarea" rows="3" placeholder="其他需要填写的信息" disabled {...roleOtherProps} />
        </FormItem>
        <FormItem
          label="赋予权限"
          {...formItemLayout}
          required
        >
          <TreeSelect
            {...powerTreeProps}
            value={this.state.powerValue}
            treeData={powerTree}
            onChange={this.onChangePower}
            multiple
            treeCheckable
            showCheckedStrategy={TreeSelect.SHOW_ALL}
            searchPlaceholder={"请选择"}
          />
        </FormItem>
        <FormItem
          label="授权部门"
          {...formItemLayout}
          required
        >
          <TreeSelect
            {...deptTreeProps}
            value={this.state.deptValue}
            treeData={deptTree}
            onChange={this.onChangeDept}
            multiple
            treeCheckable
            showCheckedStrategy={TreeSelect.SHOW_ALL}
            searchPlaceholder={"请选择"}
          />
        </FormItem>
      </Form>
    );
  }
}
SetFrom = Form.create({})(SetFrom);
export default SetFrom;
SetFrom.propTypes = {
  form: React.PropTypes.object,
  roleId: React.PropTypes.string,
  roleName: React.PropTypes.string,
  roleOther: React.PropTypes.string,
  powerTree: React.PropTypes.object,
  deptTree: React.PropTypes.object,
  powerValue: React.PropTypes.string,
  deptValue: React.PropTypes.string,
  getPower: React.PropTypes.func,
  getDept: React.PropTypes.func,
};
