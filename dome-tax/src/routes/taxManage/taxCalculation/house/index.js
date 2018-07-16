import React from 'react'
import { connect } from 'dva'
import ButtonGroup from './ButtonGroup'
import Filter from './Filter'
import List from './List'

/**
 * @description (税金管理>税金计算>房产税)
 * @author wangliang
 */ 

const HouseTax = () => {

  const ButtonGroupProps = {
    onBack(){
      
    },
    onCreate(){

    },
    onCollect(){

    },
    onDeleteBatches(){

    },
    onBatchUpdate(){

    }
  }

  const FilterProps = {
    onFilterChange(files){
      console.log(files)
    }
  }

  const ListProps = {
    //loading: loading.effects['houseTax/query'],
    onRowSelectionChange(){

    },
    onDelete(record){
      
    },
    onEditItem(){

    },
    onRow(record){
      return {
        onDoubleClick:() => {
         console.log('哈哈哈我就是这么强大')
        }
      }
    }
    
  }

  return (
    <div>
      <ButtonGroup {...ButtonGroupProps}></ButtonGroup>
      <Filter {...FilterProps}></Filter>
      <List {...ListProps}></List>
    </div>
  )
}

export default HouseTax