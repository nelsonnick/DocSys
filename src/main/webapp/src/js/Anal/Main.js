import React from 'react';
import { Row, Col, notification } from 'antd';
import DataTable from './DataTable.js';
import DataSearch from './DataSearch.js';
import * as AjaxFunction from '../Util/AjaxFunction.js';
import $ from 'jquery';
import QueueAnim from 'rc-queue-anim';

const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};
const columns = [{
  title: '经办人',
  dataIndex: 'name',
  key: 'name',
  width: 70,
}, {
  title: '档案转入',
  dataIndex: 'flow_count1',
  key: 'flow_count1',
  width: 70,
}, {
  title: '档案转出',
  dataIndex: 'flow_count2',
  key: 'flow_count2',
  width: 70,
}, {
  title: '档案重存',
  dataIndex: 'flow_count3',
  key: 'flow_count3',
  width: 70,
}, {
  title: '档案出借',
  dataIndex: 'flow_count4',
  key: 'flow_count4',
  width: 70,
}, {
  title: '档案归还',
  dataIndex: 'flow_count5',
  key: 'flow_count5',
  width: 70,
}, {
  title: '修改档案',
  dataIndex: 'trans_count',
  key: 'trans_count',
  width: 70,
}, {
  title: '修改流动',
  dataIndex: 'change_count',
  key: 'change_count',
  width: 70,
}, {
  title: '数据导出',
  dataIndex: 'export_count',
  key: 'export_count',
  width: 70,
}, {
  title: '信息搜索',
  dataIndex: 'look_count',
  key: 'look_count',
  width: 70,
}, {
  title: '流转打印',
  dataIndex: 'print_count',
  key: 'print_count',
  width: 70,
}, {
  title: '开提档函',
  dataIndex: 'extract_count',
  key: 'extract_count',
  width: 70,
}, {
  title: '政审打印',
  dataIndex: 'polity_count',
  key: 'polity_count',
  width: 70,
}, {
  title: '存档证明打印',
  dataIndex: 'prove_count',
  key: 'prove_count',
  width: 70,
}];
const columnz = [{
  title: '档案转入',
  dataIndex: 'flow_count1',
  key: 'flow_count1',
  width: 70,
}, {
  title: '档案转出',
  dataIndex: 'flow_count2',
  key: 'flow_count2',
  width: 70,
}, {
  title: '档案重存',
  dataIndex: 'flow_count3',
  key: 'flow_count3',
  width: 70,
},  {
  title: '档案出借',
  dataIndex: 'flow_count4',
  key: 'flow_count4',
  width: 70,
}, {
  title: '档案归还',
  dataIndex: 'flow_count5',
  key: 'flow_count5',
  width: 70,
}, {
  title: '修改档案',
  dataIndex: 'trans_count',
  key: 'trans_count',
  width: 70,
}, {
  title: '修改流动',
  dataIndex: 'change_count',
  key: 'change_count',
  width: 70,
}, {
  title: '数据导出',
  dataIndex: 'export_count',
  key: 'export_count',
  width: 70,
}, {
  title: '信息搜索',
  dataIndex: 'look_count',
  key: 'look_count',
  width: 70,
}, {
  title: '流转打印',
  dataIndex: 'print_count',
  key: 'print_count',
  width: 70,
}, {
  title: '开提档函',
  dataIndex: 'extract_count',
  key: 'extract_count',
  width: 70,
}, {
  title: '政审打印',
  dataIndex: 'polity_count',
  key: 'polity_count',
  width: 70,
}, {
  title: '存档证明打印',
  dataIndex: 'prove_count',
  key: 'prove_count',
  width: 70,
}];

export default class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DataTable: [],     // 当前页的具体数据
      Column: [],     // 当前页的具体数据
      Loading: true,     // 数据加载情况
      DeptList: [],      // 部门列表
      DeptCount: '',     // 部门总数量
    };
    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.CountAlls,
      'dataType': 'json',
      'success': (dataTable) => {
        $.ajax({
          'type': 'POST',
          'url': AjaxFunction.DepartmentList,
          'dataType': 'text',
          'success': (DeptList) => {
            $.ajax({
              'type': 'POST',
              'url': AjaxFunction.DepartmentCount,
              'dataType': 'text',
              'data': {
                'DeptName': '',
              },
              'success': (DeptCount) => {
                this.setState(
                  {
                    Loading: false,
                    DataTable: dataTable,
                    Column: columnz,
                    DeptCount,
                    DeptList: eval(`(${DeptList})`),
                  }
                );
              },
              'error': () => {
                openNotificationWithIcon('error', '请求错误', '无法读取部门信息，请检查网络情况');
              },
            });
          },
          'error': () => {
            openNotificationWithIcon('error', '请求错误', '无法读取部门总数，请检查网络情况');
          },
        });
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
      },
    });
  }
  onChange(userDept) {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.CountAll,
      'dataType': 'json',
      'data': {
        'did': userDept,
      },
      'success': (dataTable) => {
        this.setState(
          {
            Loading: false,
            DataTable: dataTable,
            Column: columns,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法读取数量，请检查网络情况');
      },
    });
  }
  render() {
    return (
      <QueueAnim>
        <div key="a">
          <Row type="flex" justify="start">
            <Col span={24}>请选择部门：<DataSearch onChange={this.onChange} deptList={this.state.DeptList} deptCount={this.state.DeptCount} /></Col>
          </Row>
          <Row>
            <span style={{ 'font-size': '5px' }}>&nbsp;&nbsp;&nbsp;</span>
          </Row>
          <Row>
            <DataTable tableData={this.state.DataTable} loading={this.state.Loading} columns={this.state.Column} />
          </Row>
        </div>
      </QueueAnim>
    );
  }
}
