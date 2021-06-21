import React from "react"
interface SlideProps { type: 'div' }
export interface ISliderProps {
  /**
   * determine the translation time
   */
  transitionDuration: number,
  /**
   * Slides markup
   */
  children: SlideProps[],
  // children: JSX.Element[],  // children: React.ReactNode[],
  // children: React.ReactChildren[] // children: JSX.Element[] & ReactNode & ReactChild[],
  // children: | React.ReactChild | React.ReactChild[], // children: Array<React.ReactChild>,
  /**
   * turn on autoplay
   */
  auto: boolean,
  /**
   * determine the pause time between each slides default 3 secondes
   */
  delay?: number | 3000
};

export interface IArrowProps {
  /**
   * determine left or right svg display
   */
  direction: string;
  /**
   * trigger next or prev slide
   */
  handleClick: React.MouseEventHandler<HTMLDivElement>;
  /**
   * add class
   */
  className: string;
}