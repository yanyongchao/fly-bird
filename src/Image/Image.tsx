import React from 'react';
import RcImage, { ImageProps } from 'rc-image';
import PreviewGroup from './PreviewGroup';
import type { GroupConsumerProps } from 'rc-image/lib/PreviewGroup';

export type ComposedImage = React.FC<ImageProps> & { PreviewGroup: React.FC<GroupConsumerProps> };

const Image: ComposedImage = ({ prefixCls, preview, ...otherProps }) => {
  return <RcImage preview={preview} prefixCls={prefixCls} {...otherProps} />;
};

Image.displayName = 'Image';

Image.PreviewGroup = PreviewGroup;

export default Image;
