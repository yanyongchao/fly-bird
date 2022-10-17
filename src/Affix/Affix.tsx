import React from 'react';
import { useMemoizedFn } from 'ahooks';

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

enum AffixStatus {
  None,
  Prepare,
}

function getDefaultTarget() {
  return typeof window !== 'undefined' ? window : null;
}

const Affix: React.FC<AffixProps> = (props) => {
  const getTargetElement = useMemoizedFn(() => {
    const { target } = props;

    if (target !== undefined) {
      return target;
    }

    return getDefaultTarget;
  });

  return <div>xx</div>;
};

Affix.displayName = 'Affix';

export default Affix;
