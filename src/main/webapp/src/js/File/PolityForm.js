import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
const FormItem = Form.Item;
class PolityFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Birth: '',
    };
  }
  componentWillMount() {
    const a = this.props.personBirth.toString().trim();
    this.setState(
      {
        Birth: a.substring(0, 4) + a.substring(5, 7) + a.substring(8, 10),
      }
    );
  }
  render() {
    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
    const { fileId, personId, personName, personNumber, personSex } = this.props;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form horizontal>
        <Row>
          <Col span={12}>

            <FormItem
              label="人员姓名"
              {...formItemLayout}
              hasFeedback
              required
              help={isFieldValidating('personName') ? '校验中...' : (getFieldError('personName') || [])}
            >
              {getFieldDecorator('personName', { initialValue: personName,
                rules: [
                  { required: true, whitespace: true, message: '必填项' },
                ],
              })(
                <Input placeholder="请输入市民真实姓名" disabled />
              )}
            </FormItem>
            <FormItem
              label="证件号码"
              {...formItemLayout}
              hasFeedback
              required
              help={isFieldValidating('personNumber') ? '校验中...' : (getFieldError('personNumber') || [])}
            >
              {getFieldDecorator('personNumber', { initialValue: personNumber,
                rules: [
                  { required: true, whitespace: true, message: '必填项' },
                ],
              })(
                <Input placeholder="请输入市民证件号码" maxlength="18" disabled />
              )}
            </FormItem>
            <FormItem
              label="出生日期"
              {...formItemLayout}
              hasFeedback
              required
              help={isFieldValidating('personBirth') ? '校验中...' : (getFieldError('personBirth') || [])}
            >
              {getFieldDecorator('personBirth', { initialValue: this.state.Birth,
                rules: [
                  { required: true, whitespace: true, message: '必填项' },
                ],
              })(
                <Input placeholder="请输入市民出生日期" maxlength="8" disabled />
              )}
            </FormItem>
            <FormItem
              label="性别"
              {...formItemLayout}
              hasFeedback
              required
              help={isFieldValidating('personSex') ? '校验中...' : (getFieldError('personSex') || [])}
            >
              {getFieldDecorator('personSex', { initialValue: personSex,
                rules: [
                  { required: true, whitespace: true, message: '必填项' },
                ],
              })(
                <Input placeholder="请输入市民性别" disabled />
              )}
            </FormItem>
            <FormItem
              label="民族"
              {...formItemLayout}
              hasFeedback
              required
              help={isFieldValidating('personNation') ? '校验中...' : (getFieldError('personNation') || [])}
            >
              {getFieldDecorator('personNation', { initialValue: '汉族',
                rules: [
                    { required: true, whitespace: true, message: '必填项' },
                ],
              })(
                <Input placeholder="请输入市民的民族" />
              )}
            </FormItem>
            <FormItem
              label="文化程度"
              {...formItemLayout}
              hasFeedback
              required
            >
              {getFieldDecorator('personLearn', { initialValue: '高中' })(
                <Select size="large" >
                  <Option value="文盲">文盲</Option>
                  <Option value="半文盲">半文盲</Option>
                  <Option value="小学">小学</Option>
                  <Option value="初中">初中</Option>
                  <Option value="高中">高中</Option>
                  <Option value="技工学校">技工学校</Option>
                  <Option value="中等专业学校">中等专业学校</Option>
                  <Option value="专科学校">专科学校</Option>
                  <Option value="大学专科">大学本科</Option>
                  <Option value="研究生">研究生</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              label="政治面貌"
              {...formItemLayout}
              required
            >
              {getFieldDecorator('personFace', { initialValue: '群众' })(
                <Select size="large" >
                  <Option value="中共党员">中共党员</Option>
                  <Option value="中共预备党员">中共预备党员</Option>
                  <Option value="共青团员">共青团员</Option>
                  <Option value="民革党员">民革党员</Option>
                  <Option value="民盟盟员">民盟盟员</Option>
                  <Option value="民建会员">民建会员</Option>
                  <Option value="民进会员">民进会员</Option>
                  <Option value="农工党党员">农工党党员</Option>
                  <Option value="致公党党员">致公党党员</Option>
                  <Option value="九三学社社员">九三学社社员</Option>
                  <Option value="台盟盟员">台盟盟员</Option>
                  <Option value="无党派人士">无党派人士</Option>
                  <Option value="群众">群众</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={12}>
            <FormItem
              label="参加工作时间"
              {...formItemLayout}
              hasFeedback
              required
            >
              {getFieldDecorator('personTime', { initialValue: '',
                rules: [
                  { required: true, whitespace: true, message: '必填项' },
                ],
              })(
                <Input placeholder="请输入参加工作时间" />
              )}
            </FormItem>
            <FormItem
              label="原工作单位"
              {...formItemLayout}
              hasFeedback
              required
            >
              {getFieldDecorator('personWork', { initialValue: '',
                rules: [
                  { required: true, whitespace: true, message: '必填项' },
                ],
              })(
                <Input placeholder="请输入原工作单位" />
              )}
            </FormItem>
            <FormItem
              label="政历"
              {...formItemLayout}
              hasFeedback
            >
              {getFieldDecorator('personZL', { initialValue: '无政历问题' })(
                <Input />
              )}
            </FormItem>
            <FormItem
              label="文革、89"
              {...formItemLayout}
              hasFeedback
            >
              {getFieldDecorator('personWG', { initialValue: '文革及89年政治风波表现良好' })(
                <Input />
              )}
            </FormItem>
            <FormItem
              label="法轮功"
              {...formItemLayout}
              hasFeedback
            >
              {getFieldDecorator('personFL', { initialValue: '坚决发对“法轮功”邪教' })(
                <Input />
              )}
            </FormItem>
            <FormItem
              label=""
              {...formItemLayout}
            >
              {getFieldDecorator('fileId', { initialValue: fileId })(
                <Input type="hidden" />
              )}
            </FormItem>
            <FormItem
              label=""
              {...formItemLayout}
            >
              {getFieldDecorator('personId', { initialValue: personId })(
                <Input type="hidden" />
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}
PolityFrom = Form.create({})(PolityFrom);
export default PolityFrom;
PolityFrom.propTypes = {
  form: React.PropTypes.object,
  fileId: React.PropTypes.string,
  personId: React.PropTypes.string,
  personName: React.PropTypes.string,
  personNumber: React.PropTypes.string,
  personSex: React.PropTypes.string,
  personBirth: React.PropTypes.string,
};
