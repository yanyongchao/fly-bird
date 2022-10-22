import type { PropsWithChildren, ForwardRefRenderFunction, MutableRefObject } from 'react';
import React, {
  useImperativeHandle,
  forwardRef,
  useMemo,
  useState,
  useLayoutEffect,
  useRef,
  Children,
} from 'react';
import classNames from 'classnames';
import useEvent from './hooks/useEvent';
import useInterval from './hooks/useInterval';
import CarouselItem from './CarouselItem';
import './style/index.less';

export interface CarouselProps {
  prefixCls?: string;
  className?: string;
  autoplay?: boolean;
  dotPosition?: 'top' | 'bottom' | 'left' | 'right';
  dots?: boolean | { className?: string };
  /**
   * transition动画方式
   */
  easing?: string;
  // effect?: 'scrollx' | 'fade';
  afterChange?: (current: number) => void;
  beforeChange?: (from: number, to: number) => void;
}

export interface CarouselRef {
  goTo(slideNumber: number, dontAnimate?: boolean): void;
  next(): void;
  prev(): void;
}

const Carousel: ForwardRefRenderFunction<CarouselRef, PropsWithChildren<CarouselProps>> = (
  props,
  ref,
) => {
  const { className, autoplay = true, easing = 'linear' } = props;
  const carouselRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const carouselWrapRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;
  const [current, setCurrent] = useState(1);
  const [itemW, setItemW] = useState(0);
  const [isTransition, setTransition] = useState(true);
  const transitioning = useRef(false);

  const cls = classNames(
    {
      [`carousel`]: true,
    },
    className,
  );

  const carouselItems = useMemo(() => {
    const childrenArr = Children.toArray(props.children);
    const firstELement = childrenArr[0];
    const lastELement = childrenArr[childrenArr.length - 1];
    return [lastELement, ...childrenArr, firstELement];
  }, [props.children]);

  const carouselItemCount = useMemo(() => Children.count(props.children), []);

  const warperW = useMemo(() => {
    const width = itemW * carouselItems.length;
    return width;
  }, [itemW, carouselItems.length]);

  const newChildren = carouselItems.map((child, index) => (
    <CarouselItem key={index} style={{ width: itemW }}>
      {child}
    </CarouselItem>
  ));

  const goTo = useEvent((dir: 'prev' | 'next' | number, needTransition = true) => {
    if (transitioning.current) {
      return;
    }
    let next = 0;

    if (typeof dir === 'number') {
      next = dir;
    } else if (dir === 'prev') {
      next = current - 1;
    } else if (dir === 'next') {
      next = current + 1;
    }
    transitioning.current = needTransition;
    setTransition(needTransition);
    props.beforeChange?.(current, next);
    setCurrent(next);
  });

  const { start, pause } = useInterval(() => goTo('next'), 3000, autoplay);

  useImperativeHandle(ref, () => ({
    goTo(slideNumber: number, dontAnimate: boolean) {
      pause();
      goTo(slideNumber, !dontAnimate);
    },
    next: () => {
      pause();
      goTo('next');
    },
    prev: () => {
      pause();
      goTo('prev');
    },
  }));

  const handleTransitionEnd = useEvent(() => {
    console.log(current, carouselItemCount);
    transitioning.current = false;
    if (autoplay) {
      start();
    }
    if (current >= carouselItemCount) {
      return goTo(0, false);
    }
    if (current < 1) {
      return goTo(carouselItemCount, false);
    }
  });

  useLayoutEffect(() => {
    const { width } = carouselRef.current.getBoundingClientRect();
    setItemW(width);
    setTransition(false);
  }, []);

  return (
    <div className={cls} ref={carouselRef}>
      <div
        ref={carouselWrapRef}
        onTransitionEnd={handleTransitionEnd}
        className={classNames({
          [`carousel-warper`]: true,
        })}
        style={{
          width: warperW,
          transform: `translateX(-${itemW * current}px)`,
          transition: isTransition ? `transform  0.35s ${easing}` : 'none',
        }}
      >
        {newChildren}
      </div>
    </div>
  );
};

export default forwardRef(Carousel);
