import React, { useRef, useState } from 'react'
import cn from 'classnames'
import { useInterval } from './hooks'
import Arrow from './Arrow'
const avertisement: any = [React.createElement('h1', null, 'NO CHILDREN!'), React.createElement('h1', null, 'PUT CHILDREN...')]

const Slider = ({ transitionDuration, children = avertisement, auto, delay }: { transitionDuration: number, children: any[], auto: boolean, delay: number }) => {
  // add child item for infinite loop smooth transition
  const initItem = React.Children.map(React.Children.toArray([
    children[children.length - 1],
    ...children,
  ]), (child: any, x) => (
    React.cloneElement(child as any, {
      style: {
        ...child.props.style,
        width: `${100 / children.length}%`
      },
      key: x,
      className: cn(child.props.className, 'contents__item d-flex')
    })
  ))
  const ref: any = useRef();
  const [position, setPosition] = useState(1);
  const [length] = useState(initItem.length);
  const [percent] = useState(100 / length);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const delay_: number | any = ((delay) * 1000 - transitionDuration) || 3000;
  const SlideStyle = {
    contents: {
      width: `${length * 100}%`,
      transform: `translateX(-${percent}%)`
    }
  }

  useInterval(() => { auto && moveToRight(); }, !isMouseOver ? delay_ : null);

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
      <div className="slider__contents d-flex" style={SlideStyle.contents} ref={ref as any}>
        {initItem}
      </div>
      <Arrow direction="left" handleClick={moveToLeft} className="slider__btn" />
      <Arrow direction="right" handleClick={moveToRight} className="slider__btn" />
    </div>
  );

  function moveToRight() {
    const currentTrans = -position * percent;
    const translationPercentage = position < length - 1 ? currentTrans - percent : currentTrans;
    if (position === length - 1) {
      // return to 0 (last item copy) without transition
      ref.current.style.transition = 'none';
      ref.current.style.transform = `translateX(${0}%)`;
      // before item[O] to first item force to repaint
      ref.current.style.height = ref.current.offsetHeight
      ref.current.style.transition = `all ${transitionDuration}s ease-in`;
      ref.current.style.transform = `translateX(-${percent}%)`;
    } else {
      ref.current.style.transition = `all ${transitionDuration}s ease-in`;
      ref.current.style.transform = `translateX(${translationPercentage}%)`;
    }
    setPosition(position < length - 1 ? position + 1 : 1);
  };

  function moveToLeft() {
    const currentTrans = -position * percent;
    const translationPercentage = position !== 0 ? currentTrans + percent : currentTrans;
    if (position === 1) {
      ref.current.style.transition = `all ${transitionDuration}s ease-in`;
      ref.current.style.transform = `translateX(${translationPercentage}%)`;
      setTimeout(() => {
        ref.current.style.transition = 'none';
        ref.current.style.transform = `translateX(-${percent * (length - 1)}%)`;
      }, transitionDuration * 1000);
    } else {
      ref.current.style.transition = `all ${transitionDuration}s ease-in`;
      ref.current.style.transform = `translateX(${translationPercentage}%)`;
    }
    setPosition(position !== 1 ? position - 1 : length - 1);
  };
};

export default Slider;