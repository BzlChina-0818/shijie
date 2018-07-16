import React from 'react'
import { Table } from 'antd'
import styles from './List.less'

const List=({...tableProps})=>{
    const columns = [{
        title: '流程定义名称',
        dataIndex: 'name',
        key:'name',
      }, {
        title: '流程定义标识',
        dataIndex: 'key',
        key:'key',
      }, {
        title: '版本',
        dataIndex: 'version',
        key:'version',
      },{
        title: '流程图片',
        dataIndex: 'diagramResourceName',
        key:'diagramResourceName',
        // render: text => <img alt="avatar" width={30} src={text} />,
      },{
        title: '流程XML',
        dataIndex: 'resourceName',
        key:'resourceName',
      }];
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };
    return (
        <div>
            <Table 
                {...tableProps}
                rowSelection={rowSelection} 
                columns={columns}
                bordered
                {...tableProps}
                simple
                className={styles.table}
                rowKey={record => record.id}
                //pagination={false}
            />
        </div>
    )
}

export default List
