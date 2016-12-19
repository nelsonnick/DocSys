import React from 'react';
import { Table, message } from 'antd';
import EditLink from './EditLink.js';
import * as AjaxFunction from '../Util/AjaxFunction.js';

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
      width: 120,
    }, {
      title: '流动类型',
      dataIndex: 'lflow',
      key: 'lflow',
      width: 80,
    }, {
      title: '转递方式',
      dataIndex: 'ltype',
      key: 'ltype',
      width: 80,
    }, {
      title: '办理时间',
      dataIndex: 'ltime',
      key: 'ltime',
      width: 120,
    }, {
      title: '经办人员',
      dataIndex: 'uname',
      key: 'uname',
      width: 80,
    }, {
      title: '操作',
      key: 'operation',
      width: 150,
      render: (text, record) => {
        const operate = [];
        if (window.CurrentDepartment === record.dname.toString()) {
          operate.push(
            <EditLink
              userId={record.uid}
              flowId={record.lid}
              fileNumber={record.fnumber}
              personName={record.pname}
              personNumber={record.pnumber}
              departmentName={record.dname}
              flowFlow={record.lflow}
              flowReason={record.lreason}
              flowDirect={record.ldirect}
              flowType={record.ltype}
              flowRemark={record.lremark}
              afterEdit={this.afterEdit}
            />
          );
          if (record.lflow.toString() === '转入') {
            operate.push(<span className="ant-divider" />);
            operate.push(<a className="btn btn-xs btn-success" href={`${AjaxFunction.PrintIn}?lid=${record.lid}`} >转入打印</a>);
            operate.push();
          } else if (record.lflow.toString() === '转出') {
            operate.push(<span className="ant-divider" />);
            operate.push(<a className="btn btn-xs btn-danger" href={`${AjaxFunction.PrintOut}?lid=${record.lid}`} >转出打印</a>);
          } else if (record.lflow.toString() === '出借') {
            operate.push(<span className="ant-divider" />);
            operate.push(<a className="btn btn-xs btn-warning" href={`${AjaxFunction.PrintBorrow}?lid=${record.lid}`} >出借打印</a>);
          } else if (record.lflow.toString() === '归还') {
            operate.push(<span className="ant-divider" />);
            operate.push(<a className="btn btn-xs btn-info" href={`${AjaxFunction.PrintReturn}?lid=${record.lid}`} >归还打印</a>);
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
