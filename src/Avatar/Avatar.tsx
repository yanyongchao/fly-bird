import React, { useContext } from 'react';
import classNames from 'classnames';
import { AvatarSize, AvatarShape } from './types';
import { AvaratContext } from './context';
import './style/index.less';

export interface AvatarProps {
  shape?: AvatarShape;
  size?: AvatarSize;
  src?: React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  children?: React.ReactNode;
  draggable?: boolean;
  alt?: string;
  srcSet?: string;
  crossOrigin?: '' | 'anonymous' | 'use-credentials';
  onError?: () => boolean;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const {
    shape,
    size: customSize,
    src,
    icon,
    className,
    alt,
    srcSet,
    crossOrigin,
    children,
    draggable,
    style,
  } = props;
  const groupSize = useContext(AvaratContext);
  const size = customSize === 'default' ? groupSize : customSize;
  const sizeClass = classNames({
    [`avatar-lg`]: size === 'large',
    [`avatar-sm`]: size === 'small',
  });
  const classString = classNames(
    'avatar',
    sizeClass,
    {
      [`avatar-${shape}`]: !!shape,
      [`avatar-image`]: !!src,
      [`avatar-icon`]: !!icon,
    },
    className,
  );
  const render = () => {
    let ele;
    if (typeof src === 'string') {
      ele = (
        <img src={src} alt={alt} srcSet={srcSet} crossOrigin={crossOrigin} draggable={draggable} />
      );
    } else if (React.isValidElement(src)) {
      ele = src;
    } else if (icon) {
      ele = icon;
    } else {
      ele = children;
    }

    return ele;
  };
  return (
    <span className={classString} style={style}>
      {render()}
    </span>
  );
};

Avatar.displayName = 'Avatar';

Avatar.defaultProps = {
  shape: AvatarShape.Circle,
  size: AvatarSize.Default,
};

export default Avatar;
