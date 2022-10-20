import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { VerticalAlignTopOutlined } from '@ant-design/icons';
import { cloneElement, getScroll, scrollTo, throttleByAnimationFrame } from '../_util';
import { useMemoizedFn, useEventListener } from 'ahooks';
import { CSSTransition } from 'react-transition-group';
import './style/index.less';

export interface BackTopProps {
  visibilityHeight?: number;
  onClick?: React.MouseEventHandler<HTMLElement>;
  target?: () => HTMLElement | Window | Document;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  duration?: number;
  visible?: boolean; // Only for test. Don't use it.
}

function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}

const BackTop: React.FC<BackTopProps> = (props) => {
  const { onClick, target, duration = 450, visibilityHeight = 400, className, children } = props;
  const [visible, setVisible] = useState(props.visible || false);
  const ref = useRef<HTMLDivElement>(null);

  const getTargetElement = useMemoizedFn(() => {
    if (target !== undefined) {
      return target();
    }

    return getDefaultTarget();
  });

  const handleScroll = useMemoizedFn(
    throttleByAnimationFrame((e: React.WheelEvent<HTMLInputElement> | { target: any }) => {
      const scrollTop = getScroll(e.target, true);
      setVisible(scrollTop > visibilityHeight);
    }),
  );

  const scrollToTop = (e: React.MouseEvent<HTMLDivElement>) => {
    scrollTo(0, {
      getContainer: getTargetElement as BackTopProps['target'],
      duration,
    });
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  useEventListener('scroll', handleScroll, {
    target: getTargetElement(),
  });

  const renderChilden = () => {
    const defaultElement = (
      <div className={`back-up-content`}>
        <div className={`back-up-icon`}>
          <VerticalAlignTopOutlined />
        </div>
      </div>
    );
    return (
      <CSSTransition in={visible} timeout={300} classNames="fade" unmountOnExit>
        {cloneElement(children ?? defaultElement, ({ className }) => ({
          className: classNames(className),
        }))}
      </CSSTransition>
    );
  };

  return (
    <div
      ref={ref}
      className={classNames('back-up', className)}
      style={props.style}
      onClick={scrollToTop}
    >
      {renderChilden()}
    </div>
  );
};

BackTop.displayName = 'BackTop';

export default BackTop;
