import React from 'react'
import cn from 'classnames'
import leftArrow from './img/left-arrow.svg'
import rightArrow from './img/right-arrow.svg'

interface IArrowProps {
  direction: string;
  handleClick: React.MouseEventHandler<HTMLDivElement>;
  className: string;
}

const Arrow = ({ direction, handleClick, className }: IArrowProps) => {
  return (
    <div
      onClick={handleClick}
      className={
        cn(className, `btn--${(direction === 'right' && 'right') || 'left'}`)
      }
    >

      <img className="btn__arrow" src={direction === 'right' ? rightArrow : leftArrow} alt="" />
    </div >
  )
}

export default Arrow