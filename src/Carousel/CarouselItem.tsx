import React from 'react';
import type { PropsWithChildren, CSSProperties } from 'react';
import classNames from 'classnames';

interface CarouselItemProps {
  style: CSSProperties;
}

export default function CarouselItem(props: PropsWithChildren<CarouselItemProps>) {
  return (
    <div
      className={classNames({
        [`carousel-item`]: true,
      })}
      style={props.style}
    >
      {props.children}
    </div>
  );
}
