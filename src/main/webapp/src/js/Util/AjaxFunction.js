const h = '';
// const h = '/ds';
export const DepartmentCount = `${h}/department/count`;          // 数据总数     --参数：无
export const DepartmentQuery = `${h}/department/query`;          // 数据查询     --参数：queryName
export const DepartmentAdd = `${h}/department/add`;              // 添加部门     --参数：name,address,phone,other,active
export const DepartmentEdit = `${h}/department/edit`;            // 修改部门     --参数：id,name,address,phone,other,active
export const DepartmentDelete = `${h}/department/delete`;        // 删除部门     --参数：id
export const DepartmentActive = `${h}/department/active`;        // 激活部门     --参数：id
export const DepartmentAbandon = `${h}/department/abandon`;      // 注销部门     --参数：id
export const DepartmentName = `${h}/department/name`;            // 检测名称     --参数：name
export const DepartmentNames = `${h}/department/names`;          // 检测名称     --参数：name
export const DepartmentAddress = `${h}/department/address`;      // 检测地址     --参数：address
export const DepartmentPhone = `${h}/department/phone`;          // 检测电话     --参数：phone
export const DepartmentNumber = `${h}/department/number`;        // 检测编号     --参数：number
export const DepartmentNumbers = `${h}/department/numbers`;      // 检测编号     --参数：number
export const DepartmentCode = `${h}/department/code`;            // 检测邮编     --参数：code
export const DepartmentList = `${h}/department/list`;            // 获取部门     --参数：无
export const DepartmentExport = `${h}/department/export`;        // 导出部门     --参数：
export const DepartmentDownload = `${h}/department/download`;    // 检查导出     --参数：DeptName

export const UserCount = `${h}/user/count`;                      // 数据总数     --参数：无
export const UserQuery = `${h}/user/query`;                      // 数据查询     --参数：queryName
export const UserName = `${h}/user/name`;                        // 检测名称     --参数：name
export const UserNumber = `${h}/user/number`;                    // 检测证件     --参数：number
export const UserPhone = `${h}/user/phone`;                      // 检测电话     --参数：number
export const UserLogin = `${h}/user/login`;                      // 检测名称     --参数：login
export const UserLogins = `${h}/user/logins`;                    // 检测名称     --参数：logins
export const UserDept = `${h}/user/dept`;                        // 检测部门     --参数：dept
export const UserAdd = `${h}/user/add`;                          // 添加角色     --参数：name,other
export const UserDelete = `${h}/user/delete`;                    // 删除角色     --参数：id
export const UserEdit = `${h}/user/edit`;                        // 修改用户     --参数：
export const UserActive = `${h}/user/active`;                    // 激活用户     --参数：id
export const UserAbandon = `${h}/user/abandon`;                  // 注销用户     --参数：id
export const UserReset = `${h}/user/reset`;                      // 重置密码     --参数：id
export const UserPass = `${h}/user/pass`;                        // 修改密码     --参数：passBefore,passAfter1,passAfter2
export const DeptNow = `${h}/user/depts`;                        // 当前部门     --参数：无
export const UserDownload = `${h}/user/download`;                // 检查导出     --参数：userName,userDid
export const CurrentUser = `${h}/getCurrentUser`;                // 当前人员     --参数：无
export const CurrentDepartment = `${h}/getCurrentDepartment`;    // 所属部门     --参数：无
export const CurrentDid = `${h}/getCurrentDid`;                  // 所属部门     --参数：无
export const UserExport = `${h}/user/export`;                    // 导出用户     --参数：id

export const FileNew = `${h}/file/newNumber`;                    // 最新编号     --参数：无
export const FileAdd = `${h}/file/add`;                          // 新增档案     --参数：一大堆。。。。。
export const FileNumber = `${h}/file/number`;                    // 检测编号     --参数：number
export const FileNumbers = `${h}/file/numbers`;                  // 检测编号     --参数：number
export const FileEdit = `${h}/file/edit`;                        // 修改档案     --参数：一大堆。。。。。
export const FileFlow = `${h}/file/flow`;                        // 档案流出     --参数：一大堆。。。。。
export const FileBack = `${h}/file/back`;                        // 档案重存     --参数：一大堆。。。。。
export const FileCount = `${h}/file/count`;                      // 数据总数     --参数：PageNumber,PageSize,FileNumber,FileDept,PersonName,PersonNumber,FileState
export const FileQuery = `${h}/file/query`;                      // 数据查询     --参数：PageNumber,PageSize,FileNumber,FileDept,PersonName,PersonNumber,FileState
export const FileDownload = `${h}/file/download`;                // 检查导出     --参数：
export const FileExport = `${h}/file/export`;                    // 导出档案     --参数：

export const PersonName = `${h}/person/name`;                    // 检测姓名     --参数：name
export const PersonNumber = `${h}/person/number`;                // 检测证件     --参数：number
export const PersonNumbers = `${h}/person/numbers`;              // 检测证件     --参数：number
export const PersonPhone1 = `${h}/person/phone1`;                // 检测电话     --参数：phone
export const PersonPhone2 = `${h}/person/phone2`;                // 检测电话     --参数：phone
export const PersonAddress = `${h}/person/address`;              // 检测地址     --参数：address
export const PersonAge = `${h}/person/age`;                      // 检测年龄     --参数：fileAge

export const FlowEdit = `${h}/flow/edit`;                        // 修改流动     --参数：一大堆。。。。。
export const FlowDirect = `${h}/flow/direct`;                    // 检测来源     --参数：direct
export const FlowReason = `${h}/flow/reason`;                    // 检测原因     --参数：reason
export const FlowCount = `${h}/flow/count`;                      // 数据总数     --参数：PageNumber,PageSize,FileNumber,FileDept,PersonName,PersonNumber,FlowFlow
export const FlowQuery = `${h}/flow/query`;                      // 数据查询     --参数：PageNumber,PageSize,FileNumber,FileDept,PersonName,PersonNumber,FlowFlow
export const FlowDownload = `${h}/flow/download`;                // 检查导出     --参数：
export const FlowExport = `${h}/Flow/export`;                    // 导出流动     --参数：
export const PrintOut = `${h}/flow/printOut`;                    // 转出打印     --参数：
export const PrintIn = `${h}/flow/printIn`;                      // 转入打印     --参数：

export const FlowIn = `${h}/count/flowIn`;                       // 存档数量     --参数：userDept
export const FlowOut = `${h}/count/flowOut`;                     // 提档数量     --参数：userDept
export const FlowChange = `${h}/count/flowChange`;               // 流动变更     --参数：userDept
export const PersonChange = `${h}/count/personChange`;           // 人员变更     --参数：userDept
export const MaleIn = `${h}/count/maleIn`;                       // 存档男性     --参数：userDept
export const MaleOut = `${h}/count/maleOut`;                     // 提档男性     --参数：userDept
export const FemaleIn = `${h}/count/femaleIn`;                   // 存档女性     --参数：userDept
export const FemaleOut = `${h}/count/femaleOut`;                 // 提档女性     --参数：userDept

export const Logout = `${h}/logout`;                             // 退出系统     --参数：
