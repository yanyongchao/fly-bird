import React, { useRef, MutableRefObject } from 'react';
import Carousel from '../Carousel';
import type { CarouselRef } from '../Carousel';

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const demo1 = () => {
  const ref = useRef<CarouselRef>(null) as MutableRefObject<CarouselRef>;
  return (
    <div>
      <Carousel ref={ref}>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <button onClick={() => ref.current.goTo(1, true)} type="button">
        回到0
      </button>
      <button onClick={() => ref.current.prev()} type="button">
        上一个
      </button>
      <button onClick={() => ref.current.next()} type="button">
        下一个
      </button>
    </div>
  );
};

export default demo1;
