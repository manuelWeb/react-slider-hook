import './Carousel.scss';
import Slider from './Slider';
import images from './images'

function App() {
  return (
    <div className="App">
      <h2>Slider</h2>
      <Slider delay={2} transitionDuration={0.35} auto>
        {images.map((image, idx) => {
          return (
            <div key={idx} style={{ display: 'flex' }}>
              <img src={image} alt="" />
            </div>
          )
        })}
      </Slider>
    </div>
  );
}

export default App;
