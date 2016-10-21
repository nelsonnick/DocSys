import React from 'react';
import { Form, Input, Select, Cascader } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
class LookFrom extends React.Component {

  render() {
    const { userName, userNumber, userPhone, userLogin, userState, userOther, userDept, options } = this.props;

    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form horizontal>
        <FormItem
          label="真实姓名"
          {...formItemLayout}
          required
        >
          <Input placeholder="请输入用户真实姓名" disabled="true" value={userName} />
        </FormItem>
        <FormItem
          label="证件号码"
          {...formItemLayout}
          required
        >
          <Input placeholder="请输入用户证件号码" disabled="true" value={userNumber} />
        </FormItem>
        <FormItem
          label="联系电话"
          {...formItemLayout}
          required
        >
          <Input placeholder="请输入用户手机号码" disabled="true" value={userPhone} />
        </FormItem>
        <FormItem
          label="登录名称"
          {...formItemLayout}
          required
        >
          <Input placeholder="请输入用户登录名称" disabled="true" value={userLogin} />
        </FormItem>
        <FormItem
          label="所属部门"
          {...formItemLayout}
          required
        >
          <Cascader allowClear={false} options={options} changeOnSelect placeholder="请选择所属部门" value={userDept} disabled="true" />
        </FormItem>
        <FormItem
          label="用户状态"
          {...formItemLayout}
          required
        >
          <Select size="large" disabled="true" value={userState} >
            <Option value="激活">激活</Option>
            <Option value="注销">注销</Option>
          </Select>
        </FormItem>
        <FormItem
          label="其他信息"
          {...formItemLayout}
        >
          <Input type="textarea" rows="3" placeholder="其他需要填写的信息" disabled="true" value={userOther} />
        </FormItem>
      </Form>
    );
  }
}
LookFrom = Form.create({})(LookFrom);
export default LookFrom;
LookFrom.propTypes = {
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
};
