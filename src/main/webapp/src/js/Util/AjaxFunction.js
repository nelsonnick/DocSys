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
export const DepartmentDownload = '/department/download';    // 检查导出     --参数：QueryString

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
export const UserPass = '/user/pass';                        // 修改密码     --参数：passBefore,passAfter1,passAfter2
export const DeptNow = '/user/depts';                        // 当前部门     --参数：无
export const UserDownload = '/user/download';                // 检查导出     --参数：userName,userDid
export const CurrentUser = '/getCurrentUser';                // 当前人员     --参数：无
export const CurrentDepartment = '/getCurrentDepartment';    // 所属部门     --参数：无

export const FileNew = '/file/newNumber';                    // 最新编号     --参数：无
export const FileAdd = '/file/add';                          // 新增档案     --参数：一大堆。。。。。
export const FileNumber = '/file/number';                    // 检测编号     --参数：number
export const FileEdit = '/file/edit';                        // 修改档案     --参数：一大堆。。。。。
export const FileFlow = '/file/flow';                        // 档案流出     --参数：一大堆。。。。。
export const FileBack = '/file/back';                        // 档案重存     --参数：一大堆。。。。。
export const FileCount = '/file/count';                      // 数据总数     --参数：
export const FileQuery = '/file/query';                      // 数据查询     --参数：
export const FileDownload = '/file/download';                // 检查导出     --参数：

export const PersonName = '/person/name';                    // 检测姓名     --参数：name
export const PersonNumber = '/person/number';                // 检测证件     --参数：number
export const PersonPhone1 = '/person/phone1';                // 检测电话     --参数：phone
export const PersonPhone2 = '/person/phone2';                // 检测电话     --参数：phone
export const PersonAddress = '/person/address';              // 检测地址     --参数：address
export const PersonAge = '/person/age';                      // 检测年龄     --参数：age

export const FlowEdit = '/flow/edit';                        // 修改流动     --参数：一大堆。。。。。
export const FlowDirect = '/flow/direct';                    // 检测来源     --参数：direct
export const FlowReason = '/flow/reason';                    // 检测原因     --参数：reason
export const FlowCount = '/flow/count';                      // 数据总数     --参数：
export const FlowQuery = '/flow/query';                      // 数据查询     --参数：
export const FlowDownload = '/flow/download';                // 检查导出     --参数：
