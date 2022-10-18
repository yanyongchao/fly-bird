import React, { useEffect } from 'react';
import Affix from '../Affix';

const Demo = () => {
  useEffect(() => {
    const ele = document.querySelector('#root') as HTMLDivElement;
    ele.style.height = '2000px';
    return () => {
      ele.style.height = 'auto';
    };
  }, []);
  return (
    <Affix offsetTop={120}>
      <div>测试Affix</div>
    </Affix>
  );
};

export default Demo;
