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
        'QueryString': '',
      },
      'success': (DeptCount) => {
        $.ajax({
          'type': 'POST',
          'url': AjaxFunction.DeptNow,
          'dataType': 'text',
          'data': {'uid': this.props.userDid},
          'success': (DeptNow) => {
            this.setState(
              {
                visible: true,
                DeptList: eval(`(${DeptList})`),
                DeptCount,
                userDid: DeptNow,
              }
            );
          },
          'error': () => {
            openNotificationWithIcon('error', '请求错误', '无法获取當前当前部门信息，请检查网络情况');
          },
        });
      },
      'error': () => {
        openNotificationWithIcon('error', '请求错误', '无法获取部门总数，请检查网络情况');
        this.setState(
          {
            DeptList: '',
            DeptCount: '',
            visible: false,
          }
        );
      },
    });
  },
  'error': () => {
    openNotificationWithIcon('error', '请求错误', '无法获取部门列表，请检查网络情况');
    this.setState(
      {
        DeptList: '',
        DeptCount: '',
        visible: false,
      }
    )
  },
});