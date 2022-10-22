import React from 'react';
import toArray from 'rc-util/lib/Children/toArray';
import { AvaratContext } from './context';
import { cloneElement } from './utils';
import { AvatarSize } from './types';
import './style/group.less';

export interface GroupProps {
  className?: string;
  children?: React.ReactNode;
  prefixCls?: string;
  maxCount?: number;
  size?: AvatarSize;
  style?: React.CSSProperties;
  maxStyle?: React.CSSProperties;
}

const AvatarGroup: React.FC<GroupProps> = (props) => {
  const { children, size = AvatarSize.Default } = props;

  const childrenWithProps = toArray(children).map((child, index) =>
    cloneElement(child, {
      key: `avatar-key-${index}`,
    }),
  );
  return (
    <AvaratContext.Provider value={size}>
      <div className="avatar-group" style={props.style}>
        {childrenWithProps}
      </div>
    </AvaratContext.Provider>
  );
};

AvatarGroup.displayName = 'AvatarGroup';

export default AvatarGroup;
