import './Carousel.scss';
import Slider from './Slider';

function App() {
  return (
    <div className="App">
      <h2>Slider</h2>
      <Slider speed={2000}>
        <div style={{
          width: '100%',
          background: 'pink'
        }}>
          1
        </div>
        <div style={{
          width: '100%',
          background: 'beige'
        }}>
          2
        </div>
        <div style={{
          width: '100%',
          background: 'skyblue'
        }}>
          3
        </div>
        <div style={{
          width: '100%',
          background: 'yellow'
        }}>
          4
        </div>
        <div style={{
          width: '100%',
          background: 'white'
        }}>
          5
        </div>
        <div style={{
          width: '100%',
          background: 'cyan'
        }}>
          6
        </div>
      </Slider>
    </div>
  );
}

export default App;
