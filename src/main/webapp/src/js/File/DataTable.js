import React from 'react';
import { Table, message, Popconfirm, notification } from 'antd';
import EditLink from './EditLink.js';
import FlowLink from './FlowLink.js';
import BackLink from './BackLink.js';
import PolityLink from './PolityLink.js';
import $ from 'jquery';
import * as AjaxFunction from '../Util/AjaxFunction.js';

const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};
export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.returns = this.returns.bind(this);
    this.cancel = this.cancel.bind(this);
    this.afterEdit = this.afterEdit.bind(this);
  }
  returns(Fid) {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.FileReturns,
      'dataType': 'text',
      'data': {
        'fid': Fid,
      },
      'success': (data) => {
        if (data.toString() === 'OK') {
          this.props.afterState();
          openNotificationWithIcon('success', '重存成功', '重存成功，请进行后续操作');
        } else {
          openNotificationWithIcon('error', '重存失败', data.toString());
        }
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成修改操作，请检查网络情况');
      },
    });
  }
  afterEdit() {
    this.props.afterState();
  }
  cancel() {
    message.error('点击了取消');
  }
  render() {
    const { tableData, loading } = this.props;
    const columns = [{
      title: '档案编号',
      dataIndex: 'fnumber',
      key: 'fnumber',
      width: 100,
    }, {
      title: '人员姓名',
      dataIndex: 'pname',
      key: 'pname',
      width: 70,
    }, {
      title: '证件号码',
      dataIndex: 'pnumber',
      key: 'pnumber',
      width: 120,
    }, {
      title: '档案位置',
      dataIndex: 'dname',
      key: 'dname',
      width: 100,
    }, {
      title: '档案状态',
      dataIndex: 'fstate',
      key: 'fstate',
      width: 100,
    }, {
      title: '操作',
      key: 'operation',
      width: 150,
      render: (text, record) => {
        const operate = [];
        if (window.CurrentDepartment === record.dname.toString()) {
          if (record.pstate.toString() === '在档' && record.fstate.toString() === '在档') {
            operate.push(
              <EditLink
                fileId={record.fid}
                fileNumber={record.fnumber}
                fileState={record.fstate}
                fileRemark={record.fremark}
                personId={record.pid}
                personName={record.pname}
                personNumber={record.pnumber}
                personState={record.pstate}
                personPhone1={record.pphone1}
                personPhone2={record.pphone2}
                personAddress={record.paddress}
                personInfo={record.pinfo}
                personRetire={record.pretire}
                fileAge={record.fileAge}
                personRemark={record.premark}
                departmentId={record.did}
                departmentName={record.dname}
                afterEdit={this.afterEdit}
              />
            );
            operate.push(<span className="ant-divider" />);
            operate.push(
              <FlowLink
                fileId={record.fid}
                fileNumber={record.fnumber}
                fileState={record.fstate}
                fileRemark={record.fremark}
                personId={record.pid}
                personName={record.pname}
                personNumber={record.pnumber}
                personState={record.pstate}
                personPhone1={record.pphone1}
                personPhone2={record.pphone2}
                personAddress={record.paddress}
                fileAge={record.fileAge}
                personRemark={record.premark}
                departmentId={record.did}
                departmentName={record.dname}
                afterEdit={this.afterEdit}
              />
            );
            operate.push(<span className="ant-divider" />);
            operate.push(<a className="btn btn-xs btn-default" href={`${AjaxFunction.PrintProve}?fid=${record.fid}`} >存档证明</a>);
            operate.push(<span className="ant-divider" />);
            operate.push(
              <PolityLink
                fileId={record.fid}
                personName={record.pname}
                personNumber={record.pnumber}
                personState={record.pstate}
                personSex={record.psex}
                personBirth={record.pbirth}
              />
            );
          } else if (record.pstate.toString() === '已提' && record.fstate.toString() === '已提') {
            operate.push(<Popconfirm title={`确定要重存<${record.pname}>的<${record.fnumber}>档案？`} okText="重存" onConfirm={this.returns.bind(this, record.fid)} onCancel={this.cancel}>
              <a className="btn btn-xs btn-primary" >原档重存</a>
            </Popconfirm>);
            operate.push(<span className="ant-divider" />);
            operate.push(
              <BackLink
                fileId={record.fid}
                fileNumber={record.fnumber}
                fileState={record.fstate}
                fileRemark={record.fremark}
                personId={record.pid}
                personName={record.pname}
                personNumber={record.pnumber}
                personState={record.pstate}
                personPhone1={record.pphone1}
                personPhone2={record.pphone2}
                personAddress={record.paddress}
                fileAge={record.fileAge}
                personRemark={record.premark}
                departmentId={window.CurrentDid}
                departmentName={window.CurrentDepartment}
                afterEdit={this.afterEdit}
              />
            );
            operate.push(<span className="ant-divider" />);
          } else {
            operate.push();
          }
        } else {
          if (record.pstate.toString() === '已提' && record.fstate.toString() === '已提') {
            operate.push(
              <BackLink
                fileId={record.fid}
                fileNumber={record.fnumber}
                fileState={record.fstate}
                fileRemark={record.fremark}
                personId={record.pid}
                personName={record.pname}
                personNumber={record.pnumber}
                personState={record.pstate}
                personPhone1={record.pphone1}
                personPhone2={record.pphone2}
                personAddress={record.paddress}
                fileAge={record.fileAge}
                personRemark={record.premark}
                departmentId={window.CurrentDid}
                departmentName={window.CurrentDepartment}
                afterEdit={this.afterEdit}
              />
            );
            operate.push(<span className="ant-divider" />);
          } else {
            operate.push();
          }
        }
        return (
          <span>
            {operate}
          </span>
        );
      },
    }];

    return (
      <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
        <Table
          scroll={{ y: 480 }}
          useFixedHeader="true"
          rowKey={record => record.id}
          columns={columns}
          dataSource={tableData}
          loading={loading}
          pagination={false}
        />
      </div>
    );
  }
}

DataTable.propTypes = {
  tableData: React.PropTypes.array,
  afterState: React.PropTypes.func,
  afterEdit: React.PropTypes.func,
  afterDelete: React.PropTypes.func,
  loading: React.PropTypes.bool,
};
