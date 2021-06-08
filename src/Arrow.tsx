import cn from 'classnames'
import leftArrow from './img/left-arrow.svg'
import rightArrow from './img/right-arrow.svg'
import { IArrowProps } from './ISliderProps'

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