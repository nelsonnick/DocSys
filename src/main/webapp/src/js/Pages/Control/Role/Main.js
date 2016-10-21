import React from 'react';
import { Row, Col, notification } from 'antd';
import DataTable from './DataTable.js';
import DataSearch from './DataSearch.js';
import DataPagination from './DataPagination.js';
import AddButton from './AddButton.js';
import * as AjaxFunction from '../../../Util/AjaxFunction.js';
import $ from 'jquery';
import QueueAnim from 'rc-queue-anim';

const openNotificationWithIcon = (type, msg, desc) => {
  notification[type]({
    message: msg,
    description: desc,
  });
};

export default class RoleCont extends React.Component {
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
    this.resetPage = this.resetPage.bind(this);
    this.onShowSizeChange = this.onShowSizeChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.AfterAddAndDelete = this.AfterAddAndDelete.bind(this);
    this.AfterEditAndState = this.AfterEditAndState.bind(this);
  }

  componentWillMount() {
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.RoleQuery,
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
      },
    });
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.RoleCount,
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
      'url': AjaxFunction.RoleQuery,
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
      'url': AjaxFunction.RoleQuery,
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
      'url': AjaxFunction.RoleQuery,
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
      'url': AjaxFunction.RoleCount,
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
  resetPage() {
    this.setState(
      {
        Loading: true,
      }
    );
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.RoleQuery,
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
      },
    });
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.RoleCount,
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
      'url': AjaxFunction.RoleQuery,
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
      'url': AjaxFunction.RoleCount,
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
      'url': AjaxFunction.RoleQuery,
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
    const rolePowers = window.rolePower;
    let AddRole;
    if (rolePowers.indexOf('AddRole,') >= 0) {
      AddRole = <Col span={6}><AddButton afterAdd={this.AfterAddAndDelete} QueryString={this.state.QueryString} /></Col>;
    } else {
      AddRole = <p></p>;
    }
    let QuyRole;
    if (rolePowers.indexOf('QuyRole,') >= 0) {
      QuyRole = <Col span={18}><DataSearch setQuery={this.getQuery} resetPage={this.resetPage} /></Col>;
    } else {
      QuyRole = <p></p>;
    }
    let GetRole1;
    let GetRole2;
    if (rolePowers.indexOf('GetRole,') >= 0) {
      GetRole1 = <DataTable tableData={this.state.DataTable} loading={this.state.Loading} afterState={this.AfterEditAndState} afterDelete={this.AfterAddAndDelete} />;
      GetRole2 = <DataPagination PageNumber={this.state.PageNumber} onShowSizeChange={this.onShowSizeChange} onChange={this.onChange} DataCount={this.state.DataCount} />;
    } else {
      GetRole1 = <p></p>;
      GetRole2 = <p></p>;
    }
    return (
      <QueueAnim>
        <div key="a">
          <Row type="flex" justify="start">
            {AddRole}
            {QuyRole}
          </Row>
          <Row>
            <span style={{ 'font-size': '5px' }}>&nbsp;&nbsp;&nbsp;</span>
          </Row>
          <Row>
            {GetRole1}
          </Row>
          <Row>
            <span style={{ 'font-size': '20px' }}>&nbsp;&nbsp;&nbsp;</span>
          </Row>
          <Row>
            {GetRole2}
          </Row>
        </div>
      </QueueAnim>
    );
  }
}
