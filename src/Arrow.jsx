import React from 'react'
import cn from 'classnames'
import leftArrow from './img/left-arrow.svg'
import rightArrow from './img/right-arrow.svg'

const Arrow = ({ direction, handleClick, className }) => {
  return (
    <div
      onClick={handleClick}
      className={
        cn(className, `btn--${(direction === 'right' && 'right') || 'left'}`)
      }
    >
      { direction === 'right' ?
        <img src={rightArrow} alt="" /> : <img src={leftArrow} alt="" />}
    </div >
  )
}

export default Arrow