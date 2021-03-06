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

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DataTable: [],     // 当前页的具体数据
      PageSize: '9',     // 当前每页的条数
      PageNumber: '1',   // 当前页的页码
      DataCount: '0',    // 当前数据的总数量
      PersonName: '',    // 搜索的人员姓名
      PersonNumber: '',  // 搜索的人员号码
      PersonState: '',   // 搜索的人员状态
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
      'url': AjaxFunction.PersonQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': '1',
        'PageSize': '9',
        'PersonName': '',
        'PersonNumber': '',
        'PersonState': '',
      },
      'success': (dataTable) => {
        $.ajax({
          'type': 'POST',
          'url': AjaxFunction.PersonCount,
          'dataType': 'text',
          'data': {
            'PageNumber': '1',
            'PageSize': '9',
            'PersonName': '',
            'PersonNumber': '',
            'PersonState': '',
          },
          'success': (DataCount) => {
            this.setState(
              {
                Loading: false,
                DataCount,
                DataTable: dataTable,
                PageNumber: '1',
                PageSize: '9',
                PersonName: '',
                PersonNumber: '',
                PersonState: '',
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
  }
  onChange(PageNumbers) {
    this.setState(
      {
        Loading: true,
      }
    );
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.PersonQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': PageNumbers,
        'PageSize': this.state.PageSize,
        'PersonName': this.state.PersonName,
        'PersonNumber': this.state.PersonNumber,
        'PersonState': this.state.PersonState,
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
      'url': AjaxFunction.UserQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': PageNumbers,
        'PageSize': PageSizes,
        'PersonName': this.state.PersonName,
        'PersonNumber': this.state.PersonNumber,
        'PersonState': this.state.PersonState,
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
  getQuery(PersonName = '', PersonNumber = '', PersonState = '') {
    this.setState(
      {
        Loading: true,
      }
    );
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.PersonQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': '1',
        'PageSize': this.state.PageSize,
        PersonName,
        PersonNumber,
        PersonState,
      },
      'success': (data) => {
        this.setState(
          {
            PageNumber: '1',
            DataTable: data,
            PersonName,
            PersonNumber,
            PersonState,
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
      'url': AjaxFunction.PersonCount,
      'dataType': 'text',
      'data': {
        PersonName,
        PersonNumber,
        PersonState,
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
      'url': AjaxFunction.PersonDownload,
      'dataType': 'text',
      'data': {
        'PersonName': this.state.PersonName,
        'PersonNumber': this.state.PersonNumber,
        'PersonState': this.state.PersonState,
      },
      'success': (data) => {
        if (data.toString() === 'OK') {
          $('#a').attr('href', AjaxFunction.PersonExport);
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
      'url': AjaxFunction.PersonQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': '1',
        'PageSize': this.state.PageSize,
        'PersonName': '',
        'PersonNumber': '',
        'PersonState': '',
      },
      'success': (data) => {
        this.setState(
          {
            DataTable: data,
            PageNumber: '1',
            PageSize: this.state.PageSize,
            PersonName: '',
            PersonNumber: '',
            PersonState: '',
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
      },
    });
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.PersonCount,
      'dataType': 'text',
      'data': {
        'PageNumber': '1',
        'PageSize': '9',
        'PersonName': '',
        'PersonNumber': '',
        'PersonState': '',
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
      'url': AjaxFunction.PersonQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': '1',
        'PageSize': this.state.PageSize,
        'PersonName': '',
        'PersonNumber': '',
        'PersonState': '',
      },
      'success': (data) => {
        this.setState(
          {
            PageNumber: '1',
            DataTable: data,
            PersonName: '',
            PersonNumber: '',
            PersonState: '',
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
      'url': AjaxFunction.PersonCount,
      'dataType': 'text',
      'data': {
        'PageNumber': '1',
        'PageSize': this.state.PageSize,
        'PersonName': '',
        'PersonNumber': '',
        'PersonState': '',
      },
      'success': (data) => {
        this.setState(
          {
            Loading: false,
            DataCount: data,
            PageNumber: '1',
            PersonName: '',
            PersonNumber: '',
            PersonState: '',
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
      'url': AjaxFunction.PersonQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': this.state.PageNumber,
        'PageSize': this.state.PageSize,
        'PersonName': this.state.PersonName,
        'PersonNumber': this.state.PersonNumber,
        'PersonState': this.state.PersonState,
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
            <Col span={24}><DataSearch setQuery={this.getQuery} resetPage={this.resetPage} deptList={this.state.DeptList} personName={this.state.PersonName} personNumber={this.state.PersonNumber} personState={this.state.PersonState} getDownload={this.getDownload} /></Col>
            <a id="a" className="aa" />
          </Row>
          <Row>
            <span style={{ 'font-size': '5px' }}>&nbsp;&nbsp;&nbsp;</span>
          </Row>
          <Row>
            <DataTable tableData={this.state.DataTable} loading={this.state.Loading} afterState={this.AfterEditAndState} afterDelete={this.AfterAddAndDelete} />
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
