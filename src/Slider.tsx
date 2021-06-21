import React, { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { useInterval } from './UseInterval'
import Arrow from './Arrow'
import { ISliderProps } from './ISliderProps'

/**
 *
 * @props transitionDuration time in sec for transition
 * @props delay time pause in sec between each slides
 * @props auto trigger autoplay
 * @returns JSX.Element
 */
const Slider = ({ transitionDuration, children, auto, delay }: ISliderProps) => {

  // add one child item for infinite loop smooth transition
  const initItem = React.Children.map(React.Children.toArray([
    children[children.length - 1],
    ...children,
  ]), (child, x) => {
    if (React.isValidElement(child)) {
      return (
        React.cloneElement(child, {
          style: {
            ...child.props.style,
            width: `${100 / children.length}%`
          },
          key: x,
          className: cn(child.props.className, 'contents__item d-flex')
        })
      )
    } else {
      return null
    }
  })

  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(1);
  const [length] = useState(initItem.length);
  const [percent] = useState(100 / length);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const delay_ = (delay && ((delay) * 1000 - transitionDuration)) || 3000;
  const SlideStyle = {
    contents: {
      width: `${length * 100}%`,
      transform: `translateX(-${percent}%)`
    }
  }
  useEffect(() => {
    // add bem css class on img tag
    const nestedImg = ref.current?.getElementsByTagName('img');
    if (nestedImg) {
      Array.from(nestedImg).map(i => i.classList.add('item__img'))
    }
  })

  useInterval(() => { auto && moveToRight(); }, !isMouseOver ? delay_ : null);

  return (
    <>
      N°{position} offsetH {ref.current && ref.current.offsetHeight}
      <div
        className="slider"
        onMouseLeave={() => {
          setIsMouseOver(false);
        }}
        onMouseOver={() => {
          setIsMouseOver(true);
        }}
      >
        <div className="slider__contents d-flex" style={SlideStyle.contents} ref={ref}>
          {initItem}
        </div>
        <Arrow direction="left" handleClick={moveToLeft} className="slider__btn" />
        <Arrow direction="right" handleClick={moveToRight} className="slider__btn" />
      </div>
    </>
  );

  function moveToRight() {
    const currentTrans = -position * percent;
    const translationPercentage = position < length - 1 ? currentTrans - percent : currentTrans;
    if (position === length - 1 && ref && ref.current) {
      // return to 0 (last slide copy) without transition
      ref.current.style.transition = 'none';
      ref.current.style.transform = `translateX(${0}%)`;
      // force browser to repaint before slide[O] to first slide
      ref.current.offsetHeight.toString()
      ref.current.style.transition = `all ${transitionDuration}s ease-in`;
      ref.current.style.transform = `translateX(-${percent}%)`;
    } else {
      if (ref && ref.current) {
        ref.current.style.transition = `all ${transitionDuration}s ease-in`;
        ref.current.style.transform = `translateX(${translationPercentage}%)`;
      }
    }
    setPosition(position < length - 1 ? position + 1 : 1);
  };

  function moveToLeft() {
    const currentTrans = -position * percent;
    const translationPercentage = position !== 0 ? currentTrans + percent : currentTrans;
    if (ref && ref.current) {
      if (position === 1) {
        ref.current.style.transition = `all ${transitionDuration}s ease-in`;
        ref.current.style.transform = `translateX(${translationPercentage}%)`;
        setTimeout(() => {
          if (ref && ref.current) {
            ref.current.style.transition = 'none';
            ref.current.style.transform = `translateX(-${percent * (length - 1)}%)`;
          }
        }, transitionDuration * 1000);
      } else {
        ref.current.style.transition = `all ${transitionDuration}s ease-in`;
        ref.current.style.transform = `translateX(${translationPercentage}%)`;
      }
    }
    setPosition(position !== 1 ? position - 1 : length - 1);
  };
};

export default Slider;