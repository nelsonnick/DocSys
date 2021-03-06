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
export const UserNumbers = `${h}/user/numbers`;                  // 检测证件     --参数：number
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
export const UserPass = `${h}/user/pass`;                        // 修改密码     --参数：pass
export const UserPassOld = `${h}/user/passOld`;                  // 检查密码     --参数：pass
export const UserPassNew = `${h}/user/passNew`;                  // 检查密码     --参数：pass
export const DeptNow = `${h}/user/depts`;                        // 当前部门     --参数：无
export const UserDownload = `${h}/user/download`;                // 检查导出     --参数：userName,userDid
export const CurrentUser = `${h}/getCurrentUser`;                // 当前人员     --参数：无
export const CurrentDepartment = `${h}/getCurrentDepartment`;    // 所属部门     --参数：无
export const CurrentDid = `${h}/getCurrentDid`;                  // 所属部门     --参数：无
export const UserExport = `${h}/user/export`;                    // 导出用户     --参数：id
export const UserCascader = `${h}/user/cascader`;                // 部门用户     --参数：无

export const FileNew = `${h}/file/newNumber`;                    // 最新编号     --参数：无
export const FileAdd = `${h}/file/add`;                          // 新增档案     --参数：一大堆。。。。。
export const FileNumber = `${h}/file/number`;                    // 检测编号     --参数：number
export const FileNumbers = `${h}/file/numbers`;                  // 检测编号     --参数：number
export const FileEdit = `${h}/file/edit`;                        // 修改档案     --参数：一大堆。。。。。
export const FileFlow = `${h}/file/flow`;                        // 档案流出     --参数：一大堆。。。。。
export const FileBack = `${h}/file/back`;                        // 再次存档     --参数：一大堆。。。。。
export const FileReturns = `${h}/file/returns`;                  // 原档重存     --参数：一大堆。。。。。
export const FileReturnz = `${h}/file/returnz`;                  // 还档         --参数：一大堆。。。。。
export const FileBorrow = `${h}/file/borrow`;                    // 借档         --参数：一大堆。。。。。
export const FileCount = `${h}/file/count`;                      // 数据总数     --参数：PageNumber,PageSize,FileNumber,FileDept,PersonName,PersonNumber,FileState
export const FileQuery = `${h}/file/query`;                      // 数据查询     --参数：PageNumber,PageSize,FileNumber,FileDept,PersonName,PersonNumber,FileState
export const FileDownload = `${h}/file/download`;                // 检查导出     --参数：
export const FileExport = `${h}/file/export`;                    // 导出档案     --参数：
export const PrintProve = `${h}/file/printProve`;                // 存档证明     --参数：
export const PrintPolity = `${h}/file/printPolity`;              // 政审证明     --参数：
export const PrintExtract = `${h}/file/printExtract`;            // 开提档函     --参数：

export const PersonName = `${h}/person/name`;                    // 检测姓名     --参数：name
export const PersonNumber = `${h}/person/number`;                // 检测证件     --参数：number
export const PersonNumbers = `${h}/person/numbers`;              // 检测证件     --参数：number
export const PersonNumberz = `${h}/person/numberz`;              // 检测证件     --参数：number
export const PersonPhone1 = `${h}/person/phone1`;                // 检测电话     --参数：phone
export const PersonPhone2 = `${h}/person/phone2`;                // 检测电话     --参数：phone
export const PersonAddress = `${h}/person/address`;              // 检测地址     --参数：address
export const PersonAge = `${h}/person/age`;                      // 检测年龄     --参数：fileAge
export const PersonCount = `${h}/person/count`;                  // 数据总数     --参数：无
export const PersonQuery = `${h}/person/query`;                  // 数据查询     --参数：
export const PersonActive = `${h}/person/active`;                // 转成在档     --参数：id
export const PersonAbandon = `${h}/person/abandon`;              // 转成已提     --参数：id
export const PersonEdit = `${h}/person/edit`;                     // 修改人员     --参数：
export const PersonDownload = `${h}/person/download`;            // 检查导出
export const PersonExport = `${h}/person/export`;                // 导出人员     --参数：

