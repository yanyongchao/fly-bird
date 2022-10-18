import React, { useState } from 'react';
import { Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import './style/index.less';

export interface AlertProps {
  message?: React.ReactNode;
  description?: React.ReactNode;
  type?: React.ReactNode;
  showIcon?: boolean;
  closable?: boolean;
  className?: string;
  closeText?: string;
  banner?: boolean;
  prefixCls?: string;
  onClose?: Function;
}

const Alert: React.FC<AlertProps> = (props) => {
  const { className = '', type, message, description, closable, onClose } = props;

  const showClass = classNames('alert-basic', className, {
    'alert-success': !type || type === 'success',
    'alert-info': type === 'info',
    'alert-warning': type === 'warning',
    'alert-error': type === 'error',
  });
  const hideClass = classNames('alert-basic', 'alert-hide', className);

  const [show, setShow] = useState(true);

  const Close = () => {
    setShow(false);
    onClose && onClose();
  };
  return (
    <div className={show ? showClass : hideClass}>
      <div className="alert-content">
        {message && <div className="alert-content">{message}</div>}
        {description && <div className="alert-description">{description}</div>}
      </div>
      {closable && (
        <div>
          <Button
            onClick={() => Close()}
            icon={<CloseOutlined />}
            className="ant-alert-close-icon"
          />
        </div>
      )}
    </div>
  );
};

export default Alert;
