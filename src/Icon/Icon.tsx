import React, { useContext } from 'react';
import classNames from 'classnames';
import context from './context';
import { svgBaseProps } from './utils';

export interface CustomIconComponentProps extends React.HTMLProps<HTMLSpanElement> {
  width?: string | number; // svg 元素宽度
  height?: string | number;
  fill?: string; // svg 元素填充的颜色
  className?: string; // 设置图标的样式名
  style?: React.CSSProperties; // 设置图标的样式，例如 fontSize 和 color
  spin?: boolean; // 是否有旋转动画
  rotate?: number; // 图标旋转角度（IE9 无效）
  component: React.ReactElement;
}

const Icon = React.forwardRef<HTMLSpanElement, CustomIconComponentProps>((props, ref) => {
  const { className, component: Component, spin, rotate, onClick, ...restProps } = props;
  const { prefixCls = 'anticon' } = useContext(context);
  const classString = classNames(prefixCls, className);

  // 设置svg的样式  anticon-spin
  const svgClassString = classNames({
    [`${prefixCls}-spin`]: !!spin,
  });
  const svgStyle = rotate
    ? {
        msTransform: `rotate(${rotate}deg)`,
        transform: `rotate(${rotate}deg)`,
      }
    : undefined;

  const innerSvgProps = {
    ...svgBaseProps,
    className: svgClassString,
    style: svgStyle,
  };
  return (
    <span role="img" {...restProps} ref={ref} onClick={onClick} className={classString}>
      {React.cloneElement(Component, { ...innerSvgProps })}
    </span>
  );
});

Icon.displayName = 'Icon';

export default Icon;