export const FlowEdit = `${h}/flow/edit`;                        // 修改流动     --参数：一大堆。。。。。
export const FlowDirect = `${h}/flow/direct`;                    // 检测来源     --参数：direct
export const FlowReason = `${h}/flow/reason`;                    // 检测原因     --参数：reason
export const FlowCount = `${h}/flow/count`;                      // 数据总数     --参数：PageNumber,PageSize,FileNumber,FileDept,PersonName,PersonNumber,FlowFlow
export const FlowQuery = `${h}/flow/query`;                      // 数据查询     --参数：PageNumber,PageSize,FileNumber,FileDept,PersonName,PersonNumber,FlowFlow
export const FlowDownload = `${h}/flow/download`;                // 检查导出     --参数：
export const FlowExport = `${h}/Flow/export`;                    // 导出流动     --参数：
export const PrintOut = `${h}/flow/printOut`;                    // 转出打印     --参数：
export const PrintIn = `${h}/flow/printIn`;                      // 转入打印     --参数：
export const PrintBorrow = `${h}/flow/printBorrow`;              // 出借打印     --参数：
export const PrintReturn = `${h}/flow/printReturn`;              // 归还打印     --参数：

export const FlowIn = `${h}/count/flowIn`;                       // 存档数量     --参数：userDept
export const FlowOut = `${h}/count/flowOut`;                     // 提档数量     --参数：userDept
export const FlowBorrow = `${h}/count/flowBorrow`;               // 借档数量     --参数：userDept
export const FlowReturn = `${h}/count/flowReturn`;               // 还档数量     --参数：userDept
export const FlowChange = `${h}/count/flowChange`;               // 流动变更     --参数：userDept
export const PersonChange = `${h}/count/personChange`;           // 人员变更     --参数：userDept
export const MaleIn = `${h}/count/maleIn`;                       // 存档男性     --参数：userDept
export const MaleOut = `${h}/count/maleOut`;                     // 提档男性     --参数：userDept
export const MaleBorrow = `${h}/count/maleBorrow`;               // 借档男性     --参数：userDept
export const FemaleIn = `${h}/count/femaleIn`;                   // 存档女性     --参数：userDept
export const FemaleOut = `${h}/count/femaleOut`;                 // 提档女性     --参数：userDept
export const FemaleBorrow = `${h}/count/femaleBorrow`;           // 借档女性     --参数：userDept
export const FlowInAll = `${h}/count/flowInAll`;                 // 存档数量总数 --参数：无
export const FlowOutAll = `${h}/count/flowOutAll`;               // 提档数量总数 --参数：无
export const FlowBorrowAll = `${h}/count/flowBorrowAll`;         // 出借数量总数 --参数：无
export const FlowReturnAll = `${h}/count/flowReturnAll`;         // 归还数量总数 --参数：无
export const FlowChangeAll = `${h}/count/flowChangeAll`;         // 流动变更总数 --参数：无
export const PersonChangeAll = `${h}/count/personChangeAll`;     // 人员变更总数 --参数：无
export const MaleInAll = `${h}/count/maleInAll`;                 // 存档男性总数 --参数：无
export const MaleOutAll = `${h}/count/maleOutAll`;               // 提档男性总数 --参数：无
export const MaleBorrowAll = `${h}/count/maleBorrowAll`;         // 借档男性总数 --参数：无
export const FemaleInAll = `${h}/count/femaleInAll`;             // 存档女性总数 --参数：无
export const FemaleOutAll = `${h}/count/femaleOutAll`;           // 提档女性总数 --参数：无
export const FemaleBorrowAll = `${h}/count/femaleBorrowAll`;     // 借档女性总数 --参数：无
export const CountAll = `${h}/count/countAll`;                   // 全部记录统计 --参数：无
export const CountAlls = `${h}/count/countAlls`;                 // 全部记录统计 --参数：无

export const Logout = `${h}/logout`;                             // 退出系统     --参数：
export const ExportChange = `${h}/exportChange`;                 // 下载         --参数：无
export const ExportTrans = `${h}/exportTrans`;                   // 下载         --参数：无
export const ExportLook = `${h}/exportLook`;                     // 下载         --参数：无
export const ExportExport = `${h}/exportExport`;                 // 下载         --参数：无
export const ExportPrint = `${h}/exportPrint`;                   // 下载         --参数：无
export const ExportLogin = `${h}/exportLogin`;                   // 下载         --参数：无
export const ExportProve = `${h}/exportProve`;                   // 下载         --参数：无
export const ExportPolity = `${h}/exportPolity`;                 // 下载         --参数：无
export const ExportExtract = `${h}/exportExtract`;               // 下载         --参数：无
