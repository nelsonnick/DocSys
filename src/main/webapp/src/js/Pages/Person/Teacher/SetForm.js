import React from 'react';
import { Form, Input, TreeSelect, Cascader } from 'antd';
const FormItem = Form.Item;

class SetFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roleValue: this.props.roleValue,
      roleTree: [],
    };
    this.onChangeRole = this.onChangeRole.bind(this);
  }

  // componentWillReceiveProps() {
  //   this.setState(
  //     {
  //       roleValue: this.props.roleValue,
  //     }
  //   );
  // }
  onChangeRole(roleValue) {
    this.props.getRole(roleValue);
    this.setState({ roleValue });
  }

  render() {
    const { getFieldProps } = this.props.form;
    // const { userId, userName, userPhone, userNumber, userState, userOther, userDept, userLogin, options, roleTree } = this.props;
    const { userId, userName, userNumber, userDept, options, roleTree } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const userIdProps = getFieldProps('userId', {
      initialValue: userId,
    });
    const userNameProps = getFieldProps('userName', {
      initialValue: userName,
    });
    // const userOtherProps = getFieldProps('userOther', {
    //   initialValue: userOther,
    // });
    const userNumberProps = getFieldProps('userNumber', {
      initialValue: userNumber,
    });
    // const userStateProps = getFieldProps('userState', {
    //   initialValue: userState,
    // });
    // const userPhoneProps = getFieldProps('userPhone', {
    //   initialValue: userPhone,
    // });
    const userDeptProps = getFieldProps('userDept', {
      initialValue: userDept,
    });
    // const userLoginProps = getFieldProps('userLogin', {
    //   initialValue: userLogin,
    // });
    const roleTreeProps = getFieldProps('roleTree', {
      initialValue: this.state.roleValue,
    });
    return (
      <Form horizontal>
        <FormItem
          label=""
          {...formItemLayout}
        >
          <Input type="hidden" {...userIdProps} />
        </FormItem>
        <FormItem
          label="真实姓名"
          {...formItemLayout}
          required
        >
          <Input placeholder="请输入用户真实姓名" disabled="true" {...userNameProps} />
        </FormItem>
        <FormItem
          label="证件号码"
          {...formItemLayout}
          required
        >
          <Input placeholder="请输入用户证件号码" disabled="true" {...userNumberProps} />
        </FormItem>
        <FormItem
          label="所属部门"
          {...formItemLayout}
          required
        >
          <Cascader allowClear={false} options={options} changeOnSelect placeholder="请选择所属部门" {...userDeptProps} disabled="true" />
        </FormItem>
        <FormItem
          label="设置角色"
          {...formItemLayout}
          required
        >
          <TreeSelect
            {...roleTreeProps}
            value={this.state.roleValue}
            treeData={roleTree}
            onChange={this.onChangeRole}
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
  userId: React.PropTypes.string,
  userName: React.PropTypes.string,
  userNumber: React.PropTypes.string,
  userPhone: React.PropTypes.string,
  userLogin: React.PropTypes.string,
  userDept: React.PropTypes.string,
  userState: React.PropTypes.string,
  userOther: React.PropTypes.string,
  options: React.PropTypes.object,
  roleTree: React.PropTypes.object,
  roleValue: React.PropTypes.string,
  getRole: React.PropTypes.func,
};
