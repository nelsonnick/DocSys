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

export default class UserCont extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      treeData: [],      // 部门列表
      DataTable: [],     // 当前页的具体数据
      PageSize: '9',     // 当前每页的条数
      PageNumber: '1',   // 当前页的页码
      DataCount: '0',    // 当前数据的总数量
      UserName: '',      // 当前搜索的用户姓名
      UserDept: [],      // 当前搜索的用户部门
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
      'url': AjaxFunction.DeptTree,
      'dataType': 'text',
      'success': (treeData) => {
        $.ajax({
          'type': 'POST',
          'url': AjaxFunction.UserQuery,
          'dataType': 'json',
          'data': {
            'PageNumber': '1',
            'PageSize': '9',
            'UserName': '',
            'UserDept': [],
          },
          'success': (dataTable) => {
            $.ajax({
              'type': 'POST',
              'url': AjaxFunction.UserCount,
              'dataType': 'text',
              'data': {
                'PageNumber': '1',
                'PageSize': '9',
                'UserName': '',
                'UserDept': [],
              },
              'success': (DataCount) => {
                this.setState(
                  {
                    Loading: false,
                    DataCount,
                    treeData: eval(`(${treeData})`),
                    DataTable: dataTable,
                    PageNumber: '1',
                    PageSize: '9',
                    UserName: '',
                    UserDept: [],
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
  }

  onChange(PageNumbers) {
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
        'PageSize': this.state.PageSize,
        'UserName': this.state.UserName,
        'UserDept': this.state.UserDept,
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
        'UserName': this.state.UserName,
        'UserDept': this.state.UserDept,
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
  getQuery(UserName = '', UserDept = []) {
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
        'PageNumber': '1',
        'PageSize': this.state.PageSize,
        UserName,
        UserDept,
      },
      'success': (data) => {
        this.setState(
          {
            PageNumber: '1',
            DataTable: data,
            UserName,
            UserDept,
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
      'url': AjaxFunction.UserCount,
      'dataType': 'text',
      'data': {
        UserName,
        UserDept,
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
      'url': AjaxFunction.UserQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': '1',
        'PageSize': this.state.PageSize,
        'UserName': '',
        'UserDept': [],
      },
      'success': (data) => {
        this.setState(
          {
            DataTable: data,
            PageNumber: '1',
            PageSize: this.state.PageSize,
            UserName: '',
            UserDept: [],
          }
        );
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法完成刷新列表，请检查网络情况');
      },
    });
    $.ajax({
      'type': 'POST',
      'url': AjaxFunction.UserCount,
      'dataType': 'text',
      'data': {
        'PageNumber': '1',
        'PageSize': '9',
        'UserName': '',
        'UserDept': [],
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
      'url': AjaxFunction.UserQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': '1',
        'PageSize': this.state.PageSize,
        'UserName': '',
        'UserDept': [],
      },
      'success': (data) => {
        this.setState(
          {
            PageNumber: '1',
            DataTable: data,
            UserName: '',
            UserDept: [],
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
      'url': AjaxFunction.UserCount,
      'dataType': 'text',
      'data': {
        'PageNumber': '1',
        'PageSize': this.state.PageSize,
        'UserName': '',
        'UserDept': [],
      },
      'success': (data) => {
        this.setState(
          {
            Loading: false,
            DataCount: data,
            PageNumber: '1',
            UserName: '',
            UserDept: [],
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
      'url': AjaxFunction.UserQuery,
      'dataType': 'json',
      'data': {
        'PageNumber': this.state.PageNumber,
        'PageSize': this.state.PageSize,
        'UserName': this.state.UserName,
        'UserDept': this.state.UserDept,
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
    let AddUser;
    if (rolePowers.indexOf('AddUser,') >= 0) {
      AddUser = <Col span={6}><AddButton afterAdd={this.AfterAddAndDelete} UserName={this.state.UserName} UserDept={this.state.UserDept} /></Col>;
    } else {
      AddUser = <p></p>;
    }
    let QuyUser;
    if (rolePowers.indexOf('QuyUser,') >= 0) {
      QuyUser = <Col span={18}><DataSearch setQuery={this.getQuery} resetPage={this.resetPage} treeData={this.state.treeData} /></Col>;
    } else {
      QuyUser = <p></p>;
    }
    let GetUser1;
    let GetUser2;
    if (rolePowers.indexOf('GetUser,') >= 0) {
      GetUser1 = <DataTable tableData={this.state.DataTable} loading={this.state.Loading} afterState={this.AfterEditAndState} afterDelete={this.AfterAddAndDelete} />;
      GetUser2 = <DataPagination PageNumber={this.state.PageNumber} onShowSizeChange={this.onShowSizeChange} onChange={this.onChange} DataCount={this.state.DataCount} />;
    } else {
      GetUser1 = <p></p>;
      GetUser2 = <p></p>;
    }
    return (
      <QueueAnim>
        <div key="a">
          <Row type="flex" justify="start">
            {AddUser}
            {QuyUser}
          </Row>
          <Row>
            <span style={{ 'font-size': '5px' }}>&nbsp;&nbsp;&nbsp;</span>
          </Row>
          <Row>
            {GetUser1}
          </Row>
          <Row>
            <span style={{ 'font-size': '20px' }}>&nbsp;&nbsp;&nbsp;</span>
          </Row>
          <Row>
            {GetUser2}
          </Row>
        </div>
      </QueueAnim>
    );
  }
}
