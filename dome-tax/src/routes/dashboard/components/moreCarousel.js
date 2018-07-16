/* 
    多图轮播组件 功能一次循环多个内容
    dataImg 轮播所需数据 类型Array
    leftRigthBtn 左右按钮 类型Boolean
    slides 一页一次性显示几个 类型number 
*/
import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import styles from './moreCarousel.less'

const MoreCarousel = ({
                        dataImg=[],
                        leftRigthBtn,
                        slides,
                        addBtn
                      }) =>{

  const onRigthBtn = () => {
    console.log(1)
  }

  const onLeftBtn = () => {
    console.log(2)
  }

  return (
    <div className={styles.CarouselWrap}>
      <div className={styles.CarouselWrapper}>
        { leftRigthBtn && <div onClick={onLeftBtn} className={styles.leftBtn}>{'<'}</div> }
        <div className={styles.CarouselSlideWrap}>
          <div className={styles.CarouselSlideWrapper}>
            {
              dataImg.map(value => {
                return <div className={styles.CarouseSlide} key={value.id}>
                    <div className="CarouseSlideIcon">{value.icon}</div>
                    <div className="CarouseSlideTitle">{value.dataImgTit}</div>
                </div>
              })
            }
          </div>
        </div>
        <div className={styles.omit}>
          <Icon type="ellipsis" />
        </div>
        { leftRigthBtn && <div onClick={onRigthBtn} className={styles.rightBtn}>{'>'}</div>  }
      </div>
      { addBtn && <div className={styles.addSlide}><Icon type="plus"/></div> } 
    </div>
  )
}

MoreCarousel.propTypes = {
  dataImg: PropTypes.array,
  leftRigthBtn: PropTypes.bool,
  slides:PropTypes.number
}

export default MoreCarousel