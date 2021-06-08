export interface ISliderProps {
  /**
   * determine the translation time
   */
  transitionDuration: number,
  /**
   * Slides markup
   */
  children?: JSX.Element[],
  /**
   * turn on autoplay
   */
  auto: boolean,
  /**
   * determine the pause time between each slides default 3 secondes
   */
  delay?: number | 3000
};