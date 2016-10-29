import React from 'react';
import { Row, Col, notification } from 'antd';
import DataTable from './DataTable.js';
import DataSearch from './DataSearch.js';
import DataPagination from './DataPagination.js';
import * as AjaxFunction from '../Util/AjaxFunction.js';
import $ from 'jquery';
import QueueAnim from 'rc-queue-anim';

const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};

export default class File extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DataTable: [],     // 当前页的具体数据
      PageSize: '9',     // 当前每页的条数
      PageNumber: '1',   // 当前页的页码
      DataCount: '0',    // 当前数据的总数量
      DeptCount: '',     // 部门总数量
      FileNumber: '',    // 当前搜索的档案编号
      FileDept: '',      // 当前搜索的档案部门
      FlowFlow: '',      // 当前搜索的档案流向
      PersonName: '',    // 当前搜索的市民姓名
      PersonNumber: '',  // 当前搜索的证件号码
      DeptList: [],      // 部门列表
      Loading: true,     // 数据加载情况
    };
    this.getQuery = this.getQuery.bind(this);
    this.getDownload = this.getDownload.bind(this);
    this.resetPage = this.resetPage.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.AfterAddAndDelete = this.AfterAddAndDelete.bind(this);
    this.AfterEditAndState = this.AfterEditAndState.bind(this);
  }

  componentWillMount() {
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
            $.ajax({
              'type': 'POST',
              'url': AjaxFunction.FlowQuery,
              'dataType': 'json',
              'data': {
                'PageNumber': '1',
                'PageSize': '9',
                'PersonName': '',
                'FileDept': '',
                'PersonNumber': '',
                'FileNumber': '',
                'FlowFlow': '',
              },
              'success': (dataTable) => {
                $.ajax({
                  'type': 'POST',
                  'url': AjaxFunction.FlowCount,
                  'dataType': 'text',
                  'data': {
                    'PageNumber': '1',
                    'PageSize': '9',
                    'PersonName': '',
                    'FileDept': '',
                    'PersonNumber': '',
                    'FileNumber': '',
                    'FlowFlow': '',
                  },
                  'success': (DataCount) => {
                    this.setState(
                      {
                        Loading: false,
                        DataCount,
                        DeptCount,
                        DataTable: dataTable,
                        PageNumber: '1',
                        PageSize: '9',
                        PersonName: '',
                        FileDept: '',
                        PersonNumber: '',
                        FileNumber: '',
                        FlowFlow: '',
                        DeptList: eval(`(${DeptList})`),
                      }
                    );
                  },
                  'error': () => {
                    openNotificationWithIcon('error', '请求错误', '无法读取数据总数，请检查网络情况');
                    this.setState(
                      {
                        Loading: false,
                      }
                    );
                  },
                });
              },
              'error': () => {
                openNotificationWithIcon('error', '请求错误', '无法读取当前数据，请检查网络情况');
                this.setState(
                  {
                    Loading: false,
                  }
                );
              },
            });
          },
          'error': () => {
            openNotificationWithIcon('error', '请求错误', '无法读取部门信息，请检查网络情况');
            this.setState(
              {
                Loading: false,
              }
            );
          },
        });
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法读取部门总数，请检查网络情况');
        this.setState(
          {
            Loading: false,
          }
        );
      },
    });
  }
  onChange(PageNumbers) {
    this.setState(
      {
        Loading: true,
      }
    );
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.FlowQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': PageNumbers,
        'PageSize': this.state.PageSize,
        'PersonName': this.state.PersonName,
        'FileDept': this.state.FileDept,
        'PersonNumber': this.state.PersonNumber,
        'FileNumber': this.state.FileNumber,
        'FlowFlow': this.state.FlowFlow,
      },
      'success': (data) => {
        this.setState(
          {
            Loading: false,
            DataTable: data,
            PageNumber: PageNumbers,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
        this.setState(
          {
            DataTable: [],
          }
        );
      },
    });
  }
  onShowSizeChange(PageNumbers, PageSizes) {
    this.setState(
      {
        Loading: true,
      }
    );
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.FlowQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': PageNumbers,
        'PageSize': PageSizes,
        'PersonName': this.state.PersonName,
        'FileDept': this.state.FileDept,
        'PersonNumber': this.state.PersonNumber,
        'FileNumber': this.state.FileNumber,
        'FlowFlow': this.state.FlowFlow,
      },
      'success': (data) => {
        this.setState(
          {
            Loading: false,
            DataTable: data,
            PageNumber: PageNumbers,
            PageSize: PageSizes,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
        this.setState(
          {
            DataTable: [],
          }
        );
      },
    });
  }
  getQuery(PersonName = '', PersonNumber = '', FileNumber = '', FileDept = '', FlowFlow = '') {
    this.setState(
      {
        Loading: true,
      }
    );
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.FlowQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': '1',
        'PageSize': this.state.PageSize,
        PersonName,
        FileDept,
        FileNumber,
        PersonNumber,
        FlowFlow,
      },
      'success': (data) => {
        this.setState(
          {
            PageNumber: '1',
            DataTable: data,
            PersonName,
            FileDept,
            FileNumber,
            PersonNumber,
            FlowFlow,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
        this.setState(
          {
            DataTable: [],
          }
        );
      },
    });
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.FlowCount,
      'dataType': 'text',
      'data': {
        PersonName,
        FileDept,
        FileNumber,
        PersonNumber,
        FlowFlow,
      },
      'success': (data) => {
        this.setState(
          {
            Loading: false,
            DataCount: data,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成数据读取，请检查网络情况');
        this.setState(
          {
            DataCount: '0',
          }
        );
      },
    });
  }
  getDownload() {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.FlowDownload,
      'dataType': 'text',
      'data': {
        'PersonName': this.state.PersonName,
        'PersonNumber': this.state.PersonNumber,
        'FileNumber': this.state.FileNumber,
        'FileDept': this.state.FileDept,
        'FlowFlow': this.state.FlowFlow,
      },
      'success': (data) => {
        if (data.toString() === 'OK') {
          $('#a').attr('href', '/flow/export');
          document.getElementById('a').click();
        } else {
          openNotificationWithIcon('error', '导出失败', `无法进行导出操作： ${data.toString()}`);
        }
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法读取数据，请检查网络情况');
      },
    });
  }
  resetPage() {
    this.setState(
      {
        Loading: true,
      }
    );
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.FlowQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': '1',
        'PageSize': this.state.PageSize,
        'FileNumber': '',
        'FileDept': '',
        'PersonName': '',
        'PersonNumber': '',
        'FlowFlow': '',
      },
      'success': (data) => {
        this.setState(
          {
            DataTable: data,
            PageNumber: '1',
            PageSize: this.state.PageSize,
            FileNumber: '',
            FileDept: '',
            PersonName: '',
            PersonNumber: '',
            FlowFlow: '',
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
      },
    });
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.FlowCount,
      'dataType': 'text',
      'data': {
        'PageNumber': '1',
        'PageSize': '9',
        'FileNumber': '',
        'FileDept': '',
        'PersonName': '',
        'PersonNumber': '',
        'FlowFlow': '',
      },
      'success': (data) => {
        this.setState(
          {
            Loading: false,
            DataCount: data,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成数据读取，请检查网络情况');
        this.setState(
          {
            DataCount: '0',
          }
        );
      },
    });
  }
  AfterAddAndDelete() {
    this.setState(
      {
        Loading: true,
      }
    );
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.FlowQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': '1',
        'PageSize': this.state.PageSize,
        'FileNumber': '',
        'FileDept': '',
        'PersonName': '',
        'PersonNumber': '',
        'FlowFlow': '',
      },
      'success': (data) => {
        this.setState(
          {
            PageNumber: '1',
            DataTable: data,
            FileNumber: '',
            FileDept: '',
            PersonName: '',
            PersonNumber: '',
            FlowFlow: '',
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
        this.setState(
          {
            DataTable: [],
          }
        );
      },
    });
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.FlowCount,
      'dataType': 'text',
      'data': {
        'PageNumber': '1',
        'PageSize': this.state.PageSize,
        'FileNumber': '',
        'FileDept': '',
        'PersonName': '',
        'PersonNumber': '',
        'FlowFlow': '',
      },
      'success': (data) => {
        this.setState(
          {
            Loading: false,
            DataCount: data,
            PageNumber: '1',
            FileNumber: '',
            FileDept: '',
            PersonName: '',
            PersonNumber: '',
            FlowFlow: '',
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成数据读取，请检查网络情况');
        this.setState(
          {
            DataCount: '0',
          }
        );
      },
    });
  }
  AfterEditAndState() {
    this.setState(
      {
        Loading: true,
      }
    );
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.FlowQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': this.state.PageNumber,
        'PageSize': this.state.PageSize,
        'FileNumber': this.state.FileNumber,
        'FileDept': this.state.FileDept,
        'PersonName': this.state.PersonName,
        'PersonNumber': this.state.PersonNumber,
        'FlowFlow': this.state.FlowFlow,
      },
      'success': (data) => {
        this.setState(
          {
            Loading: false,
            DataTable: data,
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
        this.setState(
          {
            DataTable: [],
          }
        );
      },
    });
  }
  render() {
    return (
      <QueueAnim>
        <div key="a">
          <Row type="flex" justify="start">
            <Col span={4}>&nbsp;</Col>
            <Col span={20}><DataSearch setQuery={this.getQuery} resetPage={this.resetPage} deptList={this.state.DeptList} personName={this.state.PersonName} personNumber={this.state.PersonNumber} fileNumber={this.state.FileNumber} fileDept={this.state.FileDept} deptCount={this.state.DeptCount} getDownload={this.getDownload} /></Col>
            <a id="a" className="aa" />
          </Row>
          <Row>
            <span style={{ 'font-size': '5px' }}>&nbsp;&nbsp;&nbsp;</span>
          </Row>
          <Row>
            <DataTable tableData={this.state.DataTable} loading={this.state.Loading} afterState={this.AfterEditAndState} afterDelete={this.AfterAddAndDelete} deptList={this.state.DeptList} deptCount={this.state.DeptCount} />
          </Row>
          <Row>
            <span style={{ 'font-size': '20px' }}>&nbsp;&nbsp;&nbsp;</span>
          </Row>
          <Row>
            <DataPagination PageNumber={this.state.PageNumber} onShowSizeChange={this.onShowSizeChange} onChange={this.onChange} DataCount={this.state.DataCount} />
          </Row>
        </div>
      </QueueAnim>
    );
  }
}
