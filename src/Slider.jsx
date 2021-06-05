import React, { useRef, useState } from 'react'
import cn from 'classnames'
import { useInterval } from './hooks'

const Slider = ({ height, children, auto, speed }) => {
  // add child item to infinite loop
  const initItem = React.Children.map(React.Children.toArray([
    children[children.length - 1],
    ...children,
  ]), child => (
    React.cloneElement(child, {
      style: {
        ...child.props.style,
        width: `${100 / children.length}%`
      },
      className: cn(child.props.className, 'contents__item')
    })
  ))
  const ref = useRef();
  const [position, setPosition] = useState(1);
  const [length] = useState(initItem.length);
  const [percent] = useState(100 / length);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const SPEED = speed || 3000;
  const SlideStyle = {
    contents: {
      width: `${length * 100}%`,
      transform: `translateX(-${percent}%)`
    }
  }

  const moveToRight = _ => {
    const currentPer = -position * percent;
    const movePer = position < length - 1 ? currentPer - percent : currentPer;

    if (position === length - 1) {
      // return to 0 (last item copy) without transition
      ref.current.style.transition = 'none';
      ref.current.style.transform = `translateX(${0}%)`;
      // before item[O] to first item force to repaint
      ref.current.style.height = ref.current.offsetHeight
      ref.current.style.transition = 'all 1s ease-in';
      ref.current.style.transform = `translateX(-${percent}%)`;
    } else {
      ref.current.style.transition = 'all 1s ease-in';
      ref.current.style.transform = `translateX(${movePer}%)`;
    }

    setPosition(position < length - 1 ? position + 1 : 1);
  };

  const moveToLeft = _ => {
    const currentPer = -position * percent;
    const movePer = position !== 0 ? currentPer + percent : currentPer;

    if (position === 1) {
      ref.current.style.transition = 'all 1s ease-in';
      ref.current.style.transform = `translateX(${movePer}%)`;
      setTimeout(() => {
        ref.current.style.transition = 'none';
        ref.current.style.transform = `translateX(-${percent * (length - 1)}%)`;
      }, 1000);
    } else {
      ref.current.style.transition = 'all 1s ease-in';
      ref.current.style.transform = `translateX(${movePer}%)`;
    }

    setPosition(position !== 1 ? position - 1 : length - 1);
  };

  useInterval(
    () => {
      auto && moveToRight();
    },
    !isMouseOver ? SPEED : null
  );

  return (
    <div
      className="slider"
      onMouseLeave={() => {
        setIsMouseOver(false);
      }}
      onMouseOver={() => {
        setIsMouseOver(true);
      }}
    >
      <div className="btn btn--left" onClick={moveToLeft}>
        {'<'}
      </div>
      <div className="btn btn--right" onClick={moveToRight}>
        {'>'}
      </div>
      <div className="slider__contents" style={SlideStyle.contents} ref={ref}>
        {initItem}
      </div>
    </div>
  );
};

export default Slider;