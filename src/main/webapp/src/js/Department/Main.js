import React from 'react';
import { Row, Col, notification } from 'antd';
import DataTable from './DataTable.js';
import DataSearch from './DataSearch.js';
import DataPagination from './DataPagination.js';
import AddButton from './AddButton.js';
import * as AjaxFunction from '../Util/AjaxFunction.js';
import $ from 'jquery';
import QueueAnim from 'rc-queue-anim';

const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};

export default class DepCont extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DataTable: [],     // 当前页的具体数据
      PageSize: '9',    // 当前每页的条数
      PageNumber: '1',   // 当前页的页码
      DataCount: '0',    // 当前数据的总数量
      QueryString: '',   // 当前的搜索字符
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
      'url': AjaxFunction.DepartmentQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': '1',
        'PageSize': '9',
        'QueryString': '',
      },
      'success': (data) => {
        this.setState(
          {
            DataTable: data,
            PageNumber: '1',
            PageSize: '9',
            QueryString: '',
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
        // this.setState(
        //   {
        //     DataTable: tableDat, // 这里暂时用演示数据
        //   }
        // );
      },
    });
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentCount,
      'dataType': 'text',
      'data': {
        'PageNumber': this.state.PageNumber,
        'PageSize': this.state.PageSize,
        'QueryString': this.state.QueryString,
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
            Loading: false,
            DataCount: '0',
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
      'url': AjaxFunction.DepartmentQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': PageNumbers,
        'PageSize': this.state.PageSize,
        'QueryString': this.state.QueryString,
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
      'url': AjaxFunction.DepartmentQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': PageNumbers,
        'PageSize': PageSizes,
        'QueryString': this.state.QueryString,
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
  getQuery(QueryStrings = '') {
    this.setState(
      {
        Loading: true,
      }
    );
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': '1',
        'PageSize': this.state.PageSize,
        'QueryString': QueryStrings,
      },
      'success': (data) => {
        this.setState(
          {
            PageNumber: '1',
            DataTable: data,
            QueryString: QueryStrings,
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
      'url': AjaxFunction.DepartmentCount,
      'dataType': 'text',
      'data': {
        'QueryString': QueryStrings,
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
      'url': AjaxFunction.DepartmentDownload,
      'dataType': 'json',
      'data': {
        'QueryString': this.state.QueryString,
      },
      'success': (data) => {
        if (data.toString() === 'OK') {
          document.getElementById('a').click();
        } else {
          openNotificationWithIcon('error', '导出失败', `无法进行导出操作： ${data.toString()}`);
        }
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
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
      'url': AjaxFunction.DepartmentQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': '1',
        'PageSize': this.state.PageSize,
        'QueryString': '',
      },
      'success': (data) => {
        this.setState(
          {
            DataTable: data,
            PageNumber: '1',
            PageSize: this.state.PageSize,
            QueryString: '',
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
        // this.setState(
        //   {
        //     DataTable: tableDat, // 这里暂时用演示数据
        //   }
        // );
      },
    });
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.DepartmentCount,
      'dataType': 'text',
      'data': {
        'PageNumber': '1',
        'PageSize': '9',
        'QueryString': '',
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
      'url': AjaxFunction.DepartmentQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': '1',
        'PageSize': this.state.PageSize,
        'QueryString': '',
      },
      'success': (data) => {
        this.setState(
          {
            PageNumber: '1',
            DataTable: data,
            QueryString: '',
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
      'url': AjaxFunction.DepartmentCount,
      'dataType': 'text',
      'data': {
        'PageNumber': '1',
        'PageSize': this.state.PageSize,
        'QueryString': '',
      },
      'success': (data) => {
        this.setState(
          {
            Loading: false,
            DataCount: data,
            PageNumber: '1',
            QueryString: '',
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
      'url': AjaxFunction.DepartmentQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': this.state.PageNumber,
        'PageSize': this.state.PageSize,
        'QueryString': this.state.QueryString,
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
            <Col span={6}><AddButton afterAdd={this.AfterAddAndDelete} QueryString={this.state.QueryString} /></Col>
            <Col span={18}><DataSearch setQuery={this.getQuery} resetPage={this.resetPage} getDownload={this.getDownload} /></Col>
            <a id="a" href="${contextPath}/department/export" style="visibility: hidden;" />
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
