const DynamicFunctionType = {
    '1':'按钮',
    '2':'其他',
}
const DynamicButtonType = {
  'SAVE':'新增',
    'UPDATE':'修改',
    'DETAIL':'详情',
    'DELETE':'删除',
    'IMPORT':'导入',
    'EXPORT':'导出',
    'OTHER':'其他',
}
const DynamicFunctionPosition={
    '1':'头',
    '2':'行',
}

const DynamicOutputType = {
    '1':'数字',
    '2':'字符',
    '3':'日期',
    '4':'数字字典',
}
const DynamicAlign = {
    '1':'左对齐',
    '2':'居中',
    '3':'右对齐',
}

const DynamicParameterType = {
    '1':'数字',
    '2':'字符',
    '3':'日期',
}
const DynamicInputMode = {
    '1':'手工录入',
    '2':'下拉列表',
    '3':'下拉列表(多选)',
    '4':'列表选择',
    '5':'列表选择(多选)',
    '6':'日期(弹出框)',
    '7':'期间(弹出框)',
}
// 指标类型
const NormTypeList = {
  '1':'省本部使用',
  '2':'所得税汇总数据',
}

const EnumRoleType = {
  ADMIN: 'admin',
  DEFAULT: 'admin',
  DEVELOPER: 'developer',
}

module.exports = {
  EnumRoleType,
  DynamicFunctionType,
  DynamicButtonType,
  DynamicFunctionPosition,
  DynamicOutputType,
  DynamicAlign,
  DynamicParameterType,
  DynamicInputMode,
  NormTypeList,
}
