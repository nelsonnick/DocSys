import React from 'react';
import { Table, message } from 'antd';
import EditLink from './EditLink.js';
import FlowLink from './FlowLink.js';
import BackLink from './BackLink.js';

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);
    this.cancel = this.cancel.bind(this);
    this.afterEdit = this.afterEdit.bind(this);
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
      width: 100,
    }, {
      title: '证件号码',
      dataIndex: 'pnumber',
      key: 'pnumber',
      width: 100,
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
        if (window.CurrentDepartment===record.dname.toString()) {
          if (record.pstate.toString() === '在档'){
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
          } else if (record.pstate.toString() === '已提') {
            if (record.pstate.toString() === '1') {
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
                  departmentId={record.did}
                  departmentName={record.dname}
                  afterEdit={this.afterEdit}
                />
              );
              operate.push(<span className="ant-divider" />);
            } else if (record.pstate.toString() === '0') {
              operate.push(<span className="ant-divider" />);
            } else {
              operate.push(<span className="ant-divider" />);
            }
          } else {
            operate.push(<span className="ant-divider" />);
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
