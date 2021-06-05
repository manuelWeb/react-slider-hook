import './Carousel.scss';
import Slider from './Slider';

function App() {
  return (
    <div className="App">
      <h2>Slider</h2>
      <Slider speed={2000}>
        <div
          style={{
            background: 'pink'
          }}>
          1
        </div>
        <div style={{
          background: 'beige'
        }}>
          2
        </div>
        <div style={{
          background: 'skyblue'
        }}>
          3
        </div>
        <div style={{
          background: 'yellow'
        }}>
          4
        </div>
        <div style={{
          background: 'blue'
        }}>
          5
        </div>
        <div style={{
          background: 'cyan'
        }}>
          6
        </div>
      </Slider>
    </div>
  );
}

export default App;
