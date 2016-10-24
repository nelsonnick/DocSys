export const DepartmentCount = '/department/count';          // 数据总数     --参数：无
export const DepartmentQuery = '/department/query';          // 数据查询     --参数：queryName
export const DepartmentAdd = '/department/add';              // 添加部门     --参数：name,address,phone,other,active
export const DepartmentEdit = '/department/edit';            // 修改部门     --参数：id,name,address,phone,other,active
export const DepartmentDelete = '/department/delete';        // 删除部门     --参数：id
export const DepartmentActive = '/department/active';        // 激活部门     --参数：id
export const DepartmentAbandon = '/department/abandon';      // 注销部门     --参数：id
export const DepartmentName = '/department/name';            // 检测名称     --参数：name
export const DepartmentNames = '/department/names';          // 检测名称     --参数：name
export const DepartmentAddress = '/department/address';      // 检测地址     --参数：address
export const DepartmentPhone = '/department/phone';          // 检测电话     --参数：phone
export const DepartmentNumber = '/department/number';        // 检测编号     --参数：number
export const DepartmentNumbers = '/department/numbers';      // 检测编号     --参数：number
export const DepartmentList = '/department/list';            // 获取部门     --参数：无

export const UserCount = '/user/count';                      // 数据总数     --参数：无
export const UserQuery = '/user/query';                      // 数据查询     --参数：queryName
export const UserName = '/user/name';                        // 检测名称     --参数：name
export const UserNumber = '/user/number';                    // 检测证件     --参数：number
export const UserPhone = '/user/phone';                      // 检测电话     --参数：number
export const UserLogin = '/user/login';                      // 检测名称     --参数：login
export const UserDept = '/user/dept';                        // 检测部门     --参数：dept
export const UserAdd = '/user/add';                          // 添加角色     --参数：name,other
export const UserDelete = '/user/delete';                    // 删除角色     --参数：id
export const UserEdit = '/user/edit';                        // 修改用户     --参数：
export const UserActive = '/user/active';                    // 激活用户     --参数：id
export const UserAbandon = '/user/abandon';                  // 注销用户     --参数：id
export const UserReset = '/user/reset';                      // 重置密码     --参数：id
export const DeptNow = '/user/depts';                        // 当前部门     --参数：无
