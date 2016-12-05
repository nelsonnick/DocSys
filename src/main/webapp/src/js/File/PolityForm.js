import React from 'react';
import { Form, Input, Select, Row, Col } from 'antd';
const FormItem = Form.Item;
class PolityFrom extends React.Component {

  render() {
    const { getFieldDecorator, getFieldError, isFieldValidating } = this.props.form;
    const { fileId, personName, personNumber, personSex } = this.props;
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
              {getFieldDecorator('personBirth', { initialValue: this.props.personBirth.toString().trim().substring(0, 4) + this.props.personBirth.toString().trim().substring(5, 7) + this.props.personBirth.toString().trim().substring(8, 10),
                rules: [
                  { required: true, whitespace: true, message: '必填项' },
                ],
              })(
                <Input placeholder="请输入市民出生日期" maxlength="8" disabled />
              )}
            </FormItem>
            <FormItem
              label="人员性别"
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
              label="所属民族"
              {...formItemLayout}
              required
            >
              {getFieldDecorator('personNation', { initialValue: '汉族' })(
                <Select>
                  <Option value="汉族">汉族</Option>
                  <Option value="壮族">壮族</Option>
                  <Option value="回族">回族</Option>
                  <Option value="满族">满族</Option>
                  <Option value="维吾尔族">维吾尔族</Option>
                  <Option value="苗族">苗族</Option>
                  <Option value="彝族">彝族</Option>
                  <Option value="土家族">土家族</Option>
                  <Option value="藏族">藏族</Option>
                  <Option value="蒙古族">蒙古族</Option>
                  <Option value="侗族">侗族</Option>
                  <Option value="布依族">布依族</Option>
                  <Option value="瑶族">瑶族</Option>
                  <Option value="白族">白族</Option>
                  <Option value="朝鲜族">朝鲜族</Option>
                  <Option value="哈尼族">哈尼族</Option>
                  <Option value="黎族">黎族</Option>
                  <Option value="哈萨克族">哈萨克族</Option>
                  <Option value="傣族">傣族</Option>
                  <Option value="畲族">畲族</Option>
                  <Option value="傈僳族">傈僳族</Option>
                  <Option value="东乡族">东乡族</Option>
                  <Option value="仡佬族">仡佬族</Option>
                  <Option value="拉祜族">拉祜族</Option>
                  <Option value="佤族">佤族</Option>
                  <Option value="水族">水族</Option>
                  <Option value="纳西族">纳西族</Option>
                  <Option value="羌族">羌族</Option>
                  <Option value="土族">土族</Option>
                  <Option value="仫佬族">仫佬族</Option>
                  <Option value="锡伯族">锡伯族</Option>
                  <Option value="柯尔克孜族">柯尔克孜族</Option>
                  <Option value="景颇族">景颇族</Option>
                  <Option value="达斡尔族">达斡尔族</Option>
                  <Option value="撒拉族">撒拉族</Option>
                  <Option value="布朗族">布朗族</Option>
                  <Option value="毛南族">毛南族</Option>
                  <Option value="塔吉克族">塔吉克族</Option>
                  <Option value="普米族">普米族</Option>
                  <Option value="阿昌族">阿昌族</Option>
                  <Option value="怒族">怒族</Option>
                  <Option value="鄂温克族">鄂温克族</Option>
                  <Option value="京族">京族</Option>
                  <Option value="基诺族">基诺族</Option>
                  <Option value="德昂族">德昂族</Option>
                  <Option value="保安族">保安族</Option>
                  <Option value="俄罗斯族">俄罗斯族</Option>
                  <Option value="裕固族">裕固族</Option>
                  <Option value="乌孜别克族">乌孜别克族</Option>
                  <Option value="门巴族">门巴族</Option>
                  <Option value="鄂伦春族">鄂伦春族</Option>
                  <Option value="独龙族">独龙族</Option>
                  <Option value="赫哲族">赫哲族</Option>
                  <Option value="高山族">高山族</Option>
                  <Option value="珞巴族">珞巴族</Option>
                  <Option value="塔塔尔族">塔塔尔族</Option>
                  <Option value="未识别民族">未识别民族</Option>
                  <Option value="入籍外国人">入籍外国人</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              label="文化程度"
              {...formItemLayout}
              required
            >
              {getFieldDecorator('personLearn', { initialValue: '高中' })(
                <Select>
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
                <Select>
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
          </Col>
          <Col span={12}>
            <FormItem
              label="离职时间"
              {...formItemLayout}
              hasFeedback
              required
            >
              {getFieldDecorator('personLeave', { initialValue: '',
                rules: [
                  { required: true, whitespace: true, message: '必填项' },
                ],
              })(
                <Input placeholder="请输入解除劳动合同时间" />
              )}
            </FormItem>
            <FormItem
              label="政历问题"
              {...formItemLayout}
              hasFeedback
            >
              {getFieldDecorator('personZL', { initialValue: '无政历问题' })(
                <Input />
              )}
            </FormItem>
            <FormItem
              label="文革表现"
              {...formItemLayout}
              hasFeedback
            >
              {getFieldDecorator('personWG', { initialValue: '文革期间表现良好' })(
                <Input />
              )}
            </FormItem>
            <FormItem
              label="“六四”表现"
              {...formItemLayout}
              hasFeedback
            >
              {getFieldDecorator('personLS', { initialValue: '89年政治风波表现良好' })(
                <Input />
              )}
            </FormItem>
            <FormItem
              label="法轮功态度"
              {...formItemLayout}
              hasFeedback
            >
              {getFieldDecorator('personFL', { initialValue: '未修炼并坚决发对“法轮功”邪教' })(
                <Input />
              )}
            </FormItem>
            <FormItem
              label="附加说明"
              {...formItemLayout}
              hasFeedback
            >
              {getFieldDecorator('personRemark', { initialValue: '' })(
                <Input type="textarea" rows="3" placeholder="其他需要填写的信息" />
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
  personName: React.PropTypes.string,
  personNumber: React.PropTypes.string,
  personSex: React.PropTypes.string,
  personBirth: React.PropTypes.string,
};
