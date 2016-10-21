import React from 'react';
import { Form, Input } from 'antd';
import $ from 'jquery';
const FormItem = Form.Item;
import * as AjaxFunction from '../../../Util/AjaxFunction.js';
class AddFrom extends React.Component {
  constructor(props) {
    super(props);
    this.roleNameCheck = this.roleNameCheck.bind(this);
  }

  roleNameCheck(rule, value, callback) {
    if (!value) {
      callback();
    } else {
      $.ajax({
        'type': 'POST',
        'url': AjaxFunction.RoleName,
        'dataType': 'text',
        'data': { 'name': value },
        'success': (data) => {
          if (data.toString() === 'OK') {
            callback();
          } else {
            callback(new Error(data.toString()));
          }
        },
        'error': () => {
          callback(new Error('无法执行后台验证，请重试'));
        },
      });
    }
  }
  render() {
    const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const roleNameProps = getFieldProps('roleName', {
      rules: [
        { required: true, whitespace: true, message: '必填项' },
        { validator: this.roleNameCheck },
      ],
    });
    const roleOtherProps = getFieldProps('roleOther', {
    });
    return (
      <Form horizontal>
        <FormItem
          label="角色名称"
          {...formItemLayout}
          hasFeedback
          required
          help={isFieldValidating('roleName') ? '校验中...' : (getFieldError('roleName') || [])}
        >
          <Input placeholder="请输入角色名称" {...roleNameProps} />
        </FormItem>
        <FormItem
          label="其他信息"
          {...formItemLayout}
          hasFeedback
        >
          <Input type="textarea" rows="3" placeholder="其他需要填写的信息" {...roleOtherProps} />
        </FormItem>
      </Form>
    );
  }
}
AddFrom = Form.create({})(AddFrom);
export default AddFrom;
AddFrom.propTypes = {
  form: React.PropTypes.object,
};
