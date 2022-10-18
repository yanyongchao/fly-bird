import React, { useRef, useState } from 'react';
import { useMemoizedFn, useMount, useUnmount } from 'ahooks';
import ResizeObserver from 'rc-resize-observer';
import {
  addObserveTarget,
  removeObserveTarget,
  throttleByAnimationFrame,
  getTargetRect,
  getFixedTop,
  getFixedBottom,
} from './util';

export interface AffixProps {
  offsetTop?: number;
  offsetBottom?: number;
  style?: React.CSSProperties;
  onChange?: (affixed?: boolean) => void;
  target?: () => Window | HTMLElement | null;
  prefixCls?: string;
  className?: string;
  children: React.ReactNode;
}

function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}

const Affix: React.FC<AffixProps> = (props) => {
  const placeholderNode = useRef<HTMLDivElement | null>(null);
  const fixedNode = useRef<HTMLDivElement | null>(null);
  const [affixStyle, setAffixStyle] = useState<React.CSSProperties>();
  const getTargetElement = useMemoizedFn(() => {
    const { target } = props;

    if (target !== undefined) {
      return target;
    }

    return getDefaultTarget;
  });

  const getOffsetTop = useMemoizedFn(() => {
    const { offsetBottom } = props;
    let { offsetTop } = props;
    if (offsetBottom === undefined && offsetTop === undefined) {
      offsetTop = 0;
    }
    return offsetTop;
  });

  const getOffsetBottom = useMemoizedFn(() => {
    return props.offsetBottom;
  });

  const updatePosition = useMemoizedFn(
    throttleByAnimationFrame(() => {
      const offsetTop = getOffsetTop();
      const offsetBottom = getOffsetBottom();
      const targetFunc = getTargetElement();
      const targetNode = targetFunc();
      const targetRect = getTargetRect(targetNode);
      const placeholderReact = getTargetRect(placeholderNode.current);
      const fixedTop = getFixedTop(placeholderReact, targetRect, offsetTop);
      const fixedBottom = getFixedBottom(placeholderReact, targetRect, offsetBottom);
      if (fixedTop !== undefined) {
        setAffixStyle({
          position: 'fixed',
          top: fixedTop,
          width: placeholderReact.width,
          height: placeholderReact.height,
        });
      } else if (fixedBottom !== undefined) {
        setAffixStyle({
          position: 'fixed',
          bottom: fixedBottom,
          width: placeholderReact.width,
          height: placeholderReact.height,
        });
      } else {
        setAffixStyle(undefined);
      }
    }),
  );

  useMount(() => {
    const targetFunc = getTargetElement();
    addObserveTarget(targetFunc(), updatePosition);
  });

  useUnmount(() => {
    const targetFunc = getTargetElement();
    removeObserveTarget(targetFunc(), updatePosition);
  });

  return (
    <ResizeObserver
      onResize={() => {
        updatePosition();
      }}
    >
      <div ref={placeholderNode}>
        <div ref={fixedNode} style={affixStyle}>
          {props.children}
        </div>
      </div>
    </ResizeObserver>
  );
};

Affix.displayName = 'Affix';

export default Affix;
